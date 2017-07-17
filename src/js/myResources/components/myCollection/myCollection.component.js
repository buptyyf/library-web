import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import {Link} from "react-router"
import networkAction from "../../../utils/networkAction"
import Pager from "../../../components/pager/pager.component"
import {date} from "../../../utils/utilFunctions"

export default class MyCollection extends React.Component {
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
        this.getCollectResList();
    }

    getCollectResList(){
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/getCollectionList`}, {pageNo: this.state.pageInfo.curPage});
        result.then((res) => {
            console.log("MyCollection: ", res);
            let newPageInfo = {
                curPage: res.data.currentPageNo,
                totalPages: res.data.totalPage
            }
            let infoArr = this.formatData(res.data.resourceList);
            this.setState({
                infoArr: infoArr,
                pageInfo: newPageInfo,
            })
        })
    }

    formatData(data) {
        let infoArr = [];
        let curPage = this.state.pageInfo.curPage;
        data.forEach((item, index) => {
            let eachResource = {
                index: (curPage - 1) * 10 + index + 1,
                resId: item.resId,
                name: item.title,
                score: item.commentscore,
                uploadUser: item.contributorName,
                collectTime: date(item.date)
            };
            infoArr.push(eachResource);
        })
        console.log("infoArr: ", infoArr);
        return infoArr;
    }
    nameFormatter(cell, row){
        console.log(cell, row)
        let link = "/TeachingResourceManagement/resource/" + row.resId
        return <Link to={link}>{cell}</Link>;
    }
    getNewPageNum(pageNum) {
        this.setState({
            pageInfo: Object.assign(this.state.pageInfo, {curPage: pageNum})
        }, this.getCollectResList.bind(this))
    }

    render() {
        return (
            <div>
                <BootstrapTable data={this.state.infoArr}>
                    <TableHeaderColumn isKey dataField='index' width="50px">序号</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataFormat={this.nameFormatter.bind(this)}>名称</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                    <TableHeaderColumn dataField='uploadUser'>上传用户</TableHeaderColumn>
                    <TableHeaderColumn dataField='collectTime'>收藏时间</TableHeaderColumn>
                </BootstrapTable>
                <Pager {...this.state.pageInfo} handleClick={this.getNewPageNum.bind(this)}/>
            </div>
        );
    }
}
