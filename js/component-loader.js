

(async function () {

    "use strict";


    /* =====================================================
       COMPONENT LIST
    ===================================================== */

    const components = [
        ["navbar-component", "components/navbar.html"],
        ["footer-component", "components/footer.html"],
        ["floating-component", "components/floating.html"]
    ];


    /* =====================================================
       LOAD CSS ONCE
    ===================================================== */

    function loadCSS(file) {

        return new Promise((resolve, reject) => {

            const existing =
                document.querySelector(
                    `link[data-grid-component-css="${file}"]`
                );


            /* -------------------------------------------------
               CSS ALREADY EXISTS
            ------------------------------------------------- */

            if (existing) {

                /*
                 * If stylesheet is already loaded,
                 * continue immediately.
                 */

                if (
                    existing.sheet ||
                    existing.dataset.loaded === "true"
                ) {

                    resolve();
                    return;

                }


                /*
                 * Stylesheet is currently loading.
                 * Wait for the existing request instead of
                 * creating another <link>.
                 */

                existing.addEventListener(
                    "load",
                    function () {

                        resolve();

                    },
                    {
                        once: true
                    }
                );


                existing.addEventListener(
                    "error",
                    function () {

                        reject(
                            new Error(
                                `Could not load ${file}`
                            )
                        );

                    },
                    {
                        once: true
                    }
                );


                return;

            }


            /* -------------------------------------------------
               CREATE STYLESHEET
            ------------------------------------------------- */

            const link =
                document.createElement("link");


            link.rel = "stylesheet";

            link.href = file;

            link.dataset.gridComponentCss = file;


            link.onload = function () {

                link.dataset.loaded = "true";

                resolve();

            };


            link.onerror = function () {

                console.error(
                    `Grid Detailing: Could not load CSS ${file}`
                );


                reject(
                    new Error(
                        `Could not load ${file}`
                    )
                );

            };


            document.head.appendChild(link);

        });

    }


    /* =====================================================
       LOAD JAVASCRIPT ONCE
    ===================================================== */

    function loadJS(file) {

        return new Promise((resolve, reject) => {

            const existing =
                document.querySelector(
                    `script[data-grid-component-js="${file}"]`
                );


            /* -------------------------------------------------
               SCRIPT ALREADY EXISTS
            ------------------------------------------------- */

            if (existing) {

                if (
                    existing.dataset.loaded === "true"
                ) {

                    resolve();
                    return;

                }


                /*
                 * Script is currently loading.
                 * Do not create another script.
                 */

                existing.addEventListener(
                    "load",
                    function () {

                        resolve();

                    },
                    {
                        once: true
                    }
                );


                existing.addEventListener(
                    "error",
                    function () {

                        reject(
                            new Error(
                                `Could not load ${file}`
                            )
                        );

                    },
                    {
                        once: true
                    }
                );


                return;

            }


            /* -------------------------------------------------
               CREATE SCRIPT
            ------------------------------------------------- */

            const script =
                document.createElement("script");


            script.src = file;

            script.dataset.gridComponentJs = file;

            /*
             * Keep execution order predictable.
             */

            script.async = false;


            script.onload = function () {

                script.dataset.loaded = "true";

                resolve();

            };


            script.onerror = function () {

                console.error(
                    `Grid Detailing: Could not load JS ${file}`
                );


                reject(
                    new Error(
                        `Could not load ${file}`
                    )
                );

            };


            document.body.appendChild(script);

        });

    }


    /* =====================================================
       LOAD HTML COMPONENT
    ===================================================== */

    async function loadComponent(
        targetId,
        file
    ) {

        const target =
            document.getElementById(targetId);


        if (!target) {

            console.warn(
                `Grid Detailing: #${targetId} not found.`
            );

            return false;

        }


        /*
         * Prevent the same component from being injected
         * twice on the same page.
         */

        if (
            target.dataset.gridComponentLoaded === "true"
        ) {

            return true;

        }


        try {

            const response =
                await fetch(
                    file,
                    {
                        cache: "default"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `${file}: ${response.status}`
                );

            }


            const html =
                await response.text();


            /*
             * Only replace the target after the complete
             * component has been downloaded.
             */

            target.innerHTML = html;


            target.dataset.gridComponentLoaded = "true";


            return true;


        } catch (error) {

            console.error(
                `Grid Detailing: Could not load ${file}`,
                error
            );


            return false;

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation() {

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if (!currentPage) {

            currentPage = "index.html";

        }


        /* =================================================
           REMOVE OLD ACTIVE STATES
        ================================================= */

        document
            .querySelectorAll(
                ".grid-nav-item, .grid-service-link"
            )
            .forEach(function (item) {

                item.classList.remove(
                    "active"
                );


                item.removeAttribute(
                    "aria-current"
                );

            });


        /* =================================================
           CONTACT
        ================================================= */

        if (
            currentPage === "contact-us.html" ||
            currentPage === "contact.html"
        ) {

            const contactLink =
                document.querySelector(
                    'a[data-page="contact-us.html"]'
                );


            if (contactLink) {

                contactLink.classList.add(
                    "active"
                );


                contactLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           BLOG
        ================================================= */

        if (
            currentPage === "blog.html"
        ) {

            const blogLink =
                document.querySelector(
                    'a[data-page="blog.html"]'
                );


            if (blogLink) {

                blogLink.classList.add(
                    "active"
                );


                blogLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           PROJECTS
        ================================================= */

        if (
            currentPage === "projects.html"
        ) {

            const projectsLink =
                document.querySelector(
                    'a[data-page="projects.html"]'
                );


            if (projectsLink) {

                projectsLink.classList.add(
                    "active"
                );


                projectsLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           ABOUT
        ================================================= */

        if (
            currentPage === "about.html" ||
            currentPage === "about-us.html"
        ) {

            const aboutLink =
                document.querySelector(
                    '[data-page="about.html"]'
                );


            if (aboutLink) {

                aboutLink.classList.add(
                    "active"
                );


                aboutLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           HOW WE WORK
        ================================================= */

        if (
            currentPage === "how-we-work.html"
        ) {

            const howWeWorkLink =
                document.querySelector(
                    'a[data-page="how-we-work.html"]'
                );


            if (howWeWorkLink) {

                howWeWorkLink.classList.add(
                    "active"
                );


                howWeWorkLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           STRUCTURAL STEEL DETAILING
        ================================================= */

        if (
            currentPage ===
            "structural-steel-detailing.html"
        ) {

            const servicesButton =
                document.getElementById(
                    "gridServicesBtn"
                );


            const serviceLink =
                document.querySelector(
                    '[data-page="structural-steel-detailing.html"]'
                );


            /*
             * Services button remains active.
             *
             * IMPORTANT:
             * Dropdown is NOT opened automatically.
             */

            if (servicesButton) {

                servicesButton.classList.add(
                    "active"
                );

            }


            if (serviceLink) {

                serviceLink.classList.add(
                    "active"
                );


                serviceLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            return;

        }


        /* =================================================
           HOME
        ================================================= */

        if (
            currentPage === "index.html"
        ) {

            const homeLink =
                document.querySelector(
                    'a[data-page="index.html"]'
                );


            if (homeLink) {

                homeLink.classList.add(
                    "active"
                );


                homeLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }

    }


    /* =====================================================
       LOAD NAVBAR FIRST
    ===================================================== */

    async function loadNavbar() {

        /*
         * Navbar CSS has priority.
         *
         * If navbar.css is already included directly
         * in <head>, loadCSS() simply detects it.
         */

        await loadCSS(
            "css/navbar.css"
        );


        /*
         * Load navbar HTML before anything else.
         */

        const navbarLoaded =
            await loadComponent(
                "navbar-component",
                "components/navbar.html"
            );


        if (!navbarLoaded) {

            throw new Error(
                "Grid Detailing: Navbar could not be loaded."
            );

        }


        /*
         * Initialize navbar immediately.
         */

        await loadJS(
            "js/navbar.js"
        );


        /*
         * Set active navigation immediately.
         */

        setActiveNavigation();


        return true;

    }


    /* =====================================================
       LOAD SECONDARY COMPONENTS
    ===================================================== */

    async function loadSecondaryComponents() {

        /*
         * Footer and floating components do NOT block
         * navbar initialization.
         */

        await Promise.all([

            loadComponent(
                "footer-component",
                "components/footer.html"
            ),

            loadComponent(
                "floating-component",
                "components/floating.html"
            )

        ]);

    }


    /* =====================================================
       MAIN LOADING FLOW
    ===================================================== */

    try {

        /* =================================================
           STEP 1
           NAVBAR HAS TOP PRIORITY
        ================================================= */

        await loadNavbar();


        /* =================================================
           STEP 2
           MARK NAVBAR READY
        ================================================= */

        document.documentElement.classList.add(
            "grid-navbar-ready"
        );


        /* =================================================
           STEP 3
           LOAD FOOTER + FLOATING
           WITHOUT BLOCKING NAVBAR
        ================================================= */

        await loadSecondaryComponents();


        /* =================================================
           STEP 4
           LOAD MAIN JS
        ================================================= */

        await loadJS(
            "js/main.js"
        );


        /* =================================================
           STEP 5
           FINAL ACTIVE NAVIGATION
        ================================================= */

        setActiveNavigation();


        /* =================================================
           COMPONENTS READY
        ================================================= */

        document.documentElement.classList.add(
            "grid-components-ready"
        );


    } catch (error) {

        console.error(
            "Grid Detailing component loading error:",
            error
        );

    }

})();
