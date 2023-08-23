import { useState, useEffect } from "react"
import finnHub from "../APIS/finnHub"


export const StockList = () => {
    const [whatchList, setWhatchList] = useState (["GOOGL", 'MSFT','AMZN'])
    const [stock, setStock] = useState()
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
    }, [])

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
            {stock.map((stockData)=> {
                    return (
                        <tr>
                            <th scope="row">{stockData.symbol}</th>
                            <td>{stockData.data.c}</td>
                            <td>{stockData.data.d}</td>
                            <td>{stockData.data.dp}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}</td>
                        </tr>
                    )
                })}
            </tbody>

        </table>
    </div>
}