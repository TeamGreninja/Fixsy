// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotMinimize = document.getElementById('chatbotMinimize');
const chatbotBody = document.getElementById('chatbotBody');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const ctaGetStarted = document.getElementById('ctaGetStarted');
const ctaLearnMore = document.getElementById('ctaLearnMore');
const ctaSubmitProblem = document.getElementById('ctaSubmitProblem');
const featureSearch = document.getElementById('featureSearch');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const loginBackdrop = document.getElementById('loginBackdrop');
const loginClose = document.getElementById('loginClose');
const loginCancel = document.getElementById('loginCancel');
// NOTE: loginForm is declared below with other auth elements to avoid duplicate const
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const loginRemember = document.getElementById('loginRemember');
const userMenu = document.getElementById('userMenu');
const userIconBtn = document.getElementById('userIconBtn');
const userDropdown = document.getElementById('userDropdown');
const userAvatarIcon = document.getElementById('userAvatarIcon');
const userAvatarDropdown = document.getElementById('userAvatarDropdown');
const userNameDropdown = document.getElementById('userNameDropdown');
const userEmailDropdown = document.getElementById('userEmailDropdown');
const dashboardBtn = document.getElementById('dashboardBtn');
const logoutBtnFromMenu = document.getElementById('logoutBtnFromMenu');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const googleLoginBtn = document.getElementById('googleLoginBtn');
const googleRegisterBtn = document.getElementById('googleRegisterBtn');
const registerName = document.getElementById('registerName');
const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const registerConfirmPassword = document.getElementById('registerConfirmPassword');
const registerCancel = document.getElementById('registerCancel');
const dashboardModal = document.getElementById('dashboardModal');
const dashboardBackdrop = document.getElementById('dashboardBackdrop');
const dashboardClose = document.getElementById('dashboardClose');
const totalSubmissions = document.getElementById('totalSubmissions');
const solvedProblems = document.getElementById('solvedProblems');
const pendingProblems = document.getElementById('pendingProblems');
const totalReplies = document.getElementById('totalReplies');
const activityList = document.getElementById('activityList');

let isMinimized = false;

chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
    if (!chatbotContainer.classList.contains('active')) {
        isMinimized = false;
        chatbotContainer.classList.remove('minimized');
    }
});

chatbotMinimize.addEventListener('click', () => {
    isMinimized = !isMinimized;
    chatbotContainer.classList.toggle('minimized');
});

// SolvR AI Responses
let solvrTypingEl = null;
const solvrResponses = {
    greeting: [
        "Hello! I'm SolvR, your AI assistant. How can I help you today?",
        "Hi there! I'm SolvR, ready to help solve your problems. What can I assist you with?",
        "Welcome! I'm SolvR. What problem can I help you solve today?"
    ],
    help: [
        "I'm here to help! You can ask me about:\n• How to use Fixsy\n• Finding solutions to problems\n• Community guidelines\n• Technical support\n• General questions",
        "Sure! I can help you with:\n• Navigating the platform\n• Finding answers\n• Community features\n• Getting started\nWhat would you like to know?",
        "I'd be happy to help! What specific question do you have?"
    ],
    problem: [
        "I understand you're facing a problem. Can you provide more details? The more information you share, the better I can help you find a solution.",
        "That sounds challenging. Let me help you find a solution. Can you describe the problem in more detail?",
        "I'm here to help solve that! Could you explain the issue a bit more so I can assist you better?"
    ],
    thank: [
        "You're welcome! Happy to help. Is there anything else I can assist you with?",
        "Glad I could help! Feel free to ask if you need anything else.",
        "My pleasure! Don't hesitate to reach out if you have more questions."
    ],
    default: [
        "That's interesting! Can you tell me more about that?",
        "I see. How can I help you with that?",
        "Let me think about that. Could you provide a bit more context?",
        "I'm here to help! Could you rephrase that or give me more details?"
    ]
};

function getSolvrResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/(hello|hi|hey)\b/.test(lowerMessage)) {
        return { text: solvrResponses.greeting[Math.floor(Math.random() * solvrResponses.greeting.length)], replies: ['Show issues', 'Login help', 'What can you do?'] };
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do') || lowerMessage.includes('how can you help')) {
        return { text: solvrResponses.help[Math.floor(Math.random() * solvrResponses.help.length)], replies: ['How to use Fixsy', 'Show issues', 'Contact community'] };
    }
    
    if (lowerMessage.includes('problem') || lowerMessage.includes('issue') || lowerMessage.includes('error')) {
        return { text: solvrResponses.problem[Math.floor(Math.random() * solvrResponses.problem.length)], replies: ['Open issues', 'Submit a Problem', 'Talk to community'] };
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
        return { text: solvrResponses.thank[Math.floor(Math.random() * solvrResponses.thank.length)], replies: ['How else can you help?'] };
    }
    
    if (lowerMessage.includes('fixsy')) {
        return { text: "Fixsy is a community-driven platform where people solve problems together. Want features or issues?", replies: ['Features', 'Show issues', 'Community stats'] };
    }
    
    if (lowerMessage.includes('community') || lowerMessage.includes('forum')) {
        return { text: "Our community collaborates to find solutions. You can post, share, and help others.", replies: ['Join community', 'Community stats'] };
    }

    // New intents
    if (lowerMessage.includes('login')) {
        openLoginModal();
        return { text: "I opened the login window. Use your email and password.", replies: ['Forgot password?', 'Remember me?'] };
    }
    if (lowerMessage.includes('issue') || lowerMessage.includes('issues') || lowerMessage.includes('student')) {
        document.getElementById('issues')?.scrollIntoView({ behavior: 'smooth' });
        return { text: "Here are common student issues. Want budget, exam, or time tips?", replies: ['Budget tips', 'Exam anxiety', 'Time management'] };
    }
    if (lowerMessage.includes('theme') || lowerMessage.includes('dark') || lowerMessage.includes('light')) {
        return { text: "Use the moon/sun button to toggle themes. Switch now?", replies: ['Switch theme', 'Keep current'] };
    }
    if (lowerMessage.includes('switch theme')) {
        themeToggle.click();
        return { text: "Theme toggled. Anything else?", replies: ['Show issues', 'Get started'] };
    }
    
    return { text: solvrResponses.default[Math.floor(Math.random() * solvrResponses.default.length)], replies: ['Show issues', 'Open SolvR', 'Get started'] };
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

    // persist chat history
    const history = JSON.parse(localStorage.getItem('solvrHistory') || '[]');
    history.push({ role: isUser ? 'user' : 'bot', content });
    localStorage.setItem('solvrHistory', JSON.stringify(history).slice(0, 50000));
}

function showTyping() {
    if (solvrTypingEl) return;
    solvrTypingEl = document.createElement('div');
    solvrTypingEl.className = 'message bot-message';
    solvrTypingEl.innerHTML = '<div class="message-content"><span class="dots"><span></span><span></span><span></span></span></div>';
    chatbotMessages.appendChild(solvrTypingEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function hideTyping() {
    if (!solvrTypingEl) return;
    solvrTypingEl.remove();
    solvrTypingEl = null;
}

function addQuickReplies(labels) {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexWrap = 'wrap';
    wrap.style.gap = '8px';
    wrap.style.margin = '6px 0 4px';
    labels.forEach(l => {
        const b = document.createElement('button');
        b.textContent = l;
        b.className = 'btn btn-secondary';
        b.style.padding = '6px 12px';
        b.style.borderRadius = '999px';
        b.addEventListener('click', () => {
            addMessage(l, true);
            chatbotInput.value = l;
            sendMessage();
            wrap.remove();
        });
        wrap.appendChild(b);
    });
    const row = document.createElement('div');
    row.className = 'message bot-message';
    const content = document.createElement('div');
    content.className = 'message-content';
    content.appendChild(wrap);
    row.appendChild(content);
    chatbotMessages.appendChild(row);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate typing indicator and response
    showTyping();
    setTimeout(() => {
        hideTyping();
        const response = getSolvrResponse(message);
        if (typeof response === 'string') {
            addMessage(response, false);
        } else {
            addMessage(response.text, false);
            if (response.replies?.length) addQuickReplies(response.replies);
        }
    }, 600);
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Restore chat history
try {
    const history = JSON.parse(localStorage.getItem('solvrHistory') || '[]');
    if (history.length) {
        chatbotContainer.classList.add('active');
        history.forEach(m => addMessage(m.content, m.role === 'user'));
    }
} catch {}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and stat cards
document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// 3D tilt for feature cards
const tiltMax = 12; // degrees
document.querySelectorAll('.feature-card').forEach(card => {
    const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = (x / rect.width) - 0.5;  // -0.5 .. 0.5
        const py = (y / rect.height) - 0.5;
        const rx = (-py * tiltMax).toFixed(2);
        const ry = (px * tiltMax).toFixed(2);
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
        card.classList.add('is-tilting');
    };
    const onLeave = () => {
        card.style.transform = '';
        card.classList.remove('is-tilting');
    };
    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onMove);
    card.addEventListener('mouseleave', onLeave);
});

// Parallax for features section title
const featuresSection = document.getElementById('features');
const featuresTitle = featuresSection?.querySelector('.section-title');
featuresSection?.addEventListener('mousemove', (e) => {
    if (!featuresTitle) return;
    const rect = featuresSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    featuresTitle.style.transform = `translate3d(${x * 10}px, ${y * 6}px, 0)`;
});
featuresSection?.addEventListener('mouseleave', () => {
    if (!featuresTitle) return;
    featuresTitle.style.transform = '';
});

// Feature card quick actions
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.feature-title')?.textContent?.toLowerCase() || '';
        if (title.includes('solvr')) {
            chatbotContainer.classList.add('active');
            chatbotInput.focus();
            return;
        }
        if (title.includes('smart search')) {
            featureSearch?.focus();
            featureSearch?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        if (title.includes('community')) {
            document.getElementById('community')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        if (title.includes('analytics')) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            return;
        }
    });
});

// CTA actions
ctaGetStarted?.addEventListener('click', () => {
    chatbotContainer.classList.add('active');
    chatbotInput.focus();
});

ctaLearnMore?.addEventListener('click', () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
});

// Submit Problem Modal
const submitModal = document.getElementById('submitModal');
const submitBackdrop = document.getElementById('submitBackdrop');
const submitClose = document.getElementById('submitClose');
const submitCancel = document.getElementById('submitCancel');
const submitForm = document.getElementById('submitForm');

function openModal() {
    submitModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.getElementById('problemTitle')?.focus();
}
function closeModal() {
    submitModal?.classList.remove('active');
    document.body.style.overflow = '';
}

ctaSubmitProblem?.addEventListener('click', openModal);
submitBackdrop?.addEventListener('click', closeModal);
submitClose?.addEventListener('click', closeModal);
submitCancel?.addEventListener('click', closeModal);

submitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('problemTitle').value.trim();
    const category = document.getElementById('problemCategory').value.trim();
    const details = document.getElementById('problemDetails').value.trim();
    if (!title || !category || !details) return;

    const savedUserData = localStorage.getItem('fixsyUserData');
    if (!savedUserData) {
        showToast('Please login to submit a problem');
        openLoginModal();
        return;
    }

    const userData = JSON.parse(savedUserData);
    const problem = {
        id: Date.now(),
        title,
        category,
        details,
        status: 'pending',
        userId: userData.email,
        userName: userData.name,
        timestamp: Date.now(),
        replies: 0
    };

    const problems = JSON.parse(localStorage.getItem('fixsyProblems') || '[]');
    problems.unshift(problem);
    localStorage.setItem('fixsyProblems', JSON.stringify(problems));
    
    // Update user's submissions
    const userSubmissions = JSON.parse(localStorage.getItem(`fixsyUserSubmissions_${userData.email}`) || '[]');
    userSubmissions.unshift(problem);
    localStorage.setItem(`fixsyUserSubmissions_${userData.email}`, JSON.stringify(userSubmissions));
    
    showToast('Problem submitted! Our community will help you solve it.');
    submitForm.reset();
    closeModal();
    
    // Refresh dashboard if open
    if (dashboardModal?.classList.contains('active')) {
        updateDashboard();
    }
});

// Toasts
const toastContainer = document.getElementById('toastContainer');
function showToast(text) {
    if (!toastContainer) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = text;
    toastContainer.appendChild(el);
    setTimeout(() => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(-6px)';
        setTimeout(() => el.remove(), 250);
    }, 2500);
}

// Logo animation on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
const logo = document.getElementById('logo');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
    
    // Logo pulse on scroll
    if (Math.abs(currentScroll - lastScroll) > 10) {
        logo.style.transform = 'scale(1.05)';
        setTimeout(() => {
            logo.style.transform = 'scale(1)';
        }, 200);
        lastScroll = currentScroll;
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Animated counters when visible
let countersStarted = false;
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            statNumbers.forEach(el => animateCount(el));
        }
    });
}, { threshold: 0.4 });
statNumbers.forEach(el => statsObserver.observe(el));

function animateCount(el) {
    const to = Number(el.getAttribute('data-count-to') || 0);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();
    const formatter = to >= 1000 ? new Intl.NumberFormat('en', { notation: 'compact' }) : new Intl.NumberFormat('en');
    function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const value = Math.floor(to * progress);
        el.textContent = `${formatter.format(value)}${suffix}`;
        if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
}

// Button hover effects enhancement
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize chatbot with welcome message if not already present
if (chatbotMessages.children.length === 0) {
    addMessage("Hello! I'm SolvR. Need help with login, issues, or getting started?", false);
    addQuickReplies(['Login help', 'Show issues', 'How to use Fixsy']);
}

// Active nav highlighting
const sections = Array.from(document.querySelectorAll('section')).map(s => ({ id: s.id, top: 0 }));
const navLinks = document.querySelectorAll('.nav-link');
function updateSectionTops() {
    sections.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) s.top = el.offsetTop - 120;
    });
}
updateSectionTops();
window.addEventListener('resize', updateSectionTops);
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    let currentId = sections[0]?.id;
    for (const s of sections) {
        if (y >= s.top) currentId = s.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`));
});

// Search filter
featureSearch?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll('.feature-card').forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(q) ? '' : 'none';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== featureSearch) {
        e.preventDefault();
        featureSearch?.focus();
    }
    if (e.key === '?') {
        chatbotContainer.classList.add('active');
        chatbotInput.focus();
    }
    if (e.key.toLowerCase() === 't') {
        themeToggle.click();
    }
    if (e.key.toLowerCase() === 'l' && !loginModal?.classList.contains('active')) {
        openLoginModal();
    }
});

// Make chatbot draggable via header
let drag = { active: false, x: 0, y: 0, startX: 0, startY: 0 };
document.getElementById('chatbotHeader')?.addEventListener('mousedown', (e) => {
    drag.active = true;
    const rect = chatbotContainer.getBoundingClientRect();
    drag.startX = e.clientX; drag.startY = e.clientY;
    drag.x = rect.right - window.innerWidth; // we'll position using right/bottom
    drag.y = window.innerHeight - rect.bottom;
    chatbotContainer.style.transition = 'none';
});
document.addEventListener('mousemove', (e) => {
    if (!drag.active) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;
    const right = Math.max(10, 30 - dx);
    const bottom = Math.max(80, 110 + dy);
    chatbotContainer.style.right = `${right}px`;
    chatbotContainer.style.bottom = `${bottom}px`;
});
document.addEventListener('mouseup', () => {
    if (!drag.active) return;
    drag.active = false;
    chatbotContainer.style.transition = '';
});

// Login modal logic
function openLoginModal() {
    loginModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => loginEmail?.focus(), 50);
}
function closeLoginModal() {
    loginModal?.classList.remove('active');
    document.body.style.overflow = '';
}

loginBtn?.addEventListener('click', openLoginModal);
loginBackdrop?.addEventListener('click', closeLoginModal);
loginClose?.addEventListener('click', closeLoginModal);
loginCancel?.addEventListener('click', closeLoginModal);

function setUser(userData) {
    if (!userData || !userData.name) { unsetUser(); return; }
    const { name, email } = userData;
    userMenu.hidden = false;
    loginBtn.hidden = true;
    userAvatarIcon.textContent = name.charAt(0).toUpperCase();
    userAvatarDropdown.textContent = name.charAt(0).toUpperCase();
    userNameDropdown.textContent = name;
    userEmailDropdown.textContent = email || 'user@example.com';
    userMenu.classList.remove('active');
}

function unsetUser() {
    userMenu.hidden = true;
    loginBtn.hidden = false;
    userMenu.classList.remove('active');
}

// User menu toggle
userIconBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    userMenu.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!userMenu.contains(e.target)) {
        userMenu.classList.remove('active');
    }
});

// Restore user session
const savedUserData = localStorage.getItem('fixsyUserData');
if (savedUserData) {
    try {
        const userData = JSON.parse(savedUserData);
        setUser(userData);
    } catch (e) {
        localStorage.removeItem('fixsyUserData');
    }
}

logoutBtnFromMenu?.addEventListener('click', () => {
    localStorage.removeItem('fixsyUserData');
    unsetUser();
    showToast('Logged out successfully');
});

// Auth tabs toggle
loginTab?.addEventListener('click', () => {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.add('active');
    registerForm.classList.remove('active');
    document.getElementById('loginTitle').textContent = 'Welcome back';
});

registerTab?.addEventListener('click', () => {
    registerTab.classList.add('active');
    loginTab.classList.remove('active');
    registerForm.classList.add('active');
    loginForm.classList.remove('active');
    document.getElementById('loginTitle').textContent = 'Create account';
});

// Login form
loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginEmail.value.trim();
    const pass = loginPassword.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email');
        loginEmail.focus();
        return;
    }
    if (pass.length < 6) {
        showToast('Password should be at least 6 characters');
        loginPassword.focus();
        return;
    }
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('fixsyUsers') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user || user.password !== pass) {
        showToast('Invalid email or password');
        return;
    }
    
    const userData = { name: user.name, email: user.email };
    if (loginRemember?.checked) {
        localStorage.setItem('fixsyUserData', JSON.stringify(userData));
    }
    setUser(userData);
    closeLoginModal();
    showToast(`Welcome back, ${user.name}!`);
});

// Register form
registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = registerName.value.trim();
    const email = registerEmail.value.trim();
    const pass = registerPassword.value;
    const confirmPass = registerConfirmPassword.value;
    
    if (name.length < 2) {
        showToast('Name should be at least 2 characters');
        registerName.focus();
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email');
        registerEmail.focus();
        return;
    }
    if (pass.length < 6) {
        showToast('Password should be at least 6 characters');
        registerPassword.focus();
        return;
    }
    if (pass !== confirmPass) {
        showToast('Passwords do not match');
        registerConfirmPassword.focus();
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('fixsyUsers') || '[]');
    if (users.find(u => u.email === email)) {
        showToast('Email already registered. Please login.');
        loginTab.click();
        loginEmail.value = email;
        return;
    }
    
    // Save user
    users.push({ name, email, password: pass });
    localStorage.setItem('fixsyUsers', JSON.stringify(users));
    
    const userData = { name, email };
    localStorage.setItem('fixsyUserData', JSON.stringify(userData));
    setUser(userData);
    closeLoginModal();
    showToast(`Welcome, ${name}!`);
    registerForm.reset();
});

registerCancel?.addEventListener('click', closeLoginModal);

// Google login/register (simulated)
function handleGoogleAuth(isRegister = false) {
    // Simulate Google OAuth
    const mockGoogleUser = {
        name: 'Google User',
        email: `googleuser${Date.now()}@gmail.com`
    };
    
    const userData = { name: mockGoogleUser.name, email: mockGoogleUser.email };
    localStorage.setItem('fixsyUserData', JSON.stringify(userData));
    
    // Save to users if registering
    if (isRegister) {
        const users = JSON.parse(localStorage.getItem('fixsyUsers') || '[]');
        if (!users.find(u => u.email === mockGoogleUser.email)) {
            users.push({ name: mockGoogleUser.name, email: mockGoogleUser.email, password: 'google_oauth' });
            localStorage.setItem('fixsyUsers', JSON.stringify(users));
        }
    }
    
    setUser(userData);
    closeLoginModal();
    showToast(`Welcome, ${mockGoogleUser.name}!`);
}

googleLoginBtn?.addEventListener('click', () => handleGoogleAuth(false));
googleRegisterBtn?.addEventListener('click', () => handleGoogleAuth(true));

// Footer link interactions
document.getElementById('footerSubmitProblem')?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

document.getElementById('footerSolvR')?.addEventListener('click', (e) => {
    e.preventDefault();
    chatbotContainer.classList.add('active');
    chatbotInput.focus();
});

// Dashboard functionality
function openDashboard() {
    const savedUserData = localStorage.getItem('fixsyUserData');
    if (!savedUserData) {
        showToast('Please login to view dashboard');
        openLoginModal();
        return;
    }
    dashboardModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateDashboard();
}

function closeDashboard() {
    dashboardModal.classList.remove('active');
    document.body.style.overflow = '';
}

function updateDashboard() {
    const savedUserData = localStorage.getItem('fixsyUserData');
    if (!savedUserData) return;
    
    const userData = JSON.parse(savedUserData);
    const userSubmissions = JSON.parse(localStorage.getItem(`fixsyUserSubmissions_${userData.email}`) || '[]');
    
    const total = userSubmissions.length;
    const solved = userSubmissions.filter(p => p.status === 'solved').length;
    const pending = userSubmissions.filter(p => p.status === 'pending').length;
    const replies = userSubmissions.reduce((sum, p) => sum + (p.replies || 0), 0);
    
    totalSubmissions.textContent = total;
    solvedProblems.textContent = solved;
    pendingProblems.textContent = pending;
    totalReplies.textContent = replies;
    
    // Update activity list
    activityList.innerHTML = '';
    if (userSubmissions.length === 0) {
        activityList.innerHTML = '<div class="activity-empty">No submissions yet. Submit your first problem to get started!</div>';
    } else {
        userSubmissions.slice(0, 10).forEach(problem => {
            const item = document.createElement('div');
            item.className = 'activity-item';
            const date = new Date(problem.timestamp);
            item.innerHTML = `
                <div class="activity-header">
                    <div class="activity-title">${problem.title}</div>
                    <span class="activity-status ${problem.status}">${problem.status.charAt(0).toUpperCase() + problem.status.slice(1)}</span>
                </div>
                <div class="activity-meta">
                    <span>Category: ${problem.category}</span>
                    <span>•</span>
                    <span>${date.toLocaleDateString()}</span>
                    ${problem.replies > 0 ? `<span>•</span><span>${problem.replies} replies</span>` : ''}
                </div>
            `;
            activityList.appendChild(item);
        });
    }
}

dashboardBtn?.addEventListener('click', openDashboard);
dashboardBackdrop?.addEventListener('click', closeDashboard);
dashboardClose?.addEventListener('click', closeDashboard);

