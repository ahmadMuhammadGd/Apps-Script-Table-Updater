const updatingTableRange = 'B3:D';
const updatedTableRange = 'F3:H';

function func()
{
  const sheet= SpreadsheetApp.getActiveSpreadsheet().getActiveSheet()
  const someUpdatingTable = sheet.getRange(updatingTableRange).getValues()
  const someUpdatedTable = sheet.getRange(updatedTableRange).getValues()

  let updateInfo = 
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
  const res = actionInstance.exec();

  console.log(res)
}


























