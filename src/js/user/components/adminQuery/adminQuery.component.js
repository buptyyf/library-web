import AdminQueryTable from './components/adminQueryTable.component'
import CatalogueTree from '../../../components/catalogueTree/catalogueTree.component'
import {browserHistory} from 'react-router'
import networkAction from "../../../utils/networkAction"

import "./adminQuery.style.less"
import React, {Component} from "react"

export default class AdminQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentData: [],
            name: "",   //详细搜索的用户名
            selectedDepartment: "",
            tableData: [],
            pageInfo: {
                curPage: 1,
                totalPages: 1,
            },
            totalUserNum: 0
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.getTreeInfo();
    }
    getTreeInfo() {
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'})
        result.then((res) => {
            console.log("departmentBrowsing: ", res)
            this.setState({
                departmentData: res.data.departmentInfo
            })
        })
    }
    
    searchNetwork() {
        let {selectedDepartment, name} = this.state;
        // console.log("?????????????????departmentId: ", selectedDepartment)
        let page = this.state.pageInfo.curPage;
        const result = networkAction.promiseNetwork({
            url: `TeachingResourceManagement/user/searchUsers`,
            method: 'POST'
        }, {
            depId: selectedDepartment,
            userName: name,
            page: Number(page) > 0 ? Number(page) : 1
        })
        result.then((res) => {
            console.log("AdminQuery: ", res)
            let newPageInfo = {
                curPage: res.data.currentPageNo,
                totalPages: res.data.totalPage
            }
            this.setState({
                tableData: res.data.userInfoList,
                pageInfo: newPageInfo,
                totalUserNum: res.data.resultCount
            })
        })
    }
    handleTreeChange(departmentId) {
        this.setState({
            selectedDepartment: departmentId
        }, this.searchNetwork.bind(this));
    }
    handleNameChange(event) {
        this.setState({
            name: event.target.value
        }, this.searchNetwork.bind(this));
    }
    handlePageChange(page) {
        this.setState({
            pageInfo: Object.assign({}, this.state.pageInfo, {curPage: page})
        }, this.searchNetwork.bind(this))
    }
    render() {
        let {departmentData, name, tableData, pageInfo, totalUserNum, selectedDepartment} = this.state;
        return (
        <div>
            <div className="col-sm-2">
                <CatalogueTree data={departmentData} onChange={this.handleTreeChange.bind(this)}/>
            </div>
            <div className="col-sm-10 right-area">
                <div className="form-inline">
                    <input type="text" className="col-sm-6 form-control" 
                        value={name} 
                        onChange={this.handleNameChange.bind(this)}
                        placeholder="输入教工姓名（可选）"/>
                    <div className="text-right">
                        共搜索出 {totalUserNum} 位教工
                    </div>
                </div>
                <hr/>
                <AdminQueryTable 
                    data={tableData} 
                    pageInfo={pageInfo} 
                    depId={selectedDepartment}
                    handlePageChange={this.handlePageChange.bind(this)} />
            </div>
        </div>
        );
    }
}
