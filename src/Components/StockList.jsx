import { useState, useEffect, useContext } from "react"
import finnHub from "../APIS/finnHub"
import {BsFillCaretDownFill, BsFillCaretUpFill} from "react-icons/bs"
import { WatchListContext } from "../context/watchListContext"


export const StockList = () => {
    
    const [stock, setStock] = useState()
    const {whatchList} = useContext(WatchListContext)
    const changeColor = (change) => {
        return change > 0 ? 'success': 'danger'
    }
    const renderIcon = (change) => {
        return change > 0 ? <BsFillCaretUpFill />: <BsFillCaretDownFill />
    }
    useEffect( () => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const responses = await Promise.all(whatchList.map((watch)=> {
                return finnHub.get("/quote", {
                    params:{
                        symbol: watch
                    }
                })}
                ))
                const data = responses.map((response) =>{
                   return {data: response.data,
                    symbol: response.config.params.symbol,}
                })
                console.log(data)
               if(isMounted){
                setStock(data)
               }
            }catch(err){
                console.log(err)
            }
        }
        fetchData()

        return () => {isMounted=false}
    }, [whatchList])

    return <div>
        <table className="table hover mt-5">
            <thead style={{color:'rgb(79,89,102'}}>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Last</th>
                    <th scope='col'>Chg</th>
                    <th scope='col'>Chg%</th>
                    <th scope='col'>High</th>
                    <th scope='col'>Low</th>
                    <th scope='col'>Open</th>
                    <th scope='col'>Pclose</th>
                </tr>
            </thead>
            <tbody>
            {stock && stock.map((watchData) => {
    return (
        <tr className="table-row" key={watchData.symbol}>
            <th>{watchData.symbol}</th>
            <td >{watchData.data.c}</td>
            <td className={`text-${changeColor(watchData.data.d)}`}>{watchData.data.d}{renderIcon(watchData.data.d)}</td>
            <td className={`text-${changeColor(watchData.data.dp)}`}>{watchData.data.dp}{renderIcon(watchData.data.dp)}</td>
            <td>{watchData.data.h}</td>
            <td>{watchData.data.l}</td>
            <td>{watchData.data.o}</td>
            <td>{watchData.data.pc}</td>
        </tr>
    )
})}
            </tbody>

        </table>
    </div>
}