// Core Logic using OOP & Functional Programming
export class ExpenseTracker {
    constructor() {
        // Load data from LocalStorage or fallback to empty array
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    }

    // Functional programming: Keep data pure by spreading the array
    getExpenses() {
        return [...this.expenses];
    }

    addExpense(description, amount, category) {
        const newExpense = {
            id: Date.now().toString(),
            description,
            amount: parseFloat(amount),
            category
        };
        // Spread operator to add new item without mutating state directly
        this.expenses = [...this.expenses, newExpense];
        this.saveToStorage();
        return newExpense;
    }

    // Destructuring targeting item ID to remove it
    removeExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveToStorage();
    }

    // Functional programming: Reduce array to single value
    calculateTotal(expensesList = this.expenses) {
        return expensesList.reduce((sum, { amount }) => sum + amount, 0);
    }

    filterByCategory(category) {
        if (category === 'All') return this.getExpenses();
        return this.expenses.filter(expense => expense.category === category);
    }

    saveToStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
}