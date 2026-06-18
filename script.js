// ════════ 1. HYPER REALISTIC AMBIENT GOLD DUST ENGINE ════════
let dustCanvas, dustCtx, particlesArray = [];

function initAmbientDustEngine() {
    dustCanvas = document.getElementById('ambientDustCanvas');
    if(!dustCanvas) return;
    dustCtx = dustCanvas.getContext('2d');
    
    dustCanvas.width = window.innerWidth;
    dustCanvas.height = window.innerHeight;

    particlesArray = [];
    for (let i = 0; i < 55; i++) {
        particlesArray.push({
            x: Math.random() * dustCanvas.width,
            y: Math.random() * dustCanvas.height,
            radius: Math.random() * 1.4 + 0.4,
            speedY: Math.random() * 0.3 + 0.1,
            speedX: Math.random() * 0.15 - 0.07,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    function renderDustLoop() {
        dustCtx.clearRect(0, 0, dustCanvas.width, dustCanvas.height);
        particlesArray.forEach(p => {
            p.y += p.speedY; p.x += p.speedX;
            if (p.y > dustCanvas.height) { p.y = -5; p.x = Math.random() * dustCanvas.width; }
            
            dustCtx.beginPath();
            dustCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            dustCtx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`;
            dustCtx.fill();
        });
        requestAnimationFrame(renderDustLoop);
    }
    renderDustLoop();
}

// ════════ 2. MICROSCOPIC SPARKLE ENGINE (BOX POP EXPLOSION) ════════
let sparkleParticles = [];
function triggerSparkleBlast(clickX, clickY) {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed'; canvas.style.inset = '0';
    canvas.style.zIndex = '999999'; canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    
    for (let i = 0; i < 80; i++) {
        sparkleParticles.push({
            x: clickX, y: clickY,
            radius: Math.random() * 2.5 + 1,
            speedX: (Math.random() - 0.5) * 14,
            speedY: (Math.random() - 0.5) * 14,
            gravity: 0.15,
            opacity: 1
        });
    }
    
    function animateSparkles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        
        sparkleParticles.forEach(p => {
            p.speedY += p.gravity; p.x += p.speedX; p.y += p.speedY; p.opacity -= 0.025;
            if (p.opacity > 0) {
                alive = true;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(197, 160, 89, ${p.opacity})`; ctx.fill();
            }
        });
        
        if (alive) { requestAnimationFrame(animateSparkles); } else { canvas.remove(); sparkleParticles = []; }
    }
    animateSparkles();
}

// 🚪 3. FIXED TRANSITION TRIGGER ENGINE (Browser Policy Safe Handle)
let isGateDestroyed = false;

function triggerGateDeployment(event) {
    if (isGateDestroyed) return;
    isGateDestroyed = true;

    const gateScreen = document.getElementById('gift-vault-screen');
    const clickX = event.clientX || window.innerWidth / 2;
    const clickY = event.clientY || window.innerHeight / 2;
    
    // Core click response: Trigger gift lid pop & sparkle explosion
    gateScreen.classList.add('box-clicked');
    triggerSparkleBlast(clickX, clickY);

    // Step B: Deploy sliding blades regardless of media playback success
    setTimeout(() => {
        gateScreen.classList.add('gate-deployed');
        
        setTimeout(() => {
            gateScreen.style.display = 'none';
            document.getElementById('main-content-vault').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('main-content-vault').style.opacity = '1';
                initAmbientDustEngine(); 
                initScratchModule();      
            }, 50);

            // Execute Audio Node Loop safely
            const music = document.getElementById('bgMusic');
            const audioOrb = document.getElementById('audio-orb-controller');
            if (music) { 
                music.volume = 0.55; 
                music.play()
                    .then(() => audioOrb.classList.add('playing'))
                    .catch(() => console.log("Audio waiting interface token context setup.")); 
            }
        }, 1100);
    }, 350);
}

// 🎵 4. INTERACTIVE AUDIO CONTROL MODULE
function toggleAudioEngine() {
    const music = document.getElementById('bgMusic');
    const audioOrb = document.getElementById('audio-orb-controller');
    if (!music) return;

    if (music.paused) {
        music.play();
        audioOrb.classList.add('playing');
    } else {
        music.pause();
        audioOrb.classList.remove('playing');
    }
}

// 🧮 5. FIXED COVER RATIO CANVAS SCRATCH SURFACE GENERATOR
function initScratchModule() {
    const canvas = document.getElementById('scratchCanvas');
    const container = document.getElementById('scratchBoxNode');
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    
    // Exact dynamic screen match fix
    canvas.width = container.clientWidth; 
    canvas.height = container.clientHeight;

    let goldGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    goldGrad.addColorStop(0, '#5C4A10');  
    goldGrad.addColorStop(0.25, '#C5A059'); 
    goldGrad.addColorStop(0.5, '#F9E6AF'); 
    goldGrad.addColorStop(0.75, '#9E7720'); 
    goldGrad.addColorStop(1, '#332704');  

    ctx.fillStyle = goldGrad; ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < 850; i++) {
        let x = Math.random() * canvas.width; let y = Math.random() * canvas.height;
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(255,255,255,0.11)' : 'rgba(0,0,0,0.07)';
        ctx.fillRect(x, y, 1.2, 1.2);
    }

    ctx.font = '700 11px Cinzel, serif'; ctx.fillStyle = '#020305'; ctx.letterSpacing = '3px'; ctx.textAlign = 'center';
    ctx.fillText('SCRATCH TO REVEAL JUNIOR WISH', canvas.width / 2, canvas.height / 2 + 4);

    let isDrawing = false;
    function scratchAction(e) {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(clientX - rect.left, clientY - rect.top, 25, 0, Math.PI * 2); ctx.fill();
    }

    canvas.addEventListener('mousedown', () => isDrawing = true);
    window.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratchAction);
    canvas.addEventListener('touchstart', () => isDrawing = true);
    window.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratchAction);
}

// 🧧 6. LIVE SUBBOARD WISH INJECTION HANDLING
document.getElementById('teamWishForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('teamMemberName');
    const msgInput = document.getElementById('teamMemberMessage');
    const wall = document.getElementById('liveWishesWall');
    const placeholder = document.getElementById('feedPlaceholderText');
    
    if(placeholder) placeholder.remove();

    const card = document.createElement('div');
    card.className = 'user-message-card';
    
    const h4 = document.createElement('h4');
    h4.innerText = nameInput.value;
    
    const p = document.createElement('p');
    p.innerText = msgInput.value;
    
    card.appendChild(h4);
    card.appendChild(p);
    
    wall.insertBefore(card, wall.firstChild);
    
    this.reset();
    wall.scrollTop = 0;
});
