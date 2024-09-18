const expressAsyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModels");

const getAllTickets = expressAsyncHandler(async (req, res) => {
  const tickets = await Ticket.find();
  res.json(tickets);
});

module.exports = { getAllTickets };
