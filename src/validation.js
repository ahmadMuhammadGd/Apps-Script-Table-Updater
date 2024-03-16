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
      return false;
    }

   
    static isInBoundaries(arr1, arr2, arrayOfIndexesPairs) {
        const arr1Len = arr1.length; 
        const arr2Len = arr2.length; 
        
        const validateArrayOfIndexesPairs = (pair) =>
            pair.length === 2 && pair.every(element => Number.isInteger(element));
        
        for (const pair of arrayOfIndexesPairs) {
            if (!validateArrayOfIndexesPairs(pair)) {
                throw new Error(`Invailed pair: ${pair}`)
            }
            
            const [index1, index2] = pair;

            if (index1 >= arr1Len || index2 >= arr2Len || index1 < 0 || index2 < 0) {
                throw new Error(`Index pair ${pair} is out of boundries.\narray1 length is ${arr1Len}\narray2 length is ${arr2Len}\n`)
            }
        }
        return true;
    }

    static validateInputs(array1, array2, arrayOfIndexesPairs, upTokey, outDatedKey) {
      InputValidator.isInBoundaries(array1, array2, arrayOfIndexesPairs)
      const dataArrs = [array1, array2];

        for (const arr of dataArrs) {
            if (!InputValidator.isValidArray(arr)) {
                throw new Error(`${arr} is not a valid 2D array. All inner arrays should have the same length.`);
            }
        }

      if (upTokey == null) {throw new Error (`upToDateTableKey is null, please assign value to it`)};
      if (outDatedKey == null) {throw new Error (`outDatedTableKey is null, please assign value to it`)};

      return true;
    }

    static validateAndExecute(func, ...args) {
        const validationResult = InputValidator.validateInputs(...args);
        if (validationResult) {
            func(...args);
        }
    }
}
