import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"

export default class MyCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoArr: [
                {
                    name: "Product1",
                    score: 120,
                    uploadUser: "yyf",
                    collectTime: "2016-12-12"                    
                }, {
                    name: "Product2",
                    score: 80,
                    uploadUser: "asdf",
                    collectTime: "2016-12-12"
                }
            ]
        };
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
            <BootstrapTable data={this.state.infoArr}>
                <TableHeaderColumn isKey dataField='name'>名称</TableHeaderColumn>
                <TableHeaderColumn dataField='score'>评分</TableHeaderColumn>
                <TableHeaderColumn dataField='uploadUser'>上传用户</TableHeaderColumn>
                <TableHeaderColumn dataField='collectTime'>收藏时间</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}
