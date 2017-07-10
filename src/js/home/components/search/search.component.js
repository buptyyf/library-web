import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox } from "react-bootstrap";
import {browserHistory} from 'react-router'
import networkAction from '../../../utils/networkAction'
import "./search.style.less"

export default class Search extends Component {

    constructor(props) {
        super(props);
        this.allResType = [],
        this.firstResType = [],
        this.state = {
            resType : [],
            selectedResId: [], //记录每个checked的资源类型id
            checked: [],  //记录每个checkbox是否checked
            keywords: "",
            //resTypeId: "",
        };
    }

    // <Form horizontal>
    //     <FormGroup controlId="formHorizontalEmail">
    //       <Col componentclassName={ControlLabel} sm={2}>
    //         search
    //       </Col>
    //       <Col sm={10}>
    //         <FormControl type="email" placeholder="Email" />
    //       </Col>
    //     </FormGroup>
    // </Form>
    // constructor(props) {
    //     super(props);
    //     this.handleClick = this.handleClick.bind(this);
    // }
    componentWillMount(){
        const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/classfiedBrowsingAll`, method: 'POST'})
        result.then((res) => {
            this.allResType = res.data.resourceType;
            let checked = [];
            this.allResType.forEach((res, index) =>{
                if(res.restypeId.length === 2){
                    this.firstResType.push({name: res.restypeName, id: res.restypeId });
                    checked.push(false);
                }
            })
            console.log("firstResType: ", this.firstResType);

            this.setState({
                resType: this.firstResType,
                checked: checked
            })

        })
    }
    changeChecked(position, event) {
        //let checked = this.state.value;
        //let selectedResId = this.state.selectedResId;
        let checked = this.state.checked;
        let changedChecked = event.target.checked; 
        
        //console.log("checked:",checked);
        //console.log("checked index: ", event.target, position);
        //console.log("changedChecked:",changedChecked);
        // event.target.value
        checked[position] = changedChecked;
        
        console.log("checked:",checked);
        this.setState({
            checked: checked
        })

    }
    showResType(){
        let resType = this.state.resType;
        console.log("!!!!!!!!!!!!!!!resType: ", resType);
        return(
            <div className="checkbox">
            {resType.map((item, index) => { 
                 return (
                    <div className="resType" key = {index}>
                        <input type="checkbox" value={item.id} checked={this.state.checked[index]} key={index} onChange={this.changeChecked.bind(this, index)}/> {item.name}
                    </div>
                 )
            })}
            </div>
        )
    }

    componentDidMount() {
        console.log(this.props);
    }
    handleClick() {
        let keywords = this.refs.searchValue.value;
        let selectedResId = [];
        this.state.checked.forEach((item, index) => {
            if(item) {
                selectedResId.push(this.firstResType[index].id)
            }
        })
        console.log("keywords:", keywords);
        console.log("selectedResId:", selectedResId);
        if(keywords !== "") {
            browserHistory.push(`/TeachingResourceManagement/search/${keywords}/${selectedResId}`)
        }
    }

    render(){
        return(
            <div className="search col-sm-12">
                {/*<div className="col-sm-3 col-sm-offset-1">
                    <FormGroup controlId="formControlsSelect" bsClass="col-sm-6">
                        适用对象：
                        <FormControl componentClass="select" placeholder="适用对象">
                            <option value="select">大一</option>
                            <option value="other">大二</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect" className="col-sm-6">
                        <span>学科：</span>
                        <FormControl componentClass="select" placeholder="学科">
                            <option value="select">高数</option>
                            <option value="other">线代</option>
                        </FormControl>
                    </FormGroup>
                </div>*/}
                <div className="col-sm-3 col-sm-offset-1 left-logo">
                    <img src="/assets/img/BITClogo.png" />
                </div>
                <div className=" col-sm-5">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="searchValue" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.handleClick.bind(this)}>搜索资源</button>
                        </span>
                    </div>
                    {this.showResType()}
                </div>
                <div className="col-sm-2  right-logo">
                    <img src="/assets/img/jingeLOGO.png" />
                </div>
            </div>
        );
    }
}
