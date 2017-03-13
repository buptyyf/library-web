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
                <div className="old-password col-sm-offset-4">
                    旧密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="" type="password"/> 
                </div>
                <div className="new-password col-sm-offset-4">
                    新密码&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="" type="password"/> 
                </div>
                <div className="confirm-password col-sm-offset-4">
                    新密码确认  <input name="" type="password"/> 
                </div>
                <div className="submit col-sm-offset-5 ">
                   
                    <button className="btn btn-default lightblue" > 提交 </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className="btn btn-default lightblue" > 重置 </button>
                </div>

            </div>
        );
    }
}
