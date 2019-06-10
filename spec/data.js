const articleData = [
  {
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: 1542284514171,
    votes: 100
  },
  {
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell.",
    created_at: 1416140514171
  },
  {
    title: "Eight pug gifs that remind me of mitch",
    topic: "mitch",
    author: "icellusedkars",
    body: "some gifs",
    created_at: 1289996514171
  }
];
const articleDataFormatted = [
  {
    title: "Living in the shadow of a great man",
    topic: "mitch",
    author: "butter_bridge",
    body: "I find this existence challenging",
    created_at: new Date(1542284514171),
    votes: 100
  },
  {
    title: "Sony Vaio; or, The Laptop",
    topic: "mitch",
    author: "icellusedkars",
    body: "Call me Mitchell.",
    created_at: new Date(1416140514171)
  },
  {
    title: "Eight pug gifs that remind me of mitch",
    topic: "mitch",
    author: "icellusedkars",
    body: "some gifs",
    created_at: new Date(1289996514171)
  }
];

const changeKeysInputData = [
  {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    created_by: "butter_bridge",
    votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
    belongs_to: "Living in the shadow of a great man",
    created_by: "butter_bridge",
    votes: 14,
    created_at: 1479818163389
  },
  {
    body:
      "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
    belongs_to: "Living in the shadow of a great man",
    created_by: "icellusedkars",
    votes: 100,
    created_at: 1448282163389
  }
];

const changeKeysExpectedData = [
  {
    body:
      "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
    belongs_to: "They're not exactly dogs, are they?",
    author: "butter_bridge",
    votes: 16,
    created_at: 1511354163389
  },
  {
    body:
      "The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.",
    belongs_to: "Living in the shadow of a great man",
    author: "butter_bridge",
    votes: 14,
    created_at: 1479818163389
  },
  {
    body:
      "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.",
    belongs_to: "Living in the shadow of a great man",
    author: "icellusedkars",
    votes: 100,
    created_at: 1448282163389
  }
];

const createRefInputData = [
  {
    article_id: 31,
    title: "What to Cook This Week",
    body:
      "Good morning. Here’s the plan for the week, not including breakfast because I’m on a farina kick and that’s not to everyone’s taste, and not including lunch because really when it comes to the midday hours you should get out of the office or the house and walk around. If you get something to eat, great, but the most important thing is to be outside where the stories are. There’s nothing happening at your desk but a screen. Anyway! I’m thinking chicken paprikash for dinner tonight, a nod toward the coming fall, served over buttery egg noodles, with green beans on the side. If you have the time, make an apple cake for dessert.",
    votes: 0,
    topic: "cooking",
    author: "tickle122",
    created_at: " 2017 - 11 - 05T00: 00: 00.000Z"
  },
  {
    article_id: 35,
    title: "Stone Soup",
    body:
      "The first day I put my family on a Paleolithic diet, I made my kids fried eggs and sausage for breakfast. If they were still hungry, I told them, they could help themselves to more sausage, but they were not allowed to grab a slice of bread, or toast an English muffin, or pour themselves a bowl of cereal. This represented a reversal of the usual strictures, and they were happy to oblige. It was like some weird, unexpected holiday—Passover in July.",
    votes: 0,
    topic: "cooking",
    author: "cooljmessy",
    created_at: "2016 - 12 - 13T00: 00: 00.000Z"
  }
];
module.exports = {
  articleData,
  articleDataFormatted,
  changeKeysInputData,
  changeKeysExpectedData,
  createRefInputData
};
