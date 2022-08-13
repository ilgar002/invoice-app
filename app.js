//calendar javascript
$(function () {
    $("#datepicker").datepicker({
        dateFormat: "dd M yy",
        duration: "fast"
    });
});


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