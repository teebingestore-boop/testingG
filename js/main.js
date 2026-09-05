/* =========================================================
   GRID DETAILING
   MAIN JAVASCRIPT

   Stable Component-Compatible Version
   ---------------------------------------------------------
   Includes:
   - Hero Image Rotator
   - Hero Parallax
   - Project Slider
   - Project Auto Slider
   - Number Counters
   - Scroll Reveal
   - Scroll To Top
   - AI Assistant
   - Smooth Anchor Links

   IMPORTANT:
   Navbar functionality is handled separately by:
   js/navbar.js

   Components are loaded by:
   js/component-loader.js
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PREVENT DUPLICATE INITIALIZATION
    ===================================================== */

    if (window.__GRID_MAIN_INITIALIZED__) {
        return;
    }

    window.__GRID_MAIN_INITIALIZED__ = true;


    /* =====================================================
       GLOBAL SETTINGS
    ===================================================== */

    const GRID = {

        heroInterval: 5500,

        projectInterval: 5000,

        counterDuration: 1500,

        mobileBreakpoint: 650,

        tabletBreakpoint: 900,

        desktopBreakpoint: 1200

    };


    /* =====================================================
       HERO IMAGE ROTATOR
    ===================================================== */

    const heroBg =
        document.querySelector(".hero-bg");

    const heroBgNext =
        document.querySelector(".hero-bg-next");


    const heroImages = [

        "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=2200&q=90",

        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=90"

    ];


    let heroImageIndex = 0;

    let heroShowingNext = false;

    let heroTimer = null;


    /* =====================================================
       HERO BACKGROUND BUILDER
    ===================================================== */

    function heroBackground(url) {

        return `
            linear-gradient(
                90deg,
                rgba(15,35,57,.99) 0%,
                rgba(15,35,57,.91) 32%,
                rgba(15,35,57,.53) 60%,
                rgba(15,35,57,.20) 100%
            ),
            url("${url}")
        `;

    }


    /* =====================================================
       HERO ROTATOR
    ===================================================== */

    function initHeroSlider() {

        if (
            !heroBg ||
            !heroBgNext ||
            !heroImages.length
        ) {

            return;

        }


        /*
         * Prevent duplicate interval.
         */

        if (heroTimer) {

            clearInterval(heroTimer);

            heroTimer = null;

        }


        /*
         * Initial image.
         */

        heroBg.style.backgroundImage =
            heroBackground(
                heroImages[0]
            );


        /*
         * Prepare next layer.
         */

        heroBgNext.style.backgroundImage =
            heroBackground(
                heroImages[1 % heroImages.length]
            );


        heroTimer = setInterval(
            function () {

                heroImageIndex =
                    (
                        heroImageIndex + 1
                    ) % heroImages.length;


                const nextImage =
                    heroBackground(
                        heroImages[
                            heroImageIndex
                        ]
                    );


                if (!heroShowingNext) {

                    heroBgNext.style.backgroundImage =
                        nextImage;


                    heroBgNext.classList.add(
                        "fade-in"
                    );


                    heroBg.classList.add(
                        "fade-out"
                    );


                } else {

                    heroBg.style.backgroundImage =
                        nextImage;


                    heroBg.classList.remove(
                        "fade-out"
                    );


                    heroBgNext.classList.remove(
                        "fade-in"
                    );

                }


                heroShowingNext =
                    !heroShowingNext;


            },
            GRID.heroInterval
        );

    }


    initHeroSlider();


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    let parallaxTicking = false;


    function updateHeroParallax() {

        if (!heroBg) {

            return;

        }


        /*
         * Keep parallax limited to hero area.
         */

        if (window.scrollY < 700) {

            const offset =
                window.scrollY * 0.08;


            heroBg.style.transform =
                `scale(1.05) translate3d(0, ${offset}px, 0)`;


            if (heroBgNext) {

                heroBgNext.style.transform =
                    `scale(1.05) translate3d(0, ${offset}px, 0)`;

            }

        }


        parallaxTicking = false;

    }


    if (heroBg) {

        window.addEventListener(
            "scroll",
            function () {

                if (!parallaxTicking) {

                    window.requestAnimationFrame(
                        updateHeroParallax
                    );

                    parallaxTicking = true;

                }

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       PROJECT SLIDER
    ===================================================== */

    const track =
        document.getElementById(
            "projectTrack"
        );


    const nextProject =
        document.getElementById(
            "nextProject"
        );


    const prevProject =
        document.getElementById(
            "prevProject"
        );


    let projectPosition = 0;

    let projectTimer = null;


    /* =====================================================
       VISIBLE PROJECTS
    ===================================================== */

    function visibleProjects() {

        if (
            window.innerWidth <=
            GRID.mobileBreakpoint
        ) {

            return 1;

        }


        if (
            window.innerWidth <=
            GRID.tabletBreakpoint
        ) {

            return 2;

        }


        if (
            window.innerWidth <=
            GRID.desktopBreakpoint
        ) {

            return 3;

        }


        return 5;

    }


    /* =====================================================
       PROJECT CARD GAP
    ===================================================== */

    function getProjectGap() {

        if (!track) {

            return 14;

        }


        const computedStyle =
            window.getComputedStyle(
                track
            );


        const gap =
            parseFloat(
                computedStyle.columnGap ||
                computedStyle.gap ||
                "14"
            );


        return Number.isFinite(gap)
            ? gap
            : 14;

    }


    /* =====================================================
       UPDATE PROJECT SLIDER
    ===================================================== */

    function updateSlider() {

        if (!track) {

            return;

        }


        const cards =
            track.querySelectorAll(
                ".project-card"
            );


        if (!cards.length) {

            track.style.transform =
                "translate3d(0,0,0)";

            return;

        }


        const visible =
            visibleProjects();


        const gap =
            getProjectGap();


        const cardWidth =
            cards[0].getBoundingClientRect().width;


        if (
            !cardWidth ||
            !Number.isFinite(cardWidth)
        ) {

            return;

        }


        const maxPosition =
            Math.max(
                0,
                cards.length - visible
            );


        projectPosition =
            Math.min(
                Math.max(
                    projectPosition,
                    0
                ),
                maxPosition
            );


        const distance =
            projectPosition *
            (cardWidth + gap);


        track.style.transform =
            `translate3d(-${distance}px, 0, 0)`;

    }


    /* =====================================================
       NEXT PROJECT
    ===================================================== */

    function moveProjectNext() {

        if (!track) {

            return;

        }


        const cards =
            track.querySelectorAll(
                ".project-card"
            );


        if (!cards.length) {

            return;

        }


        const visible =
            visibleProjects();


        const max =
            Math.max(
                0,
                cards.length - visible
            );


        projectPosition =
            projectPosition >= max
                ? 0
                : projectPosition + 1;


        updateSlider();

    }


    /* =====================================================
       PREVIOUS PROJECT
    ===================================================== */

    function moveProjectPrevious() {

        if (!track) {

            return;

        }


        const cards =
            track.querySelectorAll(
                ".project-card"
            );


        if (!cards.length) {

            return;

        }


        const visible =
            visibleProjects();


        const max =
            Math.max(
                0,
                cards.length - visible
            );


        projectPosition =
            projectPosition <= 0
                ? max
                : projectPosition - 1;


        updateSlider();

    }


    /* =====================================================
       PROJECT BUTTONS
    ===================================================== */

    if (nextProject) {

        nextProject.addEventListener(
            "click",
            moveProjectNext
        );

    }


    if (prevProject) {

        prevProject.addEventListener(
            "click",
            moveProjectPrevious
        );

    }


    /* =====================================================
       PROJECT AUTO SLIDER
    ===================================================== */

    function startProjectAutoSlider() {

        if (!track) {

            return;

        }


        if (projectTimer) {

            clearInterval(
                projectTimer
            );

            projectTimer = null;

        }


        const cards =
            track.querySelectorAll(
                ".project-card"
            );


        if (cards.length <= 1) {

            return;

        }


        projectTimer =
            setInterval(
                function () {

                    moveProjectNext();

                },
                GRID.projectInterval
            );

    }


    startProjectAutoSlider();


    /* =====================================================
       PROJECT HOVER PAUSE
    ===================================================== */

    if (track) {

        track.addEventListener(
            "mouseenter",
            function () {

                if (projectTimer) {

                    clearInterval(
                        projectTimer
                    );

                    projectTimer = null;

                }

            }
        );


        track.addEventListener(
            "mouseleave",
            function () {

                startProjectAutoSlider();

            }
        );

    }


    /* =====================================================
       PROJECT RESIZE
    ===================================================== */

    let resizeTimer = null;


    window.addEventListener(
        "resize",
        function () {

            clearTimeout(
                resizeTimer
            );


            resizeTimer =
                setTimeout(
                    function () {

                        updateSlider();

                        startProjectAutoSlider();

                    },
                    150
                );

        }
    );


    /* =====================================================
       NUMBER COUNTER
    ===================================================== */

    const statSection =
        document.querySelector(
            ".trust"
        );


    const counters =
        document.querySelectorAll(
            ".count-number"
        );


    let countersStarted = false;


    function animateCounter(el) {

        if (!el) {

            return;

        }


        const target =
            Number(
                el.dataset.target || 0
            );


        const suffix =
            el.dataset.suffix || "";


        const duration =
            GRID.counterDuration;


        const start =
            performance.now();


        function tick(now) {

            const progress =
                Math.min(
                    (
                        now - start
                    ) / duration,
                    1
                );


            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );


            const value =
                Math.floor(
                    target * eased
                );


            el.textContent =
                value + suffix;


            if (
                progress < 1
            ) {

                window.requestAnimationFrame(
                    tick
                );

            } else {

                el.textContent =
                    target + suffix;

            }

        }


        window.requestAnimationFrame(
            tick
        );

    }


    if (
        statSection &&
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting &&
                                !countersStarted
                            ) {

                                countersStarted =
                                    true;


                                counters.forEach(
                                    animateCounter
                                );


                                counterObserver.disconnect();

                            }

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        counterObserver.observe(
            statSection
        );

    } else if (
        counters.length
    ) {

        /*
         * Fallback for older browsers.
         */

        counters.forEach(
            animateCounter
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        revealElements.length &&
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        /*
         * Fallback.
         */

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       SCROLL TOP
    ===================================================== */

    const scrollTop =
        document.getElementById(
            "scrollTop"
        );


    function updateScrollTop() {

        if (!scrollTop) {

            return;

        }


        scrollTop.classList.toggle(
            "show",
            window.scrollY > 500
        );

    }


    if (scrollTop) {

        window.addEventListener(
            "scroll",
            updateScrollTop,
            {
                passive: true
            }
        );


        scrollTop.addEventListener(
            "click",
            function (e) {

                e.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );


        updateScrollTop();

    }


    /* =====================================================
       AI ASSISTANT
    ===================================================== */

    const aiToggle =
        document.getElementById(
            "aiToggle"
        );


    const aiCard =
        document.getElementById(
            "aiCard"
        );


    const aiStart =
        document.getElementById(
            "aiStart"
        );


    let aiOpenTimer = null;


    function setAICard(open) {

        if (
            !aiCard ||
            !aiToggle
        ) {

            return;

        }


        aiCard.classList.toggle(
            "open",
            open
        );


        aiToggle.setAttribute(
            "aria-expanded",
            open
                ? "true"
                : "false"
        );

    }


    if (
        aiToggle &&
        aiCard
    ) {

        /*
         * Open automatically once.
         */

        aiOpenTimer =
            setTimeout(
                function () {

                    setAICard(true);

                },
                1800
            );


        aiToggle.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                e.stopPropagation();


                const isOpen =
                    aiCard.classList.contains(
                        "open"
                    );


                setAICard(
                    !isOpen
                );

            }
        );


        if (aiStart) {

            aiStart.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();


                    setAICard(
                        false
                    );

                }
            );

        }

    }


    /* =====================================================
       SMOOTH ANCHOR LINKS
    ===================================================== */

    function initSmoothAnchors() {

        document
            .querySelectorAll(
                'a[href^="#"]'
            )
            .forEach(
                function (anchor) {

                    if (
                        anchor.dataset
                            .smoothInitialized ===
                        "true"
                    ) {

                        return;

                    }


                    anchor.dataset
                        .smoothInitialized =
                        "true";


                    anchor.addEventListener(
                        "click",
                        function (e) {

                            const selector =
                                this.getAttribute(
                                    "href"
                                );


                            if (
                                !selector ||
                                selector === "#"
                            ) {

                                return;

                            }


                            /*
                             * Ignore invalid CSS selectors.
                             */

                            let target = null;


                            try {

                                target =
                                    document.querySelector(
                                        selector
                                    );

                            } catch (error) {

                                return;

                            }


                            if (!target) {

                                return;

                            }


                            /*
                             * Do not override normal
                             * navigation if another
                             * script already handled it.
                             */

                            e.preventDefault();


                            const navbar =
                                document.querySelector(
                                    ".grid-navbar"
                                );


                            const navbarHeight =
                                navbar
                                    ? navbar.offsetHeight
                                    : 0;


                            const targetTop =
                                target.getBoundingClientRect()
                                    .top +
                                window.scrollY -
                                navbarHeight;


                            window.scrollTo({

                                top:
                                    Math.max(
                                        0,
                                        targetTop
                                    ),

                                behavior:
                                    "smooth"

                            });


                            /*
                             * Update URL hash without
                             * jumping.
                             */

                            if (
                                history.pushState
                            ) {

                                history.pushState(
                                    null,
                                    "",
                                    selector
                                );

                            }

                        }
                    );

                }
            );

    }


    initSmoothAnchors();


    /* =====================================================
       WINDOW LOAD
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            /*
             * Final layout calculation.
             */

            updateSlider();

            updateScrollTop();

            updateHeroParallax();


            /*
             * IMPORTANT:
             *
             * Actual navbar class is:
             * .grid-navbar
             *
             * Not .navbar.
             */

            const navbar =
                document.querySelector(
                    ".grid-navbar"
                );


            if (navbar) {

                navbar.classList.toggle(
                    "scrolled",
                    window.scrollY > 20
                );

            }

        },
        {
            once: true
        }
    );


    /* =====================================================
       NAVBAR SCROLL STATE
    ===================================================== */

    const gridNavbar =
        document.querySelector(
            ".grid-navbar"
        );


    if (gridNavbar) {

        let navbarScrollTicking =
            false;


        function updateNavbarScroll() {

            gridNavbar.classList.toggle(
                "scrolled",
                window.scrollY > 20
            );


            navbarScrollTicking =
                false;

        }


        window.addEventListener(
            "scroll",
            function () {

                if (
                    !navbarScrollTicking
                ) {

                    window.requestAnimationFrame(
                        updateNavbarScroll
                    );


                    navbarScrollTicking =
                        true;

                }

            },
            {
                passive: true
            }
        );


        updateNavbarScroll();

    }


    /* =====================================================
       PAGE VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            /*
             * Pause heavy intervals when the
             * browser tab is hidden.
             */

            if (
                document.hidden
            ) {

                if (heroTimer) {

                    clearInterval(
                        heroTimer
                    );

                    heroTimer = null;

                }


                if (projectTimer) {

                    clearInterval(
                        projectTimer
                    );

                    projectTimer = null;

                }

            } else {

                /*
                 * Restart sliders when tab
                 * becomes visible again.
                 */

                if (
                    heroBg &&
                    heroBgNext &&
                    !heroTimer
                ) {

                    heroTimer =
                        setInterval(
                            function () {

                                heroImageIndex =
                                    (
                                        heroImageIndex + 1
                                    ) %
                                    heroImages.length;


                                const nextImage =
                                    heroBackground(
                                        heroImages[
                                            heroImageIndex
                                        ]
                                    );


                                if (
                                    !heroShowingNext
                                ) {

                                    heroBgNext.style.backgroundImage =
                                        nextImage;


                                    heroBgNext.classList.add(
                                        "fade-in"
                                    );


                                    heroBg.classList.add(
                                        "fade-out"
                                    );

                                } else {

                                    heroBg.style.backgroundImage =
                                        nextImage;


                                    heroBg.classList.remove(
                                        "fade-out"
                                    );


                                    heroBgNext.classList.remove(
                                        "fade-in"
                                    );

                                }


                                heroShowingNext =
                                    !heroShowingNext;

                            },
                            GRID.heroInterval
                        );

                }


                if (
                    track &&
                    !projectTimer
                ) {

                    startProjectAutoSlider();

                }

            }

        }
    );


    /* =====================================================
       PAGE SHOW
    ===================================================== */

    window.addEventListener(
        "pageshow",
        function () {

            /*
             * Browser back/forward cache cleanup.
             */

            updateSlider();

            updateScrollTop();


            const navbar =
                document.querySelector(
                    ".grid-navbar"
                );


            if (navbar) {

                navbar.classList.toggle(
                    "scrolled",
                    window.scrollY > 20
                );

            }

        }
    );


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    updateSlider();

    updateScrollTop();

    initSmoothAnchors();


})();