import React, {Component} from "react"

export default class ClassifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subjectId: "",
            objectId: "",
            resourceId: ""
        };
    }
    componentWillReceiveProps(nextProps) {
        // console.log("componentWillReceiveProps subjects: ", nextProps.subjects)        
        if(nextProps.subjects.length > 0 && nextProps.resources.length > 0 && nextProps.objects.length > 0) {
            this.setState({
                subjectId: this.state.subjectId ? this.state.subjectId : nextProps.subjects[0].subjectId,
                objectId: this.state.objectId ? this.state.objectId : nextProps.objects[0].appobjId,
                resourceId: this.state.resourceId ? this.state.resourceId : nextProps.resources[0].restypeId,
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
    resourceChange(event) {
        this.setState({
            resourceId: event.target.value
        })
    }
    handleSubmit(event) {
        let {subjectId, objectId, resourceId} = this.state
        event.preventDefault();
        console.log("handleSubmit: ", subjectId, objectId, resourceId)
        this.props.submitFunc(subjectId, objectId, resourceId);
    }
    
    render() {
        let {subjects, objects, resources, submitFunc} = this.props
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
                        value={this.state.resourceId}
                        onChange={this.resourceChange.bind(this)}>
                        {resources.map((resource) => {
                            return (
                                <option value={resource.restypeId} key={resource.restypeId}>{resource.restypeName}</option>
                            )
                        })}
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