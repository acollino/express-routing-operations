const app = require("../app");
const fetch = require("node-fetch");
let server;

beforeAll(() => {
  server = app.listen(3000, () => {
    console.log("App on port 3000");
  });
});

describe("mean", () => {
  const nums = "1,2,3";
  test(`should be 2 when nums is ${nums}`, async function () {
    const resp = await fetch(`http://localhost:3000/mean?nums=${nums}`);
    const meanData = await resp.json();
    expect(meanData.operation).toBe("mean");
    expect(meanData.value).toBeCloseTo(2);
  });

  test("should be 5 when nums is only 5", async function () {
    const resp = await fetch("http://localhost:3000/mean?nums=5");
    const meanData = await resp.json();
    expect(meanData.operation).toBe("mean");
    expect(meanData.value).toBeCloseTo(5);
  });

  const testStr = "Test";
  test(`should be return an error when nums is '${testStr}'`, async function () {
    const resp = await fetch(`http://localhost:3000/mean?nums=${testStr}`);
    const meanData = await resp.json();
    expect(meanData.error.message).toBe(`${testStr} is not a number.`);
    expect(meanData.error.status).toBe(400);
  });

  test("should be return an error when query is empty", async function () {
    const resp = await fetch("http://localhost:3000/mean?");
    const meanData = await resp.json();
    expect(meanData.error.message).toBe("Nums query must be included.");
    expect(meanData.error.status).toBe(400);
  });
});

describe("median", () => {
  const nums = "1,2,3,4,5";
  test(`should be 3 when nums is ${nums}`, async function () {
    const resp = await fetch(`http://localhost:3000/median?nums=${nums}`);
    const medianData = await resp.json();
    expect(medianData.operation).toBe("median");
    expect(medianData.value).toBeCloseTo(3);
  });

  const numsUnordered = "5,3,2,1,4";
  test(`should be 3 when nums is unordered as ${numsUnordered}`, async function () {
    const resp = await fetch(
      `http://localhost:3000/median?nums=${numsUnordered}`
    );
    const medianData = await resp.json();
    expect(medianData.operation).toBe("median");
    expect(medianData.value).toBeCloseTo(3);
  });

  const numsEven = "3,2,1,4";
  test(`should be 2.5 when nums is unordered and an even length as ${numsEven}`, async function () {
    const resp = await fetch(`http://localhost:3000/median?nums=${numsEven}`);
    const medianData = await resp.json();
    expect(medianData.operation).toBe("median");
    expect(medianData.value).toBeCloseTo(2.5);
  });

  test("should be 5 when nums is only 5", async function () {
    const resp = await fetch("http://localhost:3000/median?nums=5");
    const medianData = await resp.json();
    expect(medianData.operation).toBe("median");
    expect(medianData.value).toBeCloseTo(5);
  });

  const testStr = "Test";
  test(`should return an error when nums is '${testStr}'`, async function () {
    const resp = await fetch(`http://localhost:3000/median?nums=${testStr}`);
    const medianData = await resp.json();
    expect(medianData.error.message).toBe(`${testStr} is not a number.`);
    expect(medianData.error.status).toBe(400);
  });

  test("should return an error when query is empty", async function () {
    const resp = await fetch("http://localhost:3000/median?");
    const medianData = await resp.json();
    expect(medianData.error.message).toBe("Nums query must be included.");
    expect(medianData.error.status).toBe(400);
  });
});

describe("mode", () => {
  const nums = "1,3,3,4,5";
  test(`should be 3 when nums is ${nums}`, async function () {
    const resp = await fetch(`http://localhost:3000/mode?nums=${nums}`);
    const modeData = await resp.json();
    expect(modeData.operation).toBe("mode");
    expect(modeData.value).toEqual([3]);
  });

  const numsMultiple = "1,3,3,4,4,5,5";
  test(`should be 3, 4, and 5 when nums has multiple modes as ${numsMultiple}`, async function () {
    const resp = await fetch(`http://localhost:3000/mode?nums=${numsMultiple}`);
    const modeData = await resp.json();
    expect(modeData.operation).toBe("mode");
    expect(modeData.value).toEqual([3, 4, 5]);
  });

  test("should be 5 when nums is only 5", async function () {
    const resp = await fetch("http://localhost:3000/mode?nums=5");
    const modeData = await resp.json();
    expect(modeData.operation).toBe("mode");
    expect(modeData.value).toEqual([5]);
  });

  const testStr = "Test";
  test(`should return an error when nums is '${testStr}'`, async function () {
    const resp = await fetch(`http://localhost:3000/mode?nums=${testStr}`);
    const modeData = await resp.json();
    expect(modeData.error.message).toBe(`${testStr} is not a number.`);
    expect(modeData.error.status).toBe(400);
  });

  test("should return an error when query is empty", async function () {
    const resp = await fetch("http://localhost:3000/mode?");
    const modeData = await resp.json();
    expect(modeData.error.message).toBe("Nums query must be included.");
    expect(modeData.error.status).toBe(400);
  });
});

afterAll(() => {
  server.close();
});
