import Heading from 'components/Heading/Heading';
import React, { useEffect, useState } from 'react'
import "./PropertiesPage.css";
import Card from 'components/Card/Card';
import heartStroke from "../../assets/heart-stroke.svg";

const PropertiesPage = () => {

  //state -> of all the properties
  let [properties, setProperties] = useState([]);

  //state -> of managing useEffect(second rerendering) when the properties change from [] to [abc]
  let [updatePropertiesFlag, setUpdatePropertiesFlag] = useState(false);

  //credentials for simplyrets
  var userName = "simplyrets"; 
  var password = "simplyrets";

  var url = "https://api.simplyrets.com/properties"; // Your application token endpoint  
  
  //initializing request
  var request = new XMLHttpRequest(); 

  function getProperties(url, clientID, clientSecret) {
    request.open("GET", url, true); 
    request.setRequestHeader("Authorization", "Basic " + btoa("simplyrets:simplyrets","Content-type", "application/json"));
    request.send("grant_type=client_credentials&client_id="+clientID+"&"+"client_secret="+clientSecret); // specify the credentials to receive the token on request
    request.onreadystatechange = function () {
        if (request.readyState == request.DONE) {
            var response = request.responseText;
            var data = JSON.parse(response); 
            // console.log(data);
            let properties = [];

            //extracting data from all the properties to the required properties
            data.forEach(element => {
              let propertyObj = {
                  address : element.address.streetName + " " + element.address.city + " " + element.address.country,
                  bathsFull : element.property.bathsFull,
                  bedrooms : element.property.bedrooms,
                  area : element.property.area,
                  listPrice : element.listPrice,
                  listDate : element.listDate,
                  listingId : element.listingId,
                  photos : element.photos[0],
                  icon : heartStroke,
              };

              properties.push(propertyObj)
                
            });

            //setting properties in local storage -> as per task instruction
            localStorage.setItem("properties", JSON.stringify(properties));

            //flag to control rerendering
            setUpdatePropertiesFlag(!updatePropertiesFlag)
        }
    }
}


  useEffect(() => {

    if(!updatePropertiesFlag){
      getProperties(url, userName, password);
    }

    if(localStorage.getItem("properties")){
      setProperties(JSON.parse(localStorage.getItem("properties")));
    }

  },[updatePropertiesFlag])


  return (
    <div className = "container">
    
      <div className="header">
          <Heading/>
      </div>
      <div className="contentContainer">
        <div className="content">
        {
          properties.length != 0 ?  <Card properties = {properties} /> : ''
        }
        </div>

      </div>
    </div>
  )
}

export default PropertiesPage