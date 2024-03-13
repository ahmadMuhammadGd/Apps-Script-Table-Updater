function func()
{
  const updatingTableRange = 'B3:D';
  const updatedTableRange = 'F3:H';

  const sheet= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const someUpdatingTable = sheet.getRange(updatingTableRange).getValues()
  const someUpdatedTable = sheet.getRange(updatedTableRange).getValues()

  console.log(someUpdatedTable)
  console.log(someUpdatingTable)

  const updateInfo = 
  {
    updatedTable: someUpdatedTable,
    updatedTableKey: 0,
    updatingTable: someUpdatingTable,
    updatingTableKey: 0,
    updateOnIndexes: [[1, 1]],
    mergeTables: true,
    updateTables: true  
  }

  const actionInstance = new Action(updateInfo);
  actionInstance.exec(),

  console.log(
    updateInfo.updatedTable
  )
}

