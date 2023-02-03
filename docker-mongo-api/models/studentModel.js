import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const StudentSchema = new Schema (
  {
    name: { type: String},
    email: { type: String},
  },
);

const Student = mongoose.model('student', StudentSchema);

export { Student };
