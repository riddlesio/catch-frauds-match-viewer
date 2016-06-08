import _ from 'lodash';

/**
 * Parses the passed data object into settings which are usable by the viewer
 * @param   {Object} data       The JSON data received from the server
 * @param   {Object} [defaults] The default settings as passed from the gameViewer
 * @returns {Object}            The settings object
 */
function parseSettings(data, defaults = {}) {
    return {
        ...defaults,
        ...data.settings,
    };
}

/**
 * Parses the passed data and settings into states which can be rendered by the viewer
 * @param   {Object} data     The JSON data received from the server
 * @param   {Object} settings The parsed settings
 * @returns {Array}           List of states
 */
function parseStates(data, settings) {

    const results = data.results;
    const path = settings.path;
    const routeSteps = settings.routeSteps;
    const routeMap = createRouteMap(routeSteps, path);
    const positionsForGuards = findGuardPositions(routeMap, path);
    const checkpoints = createCheckpoints(data.settings.checkpoints, positionsForGuards, routeMap);
    console.log(checkpoints);
    const stateCount = (results.length - 1) * settings.spawnDelay + routeSteps + 1;
    const buyers = results.map((result, index) => ({
        result,
        look: createRandomBuyerLook(),
        id: index,
    }));

    return Array.from({ length: stateCount }, createStateParser({
        buyers,
        settings,
        checkpoints,
        stateCount,
        routeSteps,
        routeMap,
    }));
}

function createStateParser({ buyers, settings, checkpoints, stateCount, routeSteps, routeMap }) {

    let previousState;
    let previousStatus = {
        currentState: -1,
        percentage: 0,
        normal: 0,
        fairlyJailed: 0,
        unfairlyJailed: 0,
        thefts: 0,
    };

    return function parseState() {

        const currentState = previousStatus.currentState + 1;
        const { checkoutPosition, spawnDelay, routeSteps, path } = settings;
        const lastBuyerIndex = buyers.length - 1;
        const latestPossibleBuyerIndex = Math.floor(currentState / spawnDelay);
        const latestBuyerIndex = latestPossibleBuyerIndex > lastBuyerIndex ? lastBuyerIndex : latestPossibleBuyerIndex;
        const currentActiveBuyerIndexes = calculateBuyerIndexes(latestBuyerIndex, spawnDelay, currentState, routeSteps);

        // Slice instead of filter
        const visibleBuyers = buyers
            .filter((x, index) => _.includes(currentActiveBuyerIndexes, index))
            .map(({ look, result, id }) => {

                const previousBuyerState = previousState && previousState.buyers.find(buyer => buyer.id === id);
                const wasBusted = previousBuyerState && previousBuyerState.isBusted;
                const { isBusted, isApproved, isFraudulent } = result;

                const position = calculatePosition(id, spawnDelay, currentState);
                const transformation = routeMap[position];
                const bodyDirection = getBodyDirection(transformation, path);

                // Check this
                const busted = wasBusted ? true : isBusted ? calculateBusted(isApproved, checkpoints, transformation) : false;
                const approved = calculateApproved(checkpoints, isApproved, previousBuyerState, transformation);
                const shirtColor = calculateShirtColor(isApproved, approved);
                const emotion = position > checkoutPosition ? getBuyerEmotionBubble(isBusted, isFraudulent) : 0;
                const faceExpression = getFaceExpression(busted);
                const purchaseItem = busted ? 0 : look.purchaseItem;

                return {
                    id,
                    position,
                    bodyDirection,
                    transformation,
                    shirtColor,
                    isBusted: busted,
                    isApproved: approved,
                    emotion,
                    faceExpression,
                    purchaseItem,
                    faceType: look.faceType,
                    skinColor: look.skinColor,
                    isFraudulent,
                };
            });

        let isBusted = undefined;
        let isFraudulent = undefined;

        // Create a state for guards
        const checkpointsState = checkpoints.map(setCheckpointExpressions);

        const checkingOut = visibleBuyers.find(buyer => buyer.position === checkoutPosition);

        if (checkingOut) {
            isBusted = checkingOut.isBusted;
            isFraudulent = checkingOut.isFraudulent;
        }

        const status = createStatusFromStatus(previousStatus, isBusted, isFraudulent, stateCount);

        previousStatus = status;

        const state = {
            status,
            checkpoints: checkpointsState,
            buyers: visibleBuyers,
        };

        previousState = state;

        return state;
    };
}

function createRouteMap(routeSteps, path) {

    const routeLength = (
        (path[0].X - path[1].X)
        + (path[2].Y - path[1].Y)
        + (path[3].X - path[2].X)
        + (path[4].Y - path[3].Y)
        + (path[4].X - path[5].X)
    );

    const firstCornerX = path[1].X;
    const firstCornerY = path[1].Y;
    const secondCornerX = path[2].X;
    const secondCornerY = path[2].Y;
    const thirdCornerX = path[3].X;
    const thirdCornerY = path[3].Y;
    const fourthCornerX = path[4].X;
    const fourthCornerY = path[4].Y;
    const pixelsPerStep = routeLength / routeSteps;
    let X = 1920;
    let Y = 300;
    let leftOver;

    return Array.from({ length: routeSteps }).map(() => {
        if (X > firstCornerX && Y === firstCornerY) {
            const coordinates = { X, Y };
            X -= pixelsPerStep;
            return coordinates;
        }

        if (X < firstCornerX && Y === firstCornerY) {
            leftOver = firstCornerX - X;
            X = firstCornerX;
            Y = firstCornerY + leftOver;
        }

        if (Y < secondCornerY && X === firstCornerX) {
            const coordinates = { X, Y };
            Y += pixelsPerStep;
            return coordinates;
        }

        if (Y > secondCornerY && X === firstCornerX) {
            leftOver = Y - secondCornerY;
            X = secondCornerX + leftOver;
            Y = secondCornerY;
        }

        if (X < thirdCornerX && Y === secondCornerY) {
            const coordinates = { X, Y };
            X += pixelsPerStep;
            return coordinates;
        }

        if (X > thirdCornerX && Y === secondCornerY) {
            leftOver = X - thirdCornerX;
            X = thirdCornerX;
            Y = thirdCornerY + leftOver;
        }

        if (Y < fourthCornerY && X === thirdCornerX) {
            const coordinates = { X, Y };
            Y += pixelsPerStep;
            return coordinates;
        }

        if (Y > fourthCornerY && X === thirdCornerX) {
            leftOver = Y - fourthCornerY;
            X = fourthCornerX - leftOver;
            Y = fourthCornerY;
        }

        const coordinates = { X, Y };
        X -= pixelsPerStep;
        return coordinates;
    });
}

function findGuardPositions(routeMap, path) {
    return routeMap.filter((pos) => {

        const X = pos.X;
        const Y = pos.Y;
        let position = pos;

        if (Y === path[0].Y && X > 1850 || X < 230) {
            position = null;
        } else if (Y > path[0].Y && Y < path[2].Y) {
            position = null;
        } else if (Y === path[2].Y && X < 230 || X > 1720) {
            position = null;
        } else if (Y > path[3].Y && Y < path[4].Y) {
            position = null;
        } else if (Y === path[4].Y && X > 1720 || X < 400) {
            position = null;
        }

        return position !== null;
    });
}

function createCheckpoints(checkpoints, positionsForGuards, routeMap) {

    // Add expressions for checkpoint guards. Expressions are related to buyer by position.
    const skinColors = [0, 1, 2];
    const positionDistance = positionsForGuards.length / checkpoints.length;
    const half = positionDistance / 2;

    return checkpoints.map((checkpoint, index) => {

        const positionIndex = index * positionDistance + half;
        const transformation = positionsForGuards[Math.ceil(positionIndex)];
        const bodyDirection = transformation.Y === 300 || transformation.Y === 890 ? 1 : 0;

        return {
            id: index + 1,
            description: checkpoint.description,
            skinColor: getRandomFromArray(skinColors),
            transformation,
            bodyDirection,
        };
    });
}

function setCheckpointExpressions(checkpoint, buyers) {

    // Add expressions for checkpoint guards. Expressions are related to buyer by position.
    const expression = 0;

    return {
        expression,
        ...checkpoint,
    };
}

function calculateBuyerIndexes(latestBuyerIndex, spawnDelay, currentState, routeSteps) {

    const latestBuyerStartState = latestBuyerIndex * spawnDelay;
    const latestBuyerPosition   = currentState - latestBuyerStartState;
    const stepsLeft             = routeSteps - latestBuyerPosition - 1;

    let visibleBuyerCount = Math.floor(stepsLeft / spawnDelay) + 1;

    if (visibleBuyerCount > (latestBuyerIndex + 1)) {
        visibleBuyerCount = (latestBuyerIndex + 1);
    }

    let index = latestBuyerIndex;
    let indexes = [];

    while (visibleBuyerCount > 0) {
        indexes.push(index);
        index--;
        visibleBuyerCount--;
    }

    return indexes;
}

function getBuyerEmotionBubble(isBusted, isFraudulent) {
    if (!isBusted && !isFraudulent) return 1;
    if (isBusted && isFraudulent) return 2;
    if (!isBusted && isFraudulent) return 3;
    if (isBusted && !isFraudulent) return 4;
}

function calculatePosition(index, spawnDelay, currentState) {

    const startPosition = index * spawnDelay;

    return currentState - startPosition;
}

function getBodyDirection(transformation, path) {

    const transformationY = transformation.Y;

    if (transformationY <= path[1].Y) {
        return 0;
    } else if (transformationY <= path[2].Y) {
        return 1;
    } else {
        return 0;
    }
}

function calculateBusted(isApproved, checkpoints, transformation) {

    const lastFalseIndex    = isApproved.lastIndexOf(false);
    const bustingGuard      = checkpoints[lastFalseIndex];
    const bustingGuardX     = bustingGuard.transformation.X;
    const bustingGuardY     = bustingGuard.transformation.Y;
    const buyerX            = transformation.X;
    const buyerY            = transformation.Y;

    if (buyerY === bustingGuardY) {
        if (buyerY === 300) {
            return buyerX < bustingGuardX;
        } else if (buyerY === 600) {
            return buyerX > bustingGuardX;
        } else if (buyerY === 890) {
            return buyerX < bustingGuardX;
        }
    }

}

function calculateApproved(checkpoints, isApproved, previousBuyerState = { isApproved: [] }, transformation) {

    const currentCheckpoint = checkpoints.reduce((acc, check) => (
        check.transformation === transformation ? check : acc
    ), null);

    if (!currentCheckpoint) {
        return previousBuyerState.isApproved;
    }

    const checkpointsPassed = checkpoints.indexOf(currentCheckpoint) + 1;

    // Returns isApproved array with length of checkpoints that have been passed
    return isApproved.slice(0, checkpointsPassed);
}

function calculateShirtColor(isApproved, approved) {

    const amountOfFalseApproves = isApproved.filter(isFalse).length;
    const amountOfFalseApproved = approved.filter(isFalse).length;
    const shirtColorStepSize = 100 / amountOfFalseApproves;

    return shirtColorStepSize * amountOfFalseApproved;
}

function createStatusFromStatus(oldStatus, isBusted, isFraudulent, stateCount) {

    let {
        currentState,
        percentage,
        normal,
        fairlyJailed,
        unfairlyJailed,
        thefts,
    } = oldStatus;

    currentState += 1;
    percentage = 100 / stateCount * currentState;

    if (isBusted && isFraudulent) {
        fairlyJailed += 1;
    } else if (isBusted) {
        unfairlyJailed += 1;
    } else if (isFraudulent) {
        thefts += 1;
    } else if (typeof isBusted !== 'undefined' && typeof isFraudulent !== 'undefined') {
        normal += 1;
    }

    return {
        currentState,
        percentage,
        normal,
        fairlyJailed,
        unfairlyJailed,
        thefts,
    };
}

function createRandomBuyerLook() {

    const purchaseItems = [1, 2, 3, 4];
    const faceTypes     = [0, 1, 2, 3, 4];
    const skinColors    = [0, 1, 2];

    return {
        purchaseItem: getRandomFromArray(purchaseItems),
        faceType: getRandomFromArray(faceTypes),
        skinColor: getRandomFromArray(skinColors),
    };
}

function getFaceExpression(busted) {

    return busted ? 1 : 0;
}

function isFalse(value) {
    return value === false;
}

function getRandomFromArray(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// function getRouteLength() {
//
//     return (1920 - 170) + (600 - 300) + (1770 - 170) + (890 - 600) + (1770 - 1);
// }

export {
    parseSettings,
    parseStates,
};
