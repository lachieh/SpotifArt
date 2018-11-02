import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import AlbumCover from './AlbumCover';
import AlbumMeta from './AlbumMeta';
import Spotify from '../lib/spotify';
import User from './User';

const spotify = new Spotify();

const Callback = () => {
  spotify.handleCallback();
  return <Redirect to="/" />;
};

const Login = () => {
  window.location.href = spotify.getAuthUrl();
  return null;
};

class App extends Component {
  state = {
    user: null,
    track: null,
  };

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: Spotify.getFromCache('user'),
      track: Spotify.getFromCache('track'),
    });

    if (spotify.token) {
      spotify.getCurrentUser().then(user => {
        this.setState({ user });
      });

      spotify.getCurrentTrack().then(track => {
        this.setState({ track });
      });
    }
  }

  handleLogout() {
    spotify.logout();
    this.setState({
      track: null,
      user: null,
    });
  }

  render() {
    const { user, track } = this.state;
    let artists;
    if (track) {
      artists = track.item.artists.map(artist => artist.name);
      artists = artists.join(', ');
    }
    return (
      <Router>
        <div className="App">
          {track && (
            <div className="album">
              <AlbumCover
                albumId={track.item.uri}
                albumImg={track.item.album.images[0].url}
              />
              <AlbumMeta
                title={track.item.name}
                album={track.item.album.name}
                artist={artists}
                current={track.progress_ms}
                length={track.item.duration_ms}
              />
            </div>
          )}
          <User user={user} login={spotify.login} logout={this.handleLogout} />
          <Route path="/callback" render={Callback} />
          <Route path="/login" render={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
