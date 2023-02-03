import { Student } from "../models/studentModel.js";

export const getStudents = (req, res) => {
  Student.findAll()
    .then((students) => {
      res.status(200).send(students);
    })
    .catch((err) => console.log(err));
};

export const getStudentById = (req, res) => {
  const id = parseInt(req.params.id);
  Student.findByPk(id)
    .then((student) => {
      res.status(200).send(student || `Student with id: ${id} not found`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addStudent = (req, res) => {
  Student.create({ name: req.body.name, email: req.body.email })
    .then(() => {
      res.status(201).send({ message: "Created" });
    })
    .catch((err) => {
      console.log(err);
    });
};


export const getStudentByName = (req, res) => {
  const name = req.params.name;
  Student.findOne({ where: {name: name}})
    .then((student) => {
      res.status(200).send(student);
    })
    .catch((err) => console.log(err));
};

export const deleteStudent = (req, res) => {
  const id = parseInt(req.params.id);
  Student.destroy({ where: { id: id } })
    .then(() => {
      res.status(204).send("Deleted");
    })
    .catch((err) => {
      console.log(err);
    });
};
