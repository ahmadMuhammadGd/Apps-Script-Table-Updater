class TableUpdater {
  /**
   * Input example:
   * params = {
   *     outDatedInfo: { key: 'key', table: outDatedTable },
   *     upToDateInfo: { key: 'key', table: upToDateTable },
   *     merge: true,
   *     update: true,
   *     updateOn: [['outDatedColumn', 'upToDateColumn']] // Ignore if update is set to false
   * }
   */
  constructor(params) {
    this.outDatedTable = new Transformer(params.outDatedInfo.table).transform();
    this.outDatedTableKey = params.outDatedInfo.key || null;

    this.upToDateTable = new Transformer(params.upToDateInfo.table).transform();
    this.upToDateTableKey = params.upToDateInfo.key || null;

    this.mergeTables = params.merge || false;
    this.updateTables = params.update || false;

    this.updateOnKeys = params.updateOn || null;

    this.validateInputs();
  }

  validateInputs() {
    InputValidator.validateInputs(
      this.outDatedTable,
      this.outDatedTableKey,
      this.upToDateTable,
      this.upToDateTableKey,
      this.updateOnKeys,
      this.updateTables
    );
  }

  exec() {
    if (!this.validateInputs()) {
      return;
    }

    if (this.updateTables) {
      this.update();
    }
    if (this.mergeTables) {
      this.merge();
    }

    return this.outDatedTable;
  }

  update() {
    const outDatedTable = this.outDatedTable;
    const outDatedTableKey = this.outDatedTableKey;
    const upToDateTable = this.upToDateTable;
    const upToDateTableKey = this.upToDateTableKey;
    const updateOnIndexes = this.updateOnIndexes;

    for (let outDatedRow of outDatedTable) {
      const rowKey = outDatedRow[outDatedTableKey];
      const match = upToDateTable.find(
        (upToDateRow) => upToDateRow[upToDateTableKey] === rowKey
      );

      if (match) {
        for (let [upToDateKey, outDatedKey] of updateOnIndexes) {
          outDatedRow[upToDateKey] = match[outDatedKey];
        }
      }
    }
  }

  merge() {
    const newRecords = this.getNewRecords();
    this.outDatedTable.push(...newRecords);
    const temp = this.outDatedTable.filter((row) =>
      row.some((cell) => cell !== "")
    );
    this.outDatedTable = temp;
  }

  getNewRecords() {
    const updatedKeys = new Set(
      this.outDatedTable.map((row) => row[this.outDatedTableKey])
    );
    const newRecords = this.upToDateTable.filter(
      (row) => !updatedKeys.has(row[this.upToDateTableKey])
    );
    return newRecords;
  }
}
