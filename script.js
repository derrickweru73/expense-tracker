import { ExpenseTracker } from "./expense.js";

const tracker = new ExpenseTracker();

//DOM elements
const form = document.getElementById('expense-form');
const descInput = document.getElementById('desc-input');
const amountInput = document.getElementById('amount-input');
const categoryInput = document.getElementById('category-input');
const expenseList = document.getElementById('expense-list');
const totalAmouSpan = document.getElementById('total-amount');
const categoryFilter = document.getElementById('category-filter');

const render = (filterValue = 'All') => {
    const filteredExpenses = tracker.filterByCategory(filterValue);
    expenseList.innerHTML = '';

    // Loop and rendering items
    filteredExpenses.forEach(({ id, description, amount, category}) => {
        const li = document.createElement('li');
        li.className = 'expense-item';
        li.innerHTML = `<span><strong>${description}/strong> (${category}) - ${amount.toFixed(2)}</span>
        <button class="delete-btn" data-id="${id}">Delete</button>`;

        expenseList.appendChild(li);
    });

    // updating total text 

    const currentTotal = tracker.calculateTotal(filteredExpenses);
    totalAmountSpan.textContent = currentTotal.toFixed(2);

};

// Handle submission 
form.addEventListener(' submit', (e) => {
    e.preventDefault();
    trackeraddExpense(descInput.value, amountInput.value, categoryInput.value);
    form.reset();
    render(categoryFilterFilter.value);

});


// Handle item removal via event delegation
expenseList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.getAttribute('data-id');
        tracker.removeExpenses(id);
        render(categoryFilter.value);
    }

});

// Handle filter updates

categoryFilter.addEventListener('change', (e) => {
    render(e.target.value);
});

//initial boot render

render();