import { Request, Response } from "express";
import { AppDataSource } from "../orm/Config/Data-source";
import { Product } from "../orm/Entities/StockProduct";
import { LessThan } from "typeorm";

interface ProductDTO {
  name: string;
  description: string;
  stock_quantity: number;
  low_stock_threshold: number;
}

export async function addProduct(req: Request, res: Response) {
  try {
    const { name, description, stock_quantity, low_stock_threshold } = req.body as ProductDTO;;

    if (!name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(stock_quantity<0 || low_stock_threshold<0)
    {
        return res.status(400).json({ message: "Stock quantity or low stock thershold should not be negative"});
    }

    const productRepository = AppDataSource.getRepository(Product);

 const productDetails = await productRepository.findOne({
  where: { product_name: name }
});

if (productDetails) {
  return res.status(400).json({ message: "Product name already exists" });
}

    const product = productRepository.create({
      product_name: name,
      product_description: description,
      stock_quantity,
      low_stock_threshold,
    });

    const savedProduct = await productRepository.save(product);

    return res.status(201).json({
      message: "Product added successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error while adding product:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const productRepository = AppDataSource.getRepository(Product);

    const productDetails = await productRepository.find({
      order: { product_name: "ASC" } 
    });

    return res.status(200).json({
      message: "Products fetched successfully",
      products: productDetails,
    });
  } catch (error) {
    console.error("Error while listing products:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function getProductBelowThreshold(req: Request, res: Response) {
  try {
    const { value } = req.params;

    const threshold = parseInt(value, 10);

    if (isNaN(threshold)) {
      return res.status(400).json({ message: "Invalid threshold value" });
    }

    const productRepository = AppDataSource.getRepository(Product);

    const productDetails = await productRepository.find({
      where: { stock_quantity: LessThan(threshold) },
      order: { product_name: "ASC" },
    });

    return res.status(200).json({
      message: "Products below threshold fetched successfully",
      products: productDetails,
    });
  } catch (error) {
    console.error("Error while fetching products below threshold:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const { id } = req.params; 
    const { name, description, stock_quantity, low_stock_threshold } = req.body as ProductDTO;;

    if(stock_quantity<0)
        return res.status(400).json({message:"stock_quantity cannot go below zero."})

    const productRepository = AppDataSource.getRepository(Product);


    const product = await productRepository.findOne({ where: { product_id: id } }); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    product.product_name = name ?? product.product_name;
    product.product_description = description ?? product.product_description;
    product.stock_quantity = stock_quantity ?? product.stock_quantity;
    product.low_stock_threshold = low_stock_threshold ?? product.low_stock_threshold;

    const updatedProduct = await productRepository.save(product);

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating product:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function increaseStockQuantity(req: Request, res: Response) {
  try {
    const { id } = req.params; 

    const { amount } = req.body;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { product_id: id } }); 
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.stock_quantity = (product.stock_quantity ?? 0) + amount;


    const updatedProduct = await productRepository.save(product);

    return res.status(200).json({
      message: "Stock quantity increased successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while increasing stock quantity:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}

export async function decreaseStockQuantity(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const { amount } = req.body;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { product_id: id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock_quantity < amount) {
      return res.status(400).json({ message: "Stock quantity is insufficient" });
    }

    product.stock_quantity -= amount;

    const updatedProduct = await productRepository.save(product);

    return res.status(200).json({
      message: "Stock quantity decreased successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while decreasing stock quantity:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}


export async function deleteProduct(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const productRepository = AppDataSource.getRepository(Product);

    const product = await productRepository.findOne({ where: { product_id: id } });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    await productRepository.remove(product);

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting the product:", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
}
