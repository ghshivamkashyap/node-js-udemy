// var ipt = document.getElementById("age-input") as HTMLInputElement;
// ipt.value
// ipt.checked
// ipt.cloneNode
// these all above values we will get as sugestions from ts bcz
// we are explisitely spacefying the type of the element ie: HTMLInputElement while importing
//  ------------------------------------------------
// old syntax
let arr: Array<number> = [];

// new syntax
let ar: number[] = [];

// -----------------------------------------------------
// defining of type by ourself it can me number or stringas a typeand use like
// correct below
let val: numOrString = 65;

// wrong below bcz type do not match
// let val: numOrString=true;
type numOrString = number | string;
var add = (n1: number, n2: number) => {
  console.log("Array is: ", ar);
  return n1 + n2;
};

console.log(`sum is: ${add(1634, 10)}`);
// console.log(`sum is: ${add("1", "10")}`);
