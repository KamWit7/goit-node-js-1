const path = require('path')
const fs = require('fs').promises

const contactsPath = './db/contacts.json'

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) =>
      contacts.map(({ name, email, phone }) => ({ name, email, phone }))
    )
    .then((contacts) => console.table(contacts))
    .catch((err) => console.log(err.message))
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) =>
      contacts.find((contact) => Number(contact.id) === Number(contactId))
    )
    .then((contact) => console.table(contact))
    .catch((err) => console.log(err.message))
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const isInContacts = () =>
        contacts.find((contact) => Number(contact.id) === Number(contactId))

      if (!isInContacts()) return

      return fs.writeFile(
        contactsPath,
        JSON.stringify(
          contacts?.filter(
            (contact) => Number(contact.id) !== Number(contactId)
          )
        )
      )
    })
    .catch((err) => console.log(err.message))
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      const newContact = { id: `${contacts.length + 1}`, name, email, phone }

      const isInContactsPhone = () =>
        contacts.find(
          (contact) => Number(contact.phone) === Number(newContact.phone)
        )

      if (isInContactsPhone()) return

      return fs.writeFile(
        contactsPath,
        JSON.stringify([...contacts, newContact])
      )
    })
    .catch((err) => console.log(err.message))
}
