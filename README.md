# Prueba Tecnica

Realizado por Jose Luis Gil Zamora

## Descripción del proyecto

El proyecto consiste en una API para la gestion de usuarios, productos y pedidos de una empresa ficticia

## Diseño

La API se ha diseñado utilizando el patrón de diseño RESTful con MVC, con endpoints para cada cada uno de los CRUDs para los usuarios, productos y ordenes. Para ello, se implementaron: las clases de los modelos de la base de datos, las rutas de los endpoints como las vistas y los controladores que se encargan de la logica de la aplicacion.

Adicionalmente, se aplicaron los principios de desarrollo de software de responsabilidad unica y principio abierto/cerrado. Cada uno de los archivos de la API tiene un unico proposito, por ejemplo los controladores solo contienen los metodos para la gestion del modelo correspondiente, a su vez los metodos estan segregados en archivos propios. Sumado con el principio abierto/cerrado, para el futuro desarrollo dentro de la API esto significaria que en caso de necesitar un nuevo endpoint: primero se configura el metodo, se agrega al controlador y por ultimo se agrega en las rutas. Por otro lado, para hacer mantenimiento o correcciones en el funcionamiento un endpoint, solo se debe hacer modificaciones en el metodo a modificar sin tener que editar todos los demas archivos del sistema.

## Pruebas

Para realizar las pruebas se deben de seguir los siguientes pasos

### 1- Configuracion del ambiente

Primero crear una base de datos en MongoDB y crear las colecciones: "orderdetails", "orders", "products" y "users". Luego copiar el archivo ".environment" de la carpeta "sample" al directorio raiz de la aplicacion y modificar el atributo "dbConnection" con la direccion de la base de datos creada.

### 2- Configuracion de las peticiones

Para realizar las pruebas se puede utilizar una herramienta como Postman o curl. Adiciononalmente las peticiones requiren de un JWT en el encabezado de la solicitud, con la excepcion de las rutas de login y creacion de usuario.

Se recomienda primero crear un usuario con una solicitud POST en la ruta "api/users", luego hacer login con las credenciales en el cuerpo (ver archivo "login.json" en la ruta "sample" para ver un ejemplo) y en las demas peticiones agregar el token suministrado por la aplicacion en el encabezado bajo el nombre de "x-access-token".

### 3- Tipos de peticiones

La API contiene las siguientes rutas:

- **api/users**:
- GET: obtener todos los usuarios
- POST: crear un nuevo usuario
- **api/users/:id**:
- GET: obtener un usuario por id
- PUT: actualizar un usuario
- DELETE: eliminar un usuario
- **api/products**:
- GET: obtener todos los productos
- POST: crear un nuevo producto
- **api/products/:id**:
- GET: obtener un producto por id
- PUT: actualizar un producto
- DELETE: eliminar un producto
- **api/orders**:
- GET: obtener todas las ordenes
- POST: crear una nueva orden
- **api/orders/:id**:
- GET: obtener una orden por id
- PATCH: actualizar el estado de una orden
- DELETE: eliminar una orden
- **api/login**:
- POST: hacer login y obtener un token

Para los cuerpos de las solicitudes POST, PUT y PATCH; se incluyen ejemplos en la ruta "sample"
