// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
import path from "path";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../components/product/product";

type Data = {
  id: string;
  for: string;
  brand: string;
  price: number;
  discount: number;
  size: string[];
  rating: number;
  image: string;
  title: string;
  description: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(fileData);

  const { shopFor } = req.query;
  if (shopFor) {
    res.status(200).json(data.filter((item: Data) => item.for === shopFor));
  } else {
    res.status(200).json(data);
  }
}

export const getProducts = () => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: Product[] = JSON.parse(fileData);
  return data;
};

export const getProductsFor = (shopFor: string) => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  const data: Product[] = JSON.parse(fileData);

  return data.filter((item: Product) => item.for === shopFor);
};
