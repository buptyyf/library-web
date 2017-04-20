import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import networkAction from "../../../utils/networkAction"

export default class MyDownload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoArr: [
                {
                    name: "Product1",
                    score: 120,
                    uploadUser: "yyf",
                    downloadTime: "2016-12-12"                    
                }, {
                    name: "Product2",
                    score: 80,
                    uploadUser: "asdf",
                    downloadTime: "2016-12-12"
                }
            ]
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/userResource/getDownloadList`}, {pageNo: 1});
        result.then((res) => {
            console.log("MyUpload: ", res)
        })
    }

    render() {
        return (
            <BootstrapTable data={this.state.infoArr}>
                <TableHeaderColumn isKey dataField='name'>名称</TableHeaderColumn>
                <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                <TableHeaderColumn dataField='uploadUser'>上传用户</TableHeaderColumn>
                <TableHeaderColumn dataField='downloadTime'>下载时间</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
