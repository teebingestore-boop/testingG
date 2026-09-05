/* =========================================================
   COUNTRY DATA
   Canada is permanently the default on every page load.
   Real flags are loaded from flagcdn.com.
========================================================= */

const countries = [
    ["Canada", "ca", "+1"],
    ["United States of America (USA)", "us", "+1"],
    ["United Kingdom", "gb", "+44"],
    ["Australia", "au", "+61"],
    ["India", "in", "+91"],
    ["United Arab Emirates", "ae", "+971"],
    ["Saudi Arabia", "sa", "+966"],
    ["Qatar", "qa", "+974"],
    ["Oman", "om", "+968"],
    ["Germany", "de", "+49"],
    ["France", "fr", "+33"],
    ["Italy", "it", "+39"],
    ["Netherlands", "nl", "+31"],
    ["Singapore", "sg", "+65"],
    ["China", "cn", "+86"],
    ["Japan", "jp", "+81"],
    ["South Korea", "kr", "+82"],
    ["Pakistan", "pk", "+92"],
    ["Nepal", "np", "+977"],
    ["Bangladesh", "bd", "+880"],
    ["South Africa", "za", "+27"],
    ["New Zealand", "nz", "+64"],
    ["Brazil", "br", "+55"],
    ["Mexico", "mx", "+52"],
    ["Spain", "es", "+34"],
    ["Switzerland", "ch", "+41"],
    ["Sweden", "se", "+46"],
    ["Norway", "no", "+47"],
    ["Denmark", "dk", "+45"],
    ["Ireland", "ie", "+353"],
    ["Belgium", "be", "+32"],
    ["Austria", "at", "+43"],
    ["Poland", "pl", "+48"],
    ["Turkey", "tr", "+90"],
    ["Egypt", "eg", "+20"],
    ["Israel", "il", "+972"],
    ["Kuwait", "kw", "+965"],
    ["Bahrain", "bh", "+973"],
    ["Jordan", "jo", "+962"],
    ["Other", "un", ""]
];


const flagURL = code =>
    `https://flagcdn.com/w40/${code}.png`;


/* =========================================================
   COUNTRY ELEMENTS
========================================================= */

const countryDisplay =
    document.getElementById("countryDisplay");

const countryMenu =
    document.getElementById("countryMenu");

const countryFlag =
    document.getElementById("countryFlag");

const countryDisplayName =
    document.getElementById("countryDisplayName");

const countryInput =
    document.getElementById("countryInput");


/* =========================================================
   PHONE COUNTRY ELEMENTS
========================================================= */

const phoneCountryBtn =
    document.getElementById("phoneCountryBtn");

const phoneCountryMenu =
    document.getElementById("phoneCountryMenu");

const phoneFlag =
    document.getElementById("phoneFlag");

const phoneCode =
    document.getElementById("phoneCode");

const phoneNumber =
    document.getElementById("phoneNumber");


/* =========================================================
   BUILD COUNTRY MENUS
========================================================= */

function buildCountryMenus() {

    countryMenu.innerHTML = "";
    phoneCountryMenu.innerHTML = "";


    countries.forEach(([name, code, dial]) => {

        /* COUNTRY DROPDOWN */

        const item =
            document.createElement("div");

        item.className =
            "country-option";

        item.dataset.code =
            code;


        item.innerHTML = `
            <img
                class="flag-img"
                src="${flagURL(code)}"
                alt="${name}"
            >

            <span class="country-name">
                ${name}
            </span>

            <span>
                ${dial}
            </span>
        `;


        item.addEventListener(
            "click",
            () => selectCountry(
                name,
                code,
                dial
            )
        );


        countryMenu.appendChild(item);



        /* PHONE COUNTRY DROPDOWN */

        const phoneItem =
            document.createElement("div");

        phoneItem.className =
            "phone-country-option";

        phoneItem.dataset.code =
            code;


        phoneItem.innerHTML = `
            <img
                class="flag-img"
                src="${flagURL(code)}"
                alt="${name}"
            >

            <span class="country-name">
                ${name}
            </span>

            <span class="country-code">
                ${dial}
            </span>
        `;


        phoneItem.addEventListener(
            "click",
            () => selectCountry(
                name,
                code,
                dial
            )
        );


        phoneCountryMenu.appendChild(
            phoneItem
        );

    });

}


/* =========================================================
   SELECT COUNTRY
========================================================= */

function selectCountry(
    name,
    code,
    dial
) {

    /* COUNTRY FIELD */

    countryFlag.src =
        flagURL(code);

    countryFlag.alt =
        name;

    countryDisplayName.textContent =
        name;

    countryInput.value =
        name;


    /* PHONE FIELD */

    phoneFlag.src =
        flagURL(code);

    phoneFlag.alt =
        name;

    phoneCode.textContent =
        dial || "";


    /* CLOSE DROPDOWNS */

    phoneCountryMenu.classList.remove(
        "show"
    );

    countryMenu.classList.remove(
        "show"
    );


    /* SELECTED COUNTRY */

    document
        .querySelectorAll(".country-option")
        .forEach(el => {

            el.classList.toggle(
                "selected",
                el.dataset.code === code
            );

        });


    /* PHONE PLACEHOLDER */

    if (dial === "+1") {

        phoneNumber.placeholder =
            "000 000 0000";

    } else if (dial) {

        phoneNumber.placeholder =
            "000 000 0000";

    } else {

        phoneNumber.placeholder =
            "Phone number";

    }

}


/* =========================================================
   INITIALIZE
========================================================= */

buildCountryMenus();


/*
   CANADA IS ALWAYS DEFAULT
   WHEN PAGE OPENS.
*/

selectCountry(
    "Canada",
    "ca",
    "+1"
);


/* =========================================================
   COUNTRY DROPDOWN
========================================================= */

countryDisplay.addEventListener(
    "click",
    function(e) {

        e.stopPropagation();

        countryMenu.classList.toggle(
            "show"
        );

        phoneCountryMenu.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   PHONE COUNTRY DROPDOWN
========================================================= */

phoneCountryBtn.addEventListener(
    "click",
    function(e) {

        e.stopPropagation();

        phoneCountryMenu.classList.toggle(
            "show"
        );

        countryMenu.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   CLOSE COUNTRY DROPDOWNS
========================================================= */

document.addEventListener(
    "click",
    function(e) {

        if (
            !e.target.closest(
                "#countrySelectWrap"
            )
        ) {

            countryMenu.classList.remove(
                "show"
            );

        }


        if (
            !e.target.closest(
                "#phoneCountry"
            )
        ) {

            phoneCountryMenu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   SERVICE MULTI SELECT
========================================================= */

const serviceControl =
    document.getElementById(
        "serviceControl"
    );

const serviceOptions =
    document.getElementById(
        "serviceOptions"
    );

const servicePlaceholder =
    document.getElementById(
        "servicePlaceholder"
    );

const options =
    document.querySelectorAll(
        ".service-option"
    );


/* =========================================================
   OPEN / CLOSE SERVICE DROPDOWN
========================================================= */

serviceControl.addEventListener(
    "click",
    function() {

        serviceOptions.classList.toggle(
            "show"
        );

        serviceControl.classList.toggle(
            "open",
            serviceOptions.classList.contains(
                "show"
            )
        );

    }
);


/* =========================================================
   SERVICE KEYBOARD
========================================================= */

serviceControl.addEventListener(
    "keydown",
    function(e) {

        if (
            e.key === "Enter" ||
            e.key === " "
        ) {

            e.preventDefault();

            serviceOptions.classList.toggle(
                "show"
            );

            serviceControl.classList.toggle(
                "open",
                serviceOptions.classList.contains(
                    "show"
                )
            );

        }

    }
);


/* =========================================================
   UPDATE SELECTED SERVICES
========================================================= */

function updateServices() {

    const selected =
        document.querySelectorAll(
            '.service-option input:checked'
        );


    /* REMOVE OLD CHIPS */

    document
        .querySelectorAll(
            ".service-chip"
        )
        .forEach(
            chip => chip.remove()
        );


    /* NO SERVICE SELECTED */

    if (selected.length === 0) {

        servicePlaceholder.style.display =
            "inline-block";

        return;

    }


    servicePlaceholder.style.display =
        "none";


    /* CREATE CHIPS */

    selected.forEach(input => {

        const chip =
            document.createElement(
                "span"
            );


        chip.className =
            "service-chip";


        chip.innerHTML = `
            ${input.value}

            <button
                type="button"
                aria-label="Remove ${input.value}"
            >
                ×
            </button>
        `;


        const removeButton =
            chip.querySelector(
                "button"
            );


        removeButton.addEventListener(
            "click",
            function(e) {

                e.stopPropagation();

                input.checked =
                    false;

                input.closest(
                    ".service-option"
                ).classList.remove(
                    "selected"
                );

                updateServices();

            }
        );


        serviceControl.insertBefore(
            chip,
            servicePlaceholder
        );

    });

}


/* =========================================================
   SERVICE CHECKBOX CHANGE
========================================================= */

options.forEach(option => {

    const input =
        option.querySelector(
            "input"
        );


    input.addEventListener(
        "change",
        function() {

            option.classList.toggle(
                "selected",
                input.checked
            );

            updateServices();

        }
    );

});


/* =========================================================
   CLOSE SERVICE DROPDOWN OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    function(e) {

        if (
            !e.target.closest(
                ".service-select"
            )
        ) {

            serviceOptions.classList.remove(
                "show"
            );

            serviceControl.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   FORM
========================================================= */

const form =
    document.getElementById(
        "contactForm"
    );


form.addEventListener(
    "submit",
    function(e) {

        e.preventDefault();


        const selectedServices =
            Array.from(
                document.querySelectorAll(
                    '.service-option input:checked'
                )
            ).map(
                input => input.value
            );


        /* SERVICE REQUIRED */

        if (
            selectedServices.length === 0
        ) {

            alert(
                "Please select at least one service."
            );


            serviceOptions.classList.add(
                "show"
            );

            serviceControl.classList.add(
                "open"
            );

            return;

        }


        /*
           FORM BACKEND YAHAN
           CONNECT KIYA JA SAKTA HAI.

           FILHAAL DEMO SUBMISSION.
        */

        alert(
            "Thank you! Your enquiry has been received."
        );


        form.reset();


        /* RESET SERVICES */

        document
            .querySelectorAll(
                ".service-option"
            )
            .forEach(option => {

                option.classList.remove(
                    "selected"
                );

            });


        updateServices();


        /*
           AFTER FORM RESET
           CANADA AGAIN DEFAULT.
        */

        selectCountry(
            "Canada",
            "ca",
            "+1"
        );

    }
);