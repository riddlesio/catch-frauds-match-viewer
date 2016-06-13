import React       from 'react';
import component   from 'omniscient';

const ErrorLog = component('ErrorLog', function (props) {

    const { error } = props;

    console.log(error);

    return (
        <text transform={ `translate(200,880)` }>
            { error }
        </text>
    );
});

export default ErrorLog;
