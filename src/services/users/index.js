import express from "express";
import db from "../../db/models/index.js";
const Category = db.Category;
const Product = db.Product;
const User=db.User;
const Comments=db.Comment;
import s from "sequelize";
const { Op } = s;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { name } = req.query;
      const filter = req.query.name
        ? {
            where: {
              name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          }
        : {};

      console.log({ name: `%${name}` });
      const data = await User.findAll({
        ...filter,
        include: Comments,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await User.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await User.findByPk(req.params.id,{
        include: Comment,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await User.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await User.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (rows > 0) {
        res.send("Deleted");
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
