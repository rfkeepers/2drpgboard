import * as Generic from './generic.js';

const Heights = {
    ground: 'ground',
    high: 'high',
    low: 'low',
};

const Props = {
    blocksPathing: Generic.Properties.blocksPathing,
    blocksOccupy: Generic.Properties.blocksOccupy,
    blocksVisionLinear: Generic.Properties.blocksVisionLinear,
    blocksVisionWide: Generic.Properties.blocksVisionWide,
    climbable: 'climbable',
    coversFull: 'full_cover',
    coversPart: 'partial_cover',
    difficult: 'difficult',
    hasFacing: Generic.Properties.hasFacing,
};

const TerrainList = [
    {
        id: 'generic_tree',
        name: 'Tree',
        icon: 'Tr',
        height: Heights.ground,
        props: [Props.blocksPathing, Props.blocksOccupy, Props.blocksVisionLinear, Props.coversPart],
    },
    {
        id: 'generic_rock',
        name: 'Rock',
        icon: 'Rk',
        height: Heights.ground,
        props: [Props.difficult, Props.coversPart],
    },
    {
        id: 'generic_thick_wall',
        name: 'Thick Wall',
        icon: 'Bar',
        height: Heights.ground,
        props: [Props.blocksPathing, Props.blocksOccupy, Props.blocksVisionWide, Props.coversFull],
    },
    {
        id: 'generic_wall',
        name: 'Wall',
        icon: 'Wall',
        height: Heights.ground,
        props: [Props.blocksPathing, Props.blocksVisionWide, Props.coversFull, Props.hasFacing],
    },
    {
        id: 'generic_wall_window',
        name: 'Windowed Wall',
        icon: 'Win',
        height: Heights.ground,
        props: [Props.blocksPathing, Props.coversPart, Props.hasFacing],
    },
];

export {TerrainList, Heights, Props};