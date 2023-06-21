import { Button, Col, PopoverHeader, PopoverBody, UncontrolledPopover, Card, CardTitle, CardBody, CardHeader } from 'reactstrap';
import { IoInformationCircleOutline } from 'react-icons/io5';

const jobOpportunity = ({ opportunity, department }) => {

    return (

        <Col>
            <h5 className='fw-bold text-uppercase'>
                {opportunity.jobCode} - {opportunity.title}
                <Button
                    id="PopoverFocus"
                    type="button"
                    color='info'
                    size='sm'
                    className='mx-2 m-0 font-12px' >
                    <IoInformationCircleOutline className='me-2'/>Mais detalhes
                </Button>
            </h5>
            <UncontrolledPopover
                placement="bottom-
                end"
                target="PopoverFocus"
                trigger="focus" >
                <PopoverHeader>
                    Informações da oportunidade
                </PopoverHeader>
                <PopoverBody className='p-2'>
                    <p className='lh-1'>Departamento: {department.name}</p>
                    <p className='lh-1'>Gerente: {department.manager}</p>
                    <p className='lh-1'>Nível: {opportunity.level}</p>
                    <p className='lh-1'>Abertura: {opportunity.openingDate}</p>
                    <p className='lh-1'>Conclusão: {opportunity.expectedDate}</p>
                    {/* {format(new Date(jobOpportunity.openingDate), 'dd/MM/yyyy')} */}
                </PopoverBody>
            </UncontrolledPopover>

        </Col>
    )
}

export default jobOpportunity