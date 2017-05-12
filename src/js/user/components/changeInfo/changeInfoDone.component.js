import React, {Component} from "react"
import "./changeInfoDone.style.less"

export default class ChangeInfoDone extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>
                <div className="changeInfo-done col-sm-offset-4">
                    <span className="glyphicon glyphicon-ok changeInfo-done-pic"> </span>
                    <span className="text"> 资料修改成功！</span>
                </div>
            </div>
        );
    }
}