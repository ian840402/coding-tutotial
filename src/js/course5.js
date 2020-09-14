const condition = document.querySelector('#todo-list-form')

const fromTodoItem = document.querySelector('#todo-item')
const fromSubmitBtn = document.querySelector('#form-submit-btn')
const todoList = document.querySelector('.todo-list')
const todoListData = []

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
  let id = idCreator(4)
  while (isIdExist(todoListData, id)) {
    id = idCreator(4)
  }
  todoListData.push({ id, value })
}

// 生成項目結果
const createNewTodoItem = (wrap, data) => {
  wrap.innerHTML = ''

  data.forEach(item => {
    const newDom = document.createElement('li')
    newDom.classList.add('todo-list__item')

    newDom.innerHTML = `
      <div class="item-value">${item.value}</div>
      <div class="item-input>
        <input type="text" value="${item.value}">
      </div>
      <div class="action">
      <button class="save-btn">儲存</button>
        <button class="edit-btn">編輯</button>
        <button class="remove-btn">刪除</button>
      </div>
    `

    newDom.querySelector('.remove-btn').addEventListener('click', () => {
      removeItemHandler(data, item.id)
    }, false)

    wrap.appendChild(newDom)
  })
}

// 新增項目事件
const submitClickHandler = () => {
  const value = fromTodoItem.value
  setNewData(value)
  createNewTodoItem(todoList, todoListData)
}

// 刪除項目事件
const removeItemHandler = (data, id) => {
  const newData = data.filter(item => item.id !== id)
  createNewTodoItem(todoList, newData)
}

if (condition) {
  fromSubmitBtn.addEventListener('click', submitClickHandler, false)
}

// TODO: 編輯與防呆待完成！
