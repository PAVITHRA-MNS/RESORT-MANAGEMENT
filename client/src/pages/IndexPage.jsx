import axios from "axios";
import {  useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function IndexPage() {

  const [places,setPlaces]=useState([])

  useEffect(()=>{
    axios.get("/places").then(response=>{
      setPlaces([...response.data,...response.data])
    })
  },[])
  return (
    <>
    <div className="grid my-5 gap-x-10 gap-y-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {places.length>0 && places.map(place=>(
      
        <Link to={user?"/place/"+place._id:"/login"}>
        <div className="rounded-2xl flex">
          <img className="rounded-2xl object-cover aspect-square" src={"http://localhost:5000/uploads/"+place.photos[0]} alt="" />
        </div>
        <h3 className="text-sm mt-1 font-semibold truncate">{place.address}</h3>
        <h2 className="text-sm  text-gray-700 truncate">{place.title}</h2>
        <h4><b>Rs.{place.price}</b> per day</h4>
        </Link>
       
    ))}
          </div>

    </>
    
  );
}
