// import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { useState } from 'react';
// import { Outlet, Link } from 'react-router-dom';


// export default function Header() {
//     const [current, setCurrent] = useState('h');
//     const onClick = (e) => {
//         console.log('click ', e);
//         setCurrent(e.key);
//     };
//     return (
//         <div>
//             <nav className="navbar bg-body-tertiary">
//                 <form className="container-fluid justify-content-start">
//                     <Link to="/admin" className="btn btn-outline-success me-2">
//                         Admin
//                     </Link>
//                     <Link to="/" className="btn btn-outline-success me-2">
//                         Home
//                     </Link>
//                     <Link to="/signup" className="btn btn-outline-success me-2">
//                         Signup
//                     </Link>
//                     <Link to="/login" className="btn btn-outline-success me-2">
//                         Login
//                     </Link>
//                 </form>
//             </nav>
//             <div className="carousel-item">
//                 <img src="https://source.unsplash.com/800x250/?nature" className="d-block w-100" alt="..." />
//                 <div className="carousel-caption d-none d-md-block">
//                     <h5>Third slide label</h5>
//                     <p>Some representative placeholder content for the third slide.</p>
//                 </div>
//             </div>
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
//         </div>
//     );
// }

// import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
// import { Menu } from 'antd';
// import { useState } from 'react';
// import { Outlet, Link } from 'react-router-dom';


// export default function Header() {
//     const [current, setCurrent] = useState('h');
//     const onClick = (e) => {
//         console.log('click ', e);
//         setCurrent(e.key);
//     };
//     return (
//         <div>
//             <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
//                 <Menu.Item key="h" icon={<HomeTwoTone />}>
//                     <Link to="/">Home</Link>
//                 </Menu.Item>
//                 <Menu.Item key="r" icon={<EditTwoTone />}>
//                     <Link to="/signup">Signup</Link>
//                 </Menu.Item>
//                 <Menu.Item key="l" icon={<CheckCircleTwoTone />}>
//                     <Link to="/login">Login</Link>
//                 </Menu.Item>
//             </Menu>
//             <Outlet />
//             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
//         </div>
//     );
// }

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
    return (
        <>
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link href="/login">Admin</Nav.Link>
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Signup</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
