'use strict';

import React         from 'react';
import {Link}        from 'react-router';
import DocumentTitle from 'react-document-title';
import CurrentUserStore from '../stores/CurrentUserStore';
import CurrentUserActions from '../actions/CurrentUserActions';

const propTypes = {
  currentUser: React.PropTypes.object
};

class LoginPage extends React.Component {

  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCredentialChange = this.handleCredentialChange.bind(this);
    this.state = {
      dataLoading: false,
      credentials: {
        username: '',
        password: ''
      }
    };
  }

  componentDidMount() {
    CurrentUserStore.listen(this.onLoggedIn);
  }

  onLoggedIn(err, status) {
    if(err) {
      console.log('Error=',err);
    } else {
      console.log('logggged in');
    }
  }

  login(e) {
    e.preventDefault();
    console.log('this.credentials=',this.state.credentials);
    CurrentUserActions.login(this.state.credentials)
  }

  handleChange(e){
      let {name,value} = e.target;
      console.log(name, value)
      var newState = {};
      newState[name] = value;
      this.setState(newState);
  }

  handleCredentialChange(e) {
      let {name,value} = e.target;
      var newState = {credentials: this.state.credentials};
      newState.credentials[name] = value;
      this.setState(newState);
  }

  render() {
    var dataLoadingAnimation = '';
    if(this.state.dataLoading) {
      dataLoadingAnimation = <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>;
    }
    return (
      <DocumentTitle title="Login">
        <section className="login-page">

          <div>
            Login
          </div>
          <p>{this.state.credentials.username}</p>
          <p>{this.state.credentials.password}</p>

          <div>
            <form name="form" onSubmit={this.login} role="form">
              <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="username" id="username" className="form-control" value={this.state.credentials.username} onChange={this.handleCredentialChange} required />
              </div>
              <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" className="form-control" value={this.state.credentials.password} onChange={this.handleCredentialChange} required />
              </div>
              <div className="form-actions">
                  <button type="submit" className="btn btn-danger">Login</button>
                  {dataLoadingAnimation}
              </div>
          </form>
          </div>

        </section>
      </DocumentTitle>
    );
  }

}

LoginPage.propTypes = propTypes;

export default LoginPage;