// Example usage
const updatedTable = [
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Alice', age: 25 },
    // More rows...
];

const updatedTableKey = 'id';

const updatingTable = [
    { id: 1, name: 'John', age: 31 },
    { id: 3, name: 'Bob', age: 40 },
    // More rows...
];

const updatingTableKey = 'id';

const updateOnIndexes = [
    [1, 'age'], // Updates age attribute
];

const updateTables = true;
const mergeTables = true;

// Create an action instance
const actionInstance = new Action({updatedTable, updatedTableKey, updatingTable, updatingTableKey, updateOnIndexes, updateTables, mergeTables});

// Execute the action
Action.action();

// After executing, you can access the updatedTable to see the changes
console.log(updatedTable);