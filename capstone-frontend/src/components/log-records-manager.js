import BACKEND_API from "../backend-api/api";

export const LOG_RECORDS_MANAGER = () => {

    //Function for adding a record to student logs
    const ADD_RECORD_LOG = async(plate_number) => {
        await BACKEND_API.post("/add-record-log", {
            plate_number
        });
    }

    //Function for fetching all vehicle logs
    const VEHICLE_LOGS_FETCH = async() => {
        const response = await BACKEND_API.get("/fetch-vehicle-logs");
        return response.data.vehicleLogsList;
    }

    return { ADD_RECORD_LOG, VEHICLE_LOGS_FETCH };
}