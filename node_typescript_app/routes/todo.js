"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoRouter = (0, express_1.Router)();
todoRouter.get("/", (req, res, next) => {
    return res
        .status(200)
        .json({ success: true, data: [1, 2, 3, 4, 5, 6, 7, 8, 9] });
});
exports.default = todoRouter;
