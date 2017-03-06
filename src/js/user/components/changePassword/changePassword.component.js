import React, {Component} from "react"
import "./changePassword.style.less"

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
            <div>
                <div className="old-password">
                    旧密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input name="" type="password"/> 
                </div>
                <div className="new-password">
                    新密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input name="" type="password"/> 
                </div>
                <div className="confirm-password">
                    新密码确认  <input name="" type="password"/> 
                </div>
                <div className="submit1">
                    <input name="" type="submit"/> 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <input name="" type="reset" value="重置"/>
                </div>

            </div>
        );
    }
}
