# Synthesizer

**Synthesizer** es una aplicación web interactiva que funciona como un sintetizador musical. Está diseñada para ser utilizada en dispositivos móviles con un **viewport vertical (Viewport horizontal: en construcción)**, ofreciendo una experiencia intuitiva y centrada en la creación de sonidos. La aplicación incluye un teclado virtual, controles de configuración de sonido y un diseño responsive para una óptima visualización en pantallas pequeñas.

## Características Principales

### 1. **Teclado Virtual Interactivo**
   - Teclado con 12 teclas (7 blancas y 5 negras) que representan las notas musicales de una octava.
   - Las teclas blancas corresponden a las notas naturales (C, D, E, F, G, A, B).
   - Las teclas negras representan las notas sostenidas (C#, D#, F#, G#, A#).

### 2. **Controles de Sonido**
   - **Selector de Forma de Onda:** Permite elegir entre diferentes formas de onda para generar el sonido:
     - Sine (senoidal)
     - Square (cuadrada)
     - Triangle (triangular)
     - Sawtooth (diente de sierra)
   - **Selector de Octava:** Ajusta la octava del sonido generado (opciones de octava 2 a 6).
   - **Selector de Polifonía:** Controla el número de voces simultáneas (1 a 4 voces).
   - **Controles ADSR:** Ajusta los parámetros de envolvente del sonido:
     - Attack (ataque)
     - Decay (decaimiento)
     - Sustain (sostenido)
     - Release (liberación)
   - **Control de Volumen:** Regula el volumen general del sintetizador.

### 3. **Funcionalidad de Sonido en Tiempo Real**
   - Utiliza la **Web Audio API** para generar sonidos en tiempo real.
   - Los controles ADSR permiten personalizar la forma en que los sonidos se generan y desvanecen.

---

## Cómo Usar la Aplicación

1. **Abrir la Aplicación:**
   - Abre la aplicación en un navegador web compatible (recomendado Chrome, Firefox o Edge).

2. **Tocar el Teclado:**
   - Haz clic (o toca, en dispositivos táctiles) en las teclas del teclado virtual para generar sonidos.
   - Las teclas negras están superpuestas sobre las blancas para simular un teclado de piano real.

3. **Ajustar los Controles de Sonido:**
   - Utiliza los selectores y deslizadores para personalizar el sonido:
     - Cambia la forma de onda, octava, polifonía y parámetros ADSR.
     - Ajusta el volumen general.

4. **Explorar y Crear:**
   - Experimenta con diferentes combinaciones de formas de onda, octavas y parámetros ADSR para crear sonidos únicos.
   - Utiliza la polifonía para tocar acordes o melodías complejas.

---

## Tecnologías Utilizadas

- **HTML5:** Estructura de la aplicación.
- **CSS3:** Diseño responsive y estilos visuales.
- **JavaScript:** Lógica de la aplicación y manipulación del DOM.
- **Web Audio API:** Generación y manipulación de sonidos en tiempo real.

---

## Requisitos del Sistema

- Navegador web compatible con la **Web Audio API** (Chrome, Firefox, Edge, Safari).
- Dispositivo móvil con pantalla táctil (recomendado) o computadora con mouse.
- Conexión a Internet no requerida (la aplicación funciona completamente en el cliente).