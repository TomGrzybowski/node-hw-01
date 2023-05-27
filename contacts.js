const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    console.log(contacts);
    // contacts.forEach((contact) => {
    //   console.log(`Name: ${contact.name}`);
    //   console.log(`Email: ${contact.email}`);
    //   console.log(`Phone: ${contact.phone}`);
    //   console.log(`Id: ${contact.id}`);
    // });
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

function getContactById(contactId) {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const targetContact = contacts.filter(
      (contact) => contact.id === contactId
    );

    console.log(targetContact);
    // console.log(contacts);
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

function removeContact(contactId) {
  try {
    const contactsData = fs.readFileSync(contactsPath, "utf-8");
    const contacts = JSON.parse(contactsData);

    const targetContact = contacts.filter(
      (contact) => contact.id === contactId
    )[0];

    if (targetContact) {
      const targetIndex = contacts.findIndex(
        (element) => element.id === targetContact.id
      );

      if (targetIndex !== -1) {
        const removedContact = contacts.splice(targetIndex, 1);

        const updatedContactsData = JSON.stringify(contacts);
        fs.writeFileSync(contactsPath, updatedContactsData, "utf-8");

        console.log("Contact removed successfully!");
      }
    } else {
      console.log("Contact not found.");
    }
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

function addContact(name, email, phone) {
  try {
    if (!(name === null || email === null || phone === null)) {
      const contactsData = fs.readFileSync(contactsPath, "utf-8");
      const contacts = JSON.parse(contactsData);

      contacts.push({
        id: uuidv4(),
        name,
        email,
        phone,
      });

      fs.writeFileSync(contactsPath, JSON.stringify(contacts));

      console.log("Contact added");
    } else {
      console.log("Some information is missing");
    }
  } catch (error) {
    console.error("Error reading contacts:", error);
  }
}

module.exports = {
  listContacts,
  addContact,
  removeContact,
  getContactById,
};
