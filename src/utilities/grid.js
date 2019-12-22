/**
 * Returns a boolean for whether the loc is within the radius of the origin.
 * 
 * @param {Object} loc A {row, col} object describing the location of the object.
 * @param {Object} origin A {row, col} object describing the origin of the radius.
 * @param {Number} radius Number of tiles on x-axis from the origin to the last included tile in the radius.
 */
function IsWithinRadius(loc, origin, radius) {
    if (radius < 1) { return false; }
    if (origin.row == loc.row && origin.col === loc.col) { return false; }
    if (origin.row === loc.row) {
        return (origin.col - radius) <= loc.col
            && loc.col <= (origin.col + radius);
    } else if (origin.col === loc.col) {
        return (origin.row - radius) <= loc.row
            && loc.row <= (origin.row + radius);
    }
    for (let i = 1; i < radius; i++) {
        if ((origin.row - radius + i) <= loc.row
        && loc.row <= (origin.row + radius - i)
        && (origin.col - i) <= loc.col
        && loc.col <= (origin.col + i)) {
            return true;
        }
    }
    return false;
};

export {IsWithinRadius};
