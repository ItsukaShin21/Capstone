import { USER_AUTHENTICATE } from "../components/user-manager";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

function LoginPage() {
    const { USER_LOGIN } = USER_AUTHENTICATE();
    const [loader, setLoader] = useState("Login");
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    //Function for Login event
    const handleLogin = async(event) => {
        event.preventDefault();
        setLoader("");
        await USER_LOGIN(state.email, state.password);
        setState((prevState) => ({
            ...prevState,
            password: '',
        }));
        setLoader("Login");
    };

    //Function for password and email change event
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
            <p className="text-center">Sign in to your account</p>
            <hr />
                <input type="email" 
                       name="email"
                       className="loginTextbox border-0 mt-3 rounded-3"
                       placeholder="Email"
                       id="email"
                       value={ state.email }
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
            </form>
        </div>
    )
}

export default LoginPage;