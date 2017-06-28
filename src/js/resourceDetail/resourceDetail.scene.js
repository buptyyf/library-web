import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import { Link } from "react-router"
import ReactPDF from 'react-pdf'
import networkAction from "../utils/networkAction"
import { date } from "../utils/utilFunctions"
import config from "../config.js"
import './resourceDetail.style.less'

export default class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            resId: "",
            file: "",
            pageIndex: null,
            pageNumber: null,
            total: null,
            description: "",
            resourceRecommend: [],
            comments: [],
            contributor: "",
            commentsNum: 0,
            downloads: 0,
            date: "",
            score: 0,   //资源评分
            viewNum: 0,
            commentContent: "",
            commentScore: 0, //用户提交的评分
            fileFormat: "",
            whetherCollect: false,  //true表示已收藏，false表示未收藏
            //collectStyle:"",
        };
    }   
    componentWillMount(){
        this.initNetwork();
        const whetherCollectResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/details/whetherCollect`, method: `POST`}, {resId: this.props.params.id})
        whetherCollectResult.then((res) => {
            console.log("whetherCollectResult: ", res);
            if(res.code == 0){
                this.setState({
                    whetherCollect: true,
                })
            }
        })
        // if(this.state.whetherCollect == 1){
        //     this.setState({
        //         collectStyle:"", 
        //     })
        // }
    }
    initNetwork() {
        console.log("resId: ", this.props.params.id)
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/getResourceDetails`, method: `POST`}, {resId: this.props.params.id})
        result.then((res) => {
            console.log("res content: ", res)
            this.setState({
                title: res.data.resourceInfo.title,
                file: res.data.resourceInfo.viewPath,
                description: res.data.resourceInfo.description,
                comments: res.data.comments.resoureList,
                commentsNum: res.data.comments.resultCount,
                date: date(res.data.resourceInfo.date),
                downloads: res.data.resourceInfo.downloads,
                score: res.data.resourceInfo.commentscore,
                viewNum: res.data.resourceInfo.pageviews,
                resId: res.data.resourceInfo.resId,
                contributor: res.data.resourceInfo.contributorName,
                fileFormat:  res.data.fileFormat
            })
        })
    }

    filePreview(){
        if(this.state.fileFormat == "pdf"){
             console.log("file path: ", this.state.file);
            return(
                <ReactPDF 
                    file={this.state.file}
                    onDocumentLoad={this.onDocumentLoad.bind(this)}
                    onPageLoad={this.onPageLoad.bind(this)}
                    pageIndex={this.state.pageIndex}
                    error={"此文件无法预览"}/>
            )
        } else if(this.state.fileFormat == "mp4"){
            console.log("file path: ", this.state.file);
            return(
                <video src={this.state.file}  controls="controls">
                </video>
            )
        } else if(this.state.fileFormat == "swf") {
            console.log("file path: ", this.state.file);
            return (
                <embed src={this.state.file} allowFullScreen="true" quality="high" width="480" height="400" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>
            )
        } else{
            // return(
            //     <video src={this.state.file}  controls="controls">
            //     </video>
            // )
        }

    }

    onDocumentLoad({ total }) {
        this.setState({ total });
    }

    onPageLoad({ pageIndex, pageNumber }) {
        this.setState({ pageIndex, pageNumber });
    }

    changePage(by) {
        this.setState(prevState => ({
            pageIndex: prevState.pageIndex + by,
        }));
    }
    handleDownload() {
        const result = networkAction.promiseNetwork({
            url: `TeachingResourceManagement/teachingResource/download`, 
            method: `POST`
        }, {
            resourceId: "000029"
        })
        result.then((res) => {
            console.log("res download: ", res)
            // this.setState({
            //     file: res.data.resourceInfo.viewPath,
            //     total: res.data.resourceInfo.pageviews,
            // })
        })
    }
    showResourceRecommend() {
        let resources = this.state.resourceRecommend;
        if(resources.length > 0) {
            return (
                <div>
                    {resources.map((item, index) => {
                        <p className="rank-list" key={index}>
                            <Link to={`/TeachingResourceManagement/resource/${item.resId}`}>{item.title} <span> ({item.commentscore})</span></Link>
                        </p>
                        
                    })}
                </div>
            )
        } else {
            return (
                "暂无相关推荐"
            )
        }
    }
    showComments() {
        let comments = this.state.comments;
        console.log("comments:", comments)
        if(comments.length > 0) {
            return (
                <div>
                    {comments.map((item, index) => {
                        let time = date(item.commentTime);
                        return (
                            <div key={index}>
                                <p>{item.valuerName}<i>（{ time }）</i>&nbsp;评分：{item.commentStar}&nbsp;</p>
                                <p className="comment" key={index}><strong>评论内容：</strong>{item.comment}</p>
                                <hr />
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return (
                "暂无用户评价"
            )
        }
    }
    commentContentChange(event) {
        this.setState({
            commentContent: event.target.value
        })
    }
    submitComment(event) {
        event.preventDefault();
        let {resId, commentContent, commentScore} = this.state;
        if(resId && commentContent && commentScore) {
            console.log("填完整啦!！resId: ",resId," commentContent:",commentContent,"commentScore",commentScore)            
            const result = networkAction.promiseNetwork({
                url: `TeachingResourceManagement/teachingResource/details/addComment`, 
                method: `POST`
            }, {
                resId: resId,
                comment: commentContent,
                commentStar: commentScore,
            })
            result.then((res) => {
                console.log("submit comment res:", res);
                this.setState({
                    commentContent: "",
                    commentScore: 0,
                })
                this.initNetwork();
            })
        } else {
            console.log("没填完整啊！resId: ",resId," commentContent:",commentContent,"commentScore",commentScore)
            this.starArea.className = "col-sm-5 red-block";
        }
    }
    shiningStar(event) {
        console.log(event.target.value, event.target);
        if(event.target.value) {
            let curNode = event.target
            while(curNode) {
                curNode.className = "active";
                curNode = curNode.previousSibling;
            }
            curNode = event.target.nextSibling
            while(curNode) {
                curNode.className = "";
                curNode = curNode.nextSibling;
            }
        }
    }
    dimStar(event) {
        // console.log("dimStar: ", event.target.parentNode.childNodes)
        let starNodes = event.target.parentNode.childNodes
        // console.log(this.state.commentScore)
        if(starNodes.length > 3) {
            starNodes.forEach((node, index) => {
                if(node.value > this.state.commentScore) {
                    node.className = "";
                } else {
                    node.className = "shining";
                }
            })
        }
    }
    fixStar(event) {
        let curNode = event.target
        // console.log("score: ", curNode.value)
        while(curNode) {
            curNode.className = "shining";
            curNode = curNode.previousSibling;
        }
        this.setState({
            commentScore: event.target.value
        })
    }
    showStar() {
        return (
            <div ref={(star) => { this.starArea = star; }} >
                <span className="score-number">&nbsp;&nbsp;&nbsp;{this.state.commentScore === 0 ? "未评分" : this.state.commentScore + " 分"}</span>           
                <ul className="star" 
                    onMouseOver={this.shiningStar.bind(this)} 
                    onMouseOut={this.dimStar.bind(this)}
                    onMouseDown={this.fixStar.bind(this)}>
                    <li value={1}>★</li>
                    <li value={2}>★</li>
                    <li value={3}>★</li>
                    <li value={4}>★</li>
                    <li value={5}>★</li>
                </ul>
            </div>
        )
    }
    goToCollect(){
        if(this.state.whetherCollect){
            const cancelCollectResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/details/cancelCollection`, method: `POST`}, {resId: this.props.params.id})
            cancelCollectResult.then((res) => {
                console.log("cancelCollectResult: ", res);
                let collectState = !this.state.whetherCollect;
                this.setState({
                    whetherCollect: collectState
                })
            })
        } else {
            const addCollectResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/details/addCollection`, method: `POST`}, {resId: this.props.params.id})
            addCollectResult.then((res) => {
                console.log("addCollectResult: ", res);
                let collectState = !this.state.whetherCollect;
                this.setState({
                    whetherCollect: collectState
                })
            })
        }
    }

    render() {
        let {title, file, resId, pageIndex, pageNumber, total, date, score, viewNum, downloads, contributor, commentContent, whetherCollect } = this.state;
        let downloadApi = config.baseUrl + "/TeachingResourceManagement/teachingResource/download";
        return (
        <div className="container">
            <div className="col-sm-9">
                <h2>{title}</h2>
                <div className="resInfo-download-collect">
                    <div className="res-info">
                        <i className="glyphicon glyphicon-user" />
                        {contributor} &nbsp;&nbsp;上传于: {date}&nbsp;&nbsp; 评分: {score}分&nbsp;&nbsp; {viewNum}人浏览&nbsp;&nbsp; {downloads}人下载
                    </div>
                    <div className="download-collect">
                        <div className="download">
                            <form method="POST" action={downloadApi}>
                                <input type="text" name="resourceId" value={resId} style={{display: "none"}}/>
                                {/*<input type="submit"  className="glyphicon glyphicon-download-alt" />*/}
                                <button type="submit" className="download-collect-button"><i className="glyphicon glyphicon-download-alt download-style" /></button>
                            </form>
                        </div>
                        <div className="collect">
                            <button className="download-collect-button" onClick={this.goToCollect.bind(this)}>
                                {whetherCollect ? <i className="glyphicon glyphicon-heart collect-style" />:<i className="glyphicon glyphicon-heart-empty not-collect-style" />}
                            </button>
                        </div> 
                    </div>
                </div>
                <div className="well">
                    <div className="pdf-container">
                        {this.filePreview()}
                    </div>
                    {this.state.fileFormat == "pdf" ? 
                    <div className="page-button">
                        <button
                            className="btn btn-default"
                            disabled={pageNumber <= 1}
                            onClick={() => this.changePage(-1)}
                            >
                            上一页
                        </button>
                        <span>Page {pageNumber || '--'} of {total || '--'}</span>
                        <button
                            className="btn btn-default"
                            disabled={pageNumber >= total}
                            onClick={() => this.changePage(1)}
                            >
                            下一页
                        </button>
                        {/*<a href={file} download="sample.pdf">
                            <button className="btn btn-default">下载</button>
                        </a>*/}
                        {/*<button className="btn btn-default" onClick={this.handleDownload.bind(this)}>下载</button>*/}
                    </div> : null}
                </div>
                <form className="form-group" onSubmit={this.submitComment.bind(this)}>
                    <label htmlFor="exampleInputPassword1">你的评价：</label>
                    <textarea className="form-control textarea" value={commentContent} 
                        placeholder="请输入你的评论" onChange={this.commentContentChange.bind(this)} required/>
                    {this.showStar()}
                    <input type="submit" value={"提交"} className="btn btn-default col-sm-offset-11 col-sm-1" />
                </form>
                <div>
                    <strong>用户评价：</strong>
                    <div className="well">
                        {this.showComments()}
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <strong>内容简介：</strong>
                <div className="well">           
                    {this.state.description ? this.state.description : "暂无简介"}
                </div>
                <strong>相关资源推荐：</strong>
                <div className="well">           
                    {this.showResourceRecommend()}
                </div>
            </div>
        </div> 
        );
    }
}
