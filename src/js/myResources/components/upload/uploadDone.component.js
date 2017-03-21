import React, {Component} from "react"
import {Link} from "react-router"
import "./uploadDone.style.less"
import $ from 'jquery'

export default class UploadDone extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }

    render() {
        return (
            <div>
                上传成功！
            </div>
        );
    }
}
