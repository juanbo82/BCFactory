# BC Factory - Business Central Developer Blog & Tools

Blog, herramientas interactivas y recursos para desarrolladores de Microsoft Dynamics 365 Business Central.

## Secciones

### Blog
Posts sobre desarrollo en Business Central, integraciones, Power Platform y DevOps. Incluye:
- Sistema de categorías y tags
- Búsqueda de posts
- Sidebar con perfil, posts recientes y tag cloud

### Herramientas Interactivas
- **AL Snippet Generator** - Genera código AL para 9 tipos de objeto
- **Table Extension Builder** - Constructor visual de tablas
- **Event Subscriber Generator** - Eventos comunes precargados + personalizado
- **Permission Set Generator** - Genera PermissionSets en AL
- **Referencia de Objetos** - Rangos, tipos de datos, triggers, propiedades, tips

### Repositorios
Enlaces a repositorios GitHub con código descargable.

## Cómo añadir un nuevo post

1. Crea un archivo HTML en `posts/` (ej: `posts/mi-nuevo-post.html`)
2. Añade la entrada en `posts/posts.json`:
   ```json
   {
       "slug": "mi-nuevo-post",
       "title": "Título del post",
       "date": "2026-05-12",
       "category": "Business Central",
       "tags": ["AL", "Tips"],
       "excerpt": "Breve descripción del post...",
       "file": "mi-nuevo-post.html"
   }
   ```
3. Commit y push. GitHub Pages lo despliega automáticamente.

## Tecnología

HTML + CSS + JavaScript vanilla. Sin dependencias, sin build tools.

## Licencia

MIT
