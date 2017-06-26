import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import networkAction from "../../../utils/networkAction"
import Pager from "../../../components/pager/pager.component"
import {date} from "../../../utils/utilFunctions"
import {Link} from "react-router"
import {Modal, Button} from "react-bootstrap"
import "./myContribution.style.less"

export default class MyContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoArr: [],
            pageInfo: {
                curPage: 1,
                totalPages: 1,
            },
            showDeleteModal: false,
            deleteResourceInfo: {},
        };
        this.options = {
            noDataText: "暂无相关资源"
        }
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.searchAction();
    }
    searchAction() {
        //event.preventDefault();
        const result = networkAction.promiseNetwork({
            url: `TeachingResourceManagement/userResource/getUploadList`
        }, {
            pageNo: this.state.pageInfo.curPage
        });
        result.then((res) => {
            console.log("MyUpload: ", res)
            let formatData = this.formatData(res.data.resourceList);
            let newPageInfo = {
                curPage: res.data.currentPageNo,
                totalPages: res.data.totalPage
            }
            this.setState({
                infoArr: formatData,
                pageInfo: newPageInfo
            })
        })
    }
    formatData(data) {
        let formatData = [];
        let curPage = this.state.pageInfo.curPage;
        data.forEach((item, index) => {
            let uploadTime = date(item.date);
            let obj = {
                index: (curPage - 1) * 10 + index + 1,
                resId: item.resId,
                name: item.title,
                uploadTime: uploadTime,
                score: item.commentscore,
                scanNum: item.pageviews,
                downloadNum: item.downloads
            }
            formatData.push(obj);
        })
        return formatData;
    }
    nameFormatter(cell, row){
        console.log(cell, row)
        let link = "/TeachingResourceManagement/resource/" + row.resId
        return <Link to={link}>{cell}</Link>;
    }
    getNewPageNum(pageNum) {
        this.setState({
            pageInfo: Object.assign(this.state.pageInfo, {curPage: pageNum})
        }, this.searchAction.bind(this))
    }

    operatorFormatter(cell, row){
        return (
            <div>
                <button className="btn-xs my-warning" onClick={this.deleteRow.bind(this, row)}>删除</button>
            </div>
        )
    }
    deleteRow(rowInfo) {
        console.log("rowInfo:", rowInfo);
        this.setState({
            showDeleteModal: true,
            deleteResourceInfo: rowInfo
        })
    }
    showDeleteModal(){
        console.log("showDeleteModal!!");
        return (
            <Modal show={this.state.showDeleteModal} onHide={this.closeDeleteModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>确定要删除该资源吗？</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleDeleteSummit.bind(this)}>
                        <br/>
                        <input type="submit" className="btn btn-default info-submit" value="是" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.handleCancelDelete.bind(this)} value="否" /> 
                    </form>
                </Modal.Body>
            </Modal>
        )
    }
    closeDeleteModal() {
        this.setState({
            showDeleteModal: false
        })
    }
    handleDeleteSummit(event){
        
        event.preventDefault();
        console.log("!!!!!!??????????????????????????!!!!!!!!!!!!!!");
        let resId = this.state.deleteResourceInfo.resId;
        console.log("resId:", resId);
        const deleteResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/deleteResource`, method: 'POST'}, { resId: resId })
        deleteResult.then((res) => {
            console.log("!!!!!!!deleteResult:",res);
            this.setState({
            showDeleteModal: false,  
                //clickInfo: Object.assign({}, this.state.clickInfo, {comment: "" })
            },this.searchAction.bind(this))
        })
    }
    handleCancelDelete(){
        this.setState({
            showDeleteModal: false
        })
    }


    render() {
        return (
            <div>
                <BootstrapTable data={this.state.infoArr} options={this.options}>
                    <TableHeaderColumn isKey dataField='index' width="50px">序号</TableHeaderColumn> 
                    <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter.bind(this)} >名称</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                    <TableHeaderColumn dataField='scanNum'>浏览量</TableHeaderColumn>
                    <TableHeaderColumn dataField='downloadNum'>下载量</TableHeaderColumn>
                    <TableHeaderColumn dataField='uploadTime'>上传时间</TableHeaderColumn>
                    <TableHeaderColumn dataField='operation' width="55px" dataFormat={this.operatorFormatter.bind(this)}>操作</TableHeaderColumn>
                </BootstrapTable>
                <Pager {...this.state.pageInfo} handleClick={this.getNewPageNum.bind(this)}/>
                 {this.showDeleteModal()}
            </div>
        );
    }
}
