import { createContext } from "react";
import { useState } from "react";



export const WatchListContext = createContext()

export const WatchListContextProvider =  (props) => {
    const [whatchList, setWhatchList] = useState (["GOOGL", 'GOOG', 'MSFT','AMZN', 'ANET'])
    const addStock = (stock) =>{
        if(whatchList.indexOf(stock)=== -1)
        setWhatchList([...whatchList, stock])
    }
    const deleteStock = (stock) => {
        setWhatchList(whatchList.filer((el)=>{
        return el !== stock}))
    }
        
    
    return <WatchListContext.Provider value={{whatchList , addStock, deleteStock}}>
        {props.children}
    </WatchListContext.Provider>
}

