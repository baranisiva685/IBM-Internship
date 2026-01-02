const express = require("express");
const Student = require("Student");
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.send(student);
});

// READ
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.send(students);
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Student.findByIdAndUpdate(req.params.id, req.body);
  res.send(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.send("Student Deleted");
});

module.exports = router;
