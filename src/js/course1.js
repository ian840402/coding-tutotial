// 第一週課題

const blockOne = document.querySelector('#block-1')
const blockTwo = document.querySelector('#block-2')
const blockThree = document.querySelector('#block-3')
const blockWrap = document.querySelector('#block-wrap')

let count = 0
let amount = 0

const blockOneClickHandler = (e) => console.log('你點擊了一次區塊一')

const blockTwoClickHandler = (e) => {
  count++
  console.log(`你點擊了 ${count} 次`)
}

const blockThreeClickHandler = (e) => {
  const newDom = document.createElement('div')
  amount++
  newDom.innerHTML = `這是第 ${amount} 個新區塊`
  newDom.classList.add('new-block')
  blockWrap.appendChild(newDom)
}

if (blockOne && blockTwo && blockThree && blockWrap) {
  blockOne.addEventListener('click', blockOneClickHandler, false)
  
  blockTwo.addEventListener('click', blockTwoClickHandler, false)
  
  blockThree.addEventListener('click', blockThreeClickHandler, false)
}
