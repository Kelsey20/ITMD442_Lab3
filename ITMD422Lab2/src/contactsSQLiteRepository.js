
// const crypto = require('node:crypto');
// const fs = require('fs');
const path = require('path');
const betterSqlite3 = require('better-sqlite3');
const Contact = require('../src/contact');

const db = new betterSqlite3(path.join(__dirname, '../data/contacts.sqlite'), { verbose: console.log });
//create the tables
const createStmt = db.prepare("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, email TEXT, notes TEXT)");
createStmt.run();


/*db.set('1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7', {text: 'This is text 1', id: '1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7'});
db.set('e766a5f5-4c28-4b95-ba61-e56b19bca5ed', {text: 'This is text 2', id: 'e766a5f5-4c28-4b95-ba61-e56b19bca5ed'}); */

//load data method, in order to save all information when we open this web again
// const loadData = () => {
//     const jsonData = fs.readFileSync(path.join(__dirname, '../data/contacts.json'));
//     const contactsArray = JSON.parse(jsonData);
//     contactsArray.forEach(element => {
//       const aContact = new Contact(element[1].id, element[1].firstName, element[1].lastName, element[1].email, element[1].notes,);
//       db.set(aContact.id, aContact);
//     });
//     console.log(db);
//   }
  
  //save
// const saveData = () => {
//   const stringifyData = JSON.stringify(Array.from(db));
//     fs.writeFileSync(path.join(__dirname, '../data/contacts.json'), stringifyData);
//   };

const repo = {
    findAll: () => {
      const stmt = db.prepare("SELECT * FROM contacts");
      const rows = stmt.all();
      let contacts = [];
      rows.forEach((row) => {
        const aContact = new Contact(row.id, row.firstName, row.lastName, row.email, row.notes);
        contacts.push(aContact);
      });
      return contacts;
    },
    findById: (uuid) => {
      const stmt = db.prepare("SELECT * FROM contacts WHERE id = ?");
      const row = stmt.get(uuid);
      return new Contact(row.id, row.firstName, row.lastName,  row.email, row.notes);
    },
    create: (contact) => {
      const stmt = db.prepare("INSERT INTO contacts (firstName, lastName, email, notes) VALUES (?, ?, ?, ?)");
      const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes);
      console.log(` Contact Created with id: ${info.lastInsertRowid}`);
        // contact.id = crypto.randomUUID();
        // db.set(contact.id, contact);
        // saveData();
    },
    deleteById: (uuid) => { 
      const stmt = db.prepare("DELETE FROM contacts WHERE id = ?");
      const info = stmt.run(uuid);
      console.log(`rows affected: ${info.changes}`);
        // db.delete(uuid)
        // saveData();
    }, 
    update: (contact) => {
      const stmt = db.prepare("UPDATE contacts SET firstName = ?, lastName = ?, email = ?, notes = ? WHERE id = ?");
      const info = stmt.run(contact.firstName, contact.lastName, contact.email, contact.notes, contact.id );
      console.log(`rows affected: ${info.changes}`);
        // db.set(contact.id, contact)
        // saveData();
    },
};


module.exports = repo;