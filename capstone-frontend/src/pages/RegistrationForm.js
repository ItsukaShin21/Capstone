import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom'; 

function RegistrationForm() {
    const [state, setState] = useState({
        name: '',
        idNumber: '',
        password: '',
        confirmPassword: '',
    });
    const [loader, setLoader] = useState("Register");

    const handleRegister = async (event) => {
        event.preventDefault();
        
        if (state.password !== state.confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        
        setLoader("");
        
        // Simulate registration process
        // Replace this with your actual registration logic
        try {
            toast.success("Registration successful!");
        } catch (error) {
            toast.error("Registration failed.");
        }
        
        setState({
            name: '',
            idNumber: '',
            password: '',
            confirmPassword: '',
        });
        setLoader("Register");
    };

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="registrationBackground d-flex justify-content-center align-items-center">
            <ToastContainer />
            <form
  onSubmit={handleRegister}
  className="d-flex row align-content-center registration-container justify-content-center p-5 rounded-5"
  style={{ backgroundColor: '#007bff' }} 
>
  <h1 className="text-center fw-semibold mb-4" style={{ color: '#ffffff' }}>Register</h1>
                <hr />
                <input 
                    type="text" 
                    name="name"
                    className="registrationTextbox border-0 mt-3 rounded-3"
                    placeholder="Name"
                    id="name"
                    value={state.name}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="text" 
                    name="idNumber"
                    className="registrationTextbox border-0 mt-3 rounded-3"
                    placeholder="ID Number"
                    id="idNumber"
                    value={state.idNumber}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    name="password"
                    maxLength={12}
                    className="registrationTextbox border-0 mt-4 rounded-3"
                    placeholder="Password"
                    id="password"
                    value={state.password}
                    onChange={handleChange} 
                    required
                />
                <input 
                    type="password" 
                    name="confirmPassword"
                    maxLength={12}
                    className="registrationTextbox border-0 mt-4 rounded-3"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleChange} 
                    required
                />
                <button 
                    type="submit"
                    className="registrationButton border-0 mt-5 w-50 rounded-5"
                    style={{ color: 'black' }}
                    disabled={loader === ""}
                >
                    {loader === "" && <Spinner animation="border" variant="white" />}
                    {loader}
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
