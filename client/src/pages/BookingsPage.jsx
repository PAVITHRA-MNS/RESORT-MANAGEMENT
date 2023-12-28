import axios from "axios"
import { useEffect, useState } from "react"
import AccountNav from "../components/AccountNav"
import { Link } from "react-router-dom"
import BookingDetails from "../components/BookingDetails"

export default function BookingsPage(){
    const [bookings,setBookings]=useState([])
  
    useEffect(()=>{
        axios.get("/bookings").then(response=>{
            setBookings(response.data)
        })
    },[])

   

    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length>0 && bookings.map(booking=>(
                    <Link to={`/account/bookings/${booking._id}`}  className=" border-2 border-blue-700 mt-5 bg-white-100 shadow-md shadow-gray-300 flex gap-7 px-5 py-4 rounded-2xl" >
                    <div className="flex gap-5">
                        <div className=" bg-gray-500 flex h-40 w-40 grow shrink-0 rounded-2xl">
                        {booking.place.photos.length>0 && (
                    <img className="object-cover rounded-2xl" src={"http://localhost:5000/uploads/"+booking.place.photos[0]} alt="image" />
                )}
                        </div>
                      
                        <BookingDetails booking={booking} />
                        
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}