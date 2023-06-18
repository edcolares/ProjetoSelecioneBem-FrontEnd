import React, { useEffect, useState } from 'react'
import { Badge } from 'reactstrap'
import fetch from '../../services/config';

const getTotalInterviewByJobOpportunity = ({ idJobOpportunity }) => {

    const [totalInterview, setTotalInterview] = useState('');

    /**
 * Busca o total de entrevistas de uma JobOpportunity
 */
    const getTotalInterview = async () => {
        try {
            const response = await fetch.get(`/interview/total/${idJobOpportunity}`);
            const data = response.data;
            setTotalInterview(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTotalInterview();
    }, []);


    return (
        <Badge color='info' className='m-0 text-white px-2 rounded fw-bold'>{totalInterview.interview_count}</Badge>
    )
}

export default getTotalInterviewByJobOpportunity