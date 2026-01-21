import { colorHtml } from "./colorHtml.js";

const colorContainerEl = document.querySelector('.colors')
const colorFormEl = document.querySelector('.color-form')

// FORM SUBMIT
colorFormEl.addEventListener('submit', getData)

// GET FORM DATA
function getData(e) {
    e.preventDefault()

    const formData = new FormData(e.target)

    const color = formData.get('color')
    const colorMode = formData.get('mode')

    // fetch color scheme
    const baseUrl = 'https://www.thecolorapi.com/scheme'

    const params = new URLSearchParams();

    params.append('hex', color)
    params.append('mode', colorMode)
    params.append('count', 5)

    const queryString = params.toString()
    
    const finalUrl = `${baseUrl}?${queryString}`

    getColor(finalUrl)
}

// GET COLOR SCHEME
async function getColor(url) {
    colorContainerEl.innerHTML = `<span class="message">Loading...</span>`
    try {
        const res = await fetch(url)

        if(res.status === 404) {
            colorContainerEl.innerHTML = `<span class="message">Color not found 😔</span>`
            return
        }
        if(!res.ok) {
            colorContainerEl.innerHTML = `<span class="message">Failed to load color 😓</span>`
            return
        }

        const data = await res.json()
        renderColor(data)
    }
     catch (error) {
        colorContainerEl.textContent = `<span class="message">Failed to load color 😓</span>`
    } 
}

// RENDER COLOR SCHEME 
function renderColor(data) {
    colorContainerEl.innerHTML = ''

    const fragment = document.createDocumentFragment()

    data.colors.forEach(color => {
        fragment.append(colorHtml(color))
    })
        colorContainerEl.append(fragment)
}

// POSITION COPY COLOR TOOL-TIP WITH CURSOR ON CLICK 
document.addEventListener('click', (e) => {
    if(e.target.closest('.swatch')) {
        copyColor(e)
    }
})

function copyColor(e) {
    const element = e.target
    const colorEl = element.closest(".color");
    const hexText = colorEl.dataset.hex
    
    navigator.clipboard.writeText(hexText)
    showTooltip(e)
}

function showTooltip(e) {
    const element = e.target
    const tooltipEl = element.querySelector(".tooltip");
        const swatch = element.closest(".swatch");

        const rect = swatch.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        tooltipEl.style.left = `${x}px`;
        tooltipEl.style.top = `${y}px`;

        tooltipEl.classList.add("show");

        // auto hide
        setTimeout(() => {
                tooltipEl.classList.remove("show");
        }, 1000);
}

