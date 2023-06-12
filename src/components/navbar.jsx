import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider/useAuth';
import { IoLogOut } from 'react-icons/io5';
import SelecioneBem2 from '../assets/3.svg';
import { useNavigate } from 'react-router-dom';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
    Button,
} from 'reactstrap';


function navbar(args) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout(); // Chama a função logout do objeto useAuth
        navigate("/login");
        window.location.reload();

    };

    return (

        <div>
            <Navbar dark expand='lg' container="lg">
                <NavbarBrand href="/dashboard">
                    <img
                        src={SelecioneBem2}
                        alt='Dashboard'
                        width={200}
                        height={40}
                    />
                </NavbarBrand>

                <NavbarToggler onClick={toggle} />

                {auth.token && (

                    <Collapse isOpen={isOpen} navbar className='align-items-center'>
                        <Nav className="me-auto" navbar>

                            <NavItem>
                                <NavLink href="/dashboard">
                                    Dashboard
                                </NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/jobopportunity/dashboard">
                                    Oportunidades
                                </NavLink>
                            </NavItem>

                            {/* <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Oportunidades
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem href="/jobopportunity">
                                        Criar nova
                                    </DropdownItem>

                                    <DropdownItem divider />

                                    <DropdownItem href='/jobopportunity/dashboard'>
                                        Dashboard
                                    </DropdownItem>

                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                            {/* <NavItem>
                                <NavLink href="/interview">Entrevista</NavLink>
                            </NavItem> */}
                            <NavItem>
                                <NavLink href="/skill">Competências</NavLink>
                            </NavItem>
                            {/* <NavItem>
                                <NavLink href="/teste">Teste</NavLink>
                            </NavItem> */}
                        </Nav>
                        <NavbarText className='d-inline-flex align-items-center'>
                            <FaUser className='mx-2' />
                            Olá, {auth.name}!

                            <IoLogOut className='mx-2 icon-logout' onClick={handleLogout} />

                        </NavbarText>
                    </Collapse>
                )}
            </Navbar>
        </div>
    )
}

export default navbar;