let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

const balanceElement = document.getElementById('balance');
const transactionForm = document.getElementById('transaction-form');
const transactionList = document.getElementById('transaction-list');

// Update Balance
function updateBalance() {
    const balance = transactions.reduce((acc, transaction) => 
        acc + (transaction.type === 'income' ? transaction.amount : -transaction.amount), 0);
    balanceElement.innerText = balance.toFixed(2);
}

// Display Transactions
function displayTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const transactionItem = document.createElement('li');
        transactionItem.classList.add(transaction.type);
        transactionItem.innerHTML = `
            ${transaction.description} - $${transaction.amount.toFixed(2)}
            <button onclick="deleteTransaction(${index})">X</button>
        `;
        transactionList.appendChild(transactionItem);
    });
}

// Add Transaction
function addTransaction(description, amount, type) {
    transactions.push({ description, amount: parseFloat(amount), type });
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateBalance();
}

// Delete Transaction
function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    displayTransactions();
    updateBalance();
}



transactionForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.getElementById('description').value;
  const amount = document.getElementById('amount').value;
  const type = document.getElementById('type').value;

  if (description && amount && type) {
      addTransaction(description, amount, type);
      transactionForm.reset();
  } else {
      alert("Please fill in all fields");
  }
});

// Initial load
displayTransactions();
updateBalance();
