'use strict'


const formToggler = (f) =>{
    let form = document.getElementById(f)
    if(form.classList.contains('hide')){
        form.classList.remove('hide')
    } else {
        form.classList.add('hide')
    }
}
const login = user =>{
    let body = document.getElementsByTagName('body')
    localStorage.setItem('user',JSON.stringify(user))
    let greet = document.getElementById('greeting')
    greet.innerHTML = `Hello ${user.email.split('@')[0]}`
    body[0].classList?.add('loggedin') 
}
let user = localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))
user && login(user)
let getData = () => JSON.parse(localStorage.getItem('employees'))
let limit = 10
let offset = 0
let pagination = document.getElementById('pagination')
let pagesCount = (data) => Math.ceil((data ?? getData())?.length / 10)??1
let currentPage = 1
let modal = document.getElementById('modal')
const widgetContainer = document.getElementById('widget-container')
let body = document.getElementById('tableBody')
let employeeId
const closeModal = () => {
    modal.classList.remove('show')
}
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
}
document.getElementById('employees-form').addEventListener('submit', e => {
    e.preventDefault()
})
document.getElementById('employees-form').addEventListener('reset', e => {
    e.target.reset()
})
class Employee {
    constructor(firstName, lastName, role) {
        this.id = this.createId()
        this.firstName = firstName
        this.lastName = lastName
        this.role = role
    }
    createId() {
        return (Math.random() * 1000000).toFixed(0)
    }
}
const emptyPages = () => {
    let pageItems = document.querySelectorAll('#page-item')
    for (let i in pageItems) {
        Number(i) && pagination.removeChild(pageItems[i])
    }
}
let paginationFill = (data) => {
    console.log(pagesCount(data));
    for (let i = 1; i <= pagesCount(data); i++) {
        let li = document.createElement('li')
        pagination.insertBefore(li, pagination.children[pagination.children.length - 1])
        li.className = 'page-item'
        li.id = 'page-item'
        let a = document.createElement('button')
        if (i === currentPage) {
            li.classList.add('active')
        }
        a.className = 'page-link btn btn-light'
        li.appendChild(a)
        a.innerHTML = i

        a.addEventListener('click', () => {
            currentPage = i
            offset = 10 * (i - 1)
            limit = 10 * i
            fillData(data ?? getData())
        })
    }
}


const updateEmployees = e => {
    let es = JSON.parse(localStorage.getItem('employees')) ?? []
    localStorage.setItem('employees', JSON.stringify([...es, e]))
}
const toast = text => {
    const toast = document.getElementById('toast')
    const toastText = document.getElementById('toast-text')
    toastText.innerHTML = text
    toast.classList.add('show')
    setTimeout(() => toast.classList.remove('show'), 6000)
}
const submitHandler = e => {
    let NewEmployee = new Employee(e.first_name.value, e.last_name.value, e.role.value)
    updateEmployees(NewEmployee)
    fillData(getData())
    toast('added successfully')
    e.reset()

}


const renderData = employee => {

    let tr = document.createElement('tr')
    body.appendChild(tr)

    let id = document.createElement('td')
    let firstName = document.createElement('td')
    let lastName = document.createElement('td')
    let role = document.createElement('td')
    let div = document.createElement('div')
    let button = document.createElement('button')
    let a = document.createElement('button')
    button.className = 'btn btn-danger'
    button.innerText = 'delete'

    button.setAttribute('data-bs-toggle', "modal")
    button.setAttribute('data-bs-target', "#modal")
    let idContainer = document.createElement('div')
    idContainer.className = 'row justify-content-between'
    tr.appendChild(idContainer)
    tr.appendChild(firstName)
    tr.appendChild(lastName)
    tr.appendChild(role)
    div.appendChild(button)
    div.className = 'action'
    div.appendChild(a)
    a.innerHTML = 'details'
    a.className = 'btn btn-info'
    a.addEventListener('click', () => {
        window.location = `/test.html?id=${employee.id}`

    })
    tr.appendChild(div)
    let copyBtn = document.createElement('button')
    copyBtn.innerHTML = 'copy'
    copyBtn.className = 'btn btn-secondary'
    let idText = document.createElement('span')
    let div1 = document.createElement('div')
    let div2 = document.createElement('div')
    div1.className = 'col'
    div2.className = 'col'
    div1.append(idText)
    div2.appendChild(copyBtn)

    idContainer.appendChild(div1)
    idText.innerHTML = employee.id
    idContainer.appendChild(div2)
    copyBtn.addEventListener('click', (e) => {
        navigator.clipboard.writeText(employee.id)
        e.target.innerHTML = 'copied!'
        setTimeout(() => e.target.innerHTML = 'copy', 2000)
    })
    id.innerHTML = employee.id
    firstName.innerHTML = employee.firstName
    lastName.innerHTML = employee.lastName
    role.innerHTML = employee.role

    button.addEventListener('click', () => {
        modal.classList.add('show')
        employeeId = employee.id
    })

}

let btn = document.getElementById('confirm')
btn?.addEventListener('click', () => {
    let body = document.getElementById('tableBody')
    let x = JSON.parse(localStorage.getItem('employees')).filter(val => val.id !== employeeId)
    localStorage.setItem('employees', JSON.stringify(x))
    body.innerHTML = ''
    toast('deleted successfully')
    fillData(x)
    closeModal()
})
const changeActivePage = () => {
    for (let i in pagination.children) {
        if (pagination.children[i].children?.[0].innerHTML === String(currentPage)) {
            pagination.children[i].classList.add('active')
        } else {
            pagination.children[i].classList?.remove('active')
        }
    }
}
const fillData = (data) => {
    body.innerHTML = ''
    widgetContainer.innerHTML = ''
    data?.slice(offset, limit)?.map(d => renderData(d))
    fillWidget('total employees', getData()?.length ?? 0)
    fillWidget('Supervisors', getData()?.filter(v => v.role === 'supervisor').length ?? 0)
    fillWidget('advisors', getData()?.filter(v => v.role === 'advisor').length ?? 0)
    fillWidget('managers', getData()?.filter(v => v.role === 'manager').length ?? 0)
    fillWidget('moderators', getData()?.filter(v => v.role === 'moderator').length ?? 0)
    changeActivePage()
}

const fillWidget = (text, content) => {
    const widget = document.createElement('div')
    widget.className = 'widget'
    widgetContainer.appendChild(widget)
    const h3 = document.createElement('h3')
    h3.className = 'widget-head'
    widget.appendChild(h3)
    const h1 = document.createElement('h1')
    h1.className = 'widget-content'
    widget.appendChild(h1)
    h3.innerHTML = text
    h1.innerHTML = 0

    let battery = {

        content: 0
    }
    anime({
        targets: battery,
        content: content,
        round: 1,
        easing: 'linear',
        update: function () {
            h1.innerHTML = battery.content;
        }
    });

}

let filterBtn = document.getElementById('filter-btn')
filterBtn.addEventListener('click', () => {
    let list = document.getElementById('list-group')
    if (list.className.includes('hide')) {
        list.classList.remove('hide')
    } else {
        list.classList.add('hide')
    }
})


const applyFilter = e => {
    let list = document.getElementById('list-group').children
    for (let i in list) {
        list[i].classList?.remove('active')
    }
    emptyPages()
    currentPage = 1
    e.id.split(' ')[1] ? fillData(getData().filter(val => val.role === e.id.split(' ')[1])) : fillData(getData())
    e.id.split(' ')[1] ? paginationFill(getData().filter(val => val.role === e.id.split(' ')[1])) : paginationFill()
    e.classList.add('active')
}

fillData(getData())
paginationFill()
// emptyPages()

let w = anime({
    targets: '.widget',
    translateY: [
        { value: -30, duration: 500, delay: 0 },
        { value: 30, duration: 500, delay: 500 },
        { value: 0, duration: 500, delay: 500 }
    ],
    delay: anime.stagger(300, {easing: 'easeOutQuad'})
});
// console.log("🚀 ~ file: app.js:211 ~ w:", w)



let form = document.getElementById('signup-form')
form.addEventListener('submit', e=>{
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    e.preventDefault()
    let email = e.target.email
    let message = document.getElementById('message')
    let password = e.target.password.value
    let users = JSON.parse(localStorage.getItem('users')) ?? []
    if(validRegex.test(email.value)){
        email.classList.remove('invalid')
        const user = {email: email.value, password: btoa(password), register_date: new Date(), last_login:''}
        if(users.find(u=> u.email === email.value)){
            return message.innerHTML = 'user already registered'
        }
        users.push(user)
        localStorage.setItem('users', JSON.stringify(users))
        e.target.reset()
        toast('registered successfully')
        formToggler('signup-form-container')

    } else {
        email.focus()
        email.classList.add('invalid')    
        message.style.textAlign ='center'
        message.innerHTML = 'please enter valid email'
        return false
    };    
})


let signinForm = document.getElementById('signin-form')
signinForm.addEventListener('submit', e=>{
    e.preventDefault()
    let message = document.getElementById('message_login')
    let users = JSON.parse(localStorage.getItem('users')) ?? []
    let user = users.find(u => u.email === e.target.email_login.value && atob(u.password) === e.target.password_login.value )
    
    if(user){
        users.map(u => u.email === user.email && (u.last_login = new Date()))
        localStorage.setItem('users',JSON.stringify(users))
        login(user)
        formToggler('signin-form-container')
        e.target.reset()
    } else message.innerHTML = 'incorrect credentials'

})

const logout = ()=>{
    localStorage.removeItem('user')
    let body = document.getElementsByTagName('body')
    body[0].classList?.remove('loggedin') 
}