const books = [
  {
    id: 1,
    title: "Fourth Wing",
    author: "Rebecca Yarros",
    genre: "Fantasy Romance",
    rating: 4.7,
    description: "A young woman enters a brutal dragon-riding academy where survival is never guaranteed.",
    image: "https://covers.openlibrary.org/b/title/Fourth%20Wing-L.jpg"
  },
  {
    id: 2,
    title: "Iron Flame",
    author: "Rebecca Yarros",
    genre: "Fantasy Romance",
    rating: 4.6,
    description: "Violet returns to Basgiath as new threats emerge and the secrets surrounding the dragons deepen.",
    image: "https://covers.openlibrary.org/b/title/Iron%20Flame-L.jpg"
  },
  {
    id: 3,
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    genre: "Fantasy Romance",
    rating: 4.5,
    description: "A huntress is drawn into a magical world after killing a mysterious wolf in the woods.",
    image: "https://covers.openlibrary.org/b/title/A%20Court%20of%20Thorns%20and%20Roses-L.jpg"
  },
  {
    id: 4,
    title: "A Court of Mist and Fury",
    author: "Sarah J. Maas",
    genre: "Fantasy Romance",
    rating: 4.7,
    description: "Feyre discovers new powers, new alliances and a world far more complicated than she imagined.",
    image: "https://covers.openlibrary.org/b/title/A%20Court%20of%20Mist%20and%20Fury-L.jpg"
  },
  {
    id: 5,
    title: "A Court of Wings and Ruin",
    author: "Sarah J. Maas",
    genre: "Fantasy",
    rating: 4.6,
    description: "Feyre prepares for war as the fate of the magical courts hangs in the balance.",
    image: "https://covers.openlibrary.org/b/title/A%20Court%20of%20Wings%20and%20Ruin-L.jpg"
  },
  {
    id: 6,
    title: "Throne of Glass",
    author: "Sarah J. Maas",
    genre: "Fantasy",
    rating: 4.5,
    description: "An imprisoned assassin is offered freedom if she can win a deadly competition.",
    image: "https://covers.openlibrary.org/b/title/Throne%20of%20Glass-L.jpg"
  },
  {
    id: 7,
    title: "Quicksilver",
    author: "Callie Hart",
    genre: "Fantasy Romance",
    rating: 4.4,
    description: "A dangerous magical world forces a thief into an unexpected alliance with a powerful fae.",
    image: "https://covers.openlibrary.org/b/title/Quicksilver-L.jpg"
  },
  {
    id: 8,
    title: "The Bridge Kingdom",
    author: "Danielle L. Jensen",
    genre: "Fantasy Romance",
    rating: 4.5,
    description: "A princess is trained to infiltrate the kingdom she has been promised to marry into.",
    image: "https://covers.openlibrary.org/b/title/The%20Bridge%20Kingdom-L.jpg"
  },
  {
    id: 9,
    title: "Dance of Thieves",
    author: "Mary E. Pearson",
    genre: "Fantasy Romance",
    rating: 4.4,
    description: "A legendary thief and a young ruler become caught in a dangerous game of secrets.",
    image: "https://covers.openlibrary.org/b/title/Dance%20of%20Thieves-L.jpg"
  },
  {
    id: 10,
    title: "Once Upon a Broken Heart",
    author: "Stephanie Garber",
    genre: "Fantasy Romance",
    rating: 4.5,
    description: "A desperate girl makes a bargain with the Prince of Hearts to save someone she loves.",
    image: "https://covers.openlibrary.org/b/title/Once%20Upon%20a%20Broken%20Heart-L.jpg"
  },

  {
    id: 11,
    title: "Bride",
    author: "Ali Hazelwood",
    genre: "Dark Romance",
    rating: 4.4,
    description: "A vampire and an alpha werewolf enter an unexpected marriage that changes everything.",
    image: "https://covers.openlibrary.org/b/title/Bride-L.jpg"
  },
  {
    id: 12,
    title: "King of Wrath",
    author: "Ana Huang",
    genre: "Romance",
    rating: 4.3,
    description: "A powerful businessman enters an arranged marriage with the woman he never expected to want.",
    image: "https://covers.openlibrary.org/b/title/King%20of%20Wrath-L.jpg"
  },
  {
    id: 13,
    title: "King of Pride",
    author: "Ana Huang",
    genre: "Romance",
    rating: 4.2,
    description: "A disciplined billionaire finds himself drawn to a woman who challenges his carefully controlled life.",
    image: "https://covers.openlibrary.org/b/title/King%20of%20Pride-L.jpg"
  },
  {
    id: 14,
    title: "Twisted Love",
    author: "Ana Huang",
    genre: "Dark Romance",
    rating: 4.2,
    description: "A cold and guarded man becomes fiercely protective of the woman next door.",
    image: "https://covers.openlibrary.org/b/title/Twisted%20Love-L.jpg"
  },
  {
    id: 15,
    title: "The Fine Print",
    author: "Lauren Asher",
    genre: "Romance",
    rating: 4.2,
    description: "A theme park heir and a determined employee discover that their professional arrangement is becoming personal.",
    image: "https://covers.openlibrary.org/b/title/The%20Fine%20Print-L.jpg"
  },
  {
    id: 16,
    title: "The Love Hypothesis",
    author: "Ali Hazelwood",
    genre: "Romance",
    rating: 4.4,
    description: "A fake relationship between two scientists unexpectedly starts feeling very real.",
    image: "https://covers.openlibrary.org/b/title/The%20Love%20Hypothesis-L.jpg"
  },
  {
    id: 17,
    title: "It Ends with Us",
    author: "Colleen Hoover",
    genre: "Romance",
    rating: 4.1,
    description: "A young woman faces difficult choices when her first love unexpectedly returns to her life.",
    image: "https://covers.openlibrary.org/b/title/It%20Ends%20with%20Us-L.jpg"
  },
  {
    id: 18,
    title: "It Starts with Us",
    author: "Colleen Hoover",
    genre: "Romance",
    rating: 4.2,
    description: "A new beginning gives Lily a chance to build the life and relationship she always wanted.",
    image: "https://covers.openlibrary.org/b/title/It%20Starts%20with%20Us-L.jpg"
  },
  {
    id: 19,
    title: "The Spanish Love Deception",
    author: "Elena Armas",
    genre: "Romance",
    rating: 4.1,
    description: "A fake date to a wedding forces two coworkers to confront their complicated feelings.",
    image: "https://covers.openlibrary.org/b/title/The%20Spanish%20Love%20Deception-L.jpg"
  },
  {
    id: 20,
    title: "Marriage for One",
    author: "Ella Maise",
    genre: "Romance",
    rating: 4.3,
    description: "A marriage of convenience slowly turns into something neither partner expected.",
    image: "https://covers.openlibrary.org/b/title/Marriage%20for%20One-L.jpg"
  },

  {
    id: 21,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    genre: "Thriller",
    rating: 4.3,
    description: "A famous painter stops speaking after being accused of murdering her husband.",
    image: "https://covers.openlibrary.org/b/title/The%20Silent%20Patient-L.jpg"
  },
  {
    id: 22,
    title: "Verity",
    author: "Colleen Hoover",
    genre: "Thriller",
    rating: 4.2,
    description: "A struggling writer discovers disturbing secrets while completing another author's unfinished manuscripts.",
    image: "https://covers.openlibrary.org/b/title/Verity-L.jpg"
  },
  {
    id: 23,
    title: "Gone Girl",
    author: "Gillian Flynn",
    genre: "Mystery",
    rating: 4.3,
    description: "A woman's disappearance turns her marriage into a maze of suspicion and hidden truths.",
    image: "https://covers.openlibrary.org/b/title/Gone%20Girl-L.jpg"
  },
  {
    id: 24,
    title: "The Housemaid",
    author: "Freida McFadden",
    genre: "Thriller",
    rating: 4.3,
    description: "A woman takes a live-in housekeeping job and quickly realizes the family is hiding dark secrets.",
    image: "https://covers.openlibrary.org/b/title/The%20Housemaid-L.jpg"
  },
  {
    id: 25,
    title: "The Inmate",
    author: "Freida McFadden",
    genre: "Thriller",
    rating: 4.2,
    description: "A woman working in a prison is forced to confront a disturbing connection to her past.",
    image: "https://covers.openlibrary.org/b/title/The%20Inmate-L.jpg"
  },
  {
    id: 26,
    title: "The Guest List",
    author: "Lucy Foley",
    genre: "Mystery",
    rating: 4.1,
    description: "A glamorous wedding on a remote island turns deadly when one guest is murdered.",
    image: "https://covers.openlibrary.org/b/title/The%20Guest%20List-L.jpg"
  },
  {
    id: 27,
    title: "The Woman in the Window",
    author: "A.J. Finn",
    genre: "Thriller",
    rating: 4.0,
    description: "A woman watching her neighbors from home believes she has witnessed something terrible.",
    image: "https://covers.openlibrary.org/b/title/The%20Woman%20in%20the%20Window-L.jpg"
  },
  {
    id: 28,
    title: "The Maid",
    author: "Nita Prose",
    genre: "Mystery",
    rating: 4.1,
    description: "A hotel maid becomes involved in a murder investigation after discovering a wealthy guest dead.",
    image: "https://covers.openlibrary.org/b/title/The%20Maid-L.jpg"
  },

  {
    id: 29,
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Growth",
    rating: 4.6,
    description: "A practical guide to building better habits through small and consistent improvements.",
    image: "https://covers.openlibrary.org/b/title/Atomic%20Habits-L.jpg"
  },
  {
    id: 30,
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen R. Covey",
    genre: "Self Growth",
    rating: 4.5,
    description: "A framework for improving effectiveness through principles, habits and personal responsibility.",
    image: "https://covers.openlibrary.org/b/title/The%207%20Habits%20of%20Highly%20Effective%20People-L.jpg"
  },
  {
    id: 31,
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Self Growth",
    rating: 4.4,
    description: "A guide to developing focused work habits in a world full of distractions.",
    image: "https://covers.openlibrary.org/b/title/Deep%20Work-L.jpg"
  },
  {
    id: 32,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Self Growth",
    rating: 4.5,
    description: "A collection of stories exploring how emotions and behavior influence financial decisions.",
    image: "https://covers.openlibrary.org/b/title/The%20Psychology%20of%20Money-L.jpg"
  },
  {
    id: 33,
    title: "Ikigai",
    author: "Hector Garcia",
    genre: "Self Growth",
    rating: 4.2,
    description: "An exploration of Japanese ideas surrounding purpose, happiness and a meaningful life.",
    image: "https://covers.openlibrary.org/b/title/Ikigai-L.jpg"
  },
  {
    id: 34,
    title: "The Mountain Is You",
    author: "Brianna Wiest",
    genre: "Self Growth",
    rating: 4.4,
    description: "A reflection on self-sabotage and the process of turning internal obstacles into personal growth.",
    image: "https://covers.openlibrary.org/b/title/The%20Mountain%20Is%20You-L.jpg"
  },

  {
    id: 35,
    title: "Dune",
    author: "Frank Herbert",
    genre: "Sci-Fi",
    rating: 4.6,
    description: "A young heir becomes caught in a struggle for control of the most valuable planet in the universe.",
    image: "https://covers.openlibrary.org/b/title/Dune-L.jpg"
  },
  {
    id: 36,
    title: "The Hunger Games",
    author: "Suzanne Collins",
    genre: "Sci-Fi",
    rating: 4.5,
    description: "A teenager volunteers for a deadly televised competition to protect her younger sister.",
    image: "https://covers.openlibrary.org/b/title/The%20Hunger%20Games-L.jpg"
  },
  {
    id: 37,
    title: "Divergent",
    author: "Veronica Roth",
    genre: "Sci-Fi",
    rating: 4.3,
    description: "A young woman discovers that she does not fit into the rigid society she was raised in.",
    image: "https://covers.openlibrary.org/b/title/Divergent-L.jpg"
  },
  {
    id: 38,
    title: "The Martian",
    author: "Andy Weir",
    genre: "Sci-Fi",
    rating: 4.6,
    description: "An astronaut stranded on Mars must use science and ingenuity to survive.",
    image: "https://covers.openlibrary.org/b/title/The%20Martian-L.jpg"
  },
  {
    id: 39,
    title: "Project Hail Mary",
    author: "Andy Weir",
    genre: "Sci-Fi",
    rating: 4.6,
    description: "A lone astronaut wakes up with no memory and discovers that humanity's survival depends on his mission.",
    image: "https://covers.openlibrary.org/b/title/Project%20Hail%20Mary-L.jpg"
  },
  {
    id: 40,
    title: "Ready Player One",
    author: "Ernest Cline",
    genre: "Sci-Fi",
    rating: 4.3,
    description: "A teenager enters a massive virtual competition where winning could change his life forever.",
    image: "https://covers.openlibrary.org/b/title/Ready%20Player%20One-L.jpg"
  },

  {
    id: 41,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: 4.7,
    description: "Bilbo Baggins leaves his quiet life behind and joins a dangerous adventure with dwarves.",
    image: "https://covers.openlibrary.org/b/title/The%20Hobbit-L.jpg"
  },
  {
    id: 42,
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    rating: 4.7,
    description: "A young hobbit begins a journey to destroy a powerful ring before evil can reclaim it.",
    image: "https://covers.openlibrary.org/b/title/The%20Fellowship%20of%20the%20Ring-L.jpg"
  },
  {
    id: 43,
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    rating: 4.8,
    description: "A young boy discovers that he is a wizard and begins his first year at Hogwarts.",
    image: "https://covers.openlibrary.org/b/title/Harry%20Potter%20and%20the%20Sorcerer%27s%20Stone-L.jpg"
  },
  {
    id: 44,
    title: "The Cruel Prince",
    author: "Holly Black",
    genre: "Fantasy",
    rating: 4.4,
    description: "A mortal girl living among faeries becomes entangled in palace politics and dangerous intrigue.",
    image: "https://covers.openlibrary.org/b/title/The%20Cruel%20Prince-L.jpg"
  },
  {
    id: 45,
    title: "Caraval",
    author: "Stephanie Garber",
    genre: "Fantasy",
    rating: 4.3,
    description: "Two sisters enter a mysterious magical game where nothing is quite what it seems.",
    image: "https://covers.openlibrary.org/b/title/Caraval-L.jpg"
  },
  {
    id: 46,
    title: "The Night Circus",
    author: "Erin Morgenstern",
    genre: "Fantasy",
    rating: 4.3,
    description: "Two young magicians compete in a mysterious circus that appears without warning.",
    image: "https://covers.openlibrary.org/b/title/The%20Night%20Circus-L.jpg"
  },
  {
    id: 47,
    title: "The Priory of the Orange Tree",
    author: "Samantha Shannon",
    genre: "Fantasy",
    rating: 4.3,
    description: "Queens, dragons and ancient magic collide in an epic struggle to save a divided world.",
    image: "https://covers.openlibrary.org/b/title/The%20Priory%20of%20the%20Orange%20Tree-L.jpg"
  },
  {
    id: 48,
    title: "Shadow and Bone",
    author: "Leigh Bardugo",
    genre: "Fantasy",
    rating: 4.2,
    description: "A young soldier discovers a rare power that could change the fate of her war-torn country.",
    image: "https://covers.openlibrary.org/b/title/Shadow%20and%20Bone-L.jpg"
  },
  {
    id: 49,
    title: "Six of Crows",
    author: "Leigh Bardugo",
    genre: "Fantasy",
    rating: 4.6,
    description: "A group of dangerous criminals must work together to pull off an impossible heist.",
    image: "https://covers.openlibrary.org/b/title/Six%20of%20Crows-L.jpg"
  },
  {
    id: 50,
    title: "A Deadly Education",
    author: "Naomi Novik",
    genre: "Fantasy",
    rating: 4.4,
    description: "Students at a magical school must survive monsters, dangerous spells and each other.",
    image: "https://covers.openlibrary.org/b/title/A%20Deadly%20Education-L.jpg"
  }
];

export default books;