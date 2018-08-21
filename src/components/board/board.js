import {Tile} from '../tile/tile.js';
import {Settings} from '../../global/settings.js';
import {State} from '../../global/boardState.js';

const Board = {
    view() { return m('',
        Settings.grid.map(r => 
            m('.grid__row', r.map(c =>
                m(Tile, State.getStateAt({row: c.row, col: c.col}))
            ))
        )
    );},
};

export {Board};
