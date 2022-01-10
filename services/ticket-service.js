const { Op } = require("sequelize");
const { Ticket } = require("../models");

const create = async (date, info, image, description, id) => {
  const ticket = await Ticket.create({
    date,
    info,
    image,
    description,
    userId: id,
  });
  console.log(ticket);
  return ticket;
};
const getAll = async ({ q, offset, limit, info }) => {
  console.log("mda");
  if (q || info) {
    console.log("filter", q, info);
    if (!q) q = "";
    if (info) {
      return await Ticket.findAndCountAll({
        where: {
          [Op.or]: [
            {
              description: {
                [Op.iLike]: "%" + q + "%",
              },
            },
          ],
          info,
        },
        // include: [
        //   {
        //     model: Picture,
        //   },
        // ],
        limit,
        offset,
      });
    } else {
      return await Ticket.findAndCountAll({
        where: {
          description: {
            [Op.iLike]: "%" + q + "%",
          },
        },
        // include: [
        //   {
        //     model: Picture,
        //   },
        // ],
        limit,
        offset,
      });
    }
  }
  console.log("bul jak");
  //   return await Ticket.findAll();
  return await Ticket.findAndCountAll({
    limit,
    offset,
    // include: [
    //   {
    //     model: Picture,
    //   },
    // ],
  });
};

module.exports = {
  create,
  getAll,
};
