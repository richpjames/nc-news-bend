const { expect } = require("chai");
const {
  createRef,
  formatData,
  formatTime,
  changeKeys
} = require("../utils/functions");
const {
  articleData,
  articleDataFormatted,
  changeKeysInputData,
  changeKeysExpectedData,
  createRefInputData
} = require("./data");

describe("formatting created_at", () => {
  it("returns an array when passed an array", () => {
    const input = [];
    const actual = formatTime(input);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });

  it("returns an array with time formatted Day Month Date Year Time when passed multiple objects", () => {
    const input = articleData;
    const actual = formatTime(input);
    const expected = articleDataFormatted;
    expect(actual).to.eql(expected);
  });
});
describe("changeKeys", () => {
  it("returns a new empty array, when passed an empty array", () => {
    const input = [];
    const actual = changeKeys(input);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input);
  });
  it("changes the key for one property on a single object in an array", () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    const actual = changeKeys(input, "created_by", "author");
    const expected = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        author: "butter_bridge",
        votes: 16,
        created_at: 1511354163389
      }
    ];
    expect(actual).to.eql(expected);
  });
  it("changes the key for one property on a multiple objects in an array", () => {
    const input = changeKeysInputData;
    const actual = changeKeys(input, "created_by", "author");
    const expected = changeKeysExpectedData;
    expect(actual).to.eql(expected);
  });
});
describe("createRef", () => {
  it("returns an object when passed an array", () => {
    const input = [];
    const actualOutput = createRef(input);
    const expectedOutput = {};
    expect(actualOutput).to.eql(expectedOutput);
  });

  it("returns a reference object with title = article_id when passed an array containing a single object", () => {
    const input = [
      {
        article_id: 31,
        title: "What to Cook This Week",
        body:
          "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste, and not including lunch because really when it comes to the midday hours you should get out of the office or the house and walk around. If you get something to eat, great, but the most important thing is to be outside where the stories are. There’s nothing happening at your desk but a screen. Anyway! I’m thinking chicken paprikash for dinner tonight, a nod toward the coming fall, served over buttery egg noodles, with green beans on the side. If you have the time, make an apple cake for dessert.",
        votes: 0,
        topic: "cooking",
        author: "tickle122",
        created_at: " 2017 - 11 - 05T00: 00: 00.000Z"
      }
    ];
    const actualOutput = createRef(input, "title", "article_id");
    const expectedOutput = {
      "What to Cook This Week": 31
    };
    expect(actualOutput).to.eql(expectedOutput);
  });
  it("returns a reference object with title = article_id when passed an array containing a multiple objects", () => {
    const input = createRefInputData;
    const actualOutput = createRef(input, "title", "article_id");
    const expectedOutput = {
      "What to Cook This Week": 31,
      "Stone Soup": 35
    };
    expect(actualOutput).to.eql(expectedOutput);
  });
});
describe("formatData", () => {
  it("returns a new array when passed an array", () => {
    const input = [];
    const actualOutput = formatData(input);
    const expectedOutput = [];
    expect(actualOutput).to.eql(expectedOutput);
    expect(actualOutput).to.not.equal(input);
  });
  it("returns a new array containing a single object with belongs_to swapped with article_id", () => {
    const inputData = [
      {
        body:
          "Placeat voluptatum consequatur ducimus et eum molestiae impedit eveniet. Recusandae rerum voluptas quia mollitia quam velit iusto. Eum eos similique minima necessitatibus nemo. Iure deleniti omnis enim animi iste delectus et consequuntur.",
        belongs_to: "Please stop worrying about Angular 3",
        created_by: "grumpy19",
        votes: 19,
        created_at: 1466627438075
      }
    ];
    const referenceObj = {
      "Please stop worrying about Angular 3": 5,
      "Stone Soup": 35
    };
    const keyToReject = "belongs_to";
    const newKey = "article_id";
    const actualOutput = formatData(
      inputData,
      referenceObj,
      keyToReject,
      newKey
    );
    const expectedOutput = [
      {
        body:
          "Placeat voluptatum consequatur ducimus et eum molestiae impedit eveniet. Recusandae rerum voluptas quia mollitia quam velit iusto. Eum eos similique minima necessitatibus nemo. Iure deleniti omnis enim animi iste delectus et consequuntur.",
        article_id: 5,
        created_by: "grumpy19",
        votes: 19,
        created_at: 1466627438075
      }
    ];
    expect(actualOutput).to.eql(expectedOutput);
  });
  it("returns a new array containing a single object with belongs_to swapped with article_id", () => {
    const inputData = [
      {
        body:
          "Placeat voluptatum consequatur ducimus et eum molestiae impedit eveniet. Recusandae rerum voluptas quia mollitia quam velit iusto. Eum eos similique minima necessitatibus nemo. Iure deleniti omnis enim animi iste delectus et consequuntur.",
        belongs_to: "Please stop worrying about Angular 3",
        created_by: "grumpy19",
        votes: 19,
        created_at: 1466627438075
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        belongs_to: "Stone Soup",
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    const referenceObj = {
      "Please stop worrying about Angular 3": 5,
      "Stone Soup": 35
    };
    const keyToReject = "belongs_to";
    const newKey = "article_id";
    const actualOutput = formatData(
      inputData,
      referenceObj,
      keyToReject,
      newKey
    );
    const expectedOutput = [
      {
        body:
          "Placeat voluptatum consequatur ducimus et eum molestiae impedit eveniet. Recusandae rerum voluptas quia mollitia quam velit iusto. Eum eos similique minima necessitatibus nemo. Iure deleniti omnis enim animi iste delectus et consequuntur.",
        article_id: 5,
        created_by: "grumpy19",
        votes: 19,
        created_at: 1466627438075
      },
      {
        body:
          "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
        article_id: 35,
        created_by: "butter_bridge",
        votes: 14,
        created_at: 1479818163389
      }
    ];
    expect(actualOutput).to.eql(expectedOutput);
  });
});
