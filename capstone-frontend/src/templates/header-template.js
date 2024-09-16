
function Header() {

    return (
        <div className="headerBackground d-flex align-items-center justify-content-between">
            <h5 className="logoTitle fw-bold text-white ms-4">LNU-VMS</h5>
            <nav>
                <a href="/home" className="me-5 text-decoration-none text-white">Home</a>
                <a href="/register-list" className="me-5 text-decoration-none text-white">Accounts</a>
                <a href="/register" className="me-5 text-decoration-none text-white">Register</a>
                <a href="/login" className="me-5 text-decoration-none text-white">Logout</a>
            </nav>
        </div>
    )
}

export default Header;