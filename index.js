let arr = [[5, 1, 2], [9, 6, 4], [4, 6, 98]]
let target = 4

const findSum = (arr,target) => {
  
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if(arr[i][j]=== target){
                return 'target found'
            }
        }
    }
    return 'not found'
}

const ans = findSum(arr,target)
console.log(ans);


