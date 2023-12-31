const mockListData = [
  {
    id: 1,
    name: "Domácí potřeby",
    items: [
      { id: 101, name: "Toaletní papír", quantity: 4, inBasket: false },
      { id: 102, name: "Mýdlo", quantity: 3, inBasket: true },
    ],
    members: ["David Ryšánek", "Eva Nováková"],
  },
  {
    id: 2,
    name: "Práce",
    items: [
      { id: 103, name: "Papír A4", quantity: 10, inBasket: false },
      { id: 104, name: "Pero", quantity: 5, inBasket: true },
    ],
    members: ["Petr Nový", "Lucie Stará"],
  },
  {
    id: 3,
    name: "Večírek",
    items: [
      { id: 105, name: "Chipsy", quantity: 2, inBasket: false },
      { id: 106, name: "Pivo", quantity: 6, inBasket: true },
    ],
    members: ["Jana Vítečková", "Martin Pivoňka"],
  },
  {
    id: 4,
    name: "Fitness",
    items: [
      { id: 107, name: "Proteinová tyčinka", quantity: 4, inBasket: false },
      { id: 108, name: "Iontový nápoj", quantity: 1, inBasket: true },
    ],
    members: ["Karel Silný", "Erik Rychlý"],
  },
  {
    id: 5,
    name: "Narozeniny",
    items: [
      { id: 109, name: "Dárková karta", quantity: 1, inBasket: false },
      { id: 110, name: "Balónek", quantity: 10, inBasket: true },
    ],
    members: ["Anna Slavná", "Filip Známý"],
  },
  {
    id: 6,
    name: "Vánoce",
    items: [
      { id: 111, name: "Vánoční ozdoby", quantity: 20, inBasket: false },
      { id: 112, name: "Svíčky", quantity: 5, inBasket: true },
    ],
    members: ["Lucie Bílá", "Josef Černý"],
  },
];

export { mockListData };
