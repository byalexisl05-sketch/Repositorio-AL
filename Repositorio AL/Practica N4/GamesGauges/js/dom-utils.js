// dom-utils.js - utilidades para mostrar/limpiar errores visuales en inputs

export function mostrarError(inputElement, validationResult) {
    if (!inputElement) return;
    limpiarError(inputElement);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = validationResult.errorMessage || 'Valor inválido';
    inputElement.classList.add('input-error');
    // Intenta poner el mensaje después del input, si no, lo agrega al padre
    if (inputElement.parentElement) {
        inputElement.parentElement.appendChild(errorDiv);
    } else {
        inputElement.insertAdjacentElement('afterend', errorDiv);
    }
}

export function mostrarExito(inputElement) {
    if (!inputElement) return;
    limpiarError(inputElement);
    inputElement.classList.add('input-valid');
}

export function limpiarError(inputElement) {
    if (!inputElement || !inputElement.parentElement) return;
    const errorDiv = inputElement.parentElement.querySelector('.error-message');
    if (errorDiv) errorDiv.remove();
    inputElement.classList.remove('input-error', 'input-valid');
}