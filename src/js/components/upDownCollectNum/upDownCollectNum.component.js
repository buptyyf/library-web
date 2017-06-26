import React, {Component} from "react"
import "./upDownCollectNum.style.less"
import {browserHistory} from "react-router"

export default class UpDownCollectNum extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }

    goToMyUploadPage() {
        browserHistory.push('/TeachingResourceManagement/myResources/contribution')
    }
    goToMyDownloadPage() {
        browserHistory.push('/TeachingResourceManagement/myResources/download')
    }
    goToMyCollectionPage() {
        browserHistory.push('/TeachingResourceManagement/myResources/collection')
    }
    render() {
        let {uploadNum, downloadNum, collectNum} = this.props;
        return (
            <div className="col-sm-12 up-down-collect-num">
                <div className="up-down-collect line col-sm-4" onClick={this.goToMyUploadPage.bind(this)}>
                    <p className="number">{uploadNum}</p>
                    <p className="upload">上传量</p>
                </div>
                <div className="up-down-collect line col-sm-4" onClick={this.goToMyDownloadPage.bind(this)}>
                    <p className="number">{downloadNum}</p>
                    <p className="download">下载量</p>
                </div>
                <div className="up-down-collect col-sm-4" onClick={this.goToMyCollectionPage.bind(this)}>
                    <p className="number">{collectNum}</p>
                    <p className="collect">收藏量</p>
                </div>
            </div>
        );
    }
}

UpDownCollectNum.propTypes = {
    uploadNum: React.PropTypes.number.isRequired,
    downloadNum: React.PropTypes.number.isRequired,
    collectNum: React.PropTypes.number.isRequired
}
UpDownCollectNum.defaultProps = {
    uploadNum: 0,
    downloadNum: 0,
    collectNum: 0
}