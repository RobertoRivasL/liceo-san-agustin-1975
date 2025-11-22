/**
 * LÓGICA GALERÍA LICEO SAN AGUSTÍN
 * Promoción 1975 - 50 Años
 */

// === CAPA DE DATOS ===
class ImageRepository {
    // ACTUALIZADO: Count 29 (excluyendo la foto 30 que ahora es logo)
    constructor(count = 29) {
        this.images = Array.from({ length: count }, (_, i) => {
            const id = i + 1;
            return {
                id: id,
                src: `imagenes/${String(id).padStart(2, '0')}.jpeg`,
                alt: `Recuerdo ${id} - Promoción 1975`,
                title: `Fotografía ${id}`
            };
        });
    }
    getAll() { return this.images; }
}

// === CLASE BASE DE VISTA ===
class ViewRenderer {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        // Validación silenciosa para evitar errores si falta un contenedor
        if (!this.container) console.warn(`Contenedor ${containerId} no encontrado`);
    }
    render() {} // Método a sobrescribir
}

// === RENDERIZADOR DE GRID (Galería Principal) ===
class GridRenderer extends ViewRenderer {
    render(onImageClick) {
        if (!this.container) return;
        this.container.innerHTML = '<div class="gallery-grid"></div>';
        const grid = this.container.querySelector('.gallery-grid');

        this.data.forEach(img => {
            const figure = document.createElement('figure');
            figure.className = 'gallery-card';
            figure.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                <figcaption class="gallery-caption">
                    <h3>${img.title}</h3>
                </figcaption>
            `;
            figure.addEventListener('click', () => onImageClick(img));
            grid.appendChild(figure);
        });
    }
}

// === RENDERIZADOR DE LISTA ===
class ListRenderer extends ViewRenderer {
    render(onImageClick) {
        if (!this.container) return;
        this.container.innerHTML = '<div class="list-layout"></div>';
        const list = this.container.querySelector('.list-layout');

        this.data.forEach(img => {
            const item = document.createElement('article');
            item.className = 'list-item';
            item.innerHTML = `
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
                <div class="list-content">
                    <h3>${img.title}</h3>
                    <p>Click para ampliar la imagen</p>
                </div>
            `;
            item.addEventListener('click', () => onImageClick(img));
            list.appendChild(item);
        });
    }
}

// === RENDERIZADOR DE CARRUSEL (CORREGIDO) ===
class CarouselRenderer extends ViewRenderer {
    constructor(containerId, data) {
        super(containerId, data);
        this.currentIndex = 0;
    }

    render() {
        if (!this.container) return;

        // 1. Estructura HTML
        this.container.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-stage" id="carouselStage"></div>
                <button type="button" class="carousel-control prev" aria-label="Anterior">❮</button>
                <button type="button" class="carousel-control next" aria-label="Siguiente">❯</button>
            </div>
        `;

        const stage = this.container.querySelector('#carouselStage');

        // 2. Insertar Imágenes
        this.data.forEach((img, index) => {
            const slide = document.createElement('div');
            // La primera imagen tiene clase 'active'
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            // Carga inmediata para la primera, lazy para el resto
            const loading = index === 0 ? 'eager' : 'lazy';
            slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="${loading}">`;
            stage.appendChild(slide);
        });

        // 3. Asignar Eventos (Con bind para asegurar el contexto 'this')
        const btnPrev = this.container.querySelector('.prev');
        const btnNext = this.container.querySelector('.next');

        if(btnPrev) btnPrev.addEventListener('click', (e) => {
            e.preventDefault();
            this.move(-1);
        });

        if(btnNext) btnNext.addEventListener('click', (e) => {
            e.preventDefault();
            this.move(1);
        });
    }

    move(direction) {
        const slides = this.container.querySelectorAll('.carousel-slide');
        if (!slides.length) return;

        // Quitar clase active actual
        slides[this.currentIndex].classList.remove('active');

        // Calcular nuevo índice (circular)
        this.currentIndex = (this.currentIndex + direction + this.data.length) % this.data.length;

        // Poner clase active nueva
        slides[this.currentIndex].classList.add('active');
    }
}

// === LIGHTBOX (Zoom de fotos) ===
class Lightbox {
    constructor() {
        this.el = document.getElementById('lightbox');
        if (!this.el) return;
        this.img = this.el.querySelector('img');
        this.closeBtn = this.el.querySelector('.lightbox-close');

        // Eventos
        this.closeBtn.onclick = () => this.close();
        this.el.onclick = (e) => { if(e.target === this.el) this.close(); };
        document.addEventListener('keydown', (e) => { if(e.key === 'Escape') this.close(); });
    }

    open(imageData) {
        this.img.src = imageData.src;
        this.img.alt = imageData.alt;
        this.el.classList.add('open');
        document.body.style.overflow = 'hidden'; // Evitar scroll fondo
    }

    close() {
        this.el.classList.remove('open');
        document.body.style.overflow = ''; // Restaurar scroll
        setTimeout(() => { this.img.src = ''; }, 300);
    }
}

// === APP PRINCIPAL ===
class App {
    constructor() {
        this.repo = new ImageRepository();
        this.lightbox = new Lightbox();
        this.init();
    }

    init() {
        const data = this.repo.getAll();
        const openLightbox = (img) => this.lightbox.open(img);

        // Inicializar vistas
        const grid = new GridRenderer('gallery-view', data);
        const list = new ListRenderer('list-view', data);
        const carousel = new CarouselRenderer('carousel-view', data);

        grid.render(openLightbox);
        list.render(openLightbox);
        carousel.render();

        this.setupTabs();
    }

    setupTabs() {
        const buttons = document.querySelectorAll('.tab-button');
        const sections = document.querySelectorAll('.view-section');

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Si es botón de contacto, no buscamos renderer, solo mostramos la sección
                const targetId = btn.getAttribute('aria-controls');

                // Actualizar botones
                buttons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Actualizar secciones
                sections.forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if(targetSection) targetSection.classList.add('active');
            });
        });
    }
}

// Arrancar
document.addEventListener('DOMContentLoaded', () => new App());