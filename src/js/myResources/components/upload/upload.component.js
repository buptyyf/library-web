import React, {Component} from "react"
import {Link} from "react-router"
import "./upload.style.less"
import $ from 'jquery'

export default class UploadButton extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        $(".file").on("change","input[type='file']",function(){
            var filePath=$(this).val();
            console.log(filePath)
            $(".fileerrorTip").html("").hide();
            var arr=filePath.split('\\');
            var fileName=arr[arr.length-1];
            console.log(fileName)            
            $(".file-name").val(fileName);
            // if(filePath.indexOf("jpg")!=-1 || filePath.indexOf("png")!=-1){
            //     $(".fileerrorTip").html("").hide();
            //     var arr=filePath.split('\\');
            //     var fileName=arr[arr.length-1];
            //     $(".file-name").html(fileName);
            // }else{
            //     $(".file-name").html("");
            //     $(".fileerrorTip").html("您未上传文件，或者您上传文件类型有误！").show();
            //     return false
            // }
        })
    }

    handleSubmit() {
        let permission = $('input[type="radio"]:checked').value;
    }

    render() {
        return (
            <div>
                <div className="col-sm-12 well">
                    上传文档    
                </div>   
                <div className="col-sm-12 form-group">
                    <a href="javascript:;" className="file"><i className="glyphicon glyphicon-upload" />点击上传文档
                        <input type="file" name="" id=""/>
                    </a>
                </div>
                <div className="col-sm-12 well">
                    请补充文档信息，完成上传  
                </div>  
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">标题：</label>
                        <input type="text" className="file-name form-control" id="inputFile" placeholder="文档标题" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">简介：</label>
                        <textarea type="textarea" className="form-control" id="exampleInputPassword1" placeholder="文档简介" />
                    </div>
                    
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
                </div>
                <div className="col-sm-6">
                    使用权限：
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" />
                            私有文档  仅自己可见
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2"/>
                            科室文档  同一科室可以检索和阅读
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" />
                            院系文档  同一院系可以检索和阅读
                        </label>
                    </div>
                    <div className="radio">
                        <label>
                            <input type="radio" name="optionsRadios" id="optionsRadios4" value="option4" />
                            普通文档  任何人可以检索和阅读
                        </label>
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
                </div>
            </div>
        );
    }
}
