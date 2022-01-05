# Practica 4 BCDA
Autores: Javier Sanz Sáez, Javier Antón Yuste

## Iniciar proyecto
Primero levantamos Ganache. Para ello en un terminal ejecutamos lo siguiente:

```
wget https://github.com/trufflesuite/ganache-ui/releases/download/v2.5.4/ganache-2.5.4-linux-x86_64.AppImage
sudo chmod +x  ganache-2.5.4-linux-x86_64.AppImage
./ganache-2.5.4-linux-x86_64.AppImage
```

Hemos usado el AppImage proporcionado por Ganache. Existe la opción de usar el CLI a través del siguiente comando:

```
ganache-cli -p 7545
```

Desplegamos nuestro contrato

```
npx truffle migrate --compile-all --reset
```

Una vez desplegado nuestro contrato a la red, necesitamos copiar los ficheros JSON resultantes a la dapp.

```
cp build/contracts/* dapp/src/contracts
```

En otro terminal levantamos el proyecto de React.

```
cd dapp
npm install
npm start
```

## Mejoras al proyecto
1. **Obtener un listado con las notas de todos los alumnos en una determinada evaluación**: En la página *Evaluaciones* se puede ver una tabla con todas las evaluaciones de la asignatura. La mejora consiste en añadir un enlace en cada entrada de la tabla que redirecciona a otra página, la cual muestra en una tabla todas las notas correspondientes a esa evaluación. Este enlace es visible sólo para los profesores.

2. **Editarse la nota de un alumno en una determinada evaluacion sin tener que escribir la dirección del alumno**: En la tabla de calificaciones, se ha creado un botón (que sólo aparece si se es un profesor) el cual muestra un formulario que permite editar la nota y el tipo sin introducir la dirección del alumno. Como **mejora adicional**, este formulario también aparece en la página *Evaluaciones*.

3. **Obtener un listado con las notas de un alumno en un todas las evaluaciones**: En la página *Mis Cosas* se muestra una tabla con todas las evaluaciones y las notas del alumno conectado. Como **mejora adicional** se ha metido esta tabla dentro del componente *SoloAlumno*, el cual muestra la tabla si y sólo si el usuario conectado está matriculado.

4. **En la página Home, mostrar todos los profesores registrados en la asignatura**: Se ha programado una tabla que muestra el nombre del profesor y su dirección. Esta tabla sólo aparece al owner.

5. **En la página Home, crear un formulario para añadir un nuevo profesor**: Se ha creado un formulario en el que se introduce el nombre del profesor y su dirección para registrarlo como profesor de la asignatura. Este formulario sólo aparece al owner.

6. **Extender la funcionalidad del formulario de cerrar la asignatura**: Se ha programado el formulario para que no sólo se pueda cerrar la asignatura, sino que también pueda volver a abrirse, todo ello a partir de un único botón.

6. **Añadidos nuevos métodos en el contrato**: Se han añadido nuevos métodos para poder implementar las funciones de las mejoras. Destacamos la función `abrir()`, la cual abre la asignatura (poniendo el valor *cerrada* a `false`), y el atributo `isProfesor`, el cual es un mapping que vincula una dirección a un booleano y permite determinar si una dirección es un profesor o no.