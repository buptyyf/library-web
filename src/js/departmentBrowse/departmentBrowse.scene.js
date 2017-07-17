import ResourcesTable from '../components/resourcesTable/resourcesTable.component'
import CatalogueTree from '../components/catalogueTree/catalogueTree.component'
import {browserHistory} from 'react-router'
import networkAction from '../utils/networkAction'
import "./departmentBrowse.style.less"
import React, {Component} from "react"

export default class DepartmentBrowse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentData: [],
            selectedDepartment: "",
            tableData: [],
            sort: "downloads",
            pageInfo: {
                curPage: 1,
                totalPages: 1,
            },
            totalResourceNum: 0,
        };
    }
    
    componentWillMount() {
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'})
        result.then((res) => {
            console.log("departmentBrowsing: ", res)
            this.setState({
                departmentData: res.data.departmentInfo
            })
        })
    }
    searchNetwork() {
        let {selectedDepartment, sort} = this.state;
        // console.log("?????????????????departmentId: ", selectedDepartment)
        let page = this.state.pageInfo.curPage;
        const result = networkAction.promiseNetwork({
            url: `TeachingResourceManagement/teachingResource/department`,
            method: 'POST'
        }, {
            departmentId: selectedDepartment,
            sort: sort,
            page: Number(page) > 0 ? Number(page) : 1
        })
        result.then((res) => {
            console.log("departmentBrowsing: ", res)
            let newPageInfo = {
                curPage: res.data.currentPageNo,
                totalPages: res.data.totalPage
            }
            this.setState({
                tableData: res.data.resourceList,
                pageInfo: newPageInfo,
                totalResourceNum: res.data.resultCount
            })
        })
    }
    handleTreeChange(departmentId) {
        console.log("!!!!!!!!!!!!departmentId: ", departmentId)
        this.setState({
            selectedDepartment: departmentId
        }, this.searchNetwork.bind(this));
    }
    handleSortChange(event) {
        this.setState({
            sort: event.target.value
        }, this.searchNetwork.bind(this));
    }
    handlePageChange(page) {
        this.setState({
            pageInfo: Object.assign({}, this.state.pageInfo, {curPage: page})
        }, this.searchNetwork.bind(this))
    }
    render() {
        let {departmentData, selectedDepartment, tableData, pageInfo, totalResourceNum} = this.state;
        // console.log("subjects: ", departmentData)
        return (
        <div className="col-sm-12">
            <div className="col-sm-3">
                <CatalogueTree 
                    data={departmentData} 
                    onChange={this.handleTreeChange.bind(this)}
                    /> 
            </div>
            <div className="col-sm-9 right-area">
                <div className="sort-number">
                    <div className="sort">
                        排序方式：
                        <select value={this.state.sort} onChange={this.handleSortChange.bind(this)}>
                            <option value="downloads">下载量</option>
                            <option value="score">评分</option>
                            <option value="time">上传时间</option>
                        </select>
                    </div>
                    <div className="result-number">
                        共搜索出 {totalResourceNum} 条资源
                    </div>
                </div>
                <ResourcesTable data={tableData} pageInfo={pageInfo} handlePageChange={this.handlePageChange.bind(this)}/>
            </div>
        </div> 
        );
    }
}
