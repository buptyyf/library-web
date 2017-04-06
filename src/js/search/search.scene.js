import ResourcesTable from '../components/resourcesTable/resourcesTable.component'
import React, {Component} from "react"

// import './search.style'

export default class SearchScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            words: ['marklar']
        };
    //this.handleClick = this.handleClick.bind(this);
    }
    componentWillMount() {
        console.log(this.props.params)
    }
    render() {
        return (
        <div>
            <h3>搜索结果：</h3>
            <h5 style={{textAlign: 'right'}}>共搜索出30条数据</h5>
            <ResourcesTable />
        </div> 
        );
    }
}
