import { useState } from "react";
import convertTime from "../../utils/convertTime.js";
import { BASE_URL, token } from './../../config.js';
import { toast } from 'react-toastify';
const SidePanel = ({doctorId, ticketPrice,timeSlots}) => {

    const [selectedTimeSlot, setSelectedTimeSlot] = useState();

    const handleTimeSlotClick = (selectedSlot) => {
        setSelectedTimeSlot(selectedSlot);
    };


    const bookingHandler = async () => {
        try {
            const res = await fetch(`${BASE_URL}/bookings/checkout-session/${doctorId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json', // Set content type to JSON
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({selectedTimeSlot} ) // Stringify selectedTimeSlot object
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message + ' please try again');
            }
            if (data.session.url) {
                window.location.href = data.session.url;
            }
        } catch (err) {
            console.log(err);
            toast.error(err.message);
        }
    };
    
    console.log(JSON.stringify({ selectedTimeSlot }));
    return (
    <div className='shadow-panelShadow lg:p-5 rounded-md'>
        <div className='flex items-center justify-between'>
            <p className='text__para mt-0 font-semibold'>Ticket Price </p>
            <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
                {ticketPrice} ILS </span>
        </div>
        <div className='mt-[30px]'>
            <p className='text__para mt-0 font-semibold text-headingColor'>
                Available Time Slots : 
            </p>
            <ul className='mt-3'> 
            {timeSlots?.map((item,index)=>(
           <li
           key={index}
           onClick={() => handleTimeSlotClick(item)}
           className={`flex items-center justify-between mb-2 cursor-pointer ${
               selectedTimeSlot === item ? 'bg-gray-200' : ''
           }`}
       >
                    <p className='mt-[15px] leading-6 text-textColor font-semibold'>
                        {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
                    </p>
                    <p className='mt-[15px] leading-6 text-textColor font-semibold'>
                        {convertTime(item.startingTime)} -  {convertTime(item.endingTime)}
                    </p>
            </li>
            ))}
            </ul>
        </div>
        <button onClick={bookingHandler} className='btn px-2 w-full rounded-md'>Book Appointment</button>
    </div>
    )
}

export default SidePanel