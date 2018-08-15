import * as Data from './creatureData.js';

const Draggable = {
    view(vnode) {return m('', vnode.attrs.creature.name);}
};

function compileCatalogue() {
    // add state for:
    //  facing
    return Data.CreatureList;
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