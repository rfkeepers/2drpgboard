import {Catalogue as CCatalogue} from '../creatures/creatures.js';
import {Catalogue as TCatalogue} from '../terrain/terrain.js';

function get(detail) {
    detail = detail.split(':')
    switch (detail[0]) {
    case 'creature':
        return CCatalogue[detail[1]];
    case 'terrain':
        return TCatalogue[detail[1]];
    }
    return undefined;
};

const Catalogue = {
    get,
};

export {Catalogue};
