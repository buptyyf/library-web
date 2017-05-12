import React, {Component} from "react"
import {browserHistory} from 'react-router'
import "./changePassword.style.less"
import networkAction from "../../../utils/networkAction"

export default class ChangePassword extends React.Component {
    constructor(props) {  //只有在constructor中可以直接为this.state分配值，其他情况要是用setState()方法更新state值，如this.setState({loginState:0})
            super(props);
            this.state = {
                oldPasswordValue: '' , 
                newPasswordValue: '' ,
                confirmPasswordValue: '' ,
                changePasswordState: '' ,
                content: ""
            }
    }

    handleChangePwdSummit(event) {
        event.preventDefault();
        console.log("handleChangePwdSummit");
        let oldPassword = this.state.oldPasswordValue
        let newPassword = this.state.newPasswordValue
        let confirmPassword = this.state.confirmPasswordValue
        this.setState({content: ""})
        console.log("oldPassword: ", oldPassword, "newPassword: ", newPassword, "confirmPassword: ", confirmPassword );
        let result;
        if(newPassword == confirmPassword){
            result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/updatePasswordCommit`, "method": 'POST'},{"oldPassword": oldPassword, "newPassword": newPassword})
            console.log("newPassword == confirmPassword");
        }else{
            console.log("newPassword != confirmPassword");
            this.setState({content: "输入不一致，请重新输入！"})
        }
        result.then((res) => {
            console.log("changePassword-result:", res);
            if(res.code == 0){
                browserHistory.push('/user/changePasswordDone');
            }else{
                alert("密码修改失败，请重新修改！")
            }
         })
        event.preventDefault();
    }  

    oldPasswordChange(event) {
        this.setState({
            oldPasswordValue: event.target.value
        })
    }
    newPasswordChange(event) {
        this.setState({
            newPasswordValue: event.target.value
        })
    }
    confirmPasswordChange(event) {
        this.setState({
            confirmPasswordValue: event.target.value,
            content: ""
        })
    }

    handleChangePwdReset(event){
        this.setState({
            oldPasswordValue: '',
            newPasswordValue: '',
            confirmPasswordValue: ''
        })
    }


    render() {
        return (
          <div >
            <div className="password-left col-sm-offset-3">
                <div className="password-text-first ">旧密码</div>
                <div className="password-text ">新密码</div>
                <div className="password-text ">新密码确认</div>
            </div>

            <div className="password-right">
              <form onSubmit={this.handleChangePwdSummit.bind(this)}>
                <div className="password-first ">
                    <input type="password" className="form-control" name="oldPassword"
                      value={this.state.oldPasswordValue} 
                      onChange={this.oldPasswordChange.bind(this)}
                     required />
                </div>
                <div className="change-password ">
                    <input type="password" className="form-control" name="newPassword"
                      value={this.state.newPasswordValue} 
                      onChange={this.newPasswordChange.bind(this)}
                     required />
                </div>
                <div className="confirmPassword">
                  <div className="change-password-last">
                    <input type="password" className="form-control" name="confirmPassword"
                      value={this.state.confirmPasswordValue} 
                      onChange={this.confirmPasswordChange.bind(this)}
                     required />
                  </div>
                  <div className="wrong-text ">{this.state.content} </div>
                </div>
                <div className="button ">
                    <input type="submit" className="btn btn-default submit" value="提交" />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input type="button" className="btn btn-default reset" onClick={this.handleChangePwdReset.bind(this)} value="重置" /> 
                </div>
              </form>
            </div>
          </div>
        );
    }
}
