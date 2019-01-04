import React from "react";
import Chart from "react-google-charts";
class LineChart extends React.Component{
    render(){
        let arr=["--","--"];
        let arrData=[];
        let {listDashBoardHead,arrHistogramOfThing}=this.props;
       
        let data=[];
        let titleData=["Ngày tháng năm / Giờ phút giây",listDashBoardHead.value_name+"(đơn vị:"+listDashBoardHead.unit +")"];
        data.push(titleData);
        if(Object.keys(arrHistogramOfThing).length>0 && arrHistogramOfThing.data.length>0)
        {
          arrHistogramOfThing.data.map(c=>{
            data.push([c.date_time,Number(c.value)]);

          })
         
        }
       else
       {
        data.push(arr);
      }
        console.log("data");
        console.log(data);
        // console.log(arrHistogramOfThing.data);
        return(
        
          <Chart
          width={'auto'}
         style={{minHeight:"350px"}}
          chartType="Bar"
          backgroundColor="pink"
          loader={<div>Loading Chart</div>}
          data={data}
          options={{
            // Material design options
            chart: {
              title: listDashBoardHead.name,
             
            },
          }}
          // For tests
          rootProps={{ 'data-testid': '2' }}
        />
        )
    }
}
export default LineChart
