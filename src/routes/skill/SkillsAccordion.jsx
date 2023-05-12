import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Card, CardBody, CardHeader, Collapse, ListGroup, ListGroupItem } from 'reactstrap';

export default function SkillsAccordion({ skills }) {
  const [isOpen, setIsOpen] = useState(false);

  // const toggleAccordion = () => {
  //   setIsOpen(!isOpen);
  // };

  //   const [open, setOpen] = useState();
  // const toggle = (type) => {
  //     if (open === type) {
  //         setOpen();
  //     } else {
  //         setOpen(type);
  //     }
  // };

  const [open, setOpen] = useState('');
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const renderSkillsByType = () => {
    // Agrupa as habilidades pelo tipo
    const skillsByType = skills.reduce((accumulator, skill) => {
      accumulator[skill.type] = accumulator[skill.type] || [];
      accumulator[skill.type].push(skill);
      return accumulator;
    }, {});

    // Renderiza cada tipo de habilidade com suas respectivas habilidades
    return Object.entries(skillsByType).map(([type, skills]) => (

      <Accordion key={type} xs={12} md={12} open={open} toggle={toggle} className="bg-white py-2">
        <AccordionItem key={type} className='bg-light'>
          <AccordionHeader targetId={type} className='primary mb-0' tag={'h6'} >
            {type}
            <Badge color="primary" className="mx-2">
              {skills.length}
            </Badge>
          </AccordionHeader>
          <AccordionBody accordionId={type}>
            <ListGroup>
              {skills.map((skill, index) => (
                <ListGroupItem key={index}>{skill.name}</ListGroupItem>
              ))}
            </ListGroup>
          </AccordionBody>
        </AccordionItem>
      </Accordion>

    ));
  };

  return <div>{renderSkillsByType()}</div>;
};