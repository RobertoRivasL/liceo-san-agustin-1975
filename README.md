# Galería de Fotos - Liceo San Agustín - Promoción 1975

## Descripción
Aplicación web HTML para visualizar las fotografías de la celebración de 50 años de la Promoción 1975 del Liceo San Agustín.

## Características

### Logo Institucional:
- Logo del Liceo San Agustín (Promoción 1975 - 50 años) en la cabecera
- Logo también presente en el pie de página
- Efectos de hover para interactividad
- La imagen 30 procesada (sin resaltes amarillos) se usa exclusivamente como logo

### Tres Vistas Diferentes:
1. **Vista Galería**: Muestra todas las fotos en una cuadrícula responsive
2. **Vista Carrusel**: Navegación secuencial con controles e indicadores
3. **Vista Lista**: Presentación en lista con miniaturas

### Funcionalidades:
- ✅ Navegación fluida entre vistas
- ✅ Lightbox/Modal para ver fotos en tamaño completo
- ✅ Navegación con teclado (flechas y ESC)
- ✅ Diseño responsive (adaptable a móviles y tablets)
- ✅ Efectos y transiciones suaves
- ✅ Imagen del logo procesada sin fechas/ubicaciones
- ✅ 30 fotografías incluidas

## Estructura del Proyecto

```
galeria_fotos/
├── index.html          # Archivo principal de la aplicación
├── imagenes/           # Carpeta con todas las fotografías
│   ├── 01.jpeg
│   ├── 02.jpeg
│   ├── ...
│   └── 30.jpeg        # Logo procesado sin resaltes amarillos
└── README.md          # Este archivo
```

## Instalación y Uso

### Opción 1: Uso Local
1. Descargar la carpeta completa `galeria_fotos`
2. Abrir el archivo `index.html` en cualquier navegador web moderno
3. No requiere servidor web ni conexión a internet

### Opción 2: Subir a un Servidor Web
1. Subir toda la carpeta `galeria_fotos` a su hosting
2. Asegurarse de mantener la estructura de carpetas
3. Acceder mediante la URL de su sitio

### Opción 3: GitHub Pages (Gratuito)
1. Crear un repositorio en GitHub
2. Subir todos los archivos
3. Activar GitHub Pages en la configuración del repositorio
4. Compartir la URL pública generada

## Navegación

### Controles del Teclado:
- **Flechas ← →**: Navegar entre fotos en el lightbox
- **ESC**: Cerrar el lightbox
- **Clic**: Abrir foto en lightbox desde cualquier vista

### Controles del Mouse:
- **Clic en foto**: Ampliar en lightbox
- **Botones ❮ ❯**: Navegar en carrusel o lightbox
- **Indicadores**: Saltar a foto específica en carrusel
- **Tabs superiores**: Cambiar entre vistas

## Características Técnicas

### Principios de Diseño Aplicados:
- **Modularidad**: Código organizado en módulos independientes
- **Encapsulación**: Cada módulo maneja su propia lógica
- **Separación de Intereses**: HTML, CSS y JavaScript bien separados
- **Responsabilidad Única**: Cada módulo tiene una única función

### Módulos Implementados:
1. **DataModule**: Gestión de datos de imágenes
2. **ViewModule**: Control de vistas
3. **GalleryModule**: Vista de galería
4. **CarouselModule**: Vista de carrusel
5. **ListModule**: Vista de lista
6. **LightboxModule**: Modal de visualización

### Compatibilidad:
- ✅ Chrome / Edge (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Responsive (móviles y tablets)

## Personalización

### Colores:
Editar las variables CSS en la sección `:root` del archivo `index.html`:
```css
--color-primario: #2c5aa0;    /* Azul principal */
--color-secundario: #d4af37;  /* Dorado */
--color-fondo: #f5f5f5;       /* Gris claro */
```

### Auto-play del Carrusel:
Descomentar la última línea del JavaScript en `index.html`:
```javascript
// startAutoPlay();  // <-- Quitar las barras //
```

## Notas Especiales

- La **imagen 30** (logo del colegio) ha sido procesada para eliminar los resaltes amarillos con información de fecha y ubicación
- Todas las imágenes se cargan de forma optimizada (lazy loading)
- El diseño es completamente responsive y se adapta a diferentes tamaños de pantalla

## Soporte

Para reportar problemas o sugerencias, contactar al desarrollador.

---
**Desarrollado para**: Liceo San Agustín - Promoción 1975
**Fecha**: Noviembre 2025
**Versión**: 1.0
