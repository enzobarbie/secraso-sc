// ===== MAIN PAGE FUNCTIONALITY ===== 

class MainPageManager {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupAnimations();
            this.setupActionCards();
            this.setupStatsCounter();
            this.setupScrollEffects();
        });
    }
    
    // Configurar animações de entrada
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Adicionar delay progressivo para cards
                    if (entry.target.classList.contains('action-card')) {
                        const cards = document.querySelectorAll('.action-card');
                        const index = Array.from(cards).indexOf(entry.target);
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observar elementos para animação
        const animateElements = document.querySelectorAll('.action-card, .stat-item, .hero-logo');
        animateElements.forEach(el => observer.observe(el));
    }
    
    // Configurar interações dos cards de ação
    setupActionCards() {
        const actionCards = document.querySelectorAll('.action-card');
        
        actionCards.forEach((card, index) => {
            // Efeito de hover aprimorado
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
                
                // Efeito paralax sutil na imagem
                const image = card.querySelector('.action-image');
                if (image) {
                    image.style.transform = 'scale(1.1) translateY(-5px)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
                
                // Resetar imagem
                const image = card.querySelector('.action-image');
                if (image) {
                    image.style.transform = 'scale(1) translateY(0)';
                }
            });
            
            // Efeito de clique com feedback visual
            card.addEventListener('mousedown', () => {
                card.style.transform = 'translateY(-8px) scale(0.98)';
                card.style.transition = 'all 0.1s ease';
            });
            
            card.addEventListener('mouseup', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'all 0.3s ease';
            });
            
            // Tracking de cliques e analytics
            const link = card.querySelector('.action-link');
            if (link) {
                link.addEventListener('click', (e) => {
                    const cardTitle = card.querySelector('.action-title').textContent;
                    this.trackCardClick(cardTitle, index);
                    
                    // Efeito visual de clique
                    this.showClickFeedback(card);
                });
            }
            
            // Efeito de foco para acessibilidade
            card.addEventListener('focus', () => {
                card.style.outline = '3px solid rgba(0, 0, 135, 0.3)';
                card.style.outlineOffset = '2px';
            });
            
            card.addEventListener('blur', () => {
                card.style.outline = 'none';
            });
        });
    }
    
    // Animar hover do card
    animateCardHover(card, isHovering) {
        if (isHovering) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 50px rgba(0, 0, 135, 0.15)';
            
            // Animar features
            const features = card.querySelectorAll('.feature-item');
            features.forEach((feature, i) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(5px)';
                    feature.style.color = '#000087';
                }, i * 50);
            });
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.08)';
            
            // Resetar features
            const features = card.querySelectorAll('.feature-item');
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
                feature.style.color = '#666';
            });
        }
    }
    
    // Feedback visual de clique
    showClickFeedback(card) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(0, 0, 135, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;
        
        // Adicionar keyframes se não existir
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes rippleEffect {
                    to {
                        width: 200px;
                        height: 200px;
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        card.style.position = 'relative';
        card.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
    
    // Contador animado para estatísticas
    setupStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const animateCounter = (element, target, suffix = '+') => {
            const duration = 2000; // 2 segundos
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Formatação baseada no valor
                if (suffix === '%') {
                    element.textContent = Math.floor(current) + '%';
                } else if (target >= 1000) {
                    element.textContent = Math.floor(current) + '+';
                } else {
                    element.textContent = Math.floor(current) + suffix;
                }
            }, 16);
        };
        
        // Observer para iniciar contador quando visível
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    
                    // Determinar sufixo baseado no conteúdo original
                    let suffix = '+';
                    if (text.includes('%')) suffix = '%';
                    
                    // Adicionar efeito de pulsação durante a contagem
                    entry.target.style.animation = 'pulse 0.5s ease-in-out infinite alternate';
                    
                    animateCounter(entry.target, number, suffix);
                    
                    // Remover pulsação após contagem
                    setTimeout(() => {
                        entry.target.style.animation = 'none';
                    }, 2000);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => counterObserver.observe(stat));
    }
    
    // Configurar efeitos de scroll
    setupScrollEffects() {
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            // Parallax no hero
            const heroSection = document.querySelector('.hero-section');
            if (heroSection) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
            
            // Fade do logo baseado no scroll
            const heroLogo = document.querySelector('.hero-logo');
            if (heroLogo) {
                const opacity = Math.max(0, 1 - (scrolled / 500));
                heroLogo.style.opacity = opacity;
            }
            
            ticking = false;
        };
        
        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }
    
    // Tracking de cliques (para analytics)
    trackCardClick(cardTitle, index) {
        console.log(`Clique no card: ${cardTitle} (posição: ${index + 1})`);
        
        // Google Analytics (descomente se usar)
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'click', {
        //         event_category: 'Action Cards',
        //         event_label: cardTitle,
        //         event_value: index + 1
        //     });
        // }
        
        // Facebook Pixel (descomente se usar)
        // if (typeof fbq !== 'undefined') {
        //     fbq('track', 'Lead', {
        //         content_name: cardTitle,
        //         content_category: 'Action Cards'
        //     });
        // }
    }
}

// Função para smooth scroll (caso tenha links internos)
function smoothScroll(target, offset = 0) {
    const element = document.querySelector(target);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para lazy loading de imagens (caso necessário)
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Força o carregamento
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Função para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= 768;
}

// Função para otimizar performance em mobile
function optimizeForMobile() {
    if (isMobile()) {
        // Reduzir animações em mobile
        document.body.classList.add('mobile-optimized');
        
        // Desabilitar parallax em mobile
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = 'none';
        }
    }
}

// Inicializar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar gerenciador principal
    new MainPageManager();
    
    // Configurações adicionais
    setupLazyLoading();
    optimizeForMobile();
    
    // Adicionar classe após carregamento para animações iniciais
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Adicionar estilos CSS para pulse animation
    if (!document.querySelector('#pulse-styles')) {
        const style = document.createElement('style');
        style.id = 'pulse-styles';
        style.textContent = `
            @keyframes pulse {
                from { transform: scale(1); }
                to { transform: scale(1.05); }
            }
            
            .mobile-optimized * {
                animation-duration: 0.3s !important;
                transition-duration: 0.3s !important;
            }
            
            .loaded .action-card {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
});

// Listener para redimensionamento da janela
window.addEventListener('resize', () => {
    optimizeForMobile();
}, { passive: true });

// Prevenir comportamentos indesejados
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Melhorar acessibilidade com teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('action-card')) {
            const link = focused.querySelector('.action-link');
            if (link) {
                link.click();
            }
        }
    }
});