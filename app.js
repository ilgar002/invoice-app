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
newInvoiceBtn.addEventListener('click', () => {
    main.classList.add('open-invoice')
    outsideClick(createNewInvoice)
})

// //outside click close dropdown
function outsideClick(el) {
    let clickCounter = 0
    document.addEventListener('click', (e) => {
        clickCounter++
        const clickedArea = e.composedPath();
        if (!clickedArea.includes(el) && clickCounter > 1) {
            main.classList.remove('open-invoice')
            clickCounter = 0
        }
    })
}