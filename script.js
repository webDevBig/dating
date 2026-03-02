// open/close accordion when another is opened . faq section
const checkboxes = document.querySelectorAll('.accordion input[type="checkbox"]');

checkboxes.forEach(box => {
    box.addEventListener('change', function () {

        if (this.checked) {
            checkboxes.forEach(cb => {
                if (cb !== this) {
                    cb.checked = false;
                    cb.nextElementSibling.setAttribute('aria-expanded', 'false');
                }
            });
            this.nextElementSibling.setAttribute('aria-expanded', 'true');
        } else {
            this.nextElementSibling.setAttribute('aria-expanded', 'false');
        }

    });
});

// star rating
const STAR_PATH = "M12 .587l3.668 7.431 8.2 1.193-5.934 5.787 1.402 8.168L12 18.897l-7.336 3.869 1.402-8.168L.132 9.211l8.2-1.193z";

document.querySelectorAll('.rating').forEach(rating => {
    const value = parseFloat(rating.dataset.rating);
    const starsContainer = rating.querySelector('.stars');

    const ratingOutOf5 = value / 2;

    for (let i = 1; i <= 5; i++) {
        let fillPercent = 0;

        if (ratingOutOf5 >= i) {
            fillPercent = 100;
        } else if (ratingOutOf5 > i - 1) {
            fillPercent = (ratingOutOf5 - (i - 1)) * 100;
        }

        const gradientId = `grad-${Math.random().toString(36).substr(2, 9)}`;
        const strokeColor = fillPercent > 0 ? "#F9CF13" : "#C5C5C5";

        const svg = `
        <svg viewBox="0 0 24 24" class="star">
            <defs>
                <linearGradient id="${gradientId}">
                    <stop offset="${fillPercent}%" stop-color="#F9CF13"/>
                    <stop offset="${fillPercent}%" stop-color="#fff"/>
                </linearGradient>
            </defs>
            <path d="${STAR_PATH}"
                  fill="url(#${gradientId})"
                  stroke="${strokeColor}"
                  stroke-width="1"/>
        </svg>
        `;

        starsContainer.insertAdjacentHTML('beforeend', svg);
    }
});

// mobile menu
const toggle = document.querySelector('.menu-toggle');
const body = document.body;

let scrollPosition = 0;

toggle.addEventListener('click', () => {

    if (!body.classList.contains('menu-open')) {
        scrollPosition = window.scrollY;
        body.style.top = `-${scrollPosition}px`;
        body.classList.add('menu-open');
    } else {
        body.classList.remove('menu-open');
        body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }

});
// sub-menu
const subMenus = document.querySelectorAll('.has-sub > a');

subMenus.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();

        const parent = item.parentElement;
        document.querySelectorAll('.has-sub').forEach(el => {
            if (el !== parent) {
                el.classList.remove('active');
            }
        });


        parent.classList.toggle('active');
    });
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.has-sub')) {
        document.querySelectorAll('.has-sub').forEach(el => {
            el.classList.remove('active');
        });
    }
});