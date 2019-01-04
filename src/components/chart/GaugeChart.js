import React from "react";
import Chart from "react-google-charts";

class GaugeChart extends React.Component {
    constructor(props){
        super(props)
        this.state={
            memory: this.props.valueMax,
            intervalID: null,
        }
    }
    componentWillMount(component){
        if (this.state.intervalID !== null) {
            clearInterval(this.state.intervalID)
          }
    }
    componentDidMount(){
        const intervalID = setInterval(() => {
            this.setState({
              memory: Math.random() * 100,
              intervalID,
            })
          }, 1000)
    }
  render() {
    return (
      <div style={{display:"flex", justifyContent:"center"}}>
        <Chart
        style={{display:"flex", justifyContent:"center", width:"100%"}}
        // width={250}
        // height={210}
        chartType="Gauge"
        loader={<div>Loading Chart</div>}
        data={[
          ['Label', 'Value'],
          ['Nhiệt độ', Number(this.props.valueChart)]
    
        ]}
        options={{
          redFrom: 90,
          redTo: 100,
          yellowFrom: 75,
          yellowTo: 90,
          minorTicks: 5,
        }}
        rootProps={{ 'data-testid': '1' }}
      />
      </div>
      
    );
    
  }
  
}
export default GaugeChart;
