import UserResourcesMenu from '../myResources/components/userResourcesMenu/userResourcesMenu.component'
import React, {Component} from "react"
import ReactPDF from 'react-pdf'
import './resourceDetail.style.less'

export default class ResourceDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "../../../assets/pdf/sample.pdf",
            pageIndex: null,
            pageNumber: null,
            total: null
        };
        // console.log(styles)
    //this.handleClick = this.handleClick.bind(this);
    }   

    onDocumentLoad({ total }) {
        this.setState({ total });
    }

    onPageLoad({ pageIndex, pageNumber }) {
        this.setState({ pageIndex, pageNumber });
    }

    changePage(by) {
        this.setState(prevState => ({
            pageIndex: prevState.pageIndex + by,
        }));
    }


    render() {
        let { file, pageIndex, pageNumber, total } = this.state;
        return (
        <div className="container">
            <div className="col-sm-9">
                <h1>软工</h1>
                <div>
                    <i className="glyphicon glyphicon-user" />yyf 上传于 2012-12-12 评分(1 人评价) 5分  123123人浏览 123人下载
                </div>
                <div className="well">
                    <div className="pdf-container">
                        <ReactPDF 
                            file={file}
                            onDocumentLoad={this.onDocumentLoad.bind(this)}
                            onPageLoad={this.onPageLoad.bind(this)}
                            pageIndex={pageIndex}/>
                    </div>
                    <div className="page-button">
                        <button
                            className="btn btn-default"
                            disabled={pageNumber <= 1}
                            onClick={() => this.changePage(-1)}
                            >
                            Previous
                        </button>
                        <span>Page {pageNumber || '--'} of {total || '--'}</span>
                        <button
                            className="btn btn-default"
                            disabled={pageNumber >= total}
                            onClick={() => this.changePage(1)}
                            >
                            Next
                        </button>
                        <a href={file} download="sample.pdf">
                            <button className="btn btn-default">下载</button>
                        </a>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">你的评价：</label>
                    <textarea type="textarea" className="form-control" id="exampleInputPassword1" placeholder="说出你的故事" />
                </div>
                <div>
                    用户评价
                    <div className="well">
                        暂无用户评价
                    </div>
                </div>
            </div>
            <div className="col-sm-3">
                <div className="well">           
                    内容简介
                </div>
                <div className="well">           
                    相关资源推荐
                </div>
            </div>
        </div> 
        );
    }
}
