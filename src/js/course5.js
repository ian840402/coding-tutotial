const condition = document.querySelector('#todo-list-form')

const fromTodoItem = document.querySelector('#todo-item')
const fromSubmitBtn = document.querySelector('#form-submit-btn')
const todoList = document.querySelector('.todo-list')
const idLength = 4
let todoListData = []

// 隨機 id 產生器
const idCreator = (time) => {
  let id = ''
  for (let i = 0; i < time; i++) {
    id += Math.floor(Math.random() * 10 )
  }
  return Number(id)
}

// 判斷 id 是否已存在
const isIdExist = (data, id) => {
  return data
    .map(item => item.id)
    .some(item => item === id)
}

// 新增項目陣列
const setNewData = (value) => {
  let id = idCreator(idLength)
  while (isIdExist(todoListData, id)) {
    id = idCreator(idLength)
  }
  todoListData.push({ id, value })
}

// 生成項目
const createNewTodoItem = (wrap, data) => {
  wrap.innerHTML = ''

  data.forEach(item => {
    const newDom = document.createElement('li')
    newDom.classList.add('todo-list__item')

    newDom.innerHTML = `
      <div class="item-value">${item.value}</div>
      <div class="item-input-wrapper">
        <input class="item-input" type="text" value="${item.value}" placeholder="請輸入內容">
      </div>
      <div class="action">
      <button class="save-btn">儲存</button>
        <button class="edit-btn">編輯</button>
        <button class="remove-btn">刪除</button>
      </div>
    `

    newDom.querySelector('.remove-btn').addEventListener('click', () => {
      removeBtnClickHandler(data, item.id)
    }, false)

    newDom.querySelector('.edit-btn').addEventListener('click', (e) => {
      editBtnClickHandler(e)
    },false)

    newDom.querySelector('.save-btn').addEventListener('click', (e) => {
      saveBtnClickHandler(e, item.id)
    })

    wrap.appendChild(newDom)
  })
}

// 新增項目事件
const submitBtnClickHandler = () => {
  const value = fromTodoItem.value
  if (value !== '') {
    setNewData(value)
    createNewTodoItem(todoList, todoListData)
    fromTodoItem.value = ''
  } else {
    alert('輸入不可為空！')
  }
}

// 刪除項目事件
const removeBtnClickHandler = (data, id) => {
  const newData = data.filter(item => item.id !== id)
  todoListData = newData
  createNewTodoItem(todoList, todoListData)
}

// 編輯項目事件
const editBtnClickHandler = (e) => {
  const parentDom = e.target.parentElement.parentElement
  parentDom.classList.add('_edit')
}

// 儲存修改事件
const saveBtnClickHandler = (e, id) => {
  const parentDom = e.target.parentElement.parentElement
  const inputValue = parentDom.querySelector('.item-input').value

  if (inputValue !== '') {
    todoListData.forEach(item => {
      if (item.id === id) {
        item.value = inputValue
      }
    })
    parentDom.classList.remove('_edit')
  
    createNewTodoItem(todoList, todoListData)
  } else {
    alert('輸入不可為空！')
  }
}

if (condition) {
  fromSubmitBtn.addEventListener('click', submitBtnClickHandler, false)
}
