import React, {Component} from "react"

export default class ClassifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.firstResType =  [],
        this.secondResType = {},
        this.state = {
            subjectId: "",
            objectId: "",
            firstResTypeId: "",
            secondResTypeId: "",
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps subjects: ", nextProps.subjects)        
        if(nextProps.subjects.length > 0 && nextProps.resources.length > 0 && nextProps.objects.length > 0) {
            this.setState({
                subjectId: this.state.subjectId ? this.state.subjectId : nextProps.subjects[0].subjectId,
                objectId: this.state.objectId ? this.state.objectId : nextProps.objects[0].appobjId,
                firstResTypeId: this.state.firstResTypeId ? this.state.firstResTypeId : nextProps.resources[0].restypeId,
                secondResTypeId: this.state.secondResTypeId ? this.state.secondResTypeId : "000",
            })
            let resId = "";
            this.firstResType = [];
            nextProps.resources.forEach((res, index) => {
                if(res.restypeId.length === 2) {
                    this.firstResType.push({name: res.restypeName, id: res.restypeId });
                    this.secondResType[res.restypeId] = [];
                    this.secondResType[res.restypeId].push({name: "全部", id: "000"});
                    resId = res.restypeId;
                } else if (res.restypeId.length === 3) {
                    this.secondResType[resId].push({name: res.restypeName, id: res.restypeId});
                }
            })
            console.log("firstResType: ", this.firstResType, "secondResType: ", this.secondResType)
        }

    }
    subjectChange(event) {
        this.setState({
            subjectId: event.target.value
        })
    }
    objectChange(event) {
        this.setState({
            objectId: event.target.value
        })
    }
    firstResTypeChange(event) {
        this.setState({
            firstResTypeId: event.target.value
        })
    }
    secondResTypeChange(event) {
        this.setState({
            secondResTypeId: event.target.value
        })
    }

    handleSubmit(event) {
        let {subjectId, objectId, firstResTypeId, secondResTypeId } = this.state
        event.preventDefault();
        console.log("handleSubmit: ", subjectId, objectId, firstResTypeId, secondResTypeId )
        // if(secondResTypeId === "000"){
        //     this.props.submitFunc(subjectId, objectId, secondResTypeId);
        // }else{
        //     this.props.submitFunc(subjectId, objectId, firstResTypeId);
        // }
        if(secondResTypeId === "000"){
            this.props.submitFunc(subjectId, objectId, firstResTypeId);
        }else{
            this.props.submitFunc(subjectId, objectId, secondResTypeId);
        }
    }
    
    render() {
        let {subjects, objects, resources, submitFunc} = this.props
        console.log("firstResTypeId: ", this.state.firstResTypeId)
        return (
        <div className="well">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="">
                    学科：
                    <select id="subject" 
                        className="form-control" 
                        value={this.state.subjectId} 
                        onChange={this.subjectChange.bind(this)}>
                        {subjects.map((subject, index) => {
                            return (
                                <option value={subject.subjectId} key={subject.subjectId}>{subject.subjectName}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <div className="">
                    适用对象：
                    <select id="object" 
                        className="form-control" 
                        value={this.state.objectId}
                        onChange={this.objectChange.bind(this)}>
                        {objects.map((object) => {
                            return (
                                <option value={object.appobjId} key={object.appobjId}>{object.appobjName}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <div className="">
                    资源类型：
                    <select id="resource" 
                        className="form-control" 
                        value={this.state.firstResTypeId}
                        onChange={this.firstResTypeChange.bind(this)}>
                        {this.firstResType.map((resource, index) => {
                            return (
                                <option value={resource.id} key={index}> {resource.name} </option>
                            )
                        })}
                    </select>
                </div>
                <div className="">
                   
                    <select id="resource" 
                        className="form-control" 
                        value={this.state.secondResTypeId}
                        onChange={this.secondResTypeChange.bind(this)}>
                        {this.state.firstResTypeId ? 
                            this.secondResType[this.state.firstResTypeId].map((resource, index) => {
                                return (
                                    <option value={resource.id} key={index}>{resource.name}</option>
                                )
                            }) : 
                            null
                        }
                    </select>
                </div>
                <br />
                <input type="submit" value="查找" className="btn btn-default upload-button" />
            </form>
        </div> 
        );
    }
}

ClassifySelect.propTypes = {
    subjects: React.PropTypes.array.isRequired,  //学科
    resources: React.PropTypes.array.isRequired, //资源类型
    objects: React.PropTypes.array.isRequired,   //适用对象
    submitFunc: React.PropTypes.func.isRequired,
}
ClassifySelect.defaultProps = {
    subjects: [],
    resources: [],
    objects: [],
    submitFunc: () => {}
}