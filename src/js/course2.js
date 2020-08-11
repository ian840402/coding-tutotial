const gridDom = document.querySelectorAll('.grid')
const nowPlayer = document.querySelector('.now-user')
const resetBtn = document.querySelector('.reset-btn')
const player_1 = '一號玩家'
const player_2 = '二號玩家'

nowPlayer.innerHTML = player_1

const winnerRule = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const player1Data = []
const player2Data = []

let turn = 0

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
    const isPlayerOne = turn % 2 === 0
    let isWin = false
    e.target.innerHTML = isPlayerOne ? 'O' : 'X'
    isPlayerOne ? player1Data.push(value) : player2Data.push(value)
    isWin = isPlayerOne ? winnerCheck(player1Data) : winnerCheck(player2Data)
    nowPlayer.innerHTML = isPlayerOne ? player_1 : player_2
    turn ++
    if (isWin) {
      turn = 10
      nowPlayer.innerHTML = '遊戲結束'
      alert(`${nowPlayer.innerHTML} 獲勝！`)
    }
    if (!isWin && turn === 8) {
      alert('遊戲結束！')
    }
  }
}

const resetBtnClickHandler = (e) => {
  turn = 0
  player1Data.length = 0
  player2Data.length = 0
  nowPlayer.innerHTML = player_1
  gridDom.forEach((dom) => {
    dom.innerHTML = ''
    dom.removeEventListener('click', gridDomClickHandler, false)
    dom.addEventListener('click', gridDomClickHandler, { once: true })
  })
}

gridDom.forEach((dom) => {
  dom.addEventListener('click', gridDomClickHandler, { once: true })
})

resetBtn.addEventListener('click', resetBtnClickHandler, false)