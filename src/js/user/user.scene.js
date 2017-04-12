import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"

export default class UserScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
        // console.log("userInfo:", userInfo)
    }


    render() {
        return (
        <div className="row col-sm-12">
            <div className="col-sm-2 well">
                <UserResourcesMenu />
            </div>
            <div className="right col-sm-10">
                {this.props.children}
            </div>
        </div> 
        );
    }
}
