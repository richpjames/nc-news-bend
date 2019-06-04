const { expect } = require("chai");
const { createRef, formatData, formatTime, changeKeys } = require("../utils/functions");

describe("formatting created_at", () => {
  it("returns an array when passed an array", () => {
    const input = [];
    const actual = formatTime(input)
    const expected = [];
    expect(actual).to.eql(expected)
    expect(actual).to.not.equal(input)
  })

  it("returns an array with time formatted Day Month Date Year Time when passed multiple objects", () => {
    const input = articleData;
    const actual = formatTime(input);
    const expected = articleDataFormatted;
    expect(actual).to.eql(expected)
  })
})


describe("changeKeys", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = changeKeys(input);
    const expected = [];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(input)
  });
  it("changes the key for one property on a single object in an array", () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    const actual = changeKeys(input, "created_by", "author");
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }];
    expect(actual).to.eql(expected);
  });
  it("changes the key for one property on a multiple objects in an array", () => {
    const input = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }, {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      created_by: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }];
    const actual = changeKeys(input, "created_by", "author");
    const expected = [{
      body:
        "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389,
    }, {
      body:
        'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
      belongs_to: 'Living in the shadow of a great man',
      author: 'butter_bridge',
      votes: 14,
      created_at: 1479818163389,
    },
    {
      body:
        'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
      belongs_to: 'Living in the shadow of a great man',
      author: 'icellusedkars',
      votes: 100,
      created_at: 1448282163389,
    }];
    expect(actual).to.eql(expected);
  });
})

const articleData = [
  {
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: 1542284514171,
    votes: 100,
  },
  {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell.',
    created_at: 1416140514171,
  },
  {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: 1289996514171,
  }]
const articleDataFormatted = [
  {
    title: 'Living in the shadow of a great man',
    topic: 'mitch',
    author: 'butter_bridge',
    body: 'I find this existence challenging',
    created_at: new Date(1542284514171),
    votes: 100,
  },
  {
    title: 'Sony Vaio; or, The Laptop',
    topic: 'mitch',
    author: 'icellusedkars',
    body:
      'Call me Mitchell.',
    created_at: new Date(1416140514171),
  },
  {
    title: 'Eight pug gifs that remind me of mitch',
    topic: 'mitch',
    author: 'icellusedkars',
    body: 'some gifs',
    created_at: new Date(1289996514171),
  }]