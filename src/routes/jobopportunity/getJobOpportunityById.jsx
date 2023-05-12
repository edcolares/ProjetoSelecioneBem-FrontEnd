import React from 'react'
import fetch from '../../axios/config';
import React, { useState, useEffect } from 'react'

const getJobOpportunityById = () => {

    /**
     * Busca a oportunidade conforme ID
     */
    const { idJobOpportunity } = useParams();
    const [jobopportunity, setJobOpportunity] = useState([]);
    const getJobOpportunityById = async () => {
        try {
            const response = await fetch.get(`/jobopportunity/${idJobOpportunity}`);
            const data = response.data;
            setJobOpportunity(data);
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getJobOpportunityById();
    }, []);


    return (
        <div>
            {jobopportunity.map((opportunity) => (
                <p>{JSON.stringify(opportunity)}</p>
            ))}
        </div>
    )
}

export default getJobOpportunityById