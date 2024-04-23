import React, { useState, useEffect } from 'react';

type Booking = {
    date: string;
    time_init: string;
    time_end: string;
};

interface ActivityProps {
    actividad: {
        id: number,
        name: string;
        location: string;
        manager_name: string;
        manager_phone: string;
        time_init: string;
        time_end: string;
        days: string[];
        bookings: Booking[];
    };
}

export const BookingPage = ({ actividad }: ActivityProps) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [timeInit, setTimeInit] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [startTimeOptions, setStartTimeOptions] = useState<string[]>([]);
    const [endTimeOptions, setEndTimeOptions] = useState<string[]>([]);

    const convertTimeToMinutes = (time: string) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    };
    
    const incrementHour = (time: string) => {
        const [hour, minute] = time.split(':').map(Number);
        const newHour = hour + 1;
        return newHour < 10 ? `0${newHour}:00` : `${newHour}:00`;
    };

    useEffect(() => {
        if (selectedDate) {
            setAvailableTimes(generateFullDayHours());
            setStartTimeOptions(generateStartTimeOptions());
        }
    }, [selectedDate, actividad.bookings]);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
        setTimeInit('');
        setTimeEnd('');
    };

    const handleTimeInitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTime = event.target.value;
        setTimeInit(selectedTime);
        setEndTimeOptions(generateEndTimeOptions(selectedTime)); // Ajustamos generateEndTimeOptions para tomar el tiempo inicial como argumento
    };

    const generateFullDayHours = () => {
        const start = convertTimeToMinutes(actividad.time_init);
        const end = convertTimeToMinutes(actividad.time_end);
        let current = start;
        const times = [];

        while (current < end) {
            let hour = Math.floor(current / 60);
            times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
            current += 60;
        }
        
        return times;
    };

    const generateStartTimeOptions = () => {
        if (!selectedDate) return [];
        const dayBookings = actividad.bookings.filter(b => b.date === selectedDate);
        const hours: string[] = [];
        let currentHour = actividad.time_init;
        const endTimeInMinutes = convertTimeToMinutes(actividad.time_end);

        while (convertTimeToMinutes(currentHour) < endTimeInMinutes) {
            const nextHour = incrementHour(currentHour);
            if (!dayBookings.some(b => (b.time_init <= currentHour && currentHour < b.time_end) ||
                                        (b.time_init < nextHour && nextHour <= b.time_end))) {
                hours.push(currentHour);
            }
            currentHour = nextHour;
            if (currentHour === "24:00") break;  // Prevents exceeding 24:00
        }
        return hours;
    };

    const generateEndTimeOptions = (timeInit: string) => {
        if (!timeInit) return [];
        const endTimeOptions: string[] = [];
        const timeInitMinutes = convertTimeToMinutes(timeInit);
        const dayBookings = actividad.bookings.filter(b => b.date === selectedDate);
        const filteredTimes = availableTimes.filter(time =>
            convertTimeToMinutes(time) > timeInitMinutes &&
            !dayBookings.some(b => convertTimeToMinutes(time) > convertTimeToMinutes(b.time_init) &&
                                   convertTimeToMinutes(time) <= convertTimeToMinutes(b.time_end))
        ).sort();
        console.log(filteredTimes);
        for(let i = 0; i < filteredTimes.length; i++){
            if(i < filteredTimes.length-1 && convertTimeToMinutes(filteredTimes[i]) + 60 < convertTimeToMinutes(filteredTimes[i+1])){
                endTimeOptions.push(filteredTimes[i]);
                return endTimeOptions;
            }
            endTimeOptions.push(filteredTimes[i])
        }
        return endTimeOptions;
    };
    

    return (
        <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-xl font-bold text-center mb-6">Reserva para {actividad.name}</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Fecha:
                        <input type="date" name="date" value={selectedDate} onChange={handleDateChange} 
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            required />
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hora de inicio:
                        <select name="time_init" value={timeInit} 
                                onChange={(e) => { handleTimeInitChange(e); setTimeEnd(''); }} 
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required>
                            <option value="">Seleccionar hora de inicio</option>
                            {startTimeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hora de fin:
                        <select name="time_end" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required>
                            <option value="">Seleccionar hora de fin</option>
                            {endTimeOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 transition-colors">
                    Reservar
                </button>
            </form>
        </div>
    );
};
