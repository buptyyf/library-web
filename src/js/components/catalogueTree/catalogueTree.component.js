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
        console.log("CatalogueTree DATA: ", this.props.data)
        let formatData = this.formatData(this.props.data);
        this.setState({
            tree: formatData
        })
    }
    componentWillReceiveProps(nextProps) {
        let formatData = this.formatData(nextProps.data);
        this.setState({
            tree: formatData
        })
    }
    formatData(dataArr) {
        console.log("dataArr:", dataArr)
        let destArr = []
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
    renderTree(tree, index) {
        if(tree.children && tree.children.length !== 0) {
            return (
                <li key={index}>
                    <span><i className="glyphicon glyphicon-folder-open"></i> {tree.name}</span>
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
                    <span>
                        <i className="glyphicon glyphicon-leaf"></i> <a className="leaf-name" href="">{tree.name}</a>
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
                {/*<li>
                    <span><i className="glyphicon glyphicon-folder-open"></i> 网研院</span> <a href="">Goes somewhere</a>
                    <ul>
                        <li>
                            <span><i className="glyphicon glyphicon-minus-sign"></i> Child</span> <a href="">Goes somewhere</a>
                            <ul>
                                <li>
                                    <span><i className="glyphicon glyphicon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>
                                </li>
                            </ul>
                        </li>
                        <li>
                        <span><i className="glyphicon glyphicon-minus-sign"></i> Child</span> <a href="">Goes somewhere</a>
                        <ul>
                        <li>
                            <span><i className="glyphicon glyphicon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>
                        </li>
                        <li>
                            <span><i className="glyphicon glyphicon-minus-sign"></i> Grand Child</span> <a href="">Goes somewhere</a>
                        <ul>
                            <li>
                            <span><i className="glyphicon glyphicon-minus-sign"></i> Great Grand Child</span> <a href="">Goes somewhere</a>
                            <ul>
                                <li>
                                <span><i className="glyphicon glyphicon-leaf"></i> Great great Grand Child</span> <a href="">Goes somewhere</a>
                                </li>
                                <li>
                                <span><i className="glyphicon glyphicon-leaf"></i> Great great Grand Child</span> <a href="">Goes somewhere</a>
                                </li>
                                </ul>
                            </li>
                            <li>
                            <span><i className="glyphicon glyphicon-leaf"></i> Great Grand Child</span> <a href="">Goes somewhere</a>
                            </li>
                            <li>
                            <span><i className="glyphicon glyphicon-leaf"></i> Great Grand Child</span> <a href="">Goes somewhere</a>
                            </li>
                        </ul>
                        </li>
                        <li>
                            <span><i className="glyphicon glyphicon-leaf"></i> Grand Child</span> <a href="">Goes somewhere</a>
                        </li>
                        </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <span><i className="glyphicon glyphicon-folder-open"></i> Parent2</span> <a href="">Goes somewhere</a>
                    <ul>
                        <li>
                        <span><i className="glyphicon glyphicon-leaf"></i> Child</span> <a href="">Goes somewhere</a>
                        </li>
                    </ul>
                </li>*/}
            </ul>
            </div>
        );
    }
}

CatalogueTree.propsType = {
    data: React.PropTypes.array
}

CatalogueTree.defaultProps = {
    data: []
}