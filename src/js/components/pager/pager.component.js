import React from "react"

export default class Pager extends React.Component {
    clickHandler(e) {
        e.stopPropagation();
        this.props.handleClick(e.target.dataset.page);
    }
    showButton() {
        return(
            <li>
                {/*<div className="btn btn-default">1</div>···
                <div className="btn">2</div>
                <div className="btn">3</div>
                <div className="btn">4</div>
                <div className="btn">5</div>*/}
                {/*{this.props.curPage <= 3}*/}
            </li>
        )
    }
    render() {
        let preClass, nextClass;
        if(this.props.curPage == 1) {
            preClass = 'disabled'
        } else {
            preClass = ''
        }
        if(this.props.curPage == this.props.totalPages) {
            nextClass = 'disabled'
        } else {
            nextClass = ''
        }

        return(
            <ul className="pager">
                <li className={preClass}  onClick={this.clickHandler.bind(this)}>
                    <a href="#" data-page={this.props.curPage-1}>上一页</a>
                </li>
                <li>
                    <span>{this.props.curPage} / {this.props.totalPages}</span>
                </li>
                {/*{this.showButton()}*/}
                <li className={nextClass}  onClick={this.clickHandler.bind(this)}>
                    <a href="#" data-page={this.props.curPage+1}>下一页</a>
                </li>
            </ul>
        )
    }
}

Pager.defaultProps = {
    curPage: 1,
    totalPages: 1,
    showButtonNum: 5,
    handleClick: () => {}
}
Pager.propTypes = {
    curPage: React.PropTypes.number,
    totalPages: React.PropTypes.number,
    handleClick: React.PropTypes.func,
    showButtonNum: React.PropTypes.number
}