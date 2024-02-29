
const crypto = require('node:crypto');
const fs = require('fs');
const path = require('path');
const db = new Map();

/*db.set('1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7', {text: 'This is text 1', id: '1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7'});
db.set('e766a5f5-4c28-4b95-ba61-e56b19bca5ed', {text: 'This is text 2', id: 'e766a5f5-4c28-4b95-ba61-e56b19bca5ed'}); */

//load data method, in order to save all information when we open this web again
const loadData = () => {
    const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
    const contactsArray = JSON.parse(jsonData);
    contactsArray.forEach(element => {
      db.set(element[0], element[1]);
    });
  };
  
  //save
  const saveData = () => {
    const stringifyData = JSON.stringify(Array.from(db));
    fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
  };

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            notes: contact.notes,
        }
        db.set(newContact.id, newContact);
        saveData();
    },
    deleteById: (uuid) => { 
        db.delete(uuid)
        saveData();
    }, 
    update: (contact) => {
        db.set(contact.id, contact)
        saveData();
    },
};

loadData();

module.exports = repo;