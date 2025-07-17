document.addEventListener('DOMContentLoaded', function() {
            // Mobile Menu Toggle
            const menuToggle = document.querySelector('.menu-toggle');
            const nav = document.querySelector('nav');
            
            if (menuToggle && nav) {
                menuToggle.addEventListener('click', function() {
                    const isExpanded = nav.classList.toggle('active');
                    this.setAttribute('aria-expanded', isExpanded);
                    document.body.style.overflow = isExpanded ? 'hidden' : '';
                });
                
                // Close menu when clicking links
                document.querySelectorAll('nav a').forEach(link => {
                    link.addEventListener('click', function() {
                        if (window.innerWidth <= 768) {
                            nav.classList.remove('active');
                            menuToggle.setAttribute('aria-expanded', 'false');
                            document.body.style.overflow = '';
                        }
                    });
                });
            }
            
            // Smooth Scrolling
            function smoothScroll(target) {
                const element = document.querySelector(target);
                if (!element) return;
                
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: elementPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    if (this.hash && this.hash !== '#') {
                        e.preventDefault();
                        smoothScroll(this.hash);
                    }
                });
            });
            
            // Active Section Highlighting
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            const headerHeight = document.querySelector('header').offsetHeight || 80;
            
            function highlightActiveSection() {
                const scrollPosition = window.scrollY + headerHeight;
                let currentSection = '';
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.toggle('active', 
                        link.getAttribute('href') === `#${currentSection}`
                    );
                });
            }
            
            // Use IntersectionObserver if available
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const id = entry.target.getAttribute('id');
                            navLinks.forEach(link => {
                                link.classList.toggle('active', 
                                    link.getAttribute('href') === `#${id}`
                                );
                            });
                        }
                    });
                }, {
                    rootMargin: `-${headerHeight}px 0px 0px 0px`,
                    threshold: 0.1
                });
                
                sections.forEach(section => observer.observe(section));
            } else {
                // Fallback to scroll event
                window.addEventListener('scroll', highlightActiveSection);
            }
            
            // Initial highlight
            highlightActiveSection();
        });