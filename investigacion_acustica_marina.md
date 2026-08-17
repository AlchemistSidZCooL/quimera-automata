# Investigación: Acústica Biológica de Ballenas Jorobadas (Megaptera novaeangliae)

## Rango de Frecuencias y Características Generales
Las vocalizaciones de las ballenas jorobadas abarcan un espectro masivo, desde los **50 Hz hasta más de 10 kHz**, aunque la mayor parte de la energía dominante y audible se concentra **por debajo de los 3 kHz**.

La acústica difiere drásticamente según la edad, el sexo y el contexto biológico (social, apareamiento o supervivencia).

---

## 1. Machos Adultos (El Canto de Apareamiento)
*   **Frecuencias:** Bajas y resonantes (100 Hz - 400 Hz en sus notas base), con armónicos que alcanzan frecuencias más altas.
*   **Complejidad:** Alta. Producen secuencias complejas, rítmicas y repetitivas ("canciones") que pueden durar horas.
*   **Propósito:** Emitidos principalmente por machos solitarios en zonas de reproducción o durante la migración para atraer hembras o establecer territorio.
*   **Propagación:** Diseñados para viajar cientos de kilómetros bajo el agua, aprovechando el "canal SOFAR" (canal de sonido profundo).

## 2. Ballenatos / Crías (Llamadas de Contacto y Balbuceo)
*   **Frecuencias:** Más altas que los adultos (400 Hz - 800 Hz) debido al menor tamaño de su cavidad torácica y tracto vocal.
*   **Complejidad:** Baja. Sus sonidos son más erráticos, cortos y limitados en repertorio. A menudo se describen como "gruñidos" (grunts) o "chirridos" (squeaks).
*   **Propósito:** Al igual que los bebés humanos, los ballenatos "balbucean" mientras desarrollan sus cuerdas vocales, produciendo versiones inmaduras de los sonidos adultos.

## 3. Interacción Madre-Cría: La "Cripsis Acústica" (El Susurro)
*   **Frecuencias:** Muy bajas (80 Hz - 200 Hz).
*   **Amplitud (Volumen):** Extremadamente débil y tenue.
*   **Propósito:** Supervivencia. Para evitar ser detectados por depredadores (como las Orcas) o por machos escolta agresivos, las madres y las crías se comunican usando **cripsis acústica** (susurrando). 
*   **Propagación:** Estas llamadas tienen un "espacio activo" muy limitado (100 metros a 2 km). Si se separan, en lugar de gritar más fuerte (lo que atraería a las orcas), simplemente **aumentan la velocidad** a la que se susurran.

---

## 4. Comportamiento Social: "Feeding Calls" (Llamadas de Alimentación)
*   **Contexto:** Utilizadas durante eventos cooperativos de alimentación (como las redes de burbujas).
*   **Función (Sincronización y Manipulación):** Sonidos muy fuertes y agudos (parecidos al silbato de un tren) que sirven para coordinar al grupo ("Listos, ya!") y para asustar/agrupar a los bancos de peces, haciéndolos más densos y fáciles de tragar.
*   **Naturaleza:** Acústicamente violentos y estruendosos, diseñados para generar pánico en la presa.

## 5. "Contact Calls" (Llamadas de Contacto / El "Whup")
*   **El "Whup":** Es el sonido social más común. A diferencia del canto de los machos, el "whup" es usado por hembras, crías y machos por igual.
*   **Propósito:** Funciona como un saludo acústico ("Estoy aquí"). Se utiliza para mantener unidas a las familias, reencontrarse tras separaciones y conversar a corta distancia.
*   **Estabilidad:** Mientras que las "canciones" de apareamiento evolucionan como la moda cada año, el "whup" es un sonido social constante que no cambia a través de las generaciones.

---

## Aplicación Práctica en Síntesis de Audio (Juego de la Vida)
Para emular esta riqueza biológica en la API de Web Audio mediante Matemáticas y Síntesis Aditiva:

1.  **Adultos:** Osciladores `sawtooth` graves (120 Hz) + `triangle` desafinados con Envolventes largas (3-5 segundos) y Filtros Formantes de resonancia media.
2.  **Ballenatos:** Frecuencias iniciales altas (400+ Hz), duraciones muy cortas (0.8s) y Vibrato (LFO) rápido.
3.  **Susurros:** Frecuencias sub-graves (80 Hz), ganancia casi nula (volumen al 15%) y filtro paso-bajo (`bandpass` ahogado) para emular la absorción del agua en distancias cortas.

*Fuentes consultadas: Investigación oceanográfica acústica (NPS, AIP, PLOS, NMMF).*
