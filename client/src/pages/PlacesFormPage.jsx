import axios from "axios"
import Facilities from "../components/Facilities";
import { useEffect, useState } from "react";
import PhotosUploader from "../components/PhotosUploader";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";



export default function PlacesFormPage(){
    const [title,setTitle]=useState("")
    const[address,setAddress]=useState("")
    const [uploadedPhotos,setUploadedPhotos]=useState([])
    const [description,setDescription]=useState("")
    const [facilities,setFacilities]=useState("")
    const [extraInfo,setExtraInfo]=useState("")
    const [checkin,setCheckin]=useState("")
    const [checkout,setCheckout]=useState("")
    const [maxGuests,setMaxGuests]=useState(1)
    const [price,setPrice]=useState(100)
    const [redirect,setRedirect]=useState(false)

    const {id}=useParams()
    useEffect(()=>{
        if(!id){
            return
        }
        axios.get("/places/"+id).then(response=>{
            const {data}=response;
            setTitle(data.title)
            setAddress(data.address)
            setUploadedPhotos(data.photos)
            setDescription(data.description)
            setFacilities(data.facilities)
            setExtraInfo(data.extraInfo)
            setCheckin(data.checkIn)
            setCheckout(data.checkOut)
            setMaxGuests(data.maxGuests)
            setPrice(data.price)
        })
    },[id])
    async function savePlace(e){
        e.preventDefault();
        const placesData={title,address,uploadedPhotos,description,facilities,extraInfo,checkin,checkout,maxGuests,price}
        if(id){
            //update place
            await axios.put("/places",{
                id,...placesData
            })
            setRedirect(true)
        }else{
            //new place
            await axios.post("/places",
                placesData
                        )
            setRedirect(true)
        }
       
    }

    if(redirect){
        return <Navigate to={"/account/places"} />
    }

    return (
        <div className="max-w-full overflow-hidden px-16">
            <AccountNav />
                    <form onSubmit={savePlace}>
                        <h2 className="text-xl">Title</h2>
                        <p className="text-gray-500"> Give a catchy title for your resort</p>
                        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" placeholder="Title" />
                        <h2 className="text-xl">Address</h2>
                        <p className="text-gray-500"> Give the location of your resort</p>
                        <input value={address} onChange={e=>setAddress(e.target.value)} type="text" placeholder="Address" />
                        <h2 className="text-xl">Photos</h2>
                        <p className="text-gray-500">Add aesthetic photos of your resort</p>
                        <PhotosUploader uploadedPhotos={uploadedPhotos} onChange={setUploadedPhotos} />
                        <h2 className="text-xl mt-2">Description</h2>
                        <p className="text-gray-500"> Give a short description of your resort</p>
                        <textarea value={description} onChange={e=>setDescription(e.target.value)} ></textarea>

                        <h2 className="text-xl">Facilities</h2>
                        <p className="text-gray-500"> Give the facilities you provide in your resort</p>
                        <div className=" mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid:cols-3 gap-2">
                            <Facilities selected={facilities} onChange={setFacilities} />
                        </div>
                        <h2 className="text-xl mt-3">Extra Info</h2>
                        <p className="text-gray-500">Provide any particular resort rules or specialities</p>
                        <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} ></textarea>
                        <h2 className="text-xl">Duration</h2>
                        <p className="text-gray-500">Check-in time, Check-out time, Max guests</p>
                        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-lg">
                            <div className="flex items-center flex-col ">
                                <h2>Check-in time</h2>
                                <input value={checkin} onChange={e=>setCheckin(e.target.value)}  type="text" />
                            </div>
                            <div className="flex items-center flex-col">
                            <h2>Check-out time</h2>
                                <input value={checkout} onChange={e=>setCheckout(e.target.value)} type="text" />
                            </div>
                            <div className="flex items-center flex-col ">
                            <h2>Max Guests</h2>
                                <input className="w-full border border-blue-800 shadow-md shadow-gray-300 rounded-full px-4 py-3 m-3" value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} type="number" />
                            </div>
                            <div className="flex items-center flex-col ">
                            <h2>Price Per Day</h2>
                                <input className="w-full border border-blue-800 shadow-md shadow-gray-300 rounded-full px-4 py-3 m-3" value={price} onChange={e=>setPrice(e.target.value)} type="number" />
                            </div>
                        </div>
                        <button className="mt-3 my-5 bg-blue-700 text-white w-full mx-auto rounded-full px-4 py-3">Save</button>
                    </form>
                </div>
    )
}