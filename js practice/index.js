let s = "shivam k ashy ap";
console.log(s.trim("").split("").reverse().join(""));

// console.log(Math.max(1, 2, 3, 4, 5, 6, 7, 8, 0));
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 8, 8, 99];

let maxi = -1;

for (let i = 0; i < arr.length; i++) {
  maxi = Math.max(maxi, arr[i]);
}

console.log("Max is: ", maxi);
let uniqueArr = [...new Set(arr)];
console.log(uniqueArr[0]);

// sum of array
console.log(arr.reduce((sum, curr) => sum + curr));

let text = "hello world shivam kASHYAp rajpoot";
console.log(
  text
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.slice(1, w.length).toLocaleLowerCase())
    .join(" ")
);

let arr1 = [1, 3, 5],
  arr2 = [2, 4, 6];

console.log([...arr1, ...arr2].sort());

function maxChar(str) {
  let ans = "";
  let max = 0;
  let map = {};

  for (let c of str) {
    map[c] = map[c] + 1 || 1;
  }
  for (let c in map) {
    if (map[c] > max) {
      max = map[c];
      ans = c;
    }
  }
  console.log(map);
  return ans;
}
console.log(maxChar("suhani kapasiya"));
