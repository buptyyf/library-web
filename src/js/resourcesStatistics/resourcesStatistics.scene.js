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
        <div className="container">
            <div className="col-sm-12">
                <SimpleChart />
            </div>
        </div>
        );
    }
}
