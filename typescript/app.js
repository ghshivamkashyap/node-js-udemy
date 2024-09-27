"use strict";
// var ipt = document.getElementById("age-input") as HTMLInputElement;
// ipt.value
// ipt.checked
// ipt.cloneNode
// these all above values we will get as sugestions from ts bcz
// we are explisitely spacefying the type of the element ie: HTMLInputElement while importing
let ar = [];
var add = (n1, n2) => {
    console.log("Array is: ", ar);
    return n1 + n2;
};
console.log(`sum is: ${add(1634, 10)}`);
// console.log(`sum is: ${add("1", "10")}`);
