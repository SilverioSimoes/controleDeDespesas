const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const real = valor => `R$ ${valor.toFixed(2).replace('.', ',')}`

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
)
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []

const removeTransaction = ID => {
  transactions = transactions.filter(transaction => transaction.id !== ID)
  updateLocalStorage()
  init()
}

const addTransactionIntoDom = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${transaction.name} <span>${operator} ${real(amountWithoutOperator)}</span>
  <button class="delete-btn" onclick = "removeTransaction(${
    transaction.id
  })">x</button>
  `
  transactionUl.append(li)
}

const updateBalanceValues = () => {
  const transactionsAmounts = transactions.map(({ amount }) => amount)
  const total = real(transactionsAmounts.reduce((acc, valor) => acc + valor, 0))

  const income = real(
    transactionsAmounts
      .filter(transaction => transaction > 0)
      .reduce((acc, valor) => acc + valor, 0)
  )

  const expense = real(
    Math.abs(
      transactionsAmounts
        .filter(transaction => transaction < 0)
        .reduce((acc, valor) => acc + valor, 0)
    )
  )

  balanceDisplay.textContent = `${total}`
  incomeDisplay.textContent = `${income}`
  expenseDisplay.textContent = `${expense}`
}

const init = () => {
  transactionUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDom)
  updateBalanceValues()
}

init()

const updateLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

const generateID = () => Math.round(Math.random() * 1000)

const handleFormSubmit = event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  if (transactionName === '' || transactionAmount === '') {
    alert('Por Favor, preencha tanto o nome quanto o valor da transação!')
    return
  }

  const transaction = {
    id: generateID,
    name: transactionName,
    amount: Number(transactionAmount)
  }

  transactions.push(transaction)
  updateLocalStorage()
  init()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
}

form.addEventListener('submit', handleFormSubmit)
