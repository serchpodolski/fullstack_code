import React, { useState } from "react";
import { Weather, Visibility, type NewDiaryEntry } from "../types";

interface NewDiaryFormProps {
    onCreate: (entry: NewDiaryEntry) => void;
}

const NewDiaryForm = ({ onCreate }: NewDiaryFormProps) => {
    const [date, setDate] = useState('')
    const [weather, setWeather] = useState<Weather>(Weather.Sunny)
    const [visibility, setVisibility] = useState<Visibility>(Visibility.Good)
    const [comment, setComment] = useState('')

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault()
        const newEntry: NewDiaryEntry = {
            date,
            weather,
            visibility,
            comment: comment || undefined
        }
        onCreate(newEntry)
        setDate('')
        setWeather(Weather.Sunny)
        setVisibility(Visibility.Good)
        setComment('')
    }

    return (
        <div>
            <h2>New diary entry</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                {/* <div>
                    <label htmlFor="weather">Weather</label>
                    <select
                        value={weather}
                        onChange={(e) => setWeather(e.target.value as Weather)}
                    >
                        <option value={Weather.Sunny}>Sunny</option>
                        <option value={Weather.Rainy}>Rainy</option>
                        <option value={Weather.Cloudy}>Cloudy</option>
                        <option value={Weather.Windy}>Windy</option>
                        <option value={Weather.Stormy}>Stormy</option>
                    </select>
                </div> */}
                <div>
                    <span>Weather:</span>
                    <label>
                        <input 
                        type="radio" 
                        name="weather" 
                        value={Weather.Sunny} 
                        checked={weather === Weather.Sunny} 
                        onChange={() => setWeather(Weather.Sunny)} 
                        />
                        Sunny
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="weather" 
                        value={Weather.Rainy} 
                        checked={weather === Weather.Rainy} 
                        onChange={() => setWeather(Weather.Rainy)} 
                        />
                        Rainy
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="weather" 
                        value={Weather.Cloudy} 
                        checked={weather === Weather.Cloudy} 
                        onChange={() => setWeather(Weather.Cloudy)} 
                        />
                        Cloudy
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="weather" 
                        value={Weather.Windy} 
                        checked={weather === Weather.Windy} 
                        onChange={() => setWeather(Weather.Windy)} 
                        />
                        Windy
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="weather" 
                        value={Weather.Stormy} 
                        checked={weather === Weather.Stormy} 
                        onChange={() => setWeather(Weather.Stormy)} 
                        />
                        Stormy
                    </label>
                </div>
                {/* <div>
                    <label htmlFor="visibility">Visibility</label>
                    <select
                        value={visibility}
                        onChange={(e) => setVisibility(e.target.value as Visibility)}
                    >
                        <option value={Visibility.Great}>Great</option>
                        <option value={Visibility.Good}>Good</option>
                        <option value={Visibility.Ok}>Ok</option>
                        <option value={Visibility.Poor}>Poor</option>
                    </select>
                </div> */}
                <div>
                    <span>Visibility:</span>
                    <label>
                        <input 
                        type="radio" 
                        name="visibility" 
                        value={Visibility.Great} 
                        checked={visibility === Visibility.Great} 
                        onChange={() => setVisibility(Visibility.Great)} 
                        />
                        Great
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="visibility" 
                        value={Visibility.Good} 
                        checked={visibility === Visibility.Good} 
                        onChange={() => setVisibility(Visibility.Good)} 
                        />
                        Good
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="visibility" 
                        value={Visibility.Ok} 
                        checked={visibility === Visibility.Ok} 
                        onChange={() => setVisibility(Visibility.Ok)} 
                        />
                        Ok
                    </label>
                    <label>
                        <input 
                        type="radio" 
                        name="visibility" 
                        value={Visibility.Poor} 
                        checked={visibility === Visibility.Poor} 
                        onChange={() => setVisibility(Visibility.Poor)} 
                        />
                        Poor
                    </label>
                </div>
                <div>
                    <label htmlFor="comment">Comment</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                <button>Save</button>
            </form>
        </div>
    )
}

export default NewDiaryForm;