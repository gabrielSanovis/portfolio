/*ANIMAÇÃO DA PÁGINA*/ 

const debounce = function(func, wait, immediate) {
var hamburguer = document.querySelector(".hamburguer");

hamburguer.addEventListener("click", ()=>
document.querySelector(".container").classList.toggle("show-menu")
);

const target = document.querySelectorAll("[data-anime]")
const animationClass = 'animate'


    let timeout
    return function(...args) {
        const context = this
        const later = function () {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        const callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}

function animeScroll() {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    target.forEach(function(element) {
        if((windowTop) > element.offsetTop) {
            element.classList.add(animationClass)
        } else {
            element.classList.remove(animationClass)
        }
    })
}

animeScroll()

if(target.length) {  
    animeScroll()
    window.addEventListener('scroll', debounce(function() {
        animeScroll()
    }, 400))
}

/*PARTE QUE CALCULA O ORÇAMENTO (É PARTE DO ORÇAMENTO-PAGE) */

document.querySelector("#qtde").addEventListener("change", atualizarPreco)
document.querySelector("#js").addEventListener("change", atualizarPreco)
document.querySelector("#layout-sim").addEventListener("change", atualizarPreco)
document.querySelector("#layout-nao").addEventListener("change", atualizarPreco)
document.querySelector("#prazo").addEventListener("change", () => {
    const prazo = document.querySelector("#prazo").value
    document.querySelector("label[for=prazo]").innerHTML = `Prazo ${prazo} semanas`
    atualizarPreco()
})
function atualizarPreco () {
    const qtde = document.querySelector("#qtde").value
    const temJS = document.querySelector("#js").checked
    const incluiLayout = document.querySelector("#layout-sim").checked
    const prazo = document.querySelector("#prazo").value
    let preco = qtde * 100
    if(temJS) {
        preco *= 1.1
    }
    if(incluiLayout) {
        preco += 500
    }
    let taxaUrgencia = 1 - prazo * 0.1
    preco *= 1 + taxaUrgencia
    document.querySelector("#preco").innerHTML = `R$ ${preco.toFixed(2)}`
}