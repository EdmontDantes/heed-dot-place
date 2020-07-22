const router = require('express').Router();
const { newCategoryGET, newCategoryPOST, editCategoryGET, editCategoryNoCategorySelectedToEditPUT, editCategoryPUT, deleteCategoryByUniqueName } = require('./controllers/CategoryController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/new-category', isThereAuth, newCategoryGET);
router.post('/new-category', isThereAuth, newCategoryPOST);

router.get('/edit-category', isThereAuth, editCategoryGET);
router.put('/edit-category/emptyBLEhDKLSNMCKLVKLSKLEUEENFIMDFHNDSKLJHsshkdfnvklnxcnmlDKJFGSHKDGsldkjlkcvxmxlkjdlfgkslgkhzlxckvbnmklzhgfklhd', isThereAuth, editCategoryNoCategorySelectedToEditPUT);
router.put('/edit-category/:categoryName', isThereAuth, editCategoryPUT);

router.delete('/delete-category/emptyBLEhDKLSNMCKLVKLSKLEUEENFIMDFHNDSKLJHsshkdfnvklnxcnmlDKJFGSHKDGsldkjlkcvxmxlkjdlfgkslgkhzlxckvbnmklzhgfklhd', isThereAuth, editCategoryNoCategorySelectedToEditPUT);
router.delete('/delete-category/:categoryNameToDelete', isThereAuth, deleteCategoryByUniqueName);

module.exports = router