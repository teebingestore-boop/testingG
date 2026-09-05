/* =========================================================
   GRID DETAILING — PROJECTS JS
   FULL UPDATED VERSION
   ========================================================= */


/* =========================================================
   PROJECT FILTER
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const projectCards =
        document.querySelectorAll(".project-card");


    /*
       IMPORTANT:
       Exact category matching.

       Example:

       data-category="steel commercial"

       will match:
       STRUCTURAL STEEL
       COMMERCIAL

       But it will NOT accidentally match
       another unrelated category.
    */

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                String(button.dataset.filter || "")
                    .trim()
                    .toLowerCase();


            /* ---------------------------------------------
               ACTIVE BUTTON
            --------------------------------------------- */

            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");


            /* ---------------------------------------------
               FILTER PROJECT CARDS
            --------------------------------------------- */

            projectCards.forEach(card => {

                const categoryString =
                    String(card.dataset.category || "")
                        .trim()
                        .toLowerCase();


                /*
                   Convert:

                   "steel commercial"

                   into:

                   ["steel", "commercial"]
                */

                const categories =
                    categoryString
                        .split(/\s+/)
                        .filter(Boolean);


                /*
                   ALL PROJECTS
                */

                if (filter === "all") {

                    card.classList.remove("hidden");

                    return;
                }


                /*
                   EXACT CATEGORY MATCH
                */

                const shouldShow =
                    categories.includes(filter);


                if (shouldShow) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });


            /*
               Small layout refresh after filtering.
               Prevents grid/layout glitches.
            */

            requestAnimationFrame(() => {

                const visibleCards =
                    document.querySelectorAll(
                        ".project-card:not(.hidden)"
                    );

                visibleCards.forEach(card => {

                    card.style.opacity = "1";
                    card.style.visibility = "visible";

                });

            });

        });

    });


    /* =====================================================
       LIGHTBOX ELEMENTS
    ===================================================== */

    const lightbox =
        document.getElementById("projectLightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxTitle =
        document.getElementById("lightboxTitle");

    const lightboxLocation =
        document.getElementById("lightboxLocation");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const zoomIn =
        document.getElementById("zoomIn");

    const zoomOut =
        document.getElementById("zoomOut");

    const zoomReset =
        document.getElementById("zoomReset");

    const zoomLevel =
        document.getElementById("zoomLevel");

    const lightboxImageWrap =
        document.getElementById("lightboxImageWrap");


    /* =====================================================
       ZOOM + PAN STATE
    ===================================================== */

    let currentZoom = 1;

    const MIN_ZOOM = 1;
    const MAX_ZOOM = 4;
    const ZOOM_STEP = 0.25;

    let imageX = 0;
    let imageY = 0;


    /* =====================================================
       DRAG STATE
    ===================================================== */

    let isDragging = false;

    let dragStartX = 0;
    let dragStartY = 0;

    let startImageX = 0;
    let startImageY = 0;


    /* =====================================================
       LIMIT IMAGE POSITION
    ===================================================== */

    function limitPosition() {

        if (!lightboxImageWrap) {
            return;
        }


        /*
           At normal size image remains centered.
        */

        if (currentZoom <= 1) {

            imageX = 0;
            imageY = 0;

            return;
        }


        const containerWidth =
            lightboxImageWrap.clientWidth;

        const containerHeight =
            lightboxImageWrap.clientHeight;


        /*
           Calculate actual scaled image dimensions.
           This is more accurate than using only
           container size.
        */

        const naturalWidth =
            lightboxImage.naturalWidth || 0;

        const naturalHeight =
            lightboxImage.naturalHeight || 0;


        let maxX;
        let maxY;


        if (
            naturalWidth > 0 &&
            naturalHeight > 0
        ) {

            const imageRatio =
                naturalWidth / naturalHeight;

            const containerRatio =
                containerWidth / containerHeight;


            let baseWidth;
            let baseHeight;


            if (imageRatio > containerRatio) {

                baseWidth =
                    containerWidth;

                baseHeight =
                    containerWidth / imageRatio;

            } else {

                baseHeight =
                    containerHeight;

                baseWidth =
                    containerHeight * imageRatio;

            }


            const scaledWidth =
                baseWidth * currentZoom;

            const scaledHeight =
                baseHeight * currentZoom;


            maxX =
                Math.max(
                    0,
                    (scaledWidth - containerWidth) / 2
                );

            maxY =
                Math.max(
                    0,
                    (scaledHeight - containerHeight) / 2
                );

        } else {

            maxX =
                Math.max(
                    0,
                    (containerWidth * (currentZoom - 1)) / 2
                );

            maxY =
                Math.max(
                    0,
                    (containerHeight * (currentZoom - 1)) / 2
                );

        }


        imageX =
            Math.max(
                -maxX,
                Math.min(maxX, imageX)
            );

        imageY =
            Math.max(
                -maxY,
                Math.min(maxY, imageY)
            );

    }


    /* =====================================================
       UPDATE IMAGE TRANSFORM
    ===================================================== */

    function updateImageTransform() {

        if (!lightboxImage) {
            return;
        }


        limitPosition();


        lightboxImage.style.transform =
            `translate3d(${imageX}px, ${imageY}px, 0) scale(${currentZoom})`;


        if (zoomLevel) {

            zoomLevel.textContent =
                `${Math.round(currentZoom * 100)}%`;

        }

    }


    /* =====================================================
       RESET POSITION
    ===================================================== */

    function resetPosition() {

        imageX = 0;
        imageY = 0;

    }


    /* =====================================================
       UPDATE ZOOM
    ===================================================== */

    function updateZoom() {

        if (currentZoom <= 1) {

            currentZoom = 1;

            resetPosition();

        }

        updateImageTransform();

    }


    /* =====================================================
       ZOOM IN
    ===================================================== */

    function zoomInImage() {

        currentZoom =
            Math.min(
                MAX_ZOOM,
                Number(
                    (
                        currentZoom +
                        ZOOM_STEP
                    ).toFixed(2)
                )
            );

        updateImageTransform();

    }


    /* =====================================================
       ZOOM OUT
    ===================================================== */

    function zoomOutImage() {

        currentZoom =
            Math.max(
                MIN_ZOOM,
                Number(
                    (
                        currentZoom -
                        ZOOM_STEP
                    ).toFixed(2)
                )
            );


        if (currentZoom <= MIN_ZOOM) {

            currentZoom = MIN_ZOOM;

            resetPosition();

        }


        updateImageTransform();

    }


    /* =====================================================
       RESET ZOOM
    ===================================================== */

    function resetZoom() {

        currentZoom = 1;

        resetPosition();

        updateImageTransform();

    }


    /* =====================================================
       ZOOM BUTTONS
    ===================================================== */

    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                zoomInImage();

            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                zoomOutImage();

            }
        );

    }


    if (zoomReset) {

        zoomReset.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                resetZoom();

            }
        );

    }


    /* =====================================================
       OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(
        image,
        title,
        location
    ) {

        if (
            !image ||
            !lightbox ||
            !lightboxImage
        ) {

            return;

        }


        lightboxImage.src = image;

        lightboxImage.alt =
            title || "Project image";


        if (lightboxTitle) {

            lightboxTitle.textContent =
                title || "";

        }


        if (lightboxLocation) {

            lightboxLocation.textContent =
                location || "";

        }


        /*
           Reset zoom every time.
        */

        currentZoom = 1;

        resetPosition();


        lightbox.classList.add("show");

        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );


        document.body.style.touchAction =
            "none";


        /*
           Wait for image to load before
           calculating exact pan boundaries.
        */

        if (lightboxImage.complete) {

            updateImageTransform();

        } else {

            lightboxImage.onload =
                () => {

                    updateImageTransform();

                };

        }

    }


    /* =====================================================
       PROJECT VIEW BUTTONS
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(
            ".view-project"
        );


    viewButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();


                const image =
                    button.dataset.image || "";


                const title =
                    button.dataset.title || "";


                const location =
                    button.dataset.location || "";


                openLightbox(
                    image,
                    title,
                    location
                );

            }
        );

    });


    /* =====================================================
       CLICK ANYWHERE ON PROJECT IMAGE
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image"
        );


    projectImages.forEach(projectImage => {

        projectImage.addEventListener(
            "click",
            event => {

                /*
                   Don't trigger twice when
                   View Project button is clicked.
                */

                if (
                    event.target.closest(
                        ".view-project"
                    )
                ) {

                    return;

                }


                const imageElement =
                    projectImage.querySelector(
                        "img"
                    );


                if (!imageElement) {
                    return;
                }


                const viewButton =
                    projectImage.querySelector(
                        ".view-project"
                    );


                const image =
                    viewButton?.dataset.image ||
                    imageElement.currentSrc ||
                    imageElement.src;


                const title =
                    viewButton?.dataset.title ||
                    imageElement.alt ||
                    "Project Image";


                const location =
                    viewButton?.dataset.location ||
                    "";


                openLightbox(
                    image,
                    title,
                    location
                );

            }
        );

    });


    /* =====================================================
       CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove("show");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        document.body.style.touchAction =
            "";


        isDragging = false;

        resetZoom();


        setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "show"
                ) &&
                lightboxImage
            ) {

                lightboxImage.src = "";

            }

        }, 250);

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                closeLightbox();

            }
        );

    }


    /* =====================================================
       CLICK DARK BACKGROUND TO CLOSE
    ===================================================== */

    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       MOUSE WHEEL ZOOM
    ===================================================== */

    if (lightboxImageWrap) {

        lightboxImageWrap.addEventListener(
            "wheel",
            event => {

                if (
                    !lightbox ||
                    !lightbox.classList.contains(
                        "show"
                    )
                ) {

                    return;

                }


                event.preventDefault();


                if (event.deltaY < 0) {

                    zoomInImage();

                } else {

                    zoomOutImage();

                }

            },
            {
                passive: false
            }
        );

    }


    /* =====================================================
       DOUBLE CLICK ZOOM
    ===================================================== */

    if (lightboxImageWrap) {

        lightboxImageWrap.addEventListener(
            "dblclick",
            event => {

                if (
                    event.target.closest(
                        ".zoom-controls"
                    )
                ) {

                    return;

                }


                if (currentZoom === 1) {

                    currentZoom = 2;

                } else {

                    currentZoom = 1;

                    resetPosition();

                }


                updateImageTransform();

            }
        );

    }


    /* =====================================================
       MOUSE DRAG / PAN
    ===================================================== */

    if (lightboxImageWrap) {

        lightboxImageWrap.addEventListener(
            "mousedown",
            event => {

                if (currentZoom <= 1) {
                    return;
                }


                if (
                    event.target.closest(
                        ".zoom-controls"
                    )
                ) {

                    return;

                }


                isDragging = true;


                lightboxImageWrap.classList.add(
                    "dragging"
                );


                dragStartX =
                    event.clientX;

                dragStartY =
                    event.clientY;


                startImageX =
                    imageX;

                startImageY =
                    imageY;


                event.preventDefault();

            }
        );


        document.addEventListener(
            "mousemove",
            event => {

                if (!isDragging) {
                    return;
                }


                const deltaX =
                    event.clientX -
                    dragStartX;


                const deltaY =
                    event.clientY -
                    dragStartY;


                imageX =
                    startImageX +
                    deltaX;


                imageY =
                    startImageY +
                    deltaY;


                updateImageTransform();

            }
        );


        document.addEventListener(
            "mouseup",
            () => {

                if (!isDragging) {
                    return;
                }


                isDragging = false;


                lightboxImageWrap.classList.remove(
                    "dragging"
                );

            }
        );

    }


    /* =====================================================
       TOUCH PAN / MOBILE
    ===================================================== */

    let touchStartX = 0;
    let touchStartY = 0;

    let touchStartImageX = 0;
    let touchStartImageY = 0;

    let isTouchDragging = false;


    if (lightboxImageWrap) {

        lightboxImageWrap.addEventListener(
            "touchstart",
            event => {

                if (currentZoom <= 1) {
                    return;
                }


                if (
                    event.target.closest(
                        ".zoom-controls"
                    )
                ) {

                    return;

                }


                const touch =
                    event.touches[0];


                touchStartX =
                    touch.clientX;

                touchStartY =
                    touch.clientY;


                touchStartImageX =
                    imageX;

                touchStartImageY =
                    imageY;


                isTouchDragging = true;

            },
            {
                passive: false
            }
        );


        lightboxImageWrap.addEventListener(
            "touchmove",
            event => {

                if (
                    !isTouchDragging ||
                    currentZoom <= 1
                ) {

                    return;

                }


                event.preventDefault();


                const touch =
                    event.touches[0];


                const deltaX =
                    touch.clientX -
                    touchStartX;


                const deltaY =
                    touch.clientY -
                    touchStartY;


                imageX =
                    touchStartImageX +
                    deltaX;


                imageY =
                    touchStartImageY +
                    deltaY;


                updateImageTransform();

            },
            {
                passive: false
            }
        );


        lightboxImageWrap.addEventListener(
            "touchend",
            () => {

                isTouchDragging = false;

            }
        );

    }


    /* =====================================================
       KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox ||
                !lightbox.classList.contains(
                    "show"
                )
            ) {

                return;

            }


            /* ESC */

            if (
                event.key === "Escape"
            ) {

                closeLightbox();

                return;

            }


            /* ZOOM IN */

            if (
                event.key === "+" ||
                event.key === "="
            ) {

                event.preventDefault();

                zoomInImage();

            }


            /* ZOOM OUT */

            if (
                event.key === "-"
            ) {

                event.preventDefault();

                zoomOutImage();

            }


            /* RESET */

            if (
                event.key === "0"
            ) {

                event.preventDefault();

                resetZoom();

            }


            /* ARROW PAN */

            if (
                currentZoom > 1
            ) {

                const MOVE_STEP = 35;


                if (
                    event.key === "ArrowLeft"
                ) {

                    event.preventDefault();

                    imageX -= MOVE_STEP;

                    updateImageTransform();

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    event.preventDefault();

                    imageX += MOVE_STEP;

                    updateImageTransform();

                }


                if (
                    event.key === "ArrowUp"
                ) {

                    event.preventDefault();

                    imageY -= MOVE_STEP;

                    updateImageTransform();

                }


                if (
                    event.key === "ArrowDown"
                ) {

                    event.preventDefault();

                    imageY += MOVE_STEP;

                    updateImageTransform();

                }

            }

        }
    );


    /* =====================================================
       PROJECT IMAGE ERROR FALLBACK
    ===================================================== */

    document
        .querySelectorAll(".project-image img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.display = "none";


                    const parent =
                        img.closest(
                            ".project-image"
                        );


                    if (parent) {

                        parent.style.background =
                            "linear-gradient(135deg,#0F2339,#202F43)";

                    }

                }
            );

        });


    /* =====================================================
       LIGHTBOX IMAGE ERROR
    ===================================================== */

    if (lightboxImage) {

        lightboxImage.addEventListener(
            "error",
            () => {

                lightboxImage.alt =
                    "Project image unavailable";

            }
        );

    }


    /* =====================================================
       RESIZE HANDLER
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                lightbox &&
                lightbox.classList.contains(
                    "show"
                )
            ) {

                updateImageTransform();

            }

        }
    );

});