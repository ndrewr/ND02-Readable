const clone = require('clone')

let db = {}

const defaultData = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false 
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false
  },
  "1nu3ok3rm9mf1d32lnez": {
    id: '1nu3ok3rm9mf1d32lnez',
    timestamp: 1468482837190,
    title: 'Why Redux',
    body: 'Lets talk about redux. The javascript library, just to be clear.',
    author: 'thangPrime',
    category: 'redux',
    voteScore: 0,
    deleted: false
  },  
  "8nr6og3sm6mc1b97lsei": {
    id: '8nr6og3sm6mc1b97lsei',
    timestamp: 1468479767190,
    title: 'My reactions to react',
    body: 'A play by play oral history of my true to life reactions to react.',
    author: 'thingone',
    category: 'react',
    voteScore: 10,
    deleted: false
  },
  "4gr8og9eb6vc2b76lpec": {
    id: '4gr8og9eb6vc2b76lpec',
    timestamp: 1488472733190,
    title: 'So you want to better yoself',
    body: 'Do not despair when the means to salvation is in your grasp. On the internets.',
    author: 'thaUdacian',
    category: 'udacity',
    voteScore: 18,
    deleted: false
  },
  "4er2oc7en2qa2x86ljwb": {
    id: '4er2oc7en2qa2x86ljwb',
    timestamp: 1482451733190,
    title: 'React may not be what you need',
    body: 'Do not fall into the React v Angular v Vue wars! Choose what is best for your situation.',
    author: 'DanAbramov',
    category: 'react',
    voteScore: 1,
    deleted: false
  },
  "7ir2oc4en2fr2v16lewd": {
    id: '7ir2oc4en2fr2v16lewd',
    timestamp: 1483876733190,
    title: 'Revolutioning how and where we learn',
    body: 'Got internets and a computer or mobile phone? Then no excuse not to Git Gud.',
    author: 'WalesMD',
    category: 'udacity',
    voteScore: 2,
    deleted: false
  },
  "5yu2oc4re2fr1a14weds": {
    id: '5yu2oc4re2fr1a14weds',
    timestamp: 1487771333127,
    title: 'React and the Functional Progamming Paradign',
    body: 'Object oriented paradigm popularity may be usurped.',
    author: 'TheDWB',
    category: 'react',
    voteScore: -3,
    deleted: false
  },
  "8tf2oc4re6gg1a14opti": {
    id: '8tf2oc4re6gg1a14opti',
    timestamp: 1473771630953,
    title: 'Handling Page Transitions in React',
    body: 'Its not super straightforward but its also really not too bad at all.',
    author: 'TheDWB',
    category: 'react',
    voteScore: 8,
    deleted: false
  },
  "5le5lw2en2wl2v13kwos": {
    id: '5le5lw2en2wl2v13kwos',
    timestamp: 1479726733382,
    title: 'I finished the Front End Program in 6 weeks!',
    body: 'Legit, too.',
    author: 'thaUdacian',
    category: 'udacity',
    voteScore: 1,
    deleted: false
  }
}

function getData (token) {
  let data = db[token]
  if (data == null) {
    data = db[token] = clone(defaultData)
  }
  return data
}

function getByCategory (token, category) {
  return new Promise((res) => {
    let posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => posts[key].category === category && !posts[key].deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function get (token, id) {
  return new Promise((res) => {
    const posts = getData(token)
    res(
      posts[id].deleted 
        ? {}
        : posts[id]
    )
  })
}

function getAll (token) {
  return new Promise((res) => {
    const posts = getData(token)
    let keys = Object.keys(posts)
    let filtered_keys = keys.filter(key => !posts.deleted)
    res(filtered_keys.map(key => posts[key]))
  })
}

function add (token, post) {
  return new Promise((res) => {
    let posts = getData(token)
    
    posts[post.id] = {
      id: post.id,
      timestamp: post.timestamp,
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category,
      voteScore: 1,
      deleted: false
    }
     
    res(posts[post.id])
  })
}

function vote (token, id, option) {
  return new Promise((res) => {
    let posts = getData(token)
    post = posts[id]
    switch(option) {
        case "upVote":
            post.voteScore = post.voteScore + 1
            break
        case "downVote":
            post.voteScore = post.voteScore - 1
            break
        default:
            console.log(`posts.vote received incorrect parameter: ${option}`)
    }
    res(post)
  })
}

function disable (token, id) {
    return new Promise((res) => {
      let posts = getData(token)
      posts[id].deleted = true
      res(posts[id])
    })
}

function edit (token, id, post) {
    return new Promise((res) => {
        let posts = getData(token)
        for (prop in post) {
            posts[id][prop] = post[prop]
        }
        res(posts[id])
    })
}

module.exports = {
  get,
  getAll,
  getByCategory,
  add,
  vote,
  disable,
  edit,
  getAll
}