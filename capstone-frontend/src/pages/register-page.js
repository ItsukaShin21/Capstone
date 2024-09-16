import { useState } from "react";
import { ToastContainer } from "react-toastify";
import UserRegisterForm from "../forms/user-form";
import VehicleRegisterForm from "../forms/vehicle-form";
import Header from '../templates/header-template';

function RegisterPage() {
    const [registerType, setRegisterType] = useState('');

    // Function for input change event
    const handleChange = (event) => {
        setRegisterType(event.target.value);
    };

    return (
        <div>
            <ToastContainer />
            <Header />
            <h1>Register</h1>

            <label>Register Type</label>
            <select name="usertype" value={ registerType } onChange={ handleChange } required>
            <option value="" defaultValue>Select Type</option>
            <option value="User">User</option>
            <option value="Vehicle">Vehicle</option>
        </select>

        {registerType === "User" && <UserRegisterForm />}
        {registerType === "Vehicle" && <VehicleRegisterForm />}

        </div>
    )
}

export default RegisterPage;