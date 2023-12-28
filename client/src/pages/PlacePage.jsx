import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "../components/BookingWidget"
import PlaceAddress from "../components/PlaceAddress"
import PlaceInfo from "../components/PlaceInfo"


export default function PlacePage(){
    
    const [place,setPlace]=useState([])
    const [showAllPhotos,setShowAllPhotos] = useState(false);

    useEffect(()=>{
        
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data)
        })
    },[id])

    if (showAllPhotos) {
        return (
          <div className="absolute inset-0 bg-black text-white min-h-screen">
            <div className="w-70 bg-black p-8 grid gap-4">
              <div>
                <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                <button onClick={() => setShowAllPhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                  Close photos
                </button>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center">
              {place?.photos?.length > 0 && place.photos.map(photo => (
                <div className=" max-w-3xl">
                  <img src={"http://localhost:5000/uploads/"+photo} alt=""/>
                </div>
              ))}
              </div>
            </div>
          </div>
        );
      }

    return(
        <div className="mt-5 lg:mx-40 px-5 border-4 border-blue-700 shadow-lg shadow-blue-300 p-4">
        <h1 className="text-2xl font-semibold">{place?.title}</h1>
        



            <div className="relative">
        

            <div className="grid mt-2 gap-5 sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[2fr_1fr_1fr] rounded-3xl overflow-hidden">
        <div className="">
            {place.photos?.[0] && (
                <img onClick={()=>{setShowAllPhotos(true)}} className=" aspect-square object-cover cursor-pointer" src={"http://localhost:5000/uploads/"+place.photos[0]} alt="" />
            )}
        </div>
        <div>
            <div>
                {place.photos?.[1] && (
                    <img onClick={()=>{setShowAllPhotos(true)}} className="aspect-square object-cover cursor-pointer" src={"http://localhost:5000/uploads/"+place.photos[1]} alt="" />
                )}
            </div>
            <div>
                {place.photos?.[2] && (
                    <img onClick={()=>{setShowAllPhotos(true)}} className="aspect-square object-cover cursor-pointer" src={"http://localhost:5000/uploads/"+place.photos[2]} alt="" />
                )}
            </div>
        </div>
        <div className="flex items-center justify-center">
            <BookingWidget place={place} />
        </div>
    </div>


        <button onClick={()=>{setShowAllPhotos(true)}} className=" flex gap-2 absolute bottom-2 left-2 bg-white text-black rounded-2xl py-1 px-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg>

            Show All Photos</button>
        </div>

        <PlaceInfo place={place} />


        {/* <div className="mt-2">
            <h2 className="font-semibold text-xl">Description</h2>
            <h2>{place.description}</h2>
        </div>
        <div className="flex justify-center mx-7">
        <div className="inline-flex gap-40 mt-3 p-3 shadow-md shadow-gray-300 border-2 border-blue-700 ">
        <div className="">
            <h2 className="font-semibold text-xl">Info</h2>
            <h2>Check-in : {place.checkIn}</h2>
            <h2>Check-out : {place.checkOut}</h2>
            <h2>Max-Guests : {place.MaxGuests}</h2>
            <h2>Price Per Day : {place.price}</h2>
        </div>
        <div>
            <h2 className="font-semibold text-xl">Facilities</h2>
            {place.facilities?.length>0 && place.facilities.map(fac=>(
                <h3>{fac}</h3>
            ))}
        </div>
        </div>
        </div>
        <div className="mt-3">
            <h2 className="font-semibold text-xl">Extra Info</h2>
            <h2>{place.extraInfo}</h2>
        </div> */}
        </div>
    )
}