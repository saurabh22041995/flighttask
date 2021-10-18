import React, { useEffect, useState } from "react";
import queryString from 'query-string';
import Image from "../Assets/images/airline.jpg";
import moment from "moment";

const FlightDetail = (props) => {
    const [queryStr, setQueryStr] = useState({})

    useEffect(() => {
        const query = queryString.parse(props.location.search);
        setQueryStr(query)
    }, [props.location.search, setQueryStr]);

    return(
        <div className="search">
            <div className="item_cards">
                <div className="item-cards-image">
                    <div style={{"text-align": "center"}}>
                            <h2>
                                {queryStr.origin} 
                                <span style={{"padding": "10px"}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                    </svg>
                                </span>
                                {queryStr.destination} 
                            </h2>
                            </div>
                    <div className="image-card-component">
                    
                        <div className="image-wrapper">
                            <div className="preview-image">
                                <a className="imageLink" href="https://themeforest.net/item/travelo-travel-tour-booking-html5-template/8346649">
                                    <img src={Image} loading="lazy" className="preview_image_component__image" alt="Travelo - Travel, Tour Booking HTML5 Template" title="Travelo - Travel, Tour Booking HTML5 Template" width="590" height="300" data-controller="image-preview" data-action="error->image-preview#setFallback" data-fallback="https://previews.customer.envatousercontent.com/files/125675585/Preview.__large_preview.jpg" data-carousel-target="image"/>
                                </a>
                            </div>
                        </div>
                            
                        <div className="detailsWrapper">
                        
                            <h3 className="item-h3">
                                {moment(queryStr.startDate).format("DD MMM YYYY")} 
                                {
                                    queryStr.startDate !== queryStr.endDate
                                    ?
                                    <>
                                    <span style={{"padding": "10px"}}>{"-"}</span>
                                    {moment(queryStr.endDate).format("DD MMM YYYY")} 
                                    </>
                                    :
                                    null
                                }
                            </h3>
                            adults: <span >{queryStr.adultCount}</span><br/>
                            children: <span >{queryStr.childrenCount}</span><br/>
                            infant: <span >{queryStr.infantCount}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FlightDetail;