/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Indica si la validacion fue exitosa.
 * @property {string} [errorMessage] - Mensaje de error si la validacion falla.
 * @property {string} [errorCode] - Codigo corto que identifica el error.
 * @property {Object} [parameters] - Parametros usados en la validacion.
 */

// validations.js - funciones de validación reusables (exportadas)

export function validarResena(value, minPalabras = 10, maxPalabras = 150) {
    const texto = (value || '').trim();
    const palabras = texto.length ? texto.split(/\s+/) : [];
    const numPalabras = palabras.filter(p => p.length > 0).length;

    const malasPalabras = ["tonto", "idiota", "imbecil", "estupido", "mierda", "basura", "maldito", "asqueroso"];
    const contieneMalaPalabra = malasPalabras.some(palabra =>
        texto.toLowerCase().includes(palabra)
    );

    // Detectar enlaces/URLs:
    // - http:// o https://
    // - www.
    // - mailto:
    // - etiquetas HTML <a ...>
    // - dominios con TLD comunes (.com, .net, .org, .io, .es, .co, .info, .biz, .me, .edu, .gov)
    const urlRegex = /(?:https?:\/\/[^\s]+)|(?:www\.[^\s]+)|(?:mailto:[^\s]+)|(?:<a\b[^>]*>[\s\S]*?<\/a>)|(?:\b[a-z0-9-]+(?:\.[a-z0-9-]+)+\.(?:com|net|org|io|es|co|info|biz|me|edu|gov)\b)/i;
    const contieneLink = urlRegex.test(texto);

    let isValid = true;
    let errorMessage = null;
    let errorCode = null;

    if (numPalabras < minPalabras) {
        isValid = false;
        errorMessage = `La reseña debe tener al menos ${minPalabras} palabras.`;
        errorCode = "TOO_SHORT";
    } else if (numPalabras > maxPalabras) {
        isValid = false;
        errorMessage = `La reseña no puede exceder las ${maxPalabras} palabras.`;
        errorCode = "TOO_LONG";
    } else if (contieneLink) {
        isValid = false;
        errorMessage = "No se permiten enlaces o URLs en la reseña.";
        errorCode = "CONTAINS_LINK";
    } else if (contieneMalaPalabra) {
        isValid = false;
        errorMessage = "Tu reseña contiene palabras inapropiadas.";
        errorCode = "BAD_LANGUAGE";
    } else if (texto && texto === texto.toUpperCase()) {
        isValid = false;
        errorMessage = "No escribas tu reseña completamente en mayúsculas.";
        errorCode = "ALL_UPPERCASE";
    }

    return {
        isValid,
        errorMessage,
        errorCode,
        parameters: { value: texto, numPalabras, minPalabras, maxPalabras, contieneMalaPalabra, contieneLink }
    };
}

export function validarRequerido(value = '') {
    if (value == null) value = '';
    return value.trim() === ''
        ? { isValid: false, errorMessage: 'Este campo es obligatorio.' }
        : { isValid: true, errorMessage: '' };
}

export function validarFormatoEmail(value = '') {
    const email = (value || '').trim();
    if (email === '') return { isValid: false, errorMessage: 'Correo obligatorio.' };
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email)
        ? { isValid: true, errorMessage: '' }
        : { isValid: false, errorMessage: 'Formato de correo inválido.' };
}

export function validarPasswordCompleja(value = '') {
    const pwd = (value || '');
    if (pwd.length < 8) {
        return { isValid: false, errorMessage: 'La contraseña debe tener al menos 8 caracteres.' };
    }
    if (!/[A-Za-z]/.test(pwd) || !/\d/.test(pwd)) {
        return { isValid: false, errorMessage: 'La contraseña debe incluir letras y números.' };
    }
    return { isValid: true, errorMessage: '' };
}

export function validarConfirmacionClave(password = '', confirm = '') {
    if (confirm === '') return { isValid: false, errorMessage: 'Confirme la contraseña.' };
    if (password !== confirm) return { isValid: false, errorMessage: 'Las contraseñas no coinciden.' };
    return { isValid: true, errorMessage: '' };
}