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
import ChangeInfoDone from "./user/components/changeInfo/changeInfoDone.component"
import ChangePassword from "./user/components/changePassword/changePassword.component"
import ChangePasswordDone from "./user/components/changePassword/changePasswordDone.component"
import AdminQuery from './user/components/adminQuery/adminQuery.component'
import Upload from "./myResources/components/upload/upload.component"
import UploadDone from "./myResources/components/upload/uploadDone.component"
import ClassifyBrowse from "./classifyBrowse/classifyBrowse.scene"
import DepartmentBrowse from "./departmentBrowse/departmentBrowse.scene"
import SearchScene from "./search/search.scene"
import ResourcesStatistics from './resourcesStatistics/resourcesStatistics.scene'
import ResourceDetail from './resourceDetail/resourceDetail.scene'
import Login from "./login/login.scene"
import Meeting from './meeting/meeting.scene'

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
                            <li className="link"><Link to="/meeting">会议</Link></li>
                            <li className="link"><Link to="/office">办公</Link></li>
                            <li className="link"><Link to="/selfService">自助系统</Link></li>
				        </ul>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                <Link to="/user"><div className="glyphicon glyphicon-user" />个人中心 </Link>/
                                <Link to="/login"> 退出</Link>
                            </NavItem>
                        </Nav>
                    </Navbar>
                </div>
                {/*<div className="col-sm-12">*/}
                    {this.props.children}
                {/*</div>*/}
            </div>
        )
    }
}

class Root extends React.Component{
    constructor(props) {
        super(props);
        console.log("root")
        this.state = {
            loggedIn: false
        }
    }
    requireAuth(nextState, replace) {
        console.log("hhhhhh", this.state.loggedIn )
        if (!this.state.loggedIn && browserHistory.getCurrentLocation().pathname.search('login') === -1) {
            console.log("what?")
            replace({
              pathname: '/login',
              state: { nextPathname: nextState.location.pathname }
            })
            // browserHistory.push('/login');
        }
    }

    render() {
        return (
        <Router history={browserHistory}>
            {/*<Route path="/" component={App} onEnter={this.requireAuth.bind(this)}>*/}
            <Route path="/" component={App} >
                <IndexRoute component={Home} />
                <Route path="home" component={Home} />                
                <Route path="login" component={Login} />
                <Route path="myResources" component={MyResources}>
                    <IndexRoute component={MyContribution}/>
                    <Route path="contribution" component={MyContribution} />
                    <Route path="collection" component={MyCollection} />
                    <Route path="download" component={MyDownload} />
                    <Route path="upload" component={Upload} />
                    <Route path="uploadDone" component={UploadDone} />
                </Route>
                <Route path="user" component={UserScene}>
                    <IndexRoute component={ChangePassword}/>
                    <Route path="myAccount" component={MyAccount} />
                    <Route path="changePassword" component={ChangePassword} />
                    <Route path="changePasswordDone" component={ChangePasswordDone} />
                    <Route path="changeInfo" component={ChangeInfo} />
                    <Route path="changeInfoDone" component={ChangeInfoDone} />
                    <Route path="adminQuery" component={AdminQuery} />
                </Route>
                <Route path="classifyBrowse" component={ClassifyBrowse}/>
                <Route path="departmentBrowse" component={DepartmentBrowse}/>
                <Route path="search/:keywords" component={SearchScene}/>
                <Route path="resourcesStatistics" component={ResourcesStatistics}/>
                <Route path="resource/:id" component={ResourceDetail}/>
                <Route path="meeting" component={Meeting}/>
            </Route>
        </Router>
        )
    }
}

render(<Root />, document.getElementById("container"))


