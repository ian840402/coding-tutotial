const form = document.querySelector('#form')

const formName = document.querySelector('#name')
const formEmail = document.querySelector('#email')
const formPhone = document.querySelector('#phone')
const formMain = document.querySelector('#main')
const formSubmitButton = document.querySelector('#form-submit-btn')
const formResetButton = document.querySelector('#form-reset-btn')
const resultName = document.querySelector('#name-value')
const resultEmail = document.querySelector('#email-value')
const resultPhone = document.querySelector('#phone-value')
const resultMain = document.querySelector('#main-value')

const getFormItemValue = (dom) => {
  if (!dom.value) dom.classList.add('error')
  return dom.value
}

const setFormResult = (obj) => {
  resultName.innerHTML = obj.name
  resultEmail.innerHTML = obj.email
  resultPhone.innerHTML = obj.phone
  resultMain.innerHTML = obj.main
}

const formSubmitHandler = (e) => {
  const data = {
    name: getFormItemValue(formName),
    email: getFormItemValue(formEmail),
    phone: getFormItemValue(formPhone),
    main: getFormItemValue(formMain)
  }

  setFormResult(data)
}

const formResetHandler = (e) => {
  formName.value = ''
  formEmail.value = ''
  formPhone.value = ''
  formMain.value = ''
  resultName.innerHTML = ''
  resultEmail.innerHTML = ''
  resultPhone.innerHTML = ''
  resultMain.innerHTML = ''
}

if (form) {
  formSubmitButton.addEventListener('click', formSubmitHandler, false)
  formResetButton.addEventListener('click', formResetHandler, false)
}