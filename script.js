// Typed.js initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typed.js for the hero subtitle
    const typed = new Typed('#typed-text', {
        strings: [
            'Research Engineer',
            'Hardware-Software Architect',
            'AI/ML Innovator',
            'Startup Co-Founder',
            'Problem Solver'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2500,
        loop: true,
        showCursor: true,
        cursorChar: '█'
    });

    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .highlight-card, .skill-item, .tool-item, .cert-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 300);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // Parallax effect for hero section
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add CSS for loading animation
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadingStyle);

    // Add floating particles effect to hero section
    createFloatingParticles();

    // Add scroll progress indicator
    createScrollProgress();
});

// Floating particles effect
function createFloatingParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
        z-index: 0;
    `;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }

    hero.appendChild(particlesContainer);

    // Add CSS for floating animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Add some additional interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add tilt effect to profile card
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
        profileCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        profileCard.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    }

    // Add typing sound effect (optional)
    const typingSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT');
    
    // Add click sound to buttons (optional)
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Uncomment the next line if you want sound effects
            // typingSound.play();
        });
    });

    // Initialize Games
    initializeMemoryGame();
    initializeSnakeGame();
    // Don't initialize Wordle here - will be done when game is selected
    // initializeWordleGame();

    // Initialize Chatbot
    initializeChatbot();
    
    // Add global keyboard listener for Wordle
    document.addEventListener('keydown', handleWordleKeyPress);
    
    // Add single click handler for Wordle grid (outside of grid creation to avoid multiple listeners)
    document.addEventListener('click', function(e) {
        if (e.target.closest('#wordleGrid') && wordleGameActive) {
            e.target.closest('#wordleGrid').focus();
            console.log('Wordle grid clicked and focused'); // Debug log
        }
    });
});

// Game Selector Function
function selectGame(gameType) {
    // Update active button
    document.querySelectorAll('.game-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.closest('.game-select-btn').classList.add('active');
    
    // Hide all games
    document.querySelectorAll('.game-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Show selected game
    document.getElementById(gameType + 'Game').classList.add('active');
    
    // Activate Wordle game if selected
    if (gameType === 'wordle') {
        // Force a clean grid by initializing the game
        initializeWordleGame().then(() => {
            wordleGameActive = true;
            console.log('Wordle game activated'); // Debug log
            // Add visual feedback that Wordle is active
            const wordleGrid = document.getElementById('wordleGrid');
            if (wordleGrid) {
                wordleGrid.style.border = '2px solid var(--primary-color)';
                wordleGrid.style.borderRadius = '10px';
                wordleGrid.style.padding = '10px';
                // Focus the grid to ensure keyboard input works
                wordleGrid.focus();
                console.log('Wordle grid focused for keyboard input'); // Debug log
            }
        });
    } else {
        wordleGameActive = false;
        // Remove visual feedback
        const wordleGrid = document.getElementById('wordleGrid');
        if (wordleGrid) {
            wordleGrid.style.border = '';
            wordleGrid.style.borderRadius = '';
            wordleGrid.style.padding = '';
        }
    }
}

// Memory Game Variables and Functions
const emojis = ['🚀', '💻', '🤖', '🔬', '⚡', '🎯', '🌟', '💡'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let memoryMoves = 0;
let memoryScore = 0;
let canFlip = true;

function initializeMemoryGame() {
    const gameGrid = document.getElementById('memoryGrid');
    if (!gameGrid) return;
    
    // Create pairs of cards
    const gameCards = [...emojis, ...emojis];
    gameCards.sort(() => Math.random() - 0.5);
    
    memoryCards = [];
    flippedCards = [];
    matchedPairs = 0;
    memoryMoves = 0;
    memoryScore = 0;
    canFlip = true;
    
    updateMemoryStats();
    
    gameGrid.innerHTML = '';
    gameCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'game-card-item';
        card.innerHTML = `
            <div class="game-card-front">?</div>
            <div class="game-card-back">${emoji}</div>
        `;
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.addEventListener('click', () => flipMemoryCard(card));
        gameGrid.appendChild(card);
        memoryCards.push(card);
    });
}

function flipMemoryCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        canFlip = false;
        memoryMoves++;
        updateMemoryStats();
        
        const [card1, card2] = flippedCards;
        
        if (card1.dataset.emoji === card2.dataset.emoji) {
            // Match found
            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                matchedPairs++;
                memoryScore += 10;
                updateMemoryStats();
                flippedCards = [];
                canFlip = true;
                
                if (matchedPairs === emojis.length) {
                    setTimeout(() => showWinModal('Memory Game', `You completed the game in ${memoryMoves} moves!`, `Final Score: ${memoryScore}`), 500);
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
                canFlip = true;
            }, 1000);
        }
    }
}

function updateMemoryStats() {
    const scoreElement = document.getElementById('memoryScore');
    const movesElement = document.getElementById('memoryMoves');
    
    if (scoreElement) scoreElement.textContent = memoryScore;
    if (movesElement) movesElement.textContent = memoryMoves;
}

function resetMemoryGame() {
    initializeMemoryGame();
}

// Snake Game Variables and Functions
let snakeCanvas, snakeCtx;
let snake = [];
let food = {};
let direction = 'right';
let gameLoop;
let snakeScore = 0;
let isPaused = false;

function initializeSnakeGame() {
    snakeCanvas = document.getElementById('snakeCanvas');
    if (!snakeCanvas) return;
    
    snakeCtx = snakeCanvas.getContext('2d');
    resetSnakeGame();
    
    // Add keyboard controls
    document.addEventListener('keydown', handleSnakeKeyPress);
}

function resetSnakeGame() {
    snake = [{x: 10, y: 10}];
    direction = 'right';
    snakeScore = 0;
    isPaused = false;
    updateSnakeStats();
    generateFood();
    drawSnake();
}

function startSnakeGame() {
    if (gameLoop) clearInterval(gameLoop);
    resetSnakeGame();
    gameLoop = setInterval(updateSnake, 150);
}

function pauseSnakeGame() {
    if (gameLoop) {
        clearInterval(gameLoop);
        gameLoop = null;
        isPaused = true;
    } else if (isPaused) {
        gameLoop = setInterval(updateSnake, 150);
        isPaused = false;
    }
}

function handleSnakeKeyPress(e) {
    if (!gameLoop && !isPaused) return;
    
    switch(e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

function updateSnake() {
    const head = {...snake[0]};
    
    switch(direction) {
        case 'up': head.y--; break;
        case 'down': head.y++; break;
        case 'left': head.x--; break;
        case 'right': head.x++; break;
    }
    
    // Check collision with walls
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
        gameOver();
        return;
    }
    
    // Check collision with self
    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }
    
    snake.unshift(head);
    
    // Check if food is eaten
    if (head.x === food.x && head.y === food.y) {
        snakeScore += 10;
        updateSnakeStats();
        generateFood();
    } else {
        snake.pop();
    }
    
    drawSnake();
}

function generateFood() {
    do {
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function drawSnake() {
    // Clear canvas
    snakeCtx.fillStyle = '#f8f9fa';
    snakeCtx.fillRect(0, 0, 400, 400);
    
    // Draw snake
    snakeCtx.fillStyle = '#10b981';
    snake.forEach((segment, index) => {
        if (index === 0) {
            snakeCtx.fillStyle = '#059669'; // Darker head
        } else {
            snakeCtx.fillStyle = '#10b981';
        }
        snakeCtx.fillRect(segment.x * 20, segment.y * 20, 18, 18);
    });
    
    // Draw food
    snakeCtx.fillStyle = '#ef4444';
    snakeCtx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

function gameOver() {
    clearInterval(gameLoop);
    gameLoop = null;
    showWinModal('Snake Game', `Game Over! Your score: ${snakeScore}`, `Snake length: ${snake.length}`);
}

function updateSnakeStats() {
    const scoreElement = document.getElementById('snakeScore');
    const lengthElement = document.getElementById('snakeLength');
    
    if (scoreElement) scoreElement.textContent = snakeScore;
    if (lengthElement) lengthElement.textContent = snake.length;
}

// Wordle Game Variables and Functions
const wordleWords = [
    // Common everyday words
    'HELLO', 'WORLD', 'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT',
    'AFTER', 'AGAIN', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIKE', 'ALIVE',
    'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'AMONG', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
    'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARRAY', 'ASIDE', 'ASSET', 'AUDIO', 'AUDIT', 'AVOID',
    'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BASIS', 'BEACH', 'BEGAN', 'BEGIN',
    'BEING', 'BELOW', 'BENCH', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK', 'BLOOD',
    'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BREAD', 'BREAK', 'BREED', 'BRIEF',
    'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CALIF', 'CARRY',
    'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF',
    'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB',
    'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT',
    'CRASH', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CURVE', 'CYCLE', 'DAILY', 'DANCE',
    'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT',
    'DRAMA', 'DRAWN', 'DREAM', 'DRESS', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY',
    'EARTH', 'EIGHT', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR',
    'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD',
    'FIFTH', 'FIFTY', 'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID',
    'FOCUS', 'FORCE', 'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH',
    'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE',
    'GRADE', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN',
    'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY',
    'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE',
    'JAPAN', 'JIMMY', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER',
    'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT',
    'LIMIT', 'LINKS', 'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC',
    'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL',
    'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT',
    'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE',
    'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFFIC', 'ORDER', 'OTHER',
    'OUGHT', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO',
    'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND',
    'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD',
    'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO',
    'REACH', 'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'REPLY', 'RIGHT', 'RIVAL', 'RIVER',
    'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SAID', 'SAME',
    'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE',
    'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN',
    'SIGHT', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART',
    'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE',
    'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE',
    'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STEM', 'STEP', 'STICK',
    'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY',
    'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES',
    'TEACH', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE',
    'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER',
    'TIGHT', 'TIMED', 'TINY', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH',
    'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED',
    'TRIES', 'TRUCK', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'UNDER', 'UNDUE', 'UNION',
    'UNITY', 'UNTIL', 'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO',
    'VIRUS', 'VISIT', 'VITAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH',
    'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST',
         'WORTH', 'WOULD', 'WOUND', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'
];

// Keyboard layout for virtual keyboard
const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
];

let currentWord = '';
let currentRow = 0;
let currentCol = 0;
let wordleGuesses = 0;
let wordleWins = 0;
let gameWon = false;
let wordleGameActive = false;

// Function to get a random 5-letter word from API
async function getRandomWordFromAPI() {
    try {
        // Using Datamuse API to get random 5-letter words
        const response = await fetch('https://api.datamuse.com/words?sp=?????&max=100');
        const words = await response.json();
        
        // Filter for exactly 5-letter words and check if they're valid
        const fiveLetterWords = words.filter(word => word.word.length === 5);
        
        if (fiveLetterWords.length > 0) {
            // Try to validate the first few words
            for (let i = 0; i < Math.min(5, fiveLetterWords.length); i++) {
                const word = fiveLetterWords[i].word.toUpperCase();
                const isValid = await checkWordValidity(word);
                if (isValid) {
                    return word;
                }
            }
        }
        
        // Fallback to local word list
        console.log('API word fetch failed, using local word list');
        return wordleWords[Math.floor(Math.random() * wordleWords.length)];
    } catch (error) {
        console.log('API error, using local word list');
        return wordleWords[Math.floor(Math.random() * wordleWords.length)];
    }
}

async function initializeWordleGame() {
    // Validate that all words are exactly 5 characters
    const invalidWords = wordleWords.filter(word => word.length !== 5);
    if (invalidWords.length > 0) {
        console.error('Invalid words found (not 5 characters):', invalidWords);
    }
    
    // Get word from API or fallback to local list
    currentWord = await getRandomWordFromAPI();
    currentRow = 0;
    currentCol = 0;
    wordleGuesses = 0;
    gameWon = false;
    wordleGameActive = false; // Start as inactive, will be activated when game is selected
    updateWordleStats();
    createWordleGrid();
    createVirtualKeyboard();
    
    // Debug: log the current word and grid info (remove this in production)
    console.log('Current word:', currentWord);
    console.log('Grid created with', document.querySelectorAll('.wordle-cell').length, 'cells');
    console.log('Grid has', document.querySelectorAll('.wordle-row').length, 'rows');
}

function createWordleGrid() {
    const grid = document.getElementById('wordleGrid');
    if (!grid) return;
    
    // Clear the grid completely
    grid.innerHTML = '';
    
    // Create exactly 6 rows for 6 attempts
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('div');
        row.className = 'wordle-row';
        // Create exactly 5 cells per row
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'wordle-cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            row.appendChild(cell);
        }
        grid.appendChild(row);
    }
    
    // Make grid focusable
    grid.tabIndex = 0;
}

function createVirtualKeyboard() {
    const keyboard = document.getElementById('wordleKeyboard');
    if (!keyboard) return;
    
    // Clear the keyboard
    keyboard.innerHTML = '';
    
    // Create keyboard rows
    keyboardLayout.forEach(row => {
        const keyboardRow = document.createElement('div');
        keyboardRow.className = 'keyboard-row';
        
        row.forEach(key => {
            const keyElement = document.createElement('div');
            keyElement.className = 'keyboard-key';
            keyElement.textContent = key;
            keyElement.dataset.key = key;
            
            // Add special classes for special keys
            if (key === 'ENTER') {
                keyElement.classList.add('special', 'enter');
            } else if (key === 'BACKSPACE') {
                keyElement.classList.add('special', 'backspace');
            }
            
            // Add click handler
            keyElement.addEventListener('click', () => handleKeyboardClick(key));
            
            keyboardRow.appendChild(keyElement);
        });
        
        keyboard.appendChild(keyboardRow);
    });
}

function handleKeyboardClick(key) {
    if (!wordleGameActive || gameWon) return;
    
    if (key === 'ENTER') {
        submitWordleGuess();
    } else if (key === 'BACKSPACE') {
        if (currentCol > 0) {
            currentCol--;
            const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            if (cell) {
                cell.textContent = '';
                cell.classList.remove('filled');
            }
        }
    } else if (/^[A-Z]$/.test(key) && currentCol < 5) {
        const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
        if (cell) {
            cell.textContent = key;
            cell.classList.add('filled');
            currentCol++;
            console.log('Letter added via keyboard, new col:', currentCol); // Debug log
        }
    }
}

function updateKeyboardState() {
    // Get all the letters that have been used in guesses
    const usedLetters = new Set();
    const letterStates = {};
    
    // Collect all letters from completed rows
    for (let row = 0; row < currentRow; row++) {
        const cells = document.querySelectorAll(`.wordle-cell[data-row="${row}"]`);
        cells.forEach((cell, index) => {
            const letter = cell.textContent;
            if (letter) {
                usedLetters.add(letter);
                
                // Determine the state of this letter
                let state = 'absent';
                if (cell.classList.contains('correct')) {
                    state = 'correct';
                } else if (cell.classList.contains('present')) {
                    state = 'present';
                }
                
                // Update letter state (correct > present > absent)
                if (!letterStates[letter] || 
                    (state === 'correct') || 
                    (state === 'present' && letterStates[letter] === 'absent')) {
                    letterStates[letter] = state;
                }
            }
        });
    }
    
    // Update keyboard keys
    Object.keys(letterStates).forEach(letter => {
        const keyElement = document.querySelector(`.keyboard-key[data-key="${letter}"]`);
        if (keyElement) {
            // Remove existing state classes
            keyElement.classList.remove('correct', 'present', 'absent');
            // Add new state class
            keyElement.classList.add(letterStates[letter]);
        }
    });
}

function handleWordleKeyPress(e) {
    // Only handle keys if Wordle game is active and not won
    if (!wordleGameActive || gameWon) {
        console.log('Wordle not active or game won, ignoring key:', e.key); // Debug log
        return;
    }
    
    console.log('Key pressed:', e.key, 'Key code:', e.keyCode, 'Current row:', currentRow, 'Current col:', currentCol); // Debug log
    
    // Handle Enter/Return key (works for both Windows/Linux Enter and Mac Return)
    if (e.key === 'Enter' || e.key === 'Return' || e.keyCode === 13) {
        console.log('Enter/Return key detected, submitting guess'); // Debug log
        // Add visual feedback to the Enter key on virtual keyboard
        const enterKey = document.querySelector('.keyboard-key.enter');
        if (enterKey) {
            enterKey.style.transform = 'scale(0.95)';
            setTimeout(() => {
                enterKey.style.transform = '';
            }, 150);
        }
        submitWordleGuess();
    } else if (e.key === 'Backspace' || e.keyCode === 8) {
        // Add visual feedback to the Backspace key on virtual keyboard
        const backspaceKey = document.querySelector('.keyboard-key.backspace');
        if (backspaceKey) {
            backspaceKey.style.transform = 'scale(0.95)';
            setTimeout(() => {
                backspaceKey.style.transform = '';
            }, 150);
        }
        
        if (currentCol > 0) {
            currentCol--;
            const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            if (cell) {
                cell.textContent = '';
                cell.classList.remove('filled');
            }
        }
    } else if (/^[A-Za-z]$/.test(e.key) && currentCol < 5) {
        // Add visual feedback to the letter key on virtual keyboard
        const letterKey = document.querySelector(`.keyboard-key[data-key="${e.key.toUpperCase()}"]`);
        if (letterKey) {
            letterKey.style.transform = 'scale(0.95)';
            setTimeout(() => {
                letterKey.style.transform = '';
            }, 150);
        }
        
        const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
        if (cell) {
            cell.textContent = e.key.toUpperCase();
            cell.classList.add('filled');
            currentCol++;
            console.log('Letter added, new col:', currentCol); // Debug log
        }
    }
}

// Function to check if a word is valid using the Dictionary API
async function checkWordValidity(word) {
    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
        return response.ok; // Returns true if word exists in dictionary
    } catch (error) {
        console.log('API error, falling back to local word list');
        return wordleWords.includes(word); // Fallback to local list
    }
}

async function submitWordleGuess() {
    if (currentCol !== 5) {
        console.log('Not enough letters, currentCol:', currentCol); // Debug log
        return;
    }
    
    const guess = Array.from(document.querySelectorAll(`.wordle-cell[data-row="${currentRow}"]`))
        .map(cell => cell.textContent)
        .join('');
    
    console.log('Submitting guess:', guess); // Debug log
    
    // Check word validity using API (with local fallback)
    const isValidWord = await checkWordValidity(guess);
    
    if (!isValidWord) {
        // Invalid word - add shake animation
        console.log('Invalid word, shaking row'); // Debug log
        shakeRow(currentRow);
        return;
    }
    
    wordleGuesses++;
    updateWordleStats();
    
    console.log('Processing guess, guesses:', wordleGuesses); // Debug log
    
    // Check each letter with proper Wordle logic
    const cells = document.querySelectorAll(`.wordle-cell[data-row="${currentRow}"]`);
    let correctCount = 0;
    
    // First pass: mark correct letters
    cells.forEach((cell, index) => {
        const letter = cell.textContent;
        if (letter === currentWord[index]) {
            cell.classList.add('correct');
            correctCount++;
        }
    });
    
    // Second pass: mark present and absent letters
    cells.forEach((cell, index) => {
        const letter = cell.textContent;
        
        if (letter === currentWord[index]) {
            // Already marked as correct
        } else if (currentWord.includes(letter)) {
            // Check if this letter appears more times in the guess than in the word
            const letterCountInWord = (currentWord.match(new RegExp(letter, 'g')) || []).length;
            const letterCountInGuess = guess.split(letter).length - 1;
            const correctPositions = Array.from(cells).filter((c, i) => c.textContent === letter && currentWord[i] === letter).length;
            
            if (correctPositions + Array.from(cells).slice(0, index).filter(c => c.textContent === letter && currentWord[Array.from(cells).indexOf(c)] !== letter).length < letterCountInWord) {
                cell.classList.add('present');
            } else {
                cell.classList.add('absent');
            }
        } else {
            cell.classList.add('absent');
        }
    });
    
    if (correctCount === 5) {
        gameWon = true;
        wordleWins++;
        updateWordleStats();
        setTimeout(() => showWinModal('Wordle', `Congratulations! You found the word in ${wordleGuesses} tries!`, `Wins: ${wordleWins}`), 1000);
    } else if (wordleGuesses >= 6) {
        setTimeout(() => showWinModal('Wordle', `Game Over! The word was ${currentWord}`, `Wins: ${wordleWins}`), 1000);
    }
    
    currentRow++;
    currentCol = 0;
    
    // Update keyboard state after processing the guess
    updateKeyboardState();
}

function shakeRow(rowIndex) {
    const row = document.querySelector(`.wordle-row:nth-child(${rowIndex + 1})`);
    if (row) {
        row.classList.add('shake');
        setTimeout(() => {
            row.classList.remove('shake');
        }, 500);
    }
}

function updateWordleStats() {
    const guessesElement = document.getElementById('wordleGuesses');
    const winsElement = document.getElementById('wordleWins');
    
    if (guessesElement) guessesElement.textContent = wordleGuesses;
    if (winsElement) winsElement.textContent = wordleWins;
    
    console.log('Updated stats - guesses:', wordleGuesses, 'wins:', wordleWins); // Debug log
}

async function resetWordleGame() {
    // Show loading indicator
    const loadingElement = document.getElementById('wordleLoading');
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
    
    // Clear the grid completely first
    const grid = document.getElementById('wordleGrid');
    if (grid) {
        grid.innerHTML = '';
    }
    
    // Reset all game state
    currentRow = 0;
    currentCol = 0;
    wordleGuesses = 0;
    gameWon = false;
    
    // Initialize fresh game
    await initializeWordleGame();
    
    // Hide loading indicator
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
    
    // Re-enable input after rebuilding
    wordleGameActive = true;
}

// Test function for debugging (can be called from console)
function testWordleGame() {
    console.log('=== Wordle Game Test ===');
    console.log('Current word:', currentWord);
    console.log('Game active:', wordleGameActive);
    console.log('Current row:', currentRow);
    console.log('Current col:', currentCol);
    console.log('Guesses:', wordleGuesses);
    console.log('Game won:', gameWon);
    
    const cells = document.querySelectorAll('.wordle-cell');
    const rows = document.querySelectorAll('.wordle-row');
    console.log('Grid cells:', cells.length);
    console.log('Grid rows:', rows.length);
    
    // Verify grid structure
    if (rows.length === 6) {
        console.log('✅ Correct number of rows (6)');
    } else {
        console.log('❌ Wrong number of rows:', rows.length);
    }
    
    if (cells.length === 30) {
        console.log('✅ Correct number of cells (30)');
    } else {
        console.log('❌ Wrong number of cells:', cells.length);
    }
    
    // Check each row has exactly 5 cells
    let allRowsCorrect = true;
    rows.forEach((row, index) => {
        const rowCells = row.querySelectorAll('.wordle-cell');
        if (rowCells.length !== 5) {
            console.log(`❌ Row ${index} has ${rowCells.length} cells instead of 5`);
            allRowsCorrect = false;
        }
    });
    
    if (allRowsCorrect) {
        console.log('✅ All rows have exactly 5 cells');
    }
    
    // Activate the game for testing
    wordleGameActive = true;
    console.log('Game activated for testing');
}

// Generic Win Modal Function
function showWinModal(title, message, details) {
    const winModal = document.getElementById('winModal');
    const winTitle = document.getElementById('winTitle');
    const winMessage = document.getElementById('winMessage');
    
    if (winTitle) winTitle.textContent = title;
    if (winMessage) winMessage.innerHTML = `${message}<br><br>${details}`;
    if (winModal) winModal.style.display = 'flex';
}

function closeWinModal() {
    const winModal = document.getElementById('winModal');
    if (winModal) winModal.style.display = 'none';
}

// Comprehensive knowledge base about Bek
const bekKnowledgeBase = {
    // Personal Information
    personal: {
        name: "Bilguunzaya Mijiddorj",
        nickname: "Bek",
        age: 22,
        location: "Norman, OK",
        email: "Bek@ou.edu",
        phone: "(405) 981-8456",
        university: "University of Oklahoma",
        field: "Computer Science",
        degree: "B.S. Computer Science",
        status: "Graduate student",
        scholarships: {
            uwc: "Full scholarship to United World College of East Africa in Tanzania",
            ou: "Full scholarship to University of Oklahoma"
        },
        origin: "Mongolia",
        family: "Family of 5",
        background: "Raised in the mountains of Mongolia",
        education_journey: {
            age_16: "Received full scholarship to attend IB school at United World College of East Africa in Tanzania",
            age_18: "Moved to US with full scholarship to attend University of Oklahoma",
            graduation: "Graduated May 2025 with B.S. in Computer Science"
        }
    },
    
    // Education
    education: {
        current: {
            degree: "M.S. in Electrical and Computer Engineering",
            university: "University of Oklahoma",
            status: "Graduate student",
            focus: "Hardware-Software Integration, Sensing Systems"
        },
        undergraduate: {
            degree: "B.S. in Computer Science",
            university: "University of Oklahoma",
            graduation: "May 2025",
            period: "2021 August to 2025 May",
            scholarship: "Full scholarship recipient"
        },
        international: {
            tanzania: {
                school: "United World College of East Africa",
                location: "Tanzania",
                program: "IB school",
                period: "Age 16-18",
                scholarship: "Full scholarship"
            }
        },
        background: {
            foundation: "Computer Science and Mathematics",
            research: "BLE-based hardware interfaces and real-time sensor data analytics"
        }
    },
    
    // Skills
    skills: {
        programming: {
            python: { level: 95, description: "Primary language for AI/ML and data science" },
            java: { level: 90, description: "Strong object-oriented programming" },
            c: { level: 85, description: "Systems programming and embedded systems" },
            cpp: { level: 85, description: "Object-oriented systems programming" },
            r: { level: 80, description: "Statistical analysis and data science" },
            swift: { level: 80, description: "iOS mobile app development" },
            sql: { level: 90, description: "Database management and queries" }
        },
        development: {
            mobile: {
                android: "Android app development",
                ios: "iOS app development with Swift",
                xamarin: "Cross-platform mobile development"
            },
            web: "Web development and frontend technologies",
            database: "Database management and design",
            data_science: "Data analysis, machine learning, and statistical modeling",
            modeling: "3D modeling and design",
            research: "Research methodology and academic writing",
            project_management: "Project planning, execution, and team leadership"
        },
        technologies: {
            react: "Frontend development",
            firebase: "Backend and database",
            google_cloud: "Cloud computing",
            ble: "Bluetooth Low Energy interfaces",
            git: "Version control",
            rest_apis: "API development and integration"
        },
        certifications: [
            "Machine Learning Specialization",
            "Prompt Engineering",
            "LangChain for LLM",
            "GenAI and Transformers"
        ]
    },
    
    // Experience
    experience: {
        current: {
            title: "Graduate Research Assistant",
            company: "University of Oklahoma – School of Electrical and Computer Engineering",
            period: "May 2025 - Present",
            responsibilities: [
                "Sponsored through research assistantship to support faculty-led projects in sensing systems and software",
                "Developed iOS and Android applications to interface with BLE-based hardware",
                "Conducted data analytics and visualization for real-time sensor measurements"
            ]
        },
        previous: [
            {
                title: "Undergraduate Research Assistant",
                company: "University of Oklahoma – School of Electrical and Computer Engineering",
                period: "July 2024 - May 2025",
                project: "Methane (CH4) Monitoring and Environmental Gas Emissions",
                responsibilities: [
                    "Actively engaged in comprehensive project focused on monitoring methane emissions",
                    "Building and designing CH4 sensor device with software components",
                    "Hardware and software integration for precise data collection and analysis"
                ]
            },
            {
                title: "Data Science Intern",
                company: "NovelSoft — Mongolia, Ulaanbaatar",
                period: "May 2023 - Jan 2024",
                responsibilities: [
                    "Assisted in implementing machine learning models to solve real-world business problems",
                    "Led creation of custom database system tailored to organizational needs",
                    "Developed chatbot leveraging OpenAI API for automated customer queries"
                ]
            },
            {
                title: "University Residence Life Community Assistant",
                company: "University of Oklahoma",
                period: "August 2022 - May 2025",
                responsibilities: [
                    "Front desk assistance and administrative support",
                    "College students campus assistance and guidance",
                    "Community building and student support services"
                ]
            },
            {
                title: "New Sooner Orientation Guide",
                company: "University of Oklahoma",
                period: "May 2022 - August 2022",
                responsibilities: [
                    "Helped incoming freshman students register for classes",
                    "Guided new students around campus",
                    "Assisted with pre-campus life preparation"
                ]
            },
            {
                title: "Foods & Services Worker",
                company: "University of Oklahoma",
                period: "September 2021 - March 2022",
                responsibilities: [
                    "Cashier duties and customer service",
                    "Food preparation and cooking",
                    "Cleaning and maintenance duties"
                ]
            }
        ]
    },
    
    // Projects
    projects: {
        xhale_health: {
            name: "XHale Health",
            role: "iOS Research App Developer",
            description: "iOS app for real-time carbon monoxide (CO) and temperature monitoring using BLE sensors",
            highlights: [
                "Real-time CO and temperature monitoring using BLE sensors",
                "Developed for research at OU Electrical Engineering Department",
                "Firebase integration with user authentication and data backup",
                "Breath sampling workflow with data export capabilities",
                "Medical disclaimer and App Store compliance"
            ],
            technologies: ["iOS", "Swift", "BLE", "Firebase", "Research"],
            features: [
                "Bluetooth LE device discovery & connection",
                "Real-time CO & temperature monitoring with dual y-axis charts",
                "Guided breath sampling workflow with countdown timer",
                "Battery life indicator and device management",
                "User authentication with Firebase Auth",
                "Data backup & sync to Firebase Firestore",
                "Dark mode and accessibility features",
                "Interactive onboarding tutorial"
            ]
        },
        nexlusense: {
            name: "NexLuSense",
            role: "Co-founder and Software Lead",
            description: "Sensor tech startup focused on intelligent sensing and mobility platforms",
            website: "https://nexlusense.com",
            highlights: [
                "Co-founded startup focused on intelligent sensing and mobility platforms",
                "Leading software development across web and mobile platforms",
                "Hardware-software integration expertise"
            ]
        },
        oke_ride: {
            name: "OKE Ride",
            role: "Autonomous Platform Developer",
            description: "Autonomous three-legged scooter platform with vision and GPS-based navigation technologies",
            highlights: [
                "Engineering autonomous three-legged scooter platform",
                "Vision and GPS-based navigation technologies",
                "Computer vision and autonomous systems"
            ]
        },
        methane_monitoring: {
            name: "Methane Monitoring System",
            role: "Research Assistant",
            description: "CH4 sensor device with software components for environmental monitoring",
            highlights: [
                "CH4 sensor device development",
                "Hardware and software integration",
                "Environmental gas emissions monitoring"
            ]
        },
        ai_club: {
            name: "OU AI and ML Club",
            role: "Executive",
            description: "Head of OU Computer Science Club, managing events and student engagement",
            highlights: [
                "Served as Head of OU Computer Science Club",
                "Managing events and student engagement",
                "Leadership and community building"
            ]
        }
    },
    
    // Research Interests
    research: {
        areas: [
            "Hardware-Software Integration",
            "Sensing Systems",
            "Environmental Monitoring",
            "Autonomous Systems",
            "AI/ML Applications",
            "BLE-based Interfaces",
            "Real-time Data Analytics"
        ],
        current_focus: "BLE-based hardware interfaces and real-time sensor data analytics"
    },
    
    // Achievements
    achievements: {
        academic: ["Full scholarship to UWC East Africa", "Full scholarship to University of Oklahoma", "Dean's List"],
        professional: ["Co-founded NexLuSense", "Graduate Research Assistant", "Multiple certifications"],
        technical: ["BLE hardware interfaces", "Autonomous systems", "AI/ML expertise"]
    }
};

// Question synonyms and variations for better matching
const questionSynonyms = {
    // Personal information
    'name': ['name', 'called', 'full name', 'real name', 'what is your name', 'who are you'],
    'age': ['age', 'how old', 'years old', 'birthday', 'born'],
    'origin': ['from', 'where', 'country', 'nationality', 'mongolia', 'mongolian', 'background'],
    'family': ['family', 'parents', 'siblings', 'brothers', 'sisters', 'relatives'],
    'location': ['live', 'residence', 'address', 'city', 'state', 'norman', 'oklahoma'],
    
    // Education
    'education': ['study', 'school', 'university', 'college', 'degree', 'major', 'academic'],
    'gpa': ['gpa', 'grade', 'grades', 'academic performance', 'grade point average'],
    'scholarship': ['scholarship', 'funding', 'financial aid', 'tuition', 'paid for'],
    'tanzania': ['tanzania', 'africa', 'ib school', 'international', 'east africa'],
    'graduation': ['graduate', 'graduated', 'finish', 'complete', 'degree'],
    
    // Skills
    'skills': ['skill', 'expertise', 'proficient', 'know', 'can do', 'capable'],
    'programming': ['code', 'coding', 'program', 'language', 'develop', 'software'],
    'python': ['python', 'py'],
    'java': ['java'],
    'c': ['c language', 'c programming'],
    'cpp': ['c++', 'cpp', 'c plus plus'],
    'swift': ['swift', 'ios', 'apple'],
    'mobile': ['mobile', 'app', 'android', 'ios', 'phone', 'xamarin'],
    'web': ['web', 'website', 'frontend', 'backend', 'react'],
    'database': ['database', 'sql', 'db', 'data storage'],
    '3d': ['3d', 'modeling', 'model', 'design', 'cad'],
    
    // Experience
    'experience': ['work', 'job', 'career', 'employment', 'position', 'role'],
    'current': ['now', 'currently', 'present', 'today', 'recent'],
    'previous': ['before', 'past', 'earlier', 'former', 'last'],
    'research': ['research', 'study', 'investigation', 'academic work'],
    'internship': ['intern', 'internship', 'temporary', 'summer'],
    
    // Projects
    'projects': ['project', 'work', 'development', 'build', 'create'],
    'xhale': ['xhale', 'xhale health', 'carbon monoxide', 'co', 'ble', 'ios app', 'health app', 'monitoring', 'firebase'],
    'nexlusense': ['nexlusense', 'startup', 'company', 'business'],
    'oke_ride': ['oke ride', 'autonomous', 'scooter', 'robot'],
    'methane': ['methane', 'ch4', 'environmental', 'monitoring', 'sensor'],
    
    // Contact
    'contact': ['contact', 'reach', 'email', 'phone', 'call', 'message'],
    'email': ['email', 'e-mail', 'mail'],
    'phone': ['phone', 'telephone', 'call', 'number'],
    
    // General
    'background': ['background', 'story', 'journey', 'path', 'history'],
    'achievements': ['achievement', 'award', 'accomplishment', 'success', 'recognition'],
    'certifications': ['certification', 'cert', 'certificate', 'credential']
};

// Context memory for conversation flow
let conversationContext = {
    lastTopic: null,
    lastResponse: null,
    userInterests: [],
    conversationHistory: []
};

// Enhanced chatbot responses with more sophisticated matching
const botResponses = {
    // Greetings
    'hello': "Hello! I'm Bek's AI assistant. I can help you learn about his background, skills, projects, research, and experience. What would you like to know?",
    'hi': "Hi there! I'm here to tell you all about Bek. I know everything about his education, work experience, projects, and technical skills. What interests you?",
    'hey': "Hey! I'm Bek's AI assistant. I can answer any question about his portfolio, from his research work to his startup ventures. What would you like to learn?",
    
    // Skills and Technical
    'skills': `Bek has a diverse technical skill set:

**Programming Languages:**
• Python (95%) - Primary language for AI/ML and data science
• Java (90%) - Strong object-oriented programming
• C (85%) - Systems programming and embedded systems
• C++ (85%) - Object-oriented systems programming
• R (80%) - Statistical analysis and data science
• Swift (80%) - iOS mobile app development
• SQL (90%) - Database management and queries

**Development Areas:**
• Mobile App Development (Android, iOS, Xamarin)
• Web Development
• Database Management
• Data Science
• 3D Modeling
• Research Skills
• Project Management

**Technologies & Tools:**
• React & Next.js
• Firebase & Google Cloud
• BLE (Bluetooth Low Energy)
• Git & REST APIs

**Certifications:**
• Machine Learning Specialization
• Prompt Engineering
• LangChain for LLM
• GenAI and Transformers

What specific area would you like to know more about?`,
    
    'programming': "Bek is proficient in multiple programming languages. His strongest languages are Python (95%), Java (90%), and JavaScript (85%). He also works with R, SQL, and Dart. He's particularly strong in AI/ML applications, web development, and database management.",
    
    'python': "Bek's primary programming language is Python with 95% proficiency. He uses it extensively for AI/ML projects, data science, and research work. His Python skills are central to his work in machine learning and sensor data analytics.",
    
    'java': "Bek has 90% proficiency in Java. He's strong in object-oriented programming and uses Java for various software development projects, particularly in his research work and mobile applications.",
    
    'javascript': "Bek has 85% proficiency in JavaScript. He uses it for web development, particularly with React and Next.js frameworks. This is essential for his work on web applications and user interfaces.",
    
    // Projects
    'projects': `Bek has worked on several significant projects:

**🏥 XHale Health** (iOS Research App)
• Real-time carbon monoxide (CO) and temperature monitoring using BLE sensors
• Developed for research at OU Electrical Engineering Department
• Firebase integration with user authentication and data export

**🚀 NexLuSense** (Co-founder & Software Lead)
• Sensor tech startup focused on intelligent sensing and mobility platforms
• Leading software development across web and mobile platforms
• Visit: https://nexlusense.com

**🤖 OKE Ride** (Autonomous Platform)
• Autonomous three-legged scooter with vision and GPS navigation
• Computer vision and autonomous systems development

**🔬 Methane Monitoring** (Research Project)
• CH4 sensor device with software components
• Environmental gas emissions monitoring

**👥 OU AI and ML Club** (Executive)
• Head of OU Computer Science Club
• Managing events and student engagement

Which project would you like to learn more about?`,
    
    'nexlusense': "NexLuSense is Bek's co-founded startup focused on intelligent sensing and mobility platforms. As Software Lead, he's responsible for leading software development across web and mobile platforms. The company specializes in hardware-software integration and sensor technology. You can learn more at https://nexlusense.com",
    
    'oke ride': "OKE Ride is an autonomous three-legged scooter platform that Bek is developing. It features vision and GPS-based navigation technologies, combining computer vision with autonomous systems. This project showcases his expertise in robotics and autonomous vehicle systems.",
    
    'xhale': "XHale Health is an iOS app Bek developed for real-time carbon monoxide (CO) and temperature monitoring using BLE sensors. It was developed for research at the University of Oklahoma Electrical Engineering Department. The app features Firebase integration, user authentication, breath sampling workflow, data export capabilities, and is designed with medical compliance and accessibility in mind.",
    
    'methane': "Bek worked on a Methane (CH4) Monitoring and Environmental Gas Emissions project as an Undergraduate Research Assistant. He built and designed CH4 sensor devices with software components, focusing on hardware and software integration for precise data collection and analysis.",
    
    // Experience
    'experience': `Bek's professional experience includes:

**Current: Graduate Research Assistant** (May 2025 - Present)
• University of Oklahoma – School of Electrical and Computer Engineering
• Sponsored research assistantship in sensing systems and software
• Developing iOS/Android apps for BLE-based hardware
• Conducting data analytics for real-time sensor measurements

**Previous: Undergraduate Research Assistant** (July 2024 - May 2025)
• University of Oklahoma – School of Electrical and Computer Engineering
• Methane monitoring and environmental gas emissions project
• CH4 sensor device development and hardware-software integration

**Previous: University Residence Life Community Assistant** (August 2022 - May 2025)
• University of Oklahoma
• Front desk assistance and administrative support
• College students campus assistance and guidance
• Community building and student support services

**Previous: New Sooner Orientation Guide** (May 2022 - August 2022)
• University of Oklahoma
• Helped incoming freshman students register for classes
• Guided new students around campus
• Assisted with pre-campus life preparation

**Previous: Data Science Intern** (May 2023 - Jan 2024)
• NovelSoft — Mongolia, Ulaanbaatar
• Machine learning models for business problems
• Custom database system development
• OpenAI API chatbot development

**Previous: Foods & Services Worker** (September 2021 - March 2022)
• University of Oklahoma
• Cashier duties and customer service
• Food preparation and cooking
• Cleaning and maintenance duties

What aspect of his experience interests you most?`,
    
    'work': "Bek is currently a Graduate Research Assistant at the University of Oklahoma, working on sensing systems and software. Previously, he was an Undergraduate Research Assistant working on methane monitoring projects, and a Data Science Intern at NovelSoft in Mongolia. He specializes in BLE-based hardware interfaces and real-time sensor data analytics.",
    
    // Education
    'education': `Bek's educational background:

**Current: M.S. in Electrical and Computer Engineering**
• University of Oklahoma
• Focus: Hardware-Software Integration, Sensing Systems
• Research: BLE-based hardware interfaces and real-time sensor data analytics

**Undergraduate: B.S. in Computer Science** (May 2025)
• University of Oklahoma
• Full scholarship recipient
• Period: August 2021 - May 2025

**International Education:**
• United World College of East Africa, Tanzania (Age 16-18)
• IB school program with full scholarship
• Two years of international education experience

**Background:**
• Strong foundation in Computer Science and Mathematics
• Dean's List recipient
• Full scholarship recipient for both Tanzania and US education
• Exceptional academic achievement demonstrated through merit-based scholarships

He's a graduate student with expertise in bridging hardware and software systems.`,
    
    'university': "Bek is currently pursuing his M.S. in Electrical and Computer Engineering at the University of Oklahoma. He received a full scholarship for his undergraduate studies and is a Dean's List recipient. His research focuses on BLE-based hardware interfaces and real-time sensor data analytics.",
    
    'gpa': "Bek received full scholarships for his education, demonstrating exceptional academic achievement. He was awarded a full scholarship to United World College of East Africa in Tanzania and another full scholarship to the University of Oklahoma.",
    
    // Contact
    'contact': `You can reach Bek at:

📧 **Email:** Bek@ou.edu
📱 **Phone:** (405) 981-8456
📍 **Location:** Norman, OK

He's always open to new opportunities, collaborations, and professional connections!`,
    
    'email': "Bek's email address is Bek@ou.edu. He's always open to professional inquiries and collaborations.",
    
    'phone': "Bek's phone number is (405) 981-8456. He's based in Norman, OK.",
    
    // Research
    'research': `Bek's research interests include:

**Current Focus:**
• BLE-based hardware interfaces
• Real-time sensor data analytics
• Sensing systems and software

**Research Areas:**
• Hardware-Software Integration
• Environmental Monitoring
• Autonomous Systems
• AI/ML Applications
• Real-time Data Analytics

He's particularly interested in bridging the gap between hardware and software systems.`,
    
    'ai': "Bek has extensive AI/ML experience including Machine Learning Specialization certification, Prompt Engineering expertise, LangChain for LLM development, and GenAI and Transformers knowledge. He applies AI/ML in real-world applications, particularly in data science and autonomous systems.",
    
    'machine learning': "Bek has a Machine Learning Specialization certification and extensive experience applying ML in real-world scenarios. He's worked on machine learning models for business problems and uses AI/ML in his research on sensor data analytics and autonomous systems.",
    
    'hardware': "Bek specializes in bridging hardware and software systems. His expertise includes BLE-based hardware interfaces, CH4 sensor device development, autonomous vehicle systems, and real-time sensor data analytics. He's particularly strong in hardware-software integration.",
    
    'startup': "Bek co-founded NexLuSense, a sensor tech startup focused on intelligent sensing and mobility platforms. As Software Lead, he's responsible for leading software development across web and mobile platforms. The company specializes in hardware-software integration and sensor technology.",
    
    // Achievements
    'awards': "Bek has received several prestigious scholarships including full scholarships to United World College of East Africa in Tanzania and the University of Oklahoma. He's a Dean's List recipient and has achieved multiple technical certifications in AI/ML. He's also co-founded a successful startup.",
    
    'certifications': "Bek holds certifications in Machine Learning Specialization, Prompt Engineering, LangChain for LLM, and GenAI and Transformers. These certifications complement his practical experience in AI/ML applications and research.",
    
    // Default response
    'background': `Bek's personal background:

**Origin:** Mongolia
**Age:** 22 years old
**Family:** Family of 5
**Upbringing:** Raised in the mountains of Mongolia

**Educational Journey:**
• Age 16: Received full scholarship to attend IB school at United World College of East Africa in Tanzania
• Age 18: Moved to US with full scholarship to attend University of Oklahoma
• 2025: Graduated with B.S. in Computer Science

**Current Status:** Graduate student pursuing M.S. in Electrical and Computer Engineering

Bek's journey from the mountains of Mongolia to graduate studies in the US showcases his determination and academic excellence through merit-based scholarships.`,
    
    'journey': "Bek's journey is quite remarkable. He was raised in the mountains of Mongolia in a family of 5. At age 16, he received a full scholarship to attend IB school at United World College of East Africa in Tanzania. After two years there, he moved to the US with another full scholarship to attend the University of Oklahoma, where he graduated with a B.S. in Computer Science in May 2025. He's now pursuing his M.S. in Electrical and Computer Engineering.",
    
    'default': "I'm not sure about that specific topic, but I can help you learn about Bek's background, skills, projects, experience, education, research, or contact information. What would you like to know?"
};

function initializeChatbot() {
    // Chatbot is already initialized in HTML
}

function toggleChatbot() {
    const window = document.getElementById('chatbotWindow');
    const isVisible = window.style.display === 'flex';
    window.style.display = isVisible ? 'none' : 'flex';
    
    if (!isVisible) {
        document.getElementById('chatbotInput').focus();
    }
}

function sendMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate bot response
        setTimeout(() => {
            hideTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000 + Math.random() * 1000);
    }
}

function sendQuickReply(topic) {
    const response = getBotResponse(topic);
    addMessage(response, 'bot');
    
    // Add follow-up suggestions based on the topic
    setTimeout(() => {
        addFollowUpSuggestions(topic);
    }, 1000);
}

function addFollowUpSuggestions(topic) {
    const suggestions = getFollowUpSuggestions(topic);
    if (suggestions.length > 0) {
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'follow-up-suggestions';
        suggestionsDiv.innerHTML = '<p><strong>You might also want to ask:</strong></p>';
        
        suggestions.forEach(suggestion => {
            const button = document.createElement('button');
            button.className = 'quick-reply follow-up';
            button.textContent = suggestion;
            button.onclick = () => {
                const response = getBotResponse(suggestion);
                addMessage(response, 'bot');
                // Remove suggestions after clicking
                suggestionsDiv.remove();
            };
            suggestionsDiv.appendChild(button);
        });
        
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.appendChild(suggestionsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

function getFollowUpSuggestions(topic) {
    const suggestionMap = {
        'skills': ['What programming languages does Bek know?', 'Tell me about Bek\'s mobile development experience', 'What technologies does Bek use?'],
        'projects': ['Tell me about NexLuSense', 'What is OKE Ride?', 'Tell me about the methane monitoring project'],
        'experience': ['What is Bek doing now?', 'Tell me about Bek\'s previous work', 'What companies has Bek worked for?'],
        'education': ['What is Bek\'s GPA?', 'Tell me about Bek\'s journey from Mongolia', 'What is Bek studying?'],
        'research': ['What are Bek\'s research areas?', 'Tell me about Bek\'s current research', 'What is Bek\'s research focus?'],
        'contact': ['What is Bek\'s email?', 'Where does Bek live?', 'What is Bek\'s phone number?'],
        'background': ['Where is Bek from?', 'Tell me about Bek\'s family', 'What is Bek\'s age?'],
        'journey': ['Tell me about Bek\'s time in Tanzania', 'How did Bek get to the US?', 'What scholarships did Bek receive?']
    };
    
    return suggestionMap[topic] || [];
}

// Advanced matching functions
function findBestMatch(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let bestMatch = null;
    let bestScore = 0;
    
    // Check each synonym category
    for (const [category, synonyms] of Object.entries(questionSynonyms)) {
        for (const synonym of synonyms) {
            if (lowerMessage.includes(synonym)) {
                const score = calculateMatchScore(lowerMessage, synonym, category);
                if (score > bestScore) {
                    bestScore = score;
                    bestMatch = { category, synonym, score };
                }
            }
        }
    }
    
    return bestMatch;
}

function calculateMatchScore(message, synonym, category) {
    let score = 0;
    
    // Exact match gets highest score
    if (message.includes(synonym)) {
        score += 10;
    }
    
    // Word boundary matching (more precise)
    const wordBoundaryRegex = new RegExp(`\\b${synonym}\\b`, 'i');
    if (wordBoundaryRegex.test(message)) {
        score += 5;
    }
    
    // Category-specific bonuses
    if (category === 'name' && message.includes('full')) score += 3;
    if (category === 'age' && message.includes('old')) score += 3;
    if (category === 'origin' && message.includes('from')) score += 3;
    
    return score;
}

function classifyQuestionIntent(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Question words
    const questionWords = ['what', 'when', 'where', 'who', 'why', 'how', 'which', 'tell me', 'can you'];
    const hasQuestionWord = questionWords.some(word => lowerMessage.includes(word));
    
    // Intent classification
    if (lowerMessage.includes('compare') || lowerMessage.includes('difference')) return 'comparison';
    if (lowerMessage.includes('best') || lowerMessage.includes('strongest')) return 'ranking';
    if (lowerMessage.includes('future') || lowerMessage.includes('plan')) return 'future';
    if (lowerMessage.includes('advice') || lowerMessage.includes('recommend')) return 'advice';
    if (lowerMessage.includes('challenge') || lowerMessage.includes('difficult')) return 'challenge';
    
    return hasQuestionWord ? 'information' : 'statement';
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Update conversation context
    updateConversationContext(userMessage);
    
    let response = null;
    
    // First, try exact matches from botResponses
    for (const [key, responseText] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
            conversationContext.lastTopic = key;
            conversationContext.lastResponse = responseText;
            response = responseText;
            break;
        }
    }
    
    // Try advanced synonym matching
    if (!response) {
        const bestMatch = findBestMatch(userMessage);
        if (bestMatch && bestMatch.score >= 5) {
            const synonymResponse = generateResponseFromSynonyms(bestMatch.category, userMessage);
            if (synonymResponse) {
                conversationContext.lastTopic = bestMatch.category;
                conversationContext.lastResponse = synonymResponse;
                response = synonymResponse;
            }
        }
    }
    
    // If no synonym match, try to generate a response from the knowledge base
    if (!response) {
        const knowledgeResponse = generateResponseFromKnowledgeBase(userMessage);
        if (knowledgeResponse) {
            conversationContext.lastTopic = 'knowledge_base';
            conversationContext.lastResponse = knowledgeResponse;
            response = knowledgeResponse;
        }
    }
    
    // Try contextual responses based on conversation history
    if (!response) {
        const contextualResponse = generateContextualResponse(userMessage);
        if (contextualResponse) {
            response = contextualResponse;
        }
    }
    
    // Use default response if nothing else matches
    if (!response) {
        response = botResponses.default;
    }
    
    // Apply dynamic response generation for more natural conversation
    response = generateDynamicResponse(response, userMessage);
    
            return response;
        }

function updateConversationContext(userMessage) {
    conversationContext.conversationHistory.push({
        message: userMessage,
        timestamp: Date.now()
    });
    
    // Keep only last 10 messages for context
    if (conversationContext.conversationHistory.length > 10) {
        conversationContext.conversationHistory.shift();
    }
    
    // Extract potential interests
    const interests = extractUserInterests(userMessage);
    conversationContext.userInterests = [...new Set([...conversationContext.userInterests, ...interests])];
}

function extractUserInterests(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    const interests = [];
    
    if (lowerMessage.includes('mobile') || lowerMessage.includes('app')) interests.push('mobile_development');
    if (lowerMessage.includes('web') || lowerMessage.includes('website')) interests.push('web_development');
    if (lowerMessage.includes('research') || lowerMessage.includes('academic')) interests.push('research');
    if (lowerMessage.includes('startup') || lowerMessage.includes('business')) interests.push('entrepreneurship');
    if (lowerMessage.includes('mongolia') || lowerMessage.includes('international')) interests.push('international_background');
    
    return interests;
}

function generateResponseFromSynonyms(category, userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    switch (category) {
        case 'name':
            if (lowerMessage.includes('full')) {
                return `Bek's full name is ${bekKnowledgeBase.personal.name}.`;
            }
            return `Bek's name is ${bekKnowledgeBase.personal.name}, but he goes by ${bekKnowledgeBase.personal.nickname}.`;
            
        case 'age':
            return `Bek is ${bekKnowledgeBase.personal.age} years old.`;
            
        case 'origin':
            return `Bek is from ${bekKnowledgeBase.personal.origin}. He was raised in the mountains of Mongolia in a family of ${bekKnowledgeBase.personal.family}.`;
            
        case 'family':
            return `Bek comes from a family of ${bekKnowledgeBase.personal.family} in Mongolia.`;
            
        case 'location':
            return `Bek lives in ${bekKnowledgeBase.personal.location}.`;
            
        case 'education':
            return botResponses.education;
            
        case 'gpa':
            return `Bek received full scholarships for his education, demonstrating exceptional academic achievement. He was awarded a full scholarship to United World College of East Africa in Tanzania and another full scholarship to the University of Oklahoma.`;
            
        case 'scholarship':
            return `Bek received two major full scholarships for his education: at age 16 to attend United World College of East Africa in Tanzania, and at age 18 to attend the University of Oklahoma in the US. These scholarships covered his entire education costs.`;
            
        case 'tanzania':
            const tanzania = bekKnowledgeBase.education.international.tanzania;
            return `At age 16, Bek received a full scholarship to attend ${tanzania.program} at ${tanzania.school} in ${tanzania.location}. He spent two years there before moving to the US.`;
            
        case 'skills':
            return botResponses.skills;
            
        case 'programming':
            return "Bek is proficient in multiple programming languages including Python, C, C++, Java, R, Swift, and SQL. He's particularly strong in Python (95%), Java (90%), and C/C++ (85%).";
            
        case 'python':
            const python = bekKnowledgeBase.skills.programming.python;
            return `Bek has ${python.level}% proficiency in Python. ${python.description}`;
            
        case 'java':
            const java = bekKnowledgeBase.skills.programming.java;
            return `Bek has ${java.level}% proficiency in Java. ${java.description}`;
            
        case 'mobile':
            const mobile = bekKnowledgeBase.skills.development.mobile;
            return `Bek is experienced in mobile app development including ${mobile.android}, ${mobile.ios}, and ${mobile.xamarin}.`;
            
        case 'experience':
            return botResponses.experience;
            
        case 'research':
            return botResponses.research;
            
        case 'projects':
            return botResponses.projects;
            
        case 'contact':
            return botResponses.contact;
            
        case 'background':
            return botResponses.background;
            
        default:
            return null;
    }
}

function generateContextualResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    const intent = classifyQuestionIntent(userMessage);
    
    // Handle follow-up questions based on context
    if (conversationContext.lastTopic) {
        if (lowerMessage.includes('more') || lowerMessage.includes('details')) {
            return generateDetailedResponse(conversationContext.lastTopic);
        }
        
        if (lowerMessage.includes('why') || lowerMessage.includes('reason')) {
            return generateExplanatoryResponse(conversationContext.lastTopic);
        }
    }
    
    // Handle comparison questions
    if (intent === 'comparison') {
        if (lowerMessage.includes('python') && lowerMessage.includes('java')) {
            return "Python and Java are both strong languages for Bek. Python (95%) is his primary language for AI/ML and data science, while Java (90%) is used for object-oriented programming and mobile development. Python is better for rapid prototyping and data analysis, while Java excels in enterprise applications and Android development.";
        }
    }
    
    // Handle ranking questions
    if (intent === 'ranking') {
        if (lowerMessage.includes('strongest') || lowerMessage.includes('best')) {
            return "Bek's strongest programming languages are Python (95%), Java (90%), and C/C++ (85%). Python is his primary language for AI/ML, Java for object-oriented programming, and C/C++ for systems programming.";
        }
    }
    
    // Handle future-oriented questions
    if (intent === 'future') {
        if (lowerMessage.includes('plan') || lowerMessage.includes('next')) {
            return "Bek is currently pursuing his M.S. in Electrical and Computer Engineering at the University of Oklahoma. He's focused on research in sensing systems and hardware-software integration, while also working on his startup NexLuSense.";
        }
    }
    
    return null;
}

function generateDetailedResponse(topic) {
    switch (topic) {
        case 'skills':
            return "Bek's technical expertise spans multiple domains. In programming, he's proficient in Python (AI/ML), Java (OOP), C/C++ (systems), Swift (iOS), R (statistics), and SQL (databases). His development experience includes mobile apps (Android/iOS/Xamarin), web development, database management, data science, 3D modeling, and project management. He also holds certifications in Machine Learning, Prompt Engineering, LangChain, and GenAI.";
            
        case 'experience':
            return "Bek has a diverse work history. Currently as a Graduate Research Assistant, he develops iOS/Android apps for BLE hardware and conducts sensor data analytics. Previously, he was an Undergraduate Research Assistant working on methane monitoring, a Community Assistant helping students, an Orientation Guide for new students, a Data Science Intern at NovelSoft in Mongolia, and started with food service work. This shows his progression from entry-level positions to research roles.";
            
        case 'education':
            return "Bek's educational journey is remarkable. From Mongolia's mountains, he received a full scholarship at age 16 to attend IB school in Tanzania for two years. At 18, he received another full scholarship to attend the University of Oklahoma, where he graduated with a B.S. in Computer Science (3.7 GPA) in May 2025. He's now pursuing his M.S. in Electrical and Computer Engineering, focusing on hardware-software integration.";
            
        default:
            return null;
    }
}

function generateExplanatoryResponse(topic) {
    switch (topic) {
        case 'skills':
            return "Bek developed his diverse skill set through his international education journey, research work, and practical experience. His programming skills were honed through academic projects and internships, while his mobile development expertise comes from building apps for his research and startup work. His 3D modeling and project management skills were developed through various projects and leadership roles.";
            
        case 'experience':
            return "Bek's work experience progression shows his determination and adaptability. Starting with food service work, he moved to student support roles, then research positions, demonstrating his ability to learn and grow. His international background and scholarship achievements show his academic excellence and drive for success.";
            
        case 'education':
            return "Bek's educational path reflects his exceptional academic abilities and determination. Receiving full scholarships for both international and US education demonstrates his academic excellence. His choice to study Computer Science and then pursue Electrical and Computer Engineering shows his interest in bridging hardware and software systems.";
            
        default:
            return null;
    }
}

// Sentiment analysis for more natural responses
function analyzeSentiment(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    const positiveWords = ['amazing', 'impressive', 'great', 'excellent', 'wonderful', 'fantastic', 'awesome'];
    const negativeWords = ['bad', 'terrible', 'awful', 'disappointing', 'poor', 'weak'];
    const curiousWords = ['interesting', 'fascinating', 'curious', 'wonder', 'intriguing'];
    
    let sentiment = 'neutral';
    let score = 0;
    
    positiveWords.forEach(word => {
        if (lowerMessage.includes(word)) score += 1;
    });
    
    negativeWords.forEach(word => {
        if (lowerMessage.includes(word)) score -= 1;
    });
    
    curiousWords.forEach(word => {
        if (lowerMessage.includes(word)) score += 0.5;
    });
    
    if (score > 0) sentiment = 'positive';
    else if (score < 0) sentiment = 'negative';
    
    return { sentiment, score };
}

// Dynamic response generation based on context and sentiment
function generateDynamicResponse(baseResponse, userMessage) {
    const sentiment = analyzeSentiment(userMessage);
    const lowerMessage = userMessage.toLowerCase();
    
    let response = baseResponse;
    
    // Add sentiment-appropriate modifiers
    if (sentiment.sentiment === 'positive') {
        if (lowerMessage.includes('amazing') || lowerMessage.includes('impressive')) {
            response += "\n\nThank you! Bek has worked hard to develop these skills and experiences.";
        }
    }
    
    if (sentiment.sentiment === 'curious') {
        if (lowerMessage.includes('interesting') || lowerMessage.includes('fascinating')) {
            response += "\n\nIt's definitely a unique journey! Would you like to know more about any specific aspect?";
        }
    }
    
    // Add contextual follow-ups
    if (conversationContext.userInterests.length > 0) {
        const interests = conversationContext.userInterests;
        if (interests.includes('mobile_development') && !lowerMessage.includes('mobile')) {
            response += "\n\nSince you seem interested in mobile development, Bek has extensive experience with Android, iOS, and Xamarin development.";
        }
    }
    
    return response;
}

function generateResponseFromKnowledgeBase(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Personal information queries
    if (lowerMessage.includes('name') || lowerMessage.includes('who')) {
        if (lowerMessage.includes('full name')) {
            return `Bek's full name is ${bekKnowledgeBase.personal.name}.`;
        }
        return `Bek's name is ${bekKnowledgeBase.personal.name}, but he goes by ${bekKnowledgeBase.personal.nickname}.`;
    }
    
    if (lowerMessage.includes('age') || lowerMessage.includes('how old')) {
        return `Bek is ${bekKnowledgeBase.personal.age} years old.`;
    }
    
    if (lowerMessage.includes('where') && lowerMessage.includes('live')) {
        return `Bek lives in ${bekKnowledgeBase.personal.location}.`;
    }
    
    if (lowerMessage.includes('where') && lowerMessage.includes('from')) {
        return `Bek is from ${bekKnowledgeBase.personal.origin}. He was raised in the mountains of Mongolia in a family of ${bekKnowledgeBase.personal.family}.`;
    }
    
    if (lowerMessage.includes('mongolia') || lowerMessage.includes('mongolian')) {
        return `Bek is from Mongolia and was raised in the mountains there. He comes from a family of ${bekKnowledgeBase.personal.family}.`;
    }
    
    if (lowerMessage.includes('family')) {
        return `Bek comes from a family of ${bekKnowledgeBase.personal.family} in Mongolia.`;
    }
    
    if (lowerMessage.includes('gpa') || lowerMessage.includes('grade')) {
        return `Bek received full scholarships for his education, demonstrating exceptional academic achievement. He was awarded a full scholarship to United World College of East Africa in Tanzania and another full scholarship to the University of Oklahoma.`;
    }
    
    if (lowerMessage.includes('tanzania') || lowerMessage.includes('africa')) {
        const tanzania = bekKnowledgeBase.education.international.tanzania;
        return `At age 16, Bek received a full scholarship to attend ${tanzania.program} at ${tanzania.school} in ${tanzania.location}. He spent two years there before moving to the US.`;
    }
    
    if (lowerMessage.includes('scholarship') || lowerMessage.includes('funding')) {
        return `Bek received two major full scholarships for his education: at age 16 to attend United World College of East Africa in Tanzania, and at age 18 to attend the University of Oklahoma in the US. These scholarships covered his entire education costs.`;
    }
    
    // Specific skill queries
    if (lowerMessage.includes('python')) {
        const python = bekKnowledgeBase.skills.programming.python;
        return `Bek has ${python.level}% proficiency in Python. ${python.description}`;
    }
    
    if (lowerMessage.includes('java')) {
        const java = bekKnowledgeBase.skills.programming.java;
        return `Bek has ${java.level}% proficiency in Java. ${java.description}`;
    }
    
    if (lowerMessage.includes('c++') || lowerMessage.includes('cpp')) {
        const cpp = bekKnowledgeBase.skills.programming.cpp;
        return `Bek has ${cpp.level}% proficiency in C++. ${cpp.description}`;
    }
    
    if (lowerMessage.includes('c ')) {
        const c = bekKnowledgeBase.skills.programming.c;
        return `Bek has ${c.level}% proficiency in C. ${c.description}`;
    }
    
    if (lowerMessage.includes('swift')) {
        const swift = bekKnowledgeBase.skills.programming.swift;
        return `Bek has ${swift.level}% proficiency in Swift. ${swift.description}`;
    }
    
    if (lowerMessage.includes('mobile') || lowerMessage.includes('app development')) {
        const mobile = bekKnowledgeBase.skills.development.mobile;
        return `Bek is experienced in mobile app development including ${mobile.android}, ${mobile.ios}, and ${mobile.xamarin}.`;
    }
    
    if (lowerMessage.includes('android')) {
        return `Bek is experienced in ${bekKnowledgeBase.skills.development.mobile.android}.`;
    }
    
    if (lowerMessage.includes('ios')) {
        return `Bek is experienced in ${bekKnowledgeBase.skills.development.mobile.ios}.`;
    }
    
    if (lowerMessage.includes('xamarin')) {
        return `Bek is experienced in ${bekKnowledgeBase.skills.development.mobile.xamarin}.`;
    }
    
    if (lowerMessage.includes('3d') || lowerMessage.includes('modeling')) {
        return `Bek has experience in ${bekKnowledgeBase.skills.development.modeling}.`;
    }
    
    if (lowerMessage.includes('project management')) {
        return `Bek has experience in ${bekKnowledgeBase.skills.development.project_management}.`;
    }
    
    // Technology queries
    if (lowerMessage.includes('react')) {
        return `Bek uses React for ${bekKnowledgeBase.skills.technologies.react}.`;
    }
    
    if (lowerMessage.includes('firebase')) {
        return `Bek works with Firebase for ${bekKnowledgeBase.skills.technologies.firebase}.`;
    }
    
    if (lowerMessage.includes('ble') || lowerMessage.includes('bluetooth')) {
        return `Bek specializes in ${bekKnowledgeBase.skills.technologies.ble}.`;
    }
    
    // Project-specific queries
    if (lowerMessage.includes('nexlusense') || lowerMessage.includes('startup')) {
        const project = bekKnowledgeBase.projects.nexlusense;
        return `${project.name} is ${project.description}. As ${project.role}, Bek is responsible for ${project.highlights.join(', ')}. Visit ${project.website} to learn more.`;
    }
    
    if (lowerMessage.includes('oke ride') || lowerMessage.includes('autonomous')) {
        const project = bekKnowledgeBase.projects.oke_ride;
        return `${project.name} is ${project.description}. This project showcases ${project.highlights.join(', ')}.`;
    }
    
    if (lowerMessage.includes('methane') || lowerMessage.includes('ch4')) {
        const project = bekKnowledgeBase.projects.methane_monitoring;
        return `${project.name} is ${project.description}. This project involved ${project.highlights.join(', ')}.`;
    }
    
    // Research queries
    if (lowerMessage.includes('research') || lowerMessage.includes('study')) {
        const areas = bekKnowledgeBase.research.areas.join(', ');
        return `Bek's research areas include: ${areas}. His current focus is on ${bekKnowledgeBase.research.current_focus}.`;
    }
    
    // Achievement queries
    if (lowerMessage.includes('award') || lowerMessage.includes('achievement')) {
        const awards = bekKnowledgeBase.achievements.academic.join(', ');
        return `Bek's achievements include: ${awards}.`;
    }
    
    // Time-based queries
    if (lowerMessage.includes('current') || lowerMessage.includes('now')) {
        const current = bekKnowledgeBase.experience.current;
        return `Bek is currently working as ${current.title} at ${current.company} (${current.period}).`;
    }
    
    if (lowerMessage.includes('previous') || lowerMessage.includes('before')) {
        const previous = bekKnowledgeBase.experience.previous;
        let response = "Bek's previous experience includes:\n";
        previous.forEach(exp => {
            response += `• ${exp.title} at ${exp.company} (${exp.period})\n`;
        });
        return response;
    }
    
    // Specific company queries
    if (lowerMessage.includes('novelsoft') || lowerMessage.includes('mongolia')) {
        const exp = bekKnowledgeBase.experience.previous.find(e => e.company.includes('NovelSoft'));
        return `Bek worked as ${exp.title} at ${exp.company} (${exp.period}). His responsibilities included ${exp.responsibilities.join(', ')}.`;
    }
    
    if (lowerMessage.includes('orientation') || lowerMessage.includes('sooner')) {
        const exp = bekKnowledgeBase.experience.previous.find(e => e.title.includes('Orientation'));
        return `Bek worked as ${exp.title} at ${exp.company} (${exp.period}). His responsibilities included ${exp.responsibilities.join(', ')}.`;
    }
    
    if (lowerMessage.includes('residence') || lowerMessage.includes('community assistant')) {
        const exp = bekKnowledgeBase.experience.previous.find(e => e.title.includes('Community Assistant'));
        return `Bek worked as ${exp.title} at ${exp.company} (${exp.period}). His responsibilities included ${exp.responsibilities.join(', ')}.`;
    }
    
    if (lowerMessage.includes('food') || lowerMessage.includes('service')) {
        const exp = bekKnowledgeBase.experience.previous.find(e => e.title.includes('Foods'));
        return `Bek worked as ${exp.title} at ${exp.company} (${exp.period}). His responsibilities included ${exp.responsibilities.join(', ')}.`;
    }
    
    // University queries
    if (lowerMessage.includes('ou') || lowerMessage.includes('oklahoma')) {
        return `Bek is at the University of Oklahoma, pursuing his ${bekKnowledgeBase.education.current.degree} with a ${bekKnowledgeBase.education.current.gpa} GPA.`;
    }
    
    // Certification queries
    if (lowerMessage.includes('certification') || lowerMessage.includes('cert')) {
        const certs = bekKnowledgeBase.skills.certifications.join(', ');
        return `Bek holds certifications in: ${certs}.`;
    }
    
    return null; // No specific response found
}

function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    const messagesContainer = document.getElementById('chatbotMessages');
    
    if (typingIndicator) typingIndicator.style.display = 'block';
    if (messagesContainer) messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) typingIndicator.style.display = 'none';
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
} 