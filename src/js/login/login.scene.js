import React, {Component} from "react";
import ReactDOM from "react-dom";
import {browserHistory} from 'react-router'
import './login.style.less'

export default class Login extends Component {
    handleLogin() {
        console.log("handleLogin")
        browserHistory.push('/home');
    }
    render(){
        return(
            <div id="login-page">
                <div className="form-sign" role="form">
                    <h2 className="form-sign-heading">欢迎登陆</h2>
                    <input type="text" className="form-control" name="username" placeholder="Username" required />
                    <input type="password" className="form-control" name="password" placeholder="Password" required />
                    <button className="btn btn-md btn-primary btn-block" type="submit" onClick={() => this.handleLogin()}>登陆</button>
                </div>
            </div>
        );
    }
}
