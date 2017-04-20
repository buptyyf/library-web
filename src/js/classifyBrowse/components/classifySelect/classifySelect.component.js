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
        let {subjects, objects, resources, submitFunc} = this.props
        return (
        <div className="well">
            <form onSubmit={submitFunc.bind(this)}>
                <div className="">
                    学科：
                    <select id="subject" className="form-control">
                        {subjects.map((subject) => {
                            return (
                                <option value={subject.subjectId} key={subject.subjectId}>{subject.subjectName}</option>
                            )
                        })}
                    </select>
                </div>
                <br />
                <div className="">
                    适用对象：
                    <select id="object" className="form-control">
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
                    <select id="resource" className="form-control">
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