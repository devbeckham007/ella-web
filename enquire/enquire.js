let form = document.getElementById("form-enquire");
let first = document.getElementById("name1");
let last = document.getElementById("name2");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let date = document.getElementById("date");
let textArea = document.getElementById("event");
let order = document.getElementById("order-main")

form.addEventListener("submit", function (add) {
    add.preventDefault();
    
    let valueFirst = first.value;
    let valueLast = last.value;
    let valuePhone = phone.value;
    let valueEmail = email.value;
    let valueDate = date.value;
    let valueText = textArea.value;
    
    let createFirst = document.createElement('p');
    let createLast = document.createElement('p');
    let createPhone = document.createElement('p');
    let createEmail = document.createElement('p');
    let createDate = document.createElement('p');
    let createText = document.createElement('p');
    let createDiv = document.createElement('div');
    
    createFirst.textContent = valueFirst;
    createLast.textContent = valueLast;
    createPhone.textContent = valuePhone;
    createEmail.textContent = valueEmail;
    createDate.textContent = valueDate;
    createText.textContent = valueText;
    
    createDiv.append(createDate, createEmail, createFirst, createLast, createPhone, createText);
    order.appendChild(createDiv);

    // Clear input fields
    first.value = '';
    last.value = '';
    phone.value = '';
    email.value = '';
    date.value = '';
    textArea.value = '';
    
});
