// app.js - versión consolidada y modular (usar como módulo: <script type="module">)

import { mostrarError, mostrarExito, limpiarError } from './dom-utils.js';
import {
    validarResena,
    validarRequerido,
    validarFormatoEmail,
    validarPasswordCompleja,
    validarConfirmacionClave
} from './validations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Campos de registro / ejemplo
    const usuarioInput = document.querySelector('#usuario');
    const emailInput = document.querySelector('#email');
    const claveInput = document.querySelector('#clave');
    const confirmarClaveInput = document.querySelector('#confirmar-clave');

    // Validación en tiempo real con comprobación de existencia
    if (usuarioInput) {
        usuarioInput.addEventListener('input', () => {
            const resultado = validarRequerido(usuarioInput.value);
            resultado.isValid ? mostrarExito(usuarioInput) : mostrarError(usuarioInput, resultado);
        });
    }

    if (emailInput) {
        emailInput.addEventListener('input', () => {
            const resultado = validarFormatoEmail(emailInput.value);
            resultado.isValid ? mostrarExito(emailInput) : mostrarError(emailInput, resultado);
        });
    }

    if (claveInput) {
        claveInput.addEventListener('input', () => {
            const resultado = validarPasswordCompleja(claveInput.value);
            resultado.isValid ? mostrarExito(claveInput) : mostrarError(claveInput, resultado);
        });
    }

    if (confirmarClaveInput && claveInput) {
        confirmarClaveInput.addEventListener('input', () => {
            const resultado = validarConfirmacionClave(claveInput.value, confirmarClaveInput.value);
            resultado.isValid ? mostrarExito(confirmarClaveInput) : mostrarError(confirmarClaveInput, resultado);
        });
    }

    // ---- Validación reseñas ----
    const formResena = document.getElementById('form-resena'); // asegúrate que el form tenga este id
    const comentario = document.getElementById('comentario');

    if (formResena && comentario) {
        comentario.addEventListener('input', () => {
            const resultado = validarResena(comentario.value, 5, 50);
            limpiarError(comentario);

            if (!resultado.isValid) {
                mostrarError(comentario, resultado);
            } else {
                mostrarExito(comentario);
            }
        });

        formResena.addEventListener('submit', (e) => {
            const resultado = validarResena(comentario.value, 5, 50);
            limpiarError(comentario);

            if (!resultado.isValid) {
                e.preventDefault();
                mostrarError(comentario, resultado);
                alert(resultado.errorMessage);
                return;
            }

            // Si pasa la validación
            alert('¡Reseña publicada con éxito!');
            comentario.value = '';
        });
    }
});