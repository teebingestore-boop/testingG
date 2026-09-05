/* =========================================================
   GRID DETAILING
   COMPONENT LOADER
   Navbar + Footer + Floating Components
========================================================= */

(async function loadComponents(){

    const components = [
        ["navbar-component", "components/navbar.html"],
        ["footer-component", "components/footer.html"],
        ["floating-component", "components/floating.html"]
    ];


    /* =====================================================
       LOAD COMPONENT
    ===================================================== */

    async function loadInto(targetId, file){

        const target =
            document.getElementById(targetId);


        if(!target){

            console.warn(
                `Grid Detailing: #${targetId} not found.`
            );

            return;
        }


        try{

            const response =
                await fetch(file);


            if(!response.ok){

                throw new Error(
                    `${file}: ${response.status}`
                );

            }


            target.innerHTML =
                await response.text();


        }catch(error){

            console.error(
                `Grid Detailing: Could not load ${file}`,
                error
            );

        }

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    function setActiveNavigation(){

        let currentPage =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();


        if(!currentPage){

            currentPage =
                "index.html";

        }


        /* =================================================
           REMOVE ALL ACTIVE STATES
        ================================================= */

        document
            .querySelectorAll(
                ".nav-item, .nav-dropdown-wrap, .service-menu-card"
            )
            .forEach(item => {

                item.classList.remove(
                    "active"
                );

                item.removeAttribute(
                    "aria-current"
                );

            });


        /* =================================================
           RESET SERVICES DROPDOWN STATE
        ================================================= */

        const servicesButton =
            document.querySelector(
                ".nav-dropdown-btn"
            );


        const servicesWrap =
            document.querySelector(
                ".nav-dropdown-wrap"
            );


        if(servicesButton){

            servicesButton.classList.remove(
                "active"
            );

            servicesButton.setAttribute(
                "aria-expanded",
                "false"
            );

            servicesButton.removeAttribute(
                "aria-current"
            );

        }


        if(servicesWrap){

            servicesWrap.classList.remove(
                "active"
            );

        }


        /* =================================================
           CONTACT US
        ================================================= */

        if(
            currentPage === "contact-us.html" ||
            currentPage === "contact.html"
        ){

            let contactLink =
                document.querySelector(
                    '[data-page="contact-us.html"]'
                );


            if(!contactLink){

                contactLink =
                    document.querySelector(
                        'a[href="contact-us.html"]'
                    );

            }


            if(!contactLink){

                contactLink =
                    document.querySelector(
                        'a[href*="contact-us.html"]'
                    );

            }


            if(contactLink){

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

        if(
            currentPage === "blog.html"
        ){

            const blogLink =
                document.querySelector(
                    'a[href="blog.html"]'
                );


            if(blogLink){

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

        if(
            currentPage === "projects.html"
        ){

            const projectsLink =
                document.querySelector(
                    'a[href="projects.html"]'
                );


            if(projectsLink){

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
           ABOUT US
        ================================================= */

        if(
            currentPage === "about.html" ||
            currentPage === "about-us.html"
        ){

            let aboutLink =
                document.querySelector(
                    'a[href="about.html"]'
                );


            if(!aboutLink){

                aboutLink =
                    document.querySelector(
                        'a[href="about-us.html"]'
                    );

            }


            if(aboutLink){

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
           STRUCTURAL STEEL DETAILING
        ================================================= */

        if(
            currentPage ===
            "structural-steel-detailing.html"
        ){

            if(servicesButton){

                servicesButton.classList.add(
                    "active"
                );

                /*
                 * Do NOT force the dropdown open here.
                 * main.js controls the actual dropdown.
                 */

                servicesButton.setAttribute(
                    "aria-current",
                    "page"
                );

            }


            if(servicesWrap){

                servicesWrap.classList.add(
                    "active"
                );

            }


            let structuralSteelLink =
                document.querySelector(
                    '[data-page="structural-steel-detailing.html"]'
                );


            if(!structuralSteelLink){

                structuralSteelLink =
                    document.querySelector(
                        'a[href="structural-steel-detailing.html"]'
                    );

            }


            if(structuralSteelLink){

                structuralSteelLink.classList.add(
                    "active"
                );

                structuralSteelLink.setAttribute(
                    "aria-current",
                    "page"
                );

            }

            return;

        }


        /* =================================================
           HOME
        ================================================= */

        if(
            currentPage === "index.html"
        ){

            const homeLink =
                document.querySelector(
                    'a[href="index.html#home"], ' +
                    'a[href="index.html"], ' +
                    'a[href="./index.html#home"], ' +
                    'a[href="./index.html"]'
                );


            if(homeLink){

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
       LOAD COMPONENTS
    ===================================================== */

    try{

        await Promise.all(

            components.map(
                ([targetId, file]) =>
                    loadInto(
                        targetId,
                        file
                    )
            )

        );


        /* =================================================
           NAVBAR COMPONENT IS NOW READY
        ================================================= */

        setActiveNavigation();


        /* =================================================
           LOAD MAIN JS ONLY ONCE
        ================================================= */

        if(
            !document.querySelector(
                'script[data-grid-main-js="true"]'
            )
        ){

            const script =
                document.createElement(
                    "script"
                );


            /*
             * MAIN JS
             *
             * This file contains:
             * - Mobile menu
             * - Services dropdown
             * - Navbar scroll
             * - Hero slider
             * - Project slider
             * - Counters
             * - Scroll reveal
             * - AI assistant
             * - Other main functionality
             */

            script.src =
                "js/main.js";


            script.dataset.gridMainJs =
                "true";


            script.onload = function(){

                /*
                 * Navbar has already been injected.
                 * main.js is now ready.
                 */

                setTimeout(
                    function(){

                        setActiveNavigation();

                    },
                    50
                );

            };


            script.onerror = function(){

                console.error(
                    "Grid Detailing: js/main.js could not be loaded."
                );

            };


            document.body.appendChild(
                script
            );

        }else{

            /*
             * main.js already exists.
             * Just refresh active navigation.
             */

            setActiveNavigation();

        }


    }catch(error){

        console.error(
            "Grid Detailing component loading error:",
            error
        );

    }

})();