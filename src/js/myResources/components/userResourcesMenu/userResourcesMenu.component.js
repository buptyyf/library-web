import "./userResourcesMenu.style.less";
import {Image} from "react-bootstrap";
import React, {Component} from "react";
import {Link, browserHistory} from "react-router";
import UploadButton from "../../../components/uploadButton/uploadButton.component";
import networkAction from "../../../utils/networkAction"
import $ from "jquery"
export default class UserResourcesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            userAuthId: "",
        };
        console.log(browserHistory.getCurrentLocation().pathname)
    //this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
    // This section is bad style and causes a bug
        const words = this.state.words;
        words.push('marklar');
        this.setState({words: this.state.words.concat(['yyf'])});
    }

    componentWillMount() {
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getUserInfo`, method: 'POST'});
        //console.log("查询权限信息userInfo: ", userInfo);
        userInfo.then((res) => {
            console.log("查询权限信息userInfo: ", res);
            this.setState({
                userAuthId: res.data.userauthId,  
            },)
        })
    }

    // showAdministrator(){
    //     let userAuthId = this.state.userAuthId;
    //     console.log("权限信息userAuthId: ", userAuthId);
    //     if(userAuthId == "00"){
    //         return(
    //             <ul className="nav navbar-nav">
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/adminQuery">查询/添加/修改</Link></li>
    //             </ul>
    //         )
    //     }else{
    //         return(
    //             <ul className="nav navbar-nav">
    //                 <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
    //                 <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
    //             </ul>
    //         )
    //     }
    // }

    componentDidMount() {

    }
    renderBottom() {
        if(browserHistory.getCurrentLocation().pathname.search("user") !== -1) {
            let userAuthId = this.state.userAuthId;
            console.log("权限信息userAuthId: ", userAuthId);
            if(userAuthId == "00"){
                return(
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
                        <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
                        <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
                        <li className="col-sm-12 text-center active"><Link to="/user/adminQuery">查询/添加/修改</Link></li>
                    </ul>
                )
            }else{
                return(
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
                        <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
                        <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
                    </ul>
                )
            }

            //this.showAdministrator();
            // return (
            //     <ul className="nav navbar-nav">
            //         <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />我的账号</li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/changeInfo">修改资料</Link></li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/changePassword">修改密码</Link></li>
            //         <li className="col-sm-12 text-center active"><i className="glyphicon glyphicon-user" />管理员</li>
            //         <li className="col-sm-12 text-center active"><Link to="/user/adminQuery">查询/添加/修改</Link></li>
            //     </ul>
            // )
        } else {
            return (
                <div className="col-sm-12">
                    <UploadButton />
                    <ul className="nav navbar-nav">
                        <li className="col-sm-12 text-center"><Link to="/myResources/contribution">我的贡献</Link></li>
                        <li className="col-sm-12 text-center"><Link to="/myResources/collection">我的收藏</Link></li>
                        <li className="col-sm-12 text-center"><Link to="/myResources/download">我的下载</Link></li>
                    </ul>
                </div>
            )
        }
    }
    render() {
        return (
        <div>
            <Image className="col-sm-offset-3 user-image " height={80} width={80} src={"/assets/img/userimg.jpg"}  />
            <p className="col-sm-12 name text-center">{this.props.userName}</p>
            {this.renderBottom()}
        </div>
        );
    }
}

UserResourcesMenu.propTypes = {
    userName: React.PropTypes.string.isRequired,
    sex: React.PropTypes.number.isRequired,
    isAdmin: React.PropTypes.bool
}

UserResourcesMenu.defaultProps = {
    userName: "",
    sex: 0
}