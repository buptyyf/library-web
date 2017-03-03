import "./userResourcesMenu.style.less";
import {Image} from "react-bootstrap";
import React, {Component} from "react";
import {Link, browserHistory} from "react-router"
export default class userResourcesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
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
    renderBottom() {
        if(browserHistory.getCurrentLocation().pathname.search("user") !== -1) {
            return (
                <div>
                    <p className="col-md-12 contribution text-center"><Link to="/user/myAccount">我的账号</Link></p>
                    <p className="col-md-12 collection text-center"><Link to="/user/changeInfo">我的资料</Link></p>
                    <p className="col-md-12 download text-center"><Link to="/user/changePassword">修改密码</Link></p>
                </div>
            )
        } else {
            return (
                <div>
                    <button>上传我的文档</button>
                    <p className="col-md-12 contribution text-center"><Link to="/myResources/contribution">我的贡献</Link></p>
                    <p className="col-md-12 collection text-center"><Link to="/myResources/collection">我的收藏</Link></p>
                    <p className="col-md-12 download text-center"><Link to="/myResources/download">我的下载</Link></p>
                </div>
            )
        }
    }
    render() {
        return (
        <div className="menu-container">
            <Image className="col-md-offset-1 col-md-10 col-md-offset-1" width={100} width={100} src={"http://scimg.jb51.net/allimg/160815/103-160Q509544OC.jpg"} rounded />
            <p className="col-md-12 name text-center">阿斯蒂芬</p>
            {this.renderBottom()}
        </div>
        );
    }
}
