/**
 * Represents an action to update or merge tables based on specified parameters.
 */
class Action {
    /**
     * Creates an instance of Action.
     * @param {Object} params - The parameters for the action.
     * @param {Array} params.updatedTable - The table to be updated.
     * @param {string} params.updatedTableKey - The key used to identify rows in the updated table.
     * @param {Array} params.updatingTable - The table containing updates.
     * @param {string} params.updatingTableKey - The key used to match rows in the updating table.
     * @param {Array} params.updateOnIndexes - An array of index pairs specifying which columns to update.
     * @param {boolean} [params.mergeTables=false] - Indicates whether to merge new records from the updating table.
     * @param {boolean} [params.updateTables=false] - Indicates whether to perform updates on the updated table.
     */
    constructor(params) {
        this.updatedTable = params.updatedTable;
        this.updatedTableKey = params.updatedTableKey;
        this.updatingTable = params.updatingTable;
        this.updatingTableKey = params.updatingTableKey;
        this.updateOnIndexes = params.updateOnIndexes;
        this.mergeTables = params.mergeTables;
        this.updateTables = params.updateTables;
    }

    /**
     * Validates input and executes the action.
     * @example
     * // Example usage:
     * const action = new Action({
     *     updatedTable: someUpdatedTable,
     *     updatedTableKey: 'id',
     *     updatingTable: someUpdatingTable,
     *     updatingTableKey: 'id',
     *     updateOnIndexes: [['name', 'name']],
     *     mergeTables: true,
     *     updateTables: true
     * });
     * action.execute();
     */

    static excute()
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
