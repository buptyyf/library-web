import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"

export default class UserScene extends React.Component {
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
            <div className="right col-md-10">
                {this.props.children}
            </div>
        </div> 
        );
    }
}
