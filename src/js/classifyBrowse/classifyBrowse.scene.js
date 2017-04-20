import ClassifySelect from './components/classifySelect/classifySelect.component'
import ResourcesTable from '../components/resourcesTable/resourcesTable.component'
import CatalogueTree from '../components/catalogueTree/catalogueTree.component'
import {browserHistory} from 'react-router'
import networkAction from '../utils/networkAction'
import "./classifyBrowse.style.less"
import React, {Component} from "react"

export default class ClassifyBrowse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentData: [],
            selectedDepartment: "",
            subjects: [],
            resources: [],
            objects: [],

        };
    //this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        if(browserHistory.getCurrentLocation().pathname.search('department') !== -1) {
            const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'})
            result.then((res) => {
                console.log("departmentBrowsing: ", res)
                this.setState({
                    departmentData: res.data.departmentInfo
                })
            })
        } else {
            const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/classfiedBrowsingAll`, method: 'POST'})
            result.then((res) => {
                console.log("classfiedBrowsingAll: ", res)
                this.setState({
                    subjects: res.data.subjectInfo,
                    resources: res.data.resourceType,
                    objects: res.data.applicableObject,
                })
            })
        }
    }
    handleTreeChange(selected) {
        this.setState({
            selectedDepartment: selected
        })
    }
    classifySelectSubmit() {

    }
    render() {
        let {departmentData, selectedDepartment, subjects, resources, objects} = this.state;
        console.log("departmentData: ", departmentData)
        return (
        <div className="col-sm-12">
            <div className="col-sm-3">
                {
                    browserHistory.getCurrentLocation().pathname.search('department') !== -1 ? 
                        <CatalogueTree data={departmentData} onChange={this.handleTreeChange.bind(this)}/> 
                        : <ClassifySelect subjects={subjects} resources={resources} objects={objects} submitFunc={this.classifySelectSubmit.bind(this)}/>
                }
            </div>
            <div className="col-sm-9 right-area">
                <ResourcesTable />
            </div>
        </div> 
        );
    }
}
