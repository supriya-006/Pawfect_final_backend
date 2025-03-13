import Category from '../models/categoryModel.js';

// Add category
export const addCategory = async (req, res) => {
    try {
        const categoryExists = await Category.findOne({ category_name: req.body.category_name });

        if (categoryExists) {
            return res.status(400).json({ error: "Category already exists" });
        }

        const categoryToAdd = await Category.create({ category_name: req.body.category_name });

        if (!categoryToAdd) {
            return res.status(400).json({ error: "Something went wrong" });
        }

        res.status(201).json(categoryToAdd);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get all categories
export const getAllCategories = async (req, res) => {
   try {
      let categories = await Category.find();

      if (!categories || categories.length === 0) {
         return res.status(404).json({ error: "No categories found" });
      }

      res.json(categories);
   } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};


// Get category details
export const getCategoryDetails = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Update category
export const updateCategory = async (req, res) => {
    try {
        const categoryToUpdate = await Category.findByIdAndUpdate(
            req.params.id,
            { category_name: req.body.category_name },
            { new: true }
        );

        if (!categoryToUpdate) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json(categoryToUpdate);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete category
export const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        res.json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
