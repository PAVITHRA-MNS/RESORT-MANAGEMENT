import {differenceInCalendarDays, format} from "date-fns"


export default function BookingDetails({booking}){
    return(
        <div>
        <h2 className="text-xl text-blue-700 font-semibold">{booking.place.title}</h2>
        <h3>Name : {booking.name}</h3>
    
        <h3 className="flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

            Check-in : {format(new Date(booking.checkIn),"dd-MM-yyyy")} and Check-out : {format(new Date(booking.checkOut),"dd-MM-yyyy")}</h3>
        <h3>Number Of Days : {differenceInCalendarDays(new Date(booking.checkOut),new Date(booking.checkIn))}</h3>
        <h3>Number Of Guests : {booking.noOfGuests}</h3>
        <div className="border-2 inline-flex m-1 shdow-md shadow-blue-300 border-blue-700 p-2 rounded-2xl">
        <h3 className="font-semibold flex gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

            Total Price : Rs. {booking.price}</h3>
        </div>
        </div>
    )
}