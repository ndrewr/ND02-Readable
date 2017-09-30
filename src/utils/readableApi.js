// @flow

class ReadableApi {  
  static rootURL = 'http://localhost:5001/' // TODO: dev vs deployment?
  static defaultOptions = {
    headers: { 'Authorization': 'whatever-you-want' }
  }

  static getPosts() {
    const url = this.rootURL + 'posts'
    return fetch(
      url,
      {
        ...this.defaultOptions,
      }
    ).then(
    (results) => {
      return results.json()
    })
    // .then((data) => {
    //   console.log('fetching posts...', data)
    //   return data
    // })
    .catch((error) => {
      console.log('There was a problem. ', error)
      return []
    })
  }

  static createNewPost(options) {
    var requestOptions = {
      method: 'POST',
      body: JSON.stringify(options),
      headers: {
        'Authorization': 'whatever-you-want',
        "Content-Type": "application/json"
      },
    };

    const url = this.rootURL + 'posts'

    fetch(
      url,
      requestOptions
    ).then(
    (response) => {
      return response.json();
    }).then(
    (data) => {
      console.log('Created Post:', data);
    })
    .catch(error => console.log('post error!', error))
  }

  static getCategories() {
    const url = this.rootURL + 'categories'
    return fetch(
      url,
      {
        ...this.defaultOptions
      }
    ).then(
    (results) => {
      return results.json()
    })
    // .then((data) => {
    //   console.log('fetching categories...', data)
    //   // this.setState({cats: data.categories})
    // })
    .catch((error) => {
      console.log('There was a problem. ', error)
      return {categories: []}
    })
  }
}

export default ReadableApi;
