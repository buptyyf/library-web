import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import {browserHistory} from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UpDownCollectNum from '../components/upDownCollectNum/upDownCollectNum.component'
import "./myResources.style.less"

export default class MyResources extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
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
                        <div className="col-sm-5">
                            <div>我的上传</div>
                            <UpDownCollectNum />
                        </div>
                        <div className="col-sm-7">
                            <div>最近浏览</div>
                            <div >
                                <Carousel>
                                    <Carousel.Item>
                                        <div>
                                            <p>1111111</p>
                                            <p>1111111</p>
                                            <p>1111111</p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div>
                                            <p>22222</p>
                                            <p>22222</p>
                                            <p>22222</p>
                                        </div>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <div>
                                            <p>33333</p>
                                            <p>33333</p>
                                            <p>33333</p>
                                        </div>
                                    </Carousel.Item>
                                </Carousel>
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
