import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { ToastContainer } from "react-toastify";
import UsersList from '../data-tables/users-table';
import VehiclesList from '../data-tables/vehicles-table';
import Header from '../templates/header-template';

function RegisterListPage() {

    return (
        <div className="registerListBg">
            <ToastContainer />
            <Header />
            <Tabs defaultActiveKey="users" fill>
                <Tab eventKey="users" title="Users">
                    <div className="userTable">
                        <UsersList />
                    </div>
                </Tab>
                <Tab eventKey="vehicles" title="Vehicles">
                    <VehiclesList />
                </Tab>
            </Tabs>
        </div>
    )
}

export default RegisterListPage;