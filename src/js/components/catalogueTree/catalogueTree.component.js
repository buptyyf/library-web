import React, {Component} from "react"
import './catalogueTree.style.less'
import $ from "jquery"
import networkAction from "../../utils/networkAction"

export default class CatalogueTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            tree: []
        };
    //this.handleClick = this.handleClick.bind(this);
        // this.originArr = [
        //     {name: "工学", id: "02"},
        //     {name: "计科", id: "0201"},
        //     {name: "软件工程", id: "020101"},
        //     {name: "编译原理", id: "020102"},
        //     {name: "材料工程", id: "0202"},
        //     {name: "材料工程原理", id: "020201"},
        //     {name: "有机材料", id: "020202"},
        //     {name: "理学", id: "03"},
        // ]
        // let destArr = []
        // this.originArr.forEach((cellInfo, index) => {
        //     if(cellInfo.id.length === 2)  {
        //         destArr.push({name: cellInfo.name, id: cellInfo.id, children: []})
        //     } else if(cellInfo.id.length === 4) {
        //         destArr[destArr.length-1].children.push({name: cellInfo.name, id: cellInfo.id, children: []})
        //     } else if(cellInfo.id.length === 6) {
        //         destArr[destArr.length-1].children[destArr[destArr.length-1].children.length-1].children.push({name: cellInfo.name, id: cellInfo.id, children: []})
        //     }
        // })
    }
    componentWillMount() {
        // const result = networkAction.promiseNetwork({url: `TeachingResourceManagement/teachingResource/departmentBrowsing`, method: 'POST'})
        // result.then((res) => {
        //     let formatData = this.formatData(res.data.departmentInfo);
        //     this.setState({
        //         tree: formatData
        //     })
        // })
        let formatData = this.formatData(this.props.data);
        this.setState({
            tree: formatData
        })
    }
    componentWillReceiveProps(nextProps) {
        console.log("CatalogueTree DATA: ", nextProps.data)
        let formatData = this.formatData(nextProps.data);
        this.setState({
            tree: formatData
        })
    }
    /**
     * 把从服务端返回的一维数组改造成目录树所需要的结构，如下所示
     * [{
     *      name: '',
     *      id: '',
     *      children: [],
     *  },{
     *      name: '',
     *      id: '',
     *      children: [
     *          {
     *              name: '',
     *              id: '',
     *              children: '',
     *          }
     *      ],
     *  }...
     * ]
     * @param {*} dataArr 
     */
    formatData(dataArr) {
        console.log("dataArr:", dataArr)
        let destArr = [];
        dataArr.forEach((cellInfo, index) => {
            if(cellInfo.depId.length === 2)  {
                destArr.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            } else if(cellInfo.depId.length === 4) {
                destArr[destArr.length-1].children.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            } else if(cellInfo.depId.length === 6) {
                destArr[destArr.length-1].children[destArr[destArr.length-1].children.length-1].children.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            }
        })
        return destArr;
    }
    componentDidUpdate() {
        console.log("li:has(ul)", $('.tree li:has(ul)'))
        $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
        $('.tree li.parent_li > span').on('click', function (e) {
            var children = $(this).parent('li.parent_li').find(' > ul > li');
            if (children.is(":visible")) {
                children.hide('fast');
                $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
            } else {
                children.show('fast');
                $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
            }
            e.stopPropagation();
        });
    }
    handleDepartmentChange(event) {
        let departmentId = event.target.dataset.id;
        this.props.onChange(departmentId);
    }
    renderTree(tree, index) {
        if(tree.children && tree.children.length !== 0) {
            return (
                <li key={index}>
                    <span data-id={tree.id} onClick={this.handleDepartmentChange.bind(this)}>
                        <i className="glyphicon glyphicon-folder-open"></i> {tree.name}
                    </span>
                    <ul>
                        {
                            tree.children.map((branch, index) => {
                                return this.renderTree(branch, index)
                            })
                        }
                    </ul>
                </li>
            )
        } else { // 叶子节点
            return (
                <li key={index}>
                    <span data-id={tree.id} onClick={this.handleDepartmentChange.bind(this)}>
                        <i className="glyphicon glyphicon-leaf"></i> 
                        {tree.name}
                    </span>
                </li>
            )
        }
    }
    render() {
        return (
            <div className="tree well">
                <ul style={{padding: 0}}>
                    {
                        this.state.tree.map((cell, index) => {
                            return this.renderTree(cell, index)
                        })
                    }
                </ul>
            </div>
        );
    }
}

CatalogueTree.propsType = {
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
}

CatalogueTree.defaultProps = {
    data: [],
    onChange: () => {},
}