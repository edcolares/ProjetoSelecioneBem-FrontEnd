import { Button, Col, PopoverHeader, PopoverBody, UncontrolledPopover } from 'reactstrap';
import { IoInformationCircleOutline } from 'react-icons/io5';

const jobOpportunity = ({ opportunity, department }) => {

    return (

        <Col>
            <h4>
                (CÓDIGO DA VAGA) - {opportunity.title}
                <Button
                    id="PopoverFocus"
                    type="button"
                    color='none'
                    size='sm'
                    className='mx-2 m-0' >
                    <IoInformationCircleOutline />
                </Button>
            </h4>
            <UncontrolledPopover
                placement="bottom-end"
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