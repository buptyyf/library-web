import ClassifySelect from './components/classifySelect/classifySelect.component'
import ResourcesTable from '../components/resourcesTable/resourcesTable.component'
import DepartmentTree from './components/departmentTree/departmentTree.component'
import {browserHistory} from 'react-router'

import "./classifyBrowse.style.less"
import React, {Component} from "react"

export default class ClassifyBrowse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
        <div className="col-sm-12">
            <div className="col-sm-3">
                {browserHistory.getCurrentLocation().pathname.search('department') !== -1 ? <DepartmentTree /> : <ClassifySelect />}
            </div>
            <div className="col-sm-9 right-area">
                <ResourcesTable />
            </div>
        </div> 
        );
    }
}
