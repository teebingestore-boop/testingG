/* =========================================================
   GRID STEEL DETAILING
   HOW WE WORK — JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const reveal = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }

        );

        reveal.forEach(function (item) {

            observer.observe(item);

        });

    } else {

        reveal.forEach(function (item) {

            item.classList.add("active");

        });

    }


    /* =====================================================
       3D CARD MOVEMENT
    ====================================================== */

    const cards =
        document.querySelectorAll(".process-3d-card");


    cards.forEach(function (card) {


        card.addEventListener(
            "mousemove",
            function (e) {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    e.clientX - rect.left;


                const y =
                    e.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 180;


                const rotateY =
                    (centerX - x) / 180;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-12px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            function () {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       CONNECTOR INTERACTION
    ====================================================== */

    document
        .querySelectorAll(".process-connector span")
        .forEach(function (item) {

            item.addEventListener(
                "mouseenter",
                function () {

                    item.style.transform =
                        "scale(1.12)";

                }
            );


            item.addEventListener(
                "mouseleave",
                function () {

                    item.style.transform = "";

                }
            );

        });


    /* =====================================================
       PROCESS FLOW NAVIGATION
       PLAN → MODEL → COORDINATE → DETAIL → DELIVER
    ====================================================== */

    const flowButtons =
        document.querySelectorAll(".process-flow span");


    const processCards =
        document.querySelectorAll(".process-3d-card");


    flowButtons.forEach(function (button, index) {

        button.addEventListener("click", function () {

            /*
                Each flow button corresponds to
                one process card.

                PLAN       → Step 01
                MODEL      → Step 02
                COORDINATE → Step 03
                DETAIL     → Step 04
                DELIVER    → Step 05
            */

            const targetCard =
                processCards[index];


            if (!targetCard) {
                return;
            }


            /* =============================================
               SMOOTH SCROLL
            ============================================= */

            const cardPosition =
                targetCard.getBoundingClientRect().top +
                window.pageYOffset;


            const offset = 90;


            window.scrollTo({

                top: cardPosition - offset,

                behavior: "smooth"

            });


            /* =============================================
               HIGHLIGHT EFFECT
            ============================================= */

            processCards.forEach(function (card) {

                card.classList.remove(
                    "process-selected"
                );

            });


            /*
                Small delay so the highlight appears
                after the smooth scrolling starts.
            */

            setTimeout(function () {

                targetCard.classList.add(
                    "process-selected"
                );


                /*
                    Remove highlight automatically
                    after the user has seen the effect.
                */

                setTimeout(function () {

                    targetCard.classList.remove(
                        "process-selected"
                    );

                }, 1800);


            }, 350);

        });

    });


    /* =====================================================
       KEYBOARD ACCESSIBILITY FOR FLOW BUTTONS
    ====================================================== */

    flowButtons.forEach(function (button) {

        button.setAttribute(
            "role",
            "button"
        );

        button.setAttribute(
            "tabindex",
            "0"
        );


        button.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                }

            }
        );

    });


    /* =====================================================
       REDUCED MOTION
    ====================================================== */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.style.scrollBehavior =
            "auto";

    }

});

/* =========================================================
   GRID STEEL DETAILING
   HOW WE WORK — JAVASCRIPT
========================================================= */


/* =========================================================
   INITIALIZE
========================================================= */

function initHowWeWork() {


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const reveal =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(

                function(entries) {

                    entries.forEach(function(entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold:0.12,
                    rootMargin:"0px 0px -50px 0px"
                }

            );


        reveal.forEach(function(item) {

            observer.observe(item);

        });

    } else {

        reveal.forEach(function(item) {

            item.classList.add("active");

        });

    }


    /* =====================================================
       3D CARD MOVEMENT
    ====================================================== */

    const cards =
        document.querySelectorAll(
            ".process-3d-card"
        );


    cards.forEach(function(card) {


        card.addEventListener(
            "mousemove",
            function(e) {

                if (window.innerWidth < 900) {
                    return;
                }


                const rect =
                    card.getBoundingClientRect();


                const x =
                    e.clientX - rect.left;


                const y =
                    e.clientY - rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 180;


                const rotateY =
                    (centerX - x) / 180;


                card.style.transform =
                    `
                    perspective(1200px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-12px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            function() {

                card.style.transform = "";

            }
        );

    });


    /* =====================================================
       CONNECTOR INTERACTION
    ====================================================== */

    document
        .querySelectorAll(".process-connector span")
        .forEach(function(item) {

            item.addEventListener(
                "mouseenter",
                function() {

                    item.style.transform =
                        "scale(1.12)";

                }
            );


            item.addEventListener(
                "mouseleave",
                function() {

                    item.style.transform = "";

                }
            );

        });


    /* =====================================================
       FLOW BUTTON NAVIGATION
       
       PLAN       → STEP 01
       MODEL      → STEP 02
       COORDINATE → STEP 03
       DETAIL     → STEP 04
       DELIVER    → STEP 05
    ====================================================== */

    const flowButtons =
        document.querySelectorAll(
            ".process-flow-btn"
        );


    flowButtons.forEach(function(button) {


        button.addEventListener(
            "click",
            function(event) {

                event.preventDefault();
                event.stopPropagation();


                const targetId =
                    button.getAttribute(
                        "data-target"
                    );


                if (!targetId) {
                    return;
                }


                const target =
                    document.getElementById(
                        targetId
                    );


                if (!target) {
                    console.warn(
                        "Workflow target not found:",
                        targetId
                    );

                    return;
                }


                /* =========================================
                   REMOVE OLD HIGHLIGHT
                ========================================== */

                document
                    .querySelectorAll(
                        ".process-3d-card.workflow-target-active"
                    )
                    .forEach(function(card) {

                        card.classList.remove(
                            "workflow-target-active"
                        );

                    });


                /* =========================================
                   CALCULATE SCROLL POSITION

                   Offset keeps the card nicely visible
                   instead of placing it against the top.
                ========================================== */

                const headerOffset =
                    90;


                const targetTop =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerOffset;


                /* =========================================
                   SMOOTH SCROLL
                ========================================== */

                window.scrollTo({

                    top:targetTop,

                    behavior:"smooth"

                });


                /* =========================================
                   WAIT FOR SCROLL TO START
                   THEN SHOW TARGET EFFECT
                ========================================== */

                window.setTimeout(function() {

                    target.classList.remove(
                        "workflow-target-active"
                    );


                    /* Restart animation */

                    void target.offsetWidth;


                    target.classList.add(
                        "workflow-target-active"
                    );


                },250);


                /* =========================================
                   REMOVE EFFECT AFTER DISPLAY
                ========================================== */

                window.setTimeout(function() {

                    target.classList.remove(
                        "workflow-target-active"
                    );

                },1800);

            }
        );


        /* =============================================
           KEYBOARD SUPPORT
        ============================================== */

        button.addEventListener(
            "keydown",
            function(event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    button.click();

                }

            }
        );

    });


    /* =====================================================
       MAKE SURE FLOW BUTTONS ARE CLICKABLE
    ====================================================== */

    flowButtons.forEach(function(button) {

        button.style.pointerEvents = "auto";

        button.setAttribute(
            "type",
            "button"
        );

    });

}


/* =========================================================
   START SCRIPT

   Works whether the JS loads before OR after
   DOMContentLoaded.
========================================================= */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initHowWeWork
    );

} else {

    initHowWeWork();

}