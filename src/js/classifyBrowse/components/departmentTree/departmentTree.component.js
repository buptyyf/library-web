import React, {Component} from "react"
import './departmentTree.style.less'
import $ from "jquery"

export default class classifySelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
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
    render() {
        return (
        <div className="tree well">
            <ul style={{padding: 0}}>
            <li>
            <span><i className="glyphicon glyphicon-folder-open"></i> Parent</span> <a href="">Goes somewhere</a>
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
            </li>
            </ul>
            </div>
        );
    }
}