import React, {Component} from "react"
import "./changeInfo.style.less"

export default class ChangeInfo extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
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
                    <div className="change-info-first">
                        <input type="text" className="form-control" required/>
                    </div>
                    <div className="change-info ">
                        <input type="text" className="form-control" required />
                    </div>
                    <div className="change-info">  
                        <select className="select form-control">
                            <option value="">男</option>
                            <option value="">女</option>
                        </select>
                    </div>
                    <div className="change-info  ">
                        <input name="" type="date" className="select form-control"/> 
                    </div>
                    <div className="change-info ">
                        <select className="select form-control">
                            <option value="">交换中心</option>
                            <option value="">智能中心</option>
                            <option value="">网管中心</option>
                            <option value="">宽带中心</option>
                        </select>
                    </div>
                    <div className="change-info">
                        <input type="text" className="form-control" required/>
                    </div>
                    <div className="change-info">  
                        <select className="select form-control">
                            <option value="">讲师</option>
                            <option value="">副教授</option>
                            <option value="">教授</option>
                        </select> 
                    </div>
                    <div className="change-info">
                        <input type="text" className="form-control" required/>
                    </div>

                    <div className="button">
                        <button className="btn btn-default info-submit" > 提交 </button>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <button className="btn btn-default reset" > 重置 </button>
                    </div>
                </div>
            </div>
        );
    }
}
