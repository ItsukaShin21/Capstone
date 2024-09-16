import DataTable from 'react-data-table-component';
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { VEHICLE_MANAGER } from '../components/vehicle-manager';
import EditVehicleModal from '../modals/edit-vehicle-modal';
import ConfirmationModal from '../modals/delete-confirmation-modal';

function VehiclesList() {
    const { VEHICLE_FETCH, VEHICLE_DELETE } = VEHICLE_MANAGER();
    const [vehicles, setVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);

    const columns = [
        {
            name: 'Plate Number',
            selector: row => row.plate_number,
            sortable: true,
        },
        {
            name: 'Owner',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Identity',
            selector: row => row.identity,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button onClick={() => toggleModal(row.vehicle_rfid_uid)}>Edit</button>
                    <button onClick={() => toggleDeleteModal(row.vehicle_rfid_uid)}>Delete</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    //Function for edit modal event
    const toggleModal = (id) => {
        setSelectedVehicle(id);
        setShowModal(!showModal);
    };

    //Function for delete modal event
    const toggleDeleteModal = (id) => {
        setSelectedVehicle(id);
        setDeleteModal(!showDeleteModal);
    };

    //Fetch the vehicles data
    useEffect(() => {
        VEHICLE_FETCH().then(vehicleList => {
            setVehicles(vehicleList);
        });
    }, []);

    return (
        <div>
            <ToastContainer />
        <DataTable
            title="Vehicle List"
            columns={columns}
            data={vehicles}
            fixedHeader
            pagination
            responsive
        />

        {showModal &&
            <EditVehicleModal vehicleId={ selectedVehicle } 
                              onClose={() => {
                                    setShowModal(false);
                                    VEHICLE_FETCH().then(vehicleList => {
                                        setVehicles(vehicleList);
                                    });    
                               }}/>
        }

        {showDeleteModal &&
                <ConfirmationModal onDelete={ async() => {
                                        setDeleteModal(false);
                                        await VEHICLE_DELETE( selectedVehicle );
                                        VEHICLE_FETCH().then(vehicleList => {
                                            setVehicles(vehicleList);
                                        });  
         }}/>}
        </div>
    )
}

export default VehiclesList;