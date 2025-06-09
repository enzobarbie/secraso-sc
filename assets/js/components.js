// ===== HEADER FUNCTIONALITY =====

class HeaderManager {
    constructor() {
        this.header = null;
        this.mobileToggle = null;
        this.navMenu = null;
        this.navOverlay = null;
        this.dropdowns = [];
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        // Aguardar carregamento do header
        document.addEventListener('DOMContentLoaded', () => {
            this.loadHeader().then(() => {
                this.setupElements();
                this.bindEvents();
                this.setActivePage();
            });
        });
    }
    
    async loadHeader() {
        try {
            const response = await fetch('components/header.html');
            const html = await response.text();
            document.getElementById('header-placeholder').innerHTML = html;
        } catch (error) {
            console.error('Erro ao carregar header:', error);
        }
    }
    
    setupElements() {
        this.header = document.querySelector('.main-header');
        this.mobileToggle = document.getElementById('mobileMenuToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navOverlay = document.getElementById('navOverlay');
        this.dropdowns = document.querySelectorAll('.dropdown');
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }
        
        // Overlay click
        if (this.navOverlay) {
            this.navOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        
        // Dropdown functionality para mobile
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        this.toggleDropdown(dropdown);
                    }
                });
            }
        });
        
        // Scroll effect no header
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
        
        // Fechar menu ao redimensionar
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });
        
        // Fechar dropdown ao clicar fora
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.dropdown')) {
                this.closeAllDropdowns();
            }
        });
        
        // Navegação por teclado
        this.setupKeyboardNavigation();
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        this.mobileToggle.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        this.navOverlay.classList.toggle('active');
        
        // Prevenir scroll do body
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        
        // Atualizar aria-expanded
        this.mobileToggle.setAttribute('aria-expanded', this.isMenuOpen);
        
        // Focus management
        if (this.isMenuOpen) {
            this.navMenu.querySelector('.nav-link').focus();
        } else {
            this.mobileToggle.focus();
        }
    }
    
    closeMobileMenu() {
        this.isMenuOpen = false;
        
        this.mobileToggle.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.navOverlay.classList.remove('active');
        
        document.body.style.overflow = '';
        this.mobileToggle.setAttribute('aria-expanded', 'false');
        
        // Fechar todos os dropdowns
        this.closeAllDropdowns();
    }
    
    toggleDropdown(dropdown) {
        const isActive = dropdown.classList.contains('active');
        
        // Fechar outros dropdowns
        this.closeAllDropdowns();
        
        // Toggle atual
        if (!isActive) {
            dropdown.classList.add('active');
            dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'true');
        }
    }
    
    closeAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        });
    }
    
    handleScroll() {
        if (window.scrollY > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
    
    setActivePage() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            link.classList.remove('active');
            
            if (
                (page === 'home' && (currentPath === '/' || currentPath.includes('index'))) ||
                (page !== 'home' && currentPath.includes(page))
            ) {
                link.classList.add('active');
            }
        });
    }
    
    setupKeyboardNavigation() {
        // Navegação por Tab e Enter/Space
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
            
            // Enter ou Space nos dropdowns
            if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('dropdown-toggle')) {
                e.preventDefault();
                if (window.innerWidth <= 768) {
                    this.toggleDropdown(e.target.closest('.dropdown'));
                }
            }
        });
    }
}

// Inicializar o gerenciador do header
const headerManager = new HeaderManager();

// Exportar para uso global se necessário
window.HeaderManager = HeaderManager;


// ===== FOOTER FUNCTIONALITY =====

class FooterManager {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.loadFooter().then(() => {
                this.setCurrentYear();
                this.setupSmoothScrolling();
            });
        });
    }
    
    async loadFooter() {
        try {
            const response = await fetch('components/footer.html');
            const html = await response.text();
            document.getElementById('footer-placeholder').innerHTML = html;
        } catch (error) {
            console.error('Erro ao carregar footer:', error);
        }
    }
    
    setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }
    
    setupSmoothScrolling() {
        // Scroll suave para links internos
        const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Atualizar o HeaderManager para incluir FooterManager
document.addEventListener('DOMContentLoaded', () => {
    // Carregar componentes
    Promise.all([
        loadComponent('header-placeholder', 'components/header.html'),
        loadComponent('footer-placeholder', 'components/footer.html')
    ]).then(() => {
        // Inicializar funcionalidades
        new HeaderManager();
        new FooterManager();
    });
});

// Função helper para carregar componentes
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Erro ao carregar ${componentPath}:`, error);
    }
}