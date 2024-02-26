




function update(arr1, arr2, onKey, attributes) {
    validateAndExecute(() => {

    }, arr1, arr2);
}

function insert(arr1, data) {
    validateAndExecute(() => {
        return([...arr1, ...data])
    }, arr1, data);
}

function newRows(arr1, arr2, keyIndexs = [0, 0]) {
    validateAndExecute(() => {

    }, arr1, arr2);
}



const validateInputs = (...arrs) => {
    let result = true;
    for (const arr of arrs) {
        result = result && isValidArr(arr);
        if (!result) {
            throw new Error(`${arr} is not a valid 2d array, all inner arrays should have the same length`);
        }
    }
    return result;
};

function validateAndExecute(func, ...args) {
    if (!validateInputs(...args)) {
        return;
    }
    func(...args);
}