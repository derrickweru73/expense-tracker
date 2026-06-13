import { ExpenseTracker } from './expense.js';

// Mock localStorage globally for testing environment
const localStorageMock = (() => {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        clear: () => { store = {}; }
    };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('ExpenseTracker Class Logic Tests', () => {
    let tracker;

    beforeEach(() => {
        localStorage.clear();
        tracker = new ExpenseTracker();
    });

    test('should add an expense correctly', () => {
        const item = tracker.addExpense('Coffee', '4.50', 'Food');
        expect(tracker.getExpenses().length).toBe(1);
        expect(tracker.getExpenses()[0].description).toBe('Coffee');
    });

    test('should calculate total accurately', () => {
        tracker.addExpense('Lunch', '15.00', 'Food');
        tracker.addExpense('Bus', '2.50', 'Transport');
        expect(tracker.calculateTotal()).toBe(17.50);
    });

    test('should filter list items matching category', () => {
        tracker.addExpense('Dinner', '30.00', 'Food');
        tracker.addExpense('Gas', '40.00', 'Transport');
        const foodExpenses = tracker.filterByCategory('Food');
        expect(foodExpenses.length).toBe(1);
        expect(foodExpenses[0].description).toBe('Dinner');
    });

    test('should remove targeted expense item safely', () => {
        const item = tracker.addExpense('Movie', '12.00', 'Entertainment');
        tracker.removeExpense(item.id);
        expect(tracker.getExpenses().length).toBe(0);
    });
});