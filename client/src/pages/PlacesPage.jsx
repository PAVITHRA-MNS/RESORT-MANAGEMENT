import { Link, Navigate, useParams } from "react-router-dom";

import PlacesFormPage from "./PlacesFormPage";
import AccountNav from "../components/AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage(){
const [places,setPlaces]=useState([])
   
useEffect(()=>{
    axios.get("/user-places").then(response=>{
        setPlaces(response.data)
    })
},[])



    return(
  
        <div>
            <AccountNav />
                <div className="text-center mt-4">
        <Link to={"/account/places/new"} className="inline-flex gap-2 bg-blue-700 rounded-full px-5 py-2 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
      Add New Resort</Link>
      </div>
            
    
        {places.length>0 && places.map(place=>(
            <Link to={"/account/places/"+place._id} className="cursor-pointer border-2 border-blue-700 mt-5 bg-white-100 shadow-md shadow-gray-300 flex gap-7 px-5 py-4 rounded-2xl ">
            <div className="bg-gray-500 flex h-40 w-40 grow shrink-0 rounded-2xl ">
                {place.photos.length>0 && (
                    <img className="object-cover rounded-2xl" src={"http://localhost:5000/uploads/"+place.photos[0]} alt="image" />
                )}
            </div>
            <div className="mt-2 grow-0 shrink ">
            <div className="text-xl ">{place.title}</div>
            <div className="text-sm mt-2">{place.description}</div>
            <div className="mt-2"><b>Rs.{place.price}</b> per day</div>
            </div>
            </Link>
        ))}
      </div>
          
        
        
        
    )
;}