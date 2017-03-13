import React, {Component} from "react";
import { render } from "react-dom";
import {Navbar, Nav, NavItem, Carousel, Image } from "react-bootstrap"
import { Router, Route, browserHistory, IndexRoute, Link } from 'react-router';
import Search from "./home/components/search/search.component"
import {Home} from './home/home.scene'
import MyResources from './myResources/myResources.scene'
import MyContribution from "./myResources/components/myContribution/myContribution.component"
import MyCollection from "./myResources/components/myCollection/myCollection.component"
import MyDownload from "./myResources/components/myDownload/myDownload.component"
import UserScene from "./user/user.scene"
import MyAccount from "./user/components/myAccount/myAccount.component"
import ChangeInfo from "./user/components/changeInfo/changeInfo.component"
import ChangePassword from "./user/components/changePassword/changePassword.component"
import Upload from "./myResources/components/upload/upload.component"
import ClassifyBrowse from "./classifyBrowse/classifyBrowse.scene"
import SearchScene from "./search/search.scene"
import ResourcesStatistics from './resourcesStatistics/resourcesStatistics.scene'
import ResourceDetail from './resourceDetail/resourceDetail.scene'

import "./home/home.style.less"
import $ from "jquery"

class App extends Component {
    componentDidMount() {
        //let nodes = document.getElementsByClassName("link");
        $(".link").on("click", function(e) {
            $(".link").removeClass("active");
            $(this).addClass("active");
        })

    }
    render() {
        //console.log(this.props.children)
        return (
            <div>
                <Search />
                <div className="col-sm-12 navbar-container">
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">教学管理系统</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <ul className="nav navbar-nav">
                            <li className="active link"><Link to="/">首页</Link></li>
                            <li className="link"><Link to="/myResources">我的资源</Link></li>
                            <li className="link"><Link to="/classifyBrowse">分类浏览</Link></li>
                            <li className="link"><Link to="/departmentBrowse">科室浏览</Link></li>
                            <li className="link"><Link to="/resourcesStatistics">资源统计</Link></li>
                            <li className="link"><Link to="/conference">会议</Link></li>
                            <li className="link"><Link to="/office">办公</Link></li>
                            <li className="link"><Link to="/selfService">自助系统</Link></li>
				        </ul>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/user"><div className="glyphicon glyphicon-user" />个人中心 </Link>/
                                <Link> 退出</Link>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                <div className="col-sm-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="myResources" component={MyResources}>
                <IndexRoute component={MyContribution}/>
                <Route path="contribution" component={MyContribution} />
                <Route path="collection" component={MyCollection} />
                <Route path="download" component={MyDownload} />
                <Route path="upload" component={Upload} />
            </Route>
            <Route path="user" component={UserScene}>
                <IndexRoute component={MyAccount}/>
                <Route path="myAccount" component={MyAccount} />
                <Route path="changePassword" component={ChangePassword} />
                <Route path="changeInfo" component={ChangeInfo} />
            </Route>
            <Route path="classifyBrowse" component={ClassifyBrowse}/>
            <Route path="departmentBrowse" component={ClassifyBrowse}/>
            <Route path="search/:keywords" component={SearchScene}/>
            <Route path="resourcesStatistics" component={ResourcesStatistics}/>
            <Route path="resource/:id" component={ResourceDetail}/>
        </Route>
    </Router>
), document.getElementById("container"))


