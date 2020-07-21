const router = require('express').Router();
const { newCategoryGET, newCategoryPOST, editCategoryGET, editCategoryPOST, } = require('./controllers/CategoryController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/new-category', isThereAuth, newCategoryGET);
router.post('/new-category', isThereAuth, newCategoryPOST);

// router.get('/edit-category', isThereAuth, editCategoryGET);
// router.post('/edit-category/:categoryId', isThereAuth, editCategoryPOST);

module.exports = router