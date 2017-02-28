import React, {Component} from "react"
import { Link } from "react-router"
import {Navbar, Nav, NavItem, Carousel, Image} from "react-bootstrap"
import Search from "./components/search/search.component"

export default class App extends Component {
    shouldComponentUpdate() {
        console.log("!!!!!!!!!!!!!!!")
        return true
    }
    render() {
        return (
            <div>
                <div>
                    <Search />
                </div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#">React-Bootstrap</a>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1}><Link to="/">首页</Link></NavItem>
                        <NavItem eventKey={2}><Link to="/myResources">我的资源</Link></NavItem>
                        <NavItem eventKey={3}><Link to="/classifiedBrowsing">分类浏览</Link></NavItem>
                        <NavItem eventKey={4}><Link to="/departmentBrowsing">科室浏览</Link></NavItem>
                        <NavItem eventKey={5}><Link to="/resourcesStatistics">资源统计</Link></NavItem>
                    </Nav>
                </Navbar>
                <h1 className="col-md-6 col-md-offset-6">yyf React Router Tutorial</h1>
                {this.props.children}
            </div>
        )
    }
}

export class Home extends Component {
    componentWillMount() {
        console.log("Home componentWillMount")
    }
    componentDidMount() {
        // let a = setInterval(() => {
        //     this.setState({time: new Date().getSeconds()})
        // }, 1000)
        console.log("Home componentDidMount", console)
    }
    componentWillUnmount() {
        console.log("Home componentWillUnmount")
    }
    componentWillReceiveProps() {
        console.log("Home componentWillReceiveProps")
    }
    componentWillUpdate() {
        console.log("Home componentWillUpdate")
    }
    componentDidUpdate() {
        console.log("Home componentDidUpdate")
    }
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="row">
                <div className="left col-lg-2">
                    最近阅读
                </div>
                <div className="mid col-lg-8">
                    <Carousel>
                        <Carousel.Item>
                            <Image width={900} height={500} alt="900x500" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1484587536333&di=5600ca6b28ff37501463ba59fc020649&imgtype=0&src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F120405%2F10016-12040500420865.jpg"/>
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
                <div className="right col-lg-2">
                    。。。
                </div>
            </div>
        )
    }
}
