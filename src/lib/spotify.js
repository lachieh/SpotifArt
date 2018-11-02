class Spotify {
  clientId = '0a34c220b4bd4822b7778e75e3c22422';

  clientIdSecretBase64 =
    'MGEzNGMyMjBiNGJkNDgyMmI3Nzc4ZTc1ZTNjMjI0MjI6YWNhODZlNmM2ZWU2NDk2ODgyODE0NDQxNWRkNmZjYzM=';

  scopes = ['user-read-currently-playing', 'user-read-playback-state'];

  redirectUri = 'http://localhost:3000/callback';

  token = null;

  expiry = null;

  constructor() {
    this.token = localStorage.getItem('token');
    this.expiry = localStorage.getItem('expiry');

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    window.location.href = this.getAuthUrl();
  }

  logout() {
    localStorage.clear();
    this.token = null;
    this.expiry = null;
  }

  checkAuth() {
    if (!this.token) {
      window.location.href = this.getAuthUrl();
      return false;
    }
    if (this.expiry && this.expiry < Date.now()) {
      const data = this.getNewToken();
      this.token = data.access_token;
      this.expiry = data.expires_in;
    }
    return true;
  }

  handleCallback() {
    const params = Spotify.decodeHash(window.location.hash);
    if (!params.access_token) {
      return false;
    }

    this.token = params.access_token;
    this.expiry = new Date().setMilliseconds(
      Date.now() + Number(params.expires_in)
    );

    localStorage.setItem('token', this.token);
    localStorage.setItem('expiry', this.expiry);

    return true;
  }

  getCurrentUser() {
    return this.getFromApi('/me', 'user');
  }

  getCurrentTrack() {
    return this.getFromApi('/me/player/currently-playing', 'track');
  }

  static getFromCache(key) {
    let cache = null;

    try {
      cache = JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return null;
    }

    return cache;
  }

  getFromApi(endpoint, key) {
    this.checkAuth();

    if (!this.token) {
      return new Promise((res, rej) => {
        res(null);
      });
    }

    const url = `https://api.spotify.com/v1${endpoint}`;

    const request = new Request(url, {
      headers: new Headers({
        Authorization: `Bearer ${this.token}`,
      }),
    });

    return fetch(request)
      .then(res => res.json())
      .then(data => (data.error ? null : data))
      .then(data => {
        localStorage.setItem(key, JSON.stringify(data));
        return data;
      })
      .catch(() => false);
  }

  getNewToken() {
    const { token, redirectUri } = this;
    const url = `https://accounts.spotify.com/api/token?grant_type=authorization_code&code=${token}&redirect_uri=${redirectUri}`;

    const request = new Request(url, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Basic ${this.clientIdSecretBase64}`,
      }),
    });

    return fetch(request)
      .then(res => res.json())
      .then(data => data)
      .catch(() => false);
  }

  getAuthUrl() {
    const { token, clientId: id, redirectUri: uri } = this;
    const scopes = this.scopes.join('%20');
    let loginUrl = 'https://accounts.spotify.com/authorize?';
    loginUrl += '&response_type=token';
    loginUrl += `&client_id=${id}`;
    loginUrl += scopes ? `&scope=${scopes}` : '';
    loginUrl += `&redirect_uri=${uri}`;
    loginUrl += token ? '&show_dialog=true' : '';
    return loginUrl;
  }

  static decodeHash(hash) {
    const hashParams = {};
    const regex = /([^&;=]+)=?([^&;]*)/g;
    const hashString = hash.substring(1);
    let matches;

    while ((matches = regex.exec(hashString))) {
      hashParams[matches[1]] = decodeURIComponent(matches[2]);
    }

    return hashParams;
  }
}

export default Spotify;
