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
                
                <div className="change-info-first col-sm-offset-3">
                    教工号&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name="" size="20"/> 
                </div>
                <div className="change-info col-sm-offset-3">
                    姓名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input name=""/> 
                </div>
                <div className="change-info col-sm-offset-3">
                    性别&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  
                    <select className="select">
                        <option value="">男</option>
                        <option value="">女</option>
                    </select>

                </div>
                <div className="change-info col-sm-offset-3 ">
                    生日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input name="" type="date" className="select"/> 
                </div>
                <div className="change-info col-sm-offset-3">
                    科室 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select className="select">
                        <option value="">交换中心</option>
                        <option value="">智能中心</option>
                        <option value="">网管中心</option>
                        <option value="">宽带中心</option>
                    </select>
                </div>
                <div className="change-info col-sm-offset-3">
                    职务&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  <input name=""/> 
                </div>
                <div className="change-info col-sm-offset-3">
                    职称 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  
                    <select className="select">
                        <option value="">讲师</option>
                        <option value="">副教授</option>
                        <option value="">教授</option>
                    </select> 
                </div>
                <div className="change-info col-sm-offset-3">
                    研究方向  <input name=""/> 
                </div>
                <div className="submit col-sm-offset-4 ">
                   
                    <button className="btn btn-default lightblue" > 提交 </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    <button className="btn btn-default lightblue" > 重置 </button>
                </div>
            </div>
        );
    }
}
