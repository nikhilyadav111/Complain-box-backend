const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Note = require("../models/noteModels");

const getNotes = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const notes = await Note.find({ ticket: req.params._id });

  if (!notes) {
    res.status(404)
    throw new Error("Notes Not Found!!")
  }
  res.status(200).json(notes)
});

const addNote = expressAsyncHandler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    res.status(401);
    throw new Error("Kindly Describe Your Note");
  }

  //1. get user from JWT token//

  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }
  const note = await Note.create({
    user: req.user._id,
    ticket: req.params.ticketId,
    description: description,
  });

  res.status(201).json({
    note,
  });
});

module.exports = { getNotes, addNote };
