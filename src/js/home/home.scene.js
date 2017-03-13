import React, {Component} from "react"
import { Link } from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UploadButton from "../components/uploadButton/uploadButton.component"
import UpDownCollectNum from "../components/upDownCollectNum/upDownCollectNum.component"
import "./home.style.less"


export class Home extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="col-sm-12">
                <div className="home-left col-sm-3">
                    <div className="download-rank">
                        <h4>下载排行</h4>
                        <p className="left-topics">11111</p>
                    </div>
                    <br/>
                    <div className="score-rank">
                        <h4>评分排行</h4>
                        <p className="left-topics">11111</p>
                    </div>  
                </div>
                <div className="mid-pic col-sm-6">
                    <Carousel>
                        <Carousel.Item>
                                <Image width={900} height={500} alt="900x500" responsive src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484587536333&di=5600ca6b28ff37501463ba59fc020649&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120405%2F10016-12040500420865.jpg"/>
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image width={900} height={500} alt="900x500" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1485182238&di=f00810bd6e42d9ca966305d110a5e89a&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F42%2F58%2F64b58PICQpj_1024.jpg"/>
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <Image width={900} height={500} alt="900x500" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1485182238&di=f00810bd6e42d9ca966305d110a5e89a&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F42%2F58%2F64b58PICQpj_1024.jpg"/>
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="home-right col-sm-3">
                    <div className="right-topic">
                        <p className="topic-name">资源库海量资源</p>
                        <p className="resource-num">2843293859</p>
                    </div>
                    <div className="right-mid ">
                        <div className="right-mid-top">
                            <div className="user-img"> 
                                <img src="/assets/img/userimg.jpg" style={{height: 80, width: 80}}/>
                            </div>
                            <div className="user-name">
                                <p>我爱吃西瓜</p>
                            </div>
                        </div>
                        <div className="right-mid-mid ">
                            <UpDownCollectNum />
                        </div>
                        <div className="cutoff-line ">
                        </div>
                        <div className="col-sm-12 ">
                            <br/>
                            <UploadButton />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
