const Types = {
    player: 'player',
    monster: 'monster',
};

const Sizes = {
    standard: 'standard',
    long: 'long',
    huge: 'huge',
};

const CreatureList = [
    {
        id: 'generic_player',
        name: 'Player',
        type: Types.player,
        size: Sizes.standard,
    },
    {
        id: 'generic_monster',
        name: 'Monster',
        type: Types.monster,
        size: Sizes.standard,
    },
    {
        id: 'generic_long_monster',
        name: 'Long Monster',
        type: Types.monster,
        size: Sizes.long,
    },
    {
        id: 'generic_huge_monster',
        name: 'Huge Monster',
        type: Types.monster,
        size: Sizes.huge,
    },
];

export {CreatureList, Types, Sizes};