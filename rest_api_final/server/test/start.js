// const chai =  import("chai");
// const { expect } = chai;

// it("should do sum", function () {
//   const n1 = 10;
//   const n2 = 45;
//   expect(n1 + n2).to.equal(55);
// });

it("should do sum", async function () {
  const chai = await import("chai");
  const { expect } = chai;

  const n1 = 10;
  const n2 = 45;
  expect(n1 + n2).to.equal(55);
});


it("should not do sum", async function () {
    const chai = await import("chai");
    const { expect } = chai;
  
    const n1 = 10;
    const n2 = 45;
    expect(n1 + n2).not.to.equal(5);
  });
  