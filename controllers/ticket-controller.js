const { CREATE_SUCCESS } = require("../utils/consts");
const TicketService = require("./../services/ticket-service");

const create = async (req, res, next) => {
  try {
    const { date, info, image, description } = req.body;
    const { id } = req.user;
    await TicketService.create(date, info, image, description, id);
    res.json(CREATE_SUCCESS);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const getAll = async (req, res, next) => {
  try {
    let { q, page, limit, info } = req.query;
    page = page || 1;
    limit = limit || 11;
    const offset = page * limit - limit;
    console.log("there");
    const tickets = await TicketService.getAll({ offset, limit, q, info });
    console.log(tickets, "qwe");

    res.json(tickets);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  getAll,
};
