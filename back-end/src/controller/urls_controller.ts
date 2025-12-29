import { RequestHandler } from "express";
import db from "../database/database";

const getURLS: RequestHandler = async (request, response) => {
  try {
    // const test = await db("users").insert({ id: 2, name: "mariana" });
    const test = await db("users").select("*");
    console.log(test);

    const user = response.json({ message: "hello" });
  } catch (error) {
    console.error("!!! Error getURLS :\n", error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export { getURLS };
