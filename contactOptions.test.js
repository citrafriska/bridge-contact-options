const { expect } = require("@jest/globals");
const ContactOptions = require("./contactOptions");

const contacts = [
  {
    name: "John Doe",
    email: "john@brdg.app",
    introsOffered: { free: 3, vip: 0 },
  },
  {
    name: "Billy Ray Jenkins",
    email: "billy.jenkins@gmail.com",
    introsOffered: { free: 5, vip: 0 },
  },
  {
    name: "Jenny Baggins",
    email: "jeni@x.com",
    introsOffered: { free: 5, vip: 1 },
  },
  {
    name: "Lloyd Banks",
    email: "lloyd@banks.com",
    introsOffered: { free: 0, vip: 0 },
  },
  {
    name: "BA Lewis",
    email: "ba.lewis@outlook.com",
    introsOffered: { free: 8, vip: 0 },
  },
  {
    name: "John Johnson",
    email: "jj@z.com",
    introsOffered: { free: 4, vip: 0 },
  },
  {
    name: "Adam Johnson",
    email: "aj@z.com",
    introsOffered: { free: 4, vip: 0 },
  },
  {
    name: "Joey Simpson",
    email: "joey@hotmail.com",
    introsOffered: { free: 9, vip: 1 },
  },
  {
    name: "Penny Smith",
    email: "penny@smith.com",
    introsOffered: { free: 2, vip: 0 },
  },
];

test("VIP contacts have NOT yet been offered a VIP intro", () => {
  const contactOptions = new ContactOptions(contacts).all();
  const vip = contactOptions.find((contact) => contact.contactOption === "VIP");
  const contact = contacts.find((contact) => contact.name === vip.name);
  expect(contact.introsOffered.vip).toBe(0);
});

test("Free contacts has already been offered one or more VIP intros", () => {
  const contactOptions = new ContactOptions(contacts).all();
  const frees = contactOptions.filter(
    (contact) => contact.contactOption === "Free"
  );

  const freeContacts = [];
  contacts.map((contact) => {
    contactOptions.map((option) => {
      if (contact.name === option.name) {
        if (contact.introsOffered.vip >= 1) {
          freeContacts.push({
            ...contact,
            contactOption: option.contactOption,
          });
        }
      }
    });
  });

  freeContacts.map((contact, i) => {
    expect(contact.contactOption).toEqual("Free");
  });
});

test("Free contacts NOT have the highest ranking of all contacts who have NOT yet been offered a VIP intro", () => {
  const contactOptions = new ContactOptions(contacts).all();
  const noVips = [];
  contacts.map((contact) => {
    contactOptions.map((option) => {
      if (contact.name === option.name) {
        if (contact.introsOffered.vip === 0) {
          noVips.push({
            ...option,
            introsOffered: contact.introsOffered,
          });
        }
      }
    });
  });

  noVips.sort((a, b) => {
    return a.ranking - b.ranking;
  });

  const length = noVips.length - 1;
  noVips.map((contact, i) => {
    if (i < length) {
      expect(contact.ranking).toBeLessThan(noVips[length].ranking);
    }
  });
});

test("Return all contacts, ordered alphabetically by their last name, and then by their first name", () => {
  const duplicatedFirstName = {
    name: `${contacts[0].name.slice(0, contacts[0].name.indexOf(" "))} A`,
    email: contacts[0].email,
    introsOffered: contacts[0].introsOffered,
  };

  const allContacts = new ContactOptions([
    ...contacts,
    duplicatedFirstName,
  ]).all();
  const sorted = allContacts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  expect(allContacts).toStrictEqual(sorted);

  let nameIndex = 0;
  let dupeIndex = 0;
  allContacts.map((contact, i) => {
    if (contact.name === contacts[0].name) {
      nameIndex = i;
    } else if (contact.name === duplicatedFirstName.name) {
      dupeIndex = i;
    }
  });

  expect(nameIndex).toBeGreaterThan(dupeIndex);
});
