/**
 * LÓGICA GALERÍA LICEO SAN AGUSTÍN
 * Promoción 1975 - 50 Años
 */
/**
 * LÓGICA GALERÍA LICEO SAN AGUSTÍN - ACTUALIZADO 22/11/2025
 */

// === CAPA DE DATOS FOTOS ===
class ImageRepository {
    // Ahora leemos hasta la imagen 45
    constructor(maxId = 45) {
        this.images = [];
        for (let i = 1; i <= maxId; i++) {
            // IMPORTANTE: Saltamos la imagen 30 porque es el LOGO del colegio
            if (i === 30) continue;

            this.images.push({
                id: i,
                src: `imagenes/${String(i).padStart(2, '0')}.jpeg`,
                alt: `Recuerdo ${i} - Promoción 1975`,
                title: `Fotografía ${i}`
            });
        }
    }
    getAll() { return this.images; }
}

// === CAPA DE DATOS VIDEOS (NUEVO) ===
class VideoRepository {
    constructor() {
        this.videos = [
            { id: 'v00', src: 'imagenes/v00.mp4', title: 'Celebración 50 Años - Parte 1' },
            { id: 'v01', src: 'imagenes/v01.mp4', title: 'Celebración 50 Años - Parte 2' },
            { id: 'v02', src: 'imagenes/v02.mp4', title: 'Celebración 50 Años - Parte 3' }
        ];
    }
    getAll() { return this.videos; }
}

// === CLASE BASE DE VISTA ===
class ViewRenderer {
    constructor(containerId, data) {
        this.container = document.getElementById(containerId);
        this.data = data;
        if (!this.container) console.warn(`Contenedor ${containerId} no encontrado`);
    }
    render() {}
}

// === RENDERIZADOR DE FOTOS (GRID) ===
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

// === RENDERIZADOR DE VIDEOS (NUEVO) ===
class VideoRenderer extends ViewRenderer {
    render() {
        if (!this.container) return;
        this.container.innerHTML = '<div class="video-grid"></div>';
        const grid = this.container.querySelector('.video-grid');

        this.data.forEach(vid => {
            const card = document.createElement('div');
            card.className = 'video-card';
            // Usamos controles nativos y preload metadata para ahorrar datos
            card.innerHTML = `
                <div class="video-wrapper">
                    <video controls preload="metadata">
                        <source src="${vid.src}" type="video/mp4">
                        Tu navegador no soporta videos.
                    </video>
                </div>
                <div class="video-info">
                    <h3>${vid.title}</h3>
                </div>
            `;
            grid.appendChild(card);
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
                    <p>Junta 50 Años - Click para ver</p>
                </div>
            `;
            item.addEventListener('click', () => onImageClick(img));
            list.appendChild(item);
        });
    }
}

// === RENDERIZADOR DE CARRUSEL ===
class CarouselRenderer extends ViewRenderer {
    constructor(containerId, data) {
        super(containerId, data);
        this.currentIndex = 0;
    }

    render() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel-stage" id="carouselStage"></div>
                <button type="button" class="carousel-control prev" aria-label="Anterior">❮</button>
                <button type="button" class="carousel-control next" aria-label="Siguiente">❯</button>
            </div>
        `;

        const stage = this.container.querySelector('#carouselStage');

        this.data.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
            const loading = index === 0 ? 'eager' : 'lazy';
            slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" loading="${loading}">`;
            stage.appendChild(slide);
        });

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
        slides[this.currentIndex].classList.remove('active');
        this.currentIndex = (this.currentIndex + direction + this.data.length) % this.data.length;
        slides[this.currentIndex].classList.add('active');
    }
}

// === LIGHTBOX (Zoom) ===
class Lightbox {
    constructor() {
        this.el = document.getElementById('lightbox');
        if (!this.el) return;
        this.img = this.el.querySelector('img');
        this.closeBtn = this.el.querySelector('.lightbox-close');

        this.closeBtn.onclick = () => this.close();
        this.el.onclick = (e) => { if(e.target === this.el) this.close(); };
        document.addEventListener('keydown', (e) => { if(e.key === 'Escape') this.close(); });
    }
    open(imageData) {
        this.img.src = imageData.src;
        this.img.alt = imageData.alt;
        this.el.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    close() {
        this.el.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { this.img.src = ''; }, 300);
    }
}

// === APP PRINCIPAL ===
class App {
    constructor() {
        this.imgRepo = new ImageRepository(45); // Indicamos que hay 45 fotos
        this.vidRepo = new VideoRepository();   // Inicializamos repo de videos
        this.lightbox = new Lightbox();
        this.init();
    }

    init() {
        const images = this.imgRepo.getAll();
        const videos = this.vidRepo.getAll();
        const openLightbox = (img) => this.lightbox.open(img);

        // Inicializar vistas
        const grid = new GridRenderer('gallery-view', images);
        const videoGrid = new VideoRenderer('video-view', videos); // Nueva vista
        const list = new ListRenderer('list-view', images);
        const carousel = new CarouselRenderer('carousel-view', images);

        grid.render(openLightbox);
        videoGrid.render(); // Renderizar videos
        list.render(openLightbox);
        carousel.render();

        this.setupTabs();
    }

    setupTabs() {
        const buttons = document.querySelectorAll('.tab-button');
        const sections = document.querySelectorAll('.view-section');

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('aria-controls');

                buttons.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                sections.forEach(s => s.classList.remove('active'));
                const targetSection = document.getElementById(targetId);
                if(targetSection) targetSection.classList.add('active');
            });
        });
    }
}

// Arrancar
document.addEventListener('DOMContentLoaded', () => new App());