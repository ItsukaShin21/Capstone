import { useState } from "react";
import { VEHICLE_MANAGER } from "../components/vehicle-manager";

function VehicleRegisterForm() {
    const { VEHICLE_REGISTER } = VEHICLE_MANAGER();
    const [state, setState] = useState({
        plate_number: '',
        username: '',
        identity: '',
    });

    //Function for password and email change event
    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    //Function for Register event
    const handleRegister = async(event) => {
        event.preventDefault();
        await VEHICLE_REGISTER(
            state.plate_number,
            state.username,
            state.identity,
        );
    };

    return (
        <form onSubmit={ handleRegister }>
            <h3>Vehicle Register</h3>
            <label>Plate Number</label>
            <input type="text"
                   name="plate_number"
                   placeholder="Plate Number"
                   id="plate_number"
                   value={ state.plate_number }
                   onChange={ handleChange }
                   required/>            
            <label>Name</label>
            <input type="text"
                   name="username"
                   placeholder="Owner Name"
                   id="username"
                   value={ state.username }
                   onChange={ handleChange }
                   required/>
            <label>Identity</label>
            <input type="text"
                   name="identity"
                   placeholder="Identity"
                   id="identity"
                   value={ state.identity }
                   onChange={ handleChange }
                   required/>

            <button type="submit">REGISTER</button>
        </form>
    )
}

export default VehicleRegisterForm;