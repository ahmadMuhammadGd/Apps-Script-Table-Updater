# AppScript Update and Merge Module

This module facilitates update and merge operations within the Google AppScript environment. It provides a class called `TableUpdater` that handles updating and merging tables.

## TableUpdater Class

### Constructor

Create an instance of the `TableUpdater` class by passing the following object structure to its constructor:

```javascript
let updateInfo = {
  outDatedTable: someoutDatedTable, // Data for the outdated table (without a header)
  outDatedTableKey: 0, // Column index (0-based) of the key in the outdated table
  upToDateTable: someupToDateTable, // Data for the up-to-date table (without a header)
  upToDateTableKey: 0, // Column index (0-based) of the key in the up-to-date table
  updateOnIndexes: [[1, 1], [2, 2]], // Array of index pairs specifying which columns to update
  mergeTables: true, // Indicates whether to merge new records from the up-to-date table (default: false)
  updateTables: true // Indicates whether to perform updates on the outdated table (default: false)
};
const updaterInstance = new TableUpdater(updateInfo);
```
### Methods

#### `exec()`
Executes the update and merge operations based on the provided parameters.
```JavaScript
  const res = updaterInstance.exec();
  //Returns: An array containing the updated table.
```

# Contributions
> Feel free to adjust and expand upon these suggestions based on your specific requirements and preferences.
