class InputValidator {
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
    }

    static isInBoundaries(arr1, arr2, arrOfIndexes) {
        const arr1Len = arr1[0].length;
        const arr2Len = arr2[0].length;

        for (const arr of arrOfIndexes) {
            if (arr[0] >= arr1Len && arr[1] >= arr2Len) {
                return false;
            }
        }
        return true;
    }

    static validateInputs(...arrs) {
        // for (const arr of arrs) {
        //     if (!InputValidator.isValidArray(arr)) {
        //         throw new Error(`${arr} is not a valid 2D array. All inner arrays should have the same length.`);
        //     }
        // }
        return true;
    }

    static validateAndExecute(func, ...args) {
        const validationResult = InputValidator.validateInputs(...args);
        if (validationResult) {
            func(...args);
        }
    }
}
