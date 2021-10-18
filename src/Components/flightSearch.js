import React, { useState } from 'react';
import * as Api from "../Common/requestApi";
import * as ApiRoutes from "../Common/apiRoute";


const FlightSearch = (props) => {
    const [returns, setReturns] = useState(false);
    const [infantCount, setInfantCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [adultCount, setAdultCount] = useState(0);
    const [airportList, setAirportList] = useState([]);
    const [connectionsList, setConnectionsList] = useState([]);
    const [formDetails, setFormDetails] = useState({
        origin: "",
        destination: "",
        startDate: "",
        endDate: "",
    })

    const returnFunc = (e) => {
        if(e.target.value === "Return"){
            setReturns(true)
        }else{
            setReturns(false)
        }
    }

    const searchFlight = (e) => {
        e.preventDefault();
        let { origin, destination, startDate, endDate } = formDetails; 
        props.history.push(`/flightdetails?origin=${origin}&destination=${destination}&startDate=${startDate}&endDate=${endDate ? endDate : startDate}&infantCount=${infantCount}&childrenCount=${childrenCount}&adultCount=${adultCount}`)
    }

    const airports = async () => {
        try{
            let Airports = await Api.GET(ApiRoutes.OriginsWithConnections);
            if(Airports.status === 200) {
                setAirportList(Airports.data.airports)
            }else{
                console.log("No Airports Found");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const increase = (id) => {
        if(id === "infant" && infantCount < 100){
            setInfantCount(infantCount+1)
        }
        else if(id === "adult" && adultCount < 100){
            setAdultCount(adultCount+1)
        }
        else if(id === "children" && childrenCount < 100){
            setChildrenCount(childrenCount+1)
        }
    }

    const decrease = (id) => {
        if(id === "infant" && infantCount > 0){
            setInfantCount(infantCount-1)
        }
        else if(id === "adult" && adultCount > 0){
            setAdultCount(adultCount-1)
        }
        else if(id === "children" && childrenCount > 0){
            setChildrenCount(childrenCount-1)
        }
    }

    const selectOriginAirport = (e) => {
        const { value } = e.target
        let airportObj = airportList.filter(ele => ele.name === value)
        if(airportObj.length > 0){
            setConnectionsList(airportObj[0].connections)
        }
        setFormDetails(prevState => ({
            ...prevState,
            origin: value,
            destination: "",
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormDetails(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    return(
        <div className="app-1">
            <div id="search-form">
                <div id="header">
                    <h1>SEARCH FOR FLIGHTS</h1>
                </div>
                <section>
                    <div className="flight" id="flightbox">
                        <form id="flight-form">
                            <div id="flight-type">
                                <div className="info-box">
                                    <input type="radio" name="flight-type" value="Single" id="return" checked={!returns} onChange={returnFunc}/>
                                    <label htmlFor="one-way">ONE WAY</label>
                                </div>
                                <div className="info-box">
                                    <input type="radio" name="flight-type" value="Return" id="one-way" onChange={returnFunc}/>
                                    <label htmlFor="return">RETURN</label>
                                </div>
                            </div>
                            <div id="flight-depart">
                                <div className="info-box">
                                    <label htmlFor="">ORIGIN</label>
                                    <input className="in" type="text" list="dep-from" name="origin" /*value={formDetails.origin}*/ onClick={airports} onChange={selectOriginAirport}/>
                                    <datalist id="dep-from">
                                        {
                                            airportList.length > 0 && airportList.map((ele, i) => {
                                                return(
                                                    <option key={`${i}`} value={ele.name}>{ele.name}</option>
                                                    )
                                                })
                                          
                                        }
                                        
                                    </datalist>
                                    <div id="depart-res"></div>
                                </div>
                                <div className="info-box" id="arrive-box">
                                    <label htmlFor="">DESTINATION</label>
                                    <input className="in" type="text" list="dep-to" name="destination" value={formDetails.destination} onChange={handleChange}/>
                                    <datalist id="dep-to">
                                        {
                                            connectionsList.length > 0 && connectionsList.map((ele, ind) => {
                                                return(
                                                    <option key={`${ind}`} value={ele.name}>{ele.name}</option>
                                                )
                                            })
                                        }
                                    </datalist>
                                    <div id="arrive-res"></div>
                                </div>
                            </div>
                            <div id="flight-dates">
                                <div className="info-box">
                                    <label htmlFor="">DATE</label>
                                    <input className="in" type="date" id="leave-date" name="startDate" value={formDetails.startDate} onChange={handleChange} />
                                </div>
                                <div className="info-box" id="return-box">
                                {
                                    returns
                                    ?
                                    <>
                                        <label htmlFor="">RETURN DATE</label>
                                        <input className="in" type="date" id="return-date" name="endDate" value={formDetails.endDate} onChange={handleChange} />
                                    </>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                            <div id="flight-info">
                                <div className="info-box">
                                    <label htmlFor="adults">ADULTS</label>
                                    <div className="input-group">
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-danger btn-number" onClick={()=>decrease("adult")}>
                                                    <span className="glyphicon glyphicon-minus"></span>
                                                </button>
                                            </span>
                                            <input  type="text" name="infant" className="in form-control input-number" value={adultCount} min="1" max="100"/>
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-success btn-number" onClick={() => increase("adult")}>
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </button>
                                            </span>
                                        </div>
                                </div>
                                <div className="info-box">
                                    <label htmlFor="children">CHILDREN</label>
                                    <div className="input-group">
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-danger btn-number" onClick={()=>decrease("children")}>
                                                    <span className="glyphicon glyphicon-minus"></span>
                                                </button>
                                            </span>
                                            <input type="text" name="infant" className="in form-control input-number" value={childrenCount} min="1" max="100"/>
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-success btn-number" onClick={()=>increase("children")}>
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </button>
                                            </span>
                                        </div>
                                </div>
                                <div className="info-box">
                                    <label htmlFor="className-type">INFANTS</label>
                                    
                                    <div className="input-group">
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-danger btn-number" onClick={()=>decrease("infant")}>
                                                    <span className="glyphicon glyphicon-minus"></span>
                                                </button>
                                            </span>
                                            <input type="text" name="infant" className="in form-control input-number" value={infantCount} min="1" max="100"/>
                                            <span className="input-group-btn">
                                                <button type="button" className="btn btn-success btn-number" onClick={()=>increase("infant")}>
                                                    <span className="glyphicon glyphicon-plus"></span>
                                                </button>
                                            </span>
                                        </div>

                                </div>
                        </div>
                        
                    
                        <div id="flight-search">
                            <div className="info-box">
                                <input type="submit" id="search-flight" onClick={searchFlight}/>
                            </div>
                        </div>
                        
                    </form> 
                    </div>
                </section>
            
               
                
            </div>



        </div>
    )
}

export default FlightSearch;