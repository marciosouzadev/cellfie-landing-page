// Menu Mobile Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navMenu.classList.remove('active');
    }
});

// Smooth scroll para botões
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Se o botão tem um href específico
        const href = button.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Botão "Ver Produtos" no hero
document.querySelector('.hero .btn-primary').addEventListener('click', () => {
    document.querySelector('#produtos').scrollIntoView({ behavior: 'smooth' });
});

// Botão "Começar Compras" na CTA
document.querySelector('.cta .btn-primary').addEventListener('click', () => {
    document.querySelector('#produtos').scrollIntoView({ behavior: 'smooth' });
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.produto-card, .feature-item, .depoimento-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Analytics simples - rastrear cliques
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', () => {
        console.log('Clicou em:', element.textContent.trim());
    });
});

// Validação de email simples
const emailInput = document.querySelector('input[type="email"]');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value;
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (email && !isValid) {
            emailInput.style.borderColor = '#ff006e';
        } else {
            emailInput.style.borderColor = '#28a745';
        }
    });
}
