document.addEventListener("DOMContentLoaded", () => {

    // ====== ANIMATE ON SCROLL ======
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.2 });
    document.querySelectorAll(".animate").forEach(el => observer.observe(el));

    // ====== TYPING ANIMATION ======
    const typedName = "Exequiel Bangal";
    const nameElement = document.getElementById("typed-name");
    let i = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!nameElement) return;

        const typingSpeed = 120;
        const deletingSpeed = 80;
        const pauseAfterTyping = 1000;
        const pauseAfterDeleting = 300;

        if (!isDeleting && i < typedName.length) {
            nameElement.textContent = typedName.substring(0, i + 1);
            i++;
            setTimeout(typeEffect, typingSpeed);
        } else if (isDeleting && i > 0) {
            nameElement.textContent = typedName.substring(0, i - 1);
            i--;
            setTimeout(typeEffect, deletingSpeed);
        } else if (i === typedName.length && !isDeleting) {
            isDeleting = true;
            setTimeout(typeEffect, pauseAfterTyping);
        } else if (i === 0 && isDeleting) {
            isDeleting = false;
            setTimeout(typeEffect, pauseAfterDeleting);
        }
    }

    typeEffect();

    // ====== VARIABLES ======
    const menuIcon = document.getElementById('menu-icon');
    const navLinksContainer = document.getElementById('nav-links');
    const body = document.body;
    const icon = menuIcon.querySelector('i');
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links li a");

    // ====== SIDEBAR TOGGLE ======
    menuIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinksContainer.classList.toggle('active');
        body.classList.toggle('sidebar-open');

        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // ====== CLOSE SIDEBAR WHEN CLICKING OUTSIDE ======
    body.addEventListener('click', (e) => {
        if (body.classList.contains('sidebar-open') && !navLinksContainer.contains(e.target) && !menuIcon.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            body.classList.remove('sidebar-open');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-xmark');
        }
    });

    // ====== SMOOTH SCROLL + ACTIVE LINK ON CLICK ======
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });
            }

            // Update active link immediately
            navLinks.forEach(link => link.classList.remove("active"));
            this.classList.add("active");

            // Close sidebar if open
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
                body.classList.remove('sidebar-open');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    // ====== ACTIVE LINK HIGHLIGHT ON SCROLL ======
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        // Fix for last section at bottom
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
            current = sections[sections.length - 1].getAttribute("id");
        }

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

});