import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
import "./uploadButton.style.less"

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    goToUpload() {
        let isGuest = !global.userId || global.userId === 'guest';
        if(!isGuest) {
            browserHistory.push("/TeachingResourceManagement/myResources/upload");
        } else {
            browserHistory.push("/TeachingResourceManagement/login");
        }
    }
    render() {
        return (
            <div>
            <button className="btn btn-warning col-sm-12" onClick={this.goToUpload.bind(this)}>
                <i className="glyphicon glyphicon-cloud-upload upload"></i>
                <span className="upload-text"> 上传文档</span>
            </button>
            </div>
        );
    }
}
