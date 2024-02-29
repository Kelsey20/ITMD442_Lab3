
const crypto = require('node:crypto');
const db = new Map();

db.set('1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7', {text: 'This is text 1', id: '1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7'});
db.set('e766a5f5-4c28-4b95-ba61-e56b19bca5ed', {text: 'This is text 2', id: 'e766a5f5-4c28-4b95-ba61-e56b19bca5ed'});

const repo = {
    findAll: () => Array.from(db.values()),
    findById: (uuid) => db.get(uuid),
    create: (contact) => {
        const newContact = {
            id: crypto.randomUUID(),
            text: contact.text,
        };
        db.set(newContact.id, newContact);
    },
    deleteById: (uuid) => db.delete(uuid), 
    update: (contact) => db.set(contact.id, contact),

};

module.exports = repo;