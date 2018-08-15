import {Tile} from '../tile/tile.js';
import {Gl} from '../global.js';

const Grid = {
    view(vnode) {
    return m('',
        Gl.grid.map(r => 
            m('', r.map(c =>
                m('.inline', m(Tile, {row: c.row, col: c.col}))
            ))
        )
    );},
}

const Board = {
    view() { return m('', [
        m(Grid),
    ]);},
};

export {Board};
