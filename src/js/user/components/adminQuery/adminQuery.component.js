import AdminQueryTable from './components/adminQueryTable.component'
import CatalogueTree from '../../../components/catalogueTree/catalogueTree.component'
import {browserHistory} from 'react-router'

import "./adminQuery.style.less"
import React, {Component} from "react"

export default class AdminQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
        <div>
            <div className="col-sm-2">
                <CatalogueTree />
            </div>
            <div className="col-sm-10 right-area">
                <AdminQueryTable />
            </div>
        </div> 
        );
    }
}
