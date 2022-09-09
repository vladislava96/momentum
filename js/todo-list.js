const input = document.querySelector('#input')
const btn = document.querySelector('#btn')
const result = document.querySelector('#result')
const amount = document.querySelector('#amount')
let i = 0

btn.addEventListener('click', (e) => { 
    if (input.value === '') return
    createDeleteElement(input.value)
    input.value = ''
}) 

function createDeleteElement(value) {
    i++
    const li = document.createElement('li')
    li.className = 'li'
    li.textContent = value

    const btn2 = document.createElement('button')
    btn2.className = 'btn'
    btn2.textContent = 'X'

    result.appendChild(li)
    li.appendChild(btn2)

    btn2.addEventListener('click', (e) =>{
        i--
        amount.textContent = i
        result.removeChild(li)
    })

    li.addEventListener('click', (e) =>{
        li.classList.toggle('li-active')
    })

    amount.textContent = i
    
}