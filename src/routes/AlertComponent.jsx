import React, { useState, useEffect } from 'react';
import { Alert } from 'reactstrap';

const AlertComponent = ({ color, message }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div>
            <Alert color={color} isOpen={visible}>
                {message}
            </Alert>
        </div>
    );
};

export default AlertComponent;