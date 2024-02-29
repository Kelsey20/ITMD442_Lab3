var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid'); 
// Import uuid library for generating IDs

// Bring the Controller to use
const contactsController = require('../controllers/contactsController');

//const contactsRepo = require('../src/contactsMemoryRepository');
const contactsRepo = require('../src/contactsFileRepository');
/*let data =[
    {text: 'this is the test', id:'1f95d3f9-f22e-4981-8d78-9e41c3b8ecc7'},
    {text: 'this is the test', id:'e766a5f5-4c28-4b95-ba61-e56b19bca5ed'}

];*/

/* GET users listing. */
/* function call back */
router.get('/', contactsController.contact_list);


/* GET users add contact. */
router.get('/add', contactsController.contacts_create_get);

/* POST users add . */
router.post('/add', contactsController.contacts_create_post);

/* GET single user contact. */
router.get('/:uuid', contactsController.contacts_details);

/* GET contact delete method*/
router.get('/:uuid/delete', contactsController.contacts_delete_get);

/* POSt contact delete method*/
router.post('/:uuid/delete', contactsController.contacts_delete_post);


/* GET contacts edit method */
router.get('/:uuid/edit', contactsController.contacts_edit_get);
  

/* POST users add . */
router.post('/:uuid/edit', contactsController.contacts_edit_post);

module.exports = router;
