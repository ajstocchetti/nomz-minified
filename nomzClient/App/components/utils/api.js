var api = {

  fetchFeed(id) {
    const FEED_URL = `http://localhost:1337/api/users/${id}/feed`
    return fetch(FEED_URL).then( (res) => res.json())
  },

  login(creds) {
    console.log('logging in', creds)
    const LOGIN_URL = 'http://localhost:1337/login';
    let config = {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(creds)
    };
    return fetch(LOGIN_URL, config).then( (res) => {
      if (res.status !== 200) {
        // If no 200, then just throw an error to reject the promise
        throw new Error(res);
      } else {
        // weird bug where the default server response
        // causes a parse error if repsonse isnt a stringified object
        return res.json();
      }
    })
  },

  logout() {
    const LOGOUT_URL = 'http://localhost:1337/logout';
    return fetch(LOGOUT_URL).then( (res) => res )
  }

}

module.exports = api;