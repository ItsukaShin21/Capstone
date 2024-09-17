import { USER_AUTHENTICATE } from "../components/user-manager";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";
import { Link } from 'react-router-dom'; // Used for the sign up link


function LoginPage() {
    const { USER_LOGIN } = USER_AUTHENTICATE();
    const [loader, setLoader] = useState("Login");
    const [state, setState] = useState({
        name: '',
        password: '',
    });

    //Function for Login event
    const handleLogin = async(event) => {
        event.preventDefault();
        setLoader("");
        await USER_LOGIN(state.name, state.password);
        setState((prevState) => ({
            ...prevState,
            password: '',
        }));
        setLoader("Login");
    };

    //Function for password and name change event
    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="loginBackground d-flex justify-content-center align-items-center">
        <ToastContainer />
            <form onSubmit={ handleLogin } className="d-flex row align-content-center login-container justify-content-center bg-white p-5 rounded-5">
            <h1 className="text-center fw-semibold mb-4">Login</h1>
            <hr />
                <input type="name" 
                       name="name"
                       className="loginTextbox border-0 mt-3 rounded-3"
                       placeholder="Name"
                       id="name"
                       value={ state.name }
                       onChange={ handleChange } 
                       required/>

                <input type="password" 
                       name="password"
                       maxLength={12}
                       className="loginTextbox border-0 mt-4 rounded-3"
                       placeholder="Password"
                       id="password"
                       value={ state.password }
                       onChange={ handleChange } 
                       required/>

                <button type="submit"
                        className="loginButton border-0 mt-5 w-50 rounded-5 text-white"
                        disabled={loader === ""}>
                            {loader === "" && <Spinner animation="border" variant="white" />}
                            {loader}
                        </button>
                    {/* Sign Up LinK*/}
                <div className="text-center mt-3">
                    <p className="mb-0">Don't have an account? <Link to="/registrationform" className="text-primary">Sign up</Link></p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;