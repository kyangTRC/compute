import React, { Component } from 'react';
import './App.css';
import BasicUser from './trc/Basic';
import Upload from './trc/Upload';
import { BrowserRouter, Route, Redirect, withRouter } from 'react-router-dom';
const IS_TESTING=true;


const fakeAuthCentralState = {
  isAuthenticated: !!(localStorage.getItem("trclogin"))||false,
  testUserId: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    setTimeout(callback, 300);
  },
  signout(callback) {
    this.isAuthenticated = false;
    setTimeout(callback, 300);
  }
};

///////////test////////////
function TrcBanner(props){
    if (IS_TESTING) {
        return <span contenteditable id="animation">Connector</span>;
      }
    else{
        return <span>Welcome back!</span>;
    }  
}

function expandMenu(e) {
    let navWrapper = document.querySelector('.nav-wrapper');
    navWrapper.classList.toggle('active');
}

const LogOut = () => <div className="test test-card TrcBanner full">
      <div className="test-text test">
        <h1>trc</h1>
        <h2>TRC Connector</h2>
        <TrcBanner isTesting = {IS_TESTING} />
        <div className="bg-transparent left test">
        </div>
        <div className="bg-transparent center test">
        </div>
        <div className="bg-transparent right test">
        </div>
        <a href="/userlogin" className="back-button">Go back</a>
      </div>
  </div>;

const Header = () => <div><div className="test test-card TrcBanner">
<a href="#" id="logo-connector-trc"></a>
<div className="test-text test">
  <h1>TRC</h1>
  <h2>digital</h2>
  <TrcBanner/>
  <div className="bg-transparent left test">
  </div>
  <div className="bg-transparent center test">
  </div>
  <div className="bg-transparent right test">
  </div>
</div>
</div>
<div className="nav-wrapper">
  <nav>
      <div className="navigation">
          <ul className="nav-items">
              <li><a href="http://trcnet.trcsolutions.com" target="_blank" rel="noopener noreferrer">TRCNet</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">About</a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer">Get Support</a></li>
              <li><AuthButton/></li>
          </ul>
          <div className="nav-toogler" onClick={expandMenu}></div>
      </div>
  </nav>
</div>
</div>;
const ProtectedUser = () =>  <div className="loggedIn"><Header /><div className="loggedInContent"><BasicUser /></div></div>;
const ProtectedUpload = () =>  <div className="loggedIn"><Header /><div className="loggedInContent"><Upload /></div></div>;

class Login extends React.Component {
  constructor(props) {
    super(props);
    localStorage.removeItem('trclogin');

    this.state = {
      name: null,
      redirectToReferrer: false
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    localStorage.setItem('trclogin', name);
    this.setState({
      name: value,
      [name]: value
    });
  }

  login = () => {
    if (this.state.name==="keyang"){
      fakeAuthCentralState.authenticate(() => {
        this.setState(() => ({
          redirectToReferrer: true
        }));
      });
    }
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/upload' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer === true) {
      this.props.history.push(from.pathname);
    }

    return (
         <div>
         <Header />
          <div className="login">
               <div className="login-form">
                <div className="control-group">
                <input type="text" className="login-field" placeholder="username" id="login-name" onChange={this.handleInputChange}/>
                <label className="login-field-icon fui-user" for="login-name"></label>
                </div>

                <div className="control-group">
                <input type="password" className="login-field" placeholder="password" id="login-pass" onChange={this.handleInputChange}/>
                <label className="login-field-icon fui-lock" for="login-pass"></label>
                </div>

                <div className="control-group">
                <input type="checkbox" name="remember" value="true" className= "remember" onChange={this.handleInputChange} /> 
                <label className="login-field-icon remember" for="login-remember">
                Remember me</label>
                </div>

                <button className="btn btn-primary btn-large btn-block" onClick={this.login}>login</button>
              </div>
            </div>
      </div>
    )
  }
}


const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    fakeAuthCentralState.isAuthenticated ? <Component {...props} />
      : <Redirect to={{
          pathname: '/userlogin',
          state: { from: props.location }
        }} />
  )} />
);

function logOut() {
    let body = document.querySelector('body');
    body.classList.add('logOut');
}

const AuthButton = withRouter(({ history }) => (
  fakeAuthCentralState.isAuthenticated ? (
      <a href="/logout" onClick={() => {
        fakeAuthCentralState.signout(() => history.push('/'));
      }}>Log Out</a>
  ) : (
    <a href="/userlogin">Log In</a>
  )
));

class App extends Component {
  render() {
    return (
      <div className="App" style={{ width: "100%", height: "100%" }}>
        <BrowserRouter>
          <div>
            <Route path="/" exact component={withRouter(Login)}/>
            <ProtectedRoute path='/upload' component={ProtectedUpload} />
            <ProtectedRoute path='/protecteddata' component={ProtectedUser} />
            <Route path="/userlogin" component={withRouter(Login)}/>
            <Route path="/logout" component={withRouter(LogOut)}/>      
          </div>
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
