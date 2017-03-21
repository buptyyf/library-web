import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import {Link} from "react-router"

export default class AdminQueryTable extends React.Component {
    constructor(props) {
        super(props);
        this.info = [];
        this.options = {
            // defaultSortName: 'name',  // default sort column name
            // defaultSortOrder: 'desc'  // default sort order
            handleConfirmDeleteRow: this.onBeforeDeleteRow.bind(this),  // A hook for after droping rows.
            afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
            afterInsertRow: this.onAfterInsertRow.bind(this)   // A hook for after insert rows
        }
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        this.addProducts(30)
        console.log(this.props);
    }
    addProducts(quantity) {
        const startId = this.info.length;
        for (let i = 0; i < quantity; i++) {
            const id = startId + i;
            this.info.push({
                id: id,
                name: "yyf" + i,
                gender: '男',
                department: 'department' + i,
                age: 25 + i,
                position: "position" + i,
                jobTitle: "jobTitle" + i,
                research: "research" + i,
                operation: ["删除", "修改"]
            });
        }
    }

    priceFormatter(cell, row){
        //console.log(cell, row)
        let link = "/user/" + row.id
        return (
            <div>
                <Link to={link}>{cell.operation[1]}</Link>
                <button className="btn btn-warning">删除</button>
            </div>
        )
    }
    onBeforeDeleteRow(next, dropRowKeys) {
        console.log("onBeforeDeleteRow",next, dropRowKeys, arguments)
        next();
    }
    onAfterDeleteRow(row, cellName, cellValue) {
        console.log("onAfterDeleteRow")
    }
    onAfterInsertRow(row, cellName, cellValue) {
        console.log("onAfterInsertRow")
    }
    onAfterSaveCell(row, cellName, cellValue) {
        console.log(`Save cell ${cellName} with value ${cellValue}`);

        let rowStr = '';
        for (const prop in row) {
            rowStr += prop + ': ' + row[prop] + '\n';
        }

        console.log('Thw whole row :\n' + rowStr);
    }

    onBeforeSaveCell(row, cellName, cellValue) {
        // You can do any validation on here for editing value,
        // return false for reject the editing
        console.log("onBeforeSaveCell")
        return true;
    }


    render() {
        const cellEditProp = {
            mode: 'click',
            blurToSave: true,
            beforeSaveCell: this.onBeforeSaveCell.bind(this), // a hook for before saving cell
            afterSaveCell: this.onAfterSaveCell.bind(this)  // a hook for after saving cell
        };
        const selectRowProp = {
            mode: 'checkbox'
        };
        const gender = ["男", "女"]
        return (
            <BootstrapTable data={ this.info } cellEdit={ cellEditProp } options={this.options} deleteRow={ true } selectRow={ selectRowProp } insertRow={ true } pagination>
                <TableHeaderColumn dataField='id' isKey={ true } filter={{ type: 'TextFilter'}} >教工号</TableHeaderColumn>
                <TableHeaderColumn dataField='name' filter={{ type: 'TextFilter'}}>姓名</TableHeaderColumn>
                <TableHeaderColumn dataField='gender' editable={ { type: 'select', options: { values: gender } } }>性别</TableHeaderColumn>
                <TableHeaderColumn dataField='department'>科室</TableHeaderColumn>
                <TableHeaderColumn dataField='age' editable={ { type: 'date' } }>年龄</TableHeaderColumn>
                <TableHeaderColumn dataField='position'>职务</TableHeaderColumn>
                <TableHeaderColumn dataField='jobTitle'>职称</TableHeaderColumn>
                <TableHeaderColumn dataField='research'>研究方向</TableHeaderColumn>
                {/*<TableHeaderColumn dataField='operation' dataFormat={this.priceFormatter.bind(this)}>操作</TableHeaderColumn>*/}
            </BootstrapTable>
        );
    }
}
