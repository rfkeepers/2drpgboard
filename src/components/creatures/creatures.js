import * as Data from '../../data/creatures.js';
import {Copy} from '../../utilities/generic.js';

const Draggable = {
    view(vnode) {return m('', vnode.attrs.entity.name);}
};

function compileCatalogue() {
    // add state for:
    //  facing
    let catalogue = {};
    Data.CreatureList.forEach(_c => {
        let c = Copy(_c);
        c.type = 'creature';
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