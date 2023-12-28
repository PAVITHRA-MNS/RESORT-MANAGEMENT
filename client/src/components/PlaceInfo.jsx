export default function PlaceInfo({place}){
    return (
        <div>
             <div className="mt-2">
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
        </div>
        </div>
    )
}