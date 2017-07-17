import { TreeSelect } from "antd";
import React from "react"

// const treeData = [{
//   label: 'Node1',
//   value: '0-0',
//   key: '0-0',
//   children: [{
//     label: 'Child Node1',
//     value: '0-0-1',
//     key: '0-0-1',
//   }, {
//     label: 'Child Node2',
//     value: '0-0-2',
//     key: '0-0-2',
//   }],
// }, {
//   label: 'Node2',
//   value: '0-1',
//   key: '0-1',
// }];

export default class SelectTree extends React.Component {
    constructor(props) {
        super(props);
        // console.log("props.defaultValue: ", props.defaultValue)
        this.state = {
            value: props.value || "0",
            treeData: []
        }
    }
    componentWillMount() {
        console.log("this.props.needTop: ", this.props.needTop)
        let formatData = this.formatData(this.props.data);
        if(this.props.needTop) {
            formatData = this.formatDataNeedTop(this.props.data);
            this.props.onChange(this.state.value)
        }
        
        this.setState({
            treeData: formatData
        })
        
    }
    componentWillReceiveProps(nextProps) {
        console.log("CatalogueTree DATA: ", nextProps.data)
        let formatData = this.formatData(nextProps.data);
        
        if(this.props.needTop) {
            formatData = this.formatDataNeedTop(nextProps.data);
        }
        console.log("formatData: ", formatData)
        this.setState({
            treeData: formatData,
            value: nextProps.value || this.state.value
        })
    }
    onChange(value) {
        // console.log(arguments);
        this.setState({ value }, this.props.onChange.bind(this, value));
    }
    // 不需要全部单位的情况
    formatData(dataArr) {
        let destArr = [];
        dataArr.forEach((cellInfo, index) => {
            let obj = {
                label: cellInfo.depName || cellInfo.subjectName || cellInfo.restypeName || cellInfo.appobjName, 
                value: cellInfo.depId || cellInfo.subjectId || cellInfo.restypeId || cellInfo.appobjId, 
                key: cellInfo.depId || cellInfo.subjectId || cellInfo.restypeId || cellInfo.appobjId, 
                children: []
            }
            let len = obj.value.length;
            if(len === 2)  {
                destArr.push(obj)
            } else if(len === 4 || len === 3) {
                destArr[destArr.length-1].children.push(obj)
            } else if(len === 6) {
                destArr[destArr.length-1].children[destArr[destArr.length-1].children.length-1].children.push(obj)
            }
        })
        return destArr;
    }
    // 需要最外边加全部单位的情况
    formatDataNeedTop(dataArr) {
        let destObj = {
            label: '全部单位',
            value: "0",
            key: "0",
            children: []
        }
        dataArr.forEach((cellInfo, index) => {
            let obj = {
                label: cellInfo.depName, 
                value: cellInfo.depId, 
                key: cellInfo.depId, 
                children: []
            }
            if(cellInfo.depId.length === 2)  {
                destObj.children.push(obj)
            } else if(cellInfo.depId.length === 4) {
                destObj.children[destObj.children.length-1].children.push(obj)
            } else if(cellInfo.depId.length === 6) {
                destObj.children[destObj.children.length-1].children[destObj.children[destObj.children.length-1].children.length-1].children.push(obj)
            }
        })
        return [destObj];
    }
    render() {
        let {width, maxHeight, placeholder, size} = this.props;
        let {value, treeData} = this.state
        return (
            <TreeSelect
                size={size}
                style={{ width: width }}
                value={value}
                dropdownStyle={{ maxHeight: maxHeight, overflow: 'auto' }}
                treeData={treeData}
                placeholder={placeholder}
                treeDefaultExpandAll
                onChange={this.onChange.bind(this)}
            />
        );
    }
}

SelectTree.propsType = {
    width: React.PropTypes.number,
    maxHeight: React.PropTypes.number,
    data: React.PropTypes.array,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    needTop: React.PropTypes.bool,
    value: React.PropTypes.string,
}

SelectTree.defaultProps = {
    width: 300,
    maxHeight: 600,
    data: [],
    onChange: () => {},
    placeholder: "请选择科室",
    needTop: true, // 是否需要给数据最外层包个全部单位
    size: "default"
}