const express = require("express");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

//ROUTE : 1 : fetch all notes
router.post("/fetchnotes", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user });
    res.send(note);
  } catch (error) {
    res.status(500).send("internal server error");
  }
});

//ROUTE : 2 : to create and insert note
router.post(
  "/insertnote",
  fetchuser,
  [
    body("title", "please enter a title longer than 3 character").isLength({
      min: 3,
    }),
    body(
      "description",
      "please enter a description longer than 5 character"
    ).isLength({ min: 5 }),
    body("tag", "please enter a tag longer than 3 character").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return;
      return res.status(401).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const Note = new Notes({
        title: title,
        description: description,
        tag: tag,
        user: req.user,
      });
      Note.save();
      res.json(Note);
    } catch (error) {
      res.status(500).send("internal server error");
    }
  }
);

//ROUTE : 3 : update notes user id required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;

  const note = await Notes.findById(req.params.id);
  // console.log(note);
  if (note.user.toString() !== req.user) {
    res.status(401).send("unauthorised access");
  }
  if (title) {
    note.title = title;
  }
  if (description) {
    note.description = description;
  }
  if (tag) {
    note.tag = tag;
  }
  note.save();
  res.json(note);
});

//ROUTE : 4 : delete notes user id required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      res.status(404).send("note doesn't exist");
    }
    if (note.user.toString() !== req.user) {
      res.status(401).send("unauthorised access");
    }
    const deleted = await Notes.findByIdAndDelete(req.params.id);
    // console.log("note is deleted");
    res.json({ status: "note has been deleted", note: deleted });
  } catch (error) {
    res.status(500).send("internal server error");
  }
});
module.exports = router;
