const Category = require('../models/Category');
const User = require('../../users/models/User');
const userController = require('../../users/controllers/userController');

module.exports = {
  
  newCategoryGET: async (req, res) => {
    try {
      return res.render('category/create-category')
    } catch (error) {
      req.flash('errors', 'We cannot get to New Category page at the moment please try again and contact developer');
      res.redirect(301, '/api/users/projects/all-projects');
    }
  },
  newCategoryPOST: async (req, res) => {
  try {
    const { categoryName, categoryColor } = req.body;

    if(!categoryName || !categoryColor) {
      req.flash('errors', 'Please provide category name and category color these fields are required');
      return res.redirect(301, '/api/users/projects/categories/new-category');
    }
    
    let currUser = await User.findOne({ _id: req.user._id});
    if (currUser) {
      let allCategoriesFindAndCompareName = await Category.findOne({ categoryName: categoryName, owner: currUser._id }).catch((error) => console.log(error));
      let allCategoriesFindAndCompareColor = await Category.findOne({ categoryColor: categoryColor, owner: currUser._id }).catch((error) => console.log(error));
      
      if(allCategoriesFindAndCompareName) {
        req.flash('errors', 'category name already exists please type another unqiue name');
        return res.redirect(301, '/api/users/projects/categories/new-category');
      } else if (allCategoriesFindAndCompareColor) {
        req.flash('errors', 'category color already exists please type another unqiue name');
        return res.redirect(301, '/api/users/projects/categories/new-category');
      } else if (allCategoriesFindAndCompareName && allCategoriesFindAndCompareColor) {
        req.flash('errors', 'Please provide category name and category color combination that is unique from others that already exist');
        return res.redirect(301, '/api/users/projects/categories/new-category');
      }
      let newCategory = await new Category();
      if(categoryName) newCategory.categoryName = categoryName;
      if(categoryColor) newCategory.categoryColor = categoryColor;
      
      newCategory.owner = currUser._id;
      await newCategory.save().then((savedCategory) => {
        req.flash('messages', 'You have successfully created a new category, try creating new Project for it from create project tab and choosing it from dropdown menu');
        res.redirect(301, '/api/users/projects/all-projects');
      })
      .catch((error) => {
        req.flash('errors', 'We couldn\'t create your Category Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/api/users/projects/create-project');
      });
    }
  } catch (error) {
    req.flash('errors', 'We cannot get to New Category page at the moment please try again and contact developer');
    res.redirect(301, '/api/users/projects/all-projects');
  }   
  },
  editCategoryGET: async (req, res) => {

  },
  editCategoryPOST: async (req, res) => {

  }
}