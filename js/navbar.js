/* =========================================================
   GRID DETAILING — NAVBAR JAVASCRIPT

   FINAL ACTIVE STATE FIX

   GET A QUOTE
   → contact-us.html
   → GET A QUOTE ACTIVE
   → CONTACT US NOT ACTIVE

   CONTACT US
   → contact-us.html
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
       STATE KEY
    ===================================================== */

    const ACTIVE_SOURCE_KEY =
        "gridNavbarActiveSource";


    /*
       Possible values:

       "quote"
       "contact"
       "other"
    */


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
       INITIALIZE
    ===================================================== */

    function initNavbar() {

        const el = getElements();


        if (!el.nav) {

            setTimeout(
                initNavbar,
                50
            );

            return;

        }


        /* =================================================
           PREVENT DUPLICATE
        ================================================= */

        if (
            el.nav.dataset.navInitialized === "true"
        ) {

            return;

        }

        el.nav.dataset.navInitialized = "true";


        /* =================================================
           MOBILE MENU
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
           CLEAR ACTIVE STATES
        ================================================= */

        function clearActiveStates() {

            document
                .querySelectorAll(
                    ".grid-nav-item, .grid-service-link, .grid-quote-btn"
                )
                .forEach(function (item) {

                    item.classList.remove("active");

                    item.classList.remove(
                        "quote-source-active"
                    );

                    item.removeAttribute(
                        "aria-current"
                    );

                });

        }


        /* =================================================
           SET ACTIVE — GET A QUOTE
        ================================================= */

        function activateQuote() {

            clearActiveStates();


            if (el.quoteBtn) {

                el.quoteBtn.classList.add("active");

                el.quoteBtn.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            /*
             * VERY IMPORTANT:
             * CONTACT US ko forcefully inactive rakho.
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
           SET ACTIVE — CONTACT US
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
           SET ACTIVE — NORMAL PAGE
        ================================================= */

        function activatePage(page) {

            clearActiveStates();


            const item =
                document.querySelector(
                    '.grid-nav-item[data-page="' +
                    page +
                    '"]'
                );


            if (item) {

                item.classList.add("active");

                item.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        }


        /* =================================================
           GET CURRENT PAGE
        ================================================= */

        function getCurrentPage() {

            let page =
                window.location.pathname
                    .split("/")
                    .pop()
                    .toLowerCase();


            if (!page) {

                page = "index.html";

            }


            return page;

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
                 * GET A QUOTE se aaya hai
                 */

                if (source === "quote") {

                    activateQuote();

                    return;

                }


                /*
                 * Direct CONTACT US
                 */

                if (source === "contact") {

                    activateContact();

                    return;

                }


                /*
                 * Agar koi source nahi hai,
                 * default CONTACT US.
                 */

                activateContact();

                return;

            }


            /* =============================================
               OTHER PAGES
            ============================================= */

            sessionStorage.removeItem(
                ACTIVE_SOURCE_KEY
            );


            activatePage(currentPage);

        }


        /* =================================================
           GET A QUOTE CLICK
        ================================================= */

        if (el.quoteBtn) {

            el.quoteBtn.addEventListener(
                "click",
                function () {

                    /*
                     * BEFORE PAGE CHANGES
                     * source = quote
                     */

                    sessionStorage.setItem(
                        ACTIVE_SOURCE_KEY,
                        "quote"
                    );


                    /*
                     * Immediately update UI
                     */

                    activateQuote();


                    closeMenu();

                }
            );

        }


        /* =================================================
           NAV LINKS
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
                            link.getAttribute(
                                "data-page"
                            );


                        /* =================================
                           CONTACT US
                        ================================= */

                        if (
                            page ===
                            "contact-us.html"
                        ) {

                            sessionStorage.setItem(
                                ACTIVE_SOURCE_KEY,
                                "contact"
                            );


                            activateContact();

                        }


                        /* =================================
                           OTHER NAV LINKS
                        ================================= */

                        else {

                            sessionStorage.setItem(
                                ACTIVE_SOURCE_KEY,
                                "other"
                            );


                            activatePage(page);

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

                        sessionStorage.setItem(
                            ACTIVE_SOURCE_KEY,
                            "other"
                        );


                        clearActiveStates();

                        closeMenu();

                    }
                );

            });


        /* =================================================
           ESCAPE
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
           INITIAL
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
                once:true
            }
        );

    } else {

        initNavbar();

    }

})();