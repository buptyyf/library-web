import React, {Component} from "react";
import ReactDOM from "react-dom";
import {Form, FormGroup, FormControl, Col, Button, ControlLabel, Checkbox } from "react-bootstrap";

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
            <div className="row">
                <div className="col-lg-8 col-md-offset-2">
                    <div className="input-group">
                        <input type="text" className="form-control" ref="searchValue" />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button" onClick={this.handleClick.bind(this)}>search!</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
