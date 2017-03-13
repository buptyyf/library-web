import SimpleChart from './components/simpleChart.component'
import React, {Component} from "react"

export default class ResourcesStatistics extends React.Component {
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
        <div className="col-sm-12">
            <div className="well col-sm-3">
                分类统计
            </div>
            <div className="col-sm-9">
                <SimpleChart />
            </div>
        </div>
        );
    }
}
