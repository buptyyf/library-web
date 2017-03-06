import React, {Component} from "react"
import "./upload.style.less"

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
            <button className="btn btn-warning">
                <div className="glyphicon glyphicon-upload upload">上传我的文档</div>
            </button>
        );
    }
}
