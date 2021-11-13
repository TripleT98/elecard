function getSumm(str){
  let origin = "";
  let counter = 0;
  let newStr = "";
  for(let i = 0; i < str.length; i++){
    if(str[i] == "-"){counter++;origin+=str[i];if(counter > 1){newStr = origin.slice(0, origin.length - 1); newStr += "+";origin = ""};continue};
    if(counter >= 1){counter = 0};
    origin += str[i];
    if(i == str.length - 1){newStr += origin};
  };
  console.log(newStr);
  //let signCounter = 0;
  let arr = str.split("=");
  let nums = str.split("").filter((e,i)=>{/*if(e == "*" || e == "-" || e == "+"){signCounter++};*/return Number(e)?true:false});
  //if(signCounter>1){return -1};
  let set = new Set(nums);
  for(let i = 0; i < 10; i++){
    if(set.has(String(i))){continue};
    let firstNum = arr[0].split("?").join(i);
    let secNum = arr[1].split("?").join(i);
    try{
    var flag = eval(firstNum)==eval(secNum)
  }catch(e){
    return -1
  }
    if(flag){
      if(i == 0){
        if(arr[1][0] == "?"){continue};
        if(arr[0][0] == "?"){continue};
        let neededNum = arr[0].split("-");
        if(neededNum.length == 2){if(neededNum[1][0] == "?" && neededNum[1].length > 1){continue}};
        neededNum = arr[0].split("+");
        if(neededNum.length == 2){if(neededNum[1][0] == "?" && neededNum[1].length > 1){continue}};
        neededNum = arr[0].split("*");
        if(neededNum.length == 2){if(neededNum[1][0] == "?" && neededNum[1].length > 1){continue}};
      }
      return i
    }
  }return -1;
}

console.log(getSumm("-7715?5--484?00=-28?9?5"));
