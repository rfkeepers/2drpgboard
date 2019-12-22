import * as Generic from './generic.js';

const Types = {
    player: 'player',
    monster: 'monster',
};

const Sizes = {
    standard: 'standard',
    long: 'long',
    huge: 'huge',
};

const Props = {
    blocksPathing: Generic.Properties.blocksPathing,
    blocksOccupy: Generic.Properties.blocksOccupy,
    blocksVisionLinear: Generic.Properties.blocksVisionLinear,
    hasFacing: Generic.Properties.hasFacing,
    hasVision: Generic.Properties.hasVision,
    hasMoveable: Generic.Properties.hasMoveable,
};

const CreatureList = [
    {
        id: 'generic_player',
        name: 'Player',
        icon: 'Pl',
        type: Types.player,
        size: Sizes.standard,
        stats: { move: 3 },
        props: [Props.blocksPathing, Props.blocksOccupy, Props.hasFacing, Props.hasVision, Props.hasMoveable],
    },
    {
        id: 'generic_monster',
        name: 'Monster',
        icon: 'Mon',
        type: Types.monster,
        size: Sizes.standard,
        stats: { move: 3 },
        props: [Props.blocksPathing, Props.blocksOccupy, Props.hasFacing, Props.hasVision, Props.hasMoveable],
    },
    {
        id: 'generic_long_monster',
        name: 'Long Monster',
        icon: 'LMon',
        type: Types.monster,
        size: Sizes.long,
        stats: { move: 2 },
        props: [Props.blocksPathing, Props.blocksOccupy, Props.hasFacing, Props.hasVision, Props.hasMoveable],
    },
    {
        id: 'generic_huge_monster',
        name: 'Huge Monster',
        icon: 'HMon',
        type: Types.monster,
        size: Sizes.huge,
        stats: { move: 1 },
        props: [Props.blocksPathing, Props.blocksOccupy, Props.blocksVisionLinear, Props.hasFacing, Props.hasVision, Props.hasMoveable],
    },
];

export {CreatureList, Types, Sizes, Props};