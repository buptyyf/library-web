import React, {Component} from "react"
import {Link} from "react-router"
import "./uploadButton.style.less"

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
            <button className="btn btn-warning col-sm-12">
                <Link to="/myResources/upload" className="glyphicon glyphicon-cloud-upload upload">上传我的文档</Link>
            </button>
        );
    }
}
