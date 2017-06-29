import React from 'react';
import ReactEcharts from 'echarts-for-react';

const SimpleChartComponent = React.createClass({
    propTypes: {
    },
    getOtion: function() {
        const option = {
            title: {
                text: '设备上传数量统计'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['传输网','接入网','企业云通信']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['周一','周二','周三','周四','周五','周六','周日']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'传输网',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name:'接入网',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[220, 182, 191, 234, 290, 330, 310]
                },
                {
                    name:'企业云通信',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[150, 232, 201, 154, 190, 330, 410]
                }
            ]
        };
        return option;
    },
    render: function() {
        return (
            <div className='examples'>
                <div className='parent'>
                    <ReactEcharts
                        option={this.getOtion()} 
                        style={{height: '350px', width: '100%'}} 
                        className='react_for_echarts' />
                </div>
            </div>
        );
    }
});

export default SimpleChartComponent;