const { validationResult } = require('express-validator');
const contactsRepo = require('../src/contactsFileRepository');

/* GET users listing. */
router.get('/', function(req, res, next) {
    const data  =  contactsRepo.findAll();
  res.render('contacts', {title:'Contacts Page', contacts: data});
  //add the data method to the contact page
});


/* GET users add contact. */
router.get('/add', function(req, res, next) {
    res.render('contacts_add', {title:'Add a Contact'});
    //implement the add method to the contact page
  });

/* POST users add . */
router.post('/add', function(req, res, next) {
    //console.log(req.body);
    if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '')  {
        res.render('contacts_add', {title:'Add a Contact', msg:'First Name and Last Name filed can not be empty!!'});
    } 
    else {
    contactsRepo.create({
        firstName: req.body.firstName.trim(),
        lastName: req.body.lastName.trim(),
        email: req.body.email, 
        notes: req.body.notes,
        
    });
    res.redirect('/contacts');
    }
    //implement the console log at backend
  });

/* GET single user contact. */
router.get('/:uuid', function(req, res, next) {
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
});

/* GET contact delete method*/
router.get('/:uuid/delete', function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_delete', { title: 'Delete Your Contact Information', contact: contact} );
  });

/* POSt contact delete method*/
router.post('/:uuid/delete', function(req, res, next) {
    //delete from repo
    contactsRepo.deleteById(req.params.uuid);
    res.redirect('/contacts');
  });


/* GET contacts edit method */
router.get('/:uuid/edit', function(req, res, next) {
    const contact = contactsRepo.findById(req.params.uuid);
    res.render('contacts_edit', { title: 'Edit Contact', contact: contact} );
  });
  

/* POST users add . */
router.post('/:uuid/edit', function(req, res, next) {
    //console.log(req.body);
    if (req.body.firstName.trim() === '' || req.body.lastName.trim() === '') {
        const contact = contactsRepo.findById(req.params.uuid);
        res.render('contacts_edit', { 
            title: 'Edit Contact', 
            msg: 'First Name and Last Name text fields can NOT be empty!', 
            contact: contact });
    } else {
        const updatedContact = {
            id: req.params.uuid, 
            firstName: req.body.firstName.trim(), 
            lastName: req.body.lastName.trim(), 
            email: req.body.email, 
            notes: req.body.notes ,
        };
    contactsRepo.update(updatedContact);
    //contactsRepo.create({text:req.body.contactText.trim()});
    res.redirect('/contacts/' + req.params.uuid);
    }
    //implement the console log at backend
  });

