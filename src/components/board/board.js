import {Tile} from '../tile/tile.js';
import {Grid} from '../store/grid.js';

const sequence = R.range(0);

const Board = {
    view() {
        return m('',
            R.map(r => 
                m('.grid__row', R.map(c =>
                    m(Tile, R.mergeRight(
                        Grid.getTile(r, c),
                        {
                            showMove: Grid.getCamera().showMove,
                        })
                    )
                )(sequence(Grid.getDimensions().cols)))
            )(sequence(Grid.getDimensions().rows))
        );
    },
};

export {Board};
