import React, {Component} from "react"
import "./upDownCollectNum.style.less"

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
            <div className="col-sm-12">
                <div className="up-down-collect col-sm-4">
                    <p className="up-down-collect-num">17</p>
                    <p className="upload">上传量</p>
                </div>
                <div className="up-down-collect col-sm-4">
                    <p className="up-down-collect-num">6</p>
                    <p className="download">下载量</p>
                </div>
                <div className="up-down-collect1 col-sm-4">
                    <p className="up-down-collect-num">5</p>
                    <p className="collect">收藏量</p>
                </div>
            </div>
        );
    }
}