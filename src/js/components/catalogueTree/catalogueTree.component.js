import React, {Component} from "react"
import './catalogueTree.style.less'
import $ from "jquery"
import networkAction from "../../utils/networkAction"

export default class CatalogueTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree: {}
        };
        // this.originArr = [
        //     {depName: "工学", depId: "02"},
        //     {depName: "计科", depId: "0201"},
        //     {depName: "软件工程", depId: "020101"},
        //     {depName: "编译原理", depId: "020102"},
        //     {depName: "材料工程", depId: "0202"},
        //     {depName: "材料工程原理", depId: "020201"},
        //     {depName: "有机材料", depId: "020202"},
        //     {depName: "理学", depId: "03"},
        //     {depName: "理学1", depId: "0301"},
        //     {depName: "理学2", depId: "0302"},
        // ]
    }
    componentWillMount() {
        let formatData = this.formatData(this.props.data);
        this.setState({
            tree: formatData
        }, this.props.onChange("0"))
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
     * {
     *      name: '全部单位',
     *      id: '0',
     *      children: [
     *          {
     *              name: '',
     *              id: '',
     *              children: [],
     *          },
     *          {
     *              name: '',
     *              id: '',
     *              children: [
     *                  {
     *                      name: '',
     *                      id: '',
     *                      children: [],
     *                  },
     *                  ...
     *              ],
     *          },
     *          ...
     *      ],
     *  }
     * @param {*} dataArr 
     */
    formatData(dataArr) {
        // console.log("dataArr:", dataArr)
        let destObj = {
            name: '全部单位',
            id: '0',
            children: [],
        };
        dataArr.forEach((cellInfo, index) => {
            if(cellInfo.depId.length === 2)  {
                destObj.children.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            } else if(cellInfo.depId.length === 4) {
                destObj.children[destObj.children.length-1].children.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            } else if(cellInfo.depId.length === 6) {
                destObj.children[destObj.children.length-1].children[destObj.children[destObj.children.length-1].children.length-1].children.push({name: cellInfo.depName, id: cellInfo.depId, children: []})
            }
        })
        return destObj;
    }
    componentDidUpdate(prevProps) {
        // console.log("componentDidUpdate1!!!!!!!!!!!!!!!!!!!!");
        // console.log("li:has(ul)", $('.tree li:has(ul)'));
        if(prevProps.data !== this.props.data) {
            $('.tree li:has(ul)').addClass('parent_li').find(' > span').attr('title', 'Collapse this branch');
            $('.tree li.parent_li > span').on('click', function (e) {
                var children = $(this).parent('li.parent_li').find(' > ul > li');
                if (children.is(":visible")) {
                    // console.log("!!!!!isVisible!!!!!");
                    children.hide('fast');
                    $(this).attr('title', 'Expand this branch').find(' > i').addClass('icon-plus-sign').removeClass('icon-minus-sign');
                } else {
                    // console.log("???????isNotVisible???????");
                    children.show('fast');
                    $(this).attr('title', 'Collapse this branch').find(' > i').addClass('icon-minus-sign').removeClass('icon-plus-sign');
                }
                // e.stopPropagation();
            });
        }
    }
    handleDepartmentChange(event) {
        let departmentId = event.target.dataset.id;
        console.log("departmentId: ", departmentId);
        $('span').removeClass("gray");
        event.target.className = "gray";
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
                    {this.renderTree(this.state.tree)}
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