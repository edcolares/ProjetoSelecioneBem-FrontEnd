import React, { useState } from 'react';

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
} from 'reactstrap';


function navbar(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="primary" dark expand='md' container="md">
                <NavbarBrand href="/">SelecioneBem
                    {/* <img
                        src='../assets/SelecioneBem2.svg'
                        alt='Projeto Selecionebem'
                        width={30}
                        height={150}
                    /> */}
                </NavbarBrand>
                
                <NavbarToggler onClick={toggle} />

                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/interview">Entrevista</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/dashboard">
                                Dashboard
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Oportunidades
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem href="/newjobopportunity">
                                    Criar nova
                                </DropdownItem>
                                <DropdownItem href='/jobopportunity'>Ver todas</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                    <NavbarText>Simple Text</NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default navbar;