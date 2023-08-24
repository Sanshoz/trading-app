import { useState, useEffect } from "react"
import finnHub from "../APIS/finnHub"

export const AutoComplete  = () => {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    
    
    const renderDropDown = () => {
        const dropDownClass = search ? "show" : "";
        return (
            <ul className={`dropdown-menu ${dropDownClass}`}>
                {results && results.map((result) => {
                    return (
                        <li key={result.symbol} className="dropdown-item">
                            {result.description} ({result.symbol})
                        </li>
                    );
                })}
            </ul>
        );
    };

    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try{
                const response = await finnHub.get("/search", {
                    params: {
                        q: search
                    }
                })
                console.log(response)
                if(isMounted) {
                    setResults(response.data)
                }else(
                    setResults([])
                    )
                
            }catch(err){
                console.log(err)
            }
        }
        if (search.length >0){
            fetchData()
        }
        return () => (isMounted = false)
        
    }, [search])
    
    return <div className="w-50 p-5 rounded mx-auto">
        <div className = 'form-floating dropdown'>
            <input  style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}} id="search" type="text" 
            className="form-control" placeholder="Search" autoComplete="off" value={search} onChange={ (e)=> {
                setSearch(e.target.value)
            }} />
            <label htmlFor="Search">Search</label>
            {renderDropDown()}
            
        </div>
    </div>
}