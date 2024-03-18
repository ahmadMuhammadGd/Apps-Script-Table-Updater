class InputValidator extends TableUpdater {
    static is2DArray(arr) {
      const itsAnArray = Array.isArray(arr);
      const itsA2DArray = Array.isArray(arr[0]);
      return itsAnArray && itsA2DArray;
    }

    static isValidArray(arr) {
      if (InputValidator.is2DArray(arr)) {
          const odds = arr.filter(element => element.length !== arr[0].length);
          return odds.length === 0;
      }
      return false;
    }
    
    static validateInputs() {
        const outDatedHeaders = Object.keys(this.outDatedTable[0]);
        const upToDateHeaders = Object.keys(this.upToDateTable[0]);

        if (!outDatedHeaders.includes(this.outDatedTableKey)) {
            throw new Error(`Key: '${this.outDatedTableKey}' is not found. If you are sure that nothing is wrong with it, please check for capitalization and white spaces.\nHeaders: ${outDatedHeaders.map(e => `'${e}'`).join(", ")}`);
        }
        if (!upToDateHeaders.includes(this.upToDateTableKey)) {
            throw new Error(`Key: '${this.upToDateTableKey}' is not found. If you are sure that nothing is wrong with it, please check for capitalization and white spaces.\nHeaders: ${upToDateHeaders.map(e => `'${e}'`).join(", ")}`);
        }
        if (!Validation.isValidArray(this.upToDateTable)) {
            throw new Error(`upToDateTable is not a valid 2D array\nupToDateTable:\n${this.upToDateTable}`);
        }
        if (!Validation.isValidArray(this.outDatedTable)) {
            throw new Error(`outDatedTable is not a valid 2D array\noutDatedTable:\n${this.outDatedTable}`);
        }
        if (!Validation.isValidArray(this.updateOnKeys) && this.updateTables) {
            throw new Error(`updateOnKeys is not a valid 2D array\nupdateOnKeys:\n${this.updateOnKeys}`);
        }

        this.updateOnKeys.forEach(pair => {
            const [outDated, upToDate] = pair;
            if (!upToDateHeaders.includes(upToDate)) {
                throw new Error(`Key '${upToDate}' in pair: ${pair} is not found in the up-to-date headers array.`);
            }
            if (!outDatedHeaders.includes(outDated)) {
                throw new Error(`Key '${outDated}' in pair: ${pair} is not found in the out-dated headers array.`);
            }
        });
    }
}
