/* =========================================================
   GRID STEEL DETAILING — NAVBAR JAVASCRIPT

   FINAL ACTIVE STATE VERSION

   NORMAL PAGES
   → Active state is determined from CURRENT URL

   HOME
   → index.html
   → HOME ACTIVE

   ABOUT US
   → about.html
   → ABOUT US ACTIVE

   STRUCTURAL STEEL DETAILING
   → structural-steel-detailing.html
   → STRUCTURAL STEEL DETAILING ACTIVE

   PROJECTS
   → projects.html
   → PROJECTS ACTIVE

   HOW WE WORK
   → how-we-work.html
   → HOW WE WORK ACTIVE

   CONTACT US
   → contact-us.html
   → CONTACT US ACTIVE

   GET A QUOTE
   → contact-us.html
   → GET A QUOTE ACTIVE
   → CONTACT US NOT ACTIVE

   Desktop + Mobile
   Stable
   No Duplicate Initialization
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       PREVENT DUPLICATE INITIALIZATION
    ===================================================== */

    if (window.__GRID_NAVBAR_INITIALIZED__) {
        return;
    }

    window.__GRID_NAVBAR_INITIALIZED__ = true;


    /* =====================================================
       STORAGE KEY

       ONLY USED FOR:
       GET A QUOTE vs CONTACT US
    ===================================================== */

    const ACTIVE_SOURCE_KEY =
        "gridNavbarActiveSource";


    /* =====================================================
       GET ELEMENTS
    ===================================================== */

    function getElements() {

        return {

            navbar:
                document.getElementById("gridNavbar"),

            nav:
                document.getElementById("gridNavLinks"),

            menuBtn:
                document.getElementById("gridMenuBtn"),

            overlay:
                document.getElementById("gridMobileOverlay"),

            quoteBtn:
                document.querySelector(".grid-quote-btn"),

            contactBtn:
                document.querySelector(
                    '.grid-nav-item[data-page="contact-us.html"]'
                )

        };

    }


    /* =====================================================
       INITIALIZE NAVBAR
    ===================================================== */

    function initNavbar() {

        const el = getElements();


        /*
         * Navbar HTML not ready yet.
         * Wait briefly.
         */

        if (!el.nav) {

            setTimeout(
                initNavbar,
                50
            );

            return;

        }


        /* =================================================
           PREVENT DUPLICATE INITIALIZATION
        ================================================= */

        if (
            el.nav.dataset.navInitialized === "true"
        ) {

            return;

        }

        el.nav.dataset.navInitialized = "true";


        /* =================================================
           MOBILE MENU — OPEN
        ================================================= */

        function openMenu() {

            el.nav.classList.add("open");


            if (el.menuBtn) {

                el.menuBtn.classList.add("active");

                el.menuBtn.setAttribute(
                    "aria-expanded",
                    "true"
                );

                el.menuBtn.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

            }


            if (el.overlay) {

                el.overlay.classList.add("active");

            }


            document.body.classList.add(
                "grid-nav-menu-open"
            );

        }


        /* =================================================
           MOBILE MENU — CLOSE
        ================================================= */

        function closeMenu() {

            el.nav.classList.remove("open");


            if (el.menuBtn) {

                el.menuBtn.classList.remove("active");

                el.menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                el.menuBtn.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }


            if (el.overlay) {

                el.overlay.classList.remove("active");

            }


            document.body.classList.remove(
                "grid-nav-menu-open"
            );

        }


        /* =================================================
           MOBILE MENU BUTTON
        ================================================= */

        if (el.menuBtn) {

            el.menuBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    event.stopPropagation();


                    if (
                        el.nav.classList.contains("open")
                    ) {

                        closeMenu();

                    } else {

                        openMenu();

                    }

                }
            );

        }


        /* =================================================
           MOBILE OVERLAY
        ================================================= */

        if (el.overlay) {

            el.overlay.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        }


        /* =================================================
           CLEAR ALL ACTIVE STATES
        ================================================= */

        function clearActiveStates() {

            document
                .querySelectorAll(
                    ".grid-nav-item, .grid-service-link, .grid-quote-btn"
                )
                .forEach(function (item) {

                    item.classList.remove(
                        "active"
                    );

                    item.classList.remove(
                        "quote-source-active"
                    );

                    item.removeAttribute(
                        "aria-current"
                    );

                });

        }


        /* =================================================
           ACTIVATE GET A QUOTE
        ================================================= */

        function activateQuote() {

            clearActiveStates();


            if (el.quoteBtn) {

                el.quoteBtn.classList.add(
                    "active"
                );

                el.quoteBtn.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            /*
             * CONTACT US must stay inactive
             * when Quote is the active source.
             */

            if (el.contactBtn) {

                el.contactBtn.classList.remove(
                    "active"
                );

                el.contactBtn.classList.add(
                    "quote-source-active"
                );

                el.contactBtn.removeAttribute(
                    "aria-current"
                );

            }

        }


        /* =================================================
           ACTIVATE CONTACT US
        ================================================= */

        function activateContact() {

            clearActiveStates();


            if (el.contactBtn) {

                el.contactBtn.classList.add(
                    "active"
                );

                el.contactBtn.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            if (el.quoteBtn) {

                el.quoteBtn.classList.remove(
                    "active"
                );

                el.quoteBtn.removeAttribute(
                    "aria-current"
                );

            }

        }


        /* =================================================
           GET CURRENT PAGE
        ================================================= */

        function getCurrentPage() {

            let pathname =
                window.location.pathname || "";


            /*
             * Remove query string and hash.
             */

            pathname =
                pathname
                    .split("?")[0]
                    .split("#")[0];


            /*
             * Get only the filename.
             */

            let page =
                pathname
                    .split("/")
                    .filter(Boolean)
                    .pop();


            /*
             * Root URL:
             *
             * /
             * /index.html
             *
             * Both mean HOME.
             */

            if (
                !page ||
                page === ""
            ) {

                page = "index.html";

            }


            page =
                decodeURIComponent(page)
                    .toLowerCase();


            return page;

        }


        /* =================================================
           ACTIVATE NORMAL PAGE
        ================================================= */

        function activatePage(page) {

            clearActiveStates();


            if (!page) {
                return;
            }


            const targetPage =
                page
                    .split("/")
                    .pop()
                    .toLowerCase();


            /*
             * Find matching navigation item.
             */

            const navItems =
                el.nav.querySelectorAll(
                    ".grid-nav-item[data-page]"
                );


            navItems.forEach(function (item) {

                const itemPage =
                    (
                        item.getAttribute(
                            "data-page"
                        ) || ""
                    )
                    .split("/")
                    .pop()
                    .toLowerCase();


                /*
                 * Exact filename match.
                 */

                if (
                    itemPage === targetPage
                ) {

                    item.classList.add(
                        "active"
                    );

                    item.setAttribute(
                        "aria-current",
                        "page"
                    );

                }

            });

        }


        /* =================================================
           RESTORE ACTIVE STATE
        ================================================= */

        function restoreActiveState() {

            const currentPage =
                getCurrentPage();


            const source =
                sessionStorage.getItem(
                    ACTIVE_SOURCE_KEY
                );


            /* =============================================
               CONTACT PAGE
            ============================================= */

            if (
                currentPage === "contact-us.html" ||
                currentPage === "contact.html"
            ) {

                /*
                 * Came through GET A QUOTE
                 */

                if (
                    source === "quote"
                ) {

                    activateQuote();

                    return;

                }


                /*
                 * Normal/direct CONTACT US
                 */

                activateContact();

                return;

            }


            /* =============================================
               ALL NORMAL PAGES
            ============================================= */

            /*
             * Quote/contact state should not remain
             * active on another page.
             */

            sessionStorage.removeItem(
                ACTIVE_SOURCE_KEY
            );


            /*
             * Activate strictly according
             * to the current URL.
             */

            activatePage(
                currentPage
            );

        }


        /* =================================================
           GET A QUOTE CLICK
        ================================================= */

        if (el.quoteBtn) {

            el.quoteBtn.addEventListener(
                "click",
                function () {

                    /*
                     * Remember that contact-us.html
                     * was reached through GET A QUOTE.
                     */

                    sessionStorage.setItem(
                        ACTIVE_SOURCE_KEY,
                        "quote"
                    );


                    /*
                     * Show Quote as active immediately
                     * before navigation.
                     */

                    activateQuote();


                    closeMenu();

                }
            );

        }


        /* =================================================
           NORMAL NAVIGATION LINKS
        ================================================= */

        el.nav
            .querySelectorAll(
                ".grid-nav-item"
            )
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        const page =
                            (
                                link.getAttribute(
                                    "data-page"
                                ) || ""
                            )
                            .split("/")
                            .pop()
                            .toLowerCase();


                        /* =================================
                           CONTACT US
                        ================================= */

                        if (
                            page === "contact-us.html" ||
                            page === "contact.html"
                        ) {

                            /*
                             * Contact was clicked directly.
                             */

                            sessionStorage.setItem(
                                ACTIVE_SOURCE_KEY,
                                "contact"
                            );


                            activateContact();

                        }


                        /* =================================
                           ALL OTHER PAGES
                        ================================= */

                        else {

                            /*
                             * Remove any old Quote/Contact
                             * state immediately.
                             */

                            sessionStorage.removeItem(
                                ACTIVE_SOURCE_KEY
                            );


                            /*
                             * Highlight clicked page
                             * immediately.
                             */

                            activatePage(
                                page
                            );

                        }


                        closeMenu();

                    }
                );

            });


        /* =================================================
           SERVICE LINKS
        ================================================= */

        el.nav
            .querySelectorAll(
                ".grid-service-link"
            )
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        sessionStorage.removeItem(
                            ACTIVE_SOURCE_KEY
                        );


                        clearActiveStates();


                        closeMenu();

                    }
                );

            });


        /* =================================================
           ESCAPE KEY
        ================================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           RESIZE
        ================================================= */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            if (
                                window.innerWidth > 850
                            ) {

                                closeMenu();

                            }

                        },
                        100
                    );

            }
        );


        /* =================================================
           PAGE SHOW
        ================================================= */

        window.addEventListener(
            "pageshow",
            function () {

                closeMenu();

                restoreActiveState();

            }
        );


        /* =================================================
           INITIAL STATE
        ================================================= */

        restoreActiveState();

    }


    /* =====================================================
       START
    ===================================================== */

    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initNavbar,
            {
                once: true
            }
        );

    } else {

        initNavbar();

    }

})();
