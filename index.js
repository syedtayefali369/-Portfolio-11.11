         // 3D Card interaction enhancement
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.animationPlayState = 'paused';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animationPlayState = 'running';
            });
        });
        // Mobile Navigation Toggle
        document.querySelector('.hamburger').addEventListener('click', function() {
            document.querySelector('.nav-links').classList.toggle('active');
        });

        // Form Submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    document.querySelector('.nav-links').classList.remove('active');
                }
            });
        });

        // Add scroll effect to navbar
        window.addEventListener('scroll', function() {
            const nav = document.querySelector('nav');
            if(window.scrollY > 50) {
                nav.style.background = 'rgba(5, 5, 16, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            } else {
                nav.style.background = 'rgba(5, 5, 16, 0.8)';
            }
        });

        // Remove light mode toggle functionality
        // Only dark mode will be used, so theme toggle is disabled
        document.querySelector('.theme-toggle').style.display = 'none';
    