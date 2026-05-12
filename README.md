# BC Dev Tools - Business Central Developer Portfolio

Herramientas interactivas y portfolio para desarrolladores de Microsoft Dynamics 365 Business Central.

## Herramientas Incluidas

- **AL Snippet Generator** - Genera snippets de código AL para tablas, páginas, codeunits, reports, enums, XMLports y más.
- **Table Extension Builder** - Constructor visual de tablas y extensiones de tabla con campos personalizados.
- **Event Subscriber Generator** - Generador de suscripciones a eventos con eventos comunes precargados.
- **Permission Set Generator** - Crea permission sets en formato AL para tus extensiones.
- **Referencia de Objetos** - Consulta rápida de rangos, tipos de datos, triggers, propiedades y buenas prácticas.

## Tecnología

HTML + CSS + JavaScript vanilla. Sin dependencias, sin build tools, listo para GitHub Pages.

## Despliegue en GitHub Pages

1. Crear un repositorio en GitHub (ej: `tu-usuario.github.io` o `bc-dev-tools`)
2. Subir el código:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - BC Dev Tools portfolio"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/tu-repo.git
   git push -u origin main
   ```
3. Ir a **Settings > Pages** en el repositorio
4. En **Source**, seleccionar `main` branch y `/ (root)`
5. La web estará disponible en `https://tu-usuario.github.io/tu-repo/`

## Personalización

- Edita las secciones de **Sobre Mí**, **Experiencia** y **Contacto** en `index.html`
- Modifica colores y estilos en `css/styles.css` (variables CSS en `:root`)
- Añade o modifica herramientas en `js/tools/`

## Licencia

MIT
