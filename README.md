# Documentación Técnica: Frontend de Contactos (Angular)

## Descripción General
Este proyecto es la interfaz de usuario para la gestión de contactos, desarrollada con **Angular** utilizando tecnologías modernas como **Signals**, componentes independientes (*Standalone Components*), **Reactive Forms** avanzados y estilos responsivos optimizados con **Tailwind CSS** y **PrimeNG**.
esta conectado con la api del backend de php puro, aunque tambien hay un json simulando data

## Arquitectura del Proyecto y Estructura de Directorios
La aplicación sigue una organización modular basada en responsabilidades claras:

- **`src/app/pages/contacts/`**: Contiene la vista principal de la lista de contactos (`contacts.component.ts/html`), la cual integra la barra superior de búsqueda reactiva, visualización en cuadrícula (*grid*) responsiva, y acciones de creación, edición y eliminación.
- **`src/app/shared/components/contact-form/`**: Componente reutilizable (`contact-form`) basado en un modal reactivo que gestiona tanto la creación como la actualización de contactos.
- **`store/`**: Gestión de estado reactivo mediante **Angular Signals** (`contact.store.ts`), facilitando la reactividad fina y la gestión del listado filtrado de contactos.
- **`Validators/`**: Validadores personalizados reutilizables (ej. `phoneNumberValidator.ts`) para garantizar la integridad de los datos telefónicos.
- **`models/`**: Definiciones de interfaces y tipos de datos TypeScript (ej. entidad `Contact`).
- **`services/`**: Servicios de comunicación HTTP y lógica de negocio para la sincronización con el backend.

## Gestión de Formularios y Validaciones
El formulario de contactos (`ContactFormComponent`) utiliza **Reactive Forms** combinados con validaciones estrictas y dinámicas:
- **Campos principales**:
  - `name`: Obligatorio, con una longitud mínima de 2 caracteres (`Validators.required`, `Validators.minLength(2)`).
  - `email`: Obligatorio y con formato de correo válido (`Validators.required`, `Validators.email`).
- **Manejo Dinámico de Teléfonos (`FormArray`)**:
  - Permite asociar múltiples números de teléfono por contacto mediante un arreglo dinámico (`FormArray`).
  - Utiliza un validador personalizado (`phoneNumberValidator`) para cada número ingresado.
  - Incluye lógica de sincronización mediante `effect` para cargar datos existentes al momento de editar y limpiar de forma segura al cerrar o enviar.

## Interfaz de Usuario y Estilos
- **Tailwind CSS**: Utilizado para un diseño moderno, limpio y completamente responsivo, aplicando clases utilitarias avanzadas, tarjetas con efectos de sombra y gradientes.
- **PrimeNG**: Integración de componentes UI robustos como diálogos (`DialogModule`), máscaras de entrada (`InputMaskModule`), botones y diálogos de confirmación (`p-confirmDialog`).

---

## 🚀 Cómo levantar el Frontend localmente

Para ejecutar la aplicación de desarrollo en local, asegúrate de tener **Node.js** y **npm** instalados, y sigue estos pasos:

#### 1. Entrar al directorio del proyecto frontend
```bash
cd contactsFront 
```
### Instlar dependencias
```bash
npm instqall
```
### Levantar servidor de desarrollo
```bash
ng serve
```

