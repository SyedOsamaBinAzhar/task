import React, {useEffect, useState} from 'react'
import "./Card.css";
import homeOne from "../../assets/homeOne.svg";
import heartFill from "../../assets/heart-fill.svg";
import heartStroke from "../../assets/heart-stroke.svg";

const Card = ({properties}) => {

    //flag to manage state rerendering as on changing array a component doesnt rerender.
    let [updatePropertiesState, setUpdatePropertiesState] = useState(false);

    let existingProperties = [];
    let retrievedData;

    //important to convert array to string to store in local storage.
    localStorage.setItem("existingProperties", JSON.stringify(existingProperties));

    const likeHandler = async(e) => {

        //get items from local storage on like click
        //then update the local storage w.r.t to the item liked.
        //update icon img of the liked items.
        retrievedData = localStorage.getItem("existingProperties");

        existingProperties = JSON.parse(retrievedData)
        
        //avoiding repititions
        if(!existingProperties.includes(e.target.id)){
            existingProperties.push(e.target.id)

            localStorage.setItem("existingProperties", JSON.stringify(existingProperties));
        }

        retrieveAndFilterData()

    }

    const retrieveAndFilterData = () => {
        
        retrievedData = localStorage.getItem("existingProperties");


        existingProperties = JSON.parse(retrievedData)

        let found = properties.find((element) => existingProperties.includes(element.listingId))

        found.icon = heartFill;

        //updateing heart icon from stroke to fill
        for(let i = 0; i < properties.length; i++){
            if(properties[i].listingId === found.listingId){
                properties[i] = found;
            }
        }

        localStorage.setItem("existingProperties", JSON.stringify(properties));

        //flag to control rerendering
        setUpdatePropertiesState(!updatePropertiesState)
        
    }
    
    useEffect(() => {
    }, [retrievedData, updatePropertiesState])
    
  return (
    properties.map((element,idx) => {
        
        return(
            <div className="card" key = {idx}>
            <div className="cardImgCont" style = {{backgroundImage : `url(${element.photos})`, backgroundRepeat : 'no-repeat', backgroundSize : "100% 100%,cover"}}>
                <img className = "reaction" src={element.icon} alt = "" id={element.listingId} onClick = {likeHandler}/>
            </div>
            <div className="cardDetailsCont">
              <p className = "attr">{element.bedrooms} BR | {element.bathsFull} Bath | {element.area} Sq Ft</p>
              <h3>${element.listPrice}</h3>
              <p className = "address">{element.address}</p>
              <p className = "listed">Listed: {element.listDate}</p>
            </div>
            </div>
        )
    })
  )
}

export default Card