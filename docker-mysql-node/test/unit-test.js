import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import { Student } from "../models/studentModel.js";
import { addData } from "../helpers/db_helpers.js";

const should = chai.should();

process.env.TEST = true;

chai.use(chaiHttp);

before(async () => {
    await Student.destroy( {where: {}, truncate: true})
        .then(() => {
            addData();
        })
        .catch((err) => console.log(err));
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
    it('should creare a new student called Ash ', (done) => {
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

describe('Get Student by Name', () => {
    it('should return the student requested by name Katie', (done) => {
        chai.request(app)
        .get('/api/students/name/Rich')
        .end((err, res) => {
            res.status.should.equal(200);
            res.body.name.should.equal("Rich");
            done();
        })
    })    
})

describe('Delete Student by Id', () => {
    it('should delete the student requested by id', (done) => {
        chai.request(app)
        .delete('/api/students/4')
        .end((err, res) => {
            res.status.should.equal(204);
            chai.request(app)
            .get('/api/students')
                .end((err, res) => {
                res.status.should.equal(200);
                res.body.length.should.equal(3);
                done();
        })
        })
    })    
})