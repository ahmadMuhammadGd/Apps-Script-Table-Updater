// Define the ranges for the up-to-date and outdated tables
const upToDateTableRange = 'B3:D'; // Specify the range for the up-to-date table (without headers)
const outDatedTableRange = 'F3:H'; // Specify the range for the outdated table (without headers)

// Define a function to perform the update operation
function func() {
  // Access the active spreadsheet, assuming both tables are located in the same sheet
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get the values of the up-to-date and outdated tables from the specified ranges
  const someupToDateTable = sheet.getRange(upToDateTableRange).getValues();
  const someoutDatedTable = sheet.getRange(outDatedTableRange).getValues();

  // Define the update information
  let updateInfo = {
    outDatedTable: someoutDatedTable, // Outdated table data
    outDatedTableKey: 0, // Column index (0-based) of the key in the outdated table
    upToDateTable: someupToDateTable, // Up-to-date table data
    upToDateTableKey: 0, // Column index (0-based) of the key in the up-to-date table
    updateOnIndexes: [[1, 1], [2, 2]], // Array of index pairs specifying which columns to update
    mergeTables: true, // Indicates whether to merge new records from the up-to-date table
    updateTables: true // Indicates whether to perform updates on the outdated table
  };

  // Create an instance of the TableUpdater class with the update information
  const updaterInstance = new TableUpdater(updateInfo);

  // Execute the update operation
  const res = updaterInstance.exec();

  // Output the result (optional)
  console.log(res);
}
