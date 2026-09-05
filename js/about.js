/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal, .stagger");


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold:0.12,

            rootMargin:"0px 0px -60px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});



/* =========================================================
   MOUSE PARALLAX — DESKTOP ONLY
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


if(
    heroVisual &&
    window.matchMedia("(min-width: 761px)").matches
){

    heroVisual.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroVisual.getBoundingClientRect();

            const x =
                (event.clientX - rect.left)
                / rect.width
                - .5;

            const y =
                (event.clientY - rect.top)
                / rect.height
                - .5;

            const frame =
                heroVisual.querySelector(".tech-frame");

            if(frame){

                frame.style.transform =
                    `
                    perspective(1100px)
                    rotateY(${x * -8 - 7}deg)
                    rotateX(${y * 5 + 2}deg)
                    translateY(${y * -6}px)
                    `;
            }

        }
    );


    heroVisual.addEventListener(
        "mouseleave",
        () => {

            const frame =
                heroVisual.querySelector(".tech-frame");

            if(frame){

                frame.style.transform =
                    `
                    perspective(1100px)
                    rotateY(-7deg)
                    rotateX(2deg)
                    `;
            }

        }
    );

}