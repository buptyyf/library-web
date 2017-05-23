import React, {Component} from "react"
import {browserHistory} from 'react-router'
import "./changeInfo.style.less"
import networkAction from "../../../utils/networkAction"
import {date} from "../../../utils/utilFunctions"

export default class ChangeInfo extends React.Component {
    constructor(props) {
        super(props);
        this.oriInfo = {
                userNum: '',
                userName: '',
                sex: '',
                birthDate: '',
                depId: '',
                postId: '',
                protitleId: '',
                researcharea: ''
            },
        this.state = {
            departmentInfo: [],
            post: [],
            protitle: [],
            newInfo:{
                userNum: '',
                userName: '',
                sex: '',
                birthDate: '',
                depId: '',
                postId: '',
                protitleId: '',
                researcharea: ''  
            }
        };
    }

    componentWillMount() {
        console.log("startChangeInfo!!!!!!!!!!!!!!!!!!!");
        const depList = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'});
        const postAndProtitleList = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getPostAndProtitle`, method: 'POST'});
        depList.then((res) => {
            console.log("departmentBrowsing: ", res);
            this.setState({
                departmentInfo: res.data.departmentInfo
               
            })
        })
        postAndProtitleList.then((res) => {
            console.log("getPostAndProtitle: ", res);
            this.setState({
                post: res.data.post ,
                protitle: res.data.protitle
            })
        })
        const userInfo = networkAction.promiseNetwork({url: `TeachingResourceManagement/user/getUserInfo`, method: 'POST'});
        userInfo.then((res) => {
            console.log("getUserInfo: ", res);
            this.oriInfo = {
                userNum: res.data.userNum,
                userName: res.data.userName,
                sex: res.data.sex,
                birthDate: date(res.data.birthdate),
                depId: res.data.depId,
                postId: res.data.postId,
                protitleId: res.data.protitleId,
                researcharea: res.data.researcharea
            }
            this.setState({
                newInfo :this.oriInfo
            })
        })

    }

    handleChangeInfoSummit(event){
        event.preventDefault();
        console.log("handleChangeInfoSummit");

         const result = networkAction.promiseNetwork({"url": `TeachingResourceManagement/user/updateUserCommit`, "method": 'POST'}, this.state.newInfo )
        // {"userNum": userNum, "userName":userName, "sex":sex, "birthDate": birthDate, "depId": depId, "postId": postId, "protitleId": protitleId, "researcharea": researcharea})
         
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
            newInfo: this.oriInfo,
        })
    }

    userNumChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {userNum: event.target.value})
        })
    }
    userNameChange(event) {
        this.setState({
            //userName: event.target.value
            newInfo: Object.assign({}, this.state.newInfo, {userName: event.target.value})
        })
    }
    sexChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {sex: event.target.value})
        })
    }
    birthDateChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {birthDate: event.target.value})
        })
    }
    depIdChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {depId: event.target.value})
        })
    }
    postIdChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {postId: event.target.value})
        })
    }
    protitleIdChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {protitleId: event.target.value})
        })
    }
    researchareaChange(event) {
        this.setState({
            newInfo: Object.assign({}, this.state.newInfo, {researcharea: event.target.value})
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
                        value={this.state.newInfo.userNum} disabled
                        onChange={this.userNumChange.bind(this)}/>
                    </div>
                    <div className="change-info ">
                        <input type="text" className="form-control" 
                            value={this.state.newInfo.userName} 
                            onChange={this.userNameChange.bind(this)} />
                    </div>
                    <div className="change-info">  
                        <select className="select form-control"
                                value={this.state.newInfo.sex} 
                                onChange={this.sexChange.bind(this)}>
                            <option value="0">男</option>
                            <option value="1">女</option>
                        </select>
                    </div>
                    <div className="change-info  ">
                        <input name="" type="date" className="select form-control"
                               value={this.state.newInfo.birthDate} 
                               onChange={this.birthDateChange.bind(this)}/> 
                    </div>
                    <div className="change-info ">
                        <select className="select form-control"
                                value={this.state.newInfo.depId} 
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
                               value={this.state.newInfo.postId} 
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
                                value={this.state.newInfo.protitleId} 
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
                               value={this.state.newInfo.researcharea} 
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
