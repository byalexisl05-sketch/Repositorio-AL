/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Indica si la validacion fue exitosa.
 * @property {string} [errorMessage] - Mensaje de error si la validacion falla.
 * @property {string} [errorCode] - Codigo corto que identifica el error.
 * @property {Object} [parameters] - Parametros usados en la validacion.
 */

// Verifica que un campo no este vacio (ejemplo: campo "usuario" en GamesGauges)
function validarRequerido(value) {
    const isValid = value.trim().length > 0;
    return {
        isValid,
        errorMessage: isValid ? null : "El campo es obligatorio.",
        errorCode: isValid ? null : "REQUIRED",
        parameters: { value }
    };
}

// Verifica que el formato de email sea valido (ejemplo: registro de usuario en GamesGauges)
function validarFormatoEmail(value) {
    const regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const isValid = regex.test(value);
    return {
        isValid,
        errorMessage: isValid ? null : "El correo electronico no es valido.",
        errorCode: isValid ? null : "INVALID_EMAIL_FORMAT",
        parameters: { value, regexUsed: regex.toString() }
    };
}

// Valida longitud minima y maxima (ejemplo: contraseña de usuario)
function validarLongitud(value, min, max) {
    const isValid = value.length >= min && value.length <= max;
    return {
        isValid,
        errorMessage: isValid ? null : `La longitud debe estar entre ${min} y ${max} caracteres.`,
        errorCode: isValid ? null : "INVALID_LENGTH",
        parameters: { value, min, max }
    };
}

// Valida que la contraseña sea compleja (ejemplo: registro de usuario en GamesGauges)
function validarPasswordCompleja(password) {
    const startsWithUpper = /^[A-Z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let isValid = startsWithUpper && hasUpper && hasNumber && hasSymbol;
    let errorMessage = null;
    let errorCode = null;

    if (!startsWithUpper) {
        errorMessage = "La contrasena debe iniciar con una letra mayuscula.";
        errorCode = "STARTS_NOT_UPPER";
    } else if (!hasUpper) {
        errorMessage = "La contrasena debe contener al menos una letra mayuscula.";
        errorCode = "NO_UPPERCASE";
    } else if (!hasNumber) {
        errorMessage = "La contrasena debe contener al menos un numero.";
        errorCode = "NO_NUMBER";
    } else if (!hasSymbol) {
        errorMessage = "La contrasena debe contener al menos un simbolo especial.";
        errorCode = "NO_SYMBOL";
    }

    return {
        isValid,
        errorMessage: isValid ? null : errorMessage,
        errorCode: isValid ? null : errorCode,
        parameters: {
            value: password,
            startsWithUpper,
            hasUpper,
            hasNumber,
            hasSymbol
        }
    };
}

// Valida que dos contrasenas coincidan (ejemplo: registro en GamesGauges)
function validarConfirmacionClave(clave1, clave2) {
    const isValid = clave1 === clave2;
    return {
        isValid,
        errorMessage: isValid ? null : "Las contrasenas no coinciden.",
        errorCode: isValid ? null : "PASSWORD_MISMATCH",
        parameters: { clave1, clave2 }
    };
}

// Valida que el numero de telefono sea solo numeros
function validarSoloNumeros(valor) {
    const regex = /^[0-9]+$/;
    const isValid = regex.test(valor);
    return {
        isValid,
        errorMessage: isValid ? null : "Solo se permiten numeros.",
        errorCode: isValid ? null : "ONLY_NUMBERS",
        parameters: { value: valor }
    };
}

// validar que no haya contenido ofensivo en una reseña
function validarContenidoOfensivo(valor) {
    const palabrasProhibidas = ["Mierda" ,"puta", "mamon", "nigger"];  // Puedes agregar más palabras
    for (let palabra of palabrasProhibidas) {
        if (valor.toLowerCase().includes(palabra.toLocaleLowerCase())) {
            return {
                isValid: false,
                errorMessage: 'La reseña contiene palabras inapropiadas.',
                errorCode: 'INAPPROPRIATE_CONTENT',
                parameters: { value: valor, bannedWords: palabrasProhibidas }
            };
        }
    }
    return { isValid: true };
}

// validar que no se escriba todo en mayusculas en una reseña
function validarNoMayusculas(valor) {
    if (valor === valor.toUpperCase()) {
        return {
            isValid: false,
            errorMessage: 'Por favor, no escribas la reseña en mayúsculas.',
            errorCode: 'UPPERCASE_TEXT',
            parameters: { value: valor }
        };
    }
    return { isValid: true };
}

// validar que no haya enlaces externos en una reseña
function validarSinEnlacesExternos(valor) {
    const regex = /https?:\/\/[^\s]+/;
    if (regex.test(valor)) {
        return {
            isValid: false,
            errorMessage: 'La reseña no debe contener enlaces externos.',
            errorCode: 'EXTERNAL_LINKS',
            parameters: { value: valor, regexUsed: regex }
        };
    }
    return { isValid: true };
}

// validar que el texto inicie por mayúsculas y termine en punto
function validarTexto(texto) {
  const regex = /^[A-ZÁÉÍÓÚÑ].*\.$/;
  if (!regex.test(texto)) {
        return {
            isValid: false,
            errorMessage: 'La reseña debe empezar por mayúscula y acabar por punto (.).',
            errorCode: 'GRAMMAR_ISSUE',
            parameters: { value: texto, regexUsed: regex }
        };
    }
    return { isValid: true };
}
