import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox } from "react-bootstrap";

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
        //console.log(this.refs.searchValue.value);
    }
    handleClick() {
        console.log(this.refs.searchValue.value);
    }
    render(){
        return(
            <div className="row search">
                <div className="col-md-3 col-md-offset-1 row">
                    <FormGroup controlId="formControlsSelect" bsClass="col-md-6 row">
                        适用对象：
                        <FormControl componentClass="select" placeholder="适用对象">
                            <option value="select">大一</option>
                            <option value="other">大二</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect" className="col-md-6 row">
                        <span>学科：</span>
                        <FormControl componentClass="select" placeholder="学科">
                            <option value="select">高数</option>
                            <option value="other">线代</option>
                        </FormControl>
                    </FormGroup>
                </div>
                <div className="col-md-5">
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
