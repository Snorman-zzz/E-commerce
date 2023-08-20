import React, { useEffect, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './List.scss';

const List = () => {
    const [featurePanels, setFeaturePanels] = useState([]);

    useEffect(() => {
        fetch(`http://api-lulu.hibitbyte.com/product/prod10550089?mykey=qMjeXRfkhG6Lu8Wjr7YXksPn4jYIWXviarwRDQnFxQJMFpg5/c7a5ImEXqkdxO2yL1vX1bvZXjScIL/zxfAHpQ==`)
            .then(response => response.json())
            .then(data => {
                setFeaturePanels(data.rs.featurePanels);
            })
            .catch(error => console.error('An error occurred:', error));
    }, []);


    return (
        <div className="descriptionList">
            {featurePanels.map((panel, index) => (
                <Accordion key={index} className={panel.isPanel ? '' : 'non-expandable'}>
                    <AccordionSummary
                        expandIcon={panel.isPanel ? <ExpandMoreIcon /> : null}
                        aria-controls={`panel${index}-content`}
                        id={`panel${index}-header`}
                    >
                        <img
                            src={panel.iconPath}
                            alt=""
                            style={{ marginRight: '8px', width: '36px', height: '36px' }}
                        />

                        <Typography
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: 600,
                                lineHeight: '2.5rem',
                                fontFamily: 'Calibre, "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif'
                            }}
                        >
                            {panel.title.replace('(Click to Expand)', '')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="accordion-content">
                            {panel.content && panel.content.map((item, i) => (
                                <div key={i} className="accordion-item">
                                    <Typography>{item}</Typography>
                                </div>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default List;
