import _ from 'lodash';
import { event } from '@riddles/match-viewer';

const { PlaybackEvent } = event;

const SimpleGameLoopMixin = {

    applyTo: function (context) {

        const mixin = {

            /**
             * Moves the game forward by one step
             */
            moveForward: function () {

                const { currentState } = this.getState();

                if (currentState !== this.states.length - 1) {
                    this.triggerStateChange(currentState + 1);
                } else {
                    this.pause();
                }
            },

            /**
             * Moves the game forward by one round
             */
            roundForward: function () {

                var currentRound,
                    nextState,
                    self = this,
                    states = self.states,
                    { currentState } = self.getState();

                currentRound = states[currentState].round;
                nextState    = _.findIndex(states, { round: currentRound + 1 });

                if (-1 === nextState) {

                    nextState = states.length - 1;
                }

                self.triggerStateChange(nextState);
            },

            /**
             * Moves the game backward by one step
             */
            moveBackward: function () {

                var self = this,
                    { currentState } = self.getState();

                if (0 < currentState) {

                    self.triggerStateChange(currentState - 1);
                }
            },

            /**
             * Moves the game backward by one round
             */
            roundBackward: function () {

                var currentRound,
                    nextState,
                    self = this,
                    states = self.states,
                    { currentState } = self.getState();

                currentRound = states[currentState].round;
                nextState    = _.findIndex(states, { round: currentRound - 1 });

                if (-1 === nextState) {
                    nextState = 0;
                }

                self.triggerStateChange(nextState);
            },

            /**
             * Starts the game loop
             */
            play: function () {

                PlaybackEvent.trigger(PlaybackEvent.PLAYING);
            },

            /**
             * Stops the game loop
             */
            pause: function () {

                PlaybackEvent.trigger(PlaybackEvent.PAUSED);
            },

            triggerStateChange: function (nextState) {

                PlaybackEvent.trigger(PlaybackEvent.GOTO, { state: nextState });
            },

            setMove: function ({ state }) {

                if (-1 < state && state < this.states.length) {

                    this.setState({ currentState: state });
                    return;
                }

                throw new Error(`State ${state} is out of bounds`);
            },
        };

        _.extend(context, mixin);
    },
};

export default SimpleGameLoopMixin;
