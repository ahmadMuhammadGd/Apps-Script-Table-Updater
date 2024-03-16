class TableUpdater {
    /**
     * Creates an instance of Action.
     * @param {Object} params - The parameters for the action.
     * @param {Array} params.outDatedTable - The table to be updated.
     * @param {string} params.outDatedTableKey - The key used to identify rows in the updated table.
     * @param {Array} params.upToDateTable - The table containing updates.
     * @param {string} params.upToDateTableKey - The key used to match rows in the updating table.
     * @param {Array} params.updateOnIndexes - An array of index pairs specifying which columns to update.
     * @param {boolean} [params.mergeTables=false] - Indicates whether to merge new records from the updating table.
     * @param {boolean} [params.updateTables=false] - Indicates whether to perform updates on the updated table.
     */
    constructor(params) {
        this.outDatedTable = params.outDatedTable;
        this.outDatedTableKey = typeof params.upToDateTableKey !== 'undefined' ? params.upToDateTableKey : null;
        this.upToDateTable = params.upToDateTable;
        this.upToDateTableKey = typeof params.upToDateTableKey !== 'undefined' ? params.upToDateTableKey : null;
        this.updateOnIndexes = params.updateOnIndexes;
        this.mergeTables = params.mergeTables || false;
        this.updateTables = params.updateTables || false;
    }

    exec()
    {
        InputValidator.validateAndExecute(()=>
        {
            if (this.updateTables)
            {
                this.update()
            }
            if (this.mergeTables)
            {
                this.merge()
            }
        }
        ,
        this.outDatedTable, this.upToDateTable, this.updateOnIndexes, this.upToDateTableKey, this.outDatedTableKey
        )
        return this.outDatedTable
    }

  update() {
      const outDatedTable = this.outDatedTable;
      const outDatedTableKey = this.outDatedTableKey;
      const upToDateTable = this.upToDateTable;
      const upToDateTableKey = this.upToDateTableKey;
      const updateOnIndexes = this.updateOnIndexes;

      for (let outDatedRow of outDatedTable) {
          const rowKey = outDatedRow[outDatedTableKey];
          const match = upToDateTable.find(upToDateRow => upToDateRow[upToDateTableKey] === rowKey);

          if (match) {
              for (let [upToDateKey, outDatedKey] of updateOnIndexes) {
                  outDatedRow[upToDateKey] = match[outDatedKey];
              }
          }
      }
  }


     merge() 
    {
      const newRecords = this.getNewRecords();
      this.outDatedTable.push(...newRecords);
      const temp = this.outDatedTable.filter(row => row.some(cell => cell !== ''));
      this.outDatedTable = temp
    }

    getNewRecords() {
      const updatedKeys = new Set(this.outDatedTable.map(row => row[this.outDatedTableKey]));
      const newRecords = this.upToDateTable.filter(row => !updatedKeys.has(row[this.upToDateTableKey]));
      return newRecords;
    }
}
