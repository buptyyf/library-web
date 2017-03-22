import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
import "./uploadDone.style.less"
import $ from 'jquery'

export default class UploadDone extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }
    goToUpload() {
        browserHistory.push("/myResources/upload")
    }
    render() {
        return (
            <div>
                <div className="up-load-done col-sm-offset-4">
                    <span className="glyphicon glyphicon-ok up-load-down-pic"> </span>
                    <span className="text"> 恭喜！文档上传成功</span>
                </div>
                <div>
                    <button className="btn btn-warning col-sm-offset-5 upload-again" onClick={this.goToUpload.bind(this)}>
                        <i className="glyphicon glyphicon-cloud-upload upload"></i> 
                        <span className="upload-again-text"> 继续上传</span>
                    </button>
                </div>
            </div>
        );
    }
}
