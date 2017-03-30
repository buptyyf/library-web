import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox } from "react-bootstrap";
import {browserHistory} from 'react-router'

import "./search.style.less"

export default class Search extends Component {
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
    componentDidMount() {
        console.log(this.props);
    }
    handleClick() {
        let keywords = this.refs.searchValue.value
        console.log(keywords);
        if(keywords !== "") {
            browserHistory.push(`/search/${keywords}`)
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
                <div className="col-sm-offset-3 col-sm-6">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="searchValue" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.handleClick.bind(this)}>搜索资源</button>
                        </span>
                    </div>
                    <FormGroup>
                        <Checkbox inline>
                        ppt
                        </Checkbox>
                        {' '}
                        <Checkbox inline>
                        word
                        </Checkbox>
                        {' '}
                        <Checkbox inline>
                        excel
                        </Checkbox>
                    </FormGroup>
                </div>
            </div>
        );
    }
}
