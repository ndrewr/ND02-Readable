// @flow

class ReadableApi {  
  static rootURL = 'http://localhost:5001/' // TODO: dev vs deployment?

  static getPosts() {
    const url = this.rootURL + 'posts'
    return fetch(
      url,
      {
          headers: { 'Authorization': 'whatever-you-want' }
      }
    )
    .then((results) => {
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
    // return fetch('http://localhost:5000/api/v1/cats').then(response => {
    //   return response.json();
    // }).catch(error => {
    //   return error;
    // });
  }

  static getCategories() {
    const url = this.rootURL + 'categories'
    return fetch(
      url,
      {
          headers: { 'Authorization': 'whatever-you-want' }
      }
    )
    .then((results) => {
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
