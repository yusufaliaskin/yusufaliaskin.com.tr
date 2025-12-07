document.addEventListener('DOMContentLoaded', () => {

    // Loader
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000); // 3 saniye bekle
        });

        // Failsafe: Yükleme çok uzun sürerse 5 saniye sonra kapat
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 3000);
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');

                // Active link handling
                navLinks.forEach(nav => nav.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000;

    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }

    if (slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    // Testimonial / Principles Slider
    const tSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentTSlide = 0;

    function showTSlide(index) {
        if (tSlides.length > 0) {
            tSlides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            tSlides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
            currentTSlide = index;
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTSlide(index);
        });
    });

    // Auto slide testimonials
    if (tSlides.length > 0) {
        setInterval(() => {
            let next = (currentTSlide + 1) % tSlides.length;
            showTSlide(next);
        }, 6000);
    }

    // Form Validation
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            const inputs = this.querySelectorAll('input, textarea');

            inputs.forEach(input => {
                const formGroup = input.parentElement;
                if (!input.checkValidity()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            });

            if (isValid) {
                // Form verilerini al
                const nameInp = document.getElementById('name');
                const emailInp = document.getElementById('email');
                const messageInp = document.getElementById('message');

                const name = nameInp ? nameInp.value : '';
                const email = emailInp ? emailInp.value : '';
                const message = messageInp ? messageInp.value : '';

                // Hedef mail adresi
                const targetEmail = "yusufaliaskin@gmail.com";

                // Konu ve İçerik oluştur
                const subject = `İletişim: ${name}`;
                const body = `Ad Soyad: ${name}%0D%0AE-posta: ${email}%0D%0A%0D%0AMesaj:%0D%0A${message}`;

                // Mailto linkini aç
                window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

                // Formu temizle
                this.reset();
            }
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.service-card, .room-card, .gallery-item, .about-text');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for reveal elements
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);

    // WhatsApp Widget Logic
    const whatsappIconBtn = document.getElementById('whatsappIconBtn');
    const whatsappChatBox = document.getElementById('whatsappChatBox');
    const whatsappClose = document.getElementById('whatsappClose');
    const whatsappStartBtn = document.getElementById('whatsappStartBtn');

    if (whatsappIconBtn && whatsappChatBox) {
        // Toggle Chat Box
        whatsappIconBtn.addEventListener('click', () => {
            whatsappChatBox.classList.toggle('active');
        });

        // Close Chat Box
        if (whatsappClose) {
            whatsappClose.addEventListener('click', () => {
                whatsappChatBox.classList.remove('active');
            });
        }

        // Redirect to WhatsApp
        if (whatsappStartBtn) {
            whatsappStartBtn.addEventListener('click', () => {
                // Telefon numarası ve mesaj
                const phoneNumber = "905370248528"; // Kendi numaranızı buraya yazın (90...)
                const message = "Merhaba, web siteniz üzerinden ulaşıyorum.";

                // WhatsApp URL'si oluştur
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

                // Yeni sekmede aç
                window.open(whatsappUrl, '_blank');
            });
        }
    }
});
