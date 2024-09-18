const expressAsyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModels");
const User = require("../models/userModel");

const getTickets = expressAsyncHandler(async (req, res) => {
  //Get user Using id in user.req//

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const tickets = await Ticket.find({ user: req.user._id });

  if (!tickets) {
    res.status(404);
    throw new Error("Tickets not found");
  }

  res.status(200).json(tickets);
});

const getTicket = expressAsyncHandler(async (req, res) => {
  //Get user Using id in user.req//

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  res.status(200).json(ticket);
});

const addTicket = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const { product, description } = req.body;
  console.log(product);

  if (!product || !description) {
    res.status(401);
    throw new Error("Please fill all details");
  }

  const newTicket = await Ticket.create({
    user: req.user._id,
    product,
    description,
    status: "open",
  });
  if (!newTicket) {
    res.status(400);
    throw new Error("Error in creating ticket");
  }
  console.log(newTicket)

  res.status(201).json(newTicket);
});

const updateTicket = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  const newTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!newTicket) {
    res.status(400);
    throw new Error("Error in creating ticket");
  }

  res.status(201).json(newTicket);
});

module.exports = { getTickets, getTicket, addTicket, updateTicket };
