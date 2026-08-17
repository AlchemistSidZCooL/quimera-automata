# Changelog: Quimera Automata (Juego de la Vida)

## [1.5.0] - Océano Vivo y Entropía Cósmica (Fase 4)
- **AUDIO: Biblioteca NOAA Científica (9 samples profesionales)**
  - Reemplazo total de los samples previos por grabaciones oficiales de la NOAA (National Oceanic and Atmospheric Administration).
  - **5 clips de Ballena Jorobada** (Megaptera novaeangliae): Canto Majestuoso, Llanto Melancólico, Canto de Amor/Tierno, Canto Dulce, y Melodía Profunda Final.
  - **3 clips de Orca** (Orcinus orca): Llamada Social/Feliz, Profunda/Nostálgica, y Tierna/Enamorada.
  - **1 clip de Beluga** (Delphinapterus leucas): Canto Tierno.
  - Post-procesamiento profesional con `ffmpeg`: eliminación de silencios (`silenceremove`), filtro de ruido (`highpass 80-100Hz`), normalización (`loudnorm`) y amplificación selectiva (+5 a +14 dB según la fuente).
  - Los audios ahora suenan SIEMPRE (sin importar la paleta seleccionada), con cooldown de 3 segundos.
- **VISUAL: Paleta Oceánica Dinámica (Olas Cromáticas)**
  - La paleta "Abismo Oceánico" ya no es estática. Aplica un `abyssShift` senoidal a TODAS las células vivas al renderizar.
  - **Ola principal (~45s):** Oscila ±55° de matiz (Esmeralda 155° → Petróleo 180° → Azul Profundo 220° → Violeta 275°).
  - **Ola secundaria (~15s):** Textura orgánica ±15° para evitar colores planos.
  - Las células nuevas también reciben un hue dinámico basado en `Date.now()`.
- **SISTEMA ANTI-ESTANCAMIENTO v2.0 (µEntropía)**
  - Nuevo tracking de historial de población (`popHistory[30]`) para detectar:
    - Vida estática pura (bloques, colmenas): `cellsChanged < 5`
    - Tablero vacío: `currentPop === 0`
    - Oscilaciones estancadas (blinkers/toads): comparación de suma de población entre bloques de 10 frames.
  - **6 tipos de catástrofes:**
    - `Meteorite`: Impacto cósmico con cráter central y onda expansiva en posición ALEATORIA (radio variable 15-30).
    - `Earthquake`: Redistribución total de toda la materia viva.
    - `Extinction`: Extinción masiva (95%) + siembra de 5 R-Pentominos supervivientes.
    - `Big Bang`: Génesis completo.
    - `Glider Invasion` (NUEVO): 8-20 Naves Planeadoras con rotación aleatoria invaden el tablero.
    - `Spaceship Fleet` (NUEVO): 5-13 R-Pentominos (generadores de caos) desplegados aleatoriamente.
  - Si el tablero está vacío, solo se permiten eventos de creación.
- **UI/UX:**
  - Feedback acústico instantáneo al hacer clic (bypass del cooldown normal).
  - Ballenas Jorobadas ahora son el 45% de los sonidos (protagonistas principales).
  - La versión del README se actualizó a 1.4.0 con documentación completa de motores y controles.

## [1.4.0] - God Mode y Biosfera Realista (Fase 3)
- **MOTOR 4 (Biosfera Realista):** Integración de motor de Samplers asíncrono para reproducción de audio hiperrealista.
  - Implementación de descarga de audios (`.ogg`) usando `fetch` nativo.
  - Generación de estados emocionales (alegría, tristeza) en cantos de ballenas alterando proceduralmente el `playbackRate` de los Samplers.
- **God Mode Panel:** Expansión radical del control del usuario sobre el motor de renderizado.
  - `Slider de Brillo Neón`: Control dinámico en tiempo real del algoritmo `shadowBlur` (0 a 100%).
  - `Slider de Rastro`: Modificación del canal Alpha del Canvas (`rgba()`) para permitir estelas fantasmas infinitas y pintura en tiempo real.
  - `Interruptor de Aislamiento Acústico`: Permite silenciar la síntesis FM compleja (Orcas/Delfines) para focalizar la experiencia en el canto de la Ballena Jorobada.
- **Sistema Anti-Estancamiento (Idle Catastrophes):** Si el tablero se congela o entra en un bucle cerrado sin avance poblacional significativo durante 4 segundos, el motor inyectará automáticamente un "Hecho Catastrófico" aleatorio para forzar la evolución:
  - `Meteorite`: Impacto gigante en el centro de la pantalla.
  - `Earthquake`: Redistribución y reubicación total de la vida existente.
  - `Extinction`: Extinción masiva del 95% de la población.
  - `Big Bang`: Génesis explosivo aleatorio.
- **Perfeccionamiento Visual:** Actualización de la paleta "Abismo Oceánico" a tonos verde petróleo y aguamarinas cristalinos.


## [1.3.0] - Sinfonía Generativa y Estética Premium (Fase 2)
- **Motor 3 (Audio Espacial):** Integración de Web Audio API para síntesis procedural.
  - Viento Solar reactivo: Ruido Rosa que atraviesa un filtro pasa-bajos, abriendo frecuencias según la masa poblacional viva.
  - Biología Marina Acústica (Paleta Abismo): Síntesis matemática de Ballenas Jorobadas, Orcas y Delfines.
  - Pings Celestiales: Notas pentatónicas espaciales en colisiones.
  - El audio reacciona inteligentemente a interacciones del usuario (clics) y a colisiones/explosiones de población automáticas (`deltaPop > 10`).
- **Pincel Biológico Avanzado:** Las Naves Planeadoras (`Gliders`) ahora se insertan con rotaciones aleatorias (0, 90, 180, 270 grados) en cada clic.
- **Aura Neón y Rendimiento:** Rebalanceo del algoritmo de brillo (`shadowBlur`) restaurando la mezcla de colores intensa.
- **Mejoras para Pantallas Gigantes (DPI):** 
  - Escalado matemático de `devicePixelRatio` para evitar pixelado en monitores 4K o pantallas Retina.
  - El desenfoque neón se multiplica por el DPI para mantener proporciones en pantallas inmensas.
  - Inyección de Filtro CSS CRT (Scanlines muy finas y Viñeteado de bordes) para un "look" de hardware militar luxury.
- **Selector de Paleta:**
  - Nueva paleta *Luxury Silver* (Tonos de acero glaciar y platino con saturación rebajada y brillo intenso).
  - Mejora de *Luxury Gold* para excluir rojos/violetas e incluir solo tonos dorados, amarillos y naranjas puros.
- **UI Responsiva:** Panel de control con `max-height` y scrollbar cyberpunk custom para ordenadores portátiles.

## [1.2.0] - Arquitectura Multiverso (Fase 1)
- Reestructuración completa del motor `game.js` hacia Programación Orientada a Objetos (OOP).
- Creación de la clase `EngineClassic` (Motor 1) para preservar la simulación retro original (15px, Naranja Puro).
- Creación de la clase `EngineNeon` (Motor 2) para contener la simulación avanzada.
- Implementación del **Selector de Multiverso** en la UI que permite saltar entre versiones de la simulación en tiempo real, con soporte previsto para futuros motores de Audio y Gravedad Continua.

## [1.1.0] - Expansión "God Mode"
- **Pincel Biológico:** Inclusión de patrones avanzados pre-codificados en lugar de píxeles simples.
  - Añadido el patrón `Glider`.
  - Añadido el patrón `R-Pentominó` (Efecto Mariposa masivo).
  - Añadido el patrón `Pulsar`.
  - Añadido el patrón `Cañón Gosper` (Disparador infinito).
- **Rastros Estéticos (Lluvia de Matrix):** El fondo ya no se borra con negro opaco, sino con negro translúcido (`rgba(5,5,5,0.5)`), creando una estela luminosa detrás de las células en movimiento. Difuminado de neón optimizado para máxima nitidez.
- **Controlador del Tiempo (Cronos):** Implementación de un `input range` para variar la velocidad del `setTimeout` del bucle matemático en tiempo real (modo hipervelocidad a bullet-time).
- **Mutador de Leyes Universales:** Permite cambiar las reglas clásicas (B3/S23) a otros multiversos matemáticos:
  - *HighLife* (B36/S23)
  - *Laberinto Cyberpunk* (B3/S12345)
  - *Día y Noche* (B3678/S34678)
- **Visión Pura:** Botón flotante para ocultar completamente la interfaz mediante opacidad, permitiendo un modo salvapantallas interactivo.
- Botón de **PANTALLA COMPLETA** para inmersión total (Fullscreen API) que no destruye el universo actual al redimensionarse.

## [1.0.0] - Génesis del Proyecto
- Implementación de la matriz bidimensional del Autómata Celular de J.H. Conway en Javascript Puro.
- Interfaz gráfica implementada en HTML5 Canvas con estética "Cyberpunk / Hacker".
- Controles interactivos: `Iniciar`, `Pausar`, `Purgar` y `Génesis`.
- Interactividad con el ratón (`click` y `drag`) para dibujar vida manualmente.
- Reducción extrema del tamaño del píxel (`resolution = 5`) para abarcar pantallas gigantes y monitores dobles de forma nativa e inmersiva.
- Conversión de lógica binaria simple a lógica de objetos (`{alive: boolean, hue: number}`).
- Implementación del sistema de herencia de color: Las células hijas nacen con el color promedio exacto de sus 3 células vecinas progenitoras.
- Añadido el botón de `MUTACIÓN (Neón)` para inyectar radiación cromática aleatoria sobre la matriz en tiempo real.
- Auto-ejecución del botón de `Génesis` (Big Bang) en la primera carga de la página.
