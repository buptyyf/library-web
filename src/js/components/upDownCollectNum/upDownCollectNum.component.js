import React, {Component} from "react"
import "./upDownCollectNum.style.less"
import {browserHistory} from "react-router"

export default class UpDownCollectNum extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }

    goToMyUploadPage() {
        browserHistory.push('/myResources/contribution')
    }
    goToMyDownloadPage() {
        browserHistory.push('/myResources/download')
    }
    goToMyCollectionPage() {
        browserHistory.push('/myResources/collection')
    }
    render() {
        return (
            <div className="col-sm-12 up-down-collect-num">
                <div className="up-down-collect col-sm-4" onClick={this.goToMyUploadPage.bind(this)}>
                    <p className="number">17</p>
                    <p className="upload">上传量</p>
                </div>
                <div className="up-down-collect col-sm-4" onClick={this.goToMyDownloadPage.bind(this)}>
                    <p className="number">6</p>
                    <p className="download">下载量</p>
                </div>
                <div className="up-down-collect col-sm-4" onClick={this.goToMyCollectionPage.bind(this)}>
                    <p className="number">5</p>
                    <p className="collect">收藏量</p>
                </div>
            </div>
        );
    }
}