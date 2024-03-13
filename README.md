# AppScript Update and Merge Module

This module facilitates update and merge operations within the Google AppScript environment. It provides a class called `Action` that handles updating and merging of tables.

## Action Class

### Constructor

#### Parameters:
- `params`: An object containing the parameters for the action.
  - `updatedTable`: The table to be updated.
  - `updatedTableKey`: The key used to identify rows in the updated table.
  - `updatingTable`: The table containing updates.
  - `updatingTableKey`: The key used to match rows in the updating table.
  - `updateOnIndexes`: An array of index pairs specifying which columns to update.
  - `mergeTables` (optional, default: `false`): Indicates whether to merge new records from the updating table.
  - `updateTables` (optional, default: `false`): Indicates whether to perform updates on the updated table.

### Methods

#### `exec()`
Executes the update and merge operations based on the provided parameters.

Returns: An array containing the updated table and validation result.

#### `update()`
Performs updates on the updated table using the updating table and specified columns.

#### `merge()`
Merges new records from the updating table into the updated table.

#### `getNewRecords()`
Retrieves new records from the updating table that are not present in the updated table.

