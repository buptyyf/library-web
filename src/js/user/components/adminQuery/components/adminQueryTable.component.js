import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import React, {Component} from "react"
import {Link} from "react-router"
import Pager from "../../../../components/pager/pager.component"
import networkAction from "../../../../utils/networkAction"
import {date} from "../../../../utils/utilFunctions"
import {Modal, Button} from "react-bootstrap"

export default class AdminQueryTable extends React.Component {
    constructor(props) {
        super(props);
        this.post = [];     // 职务
        this.protitle = [];   // 职称
        this.departmentInfo = [];  // 院系
        this.userAuthInfo = [];
        this.state = {
            data: [],
            showInsertModal: false,
            showModifyModal: false,
            individualInfo: {},
            pageInfo: {
                curPage: 1,
                totalPages: 1,
            }
        }
        this.options = {
            insertText: "新增",
            deleteText: "删除",
            noDataText: "暂无相关资源",
            insertBtn: this.showInsertBtn.bind(this),
            handleConfirmDeleteRow: this.onBeforeDeleteRow.bind(this),  // A hook for after droping rows.
            afterDeleteRow: this.onAfterDeleteRow.bind(this),  // A hook for after droping rows.
            afterInsertRow: this.onAfterInsertRow.bind(this)   // A hook for after insert rows
        }
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        const departmentInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'});
        const postAndProtitle = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getPostAndProtitle`, method: 'POST'});
        const userAuthInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getAuthorityList`, method: 'POST'});
        
        departmentInfo.then((res) => {
            console.log("departmentBrowsing: ", res);
            this.departmentInfo = res.data.departmentInfo;
        })
        postAndProtitle.then((res) => {
            console.log("getPostAndProtitle: ", res);
            this.post = res.data.post;
            this.protitle = res.data.protitle;
        })
        userAuthInfo.then((res) => {
            console.log("userAuthInfo: ", res);
            this.userAuthInfo = res.data.userAuthorities;
        })
    }
    componentWillReceiveProps(nextProps) {
        let formatData = this.formatData(nextProps.data);
        console.log("nextProps.data: ",nextProps.data, "formatData: ", formatData);
        this.setState({
            pageInfo: nextProps.pageInfo,
            data: formatData
        })
    }
    formatData(data) {
        let formatData = [];
        data.forEach((item, index) => {
            let birthdate = date(item.birthdate);
            let obj = {
                userId: item.userId,
                id: item.userNum,
                name: item.userName,
                gender: item.sex,
                department: item.departmentName,
                depId: item.depId,
                age: birthdate,
                post: item.postName,
                postId: item.postId,
                protitle: item.protitleName,
                protitleId: item.protitleId,
                research: item.researcharea,
                operation: ["修改"],
                userauthId: item.userauthId
            }
            formatData.push(obj);
        })
        return formatData;
    }

    
    handleInfoSummit(event){
        event.preventDefault();
        console.log("handleChangeInfoSummit");
        let {id, name, gender, age, depId, postId, protitleId, research, userauthId, userId} = this.state.individualInfo;
        let url = `TeachingResourceManagement/user/addUser`;
        let obj = {
            "userNum": id, 
            "userName": name, 
            "sex": gender, 
            "birthdate": age, 
            "depId": depId, 
            "postId": postId, 
            "protitleId": protitleId, 
            "researcharea": research,
            "userauthId": userauthId
        };
        if(this.state.showModifyModal) {
            url = `TeachingResourceManagement/user/modifyUser`;
            obj = Object.assign({}, obj, {userId: userId});
        }

        const result = networkAction.promiseNetwork({
             "url": url, 
             "method": 'POST'
        }, obj);
         
        result.then((res) => {
            console.log("login-result:", res);
            if(res.code == 0){
                // browserHistory.push('/user/changeInfoDone');
                this.getNewPageNum(this.state.pageInfo.curPage);
                if(this.state.showInsertModal) {
                    alert("添加成功！");
                } else {
                    alert("修改成功！");
                }
                this.setState({
                    showModifyModal: false,
                    showInsertModal: false,
                    individualInfo: {}
                })
            }else{
                if(this.state.showInsertModal) {
                    alert("新增教工失败，请稍后重试！");
                } else {
                    alert("修改信息失败，请稍后重试！");
                }
            }
         })
        event.preventDefault();
    }
    modifyRow(rowInfo) {
        console.log(rowInfo);
        this.setState({
            showModifyModal: true,
            individualInfo: rowInfo
        })
    }
    insertRow() {
        this.setState({
            showInsertModal: true,
            individualInfo: {
                gender: "0",
                depId: this.props.depId ? this.props.depId : this.departmentInfo[0].depId,
                postId: this.post[0].postId,
                protitleId: this.protitle[0].protitleId,
                userauthId: this.userAuthInfo[0].userauthId
            }
        })
    }
    closeModal() {
        this.setState({
            showModifyModal: false,
            showInsertModal: false,
            individualInfo: {}
        })
    }
    userNumChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {id: event.target.value})
        })
    }
    userNameChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {name: event.target.value})
        })
    }
    sexChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {gender: event.target.value})
        })
    }
    birthDateChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {age: event.target.value})
        })
    }
    depIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {depId: event.target.value})
        })
    }
    postIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {postId: event.target.value})
        })
    }
    protitleIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {protitleId: event.target.value})
        })
    }
    researchareaChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {research: event.target.value})
        })
    }
    authIdChange(event) {
        this.setState({
            individualInfo: Object.assign({}, this.state.individualInfo, {userauthId: event.target.value})
        })
    }
    inputForm() {
        let {id, name, gender, age, depId, postId, protitleId, research, userauthId} = this.state.individualInfo;
        if(!depId) {
            depId = this.props.depId;
        }     
        return (
        <div>
            <div className="change-info-left col-sm-offset-3">
                <div className="change-info-text-first">教工号</div>
                <div className="change-info-text">姓名</div>
                <div className="change-info-text">性别</div>
                <div className="change-info-text">生日</div>
                <div className="change-info-text">科室</div>
                <div className="change-info-text">职务</div>
                <div className="change-info-text">职称</div>
                <div className="change-info-text">研究方向</div>
                <div className="change-info-text">教工权限</div>
            </div>

            <div className="change-info-right"> 
                <form onSubmit={this.handleInfoSummit.bind(this)}>                                      
                    <div className="change-info-first">
                        <input type="text" className="form-control"
                        value={id} 
                        onChange={this.userNumChange.bind(this)} required/>
                    </div>
                    <div className="change-info ">
                        <input type="text" className="form-control" 
                            value={name} 
                            onChange={this.userNameChange.bind(this)} required/>
                    </div>
                    <div className="change-info">  
                        <select className="changeInfo-select form-control"
                                value={gender} 
                                onChange={this.sexChange.bind(this)} required>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select>
                    </div>
                    <div className="change-info  ">
                        <input name="" type="date" className="changeInfo-select form-control"
                            value={age} 
                            onChange={this.birthDateChange.bind(this)} required/> 
                    </div>
                    <div className="change-info ">
                        <select className="changeInfo-select form-control"
                                value={depId} 
                                onChange={this.depIdChange.bind(this)} required>
                            {this.departmentInfo.map((department, index) => {
                            return (
                                <option value={department.depId} key={department.depId}>{department.depName}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="change-info">
                        <select type="text" className="form-control" 
                            value={postId} 
                            onChange={this.postIdChange.bind(this)} required>
                        {this.post.map((post, index) => {
                            return (
                                <option value={post.postId} key={post.postId}>{post.postName}</option>
                            )
                        })}    
                        </select>
                    </div>
                    <div className="change-info">  
                        <select className="changeInfo-select form-control"
                                value={protitleId} 
                                onChange={this.protitleIdChange.bind(this)} required>
                            {this.protitle.map((protitle, index) => {
                                return (
                                    <option value={protitle.protitleId} key={protitle.protitleId}>{protitle.protitleName}</option>
                                )
                            })}    
                        </select> 
                    </div>
                    <div className="change-info">
                        <input type="text" className="form-control" 
                            value={research} 
                            onChange={this.researchareaChange.bind(this)} required/>
                    </div>
                    <div className="change-info">
                        <select className="changeInfo-select form-control"
                            value={userauthId} 
                            onChange={this.authIdChange.bind(this)} required>
                            {this.userAuthInfo.map((userAuth, index) => {
                                return (
                                    <option value={userAuth.userauthId} key={userAuth.userauthId}>{userAuth.userauthName}</option>
                                )
                            })}
                        </select> 
                    </div>
                    
                    <div className="button">
                        <input type="submit" className="btn btn-default info-submit" value="提交" /> 
                    </div>
                </form>
            </div>
        </div>
        )
    }
    showModifyModal() {
        return (
            <Modal show={this.state.showModifyModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>修改资料</Modal.Title>
                </Modal.Header>
                    {this.inputForm()}
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        )
    }
    showInsertBtn() {
        return (
            <button className="btn btn-info" onClick={this.insertRow.bind(this)}>
                <i className="glyphicon glyphicon-plus"/>新增
            </button>
        )
    }
    showInsertModal() {
        return (
            <Modal show={this.state.showInsertModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>添加新用户</Modal.Title>
                </Modal.Header>
                    {this.inputForm()}
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        )
    }
    operatorFormatter(cell, row){
        return (
            <div>
                <button className="btn btn-info btn-xs" onClick={this.modifyRow.bind(this, row)}>修改</button>
            </div>
        )
    }
    genderFormatter(cell, row) {
        return (
            <div>{cell === "0" ? "男" : "女"}</div>
        )
    }

    onBeforeDeleteRow(next, dropRowKeys) {
        console.log("onBeforeDeleteRow",next, dropRowKeys, arguments)
        const dropRowKeysStr = dropRowKeys.join(',');
        if (confirm(`你确定要删除教工号为： ${dropRowKeysStr} 的教师信息么?`)) {
            const result = networkAction.promiseNetwork({
                "url": `TeachingResourceManagement/user/deleteUser`, 
                "method": 'POST'
            }, {
                "userNum": dropRowKeys, 
            });
            
            result.then((res) => {
                if(res.code == 0){
                    // browserHistory.push('/user/changeInfoDone');
                    this.getNewPageNum(this.state.pageInfo.curPage);
                    this.setState({
                        showModifyModal: false,
                        showInsertModal: false,
                        individualInfo: {}
                    })
                    next();
                }else{
                    alert("删除失败，请稍后重试！");
                }
            })
            
        }
    }
    onAfterDeleteRow(row, cellName, cellValue) {
        console.log("onAfterDeleteRow")
    }
    onAfterInsertRow(row, cellName, cellValue) {
        console.log("onAfterInsertRow")
    }
    getNewPageNum(pageNum) {
        this.props.handlePageChange(Number(pageNum));
    }

    render() {
        const selectRowProp = {
            mode: 'checkbox',
        };
        return (
            <div>
                <BootstrapTable data={ this.state.data } options={this.options} deleteRow={ true } selectRow={ selectRowProp } insertRow= {true}>
                    <TableHeaderColumn dataField='id' columnTitle={true} isKey={ true } >教工号</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='name' >姓名</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} width="50px" dataField='gender' dataFormat={this.genderFormatter.bind(this)}>性别</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='department'>科室</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='age' >年龄</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='post'>职务</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='protitle' >职称</TableHeaderColumn>
                    <TableHeaderColumn columnTitle={true} dataField='research'>研究方向</TableHeaderColumn>
                    <TableHeaderColumn dataField='operation' width="55px" dataFormat={this.operatorFormatter.bind(this)}>操作</TableHeaderColumn>
                </BootstrapTable>
                <Pager {...this.props.pageInfo} handleClick={this.getNewPageNum.bind(this)} />
                {this.showModifyModal()}
                {this.showInsertModal()}
            </div>
        );
    }
}

AdminQueryTable.propTypes = {
    pageInfo: React.PropTypes.object.isRequired,
    data: React.PropTypes.array.isRequired,
    handlePageChange: React.PropTypes.func,
    depId: React.PropTypes.oneOfType([ React.PropTypes.string, React.PropTypes.number])
}
AdminQueryTable.defaultProps = {
    data: [],
    pageInfo: {
        curPage: 1,
        totalPages: 1
    },
    depId: "",
    handlePageChange: () => {}
}