class Transformer {
  constructor(array) {
    this.array2D = array;
  }

  transform() {
    const header = this.array2D.shift();
    console.log(header);
    this.array2D = this.array2D.map((arrayElement) => {
      const row = {};
      header.map((head, i) => (row[head] = arrayElement[i]));
      console.log(row);
      return row;
    });
    return this.array2D;
  }
}
