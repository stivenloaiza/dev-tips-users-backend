<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Dev Tips Users Backend

## Descripción

Este proyecto está destinado a manejar la parte de usuarios, encargándose del registro y gestión de suscripciones de los usuarios. Los datos se guardan en la base de datos y se comparten con otros microservicios que lo requieran. Se crean endpoints para que otros microservicios puedan consumir y utilizar estos datos.

## Versiones

- Node.js: v20.11.10

## Paso a Paso

### Clonar el Repositorio

bash
git clone https://github.com/stivenloaiza/dev-tips-users-backend.git

### Entrar a la Carpeta
bash
cd dev-tips-users-backend


### Instalar Dependencias
bash
npm install



###Variables de Entorno
Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables:

DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_nombre_base_datos
DB_CLUSTER=tu_cluster.mongodb.net
DB_LOCAL_CONNECTION=mongodb://localhost:27017/tu_nombre_base_datos_local
NODE_ENV=development
PORT=3000



###Estructura del Proyecto
El proyecto está organizado de forma modular:
src/
├── auth/
├── enums/
├── guard/
├── persistence/
├── module/
│   ├── bots/
│   ├── email/
│   ├── iframes/
│   ├── tvs/
│   ├── users/
├── app.module.ts
├── main.ts
test/
.env.example


###Contribución
Para contribuir al proyecto, sigue estos pasos:

Crea una rama por cada tarea principal que quieras realizar.
Realiza tus cambios y súbelos a la rama correspondiente.
Crea un Pull Request.
No hagas push a la rama principal hasta que el Team Leader o Líder del proyecto lo permita.
La URL completa de la conexión a MongoDB se vería así:

bash
mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.${DB_CLUSTER}/


###Ejemplo de Variables de Entorno
env
MONGODB_USER=tu_usuario
MONGODB_PASSWORD=tu_contraseña
MONGODB_CLUSTER=tu_cluster.mongodb.net
MONGODB_DBNAME=tu_nombre_base_datos
PORT=3000

Nest is [MIT licensed](LICENSE).

Contacto 
###Thomas Restrepo - thomasrr29@gmail.com
###Luisa Perez
###Juan Jaramillo
