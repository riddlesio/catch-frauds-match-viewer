import React       from 'react';
import component   from 'omniscient';

const lifeCycle = {

    getInitialState() {

        return {
            errorMessage: null,
            lastPropState: 0,
            isVisible: false,
        };
    },

    componentWillReceiveProps(nextProps) {
        const { error, currentState } = nextProps;
        const state = this.state;
        const { errorMessage, lastPropState, isVisible } = state;

        let newState = state;

        if (error !== errorMessage) {
            newState.errorMessage = error;
            newState.lastPropState = currentState;
            newState.isVisible = true;
        }

        if (isVisible && (currentState - 10) > lastPropState) {
            newState.isVisible = false;
        }

        if (state !== newState) {
            this.setState(newState);
        }
    },
}

const ErrorLog = component('ErrorLog', lifeCycle, function () {

    const { errorMessage, isVisible } = this.state;

    const error = (
        <g>
            <rect width="1700" height="80" transform="translate(-840,-53)" style={{ opacity: 0.2 }}/>
            <text textAnchor="middle" className="ErrorLog-error">
                { errorMessage }
            </text>
        </g>
    );

    return (
        <g transform="translate(960,965)">
            { isVisible && errorMessage ? error : null }
        </g>
    );
});

export default ErrorLog;
