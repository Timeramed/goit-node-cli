const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contact.json");

async function listContacts() {
  const data = await fs.readFile(`${contactsPath}`, "utf-8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.contactId === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.find((item) => item.contactId === contactId);
  if (index === -1) {
    return null;
  }
  const { result } = contacts.splice(index, 1);
  return result;
}

async function addContact(data) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
