import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import networkAction from "../../../utils/networkAction"
import Pager from "../../../components/pager/pager.component"
import {date} from "../../../utils/utilFunctions"
import {Link} from "react-router"

export default class MyContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoArr: [],
            pageInfo: {
                curPage: 1,
                totalPages: 1,
            }
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
        let link = "/resource/" + row.resId
        return <Link to={link}>{cell}</Link>;
    }
    getNewPageNum(pageNum) {
        this.setState({
            pageInfo: Object.assign(this.state.pageInfo, {curPage: pageNum})
        }, this.searchAction.bind(this))
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
                </BootstrapTable>
                <Pager {...this.state.pageInfo} handleClick={this.getNewPageNum.bind(this)}/>
            </div>
        );
    }
}
