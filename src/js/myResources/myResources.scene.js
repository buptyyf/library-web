import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import {browserHistory} from "react-router"
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
        <div className="row col-sm-12">
            <div className="col-sm-2">
                <UserResourcesMenu />
            </div>
            <div className="row right col-sm-10">
                {browserHistory.getCurrentLocation().pathname.search("upload") === -1 ? 
                    <div className="right-top">
                        <div className="col-sm-6">我的动态</div>
                        <div className="col-sm-6">最近浏览</div>
                    </div> : null}
                <div className="right-bottom">
                    {this.props.children}
                </div>
            </div>
        </div> 
        );
    }
}
