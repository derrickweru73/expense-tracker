// core logic using oop  & function programming
export class ExpenseTracker {
    constructor() {
        // Loading data from local storage or fallback to empty array
        this.expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    }
    //Functional programming :keeping  data pure by  spreading the array
    getExpenses() {
        return [...this.expenses];
    }

    addExpenses(description, amount, category) {
        const newExpense = {
            id: Date.now().toString(),
            description,
            amount: parseFloat(amount),
            category
        };

        // spread operator to add new item without mutating state directly
        this.expenses = [...this.expenses, newExpense];
        this.saveToStorage();
        return newExpense;
    }

    // Destructuring in parameter: targetting id to remove it
    removeExpenses(id) {
        // Functional programming: filtering out target id cleanly
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this.saveToStorage();
    }

    // Functional programming : Reducing array to a single value
    calculateTotal(expensesList = this.expenses) {
        return expensesList.reduce((sum, { amount }) => sum + amount, 0);
    }

    filterByCategory(category) {
        if (category === 'All') return this.getExpenses();
        return this.expenses.filter(expense => expense.category);
    }

    saveToStorage() {
        localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
}