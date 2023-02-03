import { Student } from "../models/studentModel.js";

export const getStudents = (req, res) => {
  Student.find()
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => console.log(err));
};

export const getStudentById = (req, res) => {
  Student.findById(req.params.id)
    .then((student) => {
      res.status(200).send(student || `Student with id: ${id} not found`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addStudent = (req, res) => {
  const newStudent = new Student({ name: req.body.name, email: req.body.email })
  newStudent.save((err,student) => {
    if (err) {
      res.send({ message: err});
    } else {
      res.status(201).json(student);
    }
  })
};

export const deleteStudent = (req, res) => {
  const id = req.params.id;
  Student.deleteOne({ where: { id: id } })
    .then(() => {
      res.status(204).send("Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};
