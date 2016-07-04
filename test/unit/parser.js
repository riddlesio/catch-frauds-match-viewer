require('babel-polyfill');
const expect = require('chai').expect;
const parser = require('../../src/js/io/Parser');
const data = require('../../src/js/data/dummyData.json');
const settings = require('../../src/js/data/gameDefaults.json');

describe('Parser', function () {

    describe('parseStates', function () {

        const buyers = data.results;
        const states = parser.parseStates(data, settings);

        it('should return the right amount of states', function () {

            const expectedAmountOfStates = (buyers.length - 1) * settings.spawnDelay + settings.routeSteps + 1;

            expect(states.length).to.equal(expectedAmountOfStates);
        });

        describe('All returned states', function () {

            it('should contain the status object', function () {

                const existsInAll = states.reduce((acc, state) => (
                    acc && state.status != null
                ), true);

                expect(existsInAll).to.be.true;
            });

            it('should have status.currentState to equal index', function () {

                const equalsInAll = states.reduce((acc, state, index) => (
                    acc && state.status.currentState === index
                ), true);

                expect(equalsInAll).to.be.true;
            });

            it('should have the sum of all buyers for all states, equal the total of buyers plus the amount of routeSteps', function () {

                const totalAmountOfBuyersInStates = states.reduce((acc, state) => (
                    acc + state.buyers.length
                ), 0);

                const buyersAndSteps = buyers.length * settings.routeSteps;

                expect(totalAmountOfBuyersInStates).to.equal(buyersAndSteps);
            });

        });

        describe('The first returned state', function () {
            const firstState = states[0];

            it('should have all status properties equal 0', function () {
                const statusValues = Object.values(firstState.status);

                const zeroInAll = statusValues.reduce((acc, value) => {
                    return acc && value === 0;
                }, true);

                expect(zeroInAll).to.be.true;
            });

            it('should contain 1 buyer', function () {
                const buyers = firstState.buyers;

                expect(buyers.length).to.equal(1);
            });
        });

        describe('The second last returned state', function () {

            const secondLastState = states[states.length - 2];

            it('should contain 1 buyer', function () {
                const buyers = secondLastState.buyers;

                expect(buyers.length).to.equal(1);
            });

        });

        describe('The last returned state', function () {

            const lastState = states[states.length - 1];

            it('should contain 0 buyers', function () {
                const buyers = lastState.buyers;

                expect(buyers.length).to.equal(0);
            });

            it('should have values for normal, fairlyJailed, unfairlyJailed and thefts which, when summed, equal the total amount of buyers', function () {
                const {
                    normal,
                    fairlyJailed,
                    unfairlyJailed,
                    thefts,
                } = lastState.status;
                const sumOfStats = normal + fairlyJailed + unfairlyJailed + thefts;

                expect(sumOfStats).to.equal(buyers.length);
            });
        });
    });
});
