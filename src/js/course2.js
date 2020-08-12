const smallGame = document.querySelector('.small-game')
const gridDom = document.querySelectorAll('.grid')
const nowPlayDom = document.querySelector('.now-user')
const changePlayerNameBlock = document.querySelector('.change-player-block')
const resetBtn = document.querySelector('#reset-btn')
const changePlayerNameBtn = document.querySelector('#change-player-btn')
const changePlayerNameConfirmBtn = document.querySelector('#confirm-btn')
const changePlayerNameCancelBtn = document.querySelector('#cancel-btn')
const playerInput1 = document.querySelector('#player-1')
const playerInput2 = document.querySelector('#player-2')
const player1SelectData = []
const player2SelectData = []
const winnerRule = [    // 勝利條件
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

let player1 = ''
let player2 = ''
let turn = 0

// 初始化函式
const init = () => {
  turn = 0
  player1SelectData.length = 0
  player2SelectData.length = 0
  getPlayerName()
  gridDom.forEach((dom) => {
    dom.innerHTML = ''
    dom.removeEventListener('click', gridDomClickHandler, false)
    dom.addEventListener('click', gridDomClickHandler, { once: true })
  })
}

// 檢查是否符合獲勝條件
const winnerCheck = (playerData) => {
  let isWin = false
  winnerRule.forEach((ruleItem) => {
    const rule = ruleItem.sort().toString()
    const data = playerData
      .filter(playerItem => ruleItem.includes(playerItem))
      .sort().toString()
    if (rule === data) isWin = true
  })
  return isWin
}

// 點擊後執行的動作
const gridDomClickHandler = (e) => {
  if (turn < 10) {
    const value = Number(e.target.dataset.value)
    const isPlayerOne = turn % 2 === 1
    let isWin = false
    e.target.innerHTML = isPlayerOne ? 'X' : 'O'
    isPlayerOne ? player1SelectData.push(value) : player2SelectData.push(value)
    isWin = isPlayerOne ? winnerCheck(player1SelectData) : winnerCheck(player2SelectData)
    nowPlayDom.innerHTML = isPlayerOne ? player1 : player2
    if (isWin) {
      turn = 10
      alert(`${nowPlayDom.innerHTML} 獲勝！`)
      nowPlayDom.innerHTML = '遊戲結束'
    }
    if (!isWin && turn === 8) {
      nowPlayDom.innerHTML = '遊戲結束'
      alert('遊戲結束！')
    }
    turn ++
  }
}

// 更改使用者名稱
const getPlayerName = () => {
  player1 = playerInput1.value !== '' ? playerInput1.value : '玩家一'
  player2 = playerInput2.value !== '' ? playerInput2.value : '玩家二'
  nowPlayDom.innerHTML = turn % 2 === 0 ? player1 : player2
}

// 初始化

if (smallGame) {
  init()
  
  resetBtn.addEventListener('click', init, false)
  
  changePlayerNameBtn.addEventListener('click', (e) => {
    changePlayerNameBlock.classList.add('show')
  })
  
  changePlayerNameConfirmBtn.addEventListener('click', (e) => {
    getPlayerName()
    changePlayerNameBlock.classList.remove('show')
  }, false)
  
  changePlayerNameCancelBtn.addEventListener('click', (e) => {
    changePlayerNameBlock.classList.remove('show')
  })
}
