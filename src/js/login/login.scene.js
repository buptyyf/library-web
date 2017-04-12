import React, {Component} from "react";
import ReactDOM from "react-dom";
import {browserHistory} from 'react-router'
import './login.style.less'
import networkAction from "../utils/networkAction"

export default class Login extends Component {
    constructor(props) {  //只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
        super(props);
        this.state = {
            loginState: 0, // 0表示未登录，1表示用户名或密码错误，2表示该用户不存在
            content: ["用户名或密码错误，请重新输入！","该用户不存在，请重新输入！"]
        }
    }
    handleLogin(event) {
        event.preventDefault();
        console.log("handleLogin")
        let userNum = document.getElementsByName("userNum")[0].value;
        let password = document.getElementsByName("password")[0].value;
        console.log("usrNum: ", userNum, "psw: ", password);
        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/login`, "method": 'POST'},{"userNum": userNum, "password": password})
        result.then((res) => {
            console.log("login-result:", res);
            console.log("login-result:", res.code);
            if(res.code == 0){
                browserHistory.push('/home');
            }else if(res.code == 1){
                this.setState({loginState: 1});
            }else{
                this.setState({loginState: 2});
            }
         })
        event.preventDefault();
        // global.userInfo = {
        //     name: "yyf",
        //     authorId: 1
        // }
    }  

    renderWrong(){
        if(this.state.loginState == 1){
           return("用户名或密码错误，请重新输入！")
        }else if(this.state.loginState == 2){
           return("该用户不存在，请重新输入！")
        }else return null;
    }
    

    render(){
        return(
            <div >
                <div id="login-page" >
                    <form className="form-sign" onSubmit={this.handleLogin.bind(this)}>
                        <div className="head">
                            <h3 className="form-sign-heading">欢迎登录资源管理平台！</h3>
                        </div>
                        <div className="username">
                            <input type="text" className="form-control" name="userNum" placeholder="教工号" required />
                        </div>
                        <div className="password">
                            <input type="password" className="form-control" name="password" placeholder="密码" required />
                        </div>
                        <div className="summit">
                            <input className="btn btn-md btn-primary btn-block" type="submit" value="登录"/>
                        </div>   
                    </form>
                    <div className="login-remind">{this.renderWrong()}</div>
                    
                </div>
            </div>
        );
    }
}
