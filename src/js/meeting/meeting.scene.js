// import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import './meeting.style.less'
import $ from 'jquery'
import {Modal, Button} from "react-bootstrap"

export default class MeetingScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
        this.clickInfo = ""
        this.cellInfos = [
            {time: '8:00-9:00', info: ""},
            {time: '9:00-10:00', info: ""},
            {time: '10:00-11:00', info: ""},
            {time: '11:00-12:00', info: ""},
            {time: '14:00-15:00', info: ""},
            {time: '15:00-16:00', info: ""},
            {time: '16:00-17:00', info: ""},
            {time: '17:00-18:00', info: ""},
        ];
    //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        
    }
    closeModal() {
        this.setState({
            showModal: false
        })
    }
    comfirmModal() {
        this.setState({
            showModal: false,
        })
        let textNode = document.createTextNode('已预订');
        console.log(this.clickInfo, textNode)
        this.clickInfo.appendChild(textNode)
    }
    showModal() {
        console.log("showModal!!")
        return (
            <Modal show={this.state.showModal} onHide={this.closeModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>是否预定</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.comfirmModal.bind(this)}>确定</Button>                    
                    <Button onClick={this.closeModal.bind(this)}>取消</Button>
                </Modal.Footer>
            </Modal>
        )
        // document.getElementById("meeting").appendChild(modal)
    }
    handleCellClick(event) {
        console.log(event.target, this)
        this.setState({showModal: true})
        this.clickInfo = event.target
    }
    renderCell() {
        let days = ['一','二','三','四','五','六','日'];
        let cols = days.map((day, dayIndex) => {
            let cells = this.cellInfos.map((cellInfo, timeIndex) => {
                let tempInfo = dayIndex + 1 + "|" + cellInfo.time
                return (
                    <div key={timeIndex} 
                        className="cell_body" 
                        onClick={this.handleCellClick.bind(this)} 
                        data-dateTime={tempInfo} >
                        <p>{cellInfo.info}</p>
                    </div>
                )
            })
            return (
                <div className="col-one" key={dayIndex}>
                    <div className="cell_head">周{day}</div>
                    {cells}
                </div>
            )
        })
        return cols
    }
    renderTime() {
        let times = this.cellInfos.map((cellInfo, index) => {
            return <div className="cell_body" key={index}>{cellInfo.time}</div>
        })
        return (
            <div className="col-one">
                <div className="cell_head">时间</div>
                {times}
            </div>
        )
    }

    render() {
        return (
        <div id="meeting">
            <h1>会议室预定</h1>
            <div className="calendar">
                {this.renderTime()}
                {this.renderCell()}
                {this.showModal()}
            </div>
        </div> 
        );
    }
}
