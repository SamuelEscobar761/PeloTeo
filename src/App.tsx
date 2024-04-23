import './App.css'
import { BookingPage } from './app/pages/BookingPage'

function App() {
  const actividad = {
    "name": "",
    "location": "",
    "manager_name": "",
    "manager_phone": "",
    "time_init": "8:00",
    "time_end": "22:00",
    "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
};

const bookings = [
  {"date": "2024-04-20", "time_init": "10:00", "time_end": "11:00"},
  {"date": "2024-05-03", "time_init": "8:00", "time_end": "9:00"},
  {"date": "2024-05-15", "time_init": "16:00", "time_end": "18:00"},
  {"date": "2024-04-19", "time_init": "14:00", "time_end": "15:00"},
  {"date": "2024-04-25", "time_init": "12:00", "time_end": "14:00"},
  {"date": "2024-04-17", "time_init": "9:00", "time_end": "10:00"},
  {"date": "2024-04-17", "time_init": "13:00", "time_end": "14:00"},
  {"date": "2024-04-18", "time_init": "14:00", "time_end": "16:00"},
  {"date": "2024-04-18", "time_init": "10:00", "time_end": "14:00"},
  {"date": "2024-04-19", "time_init": "9:00", "time_end": "10:00"},
  {"date": "2024-04-20", "time_init": "11:00", "time_end": "12:00"},
  {"date": "2024-04-21", "time_init": "8:00", "time_end": "9:00"},
  {"date": "2024-04-22", "time_init": "14:00", "time_end": "15:00"},
  {"date": "2024-04-23", "time_init": "11:00", "time_end": "12:00"},
  {"date": "2024-04-24", "time_init": "16:00", "time_end": "17:00"},
  {"date": "2024-04-25", "time_init": "13:00", "time_end": "14:00"},
  {"date": "2024-04-26", "time_init": "10:00", "time_end": "11:00"},
  {"date": "2024-04-27", "time_init": "15:00", "time_end": "16:00"},
  {"date": "2024-04-28", "time_init": "9:00", "time_end": "10:00"},
  {"date": "2024-04-29", "time_init": "14:00", "time_end": "15:00"},
  {"date": "2024-04-30", "time_init": "8:00", "time_end": "9:00"},
  {"date": "2024-04-30", "time_init": "11:00", "time_end": "12:00"},
  {"date": "2024-04-30", "time_init": "13:00", "time_end": "14:00"},
  {"date": "2024-04-30", "time_init": "16:00", "time_end": "17:00"},
  {"date": "2024-04-30", "time_init": "18:00", "time_end": "19:00"}
];

  return (
    <>
      <BookingPage actividad={{
        "id": 0,
        "name": "",
        "location": "",
        "manager_name": "",
        "manager_phone": "",
        "time_init": "8:00",
        "time_end": "22:00",
        "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        bookings: bookings
      }}/>
    </>
  )
}

export default App
