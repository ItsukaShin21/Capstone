import DataTable from 'react-data-table-component';
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { USER_AUTHENTICATE } from "../components/user-manager";
import EditUserModal from '../modals/edit-user-modal';
import ConfirmationModal from '../modals/delete-confirmation-modal';

function UsersList() {
    const { USER_FETCH, USER_DELETE } = USER_AUTHENTICATE();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setDeleteModal] = useState(false);

    const columns = [
        {
            name: 'ID',
            selector: row => row.id_number,
            sortable: true,
        },
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'User Type',
            selector: row => row.user_type,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <>
                    <button onClick={() => toggleModal(row.id_number)}>Edit</button>
                    <button onClick={() => toggleDeleteModal(row.id_number)}>Delete</button>
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    //Function for edit modal event
    const toggleModal = (id_number) => {
        setSelectedUser(id_number);
        setShowModal(!showModal);
    };

    //Function for delete modal event
    const toggleDeleteModal = (id_number) => {
        setSelectedUser(id_number);
        setDeleteModal(!showDeleteModal);
    };

    //Fetch the users data
    useEffect(() => {
        USER_FETCH().then(userList => {
            setUsers(userList);
        });
    }, []);

    return (
        <div>
            <ToastContainer />
            <DataTable
                title="Users List"
                columns={columns}
                data={users}
                fixedHeader
                pagination
                responsive
            />

            {showModal &&
                <EditUserModal userId={ selectedUser } 
                               onClose={() => {
                                    setShowModal(false);
                                    USER_FETCH().then(userList => {
                                        setUsers(userList);
                                    });    
                               }}/>
            }

            {showDeleteModal &&
                <ConfirmationModal onDelete={ async() => {
                                        setDeleteModal(false);
                                        await USER_DELETE( selectedUser );
                                        USER_FETCH().then(userList => {
                                            setUsers(userList);
                                        });  
                }}/>}
        </div>
    )
}

export default UsersList;