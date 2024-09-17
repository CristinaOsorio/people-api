# Proyecto de Gestión de Personas

Este proyecto es una aplicación de gestión de personas que permite realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) en registros de personas. La aplicación está construida con Node.js, Express y Sequelize, y utiliza una base de datos MySQL.

## Índice

-   [Características](#características)
-   [Tecnologías](#tecnologías)
-   [Instalación](#instalación)
-   [Uso](#uso)
-   [API](#api)
    -   [Endpoints](#endpoints)
        -   [Crear Persona](#crear-persona)
        -   [Leer Personas](#leer-personas)
        -   [Actualizar Persona](#actualizar-persona)
        -   [Eliminar Persona](#eliminar-persona)
    -   [Atributos para `POST` y `PUT`](#atributos-para-post-y-put-en-la-entidad-person)
        -   [Atributos Requeridos](#atributos-requeridos)
        -   [Ejemplo de Cuerpo de Solicitud para `POST` o `PUT`](#ejemplo-de-cuerpo-de-solicitud-para-post-o-put)
    -   [Atributos para `GET`](#atributos-para-get-en-la-entidad-person)
        -   [Parámetros de Consulta (Query Params)](#parámetros-de-consulta-query-params)
        -   [Ejemplo de Solicitud `GET`](#ejemplo-de-solicitud-get)
        -   [Respuesta](#respuesta)
            -   [Ejemplo de Respuesta](#ejemplo-de-respuesta)

## Características

-   Crear, leer, actualizar y eliminar registros de personas.
-   Búsqueda y filtrado de registros.
-   Validación de datos y manejo de errores.
-   Paginación en las consultas.

## Tecnologías

-   Node.js
-   Express
-   Sequelize
-   MySQL
-   TypeScript

## Instalación

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/CristinaOsorio/people-api
    ```

2. **Navegar al directorio del proyecto:**

    ```bash
    cd people-api
    ```

3. **Instalar `nvm` (Node Version Manager) [Opcional]:**

    Si prefieres usar `nvm` para gestionar versiones de Node.js, sigue las instrucciones en la [documentación oficial de nvm](https://github.com/nvm-sh/nvm#installing-and-updating) para instalarlo.

    Luego, instala la versión recomendada de Node.js especificada en el archivo `.nvmrc`:

    ```bash
    nvm install
    ```

    Asegúrate de usar la versión correcta con:

    ```bash
    nvm use
    ```

    **Nota:** Si no utilizas `nvm`, asegúrate de tener la versión recomendada de Node.js instalada. La versión requerida está especificada en el archivo `.nvmrc`.

4. **Instalar las dependencias:**

    ```bash
    npm install
    ```

5. **Configurar la base de datos:**

    Crear una base de datos en MySQL con el nombre `tu-base-de-datos`

    Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

    ```env
    APP_URL='http://localhost:3000'
    APP_PORT=3000
    FRONTEND_URL='http://localhost:4200'

    DB_HOST=localhost
    DB_USERNAME=tu-usuario
    DB_PASSWORD=tu-contraseña
    DB_DATABASE=tu-base-de-datos
    DB_PORT=3306
    ```

6. **Iniciar el servidor:**

    ```bash
    npm run dev
    ```

## Uso

Una vez que el servidor esté en funcionamiento, puedes interactuar con la API a través de los siguientes endpoints. Utiliza herramientas como Postman o cURL para hacer solicitudes HTTP.

## API

### Endpoints

-   **Crear Persona**

    `POST /persons`

    Crea una nueva persona.

-   **Leer Personas**

    `GET /persons`

    Obtiene una lista de personas. Puedes aplicar filtros y paginación.

-   **Actualizar Persona**

    `PUT /persons/:id`

    Actualiza los datos de una persona existente.

-   **Eliminar Persona**

    `DELETE /persons/:id`

    Elimina una persona por su ID.

### Atributos para `POST` y `PUT` en la Entidad `Person`

Para interactuar con los endpoints `POST` y `PUT` en la entidad `Person`, los siguientes atributos deben ser incluidos en el cuerpo de la solicitud. Estos atributos tienen validaciones específicas que deben cumplirse para que la solicitud sea procesada correctamente.

#### Atributos Requeridos:

-   **`firstName`**:

    -   **Tipo**: `string`
    -   **Longitud Máxima**: `60 caracteres`
    -   **Descripción**: El nombre de la persona. Solo puede contener letras, espacios, apóstrofes y guiones. Debe estar correctamente formateado.
    -   **Validaciones**:
        -   Obligatorio (`notNull`): Este campo es obligatorio.
        -   Regex: Debe cumplir con el patrón de letras, espacios, apóstrofes y guiones (`ALPHA_REGEX`).

-   **`lastNamePaternal`**:

    -   **Tipo**: `string`
    -   **Longitud Máxima**: `60 caracteres`
    -   **Descripción**: El apellido paterno de la persona. Solo puede contener letras, espacios, apóstrofes y guiones.
    -   **Validaciones**:
        -   Obligatorio (`notNull`): Este campo es obligatorio.
        -   Regex: Debe cumplir con el patrón de letras, espacios, apóstrofes y guiones (`ALPHA_REGEX`).
        -   Longitud: Debe tener entre `1` y `60 caracteres`.

-   **`lastNameMaternal`**:

    -   **Tipo**: `string`
    -   **Longitud Máxima**: `60 caracteres`
    -   **Descripción**: El apellido materno de la persona. Solo puede contener letras, espacios, apóstrofes y guiones.
    -   **Validaciones**:
        -   Obligatorio (`notNull`): Este campo es obligatorio.
        -   Regex: Debe cumplir con el patrón de letras, espacios, apóstrofes y guiones (`ALPHA_REGEX`).
        -   Longitud: Debe tener entre `1` y `60 caracteres`.

-   **`address`**:

    -   **Tipo**: `string`
    -   **Longitud Máxima**: `100 caracteres`
    -   **Descripción**: La dirección de la persona.
    -   **Validaciones**:
        -   Obligatorio (`notNull`): Este campo es obligatorio.
        -   Longitud: Debe tener entre `1` y `100 caracteres`.

-   **`phone`**:
    -   **Tipo**: `string`
    -   **Longitud**: `exactamente 10 caracteres`
    -   **Descripción**: El número de teléfono de la persona. Debe ser único y contener exactamente 10 dígitos numéricos.
    -   **Validaciones**:
        -   Obligatorio (`notNull`): Este campo es obligatorio.
        -   Regex: Debe cumplir con el patrón de número de teléfono que requiere exactamente `10 dígitos numéricos` (`PHONE_NUMBER_REGEX`).

#### Ejemplo de Cuerpo de Solicitud para `POST` o `PUT`:

```json
{
    "firstName": "John",
    "lastNamePaternal": "Doe",
    "lastNameMaternal": "Smith",
    "address": "123 Main St, City",
    "phone": "1234567890"
}
```

### Atributos para `GET` en la Entidad `Person`

El endpoint `GET` permite la recuperación de una lista paginada de personas. Se pueden aplicar filtros opcionales y paginación a la solicitud.

#### Parámetros de Consulta (Query Params):

-   **`filterParam`** _(opcional)_:

    -   **Tipo**: `string`
    -   **Descripción**: Parámetro opcional para filtrar resultados por un atributo específico (nombre, apellido, etc.).

-   **`page`** _(opcional)_:

    -   **Tipo**: `number`
    -   **Descripción**: Número de la página para la paginación.
    -   **Valor Predeterminado**: `1`

-   **`pageSize`** _(opcional)_:
    -   **Tipo**: `number`
    -   **Descripción**: Cantidad de elementos por página para la paginación.
    -   **Valor Predeterminado**: `10`

#### Ejemplo de Solicitud `GET`:

```http
GET /api/persons?filterParam=John&page=1&pageSize=5
```

#### Respuesta

-   **`data`**:

    -   **Tipo**: `array`
    -   **Descripción**: Lista de personas devueltas por la consulta.

-   **`totalItems`**:

    -   **Tipo**: `number`
    -   **Descripción**: Número total de personas encontradas.

-   **`currentPage`**:

    -   **Tipo**: `number`
    -   **Descripción**: Página actual.

-   **`pageSize`**:

    -   **Tipo**: `number`
    -   **Descripción**: Número de elementos por página.

-   **`totalPages`**:
    -   **Tipo**: `number`
    -   **Descripción**: Número total de páginas basadas en el tamaño de la página y el número total de personas encontradas.

#### Ejemplo de Respuesta:

```json
{
    "data": [
        {
            "id": 1,
            "firstName": "John",
            "lastNamePaternal": "Doe",
            "lastNameMaternal": "Smith",
            "address": "123 Main St",
            "phone": "1234567890"
        },
        {
            "id": 2,
            "firstName": "Jane",
            "lastNamePaternal": "Doe",
            "lastNameMaternal": "Johnson",
            "address": "456 Oak St",
            "phone": "0987654321"
        }
    ],
    "totalItems": 2,
    "currentPage": 1,
    "pageSize": 5,
    "totalPages": 1
}
```
