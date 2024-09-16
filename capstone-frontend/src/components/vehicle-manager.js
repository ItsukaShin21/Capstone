import BACKEND_API from "../backend-api/api";
import { TOAST_SUCCESS, TOAST_FAIL } from "./toasters";

export const VEHICLE_MANAGER = () => {

    //Function for Registering a Vehicle
    const VEHICLE_REGISTER = async(plate_number, username, contactnumber, identity) => {
        await BACKEND_API.post("/vehicle-register", {
            plate_number,
            username,
            contactnumber,
            identity,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("Vehicle is now registered");
            } else {
                TOAST_FAIL("Registration Failed");
            }
        })
    };

    //Function for fetching all vehicles
    const VEHICLE_FETCH = async() => {
        const response = await BACKEND_API.get("fetch-vehicles");
        return response.data.vehicleList;
    }

    //Function for fetching a specific vehicle using the id
    const VEHICLE_INFO_FETCH = async(plate_number) => {
        const response = await BACKEND_API.get(`/fetch-vehicle/${ plate_number }`);
        return response.data.vehicleDetails;
    }

    //Function for updating the details of a vehicle
    const VEHICLE_UPDATE = async(plate_number, username, contactnumber, identity) => {
        await BACKEND_API.post("/update-vehicle", {
            plate_number,
            username,
            contactnumber,
            identity,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("Vehicle datails are now updated");
            } else {
                TOAST_FAIL("Update Process Fail");
            }
        });
    }

    //Function for deleting a vehicle
    const VEHICLE_DELETE = async(plate_number) => {
        await BACKEND_API.post("/delete-vehicle", {
            plate_number,
        }).then(response => {
            if(response.data.message === "success") {
                TOAST_SUCCESS("Vehicle has been deleted");
            } else {
                TOAST_FAIL("Delete Process Fail");
            }
        });
    }

    return { VEHICLE_REGISTER, VEHICLE_FETCH, VEHICLE_INFO_FETCH, VEHICLE_UPDATE, VEHICLE_DELETE };
}