function is2DArray(arr) 
{
    const itsAnArray = Array.isArray(arr);
    const itsA2DArray = Array.isArray(arr[0]);
    return (itsAnArray && itsA2DArray)
}

function isValidArr(arr)
{
    if(!is2DArray(arr))
    {
        const odds = arr.filter(element=> element.length != arr[0]);
        if (odds.length == 0)
        {
            return true
        }
    }
    return false;
}