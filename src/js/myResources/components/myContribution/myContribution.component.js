import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import networkAction from "../../../utils/networkAction"

export default class MyContribution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoArr: [
                {
                    scanNum: 1,
                    name: "Product1",
                    score: 120,
                    downloadNum: 3,
                    uploadTime: "2016-12-12"                    
                }, {
                    scanNum: 2,
                    name: "Product2",
                    score: 80,
                    downloadNum: 2,
                    uploadTime: "2016-12-12"
                }
            ]
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/getUploadList`}, {pageNo: 1});
        result.then((res) => {
            console.log("MyUpload: ", res)
        })
    }

    render() {
        return (
            <BootstrapTable data={this.state.infoArr}>
                <TableHeaderColumn isKey dataField='name'>名称</TableHeaderColumn>
                <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                <TableHeaderColumn dataField='scanNum'>浏览量</TableHeaderColumn>
                <TableHeaderColumn dataField='downloadNum'>下载量</TableHeaderColumn>
                <TableHeaderColumn dataField='uploadTime'>上传时间</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
