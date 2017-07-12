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
import {CookieUtil} from "./utils/cookieUtil"

import networkAction from './utils/networkAction'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGuest: props.isGuest
        }
    }
    componentDidMount() {
        //let nodes = document.getElementsByClassName("link");
        $(".link").on("click", function(e) {
            $(".link").removeClass("active");
            $(this).addClass("active");
        })
    }
    // goToLogin() { // 以游客身份点击某些链接时，直接跳转到登陆页面
    //     if()
    // }
    render() {
        console.log("isGuest: ", this.state.isGuest)
        let { isGuest } = this.state;
        return (
            <div>
                <Search />
                <div className="col-sm-12 navbar-container">
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#">智能实训教学系统</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <ul className="nav navbar-nav">
                            <li className="active link"><Link to="/TeachingResourceManagement/home">首页</Link></li>
                            {isGuest ? null : <li className="link"><Link to={"/TeachingResourceManagement/myResources"}>我的资源</Link></li>}
                            <li className="link"><Link to="/TeachingResourceManagement/classifyBrowse">分类浏览</Link></li>
                            <li className="link"><Link to="/TeachingResourceManagement/departmentBrowse">科室浏览</Link></li>
                            {isGuest ? null : <li className="link"><Link to={"/TeachingResourceManagement/resourcesStatistics"}>资源统计</Link></li>}
                            <li className="link"><Link to="/TeachingResourceManagement/meeting">实训室预定</Link></li>
				        </ul>
                        <Nav pullRight>
                            <NavItem eventKey={1}>
                                {isGuest ? <Link to="/TeachingResourceManagement/login"> 登录</Link> : 
                                    <div>
                                        <Link to={"/TeachingResourceManagement/user"}><div className="glyphicon glyphicon-user" />个人中心 </Link>/
                                        <Link to="/TeachingResourceManagement/login"> 退出</Link>
                                    </div>
                                }
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
            userId: null,
            isGuest: true
        }
    }
    componentDidMount() {
        // const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/homepage/homepageUserInfo`, method: 'POST'});
        // userInfo.then((res) => {
        //     if(res.code === 0) {
        //         this.setState({
        //             // userId: res.data.userId
        //             userId: '000001'
        //         })
        //     } else if(res.code === 1){
        //         this.setState({
        //             userId: 'guest'
        //         })
        //     }
        // })
        let userId = CookieUtil.get("userId");
        console.log("cookie userId: ", userId)
        this.setState({
            userId: userId,
            isGuest: userId === 'guest' || !userId
        })
    }
    requireAuth(nextState, replace) {
        console.log("hhhhhh", this.state.loggedIn )
        if (this.state.isGuest) {
            console.log("guest")
            replace({
              pathname: '/TeachingResourceManagement/login',
              state: { nextPathname: nextState.location.pathname }
            })
            // browserHistory.push('/login');
        }
    }
    handleUserIdChange(userId) {
        this.setState({
            userId: userId,
            isGuest: userId === 'guest' || !userId
        })
    }
    render() {
        console.log("userId: ", this.state.userId)
        let {userId, isGuest} = this.state;
        return (
        <Router history={browserHistory}>
            {/*<Route path="/" component={App} onEnter={this.requireAuth.bind(this)}>*/}
            <Route path="/TeachingResourceManagement">
                <IndexRoute component={(props) => (<Login {...props} onChange={this.handleUserIdChange.bind(this)}/>)}/>   
                <Route path="login" component={(props) => (<Login {...props} onChange={this.handleUserIdChange.bind(this)}/>)} />
                <Route path="" component={(props) => (<App {...props} isGuest = {isGuest} />)} >  
                    <IndexRoute component={(props) => (<Home {...props} isGuest = {isGuest} />)} />
                    <Route path="home" component={(props) => (<Home {...props} isGuest = {isGuest} />)} />
                    <Route path="myResources" component={MyResources} onEnter={this.requireAuth.bind(this)}>
                        <IndexRoute component={MyContribution}/>
                        <Route path="contribution" component={MyContribution} />
                        <Route path="collection" component={MyCollection} />
                        <Route path="download" component={MyDownload} />
                        <Route path="upload" component={Upload} />
                        <Route path="uploadDone" component={UploadDone} />
                    </Route>
                    <Route path="user" component={UserScene} onEnter={this.requireAuth.bind(this)}>
                        <IndexRoute component={ChangeInfo}/>
                        <Route path="myAccount" component={MyAccount} />
                        <Route path="changePassword" component={ChangePassword} />
                        <Route path="changePasswordDone" component={ChangePasswordDone} />
                        <Route path="changeInfo" component={ChangeInfo} />
                        <Route path="changeInfoDone" component={ChangeInfoDone} />
                        <Route path="adminQuery" component={AdminQuery} />
                    </Route>
                    <Route path="classifyBrowse" component={ClassifyBrowse}/>
                    <Route path="departmentBrowse" component={DepartmentBrowse}/>
                    <Route path="search/:keywords/:resIdList" component={SearchScene}/>
                    <Route path="resourcesStatistics" component={ResourcesStatistics} onEnter={this.requireAuth.bind(this)}/>
                    <Route path="resource/:id" component={ResourceDetail}/>
                    <Route path="meeting" component={(props) => (<Meeting {...props} userId={userId} isGuest={isGuest}/>)} />
                </Route>
            </Route>
        </Router>
        )
    }
}

render(<Root />, document.getElementById("container"))


