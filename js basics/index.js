// console.log(arr);
const arr = [1, 2, 3, 4, 5];
console.log([...arr, arr, "hello shivam kashyap"]);
const [val] = arr;
console.log(val);

const obj = {
  name: "             Shivam kashyap",
  age: 23,
  gender: true,
};
console.log(obj.name.length);
console.log(obj.name.trim().length);
const fun = async () => {
  setTimeout(() => {
        console.log("Second");
    }, 2000);
  console.log("first");
};

fun();
