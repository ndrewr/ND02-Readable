// @flow

class ReadableApi {  
  static rootURL = 'http://localhost:5001/' // TODO: dev vs deployment?
  static defaultHeaders = {
    'Authorization': 'whatever-you-want'
  }

  static errorHandler(error: any) {
    console.log('There was a problem. ', error)
  }

  static getPosts() {
    return fetch(
      this.rootURL + 'posts',
      {
        headers: {
          ...this.defaultHeaders,
        }
      }
    )
    .then(results => results.json())
    .catch(this.errorHandler)
  }

  static createNewPost(postFields) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(postFields),
      headers: {
        ...this.defaultHeaders,
        "Content-Type": "application/json"
      },
    }

    return fetch(
      this.rootURL + 'posts',
      requestOptions
    )
    .then(response => response.json())
    .then(
    (data) => {
      console.log('Created Post:', data);
      return data
    })
    .catch(this.errorHandler)
  }

  static getCategories() {
    return fetch(
      this.rootURL + 'categories',
      {
        headers: {
          ...this.defaultHeaders,
        }
      }
    )
    .then((results) => results.json())
    .catch(this.errorHandler)
  }
}

export default ReadableApi;
