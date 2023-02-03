import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { Student } from "../models/studentModel.js";
import { addData } from "../helpers/db_helpers.js";

const should = chai.should();

process.env.TEST = true;

chai.use(chaiHttp);

before((done) => {
    Student.remove({}, (err) => {
      if (err) throw err
      addData();
      done();
    });
  });

describe('Get All Students Service', () => {
    it('should return all the students', (done) => {
        chai.request(app)
        .get('/api/students')
        .end((err, res) => {
            res.status.should.equal(200);
            done();
        })
    })

    it('should return Ash as the first entry', (done) => {
        chai.request(app)
            .get('/api/students')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body[0].name.should.equal("Ash");
                done();
            })
    })

    it('should return Gabe as the second entry', (done) => {
        chai.request(app)
            .get('/api/students')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body[1].name.should.equal("Gabe");
                done();
            })
    })

    it('should return Steph as the third entry', (done) => {
        chai.request(app)
            .get('/api/students')
            .end((err, res) => {
                res.status.should.equal(200);
                res.body[2].name.should.equal("Steph");
                done();
            })
    })

})   

describe('Post Student Service', () => {
    it('should creare a new student called Rich ', (done) => {
        const student = { name: "Rich", email: "rich@nology.io"};
        chai.request(app)
            .post('/api/students/')
            .send(student)
            .end((err, res) => {
                chai.request(app)
                .get('/api/students')
                .end((err, res) => {
                    res.status.should.equal(200);
                    res.body.length.should.equal(4);
                    res.body[3].name.should.equal("Rich");
                    done();
                })
            })
    })
})