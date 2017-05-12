import React, {Component} from "react"
import {browserHistory} from 'react-router'
import "./changeInfo.style.less"
import networkAction from "../../../utils/networkAction"
import {date} from "../../../utils/utilFunctions"

export default class ChangeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departmentInfo: [],
            post: [],
            protitle: [],
            userNum: '',
            userName: '',
            sex: '',
            birthDate: '',
            depId: '',
            postId: '',
            protitleId: '',
            researcharea: ''
        };
    }

    componentWillMount() {
        console.log("startChangeInfo!!!!!!!!!!!!!!!!!!!");
        const result1 = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'});
        const result2 = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getPostAndProtitle`, method: 'POST'});
        result1.then((res) => {
            console.log("departmentBrowsing: ", res);
            this.setState({
                departmentInfo: res.data.departmentInfo
            })
        })
        result2.then((res) => {
            console.log("getPostAndProtitle: ", res);
            this.setState({
                post: res.data.post ,
                protitle: res.data.protitle
            })
        })
        const result3 = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getUserInfo`, method: 'POST'});
        result3.then((res) => {
            console.log("getUserInfo: ", res);
            this.setState({
            userNum: res.data.userNum,
            userName: res.data.userName,
            sex: res.data.sex,
            birthDate: date(res.data.birthdat),
            depId: res.data.depId,
            postId: res.data.postId,
            protitleId: res.data.protitleId,
            researcharea: res.data.researcharea
            })
        })

    }

    handleChangeInfoSummit(event){
        event.preventDefault();
        console.log("handleChangeInfoSummit");
        let userNum = this.state.userNum;
        let userName = this.state.userName
        let sex = this.state.sex
        let birthDate = this.state.birthDate
        let depId = this.state.depId
        let postId = this.state.postId
        let protitleId = this.state.protitleId
        let researcharea = this.state.researcharea

        const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/updateUserCommit`, "method": 'POST'},
        {"userNum": userNum, "userName":userName, "sex":sex, "birthDate": birthDate, "depId": depId, "postId": postId, "protitleId": protitleId, "researcharea": researcharea})

        result.then((res) => {
            console.log("login-result:", res);
            if(res.code == 0){
                browserHistory.push('/user/changeInfoDone');
            }else{
                alert("密码修改失败，请重新修改！");
            }
         })
        event.preventDefault();
    }

    handleChangeInfoReset(event){
        this.setState({
            userNum: '',
            userName: '',
            sex: '',
            birthDate: '',
            depId: '',
            postId: '',
            protitleId: '',
            researcharea: ''
        })
    }

    userNumChange(event) {
        this.setState({
            userNum: event.target.value
        })
    }
    userNameChange(event) {
        this.setState({
            userName: event.target.value
        })
    }
    sexChange(event) {
        this.setState({
            sex: event.target.value
        })
    }
    birthDateChange(event) {
        this.setState({
            birthDate: event.target.value
        })
    }
    depIdChange(event) {
        this.setState({
            depId: event.target.value
        })
    }
    postIdChange(event) {
        this.setState({
            postId: event.target.value
        })
    }
    protitleIdChange(event) {
        this.setState({
            protitleId: event.target.value
        })
    }
    researchareaChange(event) {
        this.setState({
            researcharea: event.target.value
        })
    }


    render() {
        let {departmentInfo,post, protitle} = this.state;
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
                 </div>

                 <div className="change-info-right"> 
                   <form onSubmit={this.handleChangeInfoSummit.bind(this)}>                                      
                    <div className="change-info-first">
                        <input type="text" className="form-control"
                        value={this.state.userNum} 
                        onChange={this.userNumChange.bind(this)}/>
                    </div>
                    <div className="change-info ">
                        <input type="text" className="form-control" 
                            value={this.state.userName} 
                            onChange={this.userNameChange.bind(this)} />
                    </div>
                    <div className="change-info">  
                        <select className="select form-control"
                                value={this.state.sex} 
                                onChange={this.sexChange.bind(this)}>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select>
                    </div>
                    <div className="change-info  ">
                        <input name="" type="date" className="select form-control"
                               value={this.state.birthDate} 
                               onChange={this.birthDateChange.bind(this)}/> 
                    </div>
                    <div className="change-info ">
                        <select className="select form-control"
                                value={this.state.depId} 
                                onChange={this.depIdChange.bind(this)}>
                            {departmentInfo.map((department, index) => {
                            return (
                                <option value={department.depId} key={department.depId}>{department.depName}</option>
                            )
                        })}
                        </select>
                    </div>
                    <div className="change-info">
                        <select type="text" className="form-control" 
                               value={this.state.postId} 
                               onChange={this.postIdChange.bind(this)}>
                           {post.map((post, index) => {
                            return (
                                <option value={post.postId} key={post.postId}>{post.postName}</option>
                            )
                        })}    
                        </select>
                    </div>
                    <div className="change-info">  
                        <select className="select form-control"
                                value={this.state.protitleId} 
                                onChange={this.protitleIdChange.bind(this)}>
                            {protitle.map((protitle, index) => {
                            return (
                                <option value={protitle.protitleId} key={protitle.protitleId}>{protitle.protitleName}</option>
                            )
                        })}    
                        </select> 
                    </div>
                    <div className="change-info">
                        <input type="text" className="form-control" 
                               value={this.state.researcharea} 
                               onChange={this.researchareaChange.bind(this)}/>
                    </div>

                    
                    <div className="button">
                        <input type="submit" className="btn btn-default info-submit" value="提交" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.handleChangeInfoReset.bind(this)} value="重置" /> 
                    </div>
                </form>
                </div>
            </div>
        );
    }
}
