import UserResourcesMenu from './components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
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
        <div className="row col-md-12">
            <div className="col-md-2">
                <UserResourcesMenu />
            </div>
            <div className="row right col-md-10">
                <div className="right-top">
                    <div className="col-md-6">我的动态</div>
                    <div className="col-md-6">最近浏览</div>
                </div>
                <div className="right-bottom">
                    {this.props.children}
                </div>
            </div>
        </div> 
        );
    }
}
