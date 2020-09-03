const resultDom = document.querySelector('#computer-result')
const btnDom = document.querySelectorAll('.computer-btn__item .content')
const operator = ['+', '-', '*', '/']
let step = ''
let nowDigit = ''
let prevDigit = ''

const btnClickHandler = (e) => {
  const value = e.target.innerHTML
  if (operator.includes(value)) {
    // 解決第二次點擊問題
    prevDigit = nowDigit
    nowDigit = ''
    resultDom.innerHTML = '0'
    step = value
  } else if (value === '=') {
    compute()
  } else if (value === 'AC') {
    nowDigit = ''
    prevDigit = ''
    step = ''
    resultDom.innerHTML = '0'
  } else {
    nowDigit += value
    resultDom.innerHTML = nowDigit
  }
}

const compute = () => {
  if (!!step) {
    switch (step) {
      case '+':
        nowDigit = Number(prevDigit) + Number(nowDigit)
        prevDigit = ''
        resultDom.innerHTML = nowDigit.toString()
        step = ''
        break
      case '-':
        nowDigit = Number(prevDigit) - Number(nowDigit)
        prevDigit = ''
        resultDom.innerHTML = nowDigit.toString()
        step = ''
        break
      case '*':
        nowDigit = Number(prevDigit) * Number(nowDigit)
        prevDigit = ''
        resultDom.innerHTML = nowDigit.toString()
        step = ''
        break
      case '/':
        nowDigit = Number(prevDigit) / Number(nowDigit)
        prevDigit = ''
        resultDom.innerHTML = nowDigit.toString()
        step = ''
        break
    }
  }
}

btnDom.forEach((dom) => {
  dom.addEventListener('click', btnClickHandler, false)
})