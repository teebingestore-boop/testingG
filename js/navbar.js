/* =========================================================
   GRID STEEL DETAILING — NAVBAR JAVASCRIPT

   FINAL STABLE ACTIVE STATE

   Supports:
   /index.html
   /
   /about.html
   /about
   /structural-steel-detailing.html
   /structural-steel-detailing
   /projects.html
   /projects
   /how-we-work.html
   /how-we-work
   /contact-us.html
   /contact-us

   GET A QUOTE
   → contact-us.html / contact-us
   → GET A QUOTE ACTIVE
   → CONTACT US NOT ACTIVE

   CONTACT US
   → contact-us.html / contact-us
   → CONTACT US ACTIVE
   → GET A QUOTE NOT ACTIVE

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

       Used ONLY to distinguish:

       CONTACT US
       vs
       GET A QUOTE

       Both open the same contact page.
    ===================================================== */

    const ACTIVE_SOURCE_KEY =
        "gridNavbarActiveSource";


    /* =====================================================
       GET NAVBAR ELEMENTS
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
                document.querySelector(
                    ".grid-quote-btn"
                ),

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


        /* =================================================
           WAIT FOR NAVBAR HTML
        ================================================= */

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

            el.nav.classList.add(
                "open"
            );


            if (el.menuBtn) {

                el.menuBtn.classList.add(
                    "active"
                );

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

                el.overlay.classList.add(
                    "active"
                );

            }


            document.body.classList.add(
                "grid-nav-menu-open"
            );

        }


        /* =================================================
           MOBILE MENU — CLOSE
        ================================================= */

        function closeMenu() {

            el.nav.classList.remove(
                "open"
            );


            if (el.menuBtn) {

                el.menuBtn.classList.remove(
                    "active"
                );

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

                el.overlay.classList.remove(
                    "active"
                );

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
                        el.nav.classList.contains(
                            "open"
                        )
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
           CLEAR ACTIVE STATES
        ================================================= */

        function clearActiveStates() {

            document
                .querySelectorAll(
                    ".grid-nav-item, .grid-service-link, .grid-quote-btn"
                )
                .forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                        item.classList.remove(
                            "quote-source-active"
                        );

                        item.removeAttribute(
                            "aria-current"
                        );

                    }
                );

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
             * CONTACT US must remain inactive
             * when GET A QUOTE is the source.
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
           NORMALIZE PAGE NAME
           
           Converts:

           about
           about.html

           into:

           about.html
        ================================================= */

        function normalizePage(page) {

            if (!page) {

                return "index.html";

            }


            page =
                page
                    .split("?")[0]
                    .split("#")[0]
                    .split("/")
                    .filter(Boolean)
                    .pop() || "index.html";


            page =
                decodeURIComponent(page)
                    .toLowerCase()
                    .trim();


            /*
             * Root URL
             */

            if (!page) {

                return "index.html";

            }


            /*
             * Netlify pretty URL

             * about
             * projects
             * contact-us

             * becomes:

             * about.html
             * projects.html
             * contact-us.html
             */

            if (
                !page.includes(".")
            ) {

                page += ".html";

            }


            return page;

        }


        /* =================================================
           GET CURRENT PAGE
        ================================================= */

        function getCurrentPage() {

            const pathname =
                window.location.pathname || "";


            /*
             * Root website
             *
             * /
             *
             * means Home.
             */

            if (
                pathname === "/" ||
                pathname === ""
            ) {

                return "index.html";

            }


            return normalizePage(
                pathname
            );

        }


        /* =================================================
           ACTIVATE NORMAL PAGE
        ================================================= */

        function activatePage(page) {

            clearActiveStates();


            const targetPage =
                normalizePage(
                    page
                );


            const navItems =
                el.nav.querySelectorAll(
                    ".grid-nav-item[data-page]"
                );


            navItems.forEach(
                function (item) {

                    const itemPage =
                        normalizePage(
                            item.getAttribute(
                                "data-page"
                            )
                        );


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

                }
            );

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
                 * GET A QUOTE → Contact page
                 */

                if (
                    source === "quote"
                ) {

                    activateQuote();

                    return;

                }


                /*
                 * Direct CONTACT US
                 *
                 * Default contact state.
                 */

                activateContact();

                return;

            }


            /* =============================================
               ALL OTHER PAGES
            ============================================= */

            /*
             * Quote/contact source has no meaning
             * on other pages.
             */

            sessionStorage.removeItem(
                ACTIVE_SOURCE_KEY
            );


            /*
             * IMPORTANT:
             *
             * Active state comes from CURRENT URL.
             *
             * This works with both:
             *
             * /about
             *
             * /about.html
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
                     * Remember that contact page
                     * was opened through GET A QUOTE.
                     */

                    sessionStorage.setItem(
                        ACTIVE_SOURCE_KEY,
                        "quote"
                    );


                    /*
                     * Immediately highlight Quote.
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
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function () {

                            const page =
                                normalizePage(
                                    link.getAttribute(
                                        "data-page"
                                    )
                                );


                            /* =================================
                               CONTACT US
                            ================================= */

                            if (
                                page === "contact-us.html" ||
                                page === "contact.html"
                            ) {

                                /*
                                 * Direct Contact click.
                                 */

                                sessionStorage.setItem(
                                    ACTIVE_SOURCE_KEY,
                                    "contact"
                                );


                                activateContact();

                            }


                            /* =================================
                               NORMAL PAGES
                            ================================= */

                            else {

                                /*
                                 * Remove old special state.
                                 */

                                sessionStorage.removeItem(
                                    ACTIVE_SOURCE_KEY
                                );


                                /*
                                 * Immediately highlight
                                 * clicked navigation item.
                                 */

                                activatePage(
                                    page
                                );

                            }


                            closeMenu();

                        }
                    );

                }
            );


        /* =================================================
           SERVICE LINKS
        ================================================= */

        el.nav
            .querySelectorAll(
                ".grid-service-link"
            )
            .forEach(
                function (link) {

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

                }
            );


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
           INITIAL ACTIVE STATE
        ================================================= */

        restoreActiveState();

    }


    /* =====================================================
       START NAVBAR
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
