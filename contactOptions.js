class ContactOptions {
  constructor(contacts) {
    this.contacts = contacts;
    this.highest = {};
  }

  all() {
    this.highest = {
      ranking: 0,
    };
    const ranks = this.contacts.map((contact) => {
      let ranking = 3;
      const checkEmail = contact.email.slice(
        contact.email.indexOf("@"),
        contact.email.length
      );
      const fullName = contact.name.split(" ");
      if (
        checkEmail !== "@gmail.com" &&
        checkEmail !== "@hotmail.com" &&
        checkEmail !== "@outlook.com"
      ) {
        ranking += 2;
      }
      ranking += contact.introsOffered.free + contact.introsOffered.vip;
      const person = {
        name: contact.name,
        ranking: ranking,
        firstName: fullName[0],
        lastName: fullName[fullName.length - 1],
        contactOption: "Free",
      };
      if (contact.introsOffered.vip > 0) {
        return person;
      } else {
        if (ranking > this.highest.ranking) {
          this.highest = person;
          return person;
        }
        return person;
      }
    });
    this.highest.contactOption = "VIP";
    ranks.sort((a, b) => a.lastName.localeCompare(b.lastName));
    ranks.sort((a, b) => a.firstName.localeCompare(b.firstName));
    ranks.forEach((rank) => {
      delete rank.firstName;
      delete rank.lastName;
    });
    return ranks;
  }
}

module.exports = ContactOptions;
