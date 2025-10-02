import { increaseStockQuantity, decreaseStockQuantity } from "../Controllers/stockProductController";
import { AppDataSource } from "../orm/Config/Data-source";
import { Product } from "../orm/Entities/StockProduct";
import { Request, Response } from "express";

// Mock repository
const mockFindOne = jest.fn();
const mockSave = jest.fn();

(AppDataSource.getRepository as any) = jest.fn().mockReturnValue({
  findOne: mockFindOne,
  save: mockSave,
});

const mockResponse = () => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res as Response;
};

describe("Stock Controller Unit Tests", () => {
  let product: Product;

  beforeEach(() => {
    jest.clearAllMocks();
    product = {
      product_id: "123",
      product_name: "Test",
      product_description: "Test product",
      stock_quantity: 5,
      low_stock_threshold: 2,
    } as Product;
  });

  // -----------------------------
  // Increase stock tests
  // -----------------------------
  it("should increase stock when product exists", async () => {
    const req = { params: { id: "123" }, body: { amount: 3 } } as unknown as Request;
    const res = mockResponse();

    mockFindOne.mockResolvedValue(product);
    mockSave.mockResolvedValue({ ...product, stock_quantity: 8 });

    await increaseStockQuantity(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Stock quantity increased successfully",
      product: { ...product, stock_quantity: 8 },
    });
  });

  it("should return 404 when product not found (increase)", async () => {
    const req = { params: { id: "999" }, body: { amount: 3 } } as unknown as Request;
    const res = mockResponse();

    mockFindOne.mockResolvedValue(null);

    await increaseStockQuantity(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
  });

  // -----------------------------
  // Decrease stock tests
  // -----------------------------
  it("should decrease stock when product has enough quantity", async () => {
    const req = { params: { id: "123" }, body: { amount: 2 } } as unknown as Request;
    const res = mockResponse();

    mockFindOne.mockResolvedValue(product);
    mockSave.mockResolvedValue({ ...product, stock_quantity: 3 });

    await decreaseStockQuantity(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Stock quantity decreased successfully",
      product: { ...product, stock_quantity: 3 },
    });
  });

  it("should return 400 when trying to decrease more than available", async () => {
    const req = { params: { id: "123" }, body: { amount: 10 } } as unknown as Request;
    const res = mockResponse();

    mockFindOne.mockResolvedValue(product);

    await decreaseStockQuantity(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Stock quantity is insufficient" });
  });

  it("should return 404 when product not found (decrease)", async () => {
    const req = { params: { id: "999" }, body: { amount: 5 } } as unknown as Request;
    const res = mockResponse();

    mockFindOne.mockResolvedValue(null);

    await decreaseStockQuantity(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
  });
});
