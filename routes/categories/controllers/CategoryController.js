const Category = require('../models/Category');
const User = require('../../users/models/User');
const userController = require('../../users/controllers/userController');
const Project = require('../../projects/models/Project');

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
        req.flash('errors', 'category name already exists please type another unique name');
        return res.redirect(301, '/api/users/projects/categories/new-category');
      } else if (allCategoriesFindAndCompareColor) {
        req.flash('errors', 'category color already exists please type another unique color');
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
    try {
      let currUser = await User.findOne({ _id: req.user._id});
      if(currUser) {

      let allCategories = await Category.find({ owner: currUser._id });
      return res.render('category/edit-category', { categoriesToChooseFromThatExistAlready: allCategories });
      }
    } catch (error) {
      req.flash('errors', 'We cannot get to New Category page at the moment please try again and contact developer');
      res.redirect(301, '/api/users/projects/all-projects');
    }
  },

  editCategoryNoCategorySelectedToEditPUT: async (req, res) => {
    try {
      req.flash('messages', 'You have not selected Category to Edit please choose category from dropdown');
      res.redirect(301, '/api/users/projects/categories/edit-category');
    } catch (error) {
    req.flash('errors', 'We cannot get to New Category page at the moment please try again and contact developer');
    res.redirect(301, '/api/users/projects/all-projects');
    }
  },

  editCategoryPUT: async (req, res) => {
    try {
      const { toChangeCategoryNewName, categoryNameDropDown, toChangeCategoryNewColor } = req.body;
      const paramsCategoryName = req.params.categoryName;
  
      if(!toChangeCategoryNewName || !categoryNameDropDown || !toChangeCategoryNewColor) {
        req.flash('errors', 'Please provide category name and color with chosen category to change these fields are required otherwise if don\'t want to change anything go back to All Projects');
        return res.redirect(301, '/api/users/projects/categories/edit-category');
      }
      
      let currUser = await User.findOne({ _id: req.user._id});
      if (currUser) {
        let allCategoriesFindAndCompareName = await Category.findOne({ categoryName: toChangeCategoryNewName, owner: currUser._id }).catch((error) => console.log(error));
        let allCategoriesFindAndCompareColor = await Category.findOne({ categoryColor: toChangeCategoryNewColor, owner: currUser._id }).catch((error) => console.log(error));
        if(allCategoriesFindAndCompareName) {
          req.flash('errors', 'category name already exists please type another unique name');
          return res.redirect(301, '/api/users/projects/categories/edit-category');
        } else if (allCategoriesFindAndCompareColor) {
          req.flash('errors', 'category color already exists please type another unique color');
          return res.redirect(301, '/api/users/projects/categories/edit-category');
        } else if (allCategoriesFindAndCompareName && allCategoriesFindAndCompareColor) {
          req.flash('errors', 'Please provide category name and category color combination that is unique from others that already exist');
          return res.redirect(301, '/api/users/projects/categories/edit-category');
        }
        await Category.findOne({ categoryName: categoryNameDropDown, owner: currUser._id})
        .then((foundCategory) => {

          if(toChangeCategoryNewName) foundCategory.categoryName = toChangeCategoryNewName;
  
          if(toChangeCategoryNewColor) foundCategory.categoryColor = toChangeCategoryNewColor;
          foundCategory.save().then((savedCategory) => {
            req.flash('messages', 'You have successfully created a new category, try creating new Project for it from create project tab and choosing it from dropdown menu');
            res.redirect(301, '/api/users/projects/all-projects');

          }).catch((error) => {
            req.flash('errors', 'We cannot get to Edit Category page at the moment please try again and contact developer');
            res.redirect(301, '/api/users/projects/all-projects');
          });
        })
        
        .catch((error) => {
          req.flash('errors', 'We cannot get to Edit Category page at the moment please try again and contact developer');
          res.redirect(301, '/api/users/projects/all-projects');
        });

      }
    } catch (error) {
      req.flash('errors', 'We cannot get to Edit Category page at the moment please try again and contact developer');
      res.redirect(301, '/api/users/projects/all-projects');
    }   
  },

  deleteCategoryByUniqueName: async(req, res) => {
    try {
      const { CategoriesDropDownToDELETE } = req.body;
      const paramsCategoryName = req.params.categoryName;
  

      let currUser = await User.findOne({ _id: req.user._id});
      if(currUser) {
        let removedCategory = await Category.findOneAndRemove({ categoryName: CategoriesDropDownToDELETE, owner: currUser._id})
        await Project.deleteMany({ category: removedCategory._id});
            
            req.flash('messages', 'You have successfully deleted a category and its child projects');
            return res.redirect(301, '/api/users/projects/all-projects');
  

        }
        

    } catch(error) {
      req.flash('errors', 'We couldn\'t delete your Category Something is wrong on our end please contact developer or try again');
      res.redirect(301, `/api/users/projects/all-projects`);
    }
  }
}