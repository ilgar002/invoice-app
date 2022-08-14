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
console.log(statusFilter);
const filterDropdown = statusFilter.querySelector('.options-dropdown')
const statusOptions = filterDropdown.querySelectorAll('.option')
console.log(filterDropdown);
statusFilter.addEventListener('click', function (params) {
    filterDropdown.classList.add('show')

    for (let i = 0; i < statusOptions.length; i++) {
        statusOptions[i].addEventListener('click',function(params) {
            statusOptions[i].querySelector("svg").classList.toggle("show")
            statusOptions[i].querySelector('.checkbox').classList.toggle('active')
        })
        
    }
    document.addEventListener('click', (e) => {
        const clickedArea = e.composedPath()
        console.log(clickedArea)
        if (!clickedArea.includes(statusFilter)) {
            filterDropdown.classList.toggle('show')
        }
    })
})

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
