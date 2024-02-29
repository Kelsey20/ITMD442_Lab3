const { validationResult } = require('express-validator');
const contactsRepo = require('../src/contactsFileRepository');
const Contact = require('../src/contact');
/* GET users listing. */
/* First of all, need to apply the Module Exports funtional, instead of the 'router.get' */
exports.contacts_list = function(req, res, next) {
    const data  =  contactsRepo.findAll();
  res.render('contacts', {title:'Contacts Page', contacts: data});
  //add the data method to the contact page
};



/* GET users add contact. */
exports.contacts_create_get = function(req, res, next) {
    res.render('contacts_add', {title:'Add a Contact'});
    //implement the add method to the contact page
  };

/* POST users add */
/* Modify the router wiht exports.contacts_create_post*/
exports.contacts_create_post = function(req, res, next) {
    //console.log(req.body);
    if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '')  {
        res.render('contacts_add', {title:'Add a Contact', msg:'First Name and Last Name filed can not be empty!!'});
    } 
    else {
        const newContact = new Contact('', req.body.firstName, req.body.lastName, req.body.email, req.body.notes);
        contactsRepo.create(newContact);
    res.redirect('/contacts');
    }
    //implement the console log at backend
  };

/* GET single user contact. */
/* Instead with the exports_details */
exports.contacts_details = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    const currentTime = new Date(); // Get the current time
    if (contact) {
        // Set the lastEditedTime property to the current time
    contact.lastEditedTime = currentTime;
        res.render('contact', { 
            title: 'Your Contact Information',
            contact: contact,
            currentTime: currentTime
        });
       
    } else {
        res.redirect('/contacts');
    }
};

/* GET contact delete method*/
/* exports.contacts_delete_get */
exports.contacts_delete_get = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_delete', { title: 'Delete Your Contact Information', contact: contact} );
  };

/* POSt contact delete method*/
/* exports.contacts_delete_post */
exports.contacts_delete_post = function(req, res, next) {
    //delete from repo
    contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
  };


/* GET contacts edit method */
/* exports.contacts_edit_get */
exports.contacts_edit_get = function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit Contact', contact: contact} );
  };
  

/* POST users edit. */
/* exports.contacts_edit_post */
exports.contacts_edit_post = function(req, res, next) {
    //console.log(req.body);
    if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '') {
        const contact = contactsRepo.findById(req.params.uuid);
        res.render('contacts_edit', { 
            title: 'Edit Contact', 
            msg: 'First Name and Last Name text fields can NOT be empty!', 
            contact: contact });
    } else {
        const updatedContact = new Contact(req.params.uuid, req.body.firstName, req.body.lastName, req.body.email, req.body.notes, req.body.notes );
        contactsRepo.update(updatedContact);   
        //contactsRepo.create({text:req.body.contactText.trim()});
        res.redirect('/contacts/' + req.params.uuid);
    }
    //implement the console log at backend
  };

