// This file was automatically generated from Excel data
// src/components/MugicDatabase.js

// Helper function for creating unique card keys
function createUniqueCardKey(card) {
  // Combine name and set for a unique identifier
  // For backward compatibility, return the ID if it's already globally unique
  if (card.id && card.id.includes('-')) {
    return card.id;
  }
  
  // If already has a uniqueId, use it
  if (card.uniqueId) {
    return card.uniqueId;
  }
  
  // Otherwise create a composite key using name and set
  return `${card.name}__${card.set || 'unknown'}`;
}

// Pre-populated mugic database
export const mugicDatabase = [
  {
    "id": "183/232",
    "name": "Canon of Casualty",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Deal 20 damage to target Creature.",
    "flavorText": "Even before the first three notes finish playing, OverWorlders scramble for the nearest shelter.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/hSGT5VV.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Canon of Casualty__dop"
  },
  {
    "id": "175/232",
    "name": "Cascade Symphony",
    "set": "dop",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Damage dealt to target Creature by :fire:Fire or :air:Air attacks is reduced by 5. (An attack which is both :fire:Fire and :air:Air is still reduced by 5.)",
    "flavorText": "\"There is but one true language, and that is Mugic. All else is gibberish.\" - Donmar",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/dp34ZzI.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Cascade Symphony__dop"
  },
  {
    "id": "191/232",
    "name": "Chorus of the Hive",
    "set": "dop",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Activate Hive.",
    "flavorText": "What repels some attracts others. Is preference learned or ingrained?",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/2TlXa5m.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Chorus of the Hive__dop"
  },
  {
    "id": "165/232",
    "name": "Decrescendo",
    "set": "dop",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Deal 5 damage to target Creature.",
    "flavorText": "Minimalism to the max.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/0vmIAIz.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Decrescendo__dop"
  },
  {
    "id": "184/232",
    "name": "Discord of Disarming",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Destroy target Battlegear.",
    "flavorText": "As his Windstrider decomposes into shrapnel, Bodal calculates that it will take 56.4 seconds before he splats on the ground.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/85wqGRI.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Discord of Disarming__dop"
  },
  {
    "id": "166/232",
    "name": "Ember Flourish",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Heal 15 damage to target Creature with :air:Air or :fire:Fire.",
    "flavorText": "No matter how many you carry with you, a song can never weigh you down.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jeff Huang",
    "imageUrl": "https://i.imgur.com/I2qFZup.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Ember Flourish__dop"
  },
  {
    "id": "197/232",
    "name": "Fanfare of the Vanishing",
    "set": "dop",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target Creature gains \"Invisibility: Strike 15.\"",
    "flavorText": "When a melody becomes memory, it will never disappear.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/Y8JlfJc.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fanfare of the Vanishing__dop"
  },
  {
    "id": "167/232",
    "name": "Fortissimo",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Target Creature gains 5 :courage:Courage, :power:Power, :wisdom:Wisdom, :speed:Speed, and Energy.",
    "flavorText": "Large is good. Larger is better. But really, really big is sometimes best.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/TH3hodk.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Fortissimo__dop"
  },
  {
    "id": "168/232",
    "name": "Geo Flourish",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Heal 15 damage to target Creature with :earth:Earth or :water:Water.",
    "flavorText": "Protect the land and the land will protect you.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jeff Huang",
    "imageUrl": "https://i.imgur.com/WoX1z9x.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Geo Flourish__dop"
  },
  {
    "id": "176/232",
    "name": "Hymn of the Elements",
    "set": "dop",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Target Creature gains an Elemental Type of your choice.",
    "flavorText": "All elements stem from nature — as does the Cothica itself.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/DtE5e0A.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Hymn of the Elements__dop"
  },
  {
    "id": "169/232",
    "name": "Interlude of Consequence",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Shuffle target player's Attack Deck or Location Deck.",
    "flavorText": "In desperate situations, turmoil and confusion can be one's allies.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/r3KIQSH.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Interlude of Consequence__dop"
  },
  {
    "id": "185/232",
    "name": "Melody of Malady",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "underworld",
    "ability": "Target engaged Creature gains 10 Energy. Deal 5 damage to another target engaged Creature.",
    "flavorText": "\"A little bit more for me, a little bit less for you. Perfect!\"— Zalvar",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/za7pbn2.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Melody of Malady__dop"
  },
  {
    "id": "198/232",
    "name": "Melody of Mirage",
    "set": "dop",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target attack deals 0 damage.",
    "flavorText": "Trust your ears, not your eyes.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/s6Pj05d.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Melody of Mirage__dop"
  },
  {
    "id": "170/232",
    "name": "Minor Flourish",
    "set": "dop",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Heal 10 damage to target Creature.",
    "flavorText": "\"Anyone can imitate a melody, but to hear it in one's head for the very first time... that is a gift.\" — Najarin",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/yjQGZoV.png",
    "mugicNotes": null,
    "uniqueId": "Minor Flourish__dop"
  },
  {
    "id": "177/232",
    "name": "Mugic Reprise",
    "set": "dop",
    "rarity": "ultra rare",
    "tribe": "overworld",
    "ability": "Return target Mugic Card from your general discard pile to your hand.",
    "flavorText": "Everything that was once lost will be found again.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/Fezdp1i.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Mugic Reprise__dop"
  },
  {
    "id": "199/232",
    "name": "Notes of Neverwhere",
    "set": "dop",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "The active Location loses all abilities.",
    "flavorText": "\"If you have all that you need, you are always home.\" — From an ancient Mugician text",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/Sy9asbT.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Notes of Neverwhere__dop"
  },
  {
    "id": "178/232",
    "name": "OverWorld Aria",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Heal 10 damage to target OverWorld Creature. Damage dealt to that Creature by :fire:Fire attacks is reduced by 5.",
    "flavorText": "Mugicians choose host Creatures along tribe affiliations.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/qpfaU22.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "OverWorld Aria__dop"
  },
  {
    "id": "179/232",
    "name": "Refrain of Denial",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Negate target Mugic.",
    "flavorText": "Cacophony signaled the beginning of the end of peace for the Mugicians.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/bvt9Wiz.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Refrain of Denial__dop"
  },
  {
    "id": "186/232",
    "name": "Refrain of Denial, (OverWorld)",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "underworld",
    "ability": "Negate target Generic or OverWorld Mugic.",
    "flavorText": "\"No such thing as Mugicians! Now fight!\" — Dardemus",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/DFn5BKV.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Refrain of Denial, (OverWorld)__dop"
  },
  {
    "id": "192/232",
    "name": "Refrain of Denial, (OverWorld/UnderWorld)",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Negate target OverWorld or UnderWorld Mugic.",
    "flavorText": "\"The secret to using Mugic is to not try to solve its mysteries.\" — Lore",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/jS2JNXk.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Refrain of Denial, (OverWorld/UnderWorld)__dop"
  },
  {
    "id": "187/232",
    "name": "Song of Asperity",
    "set": "dop",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target Creature gains \":fire:Fire 5\" and \":air:Air 5.\"",
    "flavorText": "When anger is all-consuming, hatred is the gateway to a hideous power.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Christian Jehie",
    "imageUrl": "https://i.imgur.com/tws6ogC.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Asperity__dop"
  },
  {
    "id": "200/232",
    "name": "Song of Deflection",
    "set": "dop",
    "rarity": "ultra rare",
    "tribe": "mipedian",
    "ability": "Change the target of target Mugic or ability with a single target.",
    "flavorText": "Beauty is in the ears of the beholder - even discordant notes sound harmonious in dire situations.",
    "unique": false,
    "mugicCost": 3,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/4h3K41X.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Deflection__dop"
  },
  {
    "id": "171/232",
    "name": "Song of EmberNova",
    "set": "dop",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Deal 10 damage to target Creature with :air:Air or :fire:Fire.",
    "flavorText": "Fire consumes air, suffocating the earth.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/7ImYyBy.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of EmberNova__dop"
  },
  {
    "id": "180/232",
    "name": "Song of Focus",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Target Creature gains 10 :courage:Courage, :power:Power, :wisdom:Wisdom, and :speed:Speed.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/PEfOVD0.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Focus__dop"
  },
  {
    "id": "188/232",
    "name": "Song of Fury",
    "set": "dop",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Deal 10 damage to target Creature. Another target Creature gains \":fire:Fire 5.\"",
    "flavorText": "\"My legs or my Mugician? There is no choice. Cut them off!\" — Miklon",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/A6VPuSY.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Fury__dop"
  },
  {
    "id": "172/232",
    "name": "Song of Futuresight",
    "set": "dop",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Look at the top two cards of target player's Attack Deck or Location Deck. Put one of them on top of that deck and the other on the bottom.",
    "flavorText": "Take care when peering into the future. Sometimes it is best to not know what comes.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/LHDjXAx.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of Futuresight__dop"
  },
  {
    "id": "173/232",
    "name": "Song of GeoNova",
    "set": "dop",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Deal 10 damage to target Creature with :earth:Earth or :water:Water.",
    "flavorText": "Forsake the land and the land will forsake you.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/iOYFEEv.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of GeoNova__dop"
  },
  {
    "id": "193/232",
    "name": "Song of Mandiblor",
    "set": "dop",
    "rarity": "super rare",
    "tribe": "danian",
    "ability": "Target Creature gains 5 :courage:Courage, :power:Power, :wisdom:Wisdom, and :speed:Speed for each Danian Creature in play.",
    "flavorText": "Listen and learn the true strength of the Danian tribe — when you face one, you contend with all.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/SuihghC.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Mandiblor__dop"
  },
  {
    "id": "201/232",
    "name": "Song of Recovery",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Heal 10 damage to target Creature. That Creature gains \":air:Air 5.\"",
    "flavorText": "Tiaane believes that each Mugic is but a small piece of a great opus.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/8CpvFvT.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Recovery__dop"
  },
  {
    "id": "194/232",
    "name": "Song of Resistance",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Damage dealt by attacks to the caster is reduced by 5.",
    "flavorText": "Even the proudest Danian would never deny a chance to harden his shell.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/vFqmtUx.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Resistance__dop"
  },
  {
    "id": "181/232",
    "name": "Song of Resurgence",
    "set": "dop",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Heal 20 damage to target Creature.",
    "flavorText": "\"Our understanding of Mugic is the direct inverse of our gratitude for its existence.\" — Najarin",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/zF7Ph9u.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of Resurgence__dop"
  },
  {
    "id": "189/232",
    "name": "Song of Revival, (UnderWorld)",
    "set": "dop",
    "rarity": "ultra rare",
    "tribe": "underworld",
    "ability": "Return target UnderWorld Creature Card in your general discard pile to play to any unoccupied space on the Battleboard.",
    "flavorText": "The Mugicians believed that anything that once was cannot be lost forever.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/XSj0HXO.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Revival, (UnderWorld)__dop"
  },
  {
    "id": "182/232",
    "name": "Song of Stasis",
    "set": "dop",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target Creature cannot move.",
    "flavorText": "A melody has the power to move you... or not.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/QwladhN.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Stasis__dop"
  },
  {
    "id": "195/232",
    "name": "Song of Surprisal",
    "set": "dop",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Target Creature gains \"Range\" and \"Swift 1.\"",
    "flavorText": "The usefulness of Mugic in battle is but a side effect. Its true purpose remains unknown.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/Oau2New.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Surprisal__dop"
  },
  {
    "id": "196/232",
    "name": "Song of Symmetry",
    "set": "dop",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Target engaged Creature gains 10 Energy. Deal 10 damage to another target engaged Creature.",
    "flavorText": "Your strength is now mine, my weakness is now yours!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/kXS74AX.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Symmetry__dop"
  },
  {
    "id": "190/232",
    "name": "Song of Treachery",
    "set": "dop",
    "rarity": "common",
    "tribe": "underworld",
    "ability": "Target Creature loses 15 :courage:Courage, :power:Power, :wisdom:Wisdom, and :speed:Speed.",
    "flavorText": "One cannot move forward if one's always watching one's own back.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/hlQEG0a.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Treachery__dop"
  },
  {
    "id": "174/232",
    "name": "Song of Truesight",
    "set": "dop",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature loses Invisibility.",
    "flavorText": "A melody may help you see things more clearly, so how can sound be invisible?",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/KucdmYD.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Truesight__dop"
  },
  {
    "id": "202/232",
    "name": "Trills of Diminution",
    "set": "dop",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Target engaged Creature loses all abilities.",
    "flavorText": "Even the simplest sounds can resonate in one's mind.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/GU5C0PV.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Trills of Diminution__dop"
  },
  {
    "id": "71/100",
    "name": "Cascading Rondo",
    "set": "zoth",
    "rarity": "super rare",
    "tribe": "underworld",
    "ability": "Swap your attack discard pile with your Attack Deck, then shuffle your Attack Deck.",
    "flavorText": "Though he appeared exhausted, he was merely getting his second wind.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/h9g4AzQ.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Cascading Rondo__zoth"
  },
  {
    "id": "87/100",
    "name": "Casters' Warsong",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Deal 5 damage to target Creature.\r\nIf the caster of this Mugic is a Muge, deal an additional 10 damage.",
    "flavorText": "A sword can pierce the body, but a song can pierce the soul.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/x3V2nDY.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Casters' Warsong__zoth"
  },
  {
    "id": "88/100",
    "name": "Chorus of Cothica",
    "set": "zoth",
    "rarity": "ultra rare",
    "tribe": "generic",
    "ability": "Target Creature can play Mugic of any tribe.",
    "flavorText": "Some speak of the one true song, the Mugic that unites all Perim.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/CYWeKC8.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Chorus of Cothica__zoth"
  },
  {
    "id": "66/100",
    "name": "Composition of Concentration",
    "set": "zoth",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Target Creature gains 30 in the Discipline of your choice.",
    "flavorText": "Mugic can raise the spirit to immeasurable heights.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/mdm7aqu.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Composition of Concentration__zoth"
  },
  {
    "id": "76/100",
    "name": "Danian Element Choral",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Target Creature gains all Elemental Types your Creatures have.",
    "flavorText": "Harmonies can never be sung alone.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/UI8bbr8.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Danian Element Choral__zoth"
  },
  {
    "id": "67/100",
    "name": "Defender's Song",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Creatures you control gain \"Defender.\"",
    "flavorText": "What inspires us to sacrifice ourselves for the ones that we love?",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/kRlSUSM.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Defender's Song__zoth"
  },
  {
    "id": "72/100",
    "name": "Dissonance of Distraction",
    "set": "zoth",
    "rarity": "common",
    "tribe": "underworld",
    "ability": "Target Creature loses 30 in the Discipline of your choice.",
    "flavorText": "Mugic can sink the spirit to immeasurable depths.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/hHtz8ST.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Dissonance of Distraction__zoth"
  },
  {
    "id": "73/100",
    "name": "Elemental Denial",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Target Creature loses X Elemental Types of your choice.",
    "flavorText": "Some believe the Cothica and nature are irrevocably linked... understand one and rule the other!",
    "unique": false,
    "mugicCost": "X",
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/wPPKU6Q.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Elemental Denial__zoth"
  },
  {
    "id": "77/100",
    "name": "Elemental Elegy",
    "set": "zoth",
    "rarity": "super rare",
    "tribe": "danian",
    "ability": "Target Creature loses an Elemental Type of your choice. If that Creature has no Elemental Types, it cannot move instead.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/TG8SwnU.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Elemental Elegy__zoth"
  },
  {
    "id": "89/100",
    "name": "Forgotten Origins",
    "set": "zoth",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Target player removes all cards in their general discard pile from the game.",
    "flavorText": "It was the most beautiful song I've ever heard... but now I can't even remember a single note.",
    "unique": false,
    "mugicCost": 3,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/5Oqktmk.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Forgotten Origins__zoth"
  },
  {
    "id": "83/100",
    "name": "Gear Glissando",
    "set": "zoth",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Flip target Battlegear face-up or face-down.",
    "flavorText": "Most Muges believe that the problem with machines is that they exist at all.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/Vgl8gGB.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Gear Glissando__zoth"
  },
  {
    "id": "74/100",
    "name": "Hive Destruction",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Deactivate Hive.",
    "flavorText": "How absurd! The Danians act courageous, but they're merely thespians pretending to be warriors! We will rend their dirty hides into chaos!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/NkxMnxe.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Hive Destruction__zoth"
  },
  {
    "id": "78/100",
    "name": "Hive Unsung",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Deactivate Hive.\r\nYou may pay :danianmugic:when playing Hive Unsung.\r\nIf you do, return Hive Unsung to your hand when it resolves.",
    "flavorText": "Some songs leave the audience in silence.",
    "unique": false,
    "mugicCost": 0,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/JluC0Kt.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Hive Unsung__zoth"
  },
  {
    "id": "79/100",
    "name": "Infectious Melody",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Infect up to two target Uninfected Creatures.",
    "flavorText": "A tune so chilling that it makes your skin crawl.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/MQ9Mf60.png",
    "mugicNotes": null,
    "uniqueId": "Infectious Melody__zoth"
  },
  {
    "id": "84/100",
    "name": "Melodic Might",
    "set": "zoth",
    "rarity": "super rare",
    "tribe": "mipedian",
    "ability": "Draw two Attack Cards, then discard two Attack Cards.",
    "flavorText": "When Plan A fails, switch to Plan B. \r\nWhen Plan B fails... flee!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/OUX63bQ.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Melodic Might__zoth"
  },
  {
    "id": "90/100",
    "name": "Melody of the Meek",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "If target Creature with 30 or less Scanned Energy would take greater than 10 damage from a single source, it takes 10 damage instead.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/iOepZJ6.png",
    "mugicNotes": null,
    "uniqueId": "Melody of the Meek__zoth"
  },
  {
    "id": "68/100",
    "name": "Momental Virtuosity",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target Creature gains 50 in the Discipline of your choice.\r\nTarget Creature gains 50 in another Discipline of your choice. (You can target the same Creature.)",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/ymOFPYF.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Momental Virtuosity__zoth"
  },
  {
    "id": "69/100",
    "name": "Prelude of Protection",
    "set": "zoth",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Target Creature gains \"Fireproof 10\", \"Airproof 10\", \"Earthproof 10\", and \"Waterproof 10.\"",
    "flavorText": "Perhaps the Cothica is in the light, the land, the very winds that blow!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/WCgGz8O.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Prelude of Protection__zoth"
  },
  {
    "id": "80/100",
    "name": "Purge Dirge",
    "set": "zoth",
    "rarity": "ultra rare",
    "tribe": "danian",
    "ability": "Deal 5 damage to target Creature for each Mandiblor you control and each Infected Creature in play, then Uninfect all Creatures.",
    "flavorText": "This may sting a little. But usually, a lot.",
    "unique": true,
    "mugicCost": 3,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/PIi7PQG.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Purge Dirge__zoth"
  },
  {
    "id": "70/100",
    "name": "Recurring Rescue",
    "set": "zoth",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Heal 10 damage to target Creature.\r\nIf the target of Recurring Rescue has 30 or less Scanned Energy, return Recurring Rescue to your hand when it resolves.",
    "flavorText": "Ahh... a song so soothing that OverWorlders yearn to hear it again and again.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/FrsonjP.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Recurring Rescue__zoth"
  },
  {
    "id": "75/100",
    "name": "Serenade of Subordinance",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target Creature loses 50 in the Discipline of your choice. \r\nTarget Creature gains 50 in another Discipline of your choice. (You can target the same Creature.)",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/qQsVyYF.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Serenade of Subordinance__zoth"
  },
  {
    "id": "81/100",
    "name": "Song of Encompassing",
    "set": "zoth",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Creatures you control gain the Creature Type \"Mandiblor\" in addition to their other types.",
    "flavorText": "All I heard was the buzzing... the deafening, maddening buzzing!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/6pzkHGE.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Encompassing__zoth"
  },
  {
    "id": "82/100",
    "name": "Song of Resilience",
    "set": "zoth",
    "rarity": "common",
    "tribe": "danian",
    "ability": "If target Creature has :fire:Fire, it gains \"Fireproof 10\"; if it has :air:Air, it gains \"Airproof 10\"; if it has :earth:Earth, it gains \"Earthproof 10\"; if it has :water:Water, it gains \"Waterproof 10.\"",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/YfWUgr5.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of Resilience__zoth"
  },
  {
    "id": "85/100",
    "name": "Song of Shelter",
    "set": "zoth",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target Creature you control cannot be targeted by Mugic or abilities.",
    "flavorText": "How seven little notes can create such diverse wonders is one of the great, unsolvable mysteries of Perim.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/gs0eCDx.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Shelter__zoth"
  },
  {
    "id": "86/100",
    "name": "Switch Riff",
    "set": "zoth",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Swap the spaces on the Battleboard of two target unengaged Mipedian Creatures you control.",
    "flavorText": "Beware if you see two sets of footprints... but only one Mipedian.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/o4ZzoVu.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Switch Riff__zoth"
  },
  {
    "id": "86/100",
    "name": "Armament Adagio",
    "set": "ss",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Swap any Battlegear on two target Creatures controlled by the same player.",
    "flavorText": "It's true that we can accomplish great feats alone, but together, we can accomplish miracles.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/0AMHl6d.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Armament Adagio__ss"
  },
  {
    "id": "78/100",
    "name": "Echoes of Empty Hands",
    "set": "ss",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Destroy all Battlegear equipped to target engaged Creature. That Creature gains 10 Energy.",
    "flavorText": "\"Even lifeless machines have a life force.\" — Vidav",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/7m9PYv4.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Echoes of Empty Hands__ss"
  },
  {
    "id": "87/100",
    "name": "Fighters' Fanfare",
    "set": "ss",
    "rarity": "ultra rare",
    "tribe": "mipedian",
    "ability": "Damage dealt by the next attack that resolves this turn is dealt to target engaged Creature instead. (Damage is calculated with target as the recipient.)",
    "flavorText": "The existence of Mugic is proof enough that nothing is impossible.",
    "unique": true,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/0T5HBgU.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fighters' Fanfare__ss"
  },
  {
    "id": "88/100",
    "name": "Hymn of Teleportation",
    "set": "ss",
    "rarity": "super rare",
    "tribe": "mipedian",
    "ability": "Choose one:\r\nIf the Active Location is a Mirage, put it into play on any space on the Battleboard and reveal a new active Location.\r\nMove target Mirage Location in play to any place on the Battleboard.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/A4xWzPm.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Hymn of Teleportation__ss"
  },
  {
    "id": "84/100",
    "name": "Melody of Parasitic Mayhem",
    "set": "ss",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Infect target Uninfected engaged Creature. If Hive is Active, Uninfect all Creatures controlled by an opponent and deal 5 damage to target engaged Creature for each Creature Uninfected this way instead.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/g3G54N5.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Melody of Parasitic Mayhem__ss"
  },
  {
    "id": "79/100",
    "name": "Rhyme of the Reckless",
    "set": "ss",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "When target attack deals damage, deal the same amount of damage to the Creature that played that attack.",
    "flavorText": "The eyes show that which can be seen, but the ears reveal that which is real.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/VwfBi8n.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Rhyme of the Reckless__ss"
  },
  {
    "id": "82/100",
    "name": "Song of Desperation",
    "set": "ss",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target engaged Creature gains 30 Energy. Discipline Checks and Challenges on attacks played by that Creature deal 0 damage.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/XBAXbC5.png",
    "mugicNotes": null,
    "uniqueId": "Song of Desperation__ss"
  },
  {
    "id": "80/100",
    "name": "Song of the Dyad",
    "set": "ss",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Choose one: \r\nHeal 10 damage to target Creature. \r\nDeal 10 damage to target Creature.",
    "flavorText": "What brings happiness to one brings pain to another.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/PkhQGZA.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Song of the Dyad__ss"
  },
  {
    "id": "83/100",
    "name": "Strain of Ash",
    "set": "ss",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Sacrifice a Battlegear equipped to an unengaged UnderWorld Creature you control. If you do, destroy target Battlegear.",
    "flavorText": "As his Ice Cloak vanished, Bodal calculated he had 8.5 seconds until the firestorm immolated him.",
    "unique": true,
    "mugicCost": 0,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/OVAs2he.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Strain of Ash__ss"
  },
  {
    "id": "76/100",
    "name": "Strain of Clarity",
    "set": "ss",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Choose one: \r\nShuffle target Mirage Location into its controller's Location Deck. \r\nIf the active Location is a Mirage, shuffle it into its controller's Location deck and that player reveals a new active Location.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 0,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/m6PTsrS.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Strain of Clarity__ss"
  },
  {
    "id": "89/100",
    "name": "Strain of Expensive Delusions",
    "set": "ss",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Destroy all Battlegear equipped to Creatures in the same space as target Mirage Location. Shuffle it into its controller's Location Deck.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 0,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/vhs1nTC.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Strain of Expensive Delusions__ss"
  },
  {
    "id": "85/100",
    "name": "Strain of Infection",
    "set": "ss",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Uninfect up to three Infected Creatures.\r\nTarget Danian Creature gains :danianmugic:for each Creature Uninfected this way.",
    "flavorText": "Little parasites, big rewards.",
    "unique": true,
    "mugicCost": 0,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/CMkBZQd.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Strain of Infection__ss"
  },
  {
    "id": "81/100",
    "name": "Strain of the Tide",
    "set": "ss",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Remove any number of OverWorld Creatures in your general discard pile from the game. Heal 10 damage to target Creature for each card you remove this way.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 0,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/dJng7hg.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Strain of the Tide__ss"
  },
  {
    "id": "90/100",
    "name": "Tune of Xerium",
    "set": "ss",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Sacrifice a Battlegear. If you do, return another Battlegear from your general discard pile to play equipped to an unequipped Creature you control.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/eD4Lcy3.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Tune of Xerium__ss"
  },
  {
    "id": "77/100",
    "name": "Void Dirge",
    "set": "ss",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Remove up to three target cards in one general discard pile from the game.",
    "flavorText": "Do not dwell on the past. What's lost is best forgotten.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/WwT5WP6.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Void Dirge__ss"
  },
  {
    "id": "190/222",
    "name": "Allegro",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Target Creature gains 50 :speed:Speed.\r\nIf your engaged Creature gained Initiative this turn, Allegro's cost is :mipedianmugic0:.",
    "flavorText": "Even with Spectral Viewers, the invasion squad could no longer find the elusive Mipedians.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/uuqyg6X.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Allegro__btd"
  },
  {
    "id": "191/222",
    "name": "Aria of Enragement",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Target Creature gains \"Recklessness: 5.\"",
    "flavorText": "\"Be gone, you fool! The Cothica won't save Perim! Look at the devastation even a hint of its power can cause!\" — Sobtjek",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/DbxSHVj.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Aria of Enragement__btd"
  },
  {
    "id": "156/222",
    "name": "Ballad of the Belittled",
    "set": "btd",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Deal 20 damage to target Creature that has no Disciplines greater than 25.",
    "flavorText": "Always pick off the weak before they grow up and pick you off \r\n",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/uScI3xg.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Ballad of the Belittled__btd"
  },
  {
    "id": "157/222",
    "name": "Cadence Clash",
    "set": "btd",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Negate target Mugic and return that card to its controller's hand.",
    "flavorText": "There is nothing worse for a Muge than the stunning sound of silence.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/CT5dggN.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Cadence Clash__btd"
  },
  {
    "id": "158/222",
    "name": "Carnivore's Keening",
    "set": "btd",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Target Creature gains 30 Energy and \"Recklessness 10.\"",
    "flavorText": "\"This is where we draw the line! Protect the Riverlands!\" — Tartarek",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/01qilZu.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Carnivore's Keening__btd"
  },
  {
    "id": "180/222",
    "name": "Chromatic Postlude",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "underworld",
    "ability": "Deal 5 damage to target Creature for each Mugic counter spent to play Chromatic Postlude.",
    "flavorText": "\"What you call 'overkill' is what I call 'being thorough.'\" — Takinom",
    "unique": false,
    "mugicCost": "X",
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/KKqkrOC.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Chromatic Postlude__btd"
  },
  {
    "id": "159/222",
    "name": "Deep Dirge",
    "set": "btd",
    "rarity": "ultra rare",
    "tribe": "generic",
    "ability": "Target Minion Creature is treated as if that Creature's controller also controlled a Chieftain.",
    "flavorText": "As his eyes glazed over, all he could think was, \"Obey, obey, obey.\"",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/4KJgbXa.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Deep Dirge__btd"
  },
  {
    "id": "192/222",
    "name": "Desert's Wrathsong",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "mipedian",
    "ability": "Destroy target Creature with 0 :speed:Speed and 0 :power:Power.",
    "flavorText": "Under the burning sun, even the hardiest desiccate in a matter of minutes.",
    "unique": true,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/lSLtFJ9.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Desert's Wrathsong__btd"
  },
  {
    "id": "181/222",
    "name": "Deserter's Finale",
    "set": "btd",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Deal 5 damage to target Creature. Deal an additional 10 damage to it if it has :water:Water.",
    "flavorText": "\"The fire of the UnderWorld will burn forever!\" — Chaor",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/2oXN4sV.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Deserter's Finale__btd"
  },
  {
    "id": "193/222",
    "name": "Disarming Theme",
    "set": "btd",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target Creature with Invisibility gains \"Invisibility: Disarm.\"",
    "flavorText": "Each time Tangath tried to pick up his blade his unseen foe knocked it away again.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/sUT3Z8s.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Disarming Theme__btd"
  },
  {
    "id": "175/222",
    "name": "Dissonance of Will",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Negate target activated Creature ability.",
    "flavorText": "Mugic, like memory, is fleeting.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/bvcn8N5.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Dissonance of Will__btd"
  },
  {
    "id": "185/222",
    "name": "Domestic Hive Hymn",
    "set": "btd",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Target Creature gains 10 Energy. \r\nIf Hive is active, that Creature gains an additional 10 Energy.",
    "flavorText": "With my hive family, I am more \"we\" than \"me.\"",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/C0NlUaD.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Domestic Hive Hymn__btd"
  },
  {
    "id": "186/222",
    "name": "Draining Dirge",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Heal 15 damage to target Mandiblor Creature.",
    "flavorText": "Though Mandiblors are treated as the dregs of society, Queen Illexia loves all her children equally.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/719TGzD.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Draining Dirge__btd"
  },
  {
    "id": "160/222",
    "name": "Duality Dirge",
    "set": "btd",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Target Creature gains or loses :courage:Courage, :power:Power, :wisdom:Wisdom and :speed:Speed to make its Disciplines equal to its Scanned Disciplines and cannot be targeted by Mugic or abilities.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 3,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/nbQMVCS.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Duality Dirge__btd"
  },
  {
    "id": "176/222",
    "name": "Ecstatic Fanfare",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Target Creature gains 20 :wisdom:Wisdom, 15 :courage:Courage, 10 :speed:Speed and 5 :power:Power.",
    "flavorText": "Najarin found it more interesting than prophetic that he had seven letters in his name.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/c5wsALz.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Ecstatic Fanfare__btd"
  },
  {
    "id": "161/222",
    "name": "Effervescent Etude",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Deal 15 damage to target M'arrillian Creature.",
    "flavorText": "Melodies to some, noise to others.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/4iXWPYb.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Effervescent Etude__btd"
  },
  {
    "id": "177/222",
    "name": "Empowering Serenade",
    "set": "btd",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Target Creature gains 10 Energy and 10 :wisdom:Wisdom.",
    "flavorText": "\"We all fail, my friend. But how we respond to failure - now that is the sign of a champion.\" — Maxxor",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/S15wCy9.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Empowering Serenade__btd"
  },
  {
    "id": "162/222",
    "name": "Etude of Exhaustion",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains \"Exhaust all Disciplines 5.\"",
    "flavorText": "As the battle dragged on from days to weeks, the battalion lost the will to keep fighting.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/3KoVOMp.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Etude of Exhaustion__btd"
  },
  {
    "id": "182/222",
    "name": "Falsetto",
    "set": "btd",
    "rarity": "common",
    "tribe": "underworld",
    "ability": "Target Creature loses 20 :power:Power, 15 :speed:Speed, 10 :courage:Courage and 5 :wisdom:Wisdom.",
    "flavorText": "Before: Chaor \r\nAfter: H'earring",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/mMnpWtC.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Falsetto__btd"
  },
  {
    "id": "163/222",
    "name": "Fanfare of the Brain",
    "set": "btd",
    "rarity": "ultra rare",
    "tribe": "generic",
    "ability": "Target Creature gains 25 :courage:Courage and 25 :wisdom:Wisdom. If the target is a Minion Creature, it gains another 25 :courage:Courage and 25 :wisdom:Wisdom.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/nrKRwsv.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fanfare of the Brain__btd"
  },
  {
    "id": "164/222",
    "name": "Fatiguing Falsetto",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains \"Exhaust all Disciplines 15.\"",
    "flavorText": "\"If you have patience, you can win a war without fighting a single battle.\" — Vidav's teachings",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/zcaoaSn.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fatiguing Falsetto__btd"
  },
  {
    "id": "183/222",
    "name": "Final Fugue",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Target Creature gains 15 Energy and \"Recklessness 5.\"",
    "flavorText": "With adrenaline pumping through his veins, Ragetrod hardly felt a thing when he rammed headfirst through three stone pillars.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/PCDk9f2.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Final Fugue__btd"
  },
  {
    "id": "165/222",
    "name": "Fluidmorpher's Fanfare",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Target Creature gains :genericmugic:and \":water:Water 5.\"",
    "flavorText": "\"Defeat the enemy from within. When they no longer know whom to trust, they'll crumble on their own!\" — Phelphor",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/GozslQ5.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fluidmorpher's Fanfare__btd"
  },
  {
    "id": "184/222",
    "name": "Improvisational Melody",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Deal 10 damage to target Creature. If your engaged Creature dealt 20 or more attack damage this turn, Improvisational Melody's cost is :underworldmugic0:.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/nEJRKNA.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Improvisational Melody__btd"
  },
  {
    "id": "187/222",
    "name": "Intense Polyphony",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Activate Hive.\r\nIf your Creature has taken 15 or more attack damage this turn, Intense Polyphony's cost is :danianmugic0:.",
    "flavorText": "Against the Danians, there is no such thing as a one-on-one fight.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/T0W0Z3Y.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Intense Polyphony__btd"
  },
  {
    "id": "178/222",
    "name": "Melody of Miracles",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Heal 15 damage to target Creature. If your engaged Creature won a :wisdom:Wisdom Challenge this turn, Melody of Miracles' cost is :overworldmugic0:.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/PK95hgy.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Melody of Miracles__btd"
  },
  {
    "id": "166/222",
    "name": "Melody of Mirrored Actions",
    "set": "btd",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Destroy target Battlegear equipped to an engaged Creature.",
    "flavorText": "Mugic is a sword that pierces invulnerable armor, a shield that blocks unstoppable strikes.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/j85YiDq.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Melody of Mirrored Actions__btd"
  },
  {
    "id": "167/222",
    "name": "Nourishing Nocturne",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Sacrifice a Minion Creature. If you do, target engaged Creature gains Energy equal to the Scanned Energy of the sacrificed Creature.",
    "flavorText": "I know you think you gave it your all, but I bet I can coax out a little more.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/ziM0yIr.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Nourishing Nocturne__btd"
  },
  {
    "id": "179/222",
    "name": "Odd Opus",
    "set": "btd",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target Creature gains 15 Energy and 15 to all Disciplines.",
    "flavorText": "When a mere seven notes can change the course of history, that is the very definition of a miracle.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/tJR70mQ.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Odd Opus__btd"
  },
  {
    "id": "168/222",
    "name": "Predator's Song",
    "set": "btd",
    "rarity": "ultra rare",
    "tribe": "generic",
    "ability": "Sacrifice an unengaged Creature. If you do, target engaged Creature loses X from each Discipline where X is the sacrificed Creature's Scanned Disciplines. If you sacrificed a Minion Creature, engaged Creatures also lose 10 Energy.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/uunV0oL.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Predator's Song__btd"
  },
  {
    "id": "169/222",
    "name": "Prelude to Dominance",
    "set": "btd",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Deal 10 damage to target Creature.",
    "flavorText": "Strike first, strike fast, strike hard, strike last.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/BTZaZ0H.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Prelude to Dominance__btd"
  },
  {
    "id": "170/222",
    "name": "Psionic Serenade",
    "set": "btd",
    "rarity": "ultra rare",
    "tribe": "generic",
    "ability": "Remove a Minion Creature Card in your general discard pile from the game. If you do, deal damage to target engaged Creature equal to the removed card's Scanned Energy.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/cfH2JJx.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Psionic Serenade__btd"
  },
  {
    "id": "188/222",
    "name": "Rhythms of Rage",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "danian",
    "ability": "Target Mandiblor Creature gains \"Outperform :courage:Courage 5.\" If it is Infected, it gains \":earth:Earth 5.\" If Hive is active, it also gains 15 Energy.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/DhaUS7X.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Rhythms of Rage__btd"
  },
  {
    "id": "194/222",
    "name": "Selective Strain",
    "set": "btd",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Target Creature gains 25 to a Discipline of your choice. That Creature loses 25 to another Discipline of your choice.",
    "flavorText": "Every up has a down, every left has a right. The Cothica is always in balance.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/A74mhB4.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Selective Strain__btd"
  },
  {
    "id": "171/222",
    "name": "Song of Stable Shields",
    "set": "btd",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Target Creature's Disciplines cannot be increased or decreased.",
    "flavorText": "If every Counter has a Counter, what can we count on?",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/plqLkpE.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Stable Shields__btd"
  },
  {
    "id": "172/222",
    "name": "Specific Diminishing",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature loses 20 to a Discipline of your choice.",
    "flavorText": "When the wise become dumb \r\nOr the fast become slow \r\nThey've already lost \r\nAnd they don't even know",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/IHDlGYc.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Specific Diminishing__btd"
  },
  {
    "id": "173/222",
    "name": "Surprising Riffs",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Flip target Battlegear face-down.",
    "flavorText": "Unfortunately for Gronmar, his Telebracers sputtered and died seconds before the toxic tidal wave struck him full force.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/lN3FGef.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Surprising Riffs__btd"
  },
  {
    "id": "189/222",
    "name": "Symphony of Similarity",
    "set": "btd",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Target Creature gains 5 to all Disciplines for each Mandiblor you control and each Infected Creature in play.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/aNPuO4n.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Symphony of Similarity__btd"
  },
  {
    "id": "174/222",
    "name": "Tonal Destruction",
    "set": "btd",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Your opponent reveals X Mugic Cards from their hand and you choose one of them. Your opponent discards the chosen card.",
    "flavorText": "If you eliminate the cause, you'll never face the consequences.",
    "unique": false,
    "mugicCost": "X",
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/5WnG9wH.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Tonal Destruction__btd"
  },
  {
    "id": "83/100",
    "name": "Calling of Aa'une",
    "set": "roto",
    "rarity": "super rare",
    "tribe": "m'arrillian",
    "ability": "If Aa'une the Oligarch, Projection won combat this turn while equipped with Baton of Aa'une and Rage of Aa'une was played by a Creature you control this turn, flip over Aa'une the Oligarch, Projection.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 4,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/Ya23Nky.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Calling of Aa'une__roto"
  },
  {
    "id": "84/100",
    "name": "Curemorph Chords",
    "set": "roto",
    "rarity": "common",
    "tribe": "m'arrillian",
    "ability": "Heal 20 damage to target Fluidmorpher Creature.",
    "flavorText": "It was hardly fair. As their mortal wounds instantly healed, the irresistible force became even more unstoppable.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/RnfYoBF.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Curemorph Chords__roto"
  },
  {
    "id": "85/100",
    "name": "Decelerating Requiem",
    "set": "roto",
    "rarity": "uncommon",
    "tribe": "m'arrillian",
    "ability": "Destroy target Creature with 0 :speed:Speed.",
    "flavorText": "As his pulse plummeted, his heart beat slower... slower... and fell silent.",
    "unique": false,
    "mugicCost": 4,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/OGgVPnZ.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Decelerating Requiem__roto"
  },
  {
    "id": "86/100",
    "name": "Denial Refrain of the Deep",
    "set": "roto",
    "rarity": "common",
    "tribe": "m'arrillian",
    "ability": "Negate target Mugic.",
    "flavorText": "When Bodal realized that only four of his seven notes played, he calculated that he only had 2.5 seconds until Erak'tabb's tentacle squished him like an overripe djobwon.",
    "unique": false,
    "mugicCost": 3,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/OfZmb0d.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Denial Refrain of the Deep__roto"
  },
  {
    "id": "82/100",
    "name": "Harmonies of the Wind",
    "set": "roto",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target M'arrillian or Minion Creature cannot move or play activated abilities.",
    "flavorText": "When Perim is at its darkest, the Cothica lights the path of hope.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/0mxdQMr.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Harmonies of the Wind__roto"
  },
  {
    "id": "79/100",
    "name": "Intress' Healing Ballad",
    "set": "roto",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Heal 5 damage to target engaged Creature for each Mugic counter on opposing Creatures.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/UWtEmRk.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Intress' Healing Ballad__roto"
  },
  {
    "id": "80/100",
    "name": "Kopond's Composition",
    "set": "roto",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Deal 5 damage to target engaged Creature for each Mugic counter on opposing Creatures.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 3,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/3Yopraw.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Kopond's Composition__roto"
  },
  {
    "id": "87/100",
    "name": "Mightsinger's Requiem",
    "set": "roto",
    "rarity": "uncommon",
    "tribe": "m'arrillian",
    "ability": "Destroy target Creature with 0 :power:Power.",
    "flavorText": "When a pebble becomes as heavy as a boulder, your life will soon be over.",
    "unique": false,
    "mugicCost": 4,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/MJf9pfc.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Mightsinger's Requiem__roto"
  },
  {
    "id": "81/100",
    "name": "Mindproof March",
    "set": "roto",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Heal 5 damage to target Creature and deal 5 damage to another target Creature for each Danian Creature you control with :water:Water.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/ruGo6l4.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Mindproof March__roto"
  },
  {
    "id": "88/100",
    "name": "Requiem of Fear",
    "set": "roto",
    "rarity": "uncommon",
    "tribe": "m'arrillian",
    "ability": "Destroy target Creature with 0 :courage:Courage.",
    "flavorText": "There is no need to fight if your foe is in flight!",
    "unique": false,
    "mugicCost": 4,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/KZu8nL5.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Requiem of Fear__roto"
  },
  {
    "id": "89/100",
    "name": "Requiem of Lost Minds",
    "set": "roto",
    "rarity": "uncommon",
    "tribe": "m'arrillian",
    "ability": "Destroy target Creature with 0 :wisdom:Wisdom.",
    "flavorText": "A word to the wise: the wise need no words.",
    "unique": false,
    "mugicCost": 4,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/AY0QvO0.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Requiem of Lost Minds__roto"
  },
  {
    "id": "77/100",
    "name": "Sound of Noise",
    "set": "roto",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Negate target M'arrillian or Generic Mugic.",
    "flavorText": "The silence was deafening.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/SXUvwtD.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Sound of Noise__roto"
  },
  {
    "id": "90/100",
    "name": "Unheard Melody",
    "set": "roto",
    "rarity": "ultra rare",
    "tribe": "m'arrillian",
    "ability": "Destroy target Creature with no Mugic counters on it.",
    "flavorText": "Who knows why Mugicians exist. Just be thankful they do.",
    "unique": true,
    "mugicCost": 6,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/ovPBCen.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Unheard Melody__roto"
  },
  {
    "id": "78/100",
    "name": "Vexing Waveform",
    "set": "roto",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Target Creature gains \"Recklessness 5.\"\r\nWhen you play Vexing Waveform you may pay an additional :genericmugic::genericmugic:. If you do, the target Creature gains an additional \"Recklessness 5.\"",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/zcifevK.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Vexing Waveform__roto"
  },
  {
    "id": "85/100",
    "name": "Armament Alteration Anthem",
    "set": "tott",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Destroy engaged Creatures' Battlegear. Then, if you only control Mipedian Creatures and your engaged Creature is unequipped, return a Battlegear Card from your general discard pile to play equipped to your engaged Creature.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/RD0uIM6.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Armament Alteration Anthem__tott"
  },
  {
    "id": "82/100",
    "name": "Choral of the Apparition",
    "set": "tott",
    "rarity": "super rare",
    "tribe": "danian",
    "ability": "Sacrifice an unengaged Mandiblor Creature. If you do, return target Danian Creature Card from your general discard pile to play to the space on the Battleboard where the sacrificed Mandiblor was. If you control only Danian Creatures, return it to any unoccupied space on the Battleboard instead.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/uefXXFu.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Choral of the Apparition__tott"
  },
  {
    "id": "86/100",
    "name": "Dirge of the Desert",
    "set": "tott",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Target Creature gains \"Invisibility: Surprise\" and \"Invisibility: Strike 10.\"",
    "flavorText": "The desert wind erases footprints, making the invisible even more undetectable.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/OKm1l0G.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Dirge of the Desert__tott"
  },
  {
    "id": "76/100",
    "name": "Fanfare of Elemental Champions",
    "set": "tott",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Target Creature gains an Elemental Type of your choice. If you control only OverWorld Creatures, that Creature also gains \"Element 5\" of the chosen Elemental Type.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/MdFFkGN.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fanfare of Elemental Champions__tott"
  },
  {
    "id": "77/100",
    "name": "Harmonious Highsong",
    "set": "tott",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Heal 30 damage to target Creature. If you control only OverWorld Creatures, it gains 30 Energy instead.",
    "flavorText": "\"I know enough about Mugic to know that I know very little indeed.\" — Najarin",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/EyC6eFk.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Harmonious Highsong__tott"
  },
  {
    "id": "88/100",
    "name": "Intimidating Melody of M'arr",
    "set": "tott",
    "rarity": "rare",
    "tribe": "m'arrillian",
    "ability": "Target engaged Creature loses 30 to all Disciplines.",
    "flavorText": "As sudden fatigue overwhelmed his body, Bodal calculated that he had 4.3 seconds to escape before he became Milla'iin's appetizer.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/B8tdhsl.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Intimidating Melody of M'arr__tott"
  },
  {
    "id": "83/100",
    "name": "Katharaz's Cacophony",
    "set": "tott",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Heal 5 damage to your engaged Creature for each Elemental Type it has. If you control only Danian Creatures, also deal 5 damage to the opposing engaged Creature for each Elemental Type that Creature has.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/8GuuuHn.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Katharaz's Cacophony__tott"
  },
  {
    "id": "89/100",
    "name": "March of the M'arrillian Minions",
    "set": "tott",
    "rarity": "super rare",
    "tribe": "m'arrillian",
    "ability": "Target Minion gains :genericmugic::genericmugic:.",
    "flavorText": "With thousands of different Creatures having millions of unique talents, Aa'une has infinite methods to abuse and exploit them.",
    "unique": false,
    "mugicCost": 3,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/XkkM0VW.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "March of the M'arrillian Minions__tott"
  },
  {
    "id": "78/100",
    "name": "Minion's Freesong",
    "set": "tott",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Target Minion Creature is treated as if its controller did not also control a Chieftain.",
    "flavorText": "\"If we fail to rescue our friends soon, we will never turn back the tide.\" — Maxxor",
    "unique": false,
    "mugicCost": 1,
    "artist": "Karol Kolodzinski",
    "imageUrl": "https://i.imgur.com/FNgE5sp.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Minion's Freesong__tott"
  },
  {
    "id": "79/100",
    "name": "Nocturne of the Elements",
    "set": "tott",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target opposing engaged Creature loses all Elemental Types. If you control only UnderWorld Creatures, deal 5 damage to it for each Elemental Type lost this way.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/eIjvIiI.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Nocturne of the Elements__tott"
  },
  {
    "id": "80/100",
    "name": "Roar of the Mob",
    "set": "tott",
    "rarity": "common",
    "tribe": "underworld",
    "ability": "Deal 10 damage to target Creature for each Mugic counter on it.",
    "flavorText": "It was a sound I never heard before. As if the Mugicians were screaming in pain.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/SoEQZnV.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Roar of the Mob__tott"
  },
  {
    "id": "81/100",
    "name": "Shock Song",
    "set": "tott",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Deal 10 damage to target Creature. If you control only UnderWorld Creatures, also destroy all Battlegear equipped to it.",
    "flavorText": "Achieving the impossible is simple... as long as you know which seven notes to play.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/S5C8O7b.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Shock Song__tott"
  },
  {
    "id": "90/100",
    "name": "Symphonic Pelagic Maresong",
    "set": "tott",
    "rarity": "super rare",
    "tribe": "m'arrillian",
    "ability": "Mugic and activated abilities cannot be played. (Mugic and activated abilities played before this resolves are unaffected.)",
    "flavorText": "The tune died, as did any chance of reclaiming the Riverlands.",
    "unique": true,
    "mugicCost": 3,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/9RbkHGH.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Symphonic Pelagic Maresong__tott"
  },
  {
    "id": "87/100",
    "name": "Symphony of the Guard",
    "set": "tott",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Target Creature gains \":earth:Earth 5\" and \":air:Air 5.\" If you only control Mipedian Creatures, it also gains \"Outperform :speed:Speed 5.\"",
    "flavorText": "Never forget your roots. All answers lie there.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Peter Joworoski",
    "imageUrl": "https://i.imgur.com/BWl5oo0.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Symphony of the Guard__tott"
  },
  {
    "id": "84/100",
    "name": "Unisong",
    "set": "tott",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Target Danian Creature gains 10 Energy. If Hive is active, it also gains 10 :courage:Courage for each Danian Creature you control.",
    "flavorText": "Unite and fight... or divide and die!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/70Cn8M7.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Unisong__tott"
  },
  {
    "id": "84/100",
    "name": "Adaptive Progression",
    "set": "fun",
    "rarity": "uncommon",
    "tribe": "danian",
    "ability": "Negate target Elemental Attack.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/3y4sJed.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Adaptive Progression__fun"
  },
  {
    "id": "82/100",
    "name": "Denying Dirge",
    "set": "fun",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Target Creature cannot be healed or gain Energy from non-innate abilities.",
    "flavorText": "If you make sure the weak remain weak, the outcome will never be bleak.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/1P1gMcC.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 4,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Denying Dirge__fun"
  },
  {
    "id": "86/100",
    "name": "Iflar's Improvisation",
    "set": "fun",
    "rarity": "uncommon",
    "tribe": "mipedian",
    "ability": "Target non-Mipedian Creature gains \"Invisibility: Strike 30.\"",
    "flavorText": "\"A secret shared can never be unshared... but so be it.\" — Prince Iflar",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/SU3eMcb.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Iflar's Improvisation__fun"
  },
  {
    "id": "87/100",
    "name": "Illusion Glissando",
    "set": "fun",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Relocate target Mirage Location to any space on the Battleboard.",
    "flavorText": "As they wandered from sand dune to sand dune in search of the Cothica, little did they know that the Cothica was never there to begin with.",
    "unique": false,
    "mugicCost": 0,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/yCOW457.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Illusion Glissando__fun"
  },
  {
    "id": "83/100",
    "name": "Intertwined Melody",
    "set": "fun",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target Creature engaged with a non-UnderWorld Creature you control loses an Elemental Type of your choice and loses 30 to all Disciplines.",
    "flavorText": "\"I never thought an UnderWorlder would save my life. I owe you... unfortunately.\" — Gespedan",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/h17V6mj.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Intertwined Melody__fun"
  },
  {
    "id": "77/100",
    "name": "Jig of Reinforcement",
    "set": "fun",
    "rarity": "uncommon",
    "tribe": "generic",
    "ability": "Target Creature gains:\r\n10 Energy if it is an OverWorld Creature.\r\n\":fire:Fire 5\" if it is an UnderWorld Creature.\r\n20 to all Disciplines if it is a Danian Creature.\r\n\"Invisibility: Strike 10\" if it is a Mipedian Creature.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/vdms49m.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Jig of Reinforcement__fun"
  },
  {
    "id": "78/100",
    "name": "Monophone Mayhem",
    "set": "fun",
    "rarity": "rare",
    "tribe": "generic",
    "ability": "Choose a Tribe. Creatures of that Tribe cannot have Mugic counters put on them.",
    "flavorText": "The Mugician's singing turned into screams. There will be no more music this day.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/YCi7xEP.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Monophone Mayhem__fun"
  },
  {
    "id": "85/100",
    "name": "Ode to Obscurity",
    "set": "fun",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Infect X Uninfected Creatures. If you control a non-Danian Creature, Infect another X Uninfected Creatures.",
    "flavorText": "Where most see the tragedies of war, the wise see opportunity.",
    "unique": false,
    "mugicCost": "X",
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/vgSGWHx.png",
    "mugicNotes": [
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Ode to Obscurity__fun"
  },
  {
    "id": "79/100",
    "name": "Opus Opposed",
    "set": "fun",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Heal 5 damage to target Creature for each Tribe you control.",
    "flavorText": "One is none. \r\nTwo may do. \r\nThree? Maybe. \r\nBut four... we soar!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/4acF5my.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Opus Opposed__fun"
  },
  {
    "id": "88/100",
    "name": "Ostinato of Oban'emre",
    "set": "fun",
    "rarity": "super rare",
    "tribe": "m'arrillian",
    "ability": "Target M'arrillian or Minion Creature gains 10 Energy for each Minion Creature Card in each general discard pile.",
    "flavorText": "Living in harsh waters, the M'arrillians learned to scrounge even the smallest shred to survive.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/hIxkZYM.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Ostinato of Oban'emre__fun"
  },
  {
    "id": "80/100",
    "name": "Skysong Arpeggio",
    "set": "fun",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target Creature gains 30 :wisdom:Wisdom and \"Outperform :wisdom:Wisdom 5.\"",
    "flavorText": "As Milla'iin fell into his lava trap, Bodal calculated that it would boil into a yummy seafood soup in 32.8 seconds.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/lorTQ4R.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Skysong Arpeggio__fun"
  },
  {
    "id": "81/100",
    "name": "Vidav's Voicing",
    "set": "fun",
    "rarity": "uncommon",
    "tribe": "overworld",
    "ability": "Target non-OverWorld Creature gains 20 Energy.",
    "flavorText": "\"There are seven tenets to victory, and it is no coincidence that seven notes are the keys to each.\" — Vidav's teachings",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/CsvuniV.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Vidav's Voicing__fun"
  },
  {
    "id": "164/200",
    "name": "Aegis Airia",
    "set": "au",
    "rarity": "common",
    "tribe": "mipedian",
    "ability": "Negate target attack. The next attack played this turn deals 0 damage.",
    "flavorText": "Each note a melody, each melody an aria, each aria a symphony, each symphony a miracle.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/0yvB4Yi.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Aegis Airia__au"
  },
  {
    "id": "159/200",
    "name": "Ancestral Anthem",
    "set": "au",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Remove a Creature Card in your general discard pile from the game. If you do, activate Hive.",
    "flavorText": "Resourceful and efficient, Danians recycle everything in order to survive... including corpses!",
    "unique": false,
    "mugicCost": 0,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/avky9jw.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Ancestral Anthem__au"
  },
  {
    "id": "170/200",
    "name": "Anthem of Stone",
    "set": "au",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains :earth:Earth. If that Creature already has :earth:Earth, it gains \":earth:Earth 5\" instead.",
    "flavorText": "The earth split, toppling the towers, erasing the castle from memory.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/oYVf5s5.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Anthem of Stone__au"
  },
  {
    "id": "154/200",
    "name": "Battlesong of Depletion",
    "set": "au",
    "rarity": "common",
    "tribe": "underworld",
    "ability": "Creatures engaged with the caster lose all Elemental Types.",
    "flavorText": "Isolated from the embrace of the universe, Heptadd felt alone, empty and - for the first time - afraid.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/08mSkjr.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Battlesong of Depletion__au"
  },
  {
    "id": "149/200",
    "name": "Battlesong of Renewal",
    "set": "au",
    "rarity": "common",
    "tribe": "overworld",
    "ability": "Caster heals 25 Damage.",
    "flavorText": "The search for the Cothica is also a search into yourself. You cannot find one without the other.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/ey5jMlJ.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Battlesong of Renewal__au"
  },
  {
    "id": "165/200",
    "name": "Bonding Battlesong",
    "set": "au",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "When target opposing Creature heals or gains Energy from a Mugic or activated ability, the caster of this Mugic also heals or gains that much Energy.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/EVRyTGl.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Bonding Battlesong__au"
  },
  {
    "id": "155/200",
    "name": "Consuming Cacophony",
    "set": "au",
    "rarity": "super rare",
    "tribe": "underworld",
    "ability": "Deal 20 damage to target Creature. If the caster of this Mugic has :fire:Fire, deal an additional 10 damage.",
    "flavorText": "Flames feed upon flames in a voracious conflagration.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/DTP1tK8.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Consuming Cacophony__au"
  },
  {
    "id": "156/200",
    "name": "Counterpoint of Chaos",
    "set": "au",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target Creature cannot gain Elemental Types.",
    "flavorText": "Once again, \"Mugic Tester\" ranked as the second most dangerous job in Perim... just behind Chaor's sparring partner.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/4ZMEsNX.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Counterpoint of Chaos__au"
  },
  {
    "id": "157/200",
    "name": "Decomposition",
    "set": "au",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Target Creature fails all Discipline checks on attacks it plays.",
    "flavorText": "His strength faltered \r\nHis bravery waned \r\nHis feet dragged \r\nAs we went insane",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/ULlJxEQ.png",
    "mugicNotes": null,
    "uniqueId": "Decomposition__au"
  },
  {
    "id": "171/200",
    "name": "Diminuendo",
    "set": "au",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature loses 5 Energy and 5 to all Disciplines.",
    "flavorText": "Aivenna dug deep, willing herself to keep fighting... but her body had nothing left to give.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/rlMoGw1.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Diminuendo__au"
  },
  {
    "id": "172/200",
    "name": "Dischord of Flame",
    "set": "au",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains :fire:Fire. If that Creature already has :fire:Fire, it gains \":fire:Fire 5\" instead.",
    "flavorText": "The grey coat of ash choked the petals, wilting the leaves, wilting the soul.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/bZEzmfj.png",
    "mugicNotes": null,
    "uniqueId": "Dischord of Flame__au"
  },
  {
    "id": "160/200",
    "name": "Elemental Counterpoint",
    "set": "au",
    "rarity": "common",
    "tribe": "danian",
    "ability": "Target attack deals 10 less damage for each Elemental Type that attack has.",
    "flavorText": "\"You call that a Pebblestorm?! That was more like a Pebblebreeze!\" — Wamma",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/ExWTvoi.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Elemental Counterpoint__au"
  },
  {
    "id": "161/200",
    "name": "Empowering Encore",
    "set": "au",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Target Creature gains all Elemental Types your Creature Cards in your general discard pile have.",
    "flavorText": "\"As long as you believe that the impossible is only what has yet to be accomplished, everything is possible.\" — Lore",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/bcQq1b9.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Empowering Encore__au"
  },
  {
    "id": "150/200",
    "name": "Fluid Fugue",
    "set": "au",
    "rarity": "super rare",
    "tribe": "overworld",
    "ability": "Heal 25 damage to target Creature. If the caster of this Mugic has :water:Water, that Creature gains :overworldmugic:.",
    "flavorText": "Seven notes... infinite possibilities.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/BXhDkDu.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Fluid Fugue__au"
  },
  {
    "id": "173/200",
    "name": "Harmonics of Water",
    "set": "au",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains :water:Water. If that Creature already has :water:Water, it gains \":water:Water 5\" instead.",
    "flavorText": "And with one final wave, the flood washed away all remaining traces of the now-forgotten civilization.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/9k52WPv.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Harmonics of Water__au"
  },
  {
    "id": "174/200",
    "name": "Howl of the Wind",
    "set": "au",
    "rarity": "common",
    "tribe": "generic",
    "ability": "Target Creature gains :air:Air. If that Creature already has :air:Air, it gains \":air:Air 5\" instead.",
    "flavorText": "The tornado ripped across the fields, destroying the harvest, starving the land.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/RcwmaEU.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Howl of the Wind__au"
  },
  {
    "id": "151/200",
    "name": "Interlude of Interruption",
    "set": "au",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Negate target Mugic unless the casting Creature of that Mugic plays an additional :genericmugic:.",
    "flavorText": "When the Mugicians sing, all of Perim is blessed.",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/vvfPGHC.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Interlude of Interruption__au"
  },
  {
    "id": "162/200",
    "name": "Rocky Refrain",
    "set": "au",
    "rarity": "super rare",
    "tribe": "danian",
    "ability": "Target engaged Creature gains 5 Energy for each Elemental Type the opposing engaged Creature has. If the caster of this Mugic has :earth:Earth, the target Creature gains an additional 5 Energy for each Elemental Type the opposing engaged Creature has.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/NaZKEtx.png",
    "mugicNotes": null,
    "uniqueId": "Rocky Refrain__au"
  },
  {
    "id": "158/200",
    "name": "Searing Symphony",
    "set": "au",
    "rarity": "rare",
    "tribe": "underworld",
    "ability": "Deal 10 damage to target Creature for each Elemental Type it has.",
    "flavorText": "The rain not only nourishes but drowns. The embers warm as well as burn.",
    "unique": true,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/bGR8eby.png",
    "mugicNotes": [
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Searing Symphony__au"
  },
  {
    "id": "166/200",
    "name": "Silent Requiem",
    "set": "au",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Negate target Mugic or ability that targets a Creature with Invisibility.",
    "flavorText": "Unseen, unheard, unhittable... unbeatable!",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/C1uCFAN.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Silent Requiem__au"
  },
  {
    "id": "167/200",
    "name": "Sonata of Storms",
    "set": "au",
    "rarity": "super rare",
    "tribe": "mipedian",
    "ability": "Target Creature gains \"Range\" and \"Swift 3.\" If the caster of this Mugic has :air:Air, the target Creature also gains \"Invisibility: Surprise.\"",
    "flavorText": "As the thief sped away, Gespedan blamed himself for leaving the battle plans out in the open.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/wXZwWR4.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Sonata of Storms__au"
  },
  {
    "id": "152/200",
    "name": "Song of Elemental Attunement",
    "set": "au",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target Creature gains all of its Scanned Elemental Types.",
    "flavorText": "\"As ice, liquid and vapor are different forms of water, the four elements are simply different forms of nature.\" — Intress",
    "unique": false,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/uqwyLoZ.png",
    "mugicNotes": [
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "C",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Song of Elemental Attunement__au"
  },
  {
    "id": "168/200",
    "name": "Song of Translocation",
    "set": "au",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Relocate target Creature you control to any unoccupied space on the Battleboard.",
    "flavorText": "\"There's no shame in losing a fight. There's only shame in losing your life.\" — Headmaster Ankhyja",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/fEQnPl0.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Song of Translocation__au"
  },
  {
    "id": "169/200",
    "name": "Swartbron Battlesong",
    "set": "au",
    "rarity": "rare",
    "tribe": "m'arrillian",
    "ability": "If the caster is engaged, the opposing engaged Creature and the caster each gain Energy equal to their lowest Discipline.",
    "flavorText": "In a maddening gyre, delving into the secrets of Mugic only reveals more secrets.",
    "unique": false,
    "mugicCost": 3,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/YaeXNAK.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Swartbron Battlesong__au"
  },
  {
    "id": "153/200",
    "name": "Symphony of Shielding",
    "set": "au",
    "rarity": "rare",
    "tribe": "overworld",
    "ability": "Target attack or Mugic deals 0 damage.",
    "flavorText": "As Maxxor fearlessly charged through the rain of flaming arrows, he added another tale to his legend.",
    "unique": false,
    "mugicCost": 2,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/2hqyWjo.png",
    "mugicNotes": [
      {
        "letter": "A",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 4,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Symphony of Shielding__au"
  },
  {
    "id": "163/200",
    "name": "Unbalancing Battlesong",
    "set": "au",
    "rarity": "rare",
    "tribe": "danian",
    "ability": "Caster gains 15 Energy and Creatures engaged with caster lose 15 Energy.",
    "flavorText": "\"Mugic is older than time and stronger than power. It will outlast us all.\" — Tharc",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/nYaBX9P.png",
    "mugicNotes": [
      {
        "letter": "F",
        "length": 3,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "A",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": true
      }
    ],
    "uniqueId": "Unbalancing Battlesong__au"
  },
  {
    "id": "FAS-jj1h2bi5",
    "name": "Mondo Rondo",
    "set": "fas",
    "rarity": "rare",
    "tribe": "mipedian",
    "ability": "Target attack counts as the first attack played this combat.",
    "flavorText": "\"Stop me if you've heard this one before\" - Enre-hep",
    "unique": false,
    "mugicCost": 2,
    "artist": "",
    "imageUrl": "https://i.imgur.com/4XPRSiz.png",
    "mugicNotes": null,
    "uniqueId": "Mondo Rondo__fas"
  },
  {
    "id": "OP-ysymn6ld",
    "name": "Najarin's Tower of Song",
    "set": "op",
    "rarity": "ultra rare",
    "tribe": "overworld",
    "ability": "Deal 20 damage to target Creature on your side of the Battleboard.\r\nThat Creature's controller discards a random Mugic Card from their hand.",
    "flavorText": "",
    "unique": false,
    "mugicCost": 3,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/WK0VMYP.png",
    "mugicNotes": [
      {
        "letter": "C",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "B",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "A",
        "length": 3,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 4,
        "sharp": false,
        "flat": false
      }
    ],
    "uniqueId": "Najarin's Tower of Song__op"
  },
  {
    "id": "OP-3r13npib",
    "name": "Ulmar's Activating Arpeggio",
    "set": "op",
    "rarity": "uncommon",
    "tribe": "underworld",
    "ability": "Flip target face-down Battlegear face-up. Destroy that Battlegear at the beginning of the next turn.",
    "flavorText": "",
    "unique": true,
    "mugicCost": 1,
    "artist": "Jerico Santander",
    "imageUrl": "https://i.imgur.com/fa92axS.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "E",
        "length": 3,
        "sharp": false,
        "flat": true
      },
      {
        "letter": "D",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Ulmar's Activating Arpeggio__op"
  },
  {
    "id": "OP1-17/20",
    "name": "Fortissimo, (OP)",
    "set": "op",
    "rarity": "super rare",
    "tribe": "generic",
    "ability": "Target Creature gains 5 :courage:Courage, :power:Power, :wisdom:Wisdom, :speed:Speed, and Energy.",
    "flavorText": "\"The Cothica existed before the beginning. It will survive long past our end.\" — Najarin",
    "unique": false,
    "mugicCost": 1,
    "artist": "Martin Molski",
    "imageUrl": "https://i.imgur.com/QiwNb6J.png",
    "mugicNotes": [
      {
        "letter": "G",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "C",
        "length": 1,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "E",
        "length": 2,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "C",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "D",
        "length": 2,
        "sharp": true,
        "flat": false
      },
      {
        "letter": "G",
        "length": 1,
        "sharp": false,
        "flat": false
      },
      {
        "letter": "F",
        "length": 4,
        "sharp": true,
        "flat": false
      }
    ],
    "uniqueId": "Fortissimo, (OP)__op"
  }
];

// Helper functions to work with the database
export const getMugicById = (idOrKey) => {
  // First try direct ID lookup for backward compatibility
  const directMatch = mugicDatabase.find(mugic => mugic.id === idOrKey);
  if (directMatch) return directMatch;
  
  // Next try uniqueId match
  const uniqueMatch = mugicDatabase.find(mugic => mugic.uniqueId === idOrKey);
  if (uniqueMatch) return uniqueMatch;
  
  // If not found, check if it's a composite key
  if (idOrKey.includes('__')) {
    const [name, set] = idOrKey.split('__');
    return mugicDatabase.find(mugic => 
      mugic.name === name && mugic.set === set
    );
  }
  
  return null;
};

export const getAllMugicNames = () => {
  return mugicDatabase.map(mugic => ({
    id: mugic.uniqueId || createUniqueCardKey(mugic), // Use the composite key here
    name: mugic.name,
    set: mugic.set || '',
    setDisplay: mugic.set ? mugic.set.toUpperCase() : '',
    tribe: mugic.tribe || 'generic',
    unique: mugic.unique || false,
    mugicCost: mugic.mugicCost || 0,
    // Keep the original ID for reference
    originalId: mugic.id
  }));
};
