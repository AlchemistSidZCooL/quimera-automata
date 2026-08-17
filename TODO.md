# TODO & Visión Creativa: Quimera Automata v1.5.0+

## Estado Actual (17 Agosto 2026)
El motor tiene 4 niveles: Clásico → Neón Genético → Audio Sintético → **Biosfera Realista (NOAA)**.  
9 samples científicos de 3 especies. Sistema de catástrofes con 6 eventos. Paleta oceánica dinámica.

---

## Curiosidades y Filosofía del Usuario (Sid)

### Sobre la Entropía y la Vida
> *"Si se quedan quietos que genere un cataclismo... quizás si le metemos algo de esas teorías podríamos comprender más cosas"*

La observación de Sid toca la **Segunda Ley de la Termodinámica**: todo sistema cerrado tiende al máximo desorden (entropía). En el Juego de la Vida de Conway, un tablero eventualmente se estabiliza en patrones estáticos ("muerte térmica"). Nuestro sistema Anti-Estancamiento simula lo que en cosmología se llama **fluctuación cuántica del vacío**: incluso en el vacío más absoluto, la energía genera espontáneamente partículas. Las catástrofes son nuestras "fluctuaciones cuánticas".

### Sobre las Emociones de las Ballenas
> *"Quiero orcas felices, tristes y enamoradas"*

La bioacústica confirma que los cetáceos sí expresan estados emocionales mediante variaciones de frecuencia y ritmo:
- **Felicidad/Excitación:** Frecuencias más altas, cadencia rápida
- **Tristeza/Soledad:** Frecuencias bajas, notas largas y arrastradas
- **Cortejo/Ternura:** Frecuencias medias, ritmo repetitivo y melódico

Nuestro motor emula esto con `playbackRate` variable sobre grabaciones reales.

### Sobre los Colores como Olas
> *"Que vayan cambiando gradualmente como las olas vienen y van"*

Implementado con funciones senoidales (`Math.sin(Date.now())`) que oscilan el matiz HSL de TODAS las células vivas al momento del renderizado, creando un efecto de "respiración cromática oceánica".

---

## Backlog Prioritario

### 1. Más Sonidos (Siguiente Sesión)
- [ ] Buscar en YouTube documentales de BBC/NatGeo con cantos de ballenas jorobadas
- [ ] Usar `yt-dlp` para descargar la pista de audio
- [ ] Procesar con `ffmpeg` (silenceremove, loudnorm, highpass)
- [ ] Integrar como nuevos buffers en `EngineSampler.loadAudio()`
- [ ] **Objetivo:** Tener al menos 15 clips distintos para máxima variedad

### 2. Director Musical IA (Estratégico)
- [ ] Implementar un "Director" que analice el estado emocional del tablero:
  - Mucha vida = cantos alegres, playbackRate alto
  - Poca vida = melancolía, playbackRate bajo
  - Catástrofe reciente = sonidos dramáticos
  - Estabilidad = susurros suaves
- [ ] El Director debería modular el Delay y Feedback del eco en tiempo real

### 3. Catástrofes Visuales (Mejora)
- [ ] Añadir flash visual (pantalla blanca 100ms) al impactar un meteorito
- [ ] Efecto de onda expansiva visual (anillo que se expande desde el punto de impacto)
- [ ] Mostrar texto temporal en pantalla: "☄️ METEORITO" / "🌊 INVASIÓN DE NAVES"

### 4. Escalabilidad (Largo Plazo)
- [ ] Evaluar migración a PixiJS (WebGL) si la resolución de 5px se queda corta
- [ ] Considerar Web Workers para el cálculo de la generación en un hilo separado

---

## Archivos de Audio Actuales (`assets/audio/`)
| Archivo | Especie | Emoción | Duración | Fuente |
|---------|---------|---------|----------|--------|
| `whale_song_noaa.ogg` | Ballena Jorobada | Majestuoso | 4.5s | NOAA Fisheries |
| `whale_cry_noaa.ogg` | Ballena Jorobada | Triste/Melancólico | 6s | NOAA Fisheries |
| `whale_love_noaa.ogg` | Ballena Jorobada | Enamorada/Tierna | 5s | NOAA Fisheries |
| `whale_tender_noaa.ogg` | Ballena Jorobada | Dulce/Tierna | 3.5s | NOAA Fisheries |
| `whale_deep_noaa.ogg` | Ballena Jorobada | Profunda/Final | 5s | NOAA Fisheries |
| `orca_call_noaa.ogg` | Orca | Social/Feliz | 5s | NOAA/AWI |
| `orca_deep_noaa.ogg` | Orca | Profunda/Nostálgica | 5s | NOAA/AWI |
| `orca_tender_noaa.ogg` | Orca | Tierna/Enamorada | 5s | NOAA/AWI |
| `beluga_noaa.ogg` | Beluga | Tierna | 5s | NOAA/Castellote |
