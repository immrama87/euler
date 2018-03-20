function mergeSort(arr){
  if(arr.length <= 1)
    return arr;

  var half = Math.floor(arr.length / 2);
  var arr1 = [];
  var arr2 = [];

  for(var i=0;i<half;i++){
    arr1.push(arr[i]);
  }

  for(var j=half;j<arr.length;j++){
    arr2.push(arr[j]);
  }

  arr1 = mergeSort(arr1);
  arr2 = mergeSort(arr2);

  var k=0;
  var l=0;

  var sorted = [];

  for(var m=0;m<arr.length;m++){
    if(k==arr1.length){
      sorted.push(arr2[l]);
      l++;
    }
    else if(l==arr2.length){
      sorted.push(arr1[k]);
      k++;
    }
    else if(arr1[k] < arr2[l]){
      sorted.push(arr1[k]);
      k++;
    }
    else {
      sorted.push(arr2[l]);
      l++;
    }
  }

  return sorted;
}

module.exports = mergeSort;
