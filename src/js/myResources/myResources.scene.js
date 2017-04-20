import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UpDownCollectNum from '../components/upDownCollectNum/upDownCollectNum.component'
import "./myResources.style.less"
import { Link } from "react-router"
import networkAction from "../utils/networkAction"
import $ from "jquery"

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
        // const result = networkAction.promiseNetwork({url: ``})
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageUserInfo`})
        userInfo.then((res) => {
            console.log("homepageUserInfo-res:", res.data)
            this.setState({
                userInfo: res.data
            })
        })
        // const recentScan = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/getMyResourceList`})
        // recentScan.then((res) => {
        //     console.log("recentScan: ", res)
        //     this.setState({
        //         contents: res.data
        //     })
        // })
    }
    showPageContent(page) {
        return (
            <div id={"page"+page} className="content">
                {this.state.contents.map((content, index) => {
                    let curPage = Math.ceil(((index + 1) / 3))
                    if(curPage === page) {
                        return (
                            <p className="content-detail" key={index}>&nbsp; 
                                <Link to="/resource/sample">{content}</Link> 
                                <span className="browse-list-date">2017-04-06 &nbsp;</span> 
                            </p>                        
                        )
                    } else {
                        return null
                    }
                })}
                {/*<p className="content-detail">&nbsp; <Link to="/resource/sample">{this.state.content[3*(page-1)+0]}</Link> <span className="browse-list-date">2017-04-06 &nbsp;</span> </p>
                <p className="content-detail">&nbsp; <Link to="/resource/sample">{this.state.content[3*(page-1)+1]}</Link> <span className="browse-list-date">2017-04-06 &nbsp;</span> </p>
                <p className="content-detail">&nbsp; <Link to="/resource/sample">{this.state.content[3*(page-1)+2]}</Link> <span className="browse-list-date">2017-04-06 &nbsp;</span> </p>*/}
            </div>
        )
    }

    handleClick(event) {
        this.setState({
            page: event.target.dataset.page
        })
    }

    componentDidMount() {
        //let nodes = document.getElementsByClassName("link");
        $(".page").on("click", function(e) {
            $(".page").removeClass("click-active");
            $(this).addClass("click-active");
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
                                <p className="my-upload-title">我的上传</p>
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
                            <div className="right-top-right">
                                {this.showPageContent(this.state.page)}
                                <div className="pointer col-sm-offset-5">
                                    <div className="page click-active" data-page={1} onClick={this.handleClick.bind(this)}> </div>
                                    <div className="page" data-page={2} onClick={this.handleClick.bind(this)}> </div>
                                    <div className="page" data-page={3} onClick={this.handleClick.bind(this)}> </div>
                                </div>
                            </div>
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
