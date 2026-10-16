import React from "react";

const Persons = ({ filteredPersons, handleDelete }) => {
    return (
    <div>
        {
        filteredPersons.map(person => (
            <div key={person.name}>
                <p>{person.name}, {person.number}</p>
                <button onClick={() => handleDelete(person.id)}>delete</button>
            </div>)
            )
        }
    </div>
    )
}

export default Persons;