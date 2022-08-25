window.addEventListener('keydown', function (e) {
    if (e.key == "Enter") {
        e.preventDefault()
    }
})
const container=document.querySelector('.container')
const body=document.querySelector('body')
const themeButton = document.querySelector('.theme-buttons')
// console.log(themeButton);

//theme
if (localStorage.getItem('mode') === null) {
    body.style.backgroundColor = "#141625"
    localStorage.setItem('mode', 'dark')
    container.classList.remove('light-mode')
}
else {
    if (localStorage.getItem('mode') === 'dark') {
        body.style.backgroundColor = "#141625"
        container.classList.remove('light-mode')
        localStorage.setItem('mode', 'dark')
    }
    else if (localStorage.getItem('mode') === 'light') {
        body.style.backgroundColor = "#f8f8fb"
        container.classList.add('light-mode')
        localStorage.setItem('mode', 'light')
    }
}
themeButton.addEventListener("click", function () {
    if (localStorage.getItem('mode') == 'dark') {
        body.style.backgroundColor = "#f8f8fb"
        container.classList.add('light-mode')
        localStorage.setItem('mode', 'light')
    }
    else if (localStorage.getItem('mode') == 'light') {
        body.style.backgroundColor = "#141625"
        container.classList.remove('light-mode')
        localStorage.setItem('mode', 'dark')
    }
})



const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');
// console.log(myParam);

const invoicesList = localStorage.getItem("invoices") ? JSON.parse(localStorage.getItem("invoices")) : [];
const main = document.querySelector('main')
const mainContent = main.querySelector('.main-content')
const invoices = document.querySelector('.invoices')
const newInvoiceForm = document.querySelector('.new-invoice-form')


// getData()
itemPrice()
today()
countInvoice()

if (myParam != null) {
    // mainContent.innerHTML=""
    const result = invoicesList.find((el) => {
        if (el.id == myParam) {
            return true
        }
    })
    mainContent.innerHTML = `<div class="details">
                <button class="go-back">
                    <img src="./images/icon-arrow-left.svg" alt="icon-arrow">
                        <span>Go back</span>
                </button>
                <div class="caption">
                    <div class="left container">
                        <span>Status</span>
                        <span class="status ${result.status}">
                            <span class="circle"></span>
                            <span class="text">${result.status.charAt(0).toUpperCase() + result.status.slice(1)}</span>
                        </span>
                    </div>
                    <div class="buttons right container ${result.status}">
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                        <button class="pay">Mark as Paid</button>
                    </div>
                </div>
                <div class="details-data">
                    <div class="row">
                        <div class="xs-container">
                            <span class="id">
                                <span class="hashtag">
                                    #
                                </span>
                                ${myParam}
                            </span>
                            <span class="p-decription">
                                ${result.description}
                            </span>
                        </div>
                        <div class="xs-container">
                            <span class="small street">
                                ${result.from.street}
                            </span>
                            <span class="small city">
                                ${result.from.city}
                            </span>
                            <span class="small postCode">
                                ${result.from.postCode}
                            </span>
                            <span class="small country">
                                ${result.from.country}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="s-container">
                            <span class="invoice-date">
                                Invoice Date
                                <span>
                                    ${result.invoiceDate}
                                </span>
                            </span>
                            <span class="payment-due">
                                Payment Due
                                <span>
                                    ${paymentDue(result.invoiceDate, result.paymentTerms)}
                                </span>
                            </span>
                        </div>
                        <div class="xs-container">
                            Bill To
                            <span class="name bold">
                                ${result.to.clientName}
                            </span>
                            <span class="small street">
                                ${result.to.street}
                            </span>
                            <span class="small city">
                                ${result.to.city}
                            </span>
                            <span class="small postCode">
                                ${result.to.postCode}
                            </span>
                            <span class="small country">
                                ${result.to.country}
                            </span>
                        </div>
                        <div class="xs-container">
                            Sent To
                            <div class="email bold">
                                ${result.to.clientEmail}
                            </div>
                        </div>
                    </div>
                    <div class="items-data">
                        <div class="item-caption">
                            <span>Item Name</span>
                            <span>QTY.</span>
                            <span>Price</span>
                            <span>Total</span>
                        </div>
                        <div class="items-info"></div>
                        <div class="amount-due">
                            Amount Due
                            <span class="total">$${result.total}</span>
                        </div>
                    </div>
                </div>
            </div>`
    const items = document.querySelector('.items-info')
    for (let i = 0; i < result.items.length; i++) {
        items.innerHTML +=
            `<div class="item-row">
                    <span class="item-name">${result.items[i].name}</span>
                    <span class="qty">${result.items[i].quantity}</span>
                    <span class="price">${result.items[i].price}</span>
                    <span class="total">${result.items[i].total}</span>
                </div>`
    }
    const goBack = document.querySelector('.go-back')
    goBack.addEventListener('click', function () {
        history.back()
    })
    const details = document.querySelector('.details')
    const pay = details.querySelector('.pay')
    const pending = details.querySelector('.pending')
    const deleteInvoiceBtn = details.querySelector('.delete')
    deleteInvoiceBtn.addEventListener('click', function () {
        invoicesList.forEach((el, index) => {
            if (el.id == myParam) {
                invoicesList.splice(index, 1)
            }
        })
        localStorage.setItem('invoices', JSON.stringify(invoicesList))
        history.back()
        countInvoice()
    })
    pay.addEventListener('click', function () {
        pay.remove()
        pending.classList.remove("pending")
        pending.classList.add('paid')
        pending.querySelector('.text').innerText = "Paid"
        invoicesList.map((el) => {
            if (el.id == myParam) {
                el.status = 'paid'
            }
        })
        localStorage.setItem('invoices', JSON.stringify(invoicesList))

    })
    const editBtn = details.querySelector('button.edit')
    editBtn.addEventListener('click', function () {
        main.classList.add('open-invoice')
        document.addEventListener('click', (e) => {
            for (let i = 0; i < headerChi.length; i++) {
                if (headerChi[i] == e.target) {
                    main.classList.remove('open-invoice')
                    refreshForm()
                }
            }
            if (e.target == layout || e.target == header) {
                main.classList.remove('open-invoice')
                refreshForm()
            }
        })
        for (let i = 0; i < invoicesList.length; i++) {
            if (invoicesList[i].id == myParam) {
                const result = invoicesList[i]
                newInvoiceForm.querySelector('.from-street').value = result.from.street
                newInvoiceForm.querySelector('.from-city').value = result.from.city
                newInvoiceForm.querySelector('.from-postCode').value = result.from.postCode
                newInvoiceForm.querySelector('.from-country').value = result.from.country
                newInvoiceForm.querySelector('.client-name').value = result.to.clientName
                newInvoiceForm.querySelector('.email-input').value = result.to.clientEmail
                newInvoiceForm.querySelector('.to-street').value = result.to.street
                newInvoiceForm.querySelector('.to-city').value = result.to.city
                newInvoiceForm.querySelector('.to-postCode').value = result.to.postCode
                newInvoiceForm.querySelector('.to-country').value = result.to.country
                newInvoiceForm.querySelector('.today').innerText = result.invoiceDate
                newInvoiceForm.querySelector('.today').innerText = result.invoiceDate
                newInvoiceForm.querySelector('.select-term .current').innerText = result.paymentTerms
                newInvoiceForm.querySelector('.project-description').value = result.description
                const items = newInvoiceForm.querySelector('.items')
                const itemHtml = newInvoiceForm.querySelector('.items .item').innerHTML
                if (result.items.length > 1) {
                    for (let i = 1; i < result.items.length; i++) {
                        const item = document.createElement('div')
                        item.classList.add('item')
                        item.innerHTML = `${itemHtml}`
                        items.append(item)
                        deleteItemStatus = true;
                        deleteItem()
                        itemPrice(item)
                    }
                }
                const allItem = newInvoiceForm.querySelectorAll('.item')
                for (let i = 0; i < allItem.length; i++) {
                    const allInput = allItem[i].querySelectorAll('input')
                    const total = allItem[i].querySelector('.total')
                    allInput[0].value = result.items[i].name
                    allInput[1].value = result.items[i].quantity
                    allInput[2].value = result.items[i].price
                    total.innerText = result.items[i].total
                }
            }
        }
        newInvoiceForm.querySelector('.main-buttons').classList.add('hide')
        newInvoiceForm.querySelector('.edit-buttons').classList.add('show')
    })
}
else {
    getData()
}


//calendar javascript
$(function () {
    $(".calendar").datepicker({
        dateFormat: 'dd M yy',
        firstDay: 1
    });

    $(document).on('click', '.date-picker .input', function (e) {
        var $me = $(this),
            $parent = $me.parents('.date-picker');
        $parent.toggleClass('open');
    });


    $(".calendar").on("change", function () {
        var $me = $(this),
            $selected = $me.val(),
            $parent = $me.parents('.date-picker');
        $parent.find('.result').children('span').html($selected);
        calendar.classList.remove('show')
    });
});

//open new invoice area
const newInvoiceBtn = document.querySelector('.new-invoice-btn')
const createNewInvoice = document.querySelector('.create-new-invoice')
const header = document.querySelector('header')
const headerChi = header.querySelectorAll("header *")
const layout = document.querySelector('.filter-layout')


newInvoiceBtn?.addEventListener('click', () => {
    main.classList.add('open-invoice')
    document.addEventListener('click', (e) => {
        for (let i = 0; i < headerChi.length; i++) {
            if (headerChi[i] == e.target) {
                main.classList.remove('open-invoice')
            }
        }
        if (e.target == layout || e.target == header) {
            main.classList.remove('open-invoice')
        }
    })
})

const selectTerm = document.querySelector('.select-term')
const termDropdown = selectTerm.querySelector('.options-dropdwon')
const termArrow = selectTerm.querySelector("svg")
const termCurrent = selectTerm.querySelector('.current')
const termOptions = selectTerm.querySelectorAll(".option")
selectTerm.addEventListener("click", function (e) {
    termDropdown.classList.toggle('show')
    termArrow.classList.toggle('rotate-180')
    for (let i = 0; i < termOptions.length; i++) {
        termOptions[i].addEventListener("click", function () {
            termCurrent.innerText = this.innerText
        })
    }
    document.addEventListener('click', (e) => {
        const clickedArea = e.composedPath();
        if (!clickedArea.includes(selectTerm)) {
            termDropdown.classList.remove("show")
            termArrow.classList.remove('rotate-180')
        }
    })
})

const statusFilter = document.querySelector('.filter-status')
const filterDropdown = statusFilter?.querySelector('.options-dropdown')
const statusOptions = filterDropdown?.querySelectorAll('.option')

statusFilter?.addEventListener('click', function (params) {
    filterDropdown.classList.add('show')
})
for (let i = 0; i < statusOptions?.length; i++) {
    statusOptions[i].addEventListener('click', function () {
        statusOptions[i].querySelector("svg").classList.toggle("show")
        statusOptions[i].querySelector('.checkbox').classList.toggle('active')
        statusOptions[i].classList.toggle('current')
        invoices.innerHTML = ''
        const selected = []
        for (let i = 0; i < statusOptions.length; i++) {
            if (statusOptions[i].classList.contains('current')) {
                selected.push(statusOptions[i].innerText.toLowerCase())
            }
        }
        console.log(selected);
        if (selected.length > 0) {
            for (let i = 0; i < invoicesList.length; i++) {
                if (selected.includes(invoicesList[i].status)) {
                    createInvoice(invoicesList[i].id, invoicesList[i].invoiceDate, invoicesList[i].to.clientName, invoicesList[i].total, invoicesList[i].status)
                }
            }
            const invoice = document.querySelectorAll('.invoice')
            console.log(invoice);
            document.querySelector('.invoice-number').innerText = `There are ${invoice.length} total invoices`
        }
        else if (selected.length == 0) {
            getData()
            countInvoice()
        }
    })
    document.addEventListener('click', (e) => {
        const clickedArea = e.composedPath()
        if (!clickedArea.includes(statusFilter)) {
            filterDropdown.classList.remove('show')
        }
    })
}

const datePicker = document.querySelector('.date-picker')
const dateInput = datePicker.querySelector('.input.result')
const calendar = datePicker.querySelector('.calendar')
dateInput.addEventListener('click', function (params) {
    calendar.classList.toggle('show')
    document.addEventListener('click', (e) => {
        const clickedArea = e.composedPath();
        if (!clickedArea.includes(datePicker)) {
            calendar.classList.remove('show')
        }
    })
})


const addItem = document.querySelector(".add-item")
const items = document.querySelector('.items')
addItem.addEventListener('click', () => {
    const item = document.createElement('div')
    item.classList.add('item')
    item.innerHTML = `<div class="col">
                            <label class="description">Item Name
                                <small class="empty-alert alert">can't be empty</small>
                            </label>
                            <input type="text">
                        </div>
                        <div class="col">
                            <label class="description">Qty.
                                <small class="empty-alert alert">can't be empty</small>
                                <small class="number-alert alert">invalid value</small>
                            </label>
                            <input type="text" value="1" class="quantity">
                        </div>
                        <div class="col">
                            <label class="description">Price
                                <small class="empty-alert alert">can't be empty</small>
                                <small class="number-alert alert">invalid value</small>
                            </label>
                            <input type="text" class="price">
                        </div>
                        <div class="col">
                            <label class="description">Total</label>
                            <span class="total">0.00</span>
                        </div>
                        <button class="delete-item" type="button">
                            <svg width="13" height="16" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M11.583 3.556v10.666c0 .982-.795 1.778-1.777 1.778H2.694a1.777 1.777 0 01-1.777-1.778V3.556h10.666zM8.473 0l.888.889h3.111v1.778H.028V.889h3.11L4.029 0h4.444z"
                                    fill-rule="nonzero"></path>
                            </svg>
                        </button>`


    items.append(item)
    deleteItemStatus = true;
    deleteItem()
    itemPrice(item)
})


let deleteItemStatus = true;
//delete item
function deleteItem() {
    const deleteItemBtn = items.querySelectorAll('.delete-item')
    let limit = deleteItemBtn.length
    for (let i = 0; i < deleteItemBtn.length; i++) {
        deleteItemBtn[i].addEventListener('click', function () {
            if (limit > 1 && deleteItemStatus) {
                this.parentElement.remove()
                limit--
            }
        })
    }
}
//count item price
function itemPrice(item) {
    if (item) {
        const inputs = item.querySelectorAll('.item .col input')
        const total = item.querySelector('.total')
        countItemTotal(inputs[1], inputs[2], total)

    }
    else {
        const inputs = document.querySelectorAll('.item .col input')
        const total = document.querySelector('.total')
        countItemTotal(inputs[1], inputs[2], total)
    }
}
function countItemTotal(qnt, price, total) {
    qnt.addEventListener('input', () => {
        validateItem()
        if (qnt.value != '') {
            qnt.parentElement.querySelector('.empty-alert').style.display = 'none'
        }
        else {
            qnt.parentElement.querySelector('.empty-alert').style.display = 'block'
        }
        total.innerText = `${qnt.value * price.value}`
        if (Number(total.innerText) <= 0 || isNaN(total.innerText)) {
            total.innerText = "Sorry"
        }
    })
    price.addEventListener('input', () => {
        validateItem()
        if (price.value != '') {
            price.parentElement.querySelector('.empty-alert').style.display = 'none'
        }
        else {
            price.parentElement.querySelector('.empty-alert').style.display = 'block'
        }
        total.innerText = `${qnt.value * price.value}`
        if (Number(total.innerText) <= 0 || isNaN(total.innerText)) {
            total.innerText = "Sorry"
        }
    })
}



//id generator
function idGenerator() {
    let string = '';
    let characters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
    for (var i = 0; i < 2; i++) {
        string += characters.charAt(Math.floor(Math.random() *
            characters.length));
    }
    let number = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    let result = string + number
    return result
}

//create invoice
function createInvoice(id, date, clientName, totalAmount, status) {
    const newInvoice = document.createElement('div')
    newInvoice.classList.add("invoice")
    newInvoice.setAttribute('data-id', id)
    newInvoice.innerHTML =
        `<span class="id">
                        <span class="hashtag">
                            #
                        </span>
                        ${id}
                    </span>
                    <span class="date">
                        Due ${date}
                    </span>
                    <span class="client-name">
                        ${clientName}
                    </span>
                    <span class="amount">
                        $${totalAmount}
                    </span>
                    <span class="status ${status}">
                        <span class="circle"></span>
                        <span>${status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </span>`
    invoices.append(newInvoice)
    openDetails(newInvoice)
}

newInvoiceForm.addEventListener('submit', function (e) {
    e.preventDefault()
    validateInput()
    validateEmail()
    validateItem()
    if (validateInput() == true && validateEmail() == true && validateItem() == true) {
        let date = newInvoiceForm.querySelector('.today').innerText
        let clientName = newInvoiceForm.querySelector('.client-name').value
        let amounts = document.querySelectorAll('.total')
        let totalAmount = 0
        for (let i = 0; i < amounts.length; i++) {
            totalAmount += Number(amounts[i].innerText)
        }
        const id = idGenerator()
        createInvoice(id, date, clientName, totalAmount, "pending")
        const items = newInvoiceForm.querySelectorAll('.item')
        const itemList = []
        for (let i = 0; i < items.length; i++) {
            const obj = {
                "name": items[i].querySelectorAll('input')[0].value,
                "quantity": items[i].querySelectorAll('input')[1].value,
                "price": items[i].querySelectorAll('input')[2].value,
                "total": amounts[i].innerText
            }
            itemList.push(obj)
        }
        const data = {
            "id": `${id}`,
            "from": {
                "street": newInvoiceForm.querySelector('.from-street').value,
                "city": newInvoiceForm.querySelector('.from-city').value,
                "postCode": newInvoiceForm.querySelector('.from-postCode').value,
                "country": newInvoiceForm.querySelector('.from-country').value
            },
            "to": {
                "clientName": newInvoiceForm.querySelector('.client-name').value,
                "clientEmail": newInvoiceForm.querySelector('.email-input').value,
                "street": newInvoiceForm.querySelector('.to-street').value,
                "city": newInvoiceForm.querySelector('.to-city').value,
                "postCode": newInvoiceForm.querySelector('.to-postCode').value,
                "country": newInvoiceForm.querySelector('.to-country').value
            },
            "invoiceDate": newInvoiceForm.querySelector('.today').innerText,
            "paymentTerms": newInvoiceForm.querySelector('.current.option').innerText,
            "description": newInvoiceForm.querySelector('.project-description').value,
            'items': itemList,
            "status": "pending",
            "total": totalAmount
        }
        invoicesList.push(data)
        localStorage.setItem("invoices", JSON.stringify(invoicesList))
        refreshForm()
        countInvoice()
    }
})



//get data from Local Storage
function getData() {
    for (let i = 0; i < invoicesList.length; i++) {
        createInvoice(invoicesList[i].id, invoicesList[i].invoiceDate, invoicesList[i].to.clientName, invoicesList[i].total, invoicesList[i].status)
    }
}



function validateInput() {
    const invoiceFormInputs = newInvoiceForm.querySelectorAll('input')
    let status = 0
    for (let i = 0; i < invoiceFormInputs.length; i++) {
        if (invoiceFormInputs[i].value != "") {
            const alert = invoiceFormInputs[i].previousElementSibling.querySelector('.empty-alert')
            alert.style.display = "none"
        }
        else if (invoiceFormInputs[i].value == "") {
            const alert = invoiceFormInputs[i].previousElementSibling.querySelector('.empty-alert')
            alert.style.display = "block"
            status++
        }
    }
    if (status > 0) {
        console.log("empty-false");
        return false
    }
    else if (status == 0) {
        console.log("emtpy-true");
        return true
    }
}
function validateEmail() {
    const emailInput = newInvoiceForm.querySelector('.email-input')
    const mailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailInput.value.match(mailformat)) {
        emailInput.previousElementSibling.querySelector('.invalid-email').style.display = "none"
        console.log("email-true");
        return true
    }
    else {
        if (emailInput.value == "") {
            emailInput.previousElementSibling.querySelector('.empty-alert').style.display = "block"
            emailInput.previousElementSibling.querySelector('.invalid-email').style.display = "none"
        }
        else {
            emailInput.previousElementSibling.querySelector('.invalid-email').style.display = "block"
        }
        console.log("email-false");
        return false
    }
}
function validateItem() {
    const quantity = newInvoiceForm.querySelectorAll('.quantity')
    const price = newInvoiceForm.querySelectorAll('.price')
    let status = 0
    for (let i = 0; i < quantity.length; i++) {
        if (quantity[i].value != "") {
            if (!(quantity[i].value > 0 && quantity[i].value % 1 == 0)) {
                quantity[i].previousElementSibling.querySelector(".number-alert").style.display = "block"
                status++
            }
            else {
                quantity[i].previousElementSibling.querySelector(".number-alert").style.display = "none"
            }
        }
        else {
            quantity[i].previousElementSibling.querySelector(".number-alert").style.display = "none"
        }
    }
    for (let j = 0; j < price.length; j++) {
        if (price[j].value != "") {
            if (!(price[j].value > 0)) {
                price[j].previousElementSibling.querySelector(".number-alert").style.display = "block"
                status++
            }
            else {
                price[j].previousElementSibling.querySelector(".number-alert").style.display = "none"
            }
        }
        else {
            price[j].previousElementSibling.querySelector(".number-alert").style.display = "none"
        }
    }
    if (status > 0) {
        console.log("item-false");
        return false
    }
    else if (status == 0) {
        console.log("item-true");
        return true
    }
}



//invoice form discard button
const discardBtn = newInvoiceForm.querySelector('.discard')
discardBtn.addEventListener('click', function () {
    refreshForm()
})




//today input
function today() {
    var date = new Date();
    const day = date.getDate()
    const month = date.toLocaleString('default', { month: 'short' })
    const year = date.getFullYear()
    const today = `${day} ${month} ${year}`
    const todayInput = document.querySelector(".date-picker .today")
    todayInput.innerText = today
}
//count payment due
function paymentDue(invoiceDate, paymentTerms) {
    const term = paymentTerms.split(' ')[1]
    let date = new Date(invoiceDate).setDate(new Date(invoiceDate).getDate() + parseInt(term))
    date = new Date(date)
    date = date.toDateString('default', { month: 'short' });
    date = date.split(' ')
    date = `${date[2] + ' ' + date[1] + ' ' + date[3]}`
    return date
}


//refresh invoice form
function refreshForm() {
    const allInputs = newInvoiceForm.querySelectorAll('input')
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ""
    }
    const allAlerts = newInvoiceForm.querySelectorAll('.alert')
    for (let i = 0; i < allAlerts.length; i++) {
        allAlerts[i].style.display = "none"
    }
    const items = newInvoiceForm.querySelectorAll('.item')
    let limit = items.length
    for (let i = 0; i < items.length; i++) {
        if (limit > 1) {
            items[i].remove()
            limit--
        }
    }
    deleteItemStatus = false

    today()
    const total = newInvoiceForm.querySelector('.total')
    newInvoiceForm.querySelector('.select-term .current.option').innerText = 'Net 7 days'
    total.innerText = '0.00'
    const quantity = newInvoiceForm.querySelector('.quantity')
    quantity.value = "1"
    main.classList.remove('open-invoice')
}

function openDetails(invoice) {
    invoice.addEventListener('click', function () {
        const id = this.getAttribute('data-id')
        window.location = `?id=${id}`
    })
}

//edit buttons-cancel
const cancelEdit = newInvoiceForm.querySelector('.edit-buttons .cancel')
cancelEdit.addEventListener('click', refreshForm)

//save changes in edit
const saveChanges = newInvoiceForm.querySelector('.edit-buttons .save-changes')
saveChanges.addEventListener('click', function () {
    const data = invoicesList.find(el => el.id == myParam)
    // console.log(data);
    let amounts = newInvoiceForm.querySelectorAll('.total')
    let totalAmount = 0
    for (let i = 0; i < amounts.length; i++) {
        totalAmount += Number(amounts[i].innerText)
    }
    const allItem = newInvoiceForm.querySelectorAll('.item')
    const itemList = []
    for (let i = 0; i < allItem.length; i++) {
        const obj = {
            "name": allItem[i].querySelectorAll('input')[0].value,
            "quantity": allItem[i].querySelectorAll('input')[1].value,
            "price": allItem[i].querySelectorAll('input')[2].value,
            "total": amounts[i].innerText
        }
        itemList.push(obj)
    }
    const result = {
        "id": `${myParam}`,
        "from": {
            "street": newInvoiceForm.querySelector('.from-street').value,
            "city": newInvoiceForm.querySelector('.from-city').value,
            "postCode": newInvoiceForm.querySelector('.from-postCode').value,
            "country": newInvoiceForm.querySelector('.from-country').value
        },
        "to": {
            "clientName": newInvoiceForm.querySelector('.client-name').value,
            "clientEmail": newInvoiceForm.querySelector('.email-input').value,
            "street": newInvoiceForm.querySelector('.to-street').value,
            "city": newInvoiceForm.querySelector('.to-city').value,
            "postCode": newInvoiceForm.querySelector('.to-postCode').value,
            "country": newInvoiceForm.querySelector('.to-country').value
        },
        "invoiceDate": newInvoiceForm.querySelector('.today').innerText,
        "paymentTerms": newInvoiceForm.querySelector('.current.option').innerText,
        "description": newInvoiceForm.querySelector('.project-description').value,
        'items': itemList,
        "status": data.status,
        "total": totalAmount
    }
    // console.log(result);
    const index = invoicesList.indexOf(data)
    invoicesList[index] = result
    const detailsData = mainContent.querySelector('.details-data')
    detailsData.innerHTML = `
                <div class="details-data">
                    <div class="row">
                        <div class="xs-container">
                            <span class="id">
                                <span class="hashtag">
                                    #
                                </span>
                                ${myParam}
                            </span>
                            <span class="p-decription">
                                ${result.description}
                            </span>
                        </div>
                        <div class="xs-container">
                            <span class="small street">
                                ${result.from.street}
                            </span>
                            <span class="small city">
                                ${result.from.city}
                            </span>
                            <span class="small postCode">
                                ${result.from.postCode}
                            </span>
                            <span class="small country">
                                ${result.from.country}
                            </span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="s-container">
                            <span class="invoice-date">
                                Invoice Date
                                <span>
                                    ${result.invoiceDate}
                                </span>
                            </span>
                            <span class="payment-due">
                                Payment Due
                                <span>
                                    ${paymentDue(result.invoiceDate, result.paymentTerms)}
                                </span>
                            </span>
                        </div>
                        <div class="xs-container">
                            Bill To
                            <span class="name bold">
                                ${result.to.clientName}
                            </span>
                            <span class="small street">
                                ${result.to.street}
                            </span>
                            <span class="small city">
                                ${result.to.city}
                            </span>
                            <span class="small postCode">
                                ${result.to.postCode}
                            </span>
                            <span class="small country">
                                ${result.to.country}
                            </span>
                        </div>
                        <div class="xs-container">
                            Sent To
                            <div class="email bold">
                                ${result.to.clientEmail}
                            </div>
                        </div>
                    </div>
                    <div class="items-data">
                        <div class="item-caption">
                            <span>Item Name</span>
                            <span>QTY.</span>
                            <span>Price</span>
                            <span>Total</span>
                        </div>
                        <div class="items-info"></div>
                        <div class="amount-due">
                            Amount Due
                            <span class="total">$${result.total}</span>
                        </div>
                    </div>
                </div>
            </div>`
    const items = document.querySelector('.items-info')
    for (let i = 0; i < result.items.length; i++) {
        items.innerHTML +=
            `<div class="item-row">
                    <span class="item-name">${result.items[i].name}</span>
                    <span class="qty">${result.items[i].quantity}</span>
                    <span class="price">${result.items[i].price}</span>
                    <span class="total">${result.items[i].total}</span>
                </div>`
    }
    localStorage.setItem("invoices", JSON.stringify(invoicesList))
    // console.log(invoicesList);
    refreshForm()
})


//number of invoice
function countInvoice() {
    const invoiceNumber = document.querySelector('.invoice-number')
    const noInvoiceMessage = document.querySelector('.no-invoice-message')
    invoiceNumber.innerText = `There are ${invoicesList.length} total invoices`
    if (invoicesList.length > 0) {
        noInvoiceMessage.style.display = 'none'
    }
}


//save as draft
const draftBtn = newInvoiceForm.querySelector('button.draft')
draftBtn.addEventListener('click', function () {
    let date = newInvoiceForm.querySelector('.today').innerText
    let clientName = newInvoiceForm.querySelector('.client-name').value
    let amounts = document.querySelectorAll('.total')
    let totalAmount = 0
    for (let i = 0; i < amounts.length; i++) {
        totalAmount += Number(amounts[i].innerText)
    }
    const id = idGenerator()
    createInvoice(id, date, clientName, totalAmount, "draft")
    const items = newInvoiceForm.querySelectorAll('.item')
    const itemList = []
    for (let i = 0; i < items.length; i++) {
        const obj = {
            "name": items[i].querySelectorAll('input')[0].value,
            "quantity": items[i].querySelectorAll('input')[1].value,
            "price": items[i].querySelectorAll('input')[2].value,
            "total": amounts[i].innerText
        }
        itemList.push(obj)
    }
    const data = {
        "id": `${id}`,
        "from": {
            "street": newInvoiceForm.querySelector('.from-street').value,
            "city": newInvoiceForm.querySelector('.from-city').value,
            "postCode": newInvoiceForm.querySelector('.from-postCode').value,
            "country": newInvoiceForm.querySelector('.from-country').value
        },
        "to": {
            "clientName": newInvoiceForm.querySelector('.client-name').value,
            "clientEmail": newInvoiceForm.querySelector('.email-input').value,
            "street": newInvoiceForm.querySelector('.to-street').value,
            "city": newInvoiceForm.querySelector('.to-city').value,
            "postCode": newInvoiceForm.querySelector('.to-postCode').value,
            "country": newInvoiceForm.querySelector('.to-country').value
        },
        "invoiceDate": newInvoiceForm.querySelector('.today').innerText,
        "paymentTerms": newInvoiceForm.querySelector('.current.option').innerText,
        "description": newInvoiceForm.querySelector('.project-description').value,
        'items': itemList,
        "status": "draft",
        "total": totalAmount
    }
    invoicesList.push(data)
    localStorage.setItem("invoices", JSON.stringify(invoicesList))
    refreshForm()
    countInvoice()
})