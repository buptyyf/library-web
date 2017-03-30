import React, {Component} from "react"
import './departmentTree.style.less'
import $ from "jquery"

export default class classifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar'],
            tree:[
                {
                    name: "网研院",
                    uri: "wangyan",
                    children: [
                        {
                            name: "网管中心",
                            uri: "wangguan",
                            children: [
                                {
                                    name: "李老师组",
                                    uri: "lilaoshi"
                                },
                                {
                                    name: "王老师组",
                                    uri: "lilaoshi"
                                },
                            ]
                        },
                        {
                            name: "交换中心",
                            uri: "jiaohuan"
                        }
                    ]
                },
                {
                    name: "计算机院",
                    uri: "computer",
                    children: [
                        {
                            name: "一组",
                            uri: "No1"
                        },
                        {
                            name: "二组",
                            uri: "No2"
                        },
                        {
                            name: "三组",
                            uri: "No3"
                        },
                    ]
                }
            ]
        };
    //this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
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
    renderTree(tree) {
        if(tree.children && tree.children.length !== 0) {
            return (
                <li>
                    <span><i className="glyphicon glyphicon-folder-open"></i> {tree.name}</span>
                    <ul>
                        {
                            tree.children.map((branch, index) => {
                                return this.renderTree(branch)
                            })
                        }
                    </ul>
                </li>
            )
        } else { // 叶子节点
            return (
                <li>
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
                    this.state.tree.map((cell) => {
                        return this.renderTree(cell)
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
