import Product from "../models/Product.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const ProductController = {
  async addProduct(req, res) {
    try {
      const { name, description, brandname, quantity, units, image } = req.body;

      const product = new Product({
        name,
        description,
        brandname,
        quantity,
        units,
        image,
      });

      // Save the product in the database
      await product.save();
      console.log("Product added");
      return res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async getAllProduct(req, res) {
    try {
      const authorizationHeaders = req.headers.authorization;

      const products = await Product.find({});

      if (!authorizationHeaders) {
        return res.status(400).json({ message: "Unauthorized access" });
      }

      const auth = authorizationHeaders.split(" ")[1];

      const verify = jwt.verify(auth, process.env.SECRET_KEY);

      if (verify) {
        console.log;
        const findUser = await User.findOne({ _id: verify.userId });

        if (findUser) {
          return res.status(200).json(products);
        } else return res.status(400).json({ message: "Unauthoriz0ed access" });
      }
    } catch (error) {
      res.status(400).json({ message: "Unauthorized access" });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      const { name, description, brandname, quantity, units, image } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          name,
          description,
          brandname,
          quantity,
          units,
          image,
        },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  async deleteProductById(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByIdAndDelete(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default ProductController;
