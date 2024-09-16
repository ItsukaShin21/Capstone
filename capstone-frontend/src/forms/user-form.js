import { USER_AUTHENTICATE } from "../components/user-manager";
import { TOAST_FAIL } from "../components/toasters";
import { useState } from "react";

function UserRegisterForm() {
    const { USER_REGISTER } = USER_AUTHENTICATE();
    const [state, setState] = useState({
        id_number: '',
        username: '',
        email: '',
        password: '',
        usertype:'',
    });

    //Function for password and email change event
    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    //Function for Register Event
    const handleRegister = async(event) => {
        event.preventDefault();
        if (state.password !== event.target.confirmpassword.value) {
            TOAST_FAIL("Password do not match!");
            return;
        }
        await USER_REGISTER(state.id_number, state.username, state.email, state.password, state.usertype);
    };

    return (
        <form onSubmit={ handleRegister }>
        <h3>User Register</h3>
        <label>ID number</label>
        <input type="number"
               name="id_number"
               placeholder="ID number"
               id="id_number"
               value={ state.id_number }
               onChange={ handleChange }
               required/>
        <label>Username</label>
        <input type="text"
               name="username"
               placeholder="Username"
               id="username"
               value={ state.username }
               onChange={ handleChange }
               required/>
        
        <label>Email</label>
        <input type="email"
               name="email"
               placeholder="Email"
               id="email"
               value={ state.email }
               onChange={ handleChange }
               required/>

        <label>Password</label>
        <input type="password"
               name="password"
               placeholder="Password"
               id="password"
               value={ state.password }
               onChange={ handleChange }
               required/>

        <label>Confirm Password</label>
        <input type="password"
               name="confirmpassword"
               placeholder="Confirm Password"
               required/>

        <label>User Type</label>
        <select name="usertype" value={ state.usertype } onChange={ handleChange } required>
            <option value="" defaultValue disabled>Select Type</option>
            <option value="Admin">Admin</option>
            <option value="Guard">Security Guard</option>
        </select>

        <button type="submit">REGISTER</button>
    </form>
    )
}

export default UserRegisterForm;