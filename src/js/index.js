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

class App extends Component {
    render() {
        console.log(this.props.children)
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
                    <Nav pullRight>
                        <NavItem eventKey={1}>
                            <Link to="/user"><div className="glyphicon glyphicon-user" />个人中心 </Link>/
                            <Link> 退出</Link>
                        </NavItem>
                    </Nav>
                </Navbar>
                {this.props.children}
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
            </Route>
            <Route path="user" component={UserScene}>
                <IndexRoute component={MyAccount}/>
                <Route path="myAccount" component={MyAccount} />
                <Route path="changePassword" component={ChangePassword} />
                <Route path="changeInfo" component={ChangeInfo} />
            </Route>
        </Route>
    </Router>
), document.getElementById("container"))


