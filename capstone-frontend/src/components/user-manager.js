import { useNavigate } from "react-router-dom";
import BACKEND_API from "../backend-api/api";
import { SetAuthToken } from "../backend-api/api";
import { TOAST_SUCCESS, TOAST_FAIL } from "./toasters";

export const USER_AUTHENTICATE = () => {
    const navigate = useNavigate();

    //Function for Logging In the user
    const USER_LOGIN = async(email, password) => {
        await BACKEND_API.post("/login", {
            email,
            password
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("Login Successfully");
                SetAuthToken(response.data.token);
                navigate("/home");
            } else {
                TOAST_FAIL("Try Again");
            }
        })
    };

    //Function for Registering a User
    const USER_REGISTER = async(id_number, username, email, password, user_type) => {
        await BACKEND_API.post("/user-register", {
            id_number,
            username,
            email,
            password,
            user_type,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("Register Successfully");
                navigate("/login");
            } else {
                TOAST_FAIL("Register Process Fail");
            }
        })
    };

    //Function for fetching all users
    const USER_FETCH = async() => {
        const response = await BACKEND_API.get("fetch-users");
        return response.data.userList;
    };

    //Function for fetching a specific user using the id
    const USER_INFO_FETCH = async(userId) => {
        const response = await BACKEND_API.get(`/fetch-user/${ userId }`);
        return response.data.userDetails;
    }

    //Function for updating the details of a user
    const USER_UPDATE = async(id_number, username, email, password, user_type) => {
        await BACKEND_API.post("/update-user", {
            id_number,
            username,
            email,
            password,
            user_type,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("User datails are now updated");
            } else {
                TOAST_FAIL("Update Process Fail");
            }
        });
    }

    //Function for deleting a user
    const USER_DELETE = async(id_number) => {
        await BACKEND_API.post("/delete-user", {
            id_number,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("User has been deleted");
            } else {
                TOAST_FAIL("Delete Process Fail");
            }
        });
    }

    return { USER_LOGIN, USER_REGISTER, USER_FETCH, USER_INFO_FETCH, USER_UPDATE, USER_DELETE };
}