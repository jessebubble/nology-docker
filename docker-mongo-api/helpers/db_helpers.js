import chai from 'chai';
import app from '../index.js';

function callAPI(student) {
    return new Promise((resolve, reject) => {
        chai.request(app)
        .post('/api/students/')
        .send(student)
        .end((err, res) => {
                if (err) reject(err);
                resolve(res);
            })
    })
}

function addData() {
    const students = [
        { name: "Ash", email: "ash@nology.io" },
        { name: "Gabe", email: "gabe@nology.io" },
        { name: "Steph", email: "steph@nology.io" }];

    Promise.all(students.map(student => callAPI(student)))
        .catch(err => {
            console.log('Error --- ',err);
        })
}

export { addData };