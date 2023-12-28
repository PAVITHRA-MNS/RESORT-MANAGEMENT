import { useContext, useEffect, useState } from "react"
import {differenceInCalendarDays} from "date-fns"
import { Navigate } from "react-router-dom"
import axios from "axios"
import { UserContext } from "../UserContext"

export default function BookingWidget({place}){

    const [checkIn,setCheckin]=useState("")
    const [checkOut,setCheckout]=useState("")
    const [noOfGuests,setNoOfGuests]=useState(1)
    const [name,setName]=useState("")
    const [mobile,setMobile]=useState("")
    const [redirect,setRedirect]=useState(null)
    const {user}=useContext(UserContext)

    useEffect(()=>{
        if(user){
            setName(user.name)
        }
    },[user])

    let numberOfDays=0
    if(checkIn && checkOut){
        numberOfDays=differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }

    

    async function bookThisPlace(){
        const data={checkIn,checkOut,noOfGuests,name,mobile,
        place:place._id,
        price:numberOfDays * place.price
        }
        const response=await axios.post("/bookings",data)
        const bookingId=response.data._id;
        setRedirect(`/account/bookings/${bookingId}`)
    }

    if(redirect){
        return <Navigate to={redirect} />
    }

    return(
        <div className="p-4 bg-white shadow-md shadow-gray-400 border-2 border-blue-700 text-center rounded-3xl">
                    <h2 className="font-bold text-xl text-blue-700">Book Now!</h2>
                    <div className="flex gap-2 mt-2">
                    <div className="border-2 border-blue-700">
                        <label>Check In</label>
                        <input type="date" value={checkIn} onChange={e=>setCheckin(e.target.value)} />
                    </div>
                    <div className="border-2 border-blue-700">
                        <label>Check Out</label>
                        <input type="date" value={checkOut} onChange={e=>setCheckout(e.target.value)} />
                    </div>
                    </div>
                    {checkIn && checkOut && (
                        <div className="flex flex-col w-80 ">
                        <div className="flex gap-5 items-center">
                            <label>Name</label>
                        <input type="text" value={name} onChange={e=>setName(e.target.value)} />
                        </div>  
                        <div className="flex gap-5 items-center">
                            <label>Mobile</label>
                        <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value)} />
                         </div>  
                        </div>
                    )}
                    <div className="border-2 border-blue-700 mt-1 text-center">
                        <label>Number of Guests</label>
                        <input type="number" value={noOfGuests} onChange={e=>setNoOfGuests(e.target.value)} className="mx-12 border-2 border-black rounded-2xl p-1 mb-2" />
                    </div>
                    <h3 className="mt-2">Price Per Day : <b>Rs. {place.price}</b></h3>
                    {numberOfDays>0 && <span>Charge for {numberOfDays} days is <b> Rs. {numberOfDays * place.price}</b></span>}
                    <button onClick={bookThisPlace} className="bg-blue-700 text-white rounded-2xl mt-2 w-full py-1">Book</button>
                </div>
    )
}