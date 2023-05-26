import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import fetch from '../../axios/config';
import { AiFillFilePdf } from 'react-icons/ai';
import { Button } from 'reactstrap';


pdfMake.vfs = pdfFonts.pdfMake.vfs;

const reportJobOpportunity = () => {
    const { idJobOpportunity } = useParams();
    const [opportunity, setOpportunity] = useState([]);
    const [jobopportunitySkills, setJobOpportunitySkills] = useState([]);
    const [department, setDepartment] = useState([]);
    const [interviews, setInterviews] = useState([]);

    const getJobOpportunityWithInterview = async () => {
        try {
            const response = await fetch.get(
                `/jobopportunity/report/${idJobOpportunity}`
            );
            const data = response.data[0];
            setOpportunity(data);
            setJobOpportunitySkills(data.jobopportunitySkills);
            setDepartment(data.department);
            setInterviews(data.interviews);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getJobOpportunityWithInterview();
    }, []);

    const generatePDF = () => {
        const docDefinition = {
            content: [
                {
                    text: 'RELATÓRIO DA OPORTUNIDADE', style: 'header', width: '100%',
                },

                {
                    style: 'tableTopics',
                    table: {
                        widths: ['100%'],
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho
                            [{ text: 'OPORTUNIDADE DE EMPREGO', style: 'subheader' }],
                        ],
                    },
                    layout: 'headerLineOnly'
                },

                // Informações sobre OPORTUNIDADE
                {
                    style: 'table',
                    table: {
                        widths: ['30%', '70%'],
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho
                            // [{ text: 'OPORTUNIDADE DE EMPREGO', colSpan: 2, style: 'subheader' }, {}],
                            // Linhas de dados
                            [{ text: 'Descrição', bold: true }, opportunity.title],
                            [{ text: 'Nível', bold: true }, opportunity.level],
                            [{ text: 'Departamento', bold: true }, `${department.name} - ${department.manager}`],
                            [{ text: 'Data abertura', bold: true }, `${format(new Date(opportunity.openingDate), 'dd/MM/yyyy')}`],
                            [{ text: 'Previsão encerramento', bold: true }, `${format(new Date(opportunity.expectedDate), 'dd/MM/yyyy')}`],
                            [{ text: 'Fechamento', bold: true }, opportunity.closingDate ? format(new Date(opportunity.closingDate), 'dd/MM/yyyy') : { text: 'Oportunidade aberta' }],
                        ],
                    },
                    layout: 'noBorders'
                },


                // Informações de SKILLS
                {
                    style: 'tableTopics',
                    table: {
                        widths: ['100%'],
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho
                            [{ text: 'RELAÇÃO DE SKILLS E SEUS PESOS', style: 'subheader' }],
                        ],
                    },
                    layout: 'headerLineOnly'
                },

                {
                    style: 'table',
                    table: {
                        widths: ['40%', '30%', '30% '],
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho colSpan: 2, 
                            [{ text: 'Skill', bold: true, italics: true }, { text: 'Tipo', bold: true, italics: true }, { text: 'Peso', bold: true, italics: true }],
                            // Linhas de dados
                            ...jobopportunitySkills.map((jobopportunitySkill) =>
                                [{ text: jobopportunitySkill.skill.name },
                                { text: jobopportunitySkill.skill.type },
                                { text: jobopportunitySkill.weightingFactor.toString() }],
                            ),
                        ],
                    },
                    layout: 'lightHorizontalLines'
                },

                // Informações de ENTREVISTAS

                {
                    style: 'tableTopics',
                    table: {
                        widths: ['100%'],
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho
                            [{ text: 'RELAÇÃO DE ENTREVISTAS', style: 'subheader' }],
                        ],
                    },
                    layout: 'headerLineOnly'
                },

                {
                    style: 'table',
                    table: {
                        widths: ['34%', '12%', '36%', '13%'],
                        // heights: 40,
                        headerRows: 1,
                        body: [
                            // Linha de cabeçalho colSpan: 2, 
                            [
                                { text: 'CANDIDATO', bold: true, italics: true },
                                { text: 'DATA', bold: true, italics: true },
                                { text: 'PONTUAÇÃO DAS SKILLS', bold: true, italics: true, alignment: 'center' },
                                { text: 'PONTUAÇÃO', bold: true, italics: true, alignment: 'center' }
                            ],
                            // Linhas de dados
                            ...interviews.map((interview) => [
                                { text: interview.candidate.name, style: 'candidate' },
                                { text: format(new Date(interview.startDate), 'dd/MM/yyyy'), style: 'candidate' },
                                {
                                    table: {
                                        widths: ['92%', '8%'],
                                        headerRows: 1,
                                        body:
                                            interview.ratings.map((rating) => [
                                                { text: rating.skill.name },
                                                { text: rating.score, alignment: 'center' }
                                            ]),
                                    },
                                    layout: 'noBorders'
                                },
                                { text: interview.totalScore, style: 'score' }
                            ],
                            ),
                        ],
                    },
                    layout: 'lightHorizontalLines'
                },
            ],

            // Estilos para uso
            styles: {
                header: {
                    fontSize: 16,
                    bold: true,
                    margin: [0, 0, 0, 15],
                    alignment: 'center',
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                    margin: [5, 0, 0, 0],
                    fillColor: '#64B7CC',
                },
                observation: {
                    fontSize: 12,
                    margin: [20, 0, 0, 15],
                },
                candidate: {
                    fontSize: 10,
                    margin: [0, 0, 0, 0],
                },
                score: {
                    fontSize: 20,
                    bold: true,
                    margin: [0, 0, 0, 0],
                    color: 'green',
                    alignment: 'center',
                },
                content: {
                    fontSize: 12,
                    margin: [20, 0, 0, 0],
                },
                tableTopics: {
                    fontSize: 12,
                    bold: true,
                    margin: [0, 10, 0, 5],
                },
                table: {
                    fontSize: 10,
                    margin: [0, 0, 0, 5],
                    color: 'black',
                }
            },
        };

        pdfMake.createPdf(docDefinition).download(`${opportunity.title.replace(/\s/g, '_')}_report.pdf`);
    };

    return (
        <div>
            <Button
                onClick={generatePDF}
                color='danger'
                size="sm"
            >  <AiFillFilePdf /> PDF</Button>
        </div>
    );
};

export default reportJobOpportunity;
