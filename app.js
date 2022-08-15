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
                                <small class="empty-alert">can't be empty</small>
                            </label>
                            <input type="text">
                        </div>
                        <div class="col">
                            <label class="description">Qty.
                                <small class="empty-alert">can't be empty</small>
                            </label>
                            <input type="text" value="1">
                        </div>
                        <div class="col">
                            <label class="description">Price
                                <small class="empty-alert">can't be empty</small>
                            </label>
                            <input type="text">
                        </div>
                        <div class="col">
                            <label class="description">Total</label>
                            <span class="total">0.00</span>
                        </div>
                        <button class="delete-item">
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
function countItemTotal(qnt,price,total) {
    qnt.addEventListener('input',()=>{
        total.innerText=`${qnt.value*price.value}`
    })
    price.addEventListener('input', () => {
        total.innerText = `${qnt.value * price.value}`
    })
}

deleteItem()
itemPrice()

