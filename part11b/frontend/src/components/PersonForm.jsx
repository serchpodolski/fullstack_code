import React from "react";

const PersonForm = ({ addPerson, draftName, handleChange, draftNumber}) => {
  return (
    <form onSubmit={addPerson}>
        <div>
            name: <input 
            value={draftName}
            onChange={handleChange}
            name="name"
            type="text"
            />
        </div>
        <div>
            number: <input 
                value={draftNumber}
                onChange={handleChange}
                name="number"
                type="tel"
            />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm;