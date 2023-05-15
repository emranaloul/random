
let employees = JSON.parse(localStorage.getItem('employees'))

let id =  new URLSearchParams(window.location.search).get('id')

setTimeout(()=>{

    let employee = employees.find(val => val.id === id)
    let placeholder = document.getElementById('placeholder-glow')
    placeholder.classList.add('hide')
    let placeholderImg = document.getElementById('placeholder-img')
    placeholderImg.classList.add('hide')
    let employeeImg = document.getElementById('employee-img')
    employeeImg.classList.remove('hide')
    document.getElementById('card-title').innerHTML = `Name: ${employee.firstName} ${employee.lastName}`
    
    document.getElementById('card-subtitle').innerHTML = `Role: ${employee.role}`

}, 1000)
