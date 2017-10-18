const levels = [
    {
        unlocked: true,
        cash: 5,
        candy: 1,
        chapter: 'Chapter 1',
        title: "The Monsters",
        intro: "Every year on Halloween night<br>I'm visited by zombies,<br>witches, " +
            "mummies and goblins.<br>Hordes of them.<br>And every year<br>they take all " +
            "of my candy!<br> Not this Halloween...",
        waves: [
            ['weakzombie', 0],
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
        ],
        start: [13, 10],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 10,
        candy: 2,
        chapter: 'Chapter 2',
        title: "The Plan Works",
        intro: "It worked!<br>With enough spooky decorations<br>I should be able to keep those monsters<br>away from my candy!",
        waves: [
            ['weakzombie', 0],
            ['weakzombie', 0, 1],
            ['weakwitch', 0],
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [7, 10],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 15,
        candy: 3,
        chapter: 'Chapter 3',
        title: "Strange Cravings",
        intro: "What kind of monsters crave candy?",
        waves: [
            ['weakzombie', 0],
            ['weakzombie', 0, 1],
            ['weakwitch', 0],
            ['weakzombie', 0, 1, 'weakwitch', 2],
            ['weakzombie', 0, 1, 2, 'weakwitch', 3, 4]
        ],
        tiles: [
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        ],
        start: [11, 10],
        end: [3, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 20,
        candy: 3,
        chapter: 'Chapter 4',
        title: "Later that Night",
        intro: "More monsters are coming<br>and they're getting harder to scare!",
        waves: [
            ['zombie', 0],
            ['zombie', 0, 1],
            ['witch', 0],
            ['zombie', 0, 1, 'witch', 2],
            ['zombie', 0, 1, 2, 'witch', 3, 4],
            ['witch', 0, 1, 2, 3]
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        ],
        start: [11, 10],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 15,
        candy: 5,
        chapter: 'Chapter 5',
        title: "The Hordes",
        intro: "There are so many zombies!",
        waves: [
            ['zombie', 0],
            ['zombie', 0, 1, 2, 3, 4, 5, 6, 7],
            ['zombie', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
            ['zombie', 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5],
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        ],
        start: [11, 10],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 25,
        candy: 3,
        chapter: 'Chapter 6',
        title: "Slowly Creeping",
        intro: "Is that a mummy I see<br>creeping this way?",
        waves: [
            ['mummy', 0],
            ['mummy', 0, 'zombie', 1, 1.5, 5, 5.5],
            ['mummy', 0, 'zombie', 1, 1.5, 5, 5.5, 'witch', 10, 10.5, 11, 11.5],
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [2, 10],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 25,
        candy: 3,
        chapter: 'Chapter 7',
        title: "Spritely Goblins",
        intro: "Watch out,<br>these little goblins are fast!",
        waves: [
            ['goblin', 0],
            ['goblin', 0, 1],
            ['mummy', 0, 'goblin', 2, 3, 5, 6],
            ['goblin', 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5],
        ],
        tiles: [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [2, 0],
        end: [7, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 40,
        candy: 5,
        chapter: 'Chapter 8',
        title: "Walk the Plank!",
        intro: "Mummies, globlins... And now pirates?",
        waves: [
            ['goblin', 0, 1, 'pirate', 5, 'goblin', 20, 21],
            ['pirate', 0, 5, 10, 'zombie', 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
            ['pirate', 0, 1, 2],
        ],
        tiles: [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [1, 0],
        end: [13, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 50,
        candy: 5,
        chapter: 'Chapter 9',
        title: "The Monster Mash",
        intro: "That's the largest group of monsters I've ever seen!",
        waves: [
            [
                'zombie', 0, 0.25, 0.5, 0.75,
                'witch', 1, 2, 3,
                'mummy', 5,
                'zombie', 10, 10.25, 10.5, 10.75, 11, 11.25, 11.5, 11.75, 12, 12.25, 12.5, 12.75,
                'pirate', 13,
                'witch', 15, 15.25, 15.5, 20, 20.25, 20.5,
                'goblin', 50, 50.5, 51, 51.5, 52, 52.5, 53, 53.5, 54, 54.5, 55
            ],
        ],
        tiles: [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
            [0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
            [0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [1, 0],
        end: [13, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 20,
        candy: 3,
        chapter: 'Chapter 10',
        title: "Something Spooky",
        intro: "Graves are useless against ghosts!",
        waves: [
            ['ghost', 0, 'goblin', 10, 20, 30, 40, 50, 55, 60, 65, 70, 75],
            ['ghost', 0, 1, 'zombie', 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5,
                14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5,
                20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24, 24.5],
            ['ghost', 0, 1, 2, 4, 'witch', 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
        ],
        tiles: [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0],
            [0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [1, 0],
        end: [13, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 30,
        candy: 3,
        chapter: 'Chapter 11',
        title: "The labyrinth",
        intro: "Lets see if they can find their way through this...",
        waves: [
            ['goblin', 0, 1, 2, 3, 4, 'pirate', 10, 'goblin', 20, 21, 22, 23, 24, 'ghost', 30],
            ['ghost', 0, 'pirate', 5, 6, 'witch', 10, 11, 12, 'goblin', 20, 21, 22, 23, 24],
            ['ghost', 0, 2, 'pirate', 1, 4, 'goblin', 10, 11, 12, 13, 14]
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
            [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [0, 9],
        end: [13, 0],
        upgrades: {}
    },

    {
        unlocked: false,
        cash: 40,
        candy: 3,
        chapter: 'Chapter 12',
        title: "The Reaper",
        intro: "...",
        waves: [
            ['death', 0,
             'goblin', 10, 11, 12, 13,
             'goblin', 30, 31, 32, 33,
             'witch', 40, 41, 42, 43, 44,
             'ghost', 50, 51, 52,
             'goblin', 60, 61, 62, 63, 64,
             'goblin', 80, 81, 82, 83, 84
            ],
        ],
        tiles: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0],
            [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        start: [0, 9],
        end: [13, 0],
        upgrades: {}
    },

];

