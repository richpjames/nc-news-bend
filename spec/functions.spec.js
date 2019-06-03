const { expect } = require("chai");
const { createRef, formatData, formatTime } = require("../utils/functions");

describe.only("formatting created_at", () => {
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


describe("createRef", () => {
  it("returns an empty object, when passed an empty array", () => {
    const input = [];
    const actual = createRef(input);
    const expected = {};
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
    created_at:new Date(1289996514171),
  }]