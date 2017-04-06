import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import {Link} from "react-router"
import Pager from "../pager/pager.component"

export default class ResourcesTable extends React.Component {
    constructor(props) {
        super(props);
        this.info = [];
        this.options = {
            // defaultSortName: 'name',  // default sort column name
            // defaultSortOrder: 'desc'  // default sort order
        }
        this.state = {
            page: {
                curPage: 1,
                totalPages: 3,
            }
        }
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.addProducts(10)
        console.log(this.props);
    }
    addProducts(quantity) {
        const startId = this.info.length;
        for (let i = 0; i < quantity; i++) {
            const id = startId + i;
            this.info.push({
                id: id,
                name: {
                    title: "title" + i
                },
                author: 'author' + i,
                department: 'department' + i,
                uploadTime: "2016-3-" + i,
                resourceType: "type" + i,
                browseNum: 200 + i,
                downloadNum: 10 + i,
                score: 1 + i
            });
        }
    }

    priceFormatter(cell, row){
        //console.log(cell, row)
        let link = "/resource/" + row.id
        return <Link to={link}>{cell.title}</Link>;
    }
    getNewPageNum(pageNum) {
        // TODO 网络请求
        this.setState({
            page: {
                curPage: Number(pageNum),
                totalPages: this.state.page.totalPages
            }
        })
    }
    render() {
        return (
            <div>
                <BootstrapTable data={ this.info } options={ this.options }>
                    <TableHeaderColumn dataField='id' isKey={ true } dataSort={ true }>序号</TableHeaderColumn>
                    <TableHeaderColumn dataField='name' dataSort={ true } dataFormat={this.priceFormatter.bind(this)}>题目</TableHeaderColumn>
                    <TableHeaderColumn dataField='author'>作者</TableHeaderColumn>
                    <TableHeaderColumn dataField='department'>科室</TableHeaderColumn>
                    <TableHeaderColumn dataField='uploadTime'>上传时间</TableHeaderColumn>
                    <TableHeaderColumn dataField='resourceType'>资源类型</TableHeaderColumn>
                    <TableHeaderColumn dataField='browseNum'>浏览量</TableHeaderColumn>
                    <TableHeaderColumn dataField='downloadNum'>下载量</TableHeaderColumn>
                    <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                </BootstrapTable>
                <Pager {...this.state.page} handleClick={this.getNewPageNum.bind(this)}/>
            </div>
        );
    }
}
