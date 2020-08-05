const blockOne = document.querySelector('#block-1')
const blockTwo = document.querySelector('#block-2')
const blockThree = document.querySelector('#block-3')
const blockWrap = document.querySelector('#block-wrap')

let count = 0
let amount = 0

blockOne.addEventListener('click', (e) => {
  console.log('你點擊了一次區塊一')
})

blockTwo.addEventListener('click', (e) => {
  count++
  console.log(`你點擊了 ${count} 次`)
})

blockThree.addEventListener('click', (e) => {
  const newDom = document.createElement('div')
  amount++
  newDom.innerHTML = `這是第 ${amount} 個新區塊`
  newDom.classList.add('new-block')
  blockWrap.appendChild(newDom)
})