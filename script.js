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
    initializeWordleGame();

    // Initialize Chatbot
    initializeChatbot();
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
const wordleWords = ['REACT', 'BUILD', 'DEBUG', 'STACK', 'ARRAY', 'CLASS', 'FLOAT', 'PRINT', 'QUERY', 'VALUE', 'FUNCT', 'MODEL', 'SCOPE', 'CACHE', 'ASYNC', 'PROMI', 'FETCH', 'PARSE', 'MERGE', 'SPLIT'];
let currentWord = '';
let currentRow = 0;
let currentCol = 0;
let wordleGuesses = 0;
let wordleWins = 0;
let gameWon = false;

function initializeWordleGame() {
    currentWord = wordleWords[Math.floor(Math.random() * wordleWords.length)];
    currentRow = 0;
    currentCol = 0;
    wordleGuesses = 0;
    gameWon = false;
    updateWordleStats();
    createWordleGrid();
    
    // Add keyboard listener
    document.addEventListener('keydown', handleWordleKeyPress);
    
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
}



function handleWordleKeyPress(e) {
    if (gameWon) return;
    
    if (e.key === 'Enter') {
        submitWordleGuess();
    } else if (e.key === 'Backspace') {
        if (currentCol > 0) {
            currentCol--;
            const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
            if (cell) {
                cell.textContent = '';
                cell.classList.remove('filled');
            }
        }
    } else if (/^[A-Za-z]$/.test(e.key) && currentCol < 5) {
        const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${currentCol}"]`);
        if (cell) {
            cell.textContent = e.key.toUpperCase();
            cell.classList.add('filled');
            currentCol++;
        }
    }
}



function submitWordleGuess() {
    if (currentCol !== 5) return;
    
    const guess = Array.from(document.querySelectorAll(`.wordle-cell[data-row="${currentRow}"]`))
        .map(cell => cell.textContent)
        .join('');
    
    if (!wordleWords.includes(guess)) {
        // Invalid word - add shake animation
        shakeRow(currentRow);
        return;
    }
    
    wordleGuesses++;
    updateWordleStats();
    
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
}

function resetWordleGame() {
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
    initializeWordleGame();
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

// Chatbot Variables and Functions
const botResponses = {
    'hello': "Hello! I'm here to help you learn more about Bek's portfolio. What interests you?",
    'hi': "Hi there! I can tell you about Bek's skills, projects, or experience. What would you like to know?",
    'skills': "Bek has expertise in:\n• Python (95%)\n• Java (90%)\n• JavaScript (85%)\n• React & Next.js\n• AI/ML & Data Science\n• Hardware-Software Integration\n• BLE & IoT Technologies\n\nHe also has certifications in Machine Learning, Prompt Engineering, and LangChain!",
    'projects': "Bek's key projects include:\n🚀 NexLuSense - Co-founded startup focused on intelligent sensing and mobility platforms\n🤖 OKE Ride - Autonomous three-legged scooter with vision and GPS navigation\n🔬 Methane Monitoring - CH4 sensor device with software components\n\nWould you like details on any specific project?",
    'experience': "Bek's experience:\n• Graduate Research Assistant at OU (Aug 2025 - Present)\n• Undergraduate Research Assistant at OU (Jun 2024 - Aug 2024)\n• Data Science Intern at NovelSoft (May 2023 - Jan 2024)\n\nHe specializes in BLE-based hardware interfaces and real-time sensor data analytics.",
    'education': "Bek is pursuing his M.S. in Electrical and Computer Engineering at the University of Oklahoma with a 3.7 GPA. He has a strong foundation in Computer Science and Mathematics.",
    'contact': "You can reach Bek at:\n📧 Email: Bek@ou.edu\n📱 Phone: (405) 981-8456\n📍 Location: Norman, OK\n\nHe's always open to new opportunities and collaborations!",
    'ai': "Bek has extensive AI/ML experience including:\n• Machine Learning Specialization certification\n• Prompt Engineering expertise\n• LangChain for LLM development\n• GenAI and Transformers knowledge\n• Real-world AI applications in data science",
    'hardware': "Bek bridges hardware and software:\n• BLE-based hardware interfaces\n• CH4 sensor device development\n• Autonomous vehicle systems\n• Real-time sensor data analytics\n• Hardware-software integration",
    'startup': "Bek co-founded NexLuSense, a sensor tech startup focused on:\n• Intelligent sensing platforms\n• Mobility solutions\n• Web and mobile development\n• Hardware-software integration\n\nVisit nexlusense.com to learn more!",
    'default': "I'm not sure about that specific topic, but I can help you learn about Bek's skills, projects, experience, education, or contact information. What would you like to know?"
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
}

function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    return botResponses.default;
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