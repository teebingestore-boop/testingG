/* =========================================================
   GRID STEEL DETAILING
   SAFE PAGE INTERACTIONS
   FIXED EXPLORE TOPICS + SMOOTH SCROLL
   HERO TEXT ANIMATION INCLUDED
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const hero =
        document.getElementById("hero");

    const topicSections =
        Array.from(
            document.querySelectorAll(".topic-section")
        );

    const topicLinks =
        Array.from(
            document.querySelectorAll(".topic-link")
        );

    const progressBar =
        document.getElementById("progressBar");

    const progressPercent =
        document.getElementById("progressPercent");

    const scrollUp =
        document.getElementById("scrollUp");

    const scrollDown =
        document.getElementById("scrollDown");

    const modal =
        document.getElementById("articleModal");

    const modalBody =
        document.getElementById("articleModalBody");

    const modalTitle =
        document.getElementById("articleModalTitle");

    const readBelow =
        document.getElementById("readBelow");


    /* =====================================================
       STATE
    ===================================================== */

    let currentTopicIndex = 0;

    let modalTopicId = null;

    let scrollTicking = false;


    /* =====================================================
       HERO SAFETY
    ===================================================== */

    if (hero) {

        hero.removeAttribute("hidden");

    }


    /* =====================================================
       HERO TEXT ANIMATION
       ONE TIME ONLY
    ===================================================== */

    function animateHeroText() {

        if (!hero) {
            return;
        }


        const kicker =
            hero.querySelector(".hero-kicker");

        const title =
            hero.querySelector(".hero-title");

        const subtitle =
            hero.querySelector(".hero-subtitle");

        const actions =
            hero.querySelector(".hero-actions");


        const elements = [
            kicker,
            title,
            subtitle,
            actions
        ].filter(Boolean);


        if (!elements.length) {
            return;
        }


        /*
         * Set the initial state through inline styles.
         * This prevents older CSS rules from stopping
         * the animation.
         */

        elements.forEach(function (element) {

            element.style.animation = "none";

            element.style.opacity = "0";

            element.style.transform =
                "translateY(30px)";

            element.style.filter =
                "blur(5px)";

        });


        /*
         * Force browser reflow.
         * This guarantees the animation starts.
         */

        void hero.offsetWidth;


        /*
         * KICKER
         */

        if (kicker) {

            kicker.style.animation =
                "gridHeroKicker " +
                "0.75s " +
                "cubic-bezier(.16,1,.3,1) " +
                "0.05s " +
                "forwards";

        }


        /*
         * MAIN TITLE
         */

        if (title) {

            title.style.animation =
                "gridHeroTitle " +
                "1s " +
                "cubic-bezier(.16,1,.3,1) " +
                "0.18s " +
                "forwards";

        }


        /*
         * SUBTITLE
         */

        if (subtitle) {

            subtitle.style.animation =
                "gridHeroSubtitle " +
                "0.85s " +
                "cubic-bezier(.16,1,.3,1) " +
                "0.55s " +
                "forwards";

        }


        /*
         * BUTTONS
         */

        if (actions) {

            actions.style.animation =
                "gridHeroActions " +
                "0.8s " +
                "cubic-bezier(.16,1,.3,1) " +
                "0.78s " +
                "forwards";

        }

    }


    /*
     * Start hero animation after browser paints
     * the initial hero state.
     */

    requestAnimationFrame(function () {

        requestAnimationFrame(function () {

            animateHeroText();

        });

    });


    /* =====================================================
       SAFE SECTION SCROLL
    ===================================================== */

    function goToSection(id) {

        const target =
            document.getElementById(id);

        if (!target) {
            return;
        }


        const navbar =
            document.querySelector(
                ".navbar, header, .site-header"
            );


        let offset = 30;


        if (navbar) {

            offset =
                Math.max(
                    20,
                    navbar.offsetHeight + 20
                );

        }


        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            offset;


        window.scrollTo({

            top:
                Math.max(
                    0,
                    targetPosition
                ),

            behavior: "smooth"

        });

    }


    /* =====================================================
       ACTIVE TOPIC
       FIXED + RELIABLE
    ===================================================== */

    function setActiveTopic(index) {

        if (
            !topicSections.length ||
            !topicLinks.length
        ) {
            return;
        }


        index =
            Math.max(
                0,
                Math.min(
                    index,
                    topicSections.length - 1
                )
            );


        currentTopicIndex = index;


        const activeSection =
            topicSections[index];


        if (!activeSection) {
            return;
        }


        const activeId =
            activeSection.id;


        topicLinks.forEach(function (link) {

            const target =
                link.dataset.target;


            const isActive =
                target === activeId;


            link.classList.toggle(
                "active",
                isActive
            );


            if (isActive) {

                link.setAttribute(
                    "aria-current",
                    "true"
                );

            } else {

                link.removeAttribute(
                    "aria-current"
                );

            }

        });


        updateScrollButtons();

    }


    /* =====================================================
       FIND CURRENT TOPIC WHILE SCROLLING
    ===================================================== */

    function updateActiveTopic() {

        if (!topicSections.length) {
            return;
        }


        const marker =
            window.scrollY +
            window.innerHeight * 0.32;


        let bestIndex = 0;

        let bestTop = -Infinity;


        topicSections.forEach(
            function (section, index) {

                const top =
                    section.getBoundingClientRect().top +
                    window.scrollY;


                if (
                    top <= marker &&
                    top > bestTop
                ) {

                    bestTop = top;

                    bestIndex = index;

                }

            }
        );


        setActiveTopic(bestIndex);

    }


    /* =====================================================
       EXPLORE TOPIC CLICK
    ===================================================== */

    topicLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const target =
                    this.dataset.target;


                if (!target) {
                    return;
                }


                const targetSection =
                    document.getElementById(
                        target
                    );


                if (!targetSection) {
                    return;
                }


                const index =
                    topicSections.indexOf(
                        targetSection
                    );


                if (index !== -1) {

                    setActiveTopic(index);

                }


                goToSection(target);

            }
        );

    });


    /* =====================================================
       ACTIVE TOPIC OBSERVER
    ===================================================== */

    if (
        "IntersectionObserver" in window &&
        topicSections.length
    ) {

        const topicObserver =
            new IntersectionObserver(

                function (entries) {

                    const visibleSections =
                        entries
                            .filter(
                                function (entry) {

                                    return entry.isIntersecting;

                                }
                            )
                            .sort(
                                function (a, b) {

                                    return (
                                        Math.abs(
                                            a.boundingClientRect.top
                                        ) -
                                        Math.abs(
                                            b.boundingClientRect.top
                                        )
                                    );

                                }
                            );


                    if (
                        visibleSections.length
                    ) {

                        const section =
                            visibleSections[0].target;


                        const index =
                            topicSections.indexOf(
                                section
                            );


                        if (index !== -1) {

                            setActiveTopic(index);

                        }

                    }

                },

                {

                    root: null,

                    rootMargin:
                        "-18% 0px -58% 0px",

                    threshold:
                        [
                            0,
                            0.08,
                            0.20
                        ]

                }

            );


        topicSections.forEach(
            function (section) {

                topicObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       ARTICLE TITLE
    ===================================================== */

    function getTopicTitle(section) {

        if (!section) {

            return "Topic Article";

        }


        const title =
            section.querySelector(
                ".topic-title"
            );


        if (!title) {

            return "Topic Article";

        }


        return title.textContent
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =====================================================
       OPEN ARTICLE MODAL
    ===================================================== */

    function openArticle(id) {

        const source =
            document.getElementById(id);


        if (
            !source ||
            !modal ||
            !modalBody ||
            !modalTitle
        ) {
            return;
        }


        modalTopicId = id;


        modalTitle.textContent =
            getTopicTitle(source);


        const clone =
            source.cloneNode(true);


        clone.classList.remove(
            "reveal"
        );


        clone.classList.add(
            "modal-topic-copy"
        );


        clone
            .querySelectorAll(
                ".topic-visual"
            )
            .forEach(
                function (visual) {

                    visual.remove();

                }
            );


        modalBody.innerHTML = "";


        modalBody.appendChild(
            clone
        );


        modal.classList.add(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "modal-open"
        );


        const closeButton =
            modal.querySelector(
                ".article-close"
            );


        if (closeButton) {

            setTimeout(
                function () {

                    closeButton.focus();

                },
                50
            );

        }

    }


    /* =====================================================
       CLOSE ARTICLE MODAL
    ===================================================== */

    function closeArticle() {

        if (!modal) {
            return;
        }


        modal.classList.remove(
            "open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "modal-open"
        );


        setTimeout(
            function () {

                if (modalBody) {

                    modalBody.innerHTML =
                        "";

                }

            },
            250
        );

    }


    /* =====================================================
       CATEGORY CARDS
    ===================================================== */

    document
        .querySelectorAll(
            ".category-card[data-article]"
        )
        .forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {

                        const article =
                            this.dataset.article;


                        if (article) {

                            openArticle(
                                article
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       MODAL CLOSE BUTTONS
    ===================================================== */

    document
        .querySelectorAll(
            "[data-close-article]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    closeArticle
                );

            }
        );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal &&
                modal.classList.contains(
                    "open"
                )
            ) {

                closeArticle();

            }

        }
    );


    /* =====================================================
       READ BELOW
    ===================================================== */

    if (readBelow) {

        readBelow.addEventListener(
            "click",
            function () {

                const target =
                    modalTopicId;


                closeArticle();


                if (target) {

                    setTimeout(
                        function () {

                            const section =
                                document.getElementById(
                                    target
                                );


                            if (section) {

                                const index =
                                    topicSections.indexOf(
                                        section
                                    );


                                if (index !== -1) {

                                    setActiveTopic(
                                        index
                                    );

                                }

                            }


                            goToSection(
                                target
                            );

                        },
                        150
                    );

                }

            }
        );

    }


    /* =====================================================
       PAGE PROGRESS
    ===================================================== */

    function updateProgress() {

        const scrollTop =
            window.scrollY ||
            document.documentElement.scrollTop ||
            0;


        const documentHeight =
            document.documentElement.scrollHeight;


        const windowHeight =
            window.innerHeight;


        const maxScroll =
            documentHeight -
            windowHeight;


        let percentage = 0;


        if (maxScroll > 0) {

            percentage =
                (
                    scrollTop /
                    maxScroll
                ) * 100;

        }


        percentage =
            Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            );


        if (progressBar) {

            progressBar.style.width =
                percentage + "%";

        }


        if (progressPercent) {

            progressPercent.textContent =
                Math.round(
                    percentage
                ) + "%";

        }

    }


    /* =====================================================
       SCROLL BUTTON STATE
    ===================================================== */

    function updateScrollButtons() {

        if (
            !scrollUp ||
            !scrollDown
        ) {
            return;
        }


        scrollUp.disabled =
            currentTopicIndex <= 0;


        scrollDown.disabled =
            currentTopicIndex >=
            topicSections.length - 1;

    }


    /* =====================================================
       NEXT / PREVIOUS TOPIC
    ===================================================== */

    function scrollTopic(direction) {

        if (!topicSections.length) {
            return;
        }


        let index =
            currentTopicIndex +
            direction;


        index =
            Math.max(
                0,
                Math.min(
                    index,
                    topicSections.length - 1
                )
            );


        const target =
            topicSections[index];


        if (!target) {
            return;
        }


        setActiveTopic(index);


        goToSection(
            target.id
        );

    }


    /* =====================================================
       SCROLL DOWN
    ===================================================== */

    if (scrollDown) {

        scrollDown.addEventListener(
            "click",
            function () {

                scrollTopic(1);

            }
        );

    }


    /* =====================================================
       SCROLL UP
    ===================================================== */

    if (scrollUp) {

        scrollUp.addEventListener(
            "click",
            function () {

                scrollTopic(-1);

            }
        );

    }


    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            const tag =
                event.target.tagName;


            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT" ||
                document.body.classList.contains(
                    "modal-open"
                )
            ) {

                return;

            }


            if (
                event.key === "ArrowDown"
            ) {

                event.preventDefault();

                scrollTopic(1);

            }


            if (
                event.key === "ArrowUp"
            ) {

                event.preventDefault();

                scrollTopic(-1);

            }

        }
    );


    /* =====================================================
       REVEAL ANIMATION
       ONCE ONLY
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold: 0.08
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

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    document
        .querySelectorAll(
            ".faq-question"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        const item =
                            this.closest(
                                ".faq-item"
                            );


                        if (!item) {
                            return;
                        }


                        const isOpen =
                            item.classList.contains(
                                "open"
                            );


                        document
                            .querySelectorAll(
                                ".faq-item.open"
                            )
                            .forEach(
                                function (
                                    openItem
                                ) {

                                    openItem.classList.remove(
                                        "open"
                                    );


                                    const openButton =
                                        openItem.querySelector(
                                            ".faq-question"
                                        );


                                    if (openButton) {

                                        openButton.setAttribute(
                                            "aria-expanded",
                                            "false"
                                        );

                                    }

                                }
                            );


                        if (!isOpen) {

                            item.classList.add(
                                "open"
                            );


                            this.setAttribute(
                                "aria-expanded",
                                "true"
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       IMAGE FALLBACK
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(
            function (image) {

                image.addEventListener(
                    "error",
                    function () {

                        this.style.backgroundColor =
                            "#E9EEF3";


                        this.style.minHeight =
                            "160px";


                        this.style.objectFit =
                            "cover";

                    }
                );

            }
        );


    /* =====================================================
       SCROLL EVENT
       PERFORMANCE SAFE
    ===================================================== */

    function handleScroll() {

        if (scrollTicking) {
            return;
        }


        scrollTicking = true;


        window.requestAnimationFrame(
            function () {

                updateProgress();

                updateActiveTopic();


                scrollTicking =
                    false;

            }
        );

    }


    window.addEventListener(
        "scroll",
        handleScroll,
        {
            passive: true
        }
    );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

            updateProgress();

            updateActiveTopic();

        }
    );


    /* =====================================================
       INITIAL STATE
    ===================================================== */

    updateProgress();

    updateActiveTopic();

    updateScrollButtons();


    /* =====================================================
       FINAL HERO SAFETY
       DO NOT HIDE HERO
    ===================================================== */

    if (hero) {

        hero.style.removeProperty(
            "display"
        );


        hero.style.removeProperty(
            "visibility"
        );

    }

});