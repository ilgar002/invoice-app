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
///

//open new invoice area
const newInvoiceBtn = document.querySelector('.new-invoice-btn')
const main = document.querySelector('main')
const createNewInvoice = document.querySelector('.create-new-invoice')
const header = document.querySelector('header')
const headerChi = header.querySelectorAll("header *")
const layout = document.querySelector('.filter-layout')


newInvoiceBtn.addEventListener('click', () => {
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
const filterDropdown = statusFilter.querySelector('.options-dropdown')
const statusOptions = filterDropdown.querySelectorAll('.option')

statusFilter.addEventListener('click', function (params) {
    filterDropdown.classList.add('show')
})
for (let i = 0; i < statusOptions.length; i++) {
    statusOptions[i].addEventListener('click', function (params) {
        statusOptions[i].querySelector("svg").classList.toggle("show")
        statusOptions[i].querySelector('.checkbox').classList.toggle('active')
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
                            </label>
                            <input type="text" value="1">
                        </div>
                        <div class="col">
                            <label class="description">Price
                                <small class="empty-alert alert">can't be empty</small>
                            </label>
                            <input type="text">
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
    deleteItem()
    itemPrice(item)
})

//delete item
function deleteItem() {
    const deleteItemBtn = items.querySelectorAll('.delete-item')
    let limit = deleteItemBtn.length
    for (let i = 0; i < deleteItemBtn.length; i++) {
        deleteItemBtn[i].addEventListener('click', function () {
            if (limit > 1) {
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
        total.innerText = `${qnt.value * price.value}`
    })
    price.addEventListener('input', () => {
        total.innerText = `${qnt.value * price.value}`
    })
}

const newInvoiceForm = document.querySelector('.new-invoice-form')
newInvoiceForm.addEventListener('submit', function (e) {
    e.preventDefault()
    const invoiceFormInputs = newInvoiceForm.querySelectorAll('input')
    const emailInput = newInvoiceForm.querySelector('.email-input')
    for (let i = 0; i < invoiceFormInputs.length; i++) {
        if (invoiceFormInputs[i].value != "") {
            const alert = invoiceFormInputs[i].previousElementSibling.querySelector('.empty-alert')
            alert.style.display = "none"
        }
        else if (invoiceFormInputs[i].value == "") {
            const alert = invoiceFormInputs[i].previousElementSibling.querySelector('.empty-alert')
            alert.style.display = "block"
        }
    }
    ValidateEmail(emailInput)
})

function ValidateEmail(input) {
    const mailformat = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (input.value.match(mailformat)) {
        input.previousElementSibling.querySelector('.invalid-email').style.display = "none"
    }
    else {
        if (input.value == "") {
            input.previousElementSibling.querySelector('.empty-alert').style.display = "block"
            input.previousElementSibling.querySelector('.invalid-email').style.display = "none"
        }
        else {
            input.previousElementSibling.querySelector('.invalid-email').style.display = "block"
        }
    }
}

//invoice form discard button
const discardBtn = newInvoiceForm.querySelector('.discard')
discardBtn.addEventListener('click', function () {
    const allAlerts = newInvoiceForm.querySelectorAll('.alert')
    for (let i = 0; i < allAlerts.length; i++) {
        allAlerts[i].style.display = "none"
    }
    today()
    main.classList.remove('open-invoice')
})

deleteItem()
itemPrice()
today()
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



//save&send Invoice
// const saveInfoiceBtn=newInvoiceForm.querySelector('button.save')

//create invoice
const invoices = document.querySelector('.invoices')
console.log(invoices);
function createInvoice(date, clientName, totalAmount, status) {
    const newInvoice = document.createElement('div')
    newInvoice.classList.add(".invoice")
    newInvoice.innerHTML = `<div class="invoice">
                    <span class="id">
                        <span class="hashtag">
                            #
                        </span>
                        ${idGenerator()}
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
                        <span>${status}</span>
                    </span>
                </div>`
    invoices.append(newInvoice)
}

