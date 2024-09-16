import DataTable from 'react-data-table-component';
import { useState, useEffect } from "react";
import { LOG_RECORDS_MANAGER } from '../components/log-records-manager';

function VehicleLogList({ onRefresh }) {
    const { VEHICLE_LOGS_FETCH } = LOG_RECORDS_MANAGER();
    const [vehicleLogs, setVehicleLogs] = useState([]);
    const columns = [
        {
            name: 'Log ID',
            selector: row => row.log_id,
            sortable: true,
        },
        {
            name: 'Owner Name',
            selector: row => row.vehicle.username,
            sortable: true,
        },
        {
            name: 'Plate Number',
            selector: row => row.vehicle.plate_number,
            sortable: true,
        },
        {
            name: 'Vehicle Type',
            selector: row => row.vehicle.identity,
            sortable: true,
        },
        {
            name: "Time In",
            selector: row => row.time_in,
            sortable: true,
        },
        {
            name: "Time Out",
            selector: row => row.time_out,
            sortable: true,
        }
    ];

    //Fetch all vehicle logs data
    const fetchData = async () => {
        const vehicleLogList = await VEHICLE_LOGS_FETCH();
        setVehicleLogs(vehicleLogList);
    };

    useEffect(() => {
        fetchData();
    }, [onRefresh]);

    return (
        <div>
            <DataTable
            title="Vehicle Logs"
            columns={columns}
            data={vehicleLogs}
            fixedHeader
            pagination
            responsive
            />
        </div>
    )
}

export default VehicleLogList;