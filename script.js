
var GENERATOR_URL = 'https://birthday-wish-generator.onrender.com/';
// ============================================================
//  DOM REFS
// ============================================================
const form = document.getElementById('generatorForm');
const nicknameInput = document.getElementById('nickname');
const imageInput = document.getElementById('imageInput');
const fileDropArea = document.getElementById('fileDropArea');
const fileCount = document.getElementById('fileCount');
const previewGrid = document.getElementById('previewGrid');
const gameNameInput = document.getElementById('gameName');
const relationInput = document.getElementById('relation');
const wishInput = document.getElementById('wishMessage');
const generatedLinkArea = document.getElementById('generatedLinkArea');
const generatedLinkInput = document.getElementById('generatedLink');
const openLinkBtn = document.getElementById('openLinkBtn');
const downloadBtn = document.getElementById('downloadBtn');

// ============================================================
//  STATE
// ============================================================
let uploadedFiles = [];
let generatedHtml = '';
let generatedFileName = '';

// ============================================================
//  IMAGE UPLOAD HANDLING
// ============================================================
imageInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
        handleFiles(files);
    }
});

fileDropArea.addEventListener('click', function(e) {
    imageInput.click();
});

fileDropArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = '#f5576c';
    this.style.background = 'rgba(245, 87, 108, 0.08)';
});

fileDropArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    this.style.background = 'rgba(255, 255, 255, 0.02)';
});

fileDropArea.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    this.style.background = 'rgba(255, 255, 255, 0.02)';
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
        handleFiles(files);
        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        imageInput.files = dataTransfer.files;
    }
});

function handleFiles(files) {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length < 6) {
        alert(`⚠️ Please select at least 6 images. You selected ${imageFiles.length}.`);
        imageInput.value = '';
        return;
    }
    
    uploadedFiles = imageFiles;
    updatePreview();
    fileCount.textContent = `${imageFiles.length} images selected ✅`;
    fileCount.style.color = '#4ade80';
}

function updatePreview() {
    previewGrid.innerHTML = '';
    uploadedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
            const img = document.createElement('img');
            img.src = ev.target.result;
            img.alt = 'Preview';
            previewGrid.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}

// ============================================================
//  GENERATE BIRTHDAY WEBSITE
// ============================================================
function generateBirthdayHTML(data) {
    const { nickname, gameName, relation, wish, images } = data;

    const photoArrayString = images.map((base64) => `'${base64}'`).join(',');
    const safeWish = wish.replace(/'/g, "\\'").replace(/"/g, '&quot;');
    const generatorUrl = GENERATOR_URL;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>🎂 Happy Birthday ${nickname} ❤️</title>
    <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;600;700&display=swap" rel="stylesheet"/>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            overflow: hidden;
            color: #fff;
            min-height: 100vh;
            background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab, #ff6b9d, #c44569);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
        }
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .sparkle-overlay {
            position: fixed; inset: 0;
            background: radial-gradient(ellipse at 20% 80%, rgba(255,182,193,0.25) 0%, transparent 50%),
                        radial-gradient(ellipse at 80% 20%, rgba(255,105,180,0.25) 0%, transparent 50%);
            z-index: -1;
        }
        .floating-hearts { position: fixed; inset: 0; pointer-events: none; z-index: 0; }
        .bg-heart {
            position: absolute; color: rgba(255,255,255,0.08);
            animation: floatHeart 20s linear infinite;
        }
        @keyframes floatHeart {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(-100px) rotate(720deg); opacity: 0; }
        }
        .page {
            position: fixed; inset: 0;
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            padding: 20px;
            transition: all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            z-index: 10;
            text-align: center;
        }
        .page.hidden {
            opacity: 0; pointer-events: none; transform: scale(0.8);
        }
        #homePage h1 {
            font-family: 'Dancing Script', cursive;
            font-size: 60px;
            text-shadow: 0 0 30px rgba(255,105,180,0.8), 0 0 60px rgba(255,105,180,0.5);
            animation: glow 2s ease-in-out infinite alternate;
            margin-bottom: 6px;
        }
        @keyframes glow {
            from { text-shadow: 0 0 30px rgba(255,105,180,0.8), 0 0 60px rgba(255,105,180,0.5); }
            to { text-shadow: 0 0 40px rgba(255,20,147,1), 0 0 80px rgba(255,20,147,0.8), 0 0 100px rgba(255,105,180,0.6); }
        }
        #homePage h2 { font-size: 26px; opacity: 0.9; margin-bottom: 10px; }
        .heart-icon { font-size: 90px; animation: heartbeat 1s ease-in-out infinite; margin-bottom: 20px; }
        @keyframes heartbeat {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        .start-btn {
            padding: 16px 48px; font-size: 22px; font-weight: 600;
            border: none; border-radius: 50px;
            background: linear-gradient(45deg, #ff416c, #ff4b2b);
            color: #fff; cursor: pointer;
            box-shadow: 0 10px 40px rgba(255,65,108,0.5);
            transition: 0.3s; animation: btnGlow 2s ease-in-out infinite;
        }
        @keyframes btnGlow {
            0%, 100% { box-shadow: 0 10px 40px rgba(255,65,108,0.5); }
            50% { box-shadow: 0 15px 60px rgba(255,65,108,0.8); }
        }
        .start-btn:hover { transform: translateY(-4px) scale(1.04); }
        #galleryPage { background: rgba(0,0,0,0.25); }
        #galleryPage h1 { font-family: 'Dancing Script', cursive; font-size: 42px; text-shadow: 0 0 20px pink; margin-bottom: 16px; }
        .photo-container { position: relative; width: 100%; height: 55vh; overflow: hidden; }
        .falling-photo {
            position: absolute; border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(255,105,180,0.4);
            border: 3px solid #fff; object-fit: cover;
            animation: fallPhoto linear infinite;
        }
        @keyframes fallPhoto {
            0% { transform: translateY(-150px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(calc(55vh + 150px)) rotate(360deg); opacity: 0; }
        }
        .next-btn {
            padding: 14px 40px; font-size: 19px; font-weight: 600;
            border: none; border-radius: 50px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: #fff; cursor: pointer;
            box-shadow: 0 10px 30px rgba(102,126,234,0.4);
            transition: 0.3s; margin-top: 18px;
        }
        .next-btn:hover { transform: translateY(-3px); box-shadow: 0 15px 40px rgba(102,126,234,0.6); }
        #gamePage { background: rgba(0,0,0,0.3); }
        #gamePage h1 { font-family: 'Dancing Script', cursive; font-size: 38px; text-shadow: 0 0 20px pink; }
        .game-instruction { font-size: 17px; opacity: 0.9; margin-bottom: 10px; }
        .target-name { font-size: 24px; margin-bottom: 12px; letter-spacing: 8px; }
        .target-letter {
            display: inline-block; width: 40px; height: 48px; line-height: 48px;
            margin: 0 4px; background: rgba(255,255,255,0.15); border-radius: 10px;
            font-size: 26px; font-weight: bold;
        }
        .target-letter.found { background: linear-gradient(45deg, #ff416c, #ff4b2b); animation: letterPop 0.3s ease; }
        @keyframes letterPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.3)} }
        .letter-container {
            position: relative; width: 100%; height: 44vh;
            overflow: hidden; border-radius: 20px; background: rgba(0,0,0,0.15);
        }
        .falling-letter {
            position: absolute; font-size: 34px; font-weight: bold;
            cursor: pointer; user-select: none;
            text-shadow: 0 0 10px currentColor;
            animation: fallLetter linear forwards;
        }
        .falling-letter:hover { transform: scale(1.4); }
        @keyframes fallLetter {
            0% { top: -50px; opacity: 0; }
            5% { opacity: 1; }
            95% { opacity: 1; }
            100% { top: calc(44vh + 50px); opacity: 0; }
        }
        .falling-letter.clicked { animation: letterExplode 0.5s ease forwards !important; }
        @keyframes letterExplode {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(2); }
            100% { transform: scale(0); opacity: 0; }
        }
        .progress-bar {
            width: 70%; max-width: 360px; height: 16px;
            background: rgba(255,255,255,0.15); border-radius: 10px;
            overflow: hidden; margin: 12px 0;
        }
        .progress-fill {
            height: 100%; width: 0%;
            background: linear-gradient(90deg, #ff416c, #ff4b2b, #ff9a8b);
            background-size: 200% 100%;
            animation: progressGlow 2s ease infinite;
            transition: width 0.3s ease;
        }
        @keyframes progressGlow { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        #wishPage { background: rgba(0,0,0,0.25); }
        .wish-container { max-width: 600px; width: 100%; padding: 0 10px; }
        #wishPage h1 { font-family: 'Dancing Script', cursive; font-size: 46px; text-shadow: 0 0 30px pink; margin-bottom: 20px; }
        .wish-text {
            font-size: 22px; line-height: 1.8;
            opacity: 0; transform: translateY(20px);
            animation: fadeInUp 1s ease forwards;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .wish-text:nth-child(2) { animation-delay: 0.4s; }
        .wish-text:nth-child(3) { animation-delay: 0.8s; }
        .wish-text:nth-child(4) { animation-delay: 1.2s; }
        .wish-text:nth-child(5) { animation-delay: 1.6s; }
        .wish-text:nth-child(6) { animation-delay: 2.0s; }
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        .final-heart { font-size: 70px; margin-top: 20px; animation: heartbeat 1s ease-in-out infinite, fadeInUp 1s ease forwards; animation-delay: 2.4s; opacity: 0; }
        
        .create-new-btn {
            margin-top: 28px;
            padding: 16px 44px;
            font-size: 20px;
            font-weight: 700;
            border: none;
            border-radius: 50px;
            background: linear-gradient(135deg, #f093fb, #f5576c);
            color: #fff;
            cursor: pointer;
            box-shadow: 0 10px 40px rgba(245, 87, 108, 0.4);
            transition: all 0.3s ease;
            animation: btnGlow 2s ease-in-out infinite;
            opacity: 0;
            animation: fadeInUp 1s ease forwards, btnGlow 2s ease-in-out infinite;
            animation-delay: 2.8s;
        }
        .create-new-btn:hover {
            transform: translateY(-4px) scale(1.05);
            box-shadow: 0 15px 50px rgba(245, 87, 108, 0.6);
        }
        .create-new-btn:active { transform: scale(0.97); }

        .rain-heart {
            position: fixed; pointer-events: none; z-index: 100;
            animation: heartFall linear forwards;
        }
        @keyframes heartFall {
            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .confetti {
            position: fixed; width: 10px; height: 10px;
            animation: confettiFall linear forwards;
        }
        @keyframes confettiFall {
            0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .audio-btn {
            position: fixed; top: 18px; right: 18px;
            width: 48px; height: 48px; border-radius: 50%;
            border: none; background: rgba(255,255,255,0.15);
            color: #fff; font-size: 22px; cursor: pointer;
            z-index: 1000; backdrop-filter: blur(8px);
        }
        .audio-btn:hover { background: rgba(255,255,255,0.25); }
        @media (max-width: 600px) {
            #homePage h1 { font-size: 38px; }
            #homePage h2 { font-size: 18px; }
            .heart-icon { font-size: 60px; }
            .start-btn { padding: 14px 30px; font-size: 17px; }
            #galleryPage h1, #gamePage h1 { font-size: 30px; }
            #wishPage h1 { font-size: 34px; }
            .wish-text { font-size: 17px; }
            .target-letter { width: 30px; height: 38px; line-height: 38px; font-size: 20px; }
            .create-new-btn { padding: 14px 30px; font-size: 17px; }
        }
    </style>
</head>
<body>
    <div class="sparkle-overlay"></div>
    <div class="floating-hearts" id="floatingHearts"></div>
    <audio id="bgMusic" loop>
        <source src="https://res.cloudinary.com/pcohwe1h/video/upload/v1783003794/the_mountain-happy-birthday-508020_vx2mlx.mp3" type="audio/mpeg">
    </audio>
    <button class="audio-btn" id="audioBtn" onclick="toggleMusic()">🔇</button>

    <div id="homePage" class="page">
        <div class="heart-icon">💖</div>
        <h1>Happy Birthday!</h1>
        <h2>My ${nickname} ❤️</h2>
        <button class="start-btn" onclick="startSurprise()">🎁 Start Surprise</button>
    </div>

    <div id="galleryPage" class="page hidden">
        <h1>Our Beautiful Memories 💕</h1>
        <div class="photo-container" id="photoContainer"></div>
        <button class="next-btn" onclick="goToGame()">💝 Play a Love Game</button>
    </div>

    <div id="gamePage" class="page hidden">
        <h1>Find ${gameName}'s Name 💘</h1>
        <p class="game-instruction">Catch the letters of your ${relation}'s name!</p>
        <div class="target-name" id="targetName"></div>
        <div class="progress-bar"><div class="progress-fill" id="progressFill"></div></div>
        <div class="letter-container" id="letterContainer"></div>
    </div>

    <div id="wishPage" class="page hidden">
        <div class="wish-container">
            <h1>My Lovely ${nickname} 💖</h1>
            <p class="wish-text">${safeWish}</p>
            <p class="wish-text">You are the best ${relation} ever ✨</p>
            <p class="wish-text">Every moment with you is magical 🌟</p>
            <p class="wish-text">You make my heart smile every single day 😊</p>
            <p class="wish-text">I promise to love you forever and always 💕</p>
            <p class="wish-text">Happy Birthday, My Everything! 🎂🎁</p>
            <div class="final-heart">💝</div>
            <button class="create-new-btn" onclick="goToGenerator()">🔄 Create New Wish</button>
        </div>
    </div>

    <script>
        const photos = [${photoArrayString}];
        const boyfriendName = "${gameName}";
        const relation = "${relation}";
        const generatorUrl = "${generatorUrl}";
        
        let currentPage = 'home';
        let photoInterval = null;
        let letterInterval = null;
        let foundLetters = [];
        let musicPlaying = false;

        function createBackgroundHearts() {
            const container = document.getElementById('floatingHearts');
            for (let i = 0; i < 14; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'bg-heart';
                    heart.innerHTML = '❤️';
                    heart.style.left = Math.random() * 100 + 'vw';
                    heart.style.fontSize = (Math.random() * 28 + 18) + 'px';
                    heart.style.animationDuration = (Math.random() * 10 + 14) + 's';
                    heart.style.animationDelay = (Math.random() * 5) + 's';
                    container.appendChild(heart);
                }, i * 900);
            }
        }
        createBackgroundHearts();

        function toggleMusic() {
            const music = document.getElementById('bgMusic');
            const btn = document.getElementById('audioBtn');
            if (musicPlaying) { 
                music.pause(); 
                btn.textContent = '🔇'; 
                musicPlaying = false; 
            } else { 
                music.play().catch(() => {}); 
                btn.textContent = '🔊'; 
                musicPlaying = true; 
            }
        }

        function showPage(id) {
            document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
            document.getElementById(id).classList.remove('hidden');
            currentPage = id;
        }

        function startSurprise() {
            const music = document.getElementById('bgMusic');
            music.play().catch(() => {});
            musicPlaying = true;
            document.getElementById('audioBtn').textContent = '🔊';
            showPage('galleryPage');
            startPhotoRain();
            createHeartRain();
        }

        function startPhotoRain() {
            const container = document.getElementById('photoContainer');
            if (!container) return;
            
            function createPhoto() {
                const img = document.createElement('img');
                img.className = 'falling-photo';
                img.src = photos[Math.floor(Math.random() * photos.length)];
                const size = Math.random() * 80 + 100;
                img.style.width = size + 'px';
                img.style.height = (size * 1.2) + 'px';
                img.style.left = Math.random() * (container.offsetWidth - size) + 'px';
                img.style.animationDuration = (Math.random() * 3 + 4) + 's';
                container.appendChild(img);
                setTimeout(() => img.remove(), 8000);
            }
            
            for (let i = 0; i < 5; i++) setTimeout(createPhoto, i * 300);
            if (photoInterval) clearInterval(photoInterval);
            photoInterval = setInterval(createPhoto, 700);
        }

        function stopPhotoRain() { 
            if (photoInterval) {
                clearInterval(photoInterval);
                photoInterval = null;
            }
        }

        function goToGame() {
            stopPhotoRain();
            showPage('gamePage');
            initGame();
        }

        function initGame() {
            foundLetters = [];
            const targetDiv = document.getElementById('targetName');
            if (!targetDiv) return;
            
            targetDiv.innerHTML = '';
            boyfriendName.split('').forEach(letter => {
                const span = document.createElement('span');
                span.className = 'target-letter';
                span.textContent = '_';
                span.dataset.letter = letter;
                targetDiv.appendChild(span);
            });
            startLetterRain();
        }

        function startLetterRain() {
            const container = document.getElementById('letterContainer');
            if (!container) return;
            
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#00d2d3','#ff9f43'];

            function createLetter() {
                const el = document.createElement('div');
                el.className = 'falling-letter';
                const remaining = boyfriendName.split('').filter(l => !foundLetters.includes(l));
                if (Math.random() < 0.4 && remaining.length > 0) {
                    el.textContent = remaining[Math.floor(Math.random() * remaining.length)];
                } else {
                    el.textContent = alphabet[Math.floor(Math.random() * alphabet.length)];
                }
                el.style.left = Math.random() * (container.offsetWidth - 40) + 'px';
                el.style.color = colors[Math.floor(Math.random() * colors.length)];
                el.style.animationDuration = (Math.random() * 2 + 3) + 's';
                el.onclick = () => checkLetter(el);
                container.appendChild(el);
                setTimeout(() => el.remove(), 6000);
            }

            if (letterInterval) clearInterval(letterInterval);
            letterInterval = setInterval(createLetter, 380);
        }

        function checkLetter(el) {
            const letter = el.textContent;
            const targets = document.querySelectorAll('.target-letter');
            el.classList.add('clicked');

            targets.forEach(target => {
                if (target.dataset.letter === letter && target.textContent === '_') {
                    target.textContent = letter;
                    target.classList.add('found');
                    foundLetters.push(letter);
                    createLetterExplosion(el.offsetLeft, el.offsetTop);
                }
            });

            const progress = (foundLetters.length / boyfriendName.length) * 100;
            const progressFill = document.getElementById('progressFill');
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }

            if (foundLetters.length === boyfriendName.length) {
                if (letterInterval) {
                    clearInterval(letterInterval);
                    letterInterval = null;
                }
                createConfetti();
                setTimeout(() => {
                    showPage('wishPage');
                    createHeartRain();
                }, 1800);
            }
        }

        function createLetterExplosion(x, y) {
            const container = document.getElementById('letterContainer');
            if (!container) return;
            
            for (let i = 0; i < 10; i++) {
                const p = document.createElement('div');
                p.style.cssText = 'position:absolute; left:'+x+'px; top:'+y+'px; width:8px; height:8px; background:#ff6b6b; border-radius:50%; pointer-events:none;';
                container.appendChild(p);
                const angle = (Math.PI * 2 / 10) * i;
                let px = x, py = y, opacity = 1;
                const anim = () => {
                    px += Math.cos(angle) * 5; 
                    py += Math.sin(angle) * 5; 
                    opacity -= 0.05;
                    p.style.left = px + 'px'; 
                    p.style.top = py + 'px'; 
                    p.style.opacity = opacity;
                    if (opacity > 0) requestAnimationFrame(anim);
                    else p.remove();
                };
                requestAnimationFrame(anim);
            }
        }

        function createHeartRain() {
            const hearts = ['❤️','💖','💕','💗','💝','💘'];
            for (let i = 0; i < 30; i++) {
                setTimeout(() => {
                    const h = document.createElement('div');
                    h.className = 'rain-heart';
                    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                    h.style.left = Math.random() * 100 + 'vw';
                    h.style.fontSize = (Math.random() * 20 + 15) + 'px';
                    h.style.animationDuration = (Math.random() * 3 + 3) + 's';
                    document.body.appendChild(h);
                    setTimeout(() => h.remove(), 6000);
                }, i * 100);
            }
        }

        function createConfetti() {
            const colors = ['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#5f27cd','#00d2d3'];
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    const c = document.createElement('div');
                    c.className = 'confetti';
                    c.style.left = Math.random() * 100 + 'vw';
                    c.style.background = colors[Math.floor(Math.random() * colors.length)];
                    c.style.animationDuration = (Math.random() * 2 + 2) + 's';
                    document.body.appendChild(c);
                    setTimeout(() => c.remove(), 4000);
                }, i * 30);
            }
        }

        function goToGenerator() {
            if (generatorUrl && generatorUrl !== window.location.href) {
                window.location.href = generatorUrl;
            } else {
                window.location.href = 'index.html';
            }
        }

    </script>
</body>
</html>`;
}

// ============================================================
//  FORM SUBMISSION
// ============================================================
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const nickname = nicknameInput.value.trim();
    const gameName = gameNameInput.value.trim().toUpperCase();
    const relation = relationInput.value.trim();
    const wish = wishInput.value.trim();

    if (!nickname) { alert('Please enter what you call him/her.'); return; }
    if (uploadedFiles.length < 6) { alert('Please upload at least 6 images.'); return; }
    if (!gameName) { alert('Please enter a name for the love game.'); return; }
    if (!relation) { alert('Please enter the relation.'); return; }
    if (!wish) { alert('Please write your birthday wish.'); return; }

    const btn = form.querySelector('.btn-generate');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;

    const readerPromises = uploadedFiles.map((file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });
    });

    Promise.all(readerPromises).then((imageData) => {
        const data = {
            nickname,
            gameName,
            relation,
            wish,
            images: imageData
        };

        generatedHtml = generateBirthdayHTML(data);
        
        const fileName = `birthday_${nickname.replace(/\s+/g, '_')}.html`;
        generatedFileName = fileName;
        
        const blob = new Blob([generatedHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        generatedLinkInput.value = fileName;
        generatedLinkInput.dataset.url = url;
        generatedLinkArea.classList.remove('hidden');

        btn.textContent = '✅ Generated!';
        btn.disabled = false;

        // Auto-download
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = fileName;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        generatedLinkArea.scrollIntoView({ behavior: 'smooth', block: 'center' });

        setTimeout(() => {
            btn.textContent = originalText;
        }, 5000);

    }).catch((err) => {
        alert('Error processing images: ' + err.message);
        btn.textContent = originalText;
        btn.disabled = false;
    });
});

// ============================================================
//  BUTTON HANDLERS
// ============================================================
openLinkBtn.addEventListener('click', function() {
    const url = generatedLinkInput.dataset.url;
    if (url) {
        window.open(url, '_blank');
    } else {
        alert('Please generate the website first!');
    }
});

downloadBtn.addEventListener('click', function() {
    const url = generatedLinkInput.dataset.url;
    const fileName = generatedLinkInput.value || 'birthday_website.html';
    if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Please generate the website first!');
    }
});

// ============================================================
//  INIT
// ============================================================
console.log('🎂 Birthday Wish Generator loaded successfully!');
console.log('📸 Select at least 6 photos');
console.log('📝 Write your wish in your own words');