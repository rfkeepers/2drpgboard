import * as Data from '../../data/terrain.js';
import {Copy} from '../../utilities/generic.js';

const Draggable = {
    view(vnode) {return m('', vnode.attrs.entity.name);}
};

function compileCatalogue() {
    let catalogue = {};
    Data.TerrainList.forEach(_c => {
        let c = Copy(_c);
        c.type = 'terrain';
        catalogue[c.id] = c;
    });
    return catalogue;
};
const Catalogue = compileCatalogue();

const Types = Data.Types;
const Sizes = Data.Sizes;
export {
    Draggable,
    Catalogue,
    Types,
    Sizes,
};