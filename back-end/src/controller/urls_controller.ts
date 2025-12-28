import { RequestHandler } from "express";

const getURLS: RequestHandler = async (request, response) => {
  try {
    response.json({ message: "hello" });
  } catch (error) {
    console.error("!!! Error getURLS :\n", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export { getURLS };
