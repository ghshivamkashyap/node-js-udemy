import { Router } from "express";
const todoRouter = Router();

todoRouter.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, data: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
});

export default todoRouter;
  