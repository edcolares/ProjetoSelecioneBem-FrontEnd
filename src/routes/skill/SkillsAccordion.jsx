import { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Badge, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { BsFillTrash3Fill } from 'react-icons/bs';

export default function SkillsAccordion({ skills, removeSkill }) {
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
                <ListGroupItem key={index} className='d-flex justify-content-between align-items-center'>
                  {skill.name}
                  <Button size='sm' className='bg-danger' style={{
                    border: 'none'
                  }} onClick={() => removeSkill(skill.id)}>
                    <BsFillTrash3Fill />
                  </Button>

                </ListGroupItem>
              ))}
            </ListGroup>
          </AccordionBody>
        </AccordionItem>
      </Accordion>

    ));
  };

  return <div>{renderSkillsByType()}</div>;
};