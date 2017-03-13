import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
import "./uploadButton.style.less"

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    goToUpload() {
        browserHistory.push("/myResources/upload")
    }
    render() {
        return (
            <button className="btn btn-warning col-sm-12" onClick={this.goToUpload.bind(this)}>
                <i className="glyphicon glyphicon-cloud-upload upload"></i>上传我的文档
            </button>
        );
    }
}
