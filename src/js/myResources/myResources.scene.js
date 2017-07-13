import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UpDownCollectNum from '../components/upDownCollectNum/upDownCollectNum.component'
import "./myResources.style.less"
import { Link } from "react-router"
import networkAction from "../utils/networkAction"
import { date } from "../utils/utilFunctions"

export default class MyResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: ["网络管理原理与技术.pptx","JAVA程序设计.pptx","数据结构与算法分析.pdf",
                      "IT管理与服务.pptx","计算机网络基础.pptx","概率论与数理统计.pdf",
                      "多媒体技术.pptx","面向对象与C++.pptx","数据结构与算法分析3.pdf"],
            page: 1,
            userInfo: {}
        };
    //this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageUserInfo`})
        userInfo.then((res) => {
            console.log("homepageUserInfo-res:", res.data)
            this.setState({
                userInfo: res.data
            })
        })
        const recentScan = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/getRecentReview`})
        recentScan.then((res) => {
            console.log("recentScan: ", res)
            this.setState({
                contents: res.data.resourceList
            })
        })
    }
    showButton(number) {
        for(let i = 1; i <= number; i++) {
            return 
        }
    }
    showRecentView() {
        let {page, contents} = this.state;
        let groupNum = Math.ceil(contents.length / 3);
        let buttonShowArr = [];
        for(let i = 1; i <= groupNum; i++) {
            buttonShowArr.push(i);
        }
        return (
            <div className="right-top-right">
                <div id={"page"+page} className="content">
                    {contents.map((content, index) => {
                        let curPage = Math.ceil(((index + 1) / 3));
                        let time = date(content.date);
                        console.log("page: ", page, "curPage: ", curPage);
                        if(curPage == page) {
                            return (
                                <p className="content-detail" key={index}>&nbsp; 
                                    <Link to={`/TeachingResourceManagement/resource/${content.resId}`}>{content.title}</Link> 
                                    <span className="browse-list-date">{time}</span> 
                                </p>                        
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
                <div className="pointer col-sm-offset-5">
                    {
                        buttonShowArr.map((pageNum, index) => {
                            if(pageNum == page) {
                                return (
                                    <div key={pageNum}
                                        className="page click-active" 
                                        data-page={pageNum} 
                                        onClick={this.handleClick.bind(this)} />
                                )
                            } else {
                                return (
                                    <div key={pageNum}
                                        className="page" 
                                        data-page={pageNum} 
                                        onClick={this.handleClick.bind(this)} />
                                )
                            }
                        })
                    }
                </div>
            </div>
            
        )
    }

    handleClick(event) {
        this.setState({
            page: event.target.dataset.page
        })
    }

    render() {
        let {uploads, collections, downloads, userName, sex} = this.state.userInfo;
        return (
        <div className="col-sm-12">
            <div className="col-sm-2 well">
                <UserResourcesMenu userName={userName}/>
            </div>
            <div className="my-resources-right col-sm-10">
                {browserHistory.getCurrentLocation().pathname.search("upload") === -1 ? 
                    <div className="my-resources-right-top">
                        <div className="col-sm-5">
                          <div className="my-upload">
                            <div className="my-upload-top">
                                <p className="my-upload-title">我的动态</p>
                            </div>
                            <br/>
                            <UpDownCollectNum uploadNum={uploads} downloadNum={downloads} collectNum={collections}/>
                          </div>
                        </div>
                        <div className="col-sm-7">
                          <div className="browse-list">
                            <div className="browse-list-top">
                                <p className="browse-list-title">最近浏览</p>
                            </div>
                            {this.showRecentView()}
                          </div>
                        </div>
                    </div> : null}
                <div className="right-bottom">
                    {this.props.children}
                </div>
            </div>
        </div> 
        );
    }
}
