var Gl = {

    dims: {
        cols: "10",
        rows: "10"
    },

    grid: [],

    parseDims(dims) {
        let c = parseInt(dims.cols, 10);
        let r = parseInt(dims.rows, 10);
        return {
            cols: !c ? 1 : c,
            rows: !r ? 1 : r,
        };
    },

    composeBoard(dims, currGrid) {
        dims = this.parseDims(dims);
        if (currGrid.length > 0 && dims.cols === currGrid[0].length && dims.rows === currGrid.length) { return currGrid; }
        let grid = [];
        dims.cols = dims.cols;
        dims.rows = dims.rows;
        for (let i = 0; i < dims.rows; i++) {
            grid.push([]);
            for (let j = 0; j < dims.cols; j++) {
                grid[i].push({row: i, col: j});
            }
        }
        return grid;
    },

    updateDim(dim, val) {
        this.dims[dim] = this.fmtDimVal(val);
        this.grid = this.composeBoard(this.dims, this.grid);
    },

    setDims(dims) {
        this.dims = Object.assign({}, dims);
        this.grid = this.composeBoard(this.dims, this.grid);
    },


    fmtDimVal(val) {
        val = val.replace(/\D/g,'');
        return (val.length > 2) ? '99' : val;
    },
};

export {Gl}
