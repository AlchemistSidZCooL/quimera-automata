# Quimera Automata (El Juego de la Vida)

**Versión:** 1.5.0
**Tecnología:** HTML5 Canvas, Vanilla JavaScript, CSS3, Web Audio API
**Estética:** Cyberpunk Luxury / CRT Analógico / Alquímico

## Sobre el Proyecto
Esta es una implementación del clásico autómata celular matemático de **John Horton Conway** ("El Juego de la Vida"). No es un juego en el sentido tradicional, sino un ecosistema matemático infinito donde las células ("píxeles") nacen, sobreviven o mueren basándose exclusivamente en reglas predefinidas y la interacción con sus 8 vecinos.

### Modificación Genética ("Inmigración de Conway")
Esta versión de *Quimera Alchimest* no se limita a células binarias (blanco o negro). Incorpora un motor genético donde **cada célula posee un color (ADN Neón)**. Cuando tres células se unen para dar vida a una nueva, la hija hereda matemáticamente la mezcla de color de sus tres padres, generando hermosas ondas de color cyberpunk en tiempo real. Además, cuenta con distintas **Paletas Cromáticas** (Cyberpunk, Luxury Gold, Silver, Matrix, Abismo Oceánico).

### Sinfonía Generativa y Biosfera Realista (Motor de Audio Oceánico)
El simulador cuenta con dos motores acústicos integrados vía Web Audio API:
- **Motor 3 (Sintético):** Genera un "Viento Cósmico" interactivo y sintetiza cantos matemáticos de ballenas jorobadas y orcas mediante modulación de frecuencia (FM) e inyección LFO.
- **Motor 4 (Biosfera Realista):** Actúa como un Sampler Asíncrono de alta calidad. Descarga directamente en memoria grabaciones científicas submarinas (Ballenas Jorobadas en la Antártida) de la NOAA y altera su pitch y tiempo (Playback Rate) y reverberación espaciada matemáticamente según el algoritmo para generar cantos emocionales dinámicos infinitos.

### Sistema de Prevención de Estancamiento (Idle Catastrophes)
El universo interviene automáticamente: Si las células caen en un patrón estático permanente o un bucle aburrido sin evolución biológica detectable durante 4 segundos, el núcleo de la IA dispara una catástrofe global al azar (Impacto de Asteroide, Terremoto, Extinción Masiva, o Inversión de Big Bang) para forzar un nuevo ciclo orgánico de la vida.

## Las 3 Leyes Universales
1. **Muerte (Soledad o Superpoblación):** Una célula viva con menos de 2 o más de 3 vecinos, muere.
2. **Nacimiento:** Una célula muerta con exactamente 3 vecinos, nace. (Heredando el color promedio de los padres).
3. **Supervivencia:** Una célula viva con 2 o 3 vecinos, se mantiene viva.

## Instalación y Ejecución
1. No requiere dependencias (Node, npm, etc).
2. Simplemente abre `index.html` en cualquier navegador web moderno.
3. (Opcional) Para ejecutarlo desde un servidor local en Python:
   `python3 -m http.server 8086`

## Controles de Interfaz (God Mode)
*   **MULTIVERSO (Motores):** Cambia entre el Motor Clásico, el Motor Neón, el Motor Acústico Sintético, o la Biosfera Realista de Samplers.
*   **INICIAR / PAUSAR:** Controla el avance del tiempo (Estasis vs Evolución).
*   **PURGAR:** Destruye el universo (Vacío Absoluto).
*   **GÉNESIS:** Siembra aleatoria masiva (Big Bang).
*   **MUTACIÓN:** Inyecta radiación aleatoria, cambiando bruscamente los colores genéticos de la población viva actual.
*   **CONTROL DEL TIEMPO:** Slider para variar la velocidad matemática (de Bullet-Time a Hipervelocidad).
*   **DESENFOQUE Y RASTRO (God Mode):** Sliders para sobrecargar la intensidad de los colores de neón (`shadowBlur`) y pintar estelas infinitas o destellos ciegos (`Alpha Blend`).
*   **PINCEL BIOLÓGICO:** Inyecta materia oscura (Píxeles), Naves Planeadoras rotatorias, Pulsos estelares o Cañones.
*   **LEYES DEL UNIVERSO:** Cambia la física fundamental (Conway, HighLife, Laberinto, Día y Noche).
*   **PALETA CROMÁTICA:** Selecciona el aspecto visual del ADN de las células.
*   **PANTALLA COMPLETA:** Sumérgete totalmente, el Canvas escalará inteligentemente a 4K usando los DPI del monitor.
*   **VISIÓN PURA:** Oculta por completo la interfaz para que quede como una obra de arte digital interactiva.

---
*"Para ver un Mundo en un Grano de Arena... Abarca el Infinito en la palma de tu mano."* ~ William Blake
