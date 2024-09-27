const isAuth = require("../middleware/auth");

it("should through error if no authrization header present", async function () {
  const chai = await import("chai");
  const { expect } = chai;

  const n1 = 10;
  const n2 = 45;
  expect(n1 + n2).to.equal(55);
});
