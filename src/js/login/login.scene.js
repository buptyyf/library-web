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
                    <div className="head">
                        <h3 className="form-sign-heading">欢迎登录资源管理平台！</h3>
                    </div>
                    <div className="username">
                        <input type="text" className="form-control" name="username" placeholder="Username" required />
                    </div>
                    <div className="password">
                        <input type="password" className="form-control" name="password" placeholder="Password" required />
                    </div>
                    <div className="summit">
                        <button className="btn btn-md btn-primary btn-block" type="submit" onClick={() => this.handleLogin()}>登陆</button>
                    </div>
                </div>
            </div>
        );
    }
}
