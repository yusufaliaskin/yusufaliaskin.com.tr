// DOM Elements
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Function to set theme
const setTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Update Icon
    if (theme === 'dark') {
        themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
};

// Check for saved theme preference or system preference
const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Initialize Theme
const currentTheme = getPreferredTheme();
setTheme(currentTheme);

// Toggle Event Listener
themeToggleBtn.addEventListener('click', () => {
    const current = htmlElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Mobile Menu (Simple Implementation for now)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Icon toggle
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    lucide.createIcons();
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Observe all elements with .animate-on-scroll class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Auto-Scroller for Projects and Skills
const scrollers = document.querySelectorAll('.scroller-container');

scrollers.forEach(scroller => {
    let isPaused = false;
    const speed = 1; // Pixels per frame

    const autoScroll = () => {
        if (!isPaused) {
            // Check if we reached the end
            if (scroller.scrollLeft + scroller.clientWidth >= scroller.scrollWidth - 1) {
                scroller.scrollLeft = 0; // Loop back to start
            } else {
                scroller.scrollLeft += speed;
            }
        }
        requestAnimationFrame(autoScroll);
    };

    // Pause on hover/touch
    scroller.addEventListener('mouseenter', () => isPaused = true);
    scroller.addEventListener('mouseleave', () => isPaused = false);
    scroller.addEventListener('touchstart', () => isPaused = true);
    scroller.addEventListener('touchend', () => isPaused = false);

    // Initial delay before starting
    setTimeout(() => {
        autoScroll();
    }, 2000);
});




// Translations
const translations = {
    tr: {
        nav: {
            home: "Ana Sayfa",
            about: "Hakkımda",
            skills: "Uzmanlıklar",
            projects: "Projeler",
            goals: "Hedefler",
            contact: "İletişim"
        },
        hero: {
            greeting: "Merhaba, ben Yusuf Ali Aşkın 👋",
            title: 'Yazılım, Siber Güvenlik ve <br> <span class="gradient-text">Ağ Sistemleri Uzmanı</span>',
            desc: "Yaklaşık 5 yıldır aktif olarak IT, yazılım geliştirme, ağ güvenliği ve otomasyon sistemleri üzerine çalışıyorum. Analitik düşünen, çözüm odaklı ve sürekli gelişen bir profesyonelim.",
            btn_projects: "Projelerimi İncele",
            btn_contact: "Benimle Tanış"
        },
        about: {
            title: "Kim Olduğum",
            subtitle: "Kariyerim ve profesyonel yaklaşımım hakkında detaylar.",
            p1: "Ben Yusuf Ali Aşkın. Yazılım, siber güvenlik ve ağ sistemleri alanlarında uzmanlaşmış bir geliştirici ve sistem uzmanıyım. Kendimi sürekli geliştiren, yeni teknolojilere hızla adapte olan, analitik düşünebilen ve çözüm odaklı çalışan bir profesyonelim.",
            p2: "Kariyerim boyunca hem bireysel hem de profesyonel projelerde frontend, backend, ağ güvenliği, otomasyon, yapay zeka ve sistem yönetimi alanlarında aktif görev aldım."
        },
        skills: {
            title: "Uzmanlık Alanlarım",
            subtitle: "Teknoloji, güvenlik ve sistem yönetimi konusundaki yetkinliklerim.",
            card1_title: "Yazılım & Web Geliştirme",
            card1_desc: "Modern web teknolojileri ve güçlü backend dilleri ile ölçeklenebilir, güvenli ve hızlı uygulamalar geliştiriyorum. Hem arayüz hem de sunucu tarafında tam hakimiyet.",
            card2_title: "Siber Güvenlik",
            card2_desc: "Sistem zafiyetlerini tespit etme, sızma testleri (pentest), güvenli kod geliştirme ve saldırı önleme sistemleri üzerine ileri düzey çalışmalar.",
            card3_title: "Sistem & Ağ Yönetimi",
            card3_desc: "Ağ altyapılarını yönetme, trafiği analiz etme, firewall yapılandırması ve cihaz yönetimi konularında profesyonel çözümler.",
            card4_title: "Yapay Zeka & Otomasyon",
            card4_desc: "İş süreçlerini otomatize eden botlar, veri toplayan algoritmalar ve yapay zeka destekli analiz araçları geliştirme."
        },
        projects: {
            title: "Geliştirdiğim Proje Türleri",
            subtitle: "Aktif olarak rol aldığım ve geliştirdiğim proje çeşitleri.",
            card1_cat: "Yapay Zeka & Finans",
            card1_title: "Akıllı Sistemler",
            card1_desc: "• Yapay zeka sohbet uygulamaları<br>• Borsa analiz ve tahmin botları<br>• Otomatik veri toplama sistemleri",
            card2_cat: "Ağ & Güvenlik",
            card2_title: "Network Altyapıları",
            card2_desc: "• Ağ tarama ve analiz yazılımları<br>• Modem yönetim panelleri<br>• Cihaz takip sistemleri<br>• Network yönetim yazılımları",
            card3_cat: "Web Uygulamaları",
            card3_title: "Kurumsal & E-Ticaret",
            card3_desc: "• VPN tarzı kurumsal siteler<br>• Siber güvenlik dashboardları<br>• Dropshipping & e-ticaret altyapıları<br>• Kendi arama motoru altyapısı"
        },
        goals: {
            title: "Hedefler & Çalışma Stili",
            subtitle: "Profesyonel vizyonum ve çalışma prensiplerim.",
            card_title: "🎯 Hedeflerim",
            list1: "Yazılım ve siber güvenlik alanında uluslararası seviyede projelere imza atmak",
            list2: "Kendi yazılım markamı ve dijital güvenlik sistemlerimi geliştirmek",
            list3: "Freelance ve kurumsal projeler almak",
            list4: "Yapay zeka destekli güvenlik yazılımları üretmek",
            list5: "Otomasyon ve savunma sistemleri geliştirmek",
            list6: "Kendi ürünlerimi yurt dışına satmak"
        },
        work: {
            card_title: "⚙️ Çalışma Stilim",
            list1: "✅ Analitik düşünürüm ve hızlı öğrenirim",
            list2: "✅ Sorumluluk sahibiyim ve detaylara önem veririm",
            list3: "✅ Takım çalışmasına uygunum",
            list4: "✅ Tek başıma büyük projeler geliştirebilirim",
            list5: "✅ Problem çözme yeteneğim çok yüksektir",
            list6: "✅ Yeni sistemleri kısa sürede kavrayabilirim"
        },
        unique: {
            title: "Beni Diğerlerinden Ayıran Özellikler",
            card1_title: "Full Stack + Güvenlik",
            card1_desc: "Hem yazılım, hem ağ hem de siber güvenlik bilgisine aynı anda sahibim.",
            card2_title: "Güvenli Altyapı",
            card2_desc: "Sadece site yazmıyorum, altyapısını da siber saldırılara karşı güvenli kuruyorum.",
            card3_title: "Hibrit Yetenek",
            card3_desc: "Yapay zeka, güvenlik ve otomasyonu birlikte kullanarak modern çözümler üretiyorum."
        },
        contact: {
            title: "BANA ULAŞIN",
            info_email: "E-posta",
            info_github: "GitHub",
            info_linkedin: "LinkedIn",
            placeholder_name: "Adınız Soyadınız",
            placeholder_email: "E-posta Adresiniz",
            placeholder_msg: "Proje detayları veya mesajınız...",
            btn_send: "MESAJ GÖNDER"
        },
        footer: {
            branding: "Yusuf Ali Aşkın",
            desc: "Modern, güvenli ve ölçeklenebilir dijital çözümler. Yazılım, siber güvenlik ve ağ sistemleri uzmanlığı.",
            quick_links: "Hızlı Linkler",
            follow_us: "Bizi Takip Edin",
            copyright: "© 2025 Tüm hakları saklıdır."
        }
    },
    en: {
        nav: {
            home: "Home",
            about: "About Me",
            skills: "Skills",
            projects: "Projects",
            goals: "Goals",
            contact: "Contact"
        },
        hero: {
            greeting: "Hello, I'm Yusuf Ali Aşkın 👋",
            title: 'Software, Cyber Security and <br> <span class="gradient-text">Network Systems Expert</span>',
            desc: "I have been actively working on IT, software development, network security, and automation systems for about 5 years. I am an analytical thinker, solution-oriented, and constantly evolving professional.",
            btn_projects: "View My Projects",
            btn_contact: "Meet Me"
        },
        about: {
            title: "Who I Am",
            subtitle: "Details about my career and professional approach.",
            p1: "I am Yusuf Ali Aşkın. I am a developer and system expert specializing in software, cyber security, and network systems. I adapt quickly to new technologies, think analytically, and focus on solutions.",
            p2: "Throughout my career, I have taken active roles in frontend, backend, network security, automation, AI, and system management in both individual and professional projects."
        },
        skills: {
            title: "My Expertise",
            subtitle: "Competencies in technology, security, and system management.",
            card1_title: "Software & Web Development",
            card1_desc: "I develop scalable, secure, and fast applications using modern web technologies and powerful backend languages. Full mastery of both interface and server side.",
            card2_title: "Cyber Security",
            card2_desc: "Advanced work on detecting system vulnerabilities, penetration testing (pentest), secure code development, and intrusion prevention systems.",
            card3_title: "System & Network Management",
            card3_desc: "Professional solutions for managing network infrastructures, analyzing traffic, firewall configuration, and device management.",
            card4_title: "AI & Automation",
            card4_desc: "Developing bots that automate business processes, data collection algorithms, and AI-supported analysis tools."
        },
        projects: {
            title: "Project Types",
            subtitle: "Types of projects I actively develop and contribute to.",
            card1_cat: "AI & Finance",
            card1_title: "Intelligent Systems",
            card1_desc: "• AI chat applications<br>• Stock market analysis and prediction bots<br>• Automated data collection systems",
            card2_cat: "Network & Security",
            card2_title: "Network Infrastructures",
            card2_desc: "• Network scanning and analysis software<br>• Modem management panels<br>• Device tracking systems<br>• Network management software",
            card3_cat: "Web Applications",
            card3_title: "Corporate & E-Commerce",
            card3_desc: "• VPN-style corporate sites<br>• Cyber security dashboards<br>• Dropshipping & e-commerce infrastructures<br>• Custom search engine infrastructure"
        },
        goals: {
            title: "Goals & Work Style",
            subtitle: "My professional vision and working principles.",
            card_title: "🎯 My Goals",
            list1: "Undertake international projects in software and cyber security",
            list2: "Develop my own software brand and digital security systems",
            list3: "Take on freelance and corporate projects",
            list4: "Produce AI-supported security software",
            list5: "Develop automation and defense systems",
            list6: "Sell my own products internationally"
        },
        work: {
            card_title: "⚙️ Work Style",
            list1: "✅ I think analytically and learn quickly",
            list2: "✅ I am responsible and pay attention to details",
            list3: "✅ I am suitable for teamwork",
            list4: "✅ I can develop large projects alone",
            list5: "✅ My problem-solving ability is very high",
            list6: "✅ I can grasp new systems in a short time"
        },
        unique: {
            title: "What Sets Me Apart",
            card1_title: "Full Stack + Security",
            card1_desc: "I possess software, network, and cyber security knowledge simultaneously.",
            card2_title: "Secure Infrastructure",
            card2_desc: "I don't just write sites; I build their infrastructure securely against cyber attacks.",
            card3_title: "Hybrid Capability",
            card3_desc: "I produce modern solutions by using AI, security, and automation together."
        },
        contact: {
            title: "CONTACT ME",
            info_email: "E-mail",
            info_github: "GitHub",
            info_linkedin: "LinkedIn",
            placeholder_name: "Your Name",
            placeholder_email: "Your Email Address",
            placeholder_msg: "Project details or your message...",
            btn_send: "SEND MESSAGE"
        },
        footer: {
            branding: "Yusuf Ali Aşkın",
            desc: "Modern, secure, and scalable digital solutions. Expertise in software, cyber security, and network systems.",
            quick_links: "Quick Links",
            follow_us: "Follow Us",
            copyright: "© 2025 All rights reserved."
        }
    }
};

// Language Toggle Logic
const langToggleBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'tr';

const updateLanguage = (lang) => {
    // Update button text -> Show the ONE you will switch TO, or the CURRENT one?
    // User asked "TR/EN". Usually showing the current one is standard, or a flag.
    // Let's show the CURRENT language code.
    langToggleBtn.textContent = lang.toUpperCase();

    // Update all text elements
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const keys = key.split('.');
        let value = translations[lang];
        keys.forEach(k => {
            if (value) value = value[k];
        });

        if (value) {
            if (key === 'hero.title') {
                // Special handling for Hero Title Typewriter
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = value;
                const staticPart = tempDiv.childNodes[0].textContent; // "Yazılım, ..."
                const spanPart = tempDiv.querySelector('.gradient-text').textContent; // "Ağ Sistemleri..."

                element.innerHTML = `${staticPart} <br> <span class="gradient-text"></span>`;
                typeWriter(element.querySelector('.gradient-text'), spanPart);
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.setAttribute('placeholder', value);
            } else {
                element.innerHTML = value; // Use innerHTML to support <br> tags in descriptions
            }
        }
    });

    localStorage.setItem('lang', lang);
};

// Typewriter Function
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Initial Load
updateLanguage(currentLang);

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    updateLanguage(currentLang);
});

// Vanilla Tilt Effect for Cards
const cards = document.querySelectorAll('.skill-card, .blog-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Loading Screen Logic
// Loading Screen Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loading-screen');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500); // 1.5 seconds delay for the user to see the animation
});
