import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UpDownCollectNum from '../components/upDownCollectNum/upDownCollectNum.component'
import "./myResources.style.less"
import { Link } from "react-router"
import $ from "jquery"

export default class MyResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: ["网络管理原理与技术.pptx","JAVA程序设计.pptx","数据结构与算法分析.pdf",
                      "IT管理与服务.pptx","计算机网络基础.pptx","概率论与数理统计.pdf",
                      "多媒体技术.pptx","面向对象与C++.pptx","数据结构与算法分析3.pdf"],
            page: 1
        };
    //this.handleClick = this.handleClick.bind(this);
    }

    showPageContent(page) {
        return (
            <div id={"page"+page} className="content">
                <p className="content-detail"><Link to="/resource/sample">{this.state.content[3*(page-1)+0]}</Link></p>
                <p className="content-detail"><Link to="/resource/sample">{this.state.content[3*(page-1)+1]}</Link></p>
                <p className="content-detail"><Link to="/resource/sample">{this.state.content[3*(page-1)+2]}</Link></p>
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
        return (
        <div className="col-sm-12">
            <div className="col-sm-2 well">
                <UserResourcesMenu />
            </div>
            <div className="right col-sm-10">
                {browserHistory.getCurrentLocation().pathname.search("upload") === -1 ? 
                    <div className="right-top">
                        <div className="my-upload col-sm-5">
                            <div>我的上传</div>
                            <UpDownCollectNum />
                        </div>
                        <div className="col-sm-7">
                            <div className="browse-list">最近浏览</div>
                            <div className="right-top-right">
                                {this.showPageContent(this.state.page)}
                                <div className="pointer col-sm-offset-2">
                                    <div className="page click-active" data-page={1} onClick={this.handleClick.bind(this)}> </div>
                                    <div className="page" data-page={2} onClick={this.handleClick.bind(this)}> </div>
                                    <div className="page" data-page={3} onClick={this.handleClick.bind(this)}> </div>
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
