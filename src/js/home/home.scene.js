import React, {Component} from "react"
import { Link } from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image, } from "react-bootstrap"
import UploadButton from "../components/uploadButton/uploadButton.component"
import UpDownCollectNum from "../components/upDownCollectNum/upDownCollectNum.component"
import "./home.style.less"
import networkAction from "../utils/networkAction"

    export class Home extends Component {
        constructor(props) {
            super(props);
        }

    componentWillMount(){
        const result1 = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageRankingInfo`, method: 'POST'})
        const result2 = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageUserInfo`, method: 'POST'})
        result1.then((res) => {
                    console.log("homepageRankingList-res:", res)
                    //let formatData = this.formatData(res.data.departmentInfo);
                    // this.setState({
                    //     tree: formatData
                    // })
        })
        result2.then((res) => {
        console.log("homepageRankingList-res:", res)
        //let formatData = this.formatData(res.data.departmentInfo);
        // this.setState({
        //     tree: formatData
        // })
        })
        }

    render() {
        return (
            <div className="col-sm-12">
                <div className="home-left col-sm-3">
                    <div className="download-rank">
                        <h4> &nbsp;下载排行</h4>
                        <p className="rank-list">
                            <Link to="/resource/sample">网络管理原理与技术.pptx <span> (68)</span></Link>
                             <span className="rank-list-date">2017-03-05 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">JAVA程序设计.pdf <span> (51)</span></Link>
                             <span className="rank-list-date">2017-04-02 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">数据结构与算法分析.pdf <span> (49)</span></Link>
                             <span className="rank-list-date">2017-04-06 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">IT管理与服务.docx <span> (35)</span></Link>
                             <span className="rank-list-date">2017-04-06 &nbsp;</span> 
                        </p>
                    </div>
    
                    <div className="cutoff-line ">
                    </div>
                    <div className="score-rank">
                        <h4 className="score"> &nbsp;评分排行</h4>
                        <p className="rank-list">
                            <Link to="/resource/sample">网络管理原理与技术.pptx <span> (4.9)</span></Link>
                            <span className="rank-list-date">2017-03-05 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">数据结构与算法分析.pdf <span> (4.8)</span></Link>
                            <span className="rank-list-date">2017-04-06 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">IT管理与服务.docx <span> (4.7)</span></Link>
                             <span className="rank-list-date">2017-04-06 &nbsp;</span> 
                        </p>
                        <p className="rank-list">
                            <Link to="/resource/sample">JAVA程序设计.pdf <span> (4.6)</span></Link>
                            <span className="rank-list-date">2017-04-02 &nbsp;</span> 
                        </p>  
                        <br/>
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
                    <div className="right-top">
                        <div className="top-name">
                            <p className="top-name-title">资源库海量资源</p>
                        </div>
                        <div className="resource-num">28573</div>
                    </div>
                    <div className="right-mid ">
                        <div className="right-mid-top">
                            <div className="user-img"> 
                                <img src="/assets/img/userimg.jpg" style={{height: 80, width: 80}}/>
                            </div>
                            <div className="user-name">
                                <p>张某某</p>
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
