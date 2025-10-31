# Grupo N4 Gamesgauge

## Integrantes y contribuciones
- Jostin Romero 
- José Fernández 
- Alexis Lucas 

# API de Validaciones - GamesGauges

Este archivo documenta todas las funciones de validacion diseñadas para el proyecto **GamesGauges**.  
Cada funcion devuelve un objeto **ValidationResult** estandarizado que indica si la validacion fue exitosa o si hubo algun error.

---

## Estructura de salida: ValidationResult

```js
/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Verdadero si la validacion fue exitosa.
 * @property {string} [errorMessage] - Mensaje de error si la validacion falla.
 * @property {string} [errorCode] - Codigo corto que describe el error.
 * @property {Object} [parameters] - Parametros utilizados en la validacion.
 */

validarRequerido("");      // Falla
validarRequerido("Joseft"); // Pasa

validarFormatoEmail("usuario@mail.com"); // Pasa
validarFormatoEmail("correo_invalido");  // Falla

validarLongitud("abc", 5, 10);   // Falla
validarLongitud("abcdef", 5, 10); // Pasa

validarPasswordCompleja("Password123!");  // Pasa
validarPasswordCompleja("password123!");  // Falla

validarConfirmacionClave("clave123","clave123"); // Pasa
validarConfirmacionClave("clave123","clave321"); // Falla

validarSoloNumeros("12345"); // Pasa
validarSoloNumeros("123a5"); // Falla

validarContenidoOfensivo("Muy bueno"); // Pasa
validarContenidoOfensivo("es una puta  mierda"); // Falla

validarNoMayusculas("Hola que buen juego"); // Pasa
validarNoMayusculas("HOLA QUE BUEN JUEGO"); // Falla

validarSinEnlacesExternos("Hola que buen juego y me gusta el pan con queso "); // Pasa
validarSinEnlacesExternos("HOLA QUE BUEN JUEGO https://aulavirtualmoodle.uleam.edu.ec/mod/quiz/attempt.php?attempt=529616&cmid=172113&page=1 "); // Falla  
