import React, {Component} from "react"

export default class ClassifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
    }


    render() {
        return (
        <div className="well">
            <div className="">
                学科：
                <select id="subject" className="form-control">
                    <option>全部</option>
                    <option>高数</option>
                    <option>线代</option>
                    <option>概率论</option>
                    <option>模糊数学</option>
                    <option>离散数学</option>
                </select>
            </div>
            <br />
            <div className="">
                适用对象：
                <select id="subject" className="form-control">
                    <option>全部</option>
                    <option>大一</option>
                    <option>大二</option>
                    <option>大三</option>
                    <option>大四</option>
                    <option>研究生</option>
                </select>
            </div>
            <br />
            <div className="">
                资源类型：
                <select id="subject" className="form-control">
                    <option>全部</option>
                    <option>word</option>
                    <option>ppt</option>
                    <option>pdf</option>
                    <option>txt</option>
                    <option>xls</option>
                </select>
            </div>
        </div> 
        );
    }
}
