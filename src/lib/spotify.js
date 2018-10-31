class Spotify {
  clientId = '0a34c220b4bd4822b7778e75e3c22422';

  scopes = ['user-read-currently-playing', 'user-read-playback-state'];

  redirectUri = 'http://localhost:3000/callback';

  token = null;

  expiry = null;

  static checkAuth() {
    if (typeof this.token === 'undefined') {
      window.location.href = this.getAuthUrl();
    } else {
      return this.token;
    }
    return false;
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

    return true;
  }

  async getCurrentUser() {
    const request = this.getRequest('/me');

    return fetch(request)
      .then(res => res.json())
      .catch(() => false);
  }

  async getCurrentTrack() {
    const request = this.getRequest('/me/player/currently-playing');

    return fetch(request)
      .then(res => res.json())
      .catch(() => false);
  }

  getRequest(endpoint) {
    const url = `https://api.spotify.com/v1${endpoint}`;

    return new Request(url, {
      headers: new Headers({
        Authorization: `Bearer ${this.token}`,
      }),
    });
  }

  getAuthUrl() {
    const id = this.clientId;
    const scopes = this.scopes.join('%20');
    const uri = this.redirectUri;
    return `https://accounts.spotify.com/authorize?client_id=${id}&scope=${scopes}&response_type=token&redirect_uri=${uri}`;
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
