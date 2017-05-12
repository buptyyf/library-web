import React, {Component} from "react"
import "./changePasswordDone.style.less"

export default class ChangePasswordDone extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="changePassword-done col-sm-offset-4">
                    <span className="glyphicon glyphicon-ok changePassword-done-pic"> </span>
                    <span className="text"> 密码修改成功！</span>
                </div>
            </div>
        );
    }
}