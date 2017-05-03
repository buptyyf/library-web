import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import {Link} from "react-router"
import { date } from "../../utils/utilFunctions"
import Pager from "../pager/pager.component"

export default class ResourcesTable extends React.Component {
    constructor(props) {
        super(props);
        this.options = {
            // defaultSortName: 'name',  // default sort column name
            // defaultSortOrder: 'desc'  // default sort order
            noDataText: "暂无相关资源"
        }
        this.state = {
            data: []
        }
    }
    // componentWillMount() {
    //     this.addProducts(10)
    //     console.log(this.props);
    // }
    // addProducts(quantity) {
    //     const startId = this.info.length;
    //     for (let i = 0; i < quantity; i++) {
    //         const id = startId + i;
    //         this.info.push({
    //             id: id,
    //             name: {
    //                 title: "title" + i
    //             },
    //             author: 'author' + i,
    //             department: 'department' + i,
    //             uploadTime: "2016-3-" + i,
    //             resourceType: "type" + i,
    //             browseNum: 200 + i,
    //             downloadNum: 10 + i,
    //             score: 1 + i
    //         });
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        let formatData = this.formatData(nextProps.data, nextProps.pageInfo);
        console.log("formatData: ", formatData);
        this.setState({
            pageInfo: nextProps.pageInfo,
            data: formatData
        })
    }
    formatData(data, pageInfo) {
        let formatData = [];
        let curPage = pageInfo.curPage;
        data.forEach((item, index) => {
            let uploadTime = date(item.date);
            let obj = {
                index: (curPage - 1) * 10 + index + 1,
                resId: item.resId,
                name: item.title,
                author: item.contributor,
                department: item.department,
                uploadTime: uploadTime,
                resourceType: item.resType,
                browseNum: item.pageviews,
                downloadNum: item.downloads,
                score: item.commentscore
            }
            formatData.push(obj);
        })
        return formatData;
    }

    priceFormatter(cell, row){
        //console.log(cell, row)
        let link = "/resource/" + row.resId
        return <Link to={link}>{cell}</Link>;
    }
    getNewPageNum(pageNum) {
        this.props.handlePageChange(Number(pageNum));
    }
    render() {
        return (
            <div>
                <BootstrapTable data={ this.state.data } options={ this.options }>
                    <TableHeaderColumn dataField='index' isKey={ true }>序号</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='name' width="220" dataSort={ true } dataFormat={this.priceFormatter.bind(this)}>题目</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='author'>作者</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='department'>科室</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='uploadTime'>上传时间</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='resourceType' >资源类型</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='browseNum' >浏览量</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='downloadNum'>下载量</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='score'>评分</TableHeaderColumn>
                </BootstrapTable>
                <Pager {...this.props.pageInfo} handleClick={this.getNewPageNum.bind(this)}/>
            </div>
        );
    }
}

ResourcesTable.propTypes = {
    pageInfo: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    handlePageChange: React.PropTypes.func,
}
ResourcesTable.defaultProps = {
    data: [],
    pageInfo: {
        curPage: 1,
        totalPages: 1
    },
    handlePageChange: () => {}
}