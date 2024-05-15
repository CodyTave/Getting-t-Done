import { Model } from "mongoose";
import { NextRequest } from "next/server";

export async function paginateModel<T>(
  model: Model<T>,
  req: NextRequest,
  query: object = {}
) {
  const url = new URL(req.url);
  const pageNumber = parseInt(url.searchParams.get("pageNumber") || "1");
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
  const skip = (pageNumber - 1) * pageSize;

  const elements = await model.find(query).skip(skip).limit(pageSize);
  const totalCount = await model.countDocuments(query);
  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    totalPages: totalPages,
    currentPage: pageNumber,
    pageSize: pageSize,
    totalCount: totalCount,
    elements: elements,
  };
}
