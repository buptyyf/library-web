import React, {Component} from "react"

export default class ClassifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.firstResType =  [],
        this.secondResType = {},

        this.firstSubjectType = [],
        this.secondSubjectType = {},
        this.thirdSubjectType = {},

        this.state = {
            subjectId: "",
            objectId: "",
            firstResTypeId: "",
            secondResTypeId: "",
            //增加三级分类
            firstSubjectId: "",
            secondSubjectId: "",
            thirdSubjectId: "",
        };
    }
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps subjects: ", nextProps.subjects)        
        if(nextProps.subjects.length > 0 && nextProps.resources.length > 0 && nextProps.objects.length > 0) {
            this.setState({
                firstSubjectId: this.state.firstSubjectId ? this.state.firstSubjectId : nextProps.subjects[0].subjectId,
                // secondSubjectId: this.state.secondSubjectId ? this.state.secondSubjectId : "0000",
                // thirdSubjectId: this.state.thirdSubjectId ? this.state.thirdSubjectId : "000000",

                // subjectId: this.state.subjectId ? this.state.subjectId : nextProps.subjects[0].subjectId,
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

            // 三级目录
            this.firstSubjectType = [];
            let preSubjectId = "";
            let secondPreSubjectId = "";
            nextProps.subjects.forEach((subject, index) => {
                // console.log("secondSubjectType:::::", this.secondSubjectType);
                if(subject.subjectId.length === 2) {
                    this.firstSubjectType.push({name: subject.subjectName, id: subject.subjectId });
                    this.secondSubjectType[subject.subjectId] = [];
                    this.secondSubjectType[subject.subjectId].push({name: "全部", id: "0000"});
                    preSubjectId = subject.subjectId;
                } else if (subject.subjectId.length === 4) {
                    // console.log("preSubjectId: ", preSubjectId)
                    this.secondSubjectType[preSubjectId].push({name: subject.subjectName, id: subject.subjectId});
                    this.thirdSubjectType[subject.subjectId] = [];
                    this.thirdSubjectType[subject.subjectId].push({name: "全部", id: "000000"});
                    secondPreSubjectId = subject.subjectId;
                } else if(subject.subjectId.length === 6) {
                    this.thirdSubjectType[secondPreSubjectId].push({name: subject.subjectName, id: subject.subjectId})
                }
            })
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
    firstSubjectTypeChange(event) {
        this.setState({
            firstSubjectId: event.target.value,
            secondSubjectId: "",
            thirdSubjectId: ""
        })
    }
    secondSubjectTypeChange(event) {
        this.setState({
            secondSubjectId: event.target.value,
            thirdSubjectId: ""
        })
    }
    thirdSubjectTypeChange(event) {
        this.setState({
            thirdSubjectId: event.target.value
        })
    }

    handleSubmit(event) {
        let {objectId, firstResTypeId, secondResTypeId, firstSubjectId, secondSubjectId, thirdSubjectId } = this.state
        let subjectId = 0, resTypeId = 0;
        event.preventDefault();

        if(secondResTypeId === "000"){
            resTypeId = firstResTypeId;
        }else{
            resTypeId = secondResTypeId;
        }

        if(secondSubjectId === "") {
            subjectId = firstSubjectId;
        } else if(thirdSubjectId === "") {
            subjectId = secondSubjectId;
        } else {
            subjectId = thirdSubjectId;
        }
        console.log("handleSubmit: ", subjectId, objectId, resTypeId )

        this.props.submitFunc(subjectId, objectId, resTypeId);
    }
    
    render() {
        let {subjects, objects, resources, submitFunc} = this.props
        console.log("firstResTypeId: ", this.state.firstResTypeId)
        console.log("firstSubjectId: ", this.state.firstSubjectId, " secondSubjectId: ",this.state.secondSubjectId);
        console.log(this.firstSubjectType, this.secondSubjectType, this.thirdSubjectType);
        return (
        <div className="well">
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="">
                    设备类别：
                    {/*<select id="subject" 
                        className="form-control" 
                        value={this.state.subjectId} 
                        onChange={this.subjectChange.bind(this)}>
                        {subjects.map((subject, index) => {
                            return (
                                <option value={subject.subjectId} key={subject.subjectId}>{subject.subjectName}</option>
                            )
                        })}
                    </select>*/}
                    <select id="subject1" 
                        className="form-control" 
                        value={this.state.firstSubjectId} 
                        onChange={this.firstSubjectTypeChange.bind(this)}>
                        {this.firstSubjectType.map((subject, index) => {
                            console.log("subject111", subject, subject);
                            return (
                                <option value={subject.id} key={subject.id}>{subject.name}</option>
                            )
                        })}
                    </select>
                    <select id="subject2" 
                        className="form-control" 
                        value={this.state.secondSubjectId} 
                        onChange={this.secondSubjectTypeChange.bind(this)}>
                        {this.state.firstSubjectId ? this.secondSubjectType[this.state.firstSubjectId].map((subject, index) => {
                            console.log("subject222", subject);
                            return (
                                <option value={subject.id} key={subject.id}>{subject.name}</option>
                            )
                        }) : null}
                    </select>
                    <select id="subject3" 
                        className="form-control" 
                        value={this.state.thirdSubjectId || "全部"} 
                        onChange={this.thirdSubjectTypeChange.bind(this)}>
                        {this.state.secondSubjectId ? this.thirdSubjectType[this.state.secondSubjectId].map((subject, index) => {
                            console.log("subject333", subject);
                            return (
                                <option value={subject.id} key={subject.id}>{subject.name}</option>
                            )
                        }) : <option value={"全部"}>全部</option>}
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