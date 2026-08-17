/* =========================================================
   GAME.JS: ARQUITECTURA MULTIVERSO (Fase 1)
   ========================================================= */

const canvas = document.getElementById('universe');
const ctx = canvas.getContext('2d');

// Elementos de Interfaz
const btnStart = document.getElementById('btn-start');
const btnPause = document.getElementById('btn-pause');
const btnClear = document.getElementById('btn-clear');
const btnRandom = document.getElementById('btn-random');
const btnMutate = document.getElementById('btn-mutate');
const btnFullscreen = document.getElementById('btn-fullscreen');
const btnMute = document.getElementById('btn-mute');
const btnHelp = document.getElementById('btn-help');
const helpModal = document.getElementById('help-modal');
const btnCloseHelp = document.getElementById('btn-close-help');
const btnConfirmHelp = document.getElementById('btn-confirm-help');
const btnToggleUI = document.getElementById('btn-toggle-ui');
const uiContainer = document.getElementById('ui-container');
const engineSelector = document.getElementById('engine-selector');
const godModePanel = document.getElementById('god-mode-panel');

const genCountSpan = document.getElementById('gen-count');
const popCountSpan = document.getElementById('pop-count');
const speedSlider = document.getElementById('speed-slider');
const speedValSpan = document.getElementById('speed-val');
const glowSlider = document.getElementById('glow-slider');
const glowValSpan = document.getElementById('glow-val');
const trailSlider = document.getElementById('trail-slider');
const trailValSpan = document.getElementById('trail-val');
const brushSelector = document.getElementById('brush-selector');
const ruleSelector = document.getElementById('rule-selector');
const paletteSelector = document.getElementById('palette-selector');
const marineToggles = document.getElementById('marine-toggles');
const soloBallenas = document.getElementById('solo-ballenas');

// Variables de Control de Tiempo Globales
let animationId;
let isPlaying = false;
let isMuted = false;
let simSpeed = 50;

const palettes = {
    cyberpunk: [180, 300, 30, 270, 320, 15],
    // Luxury Gold: Oro puro, Amarillo Brillante, Naranja Cálido
    gold: [45, 50, 40, 55, 35, 48], 
    // Matrix Hacker: Verde clásico, Cyan Glitch, Rojo Alerta y Amarillo Ácido
    matrix: [120, 140, 180, 0, 60, 100],
    // Abismo Oceánico: Verde Petróleo, Aguamarina y Azules Profundos
    abyss: [160, 175, 190, 200, 210, 220],
    // Luxury Silver: Tonos de acero glaciar y platino (Azules gélidos que desaturaremos)
    silver: [210, 200, 220, 190, 0]
};
let currentPalette = palettes.cyberpunk;

function getRandomHue() {
    if (paletteSelector && paletteSelector.value === 'abyss') {
        // Ciclo muy lento y orgánico: de verdes (155) a violáceos (275), pasando por azules profundos
        let center = 215;
        let amplitude = 60;
        // Oscila completamente cada ~60 segundos
        let dynamicHue = center + Math.sin(Date.now() / 10000) * amplitude; 
        // Añadimos ruido (+- 15) para que no sea un color plano y tenga "textura" biológica
        return Math.floor(dynamicHue + (Math.random() * 30 - 15));
    }
    return currentPalette[Math.floor(Math.random() * currentPalette.length)];
}

// Diccionario de Patrones global
const patterns = {
    glider: [[0, 1, 0],[0, 0, 1],[1, 1, 1]],
    r_pentomino: [[0, 1, 1],[1, 1, 0],[0, 1, 0]],
    pulsar: [
        [0,0,1,1,1,0,0,0,1,1,1,0,0], [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1], [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1], [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0], [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1], [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1], [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0]
    ],
    glider_gun: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ]
};

/* =========================================================
   LA ARQUITECTURA DE MOTORES (CLASES)
   ========================================================= */

// MOTOR 1: CLÁSICO
class EngineClassic {
    constructor() {
        this.resolution = 15;
        this.generation = 0;
        this.birthRules = [3];
        this.surviveRules = [2, 3];
        
        // Esconder God Mode
        godModePanel.style.display = 'none';
        btnMutate.style.display = 'none'; // No hay neón que mutar
        
        this.resize();
    }

    resize() {
        let dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // Reiniciar y aplicar escala limpia

        this.cols = Math.floor(window.innerWidth / this.resolution);
        this.rows = Math.floor(window.innerHeight / this.resolution);
        this.grid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(0));
    }

    clear() {
        this.grid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(0));
        this.generation = 0;
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.updateStats(0);
    }

    triggerGenesis() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                this.grid[x][y] = Math.random() > 0.85 ? 1 : 0;
            }
        }
        this.generation = 0;
        this.draw();
    }

    draw() {
        // Borrado puro sin rastros
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let population = 0;
        ctx.fillStyle = '#F15A29'; // Naranja puro, sin glow
        ctx.shadowBlur = 0;
        
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[x][y] === 1) {
                    population++;
                    ctx.beginPath();
                    ctx.rect(x * this.resolution, y * this.resolution, this.resolution - 1, this.resolution - 1);
                    ctx.fill();
                }
            }
        }
        this.updateStats(population);
    }

    computeNextGeneration() {
        let nextGrid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(0));

        for (let x = 1; x < this.cols - 1; x++) {
            for (let y = 1; y < this.rows - 1; y++) {
                let state = this.grid[x][y];
                let count = 0;
                // Contar vecinos simples
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) continue;
                        count += this.grid[x + i][y + j];
                    }
                }

                if (state === 1 && this.surviveRules.includes(count)) {
                    nextGrid[x][y] = 1;
                } else if (state === 0 && this.birthRules.includes(count)) {
                    nextGrid[x][y] = 1;
                } else {
                    nextGrid[x][y] = 0;
                }
            }
        }
        this.grid = nextGrid;
        this.generation++;
    }

    darVida(mouseX, mouseY) {
        let col = Math.floor(mouseX / this.resolution);
        let row = Math.floor(mouseY / this.resolution);
        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
            this.grid[col][row] = 1;
            this.draw();
        }
    }

    updateStats(pop) {
        genCountSpan.innerText = this.generation;
        popCountSpan.innerText = pop;
    }
    
    mutate() {
        // Nada, el clásico no tiene mutación
    }
    
    updateRules() {
        // Siempre Conway
    }
}

// MOTOR 2: NEÓN GENÉTICO (God Mode)
class EngineNeon {
    constructor() {
        this.resolution = 5;
        this.generation = 0;
        this.birthRules = [3];
        this.surviveRules = [2, 3];
        this.stagnationTimer = 0;
        this.popHistory = [];  // Historial de población para detectar oscilaciones estáticas
        
        // Mostrar God Mode
        godModePanel.style.display = 'block';
        btnMutate.style.display = 'inline-block';
        
        this.resize();
        this.updateRules(); // Por si cambió el dropdown
    }

    resize() {
        let dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + 'px';
        canvas.style.height = window.innerHeight + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        this.cols = Math.floor(window.innerWidth / this.resolution);
        this.rows = Math.floor(window.innerHeight / this.resolution);
        this.grid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(null).map(() => ({ alive: 0, hue: 0 })));
    }

    clear() {
        this.grid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(null).map(() => ({ alive: 0, hue: 0 })));
        this.generation = 0;
        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.updateStats(0);
    }

    triggerGenesis() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (Math.random() > 0.85) {
                    this.grid[x][y].alive = 1;
                    this.grid[x][y].hue = getRandomHue();
                } else {
                    this.grid[x][y].alive = 0;
                }
            }
        }
        this.generation = 0;
        ctx.fillStyle = '#050505'; // Limpiar fondo
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.draw();
    }

    draw() {
        // Calcular Rastro (Estela fantasma dinámica)
        let trailPercent = parseInt(trailSlider.value);
        let alpha = 1.0 - (trailPercent / 100);
        if (alpha < 0.01) alpha = 0.01; // Evitar que la pantalla se vuelva sólida permanentemente
        
        ctx.fillStyle = `rgba(5, 5, 5, ${alpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let population = 0;
        let isSilver = paletteSelector.value === 'silver';
        
        // Calcular Brillo Dinámico (Multiplicado por el DPI del monitor)
        let dpr = window.devicePixelRatio || 1;
        let glowPercent = parseInt(glowSlider.value);
        let maxBlur = 15 * dpr; // Base máxima de desenfoque
        ctx.shadowBlur = maxBlur * (glowPercent / 100); 

        // Shift dinámico de color para Abismo Oceánico (como olas que van y vienen)
        let isAbyss = paletteSelector.value === 'abyss';
        let abyssShift = 0;
        if (isAbyss) {
            // Ola lenta principal (~45s ciclo completo): esmeralda(155) -> petróleo(180) -> azul(220) -> violeta(270)
            let wave1 = Math.sin(Date.now() / 7000) * 55;  // ±55 grados
            // Ola secundaria más rápida (~15s): textura orgánica
            let wave2 = Math.sin(Date.now() / 2500) * 15;  // ±15 grados
            abyssShift = wave1 + wave2;
        }

        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                const cell = this.grid[x][y];
                if (cell.alive === 1) {
                    population++;
                    
                    let sat = isSilver ? '15%' : '100%';
                    let glowLight = isSilver ? '70%' : '50%';
                    let coreLight = isSilver ? '95%' : '60%';
                    
                    // Aplicar shift oceánico a TODAS las células vivas al renderizar
                    let displayHue = isAbyss ? (cell.hue + abyssShift) : cell.hue;

                    ctx.beginPath();
                    ctx.rect(x * this.resolution, y * this.resolution, this.resolution - 1, this.resolution - 1);
                    ctx.fillStyle = `hsl(${displayHue}, ${sat}, ${coreLight})`; 
                    ctx.shadowColor = `hsl(${displayHue}, ${sat}, ${glowLight})`;
                    ctx.fill();
                }
            }
        }
        
        ctx.shadowBlur = 0; // Importante: Resetear el blur para no afectar otras cosas
        this.updateStats(population);
    }

    computeNextGeneration() {
        let nextGrid = new Array(this.cols).fill(null).map(() => new Array(this.rows).fill(null).map(() => ({ alive: 0, hue: 0 })));
        let cellsChanged = 0;
        let currentPop = 0;

        for (let x = 1; x < this.cols - 1; x++) {
            for (let y = 1; y < this.rows - 1; y++) {
                let state = this.grid[x][y].alive;
                let {count, hues} = this.getNeighborsData(x, y);

                let survives = this.surviveRules.includes(count);
                let born = this.birthRules.includes(count);

                if (state === 1 && survives) {
                    nextGrid[x][y].alive = 1;
                    nextGrid[x][y].hue = this.grid[x][y].hue;
                    currentPop++;
                } else if (state === 0 && born) {
                    nextGrid[x][y].alive = 1;
                    let avgHue = Math.floor(hues.reduce((a, b) => a + b, 0) / hues.length);
                    nextGrid[x][y].hue = avgHue;
                    cellsChanged++;
                    currentPop++;
                } else {
                    nextGrid[x][y].alive = 0;
                    nextGrid[x][y].hue = 0;
                    if (state === 1) cellsChanged++;
                }
            }
        }
        this.grid = nextGrid;
        this.generation++;
        
        // Anti-Estancamiento v3.0 — Entropía Forzada
        this.popHistory.push(currentPop);
        if (this.popHistory.length > 40) this.popHistory.shift();
        
        let isStagnant = false;
        
        // Caso 1: Tablero vacío o casi vacío
        if (currentPop < 3) {
            isStagnant = true;
        }
        // Caso 2: Pocos cambios relativos a la población (vida estática o casi estática)
        else if (currentPop > 0 && cellsChanged / currentPop < 0.02) {
            isStagnant = true;
        }
        // Caso 3: Población oscilante — la suma total no varía en 20 frames
        else if (this.popHistory.length >= 20) {
            let last10 = this.popHistory.slice(-10);
            let prev10 = this.popHistory.slice(-20, -10);
            let sumLast = last10.reduce((a,b) => a+b, 0);
            let sumPrev = prev10.reduce((a,b) => a+b, 0);
            if (Math.abs(sumLast - sumPrev) < 10) isStagnant = true;
        }
        
        if (isStagnant) {
            this.stagnationTimer += simSpeed;
            if (this.stagnationTimer > 3000) { // 3 segundos
                console.log(`☄️ Estancamiento detectado (pop=${currentPop}, cambios=${cellsChanged}, timer=${this.stagnationTimer}ms)`);
                this.triggerCatastrophe(currentPop);
                this.stagnationTimer = 0;
                this.popHistory = [];
            }
        } else {
            this.stagnationTimer = 0;
        }
    }

    triggerCatastrophe(currentPop) {
        let events = ['meteorite', 'earthquake', 'extinction', 'bigbang', 'glider_invasion', 'spaceship'];
        
        // Si el tablero está vacío, solo eventos de creación
        if (currentPop < 10) {
            events = ['meteorite', 'bigbang', 'glider_invasion', 'spaceship'];
        }

        let ev = events[Math.floor(Math.random() * events.length)];
        console.log("☄️ Catástrofe Automática (µEntropía):", ev);
        
        // Posición aleatoria (no siempre el centro)
        let cx = Math.floor(Math.random() * (this.cols * 0.6)) + Math.floor(this.cols * 0.2);
        let cy = Math.floor(Math.random() * (this.rows * 0.6)) + Math.floor(this.rows * 0.2);

        if (ev === 'meteorite') {
            // Impacto cósmico: círculo de fuego con cráter central
            let radius = 15 + Math.floor(Math.random() * 15); // Radio variable
            for(let x = cx - radius; x < cx + radius; x++) {
                for(let y = cy - radius; y < cy + radius; y++) {
                    if(x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
                        let distance = Math.sqrt(Math.pow(x-cx, 2) + Math.pow(y-cy, 2));
                        if (distance < radius) {
                            // Centro vacío (cráter), anillo exterior vivo (onda expansiva)
                            if (distance < radius * 0.3) {
                                this.grid[x][y].alive = 0;
                            } else {
                                this.grid[x][y].alive = Math.random() > 0.3 ? 1 : 0;
                                this.grid[x][y].hue = getRandomHue();
                            }
                        }
                    }
                }
            }
        } else if (ev === 'glider_invasion') {
            // Invasión de Naves Planeadoras desde los bordes
            let glider = [[0,1,0],[0,0,1],[1,1,1]];
            let numGliders = 8 + Math.floor(Math.random() * 12); // 8-20 naves
            for (let g = 0; g < numGliders; g++) {
                let gx = Math.floor(Math.random() * this.cols);
                let gy = Math.floor(Math.random() * this.rows);
                let hue = getRandomHue();
                // Rotación aleatoria
                let shape = glider;
                let rotations = Math.floor(Math.random() * 4);
                for(let r = 0; r < rotations; r++) shape = this.rotateMatrix(shape);
                for (let j = 0; j < shape.length; j++) {
                    for (let i = 0; i < shape[j].length; i++) {
                        let tx = gx + i, ty = gy + j;
                        if (tx >= 0 && tx < this.cols && ty >= 0 && ty < this.rows && shape[j][i] === 1) {
                            this.grid[tx][ty].alive = 1;
                            this.grid[tx][ty].hue = hue;
                        }
                    }
                }
            }
        } else if (ev === 'spaceship') {
            // Flota de R-Pentominos (generadores de caos)
            let rpent = [[0,1,1],[1,1,0],[0,1,0]];
            let numShips = 5 + Math.floor(Math.random() * 8);
            for (let s = 0; s < numShips; s++) {
                let sx = Math.floor(Math.random() * this.cols);
                let sy = Math.floor(Math.random() * this.rows);
                let hue = getRandomHue();
                for (let j = 0; j < rpent.length; j++) {
                    for (let i = 0; i < rpent[j].length; i++) {
                        let tx = sx + i, ty = sy + j;
                        if (tx >= 0 && tx < this.cols && ty >= 0 && ty < this.rows && rpent[j][i] === 1) {
                            this.grid[tx][ty].alive = 1;
                            this.grid[tx][ty].hue = hue;
                        }
                    }
                }
            }
        } else if (ev === 'earthquake') {
            // Terremoto: Redistribuye toda la materia viva aleatoriamente
            let currentLife = [];
            for(let x=0; x<this.cols; x++) {
                for(let y=0; y<this.rows; y++) {
                    if (this.grid[x][y].alive === 1) {
                        currentLife.push(this.grid[x][y].hue);
                        this.grid[x][y].alive = 0;
                    }
                }
            }
            currentLife.forEach(hue => {
                let rx = Math.floor(Math.random() * this.cols);
                let ry = Math.floor(Math.random() * this.rows);
                this.grid[rx][ry].alive = 1;
                this.grid[rx][ry].hue = hue;
            });
        } else if (ev === 'extinction') {
            // Extinción masiva: mata el 95% pero siembra semillas nuevas
            for(let x=0; x<this.cols; x++) {
                for(let y=0; y<this.rows; y++) {
                    if (this.grid[x][y].alive === 1 && Math.random() > 0.05) {
                        this.grid[x][y].alive = 0;
                    }
                }
            }
            // Sembrar 5 R-pentominos de supervivientes
            for (let s = 0; s < 5; s++) {
                let sx = Math.floor(Math.random() * this.cols);
                let sy = Math.floor(Math.random() * this.rows);
                let hue = getRandomHue();
                let rpent = [[0,1,1],[1,1,0],[0,1,0]];
                for (let j = 0; j < rpent.length; j++) {
                    for (let i = 0; i < rpent[j].length; i++) {
                        let tx = sx + i, ty = sy + j;
                        if (tx >= 0 && tx < this.cols && ty >= 0 && ty < this.rows && rpent[j][i] === 1) {
                            this.grid[tx][ty].alive = 1;
                            this.grid[tx][ty].hue = hue;
                        }
                    }
                }
            }
        } else if (ev === 'bigbang') {
            // Un nuevo Big Bang
            this.triggerGenesis();
        }
    }

    getNeighborsData(x, y) {
        let count = 0;
        let hues = [];
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i === 0 && j === 0) continue;
                let neighbor = this.grid[x + i][y + j];
                if (neighbor.alive === 1) {
                    count++;
                    hues.push(neighbor.hue);
                }
            }
        }
        return { count, hues };
    }

    // Helper para rotar matrices 90 grados a la derecha
    rotateMatrix(matrix) {
        return matrix[0].map((val, index) => matrix.map(row => row[index]).reverse());
    }

    darVida(mouseX, mouseY) {
        let col = Math.floor(mouseX / this.resolution);
        let row = Math.floor(mouseY / this.resolution);

        if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
            let brushType = brushSelector.value;
            if (brushType === 'dot') {
                this.grid[col][row].alive = 1;
                this.grid[col][row].hue = getRandomHue();
            } else {
                let shape = patterns[brushType];
                if (shape) {
                    // Si es la Nave, la rotamos aleatoriamente (0, 90, 180 o 270 grados)
                    if (brushType === 'glider') {
                        let rotations = Math.floor(Math.random() * 4);
                        for(let r = 0; r < rotations; r++) {
                            shape = this.rotateMatrix(shape);
                        }
                    }

                    let hue = getRandomHue(); 
                    for (let j = 0; j < shape.length; j++) {
                        for (let i = 0; i < shape[j].length; i++) {
                            let targetCol = col + i;
                            let targetRow = row + j;
                            if (targetCol >= 0 && targetCol < this.cols && targetRow >= 0 && targetRow < this.rows && shape[j][i] === 1) {
                                this.grid[targetCol][targetRow].alive = 1;
                                this.grid[targetCol][targetRow].hue = hue;
                            }
                        }
                    }
                }
            }
            this.draw(); 
            // Feedback acústico instantáneo de la mano de Dios (Bypass del cooldown)
            if (this.triggerPing && this.audioCtx && this.audioCtx.state === 'running') {
                let now = this.audioCtx.currentTime;
                // Si ha pasado al menos 0.5s desde el último ping manual, permitimos que suene
                if (!this._lastManualPing || now - this._lastManualPing > 0.5) {
                    this.triggerPing();
                    this._lastManualPing = now;
                }
            }
        }
    }

    mutate() {
        for (let x = 0; x < this.cols; x++) {
            for (let y = 0; y < this.rows; y++) {
                if (this.grid[x][y].alive === 1) {
                    this.grid[x][y].hue = getRandomHue();
                }
            }
        }
        this.draw();
    }

    updateRules() {
        const val = ruleSelector.value;
        if (val === 'conway') { this.birthRules = [3]; this.surviveRules = [2,3]; }
        else if (val === 'highlife') { this.birthRules = [3,6]; this.surviveRules = [2,3]; }
        else if (val === 'maze') { this.birthRules = [3]; this.surviveRules = [1,2,3,4,5]; }
        else if (val === 'daynight') { this.birthRules = [3,6,7,8]; this.surviveRules = [3,4,6,7,8]; }
    }

    updateStats(pop) {
        genCountSpan.innerText = this.generation;
        popCountSpan.innerText = pop;
    }
}

// MOTOR 3: SINFONÍA GENERATIVA (Audio Espacial V2)
class EngineAudio extends EngineNeon {
    constructor() {
        super();
        this.mutateMode = false;
        this.stagnationTimer = 0;
        this.masterGain = null;
        this.noiseSource = null;
        this.filter = null;
        this.lastPop = 0;
        
        this.initAudio();
    }

    createPinkNoise(ctx) {
        let bufferSize = 2 * ctx.sampleRate;
        let noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        let output = noiseBuffer.getChannelData(0);
        let b0=0, b1=0, b2=0, b3=0, b4=0, b5=0, b6=0;
        for (let i = 0; i < bufferSize; i++) {
            let white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
            output[i] *= 0.11;
            b6 = white * 0.115926;
        }
        return noiseBuffer;
    }

    initAudio() {
        if (!this.audioCtx) {
            this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioCtx.createGain();
            this.masterGain.gain.value = isMuted ? 0 : 0.5; // Respetar el Mute global
            this.masterGain.connect(this.audioCtx.destination);

            // Generar "Viento Solar"
            this.noiseSource = this.audioCtx.createBufferSource();
            this.noiseSource.buffer = this.createPinkNoise(this.audioCtx);
            this.noiseSource.loop = true;

            // Filtro para oscurecer el viento
            this.filter = this.audioCtx.createBiquadFilter();
            this.filter.type = 'lowpass';
            this.filter.frequency.value = 50; // Inicialmente un zumbido grave

            this.noiseSource.connect(this.filter);
            this.filter.connect(this.masterGain);
            this.noiseSource.start();
        }
    }

    updateMuteState() {
        if (this.masterGain) {
            this.masterGain.gain.setTargetAtTime(isMuted ? 0 : 0.5, this.audioCtx.currentTime, 0.1);
        }
    }

    triggerPing() {
        if(!this.audioCtx || isMuted) return;
        
        let osc = this.audioCtx.createOscillator();
        let gain = this.audioCtx.createGain();
        let now = this.audioCtx.currentTime;

        if (paletteSelector.value === 'abyss') {
            // EFECTO DE ECO SUBMARINO (Delay Network)
            let delay = this.audioCtx.createDelay();
            delay.delayTime.value = 0.5 + Math.random() * 0.2; // Eco dinámico (500-700ms)
            let feedback = this.audioCtx.createGain();
            feedback.gain.value = 0.4; // 40% de eco retroalimentado
            let filterDelay = this.audioCtx.createBiquadFilter();
            filterDelay.type = 'lowpass';
            filterDelay.frequency.value = 800; // El eco suena ahogado por el agua
            
            // Conectar la red de eco
            delay.connect(feedback);
            feedback.connect(filterDelay);
            filterDelay.connect(delay);
            delay.connect(this.masterGain);
            
            // Conectamos el volumen base al master (seco) y al eco (mojado)
            gain.connect(this.masterGain);
            gain.connect(delay);

            let marineRandom = Math.random();
            if (soloBallenas && soloBallenas.checked) {
                marineRandom = 1.0; // Fuerza a ejecutar siempre la ballena jorobada (> 0.66)
            }

            if (marineRandom > 0.66) {
                // 1. BALLENA JOROBADA (Matices biológicos investigados)
                let whaleAge = Math.random();
                let baseFreq, dur, vibratoFreq, vibratoDepth, filterQ, maxVol;
                
                if (whaleAge > 0.6) {
                    // ADULTO MACHO (Canto de apareamiento / Social)
                    // Frecuencia típica: 100 - 300 Hz. Larga duración y resonante.
                    baseFreq = 120 + Math.random() * 80;
                    dur = 3.5 + Math.random() * 1.5;
                    vibratoFreq = 2.5;
                    vibratoDepth = 6;
                    filterQ = 1.5;
                    maxVol = 0.8;
                } else if (whaleAge > 0.2) {
                    // BALLENATO (Balbuceo / Llamada de contacto)
                    // Frecuencia más alta (garganta más pequeña): 400 - 800 Hz. Corto.
                    baseFreq = 400 + Math.random() * 300;
                    dur = 0.8 + Math.random() * 0.5;
                    vibratoFreq = 5.0; // Tiembla más rápido
                    vibratoDepth = 15;
                    filterQ = 0.5; // Menos resonancia
                    maxVol = 0.6;
                } else {
                    // MADRE/CRÍA (Llamada Críptica / "Acoustic Crypsis")
                    // Se "susurran" a menos de 200Hz para no atraer depredadores (Orcas).
                    baseFreq = 80 + Math.random() * 40;
                    dur = 1.0 + Math.random() * 0.5;
                    vibratoFreq = 1.5;
                    vibratoDepth = 2;
                    filterQ = 3.0; // Muy ahogado
                    maxVol = 0.15; // Susurro extremadamente silencioso
                }
                
                let osc1 = this.audioCtx.createOscillator();
                osc1.type = 'sawtooth'; // Cuerda gruesa
                osc1.frequency.setValueAtTime(baseFreq, now);
                osc1.frequency.exponentialRampToValueAtTime(baseFreq * (whaleAge > 0.2 ? 0.4 : 0.8), now + dur);
                
                let osc2 = this.audioCtx.createOscillator();
                osc2.type = 'triangle'; // Cuerda resonante
                osc2.frequency.setValueAtTime(baseFreq * 2.01, now); 
                osc2.frequency.exponentialRampToValueAtTime(baseFreq * (whaleAge > 0.2 ? 0.8 : 1.2), now + dur);
                
                // Vibrato gutural
                let lfo = this.audioCtx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = vibratoFreq;
                let lfoGain = this.audioCtx.createGain();
                lfoGain.gain.value = vibratoDepth;
                lfo.connect(lfoGain);
                lfoGain.connect(osc1.frequency);
                lfoGain.connect(osc2.frequency);
                lfo.start(now);
                lfo.stop(now + dur);
                
                // Filtro "Vocal Tract" (Simula el tamaño inmenso de la garganta)
                let biquad = this.audioCtx.createBiquadFilter();
                biquad.type = 'bandpass';
                biquad.Q.value = filterQ;
                biquad.frequency.setValueAtTime(baseFreq * 2.5, now);
                biquad.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + dur);
                
                osc1.connect(biquad);
                osc2.connect(biquad);
                biquad.connect(gain);
                
                // Respiración y pulmones (Envolvente de Volumen)
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(maxVol, now + (dur * 0.3)); 
                gain.gain.exponentialRampToValueAtTime(0.001, now + dur); 
                
                osc1.start(now);
                osc2.start(now);
                osc1.stop(now + dur);
                osc2.stop(now + dur);
                
            } else if (marineRandom > 0.33) {
                // 2. ORCA (Pulsos de Ráfaga / Burst Pulses)
                // Las orcas usan ráfagas de clics tan rápidas que suenan a chirrido
                let osc = this.audioCtx.createOscillator();
                osc.type = 'sine';
                
                let mod = this.audioCtx.createOscillator();
                mod.type = 'sawtooth';
                mod.frequency.setValueAtTime(50, now);
                mod.frequency.linearRampToValueAtTime(600, now + 1.2); 
                
                let modGain = this.audioCtx.createGain();
                modGain.gain.setValueAtTime(1000, now); // Muchísima modulación (chirrido puro)
                modGain.gain.exponentialRampToValueAtTime(10, now + 1.2);
                
                mod.connect(modGain);
                modGain.connect(osc.frequency);
                mod.start(now);
                mod.stop(now + 1.2);

                osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
                osc.frequency.exponentialRampToValueAtTime(500, now + 1.2);
                
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.5, now + 0.2);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
                
                osc.connect(gain);
                osc.start(now);
                osc.stop(now + 1.2);
                
            } else {
                // 3. DELFÍN REALISTA (Silbido modulado)
                let osc = this.audioCtx.createOscillator();
                osc.type = 'sine';
                
                // Vibrato de alta velocidad
                let lfo = this.audioCtx.createOscillator();
                lfo.type = 'sine';
                lfo.frequency.value = 15; // Tiembla muy rápido
                let lfoGain = this.audioCtx.createGain();
                lfoGain.gain.value = 200;
                lfo.connect(lfoGain);
                lfoGain.connect(osc.frequency);
                lfo.start(now);
                lfo.stop(now + 0.6);

                // Barrido rápido del silbido
                osc.frequency.setValueAtTime(4000 + Math.random()*1000, now);
                osc.frequency.exponentialRampToValueAtTime(6000, now + 0.3);
                osc.frequency.exponentialRampToValueAtTime(3000, now + 0.6);
                
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                
                osc.connect(gain);
                osc.start(now);
                osc.stop(now + 0.6);
            }
        } else {
            // Notas Celestiales estándar (Eco Espacial)
            osc.type = 'sine';
            let notes = [523.25, 622.25, 698.46, 783.99, 932.33]; // C5, Eb5, F5, G5, Bb5
            osc.frequency.setValueAtTime(notes[Math.floor(Math.random() * notes.length)], now);
            
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
            
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start(now);
            osc.stop(now + 2.5);
        }
    }

    computeNextGeneration() {
        super.computeNextGeneration(); 
        this.updateAudio();
    }

    updateAudio() {
        if (!this.audioCtx || this.audioCtx.state === 'suspended') return;
        
        let now = this.audioCtx.currentTime;
        let currentPop = 0;
        for(let x=0; x<this.cols; x++) {
            for(let y=0; y<this.rows; y++) {
                if(this.grid[x][y].alive === 1) currentPop++;
            }
        }
        
        let maxPop = this.cols * this.rows;
        let popRatio = currentPop / (maxPop * 0.15); // 15% de pantalla = volumen tope
        if(popRatio > 1) popRatio = 1;
        
        // El zumbido se abre a un viento según la vida
        let freq = 60 + (popRatio * 1500); 
        this.filter.frequency.setTargetAtTime(freq, now, 0.5);
        
        // Pings estelares si hay explosión de vida o colisión (Crecimiento repentino > 10 células)
        let deltaPop = currentPop - this.lastPop;
        if (deltaPop > 10 && (!this.lastPingTime || now - this.lastPingTime > 0.3)) {
            this.triggerPing();
            this.lastPingTime = now;
        }
        this.lastPop = currentPop;
    }

    clear() {
        super.clear();
        this.lastPop = 0;
        this.lastPingTime = 0;
        if(this.filter) {
            this.filter.frequency.setTargetAtTime(50, this.audioCtx ? this.audioCtx.currentTime : 0, 0.1);
        }
    }

    destroy() {
        if (this.noiseSource) {
            this.noiseSource.stop();
        }
        if (this.audioCtx) {
            setTimeout(() => this.audioCtx.close(), 100);
        }
    }
}

/* =========================================================
   MOTOR 4: BIOSFERA REALISTA (SAMPLERS AUDIO REALES)
   Hereda de EngineNeon, carga buffers asincronamente.
   ========================================================= */
class EngineSampler extends EngineNeon {
    constructor() {
        super();
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.value = isMuted ? 0 : 0.8;
        this.masterGain.connect(this.audioCtx.destination);
        
        // Efecto de ruido de fondo (olas suaves)
        this.noiseLength = 2;
        let bufferSize = this.audioCtx.sampleRate * this.noiseLength;
        let buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
        let data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        
        this.filter = this.audioCtx.createBiquadFilter();
        this.filter.type = 'lowpass';
        this.filter.frequency.value = 50; 
        this.filter.connect(this.masterGain);
        
        this.noiseSource = this.audioCtx.createBufferSource();
        this.noiseSource.buffer = buffer;
        this.noiseSource.loop = true;
        this.noiseSource.connect(this.filter);
        this.noiseSource.start();

        this.lastPop = 0;
        this.lastPingTime = 0;

        // Buffers de audio
        this.buffers = {};
        this.audioLoaded = false;
        this.loadAudio();
    }

    updateMuteState() {
        if (this.audioCtx) {
            this.masterGain.gain.setValueAtTime(isMuted ? 0 : 0.8, this.audioCtx.currentTime);
        }
    }

    async loadAudio() {
        try {
            const files = {
                'song': 'assets/audio/whale_song_noaa.ogg',       // NOAA: Canto principal Jorobada
                'cry': 'assets/audio/whale_cry_noaa.ogg',         // NOAA: Gemido melancólico Jorobada
                'love': 'assets/audio/whale_love_noaa.ogg',       // NOAA: Canto romántico/tierno Jorobada
                'tender': 'assets/audio/whale_tender_noaa.ogg',   // NOAA: Canto dulce/tierno Jorobada
                'deep': 'assets/audio/whale_deep_noaa.ogg',       // NOAA: Melodía profunda final Jorobada
                'orca_call': 'assets/audio/orca_call_noaa.ogg',   // NOAA: Llamada social Orca
                'orca_deep': 'assets/audio/orca_deep_noaa.ogg',   // NOAA: Orca profunda
                'orca_tender': 'assets/audio/orca_tender_noaa.ogg', // NOAA: Orca tierna
                'beluga': 'assets/audio/beluga_noaa.ogg'          // NOAA: Beluga tierna
            };
            
            for (let key in files) {
                const response = await fetch(files[key]);
                const arrayBuffer = await response.arrayBuffer();
                this.buffers[key] = await this.audioCtx.decodeAudioData(arrayBuffer);
            }
            this.audioLoaded = true;
            console.log("Audios de ballena cargados.");
        } catch (e) {
            console.error("Error cargando audios:", e);
        }
    }

    triggerPing() {
        if (!this.audioLoaded || !this.audioCtx) return;
        
        let now = this.audioCtx.currentTime;
        let gain = this.audioCtx.createGain();
        let delay = this.audioCtx.createDelay(5.0); // Buffer de delay más largo
        delay.delayTime.value = 1.5 + Math.random() * 1.0; // Eco gigante (1.5s a 2.5s)
        let feedback = this.audioCtx.createGain();
        feedback.gain.value = 0.55; // Mayor rebote (Cola de eco muy larga)
        let filterDelay = this.audioCtx.createBiquadFilter();
        filterDelay.type = 'lowpass';
        filterDelay.frequency.value = 500; // Eco ahogado y melancólico 
        
        delay.connect(feedback);
        feedback.connect(filterDelay);
        filterDelay.connect(delay);
        delay.connect(this.masterGain);
        
        gain.connect(this.masterGain);
        gain.connect(delay);

        let source = this.audioCtx.createBufferSource();
        
        // SIEMPRE reproducimos cantos marinos (el océano está siempre ahí)
        let emotion = Math.random();
        let playbackRate = 1.0;
        let maxVol = 0.8;
        let species = Math.random();

        if (soloBallenas && soloBallenas.checked) {
            species = 1.0; // Forzar solo ballenas jorobadas
        }

        if (species > 0.55) {
            // === BALLENA JOROBADA (45%) — El protagonista principal ===
            let samples = ['song', 'cry', 'love', 'tender', 'deep'];
            let chosen = samples[Math.floor(Math.random() * samples.length)];
            source.buffer = this.buffers[chosen];
            
            if (chosen === 'cry' || chosen === 'deep') {
                playbackRate = 0.6 + Math.random() * 0.2; // Lento y melancólico
                maxVol = 0.9;
                console.log("🐋 Ballena Jorobada — Triste/Melancólica ("+chosen+")");
            } else if (chosen === 'love' || chosen === 'tender') {
                playbackRate = 0.8 + Math.random() * 0.2; // Suave y tierno
                maxVol = 0.85;
                console.log("🐋 Ballena Jorobada — Enamorada/Tierna ("+chosen+")");
            } else {
                playbackRate = 0.7 + Math.random() * 0.25; // Majestuoso
                maxVol = 0.85;
                console.log("🐋 Ballena Jorobada — Canto Majestuoso ("+chosen+")");
            }
        } else if (species > 0.2) {
            // === ORCA (35%) ===
            let orcaSamples = ['orca_call', 'orca_deep', 'orca_tender'];
            let chosen = orcaSamples[Math.floor(Math.random() * orcaSamples.length)];
            source.buffer = this.buffers[chosen];
            
            if (chosen === 'orca_call') {
                playbackRate = 0.85 + Math.random() * 0.2;
                maxVol = 0.7;
                console.log("🌊 Orca — Llamada Social/Feliz");
            } else if (chosen === 'orca_tender') {
                playbackRate = 0.7 + Math.random() * 0.2;
                maxVol = 0.65;
                console.log("🌊 Orca — Tierna/Enamorada");
            } else {
                playbackRate = 0.55 + Math.random() * 0.2;
                maxVol = 0.6;
                console.log("🌊 Orca — Profunda/Nostálgica");
            }
        } else {
            // === BELUGA (20%) ===
            source.buffer = this.buffers['beluga'];
            playbackRate = 0.7 + Math.random() * 0.4;
            maxVol = 0.65;
            console.log("🐬 Beluga — Canto Tierno");
        }

        source.playbackRate.value = playbackRate;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(maxVol, now + 0.3);
        gain.gain.exponentialRampToValueAtTime(0.001, now + (source.buffer.duration / playbackRate));
        source.connect(gain);
        source.start(now);
    }

    computeNextGeneration() {
        super.computeNextGeneration(); 
        this.updateAudio();
    }

    updateAudio() {
        if (!this.audioLoaded || !this.audioCtx || this.audioCtx.state === 'suspended') return;
        
        let now = this.audioCtx.currentTime;
        let currentPop = 0;
        for(let x=0; x<this.cols; x++) {
            for(let y=0; y<this.rows; y++) {
                if(this.grid[x][y].alive === 1) currentPop++;
            }
        }
        
        let maxPop = this.cols * this.rows;
        let popRatio = currentPop / (maxPop * 0.15); 
        if(popRatio > 1) popRatio = 1;
        
        let freq = 60 + (popRatio * 1500); 
        this.filter.frequency.setTargetAtTime(freq, now, 0.5);
        
        let deltaPop = currentPop - this.lastPop;
        // Se activa con CUALQUIER fluctuación de vida, cada 3 segundos como máximo
        if (Math.abs(deltaPop) > 1 && (!this.lastPingTime || now - this.lastPingTime > 3.0)) {
            this.triggerPing();
            this.lastPingTime = now;
        }
        this.lastPop = currentPop;
    }

    clear() {
        super.clear();
        this.lastPop = 0;
        this.lastPingTime = 0;
        if(this.filter && this.audioCtx) {
            this.filter.frequency.setTargetAtTime(50, this.audioCtx.currentTime, 0.1);
        }
    }

    destroy() {
        if (this.noiseSource) {
            this.noiseSource.stop();
        }
        if (this.audioCtx) {
            setTimeout(() => this.audioCtx.close(), 100);
        }
    }
}

/* =========================================================
   MOTOR 5: GRAVEDAD CONTINUA (BIO-FLUIDO & ORBITAS)
   Física de fluidos bioluminiscentes con gravedad y audio NOAA
   ========================================================= */
class EngineGravity extends EngineSampler {
    constructor() {
        super();
        this.particles = [];
        this.maxParticles = 600;
        this.G = 0.8;
        this.damping = 0.985;
    }

    triggerGenesis() {
        this.particles = [];
        this.generation = 0;
        let centerX = canvas.width / 2;
        let centerY = canvas.height / 2;
        
        for (let g = 0; g < 2; g++) {
            let gx = centerX + (g === 0 ? -180 : 180);
            let gy = centerY + (g === 0 ? -100 : 100);
            let hueBase = g === 0 ? 190 : 280;
            
            for (let i = 0; i < 150; i++) {
                let angle = Math.random() * Math.PI * 2;
                let dist = Math.random() * 140 + 10;
                let speed = Math.sqrt(this.G * 150 / dist) * 0.8;
                
                this.particles.push({
                    x: gx + Math.cos(angle) * dist,
                    y: gy + Math.sin(angle) * dist,
                    vx: -Math.sin(angle) * speed + (Math.random() - 0.5),
                    vy: Math.cos(angle) * speed + (Math.random() - 0.5),
                    radius: Math.random() * 2.5 + 1.5,
                    mass: Math.random() * 3 + 1,
                    hue: hueBase + (Math.random() * 40 - 20)
                });
            }
        }
    }

    clear() {
        this.particles = [];
        this.generation = 0;
        if (genCountSpan) genCountSpan.innerText = 0;
        if (popCountSpan) popCountSpan.innerText = 0;
    }

    darVida(x, y) {
        for (let i = 0; i < 15; i++) {
            if (this.particles.length >= this.maxParticles) {
                this.particles.shift();
            }
            let angle = Math.random() * Math.PI * 2;
            let speed = Math.random() * 3 + 1;
            let currentPalette = paletteSelector.value;
            let hue = 190;
            if (currentPalette === 'gold') hue = 35;
            else if (currentPalette === 'silver') hue = 200;
            else if (currentPalette === 'matrix') hue = 130;
            else if (currentPalette === 'abyss') hue = 210 + Math.random() * 60;
            
            this.particles.push({
                x: x + Math.cos(angle) * 10,
                y: y + Math.sin(angle) * 10,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                radius: Math.random() * 3 + 1.5,
                mass: Math.random() * 2 + 1,
                hue: hue + (Math.random() * 30 - 15)
            });
        }
    }

    computeNextGeneration() {
        this.generation++;
        let pCount = this.particles.length;
        
        for (let i = 0; i < pCount; i++) {
            let p1 = this.particles[i];
            
            for (let j = i + 1; j < pCount; j++) {
                let p2 = this.particles[j];
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let distSq = dx * dx + dy * dy + 100;
                let dist = Math.sqrt(distSq);
                
                if (dist < 220) {
                    let force = (this.G * p1.mass * p2.mass) / distSq;
                    let fx = (dx / dist) * force;
                    let fy = (dy / dist) * force;
                    
                    if (dist < 20) {
                        fx -= (dx / dist) * 0.4;
                        fy -= (dy / dist) * 0.4;
                    }
                    
                    p1.vx += fx / p1.mass;
                    p1.vy += fy / p1.mass;
                    p2.vx -= fx / p2.mass;
                    p2.vy -= fy / p2.mass;
                }
            }

            p1.vx *= this.damping;
            p1.vy *= this.damping;
            p1.x += p1.vx;
            p1.y += p1.vy;

            if (p1.x < 0) { p1.x = 0; p1.vx *= -0.8; }
            if (p1.x > canvas.width) { p1.x = canvas.width; p1.vx *= -0.8; }
            if (p1.y < 0) { p1.y = 0; p1.vy *= -0.8; }
            if (p1.y > canvas.height) { p1.y = canvas.height; p1.vy *= -0.8; }
        }

        if (genCountSpan) genCountSpan.innerText = this.generation;
        if (popCountSpan) popCountSpan.innerText = pCount;

        if (this.generation % 180 === 0 && pCount > 20) {
            this.triggerPing();
        }
    }

    draw() {
        let glowVal = parseInt(glowSlider.value);
        let trailVal = parseInt(trailSlider.value) / 100;
        
        ctx.fillStyle = `rgba(5, 5, 5, ${1 - trailVal})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        let pCount = this.particles.length;
        
        ctx.lineWidth = 0.5;
        for (let i = 0; i < pCount; i++) {
            let p1 = this.particles[i];
            for (let j = i + 1; j < pCount; j++) {
                let p2 = this.particles[j];
                let dx = p2.x - p1.x;
                let dy = p2.y - p1.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 70) {
                    let alpha = (1 - dist / 70) * 0.4;
                    ctx.strokeStyle = `hsla(${p1.hue}, 100%, 65%, ${alpha})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }

        ctx.shadowBlur = glowVal;
        for (let i = 0; i < pCount; i++) {
            let p = this.particles[i];
            ctx.shadowColor = `hsl(${p.hue}, 100%, 50%)`;
            ctx.fillStyle = `hsl(${p.hue}, 100%, 70%)`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }
}

// INICIALIZACIÓN DEL MULTIVERSO
let activeEngine = new EngineNeon(); // Empezamos en Neon por defecto
activeEngine.triggerGenesis();

/* =========================================================
   CONTROLADORES DE EVENTOS GLOBALES
   ========================================================= */

function update() {
    if (isPlaying) {
        activeEngine.computeNextGeneration();
        activeEngine.draw();
    }
    animationId = setTimeout(() => {
        requestAnimationFrame(update);
    }, simSpeed);
}

// Intercambio de Motores
engineSelector.addEventListener('change', (e) => {
    isPlaying = false;
    clearTimeout(animationId);
    
    if (activeEngine.destroy) {
        activeEngine.destroy(); // Limpiar audio viejo
    }
    
    if (e.target.value === 'classic') {
        activeEngine = new EngineClassic();
    } else if (e.target.value === 'neon') {
        activeEngine = new EngineNeon();
    } else if (e.target.value === 'audio') {
        activeEngine = new EngineAudio();
    } else if (e.target.value === 'sampler') {
        activeEngine = new EngineSampler();
    } else if (e.target.value === 'gravity') {
        activeEngine = new EngineGravity();
    }
    
    activeEngine.triggerGenesis();
});

btnStart.addEventListener('click', () => {
    if (!isPlaying) { 
        isPlaying = true; 
        if(activeEngine.audioCtx && activeEngine.audioCtx.state === 'suspended') {
            activeEngine.audioCtx.resume();
        }
        update(); 
    }
});

btnPause.addEventListener('click', () => {
    isPlaying = false; 
    clearTimeout(animationId);
    if (activeEngine.silence) activeEngine.silence();
});

btnClear.addEventListener('click', () => {
    isPlaying = false; 
    clearTimeout(animationId);
    activeEngine.clear();
});

btnMute.addEventListener('click', () => {
    isMuted = !isMuted;
    btnMute.innerText = isMuted ? "UNMUTE (Audio)" : "MUTE (Audio)";
    btnMute.style.borderColor = isMuted ? "#555" : "#ff9900";
    btnMute.style.color = isMuted ? "#555" : "#ff9900";
    if (activeEngine.updateMuteState) {
        activeEngine.updateMuteState();
    }
});

btnRandom.addEventListener('click', () => activeEngine.triggerGenesis());
btnMutate.addEventListener('click', () => activeEngine.mutate());

paletteSelector.addEventListener('change', (e) => {
    currentPalette = palettes[e.target.value];
    
    // Mostrar u ocultar las herramientas de Biodiversidad (Solo en Abismo)
    if (e.target.value === 'abyss') {
        marineToggles.style.display = 'block';
    } else {
        marineToggles.style.display = 'none';
    }
    
    if (activeEngine.mutate) {
        activeEngine.mutate(); // Mutar las células existentes inmediatamente
    }
});

speedSlider.addEventListener('input', (e) => {
    simSpeed = parseInt(e.target.value);
    speedValSpan.innerText = simSpeed;
});

glowSlider.addEventListener('input', (e) => {
    glowValSpan.innerText = e.target.value;
});

trailSlider.addEventListener('input', (e) => {
    trailValSpan.innerText = e.target.value;
});

ruleSelector.addEventListener('change', () => activeEngine.updateRules());

// Ocultar / Mostrar Interfaz
btnToggleUI.addEventListener('click', () => {
    uiContainer.classList.toggle('ui-hidden');
    if (uiContainer.classList.contains('ui-hidden')) {
        btnToggleUI.innerText = "MOSTRAR INTERFAZ";
    } else {
        btnToggleUI.innerText = "VISIÓN PURA (Ocultar UI)";
    }
});

btnFullscreen.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.log(err));
        btnFullscreen.innerText = "SALIR PANTALLA COMPLETA";
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            btnFullscreen.innerText = "PANTALLA COMPLETA";
        }
    }
});

// Modal de Instrucciones / Ayuda
function openHelpModal() {
    if (helpModal) helpModal.classList.add('active');
}
function closeHelpModal() {
    if (helpModal) helpModal.classList.remove('active');
}

if (btnHelp) btnHelp.addEventListener('click', openHelpModal);
if (btnCloseHelp) btnCloseHelp.addEventListener('click', closeHelpModal);
if (btnConfirmHelp) btnConfirmHelp.addEventListener('click', closeHelpModal);
if (helpModal) {
    helpModal.addEventListener('click', (e) => {
        if (e.target === helpModal) closeHelpModal();
    });
}

// Modal La Gorra Digital
const btnGorra = document.getElementById('btn-gorra');
const gorraModal = document.getElementById('gorra-modal');
const btnCloseGorra = document.getElementById('btn-close-gorra');
const btnConfirmGorra = document.getElementById('btn-confirm-gorra');

function openGorraModal() {
    if (gorraModal) gorraModal.classList.add('active');
}
function closeGorraModal() {
    if (gorraModal) gorraModal.classList.remove('active');
}

if (btnGorra) btnGorra.addEventListener('click', openGorraModal);
if (btnCloseGorra) btnCloseGorra.addEventListener('click', closeGorraModal);
if (btnConfirmGorra) btnConfirmGorra.addEventListener('click', closeGorraModal);
if (gorraModal) {
    gorraModal.addEventListener('click', (e) => {
        if (e.target === gorraModal) closeGorraModal();
    });
}

// Ratón & Táctil en Móviles
let isDrawing = false;
function handleInteraction(e) {
    let rect = canvas.getBoundingClientRect();
    let clientX = (e.touches && e.touches.length > 0) ? e.touches[0].clientX : e.clientX;
    let clientY = (e.touches && e.touches.length > 0) ? e.touches[0].clientY : e.clientY;
    activeEngine.darVida(clientX - rect.left, clientY - rect.top);
}

canvas.addEventListener('mousedown', (e) => { 
    isDrawing = true; 
    handleInteraction(e); 
    if (activeEngine.triggerPing) activeEngine.triggerPing();
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mousemove', (e) => { if (isDrawing && brushSelector.value === 'dot') handleInteraction(e); });

canvas.addEventListener('touchstart', (e) => { 
    isDrawing = true; 
    e.preventDefault();
    handleInteraction(e); 
    if (activeEngine.triggerPing) activeEngine.triggerPing();
}, { passive: false });

canvas.addEventListener('touchend', () => isDrawing = false);
canvas.addEventListener('touchmove', (e) => { 
    if (isDrawing && brushSelector.value === 'dot') {
        e.preventDefault();
        handleInteraction(e); 
    }
}, { passive: false });

window.addEventListener('resize', () => {
    // Para simplificar la arquitectura, un resize redimensiona el motor actual
    activeEngine.triggerGenesis();
});

// Ocultar Cita Poética automáticamente a los 4 segundos
setTimeout(() => {
    const quote = document.querySelector('.poetic-quote');
    if (quote) {
        quote.classList.add('quote-hidden');
    }
}, 4000);

