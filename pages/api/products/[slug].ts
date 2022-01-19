import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { Product } from "../../../components/product/product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);
  const { slug } = req.query;

  const [dataToSend] = data.filter((item: any) => item.id === slug);

  if (slug) {
    res.status(200).json(dataToSend);
  } else {
    res.status(200).json({ message: "smily wink" });
  }
};

export default handler;

export const getProduct = (slug: string) => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileData);

  const [dataToSend]: Product[] = data.filter(
    (item: Product) => item.id === slug
  );

  return dataToSend;
};
