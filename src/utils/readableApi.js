// @flow

class ReadableApi {
  static rootURL = 'http://localhost:5001/'; // TODO: dev vs deployment?
  static defaultHeaders = {
    Authorization: 'let-me-pass-please'
  };

  static errorHandler(error: any) {
    console.log('There was a problem. ', error);
    throw error;
  }

  // POSTS
  static getPost(post_id: string) {
    return fetch(this.rootURL + 'posts/' + post_id, {
      headers: {
        ...this.defaultHeaders
      }
    })
      .then(results => results.json())
      .catch(this.errorHandler);
  }

  static getPosts() {
    return fetch(this.rootURL + 'posts', {
      headers: {
        ...this.defaultHeaders
      }
    })
      .then(results => results.json())
      .catch(this.errorHandler);
  }

  static createNewPost(postFields) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(postFields),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'posts', requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static updatePost(post_id, postFields) {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(postFields),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'posts/' + post_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static updatePostScore(post_id, updateType) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(updateType),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'posts/' + post_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static deletePost(post_id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders
      }
    };

    return fetch(this.rootURL + 'posts/' + post_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  // COMMENTS
  static createNewComment(commentFields) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(commentFields),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'comments', requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static async getComments(post_id: string) {
    return fetch(this.rootURL + 'posts/' + post_id + '/comments', {
      headers: {
        ...this.defaultHeaders
      }
    })
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static updateComment(comment_id, commentFields) {
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(commentFields),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'comments/' + comment_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static updateCommentScore(comment_id, updateType) {
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(updateType),
      headers: {
        ...this.defaultHeaders,
        'Content-Type': 'application/json'
      }
    };

    return fetch(this.rootURL + 'comments/' + comment_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  static deleteComment(comment_id) {
    const requestOptions = {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders
      }
    };

    return fetch(this.rootURL + 'comments/' + comment_id, requestOptions)
      .then(response => response.json())
      .catch(this.errorHandler);
  }

  // CATEGORIES
  static getCategories() {
    return fetch(this.rootURL + 'categories', {
      headers: {
        ...this.defaultHeaders
      }
    })
      .then(results => results.json())
      .catch(this.errorHandler);
  }
}

export default ReadableApi;
