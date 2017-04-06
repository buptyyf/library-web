import React, {Component} from "react"
import "./changePassword.style.less"

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
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
                <div className="password-first ">
                    <input type="password" className="form-control" name="old-password" required />
                </div>
                <div className="change-password ">
                    <input type="password" className="form-control" name="new-password" required />
                </div>
                <div className="change-password ">
                    <input type="password" className="form-control" name="confirm-password" required />
                </div>
                <div className="button ">
                    <button className="btn btn-default submit"> 提交 </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className="btn btn-default reset"> 重置 </button>
                </div>
            </div>
          </div>
        );
    }
}
