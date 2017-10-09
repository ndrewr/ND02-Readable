const clone = require('clone')

let db = {}

const defaultData = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am another COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false 
  },
  "892tur4ut45ut8v4g9wun72f": {
    id: '892tur4ut45ut8v4g9wun72f',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166813634,
    body: 'Hi there! I am a COMMENT, too.',
    author: 'thingthree',
    voteScore: 1,
    deleted: false,
    parentDeleted: false 
  },
  "694gbe4ut84ut8v4t8wpx12v": {
    id: '694gbe4ut84ut8v4t8wpx12v',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468165272634,
    body: 'Hi there! I am a COMMENT.',
    author: 'Thing',
    voteScore: 3,
    deleted: false,
    parentDeleted: false 
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  },
  "3ru4bbut433n8un48dj34": {
    id: '3ru4bbut433n8un48dj34',
    parentId: "4gr8og9eb6vc2b76lpec",
    timestamp: 1469479793790,
    body: 'Comments. Are. AWESOME.',
    author: 'thingThree',
    voteScore: -1,
    deleted: false,
    parentDeleted: false
  },
  "8gh5hdwe73n8un48yb93": {
    id: '8gh5hdwe73n8un48yb93',
    parentId: "4gr8og9eb6vc2b76lpec",
    timestamp: 1469479738290,
    body: 'Let me just say something',
    author: 'FIRST!?1',
    voteScore: -7,
    deleted: false,
    parentDeleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByParent (token, parentId) {
  return new Promise((res) => {
    let comments = getData(token)
    let keys = Object.keys(comments)
    filtered_keys = keys.filter(key => comments[key].parentId === parentId && !comments[key].deleted)
    res(filtered_keys.map(key => comments[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const comments = getData(token)
    res(
      comments[id].deleted || comments[id].parentDeleted
        ? {}
        : comments[id]      
      )
  })
}

function add (token, comment) {
  return new Promise((res) => {
    let comments = getData(token)

    comments[comment.id] = {
      id: comment.id,
      timestamp: comment.timestamp,
      body: comment.body,
      author: comment.author,
      parentId: comment.parentId,
      voteScore: 1,
      deleted: false,
      parentDeleted: false
    }
     
    res(comments[comment.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let comments = getData(token)
    comment = comments[id]
    switch(option) {
        case "upVote":
            comment.voteScore = comment.voteScore + 1
            break
        case "downVote":
            comment.voteScore = comment.voteScore - 1
            break
        default:
            console.log(`comments.vote received incorrect parameter: ${option}`)
    }
    res(comment)
  })
}

function disableByParent (token, post) {
    return new Promise((res) => {
        let comments = getData(token)
        keys = Object.keys(comments)
        filtered_keys = keys.filter(key => comments[key].parentId === post.id)
        filtered_keys.forEach(key => comments[key].parentDeleted = true)
        res(post)
    })
}

function disable (token, id) {
    return new Promise((res) => {
      let comments = getData(token)
      comments[id].deleted = true
      res(comments[id])
    })
}

function edit (token, id, comment) {
    return new Promise((res) => {
        let comments = getData(token)
        for (prop in comment) {
            comments[id][prop] = comment[prop]
        }
        res(comments[id])
    })
}

module.exports = {
  get,
  getByParent,
  add,
  vote,
  disableByParent,
  disable,
  edit
}