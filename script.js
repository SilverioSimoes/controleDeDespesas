const transactionUl = document.querySelector('#transactions')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const real = valor => `R$ ${valor.toFixed(2).replace('.', ',')}`

const dummyTransactions = [
  { id: 1, name: 'Bolo de brigadeiro', amount: -20 },
  { id: 2, name: 'Salário', amount: 300 },
  { id: 3, name: 'Torta de frango', amount: -10 },
  { id: 4, name: 'Violão', amount: 150 }
]

const addTransactionIntoDom = transaction => {
  const operator = transaction.amount < 0 ? '-' : '+'
  const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
  const amountWithoutOperator = Math.abs(transaction.amount)
  const li = document.createElement('li')

  li.classList.add(CSSClass)
  li.innerHTML = `
  ${transaction.name} <span>${operator} ${real(amountWithoutOperator)}</span>
  <button class="delete-btn">x</button>
  `
  transactionUl.append(li)
}

const updateBalanceValues = () => {
  const transactionsAmounts = dummyTransactions.map(
    transaction => transaction.amount
  )
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
  dummyTransactions.forEach(addTransactionIntoDom)
  updateBalanceValues()
}

init()

const generateID = () => Math.round(Math.random() * 1000)

form.addEventListener('submit', event => {
  event.preventDefault()

  const transactionName = inputTransactionName.value.trim()
  const transactionAmount = inputTransactionAmount.value.trim()
  if (transactionName === '' || transactionAmount === '') {
    alert('Por Favor, preencha tanto o nome quanto o valor da transação')
    return
  }

  const transaction = {
    id: generateID,
    name: transactionName,
    amount: transactionAmount
  }

  dummyTransactions.push(transaction)
  init()

  inputTransactionName.value = ''
  inputTransactionAmount.value = ''
})
