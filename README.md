# Synthesizer

El **Synthesizer** es una aplicación web interactiva que funciona como un sintetizador musical. Está diseñada para ser utilizada en dispositivos móviles, ofreciendo una experiencia intuitiva y centrada en la creación de sonidos. La aplicación incluye un teclado virtual, controles de configuración de sonido y un diseño responsive para una visualización óptima en pantallas pequeñas.

## Características principales

### Teclado virtual interactivo

- **17 teclas** (10 blancas y 7 negras)  que representan las notas musicales de una octava y media.
- Las **teclas blancas** corresponden a las notas naturales (**C, D, E, F, G, A, B, C, D, E**).
- Las **teclas negras** representan las notas sostenidas (**C#, D#, F#, G#, A#, C#, D#**).

### Controles de sonido

- **Selector de forma de onda:** Permite elegir entre formas de onda como senoidal, cuadrada, triangular y diente de sierra.
- **Selector de octava:** Ajusta la octava del sonido generado (opciones de octava 2 a 6).
- **Selector de polifonía:** Controla el número de voces simultáneas (de 1 a 4 voces).
- **Controles ADSR:** Permite ajustar los parámetros de envolvente del sonido (**Ataque, Decaimiento, Sostenido y Liberación**).
- **Control de volumen:** Regula el volumen general del sintetizador.

### Funcionalidad de sonido en tiempo real

- Utiliza la **Web Audio API** para generar sonidos en tiempo real.
- Los **controles ADSR** permiten personalizar la generación y desvanecimiento de los sonidos.

## Instrucciones de uso

1. Abra la aplicación en un navegador web compatible (**Chrome, Firefox o Edge**).
2. Toque el teclado virtual (en dispositivos táctiles) o haga clic en las teclas (en computadoras) para generar sonidos.
3. Utilice los selectores y deslizadores para personalizar el sonido, modificando la forma de onda, octava, polifonía y parámetros ADSR.
4. Ajuste el volumen general según sus preferencias.
5. Explore diferentes combinaciones para crear sonidos únicos y aproveche la polifonía para tocar acordes o melodías complejas.

## Tecnologías utilizadas

- **HTML5:** Para la estructura de la aplicación.
- **CSS3:** Para el diseño responsive y los estilos visuales.
- **JavaScript:** Para la lógica de la aplicación y la manipulación del DOM.
- **Web Audio API:** Para la generación y manipulación de sonidos en tiempo real.

## Requisitos del sistema

- **Navegador web** compatible con la Web Audio API (**Chrome, Firefox, Edge, Safari**).
- **Dispositivo móvil** con pantalla táctil (recomendado) o computadora con mouse.
- **No se requiere conexión a internet**, ya que la aplicación funciona completamente en el cliente.
