// import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import './meeting.style.less'
import $ from 'jquery'
import {Modal, Button} from "react-bootstrap"
import networkAction from '../utils/networkAction'
import {weekToDate, dateToWeek,weekToDay} from '../utils/utilFunctions'
import {CookieUtil} from '../utils/cookieUtil'

export default class MeetingScene extends React.Component {
    constructor(props) {
        super(props);
        // console.log("Meeting userId: ", props.userId);
        this.userId = sessionStorage.getItem('userId');
        this.isGuest = this.userId === 'guest' || !this.userId
        this.state = {
            showReserveModal: false,
            showCancelModal: false,
            roomInfo: [],
            weekId: "0",
            roomId: "",
            cellInfos: [],
            clickInfo: {
                time: [],
                cellIndex: [],
                comment: "",
            },
        };
    }

    formatArr() {
        let allCells = [];
        for(let i=0; i<7; i++){
            allCells[i] = [ {time: '08:00-09:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},  //isReserve为0表示未预定，为1表示已预订
                            {time: '09:00-10:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '10:00-11:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '11:00-12:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '14:00-15:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '15:00-16:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '16:00-17:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '17:00-18:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            //{time: '18:00-19:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '19:00-20:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '20:00-21:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                            {time: '21:00-22:00', userName:"", userId: "", isReserve: 0, reserveId: "", info: ""},
                          ]
        }
        this.setState({
            cellInfos: allCells,
        })
    }
    
    componentWillMount(){
        this.formatArr(); 
        const roomInfoResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/meetingRoom/getMeetinRoomInfo`, method: 'POST'})
        roomInfoResult.then((res) => {
            console.log("meetinRoomInfo: ", res);
            if(res.code === 0) {
                this.setState({
                    roomInfo: res.data.meetingrooms,
                    roomId: res.data.meetingrooms[0].roomId,
                }, this.getReservationInfo.bind(this))
            }
        })   
    }

    //*********得到day和hours对应的cell的索引
    dateToArrIndex(day, hours){  
        let time = [8,9,10,11,14,15,16,17,19,20,21];
        let index = [];
        for(let i = 0; i <= time.length; i++){
            if( hours == time[i] ){
                index = [ day-1, i ];
            }
        }
        return index;
    }
    getReservationInfo(){
        this.formatArr();
        let roomId = this.state.roomId;
        let weekId = this.state.weekId;
        //let time = [8,9,10,11,14,15,16,17];
        
        const reservationInfoResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/meetingRoom/ShowReservationInfo`, method: 'POST'},{weekId: weekId, roomId: roomId})
        reservationInfoResult.then((res) => {
            console.log("reservationInfo: ", res);
            let cellInfos = this.state.cellInfos;
            res.data.record.map((reservation, index) => {
                let reserveTime = dateToWeek(reservation.date); // reserveTime为形式为[day，hours]，day为1-7表示周一到周日
                console.log("reserveTime: ", reserveTime);
               
                let day = reserveTime[0];
                let hours = reserveTime[1];
                //let index = dateToArrIndex(reserveTime[0],reserveTime[1]);
                let cellIndex = this.dateToArrIndex(day, hours);
                console.log("cellIndex: ", cellIndex);
                let i = cellIndex[0], j = cellIndex[1];
                cellInfos[i][j].userName = reservation.userName;
                cellInfos[i][j].info =  reservation.comment;
                cellInfos[i][j].userId =  reservation.userId;
                cellInfos[i][j].isReserve =  1;
                cellInfos[i][j].reserveId =  reservation.bookingId;
                this.setState({
                    cellInfos: cellInfos,
                })
        
            })
            
        })
    }

    componentDidMount() {
        
    }
    closeReserveModal() {
        this.setState({
            showReserveModal: false
        })
    }
    closeCancelModal() {
        this.setState({
            showCancelModal: false
        })
    }
    handleCancelCancel(event){
        this.setState({
            showCancelModal: false,
        })
    }
    handleReserveCancel() {
        this.setState({
            clickInfo: Object.assign({}, this.state.clickInfo, {comment: "" })
        })
    }
    // comfirmModal() {
    //     this.setState({
    //         showReserveModal: false,
    //     })
    //     let textNode = document.createTextNode('已预订');
    //     console.log(this.state.clickInfo, textNode)
    //     this.state.clickInfo.appendChild(textNode)
    // }
    showReserveModal() {
        console.log("showReserveModal!!")
        return (
            <Modal show={this.state.showReserveModal} onHide={this.closeReserveModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>请填写预定信息：</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleReserveSummit.bind(this)}>
                        备注：<input type="text" className="form-control"
                               value={this.state.clickInfo.comment} 
                               onChange={this.clickCommentChange.bind(this)} />
                        <br/>
                        <input type="submit" className="btn btn-default info-submit" value="预定" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.handleReserveCancel.bind(this)} value="重置" /> 
                    </form>
                </Modal.Body>
            </Modal>
        )
        // document.getElementById("meeting").appendChild(modal)
    }
    showCancelModal(){
        console.log("showCancelModal!!");
        return (
            <Modal show={this.state.showCancelModal} onHide={this.closeCancelModal.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>是否要取消预定？</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleCancelSummit.bind(this)}>
                        <br/>
                        <input type="submit" className="btn btn-default info-submit" value="是" /> 
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                        <input type="button" className="btn btn-default reset" onClick={this.handleCancelCancel.bind(this)} value="否" /> 
                    </form>
                </Modal.Body>
            </Modal>
        )
    }

    // handleSummit(event){
    //     event.preventDefault();
    //     //this.formatArr();
    //     this.getReservationInfo();
    // }
    handleReserveSummit(event){
        event.preventDefault();
        let {weekId, roomId} = this.state;
        let day = this.state.clickInfo.time[0];
        let hours = this.state.clickInfo.time[1];
        console.log("week, day, hours", weekId, day, hours);
        let time = weekToDate(weekId, day, hours);
         console.log("?????????time:",time);
        let temp = dateToWeek(time);
        console.log("?????????temp:",temp);
        let comment = this.state.clickInfo.comment;
        const reserveResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/meetingRoom/book`, method: 'POST'},{roomId: roomId, time: time, comment: comment})
        reserveResult.then((res) => {
             console.log("!!!!!!!reserveResult:",res);
             this.setState({
                showReserveModal: false,  
                clickInfo: Object.assign({}, this.state.clickInfo, {comment: "" })
            },this.getReservationInfo.bind(this))
        })
    }
    handleCancelSummit(event){
        event.preventDefault();
        let cellIndex = this.state.clickInfo.cellIndex;
        console.log("?????????cellIndex:",cellIndex);
        let i = cellIndex[0] , j = cellIndex[1];
        let reserveId = this.state.cellInfos[i][j].reserveId;
        console.log("!!!!!!!reserveId: ", reserveId);
        const cancelResult = networkAction.promiseNetwork({url: `TeachingResourceManagement/meetingRoom/cancel`, method: 'POST'},{bookingId: reserveId, })
        cancelResult.then((res) =>{
            console.log("!!!!!!!cancelResult:",res);
            this.setState({
                showCancelModal: false,   
            },this.getReservationInfo.bind(this))
        })
    }

    handleCellClick(event) {  
        if(this.isGuest) return;
        let day = event.target.dataset.day;
        let hours = event.target.dataset.time.substring(0,2);
        let time = [day, hours];  // day为1-7，表示周一到周日
        console.log("!!!!!!!day,hours: ",day, hours);
        let cellIndex = this.dateToArrIndex(day, hours);
        console.log("!!!!!!!cellIndex: ", cellIndex);
        let i = cellIndex[0] , j = cellIndex[1];
        console.log("cellInfos[i][j].isReserve: ", this.state.cellInfos[i][j].isReserve);

        if(this.state.cellInfos[i][j].isReserve == 0){
            this.setState({
            clickInfo: Object.assign({}, this.state.clickInfo, {time: time, cellIndex: cellIndex}),
            showReserveModal: true,   
            })
        }
        else{
            // let userId = this.props.userId;
            console.log("!!!!!!!userId: ", this.userId);
            let clickUserId = this.state.cellInfos[i][j].userId;
            console.log("!!!!!!!clickUserId: ", clickUserId);
            if(this.userId == this.state.cellInfos[i][j].userId){
                this.setState({
                    clickInfo: Object.assign({}, this.state.clickInfo, {time: time, cellIndex: cellIndex}),
                    //clickInfo: Object.assign({}, this.state.clickInfo, {cellIndex: cellIndex}),
                    showCancelModal: true,
                })
            } 
        }  
    }
    clickCommentChange(event){
        this.setState({
            clickInfo: Object.assign({}, this.state.clickInfo, {comment: event.target.value})
        })
    }
    handleWeekChange(event) {
        this.setState({
            weekId: event.target.value
        },this.getReservationInfo.bind(this));
        
    }
    handleRoomChange(event) {
        this.setState({
            roomId: event.target.value
        },this.getReservationInfo.bind(this));
        
    }


    renderCell() {
        let days = ['一','二','三','四','五','六','日'];
        let weekId = this.state.weekId;
        let cols = days.map((day, dayIndex) => {
            let weekDay = dayIndex + 1 ;
            let cells = this.state.cellInfos[dayIndex].map((cellInfo, timeIndex) => {
                //let tempInfo = dayIndex + 1 + "|" + cellInfo.time
                let nowDate = new Date;
                let day = dayIndex + 1 ;
                let time = cellInfo.time;
                //let date = weekToDay(weekId, day);
                return (
                    <div key={timeIndex} 
                        
                        className={this.state.cellInfos[dayIndex][timeIndex].userId === "" ? "cell_body" : this.state.cellInfos[dayIndex][timeIndex].userId === this.userId ? "cell_body reserve-myself" : "cell_body others-reserve"}
                        onClick={this.handleCellClick.bind(this)} 
                        data-day={day} data-time={time} >
                        <div className="one-cell" data-day={day} data-time={time}>{cellInfo.userName}</div>
                        <div data-day={day} data-time={time}>{cellInfo.info}</div>
                    </div>
                )
            })
            return (
                <div className="col-one" key={dayIndex}>
                    <div className="cell_head">
                        <div className="week-day">周{day}</div>
                        <div>{weekToDay(weekId, weekDay)}</div>
                    </div>
                    {cells}
                </div>
            )
        })
        return cols
    }
    renderTime() {
        console.log("cellInfos[0]: ", this.state.cellInfos[0]);
        let times = this.state.cellInfos[0].map((cellInfo, index) => {
            return <div className="cell_body " key={index}>
                        <p className="cell-time">{cellInfo.time}</p>
                   </div>
        })
        return (
            <div className="col-one">
                <div className="cell_head">
                    <p className="cell-head-text">时间</p>
                </div>
                {times}
            </div>
        )
    }

    render() {
        return (
            <div className="container col-sm-12">
                <div className="meeting-top ">
                    <div className="title ">
                        <h2>实训室预定</h2>
                    </div>
                    <div className="select ">
                    <form >
                        <div className="select-week-room">
                            <div className="select-text">本周/下周：</div>
                            <div className="select-frame">
                                <select className="form-control"  value={this.state.weekId} onChange={this.handleWeekChange.bind(this)}>
                                    <option value="0">本周</option>
                                    <option value="1">下周</option>
                                </select> 
                            </div>
                        </div>
                        <div className="select-week-room">
                            <div className="select-text">会议室：</div>
                            <div className="select-frame">
                                <select className="form-control"  value={this.state.roomId} onChange={this.handleRoomChange.bind(this)}>
                                    {this.state.roomInfo.map((room, index) => {
                                        return (
                                            <option value={room.roomId} key={room.roomId}>{room.roomName}</option>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        
                    </form>
                    </div>
                </div>
                <div className="calendar col-sm-12">
                    {this.renderTime()}
                    {this.renderCell()}
                    {this.showReserveModal()}
                    {this.showCancelModal()}
                </div>   
           </div>
        );
    }
}
