import React, {Component} from "react"
import {Link, browserHistory} from "react-router"
import {Modal, Button} from "react-bootstrap"
import "./upload.style.less"
import $ from 'jquery'
import networkAction from "../../../utils/networkAction"

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
    //this.handleClick = this.handleClick.bind(this);
        this.state = {
            subjects: [],
            objects: [],
            authorities: [],
            title: "",
            file: {},
            abstract: false,
            subject: false,
            object: false,
            authority: false,
            uploadState: 0,
        }
    }

    componentWillMount() {
        console.log("componentWillMount api")
        let result = networkAction.promiseNetwork({url: "TeachingResourceManagement/teachingResource/infoForUpload", method: "POST"});
        result.then((res) => {
            let data = res.data;
            let subjects = data.subjectInfo;
            let objects = data.applicableObject;
            let authorities = data.resourceAuthInfo;
            this.setState({
                subjects: subjects,
                objects: objects,
                authorities: authorities
            })
        })
    }
    componentDidMount() {
        $(".file").on("change","input[type='file']",function(){
            let filePath = $(this).val();
            console.log(filePath)
            $(".fileerrorTip").html("").hide();
            let arr = filePath.split('\\');
            console.log("file1:", arr)
            let fileNameType = arr[arr.length-1];
            arr = fileNameType.split('.');
            let fileName = arr[0]
            if(arr.length >= 1) {
                arr.pop();
                fileName = arr.join(".")
            }
            $(".file-name").val(fileName);
        })
    }
    checkInput() {

    }

    handleSubmit(event) {
        let file = this.fileInput.files[0];
        console.log(this.fileInput.files)
        let authority = $('input[type="radio"]:checked').val();
        let subject = $('#subject option:selected').val()//.value;
        let object = $('#object option:selected').val()//.value;
        let title = $('#inputFile').val();
        let description = $('#description').val();
        console.log("file:", Object.keys(file), authority, subject, object, title, description);
        if(file && authority && subject && object && description) {
            // $(".authority").addClass("warning")
            // return false;
            let result = networkAction.promiseNetwork({
                url: "TeachingResourceManagement/teachingResource/upload",
                method: "POST",
                contentType: "formdata"
            }, {
                title: title,
                description: description,
                subjectId: subject,
                appobjId: object,
                resAuthId: authority,
                file: file
            })
            this.setState({
                uploadState: 1,
            })
            result.then((res) => {
                console.log("upload res: ", res)
                if(res.code == 0) {
                    this.setState({
                        uploadState: 0,
                    })
                    browserHistory.push("/myResources/uploadDone")
                }
            }).catch(() => {
                alert("上传失败")
            })
        } else {
            // $(".authority").removeClass("warning")
        }
        // browserHistory.push("/myResources/uploadDone")
        event.preventDefault();
    }
    renderWait(){
        if(this.state.uploadState == 1){
           return(
               <div className="wait">
                    <span className="glyphicon glyphicon-refresh"></span>
                    &nbsp;正在上传，请稍候！
               </div>
           )
        }else return null;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
                <div className="col-sm-12 well">
                    上传文档    
                </div>   
                <div className="col-sm-12 form-group">
                    <a href="javascript:;" className="file"><i className="glyphicon glyphicon-upload" />点击上传文档
                        <input type="file" ref={(input) => { this.fileInput = input; }} />
                    </a>
                </div>
                <div className="col-sm-12 well">
                    请补充文档信息，完成上传  
                </div>  
                <div className="col-sm-6">
                    <div className="form-group">
                        <label htmlFor="title">标题：</label>
                        <input type="text" className="file-name form-control" id="inputFile" placeholder="文档标题" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="abstract">简介：</label>
                        <textarea type="textarea" className="form-control" id="description" placeholder="文档简介" required />
                    </div>
                    
                    <div className="">
                        学科：
                        <select id="subject" className="form-control" required>
                            {this.state.subjects.map((subject) => {
                                return (
                                    <option value={subject.subjectId} key={subject.subjectId}>{subject.subjectName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br />
                    <div className="">
                        适用对象：
                        <select id="object" className="form-control" required>
                            {this.state.objects.map((object) => {
                                return (
                                    <option value={object.appobjId} key={object.appobjId}>{object.appobjName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <br />
                </div>
                <div className="col-sm-6">
                    <div className="authority">
                        使用权限：
                    {this.state.authorities.map((authority) => {
                        return (
                            <label className="col-sm-12" key={authority.resAuthId}>
                                <input type="radio" name="optionsRadios" value={authority.resAuthId} />
                                {authority.resAuthName}  {authority.description}
                            </label>
                        )
                    })}
                    </div>
                    <input type="submit" value="确认上传" className="btn btn-default upload-button" disabled = {this.state.uploadState} /> 
                    {this.renderWait()}
                        
                </div>
            </form>
        );
    }
}
