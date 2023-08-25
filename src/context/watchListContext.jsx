import { createContext } from "react";
import { useState, useEffect } from "react";



export const WatchListContext = createContext()

export const WatchListContextProvider =  (props) => {

    
    const [watchList, setWatchList] = useState (localStorage.getItem("watchList")?.split(",") || ["GOOGL", 'GOOG', 'MSFT','AMZN', 'ANET'])
    useEffect(()=>{
        localStorage.setItem("watchList", watchList)
    },[watchList])
    
    const addStock = (stock) =>{
        if(watchList.indexOf(stock)=== -1)
      //  console.log(watchList)
        setWatchList([...watchList, stock])
      //  console.log(watchList)
    }
    const deleteStock = (stock) => {
        setWatchList(watchList.filter((el)=>{
        return el !== stock}))
    }
        
    
    return <WatchListContext.Provider value={{watchList , addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}

