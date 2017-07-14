import ResourcesTable from '../components/resourcesTable/resourcesTable.component'
//import Search from '../../home/components/search/search.component'
import React, {Component} from "react"
import networkAction from '../utils/networkAction'
import "./search.style.less"

export default class SearchScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            keywords: "",
            resIdList: [],
            //resourceTypeId: "01",
            sort: "downloads",
            pageInfo: {     
                curPage: 1,
                totalPages: 1
            },
            totalResourceNum: 0
        };
    }
    componentWillMount() {
        console.log("resIdList: ",this.props.params.resIdList)
        this.setState({
            keywords: this.props.params.keywords,
            resIdList: this.props.params.resIdList.split(","),
        },this.searchNetwork.bind(this));
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            keywords: nextProps.params.keywords,
            resIdList: nextProps.params.resIdList.split(","),

        },this.searchNetwork.bind(this));
    }

    searchNetwork() {
        let {sort, resIdList, keywords} = this.state;
        let page = this.state.pageInfo.curPage;
        console.log("!!!!!keywords: ", keywords);
        const result = networkAction.promiseNetwork({
            url: `TeachingResourceManagement/teachingResource/search`,
            method: 'POST'
        }, {
            sort: sort,
            page: Number(page) > 0 ? Number(page) : 1,
            resourceTypeId: resIdList,
            keywords: keywords
        })
        result.then((res) => {
            console.log("search-result: ", res)
            let newPageInfo = {
                curPage: res.data.currentPageNo,
                totalPages: res.data.totalPage
            }
            this.setState({
                tableData: res.data.resourceList,
                pageInfo: newPageInfo,
                totalResourceNum: res.data.resultCount
            })
        })
    }

    handleSortChange(event) {
        this.setState({
            sort: event.target.value
        }, this.searchNetwork.bind(this));
    }
    handlePageChange(page) {
        this.setState({
            pageInfo: Object.assign({}, this.state.pageInfo, {curPage: page})
        }, this.searchNetwork.bind(this))
    }

    render() {
        let {tableData, pageInfo, totalResourceNum} = this.state;
        return (
        <div className="container">
            <h3>搜索结果：</h3>
            <div className="sort-number">
                <div className="sort">
                    排序方式：
                    <select value={this.state.sort} onChange={this.handleSortChange.bind(this)}>
                        <option value="downloads">下载量</option>
                        <option value="score">评分</option>
                        <option value="time">上传时间</option>
                    </select>
                </div>
                <div className="result-number">
                    共搜索出 {totalResourceNum} 条资源
                </div>
           </div>
           <ResourcesTable data={tableData} pageInfo={pageInfo} handlePageChange={this.handlePageChange.bind(this)}/>
        </div> 
        );
    }
}
