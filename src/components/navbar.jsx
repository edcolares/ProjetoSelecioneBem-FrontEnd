import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { useAuth } from '../context/AuthProvider/useAuth';
import { IoLogOut } from 'react-icons/io5';
import SelecioneBem2 from '../assets/SelecioneBem2.svg';
    
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

    const handleLogout = () => {
        auth.logout(); // Chama a função logout do objeto useAuth
    };

    return (
        <div>
            <Navbar dark expand='md' container="md">
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
                                <NavLink href="/skill">Skill</NavLink>
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
    );
}

export default navbar;