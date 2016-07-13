import React       from 'react';
import component   from 'omniscient';

const ErrorLog = component('ErrorLog', function (props) {

    const { error } = props;

    if (!error) {
        return null;
    }

    return (
        <g transform="translate(960,965)">
            <g>
                <rect
                    width="1700"
                    height="80"
                    transform="translate(-840,-53)"
                    style={{ fill: '#FF5552', opacity: 0.2 }}
                />
                <text textAnchor="middle" className="ErrorLog-error">
                    { error }
                </text>
            </g>
        </g>
    );
});

export default ErrorLog;
