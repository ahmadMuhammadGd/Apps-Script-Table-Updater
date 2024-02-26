
class Action {
    constructor(updatedTable, updatedTableKey, updatingTable, updatingTableKey, updateOnIndexes, updateTables, mergeTables) {
        this.updatedTable = updatedTable;
        this.updatedTableKey = updatedTableKey;
        this.updatingTable = updatingTable;
        this.updatingTableKey = updatingTableKey;
        this.updateOnIndexes = updateOnIndexes;
        this.mergeTables = mergeTables;
        this.updateTables = updateTables;
    }

    static action()
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
        this.updatedTable, this.updatingTable, this.updateOnIndexes
        )

    }

    static update() 
    {
        const updatedTable = this.updatedTable;
        const updatedTableKey = this.updatedTableKey;
        const updatingTable = this.updatingTable;
        const updatingTableKey = this.updatingTableKey;
        const updateOnIndexes = this.updateOnIndexes;

        for (let row in updatedTable)
        {
            const rowKey = row[updatedTableKey];
            const match =  updatingTable.find(row => row[updatingTableKey] === rowKey);

            if (match)
            {
                for (let atrIndex of updateOnIndexes)
                {
                    row[atrIndex[0]] = match[atrIndex[1]];
                }
            }
        }
    }

    static merge() 
    {
        const newRecords = this.getNewRecords();
        this.updatedTable = this.updatedTable.concat(newRecords);
    }

    static getNewRecords() 
    {
        const allUpdatedKeys = this.updatedTable.map(row => row[this.updatedTableKey]);
        return this.updatingTable.filter(updatingRow => allUpdatedKeys.includes(updatingRow[this.updatingTableKey]));
    }
}
