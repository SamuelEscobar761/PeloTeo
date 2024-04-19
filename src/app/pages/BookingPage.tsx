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
        const dayBookings = actividad.bookings.filter(b => b.date === selectedDate);
        return availableTimes.filter(time =>
            !dayBookings.some(b =>
                (convertTimeToMinutes(time) >= convertTimeToMinutes(b.time_init) &&
                convertTimeToMinutes(time) < convertTimeToMinutes(b.time_end))
            )
        );
    };

    const generateEndTimeOptions = (timeInit: string) => {
        if (!timeInit) return [];
        const endTimeOptions: string[] = [];
        const timeInitMinutes = convertTimeToMinutes(timeInit);
        const dayBookings = actividad.bookings.filter(b => b.date === selectedDate);
        const filteredTimes = availableTimes.filter(time =>
            convertTimeToMinutes(time) > timeInitMinutes &&
            !dayBookings.some(b => convertTimeToMinutes(time) >= convertTimeToMinutes(b.time_init) &&
                                   convertTimeToMinutes(time) <= convertTimeToMinutes(b.time_end))
        );

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
        <div>
            <h1>Reserva para {actividad.name}</h1>
            <form>
                <label>
                    Fecha:
                    <input type="date" name="date" value={selectedDate} onChange={handleDateChange} required />
                </label>
                <label>
                    Hora de inicio:
                    <select name="time_init" value={timeInit} onChange={(e) => {handleTimeInitChange(e); setTimeEnd('');}} required>
                        <option value="">Seleccionar hora de inicio</option>
                        {startTimeOptions.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Hora de fin:
                    <select name="time_end" value={timeEnd} onChange={(e) => setTimeEnd(e.target.value)} required>
                        <option value="">Seleccionar hora de fin</option>
                        {endTimeOptions.map(time => (
                            <option key={time} value={time}>{time}</option>
                        ))}
                    </select>
                </label>
                <button type="submit">Reservar</button>
            </form>
        </div>
    );
};
