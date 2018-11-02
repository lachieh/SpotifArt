import React, { Component } from 'react';
import PropTypes from 'prop-types';

class User extends Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    const { login } = this.props;
    login.call(this);
  }

  handleLogout() {
    const { logout } = this.props;
    logout.call(this);
  }

  render() {
    const { user } = this.props;
    return (
      <div className="User">
        {user ? (
          <div className="User__info">
            <img src={user.images[0].url} alt="" />
            <h4>{user.display_name}</h4>
            <button onClick={this.handleLogout} type="button">
              Logout
            </button>
          </div>
        ) : (
          <div className="User__logged-out">
            <button onClick={this.handleLogin} type="button">
              Login
            </button>
          </div>
        )}
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.shape({
    display_name: PropTypes.string.isRequired,
    images: PropTypes.array,
  }),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

User.defaultProps = {
  user: null,
};

export default User;
