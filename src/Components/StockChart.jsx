import { useState } from "react";
import Chart from "react-apexcharts";

export const StockChart = ({chartData, symbol}) =>{
    const {day, week, year} = chartData
    const [dateFormat, setDateFortmat] = useState('24h')
    const options  = {
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "24px",
            },
        chart: {
            id: 'stock data',
            animations: {
                speed: 1300
            }
        },
        xaxix: {
            type:'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        yaxix: {
            type:'datetime',
            labels: {
                datetimeUTC: false
            }
        },
        tooltip: {
            x: {
                format: "MMM dd HH:MM"
            }
        }
        }
    
    }
    const timeFormarter = () =>{
        switch(dateFormat){
            case "24h": return day
            case "7d": return week
            case '1y': return year
            default: return
        }
    }
    const series = [{
        name: symbol,
        data: timeFormarter()
    }]

    const renderButtonSelect = (button) => {
        const classes = "btn m-1 "
        if(button === dateFormat) {
            return classes + "btn-primary"
        }else {
            return classes + "btn-outline-primary"
        }
    }

    return <div className="mt-5 p-4, shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width='100%' />
      <button className={renderButtonSelect("24h")} onClick={()=>setDateFortmat('24h')}>24h </ button>
      <button className={renderButtonSelect("7d")} onClick={()=>setDateFortmat('7d')}>7d </ button>
      <button className={renderButtonSelect("1y")} onClick={()=>setDateFortmat('1y')}> 1y </ button>

    </div>
}