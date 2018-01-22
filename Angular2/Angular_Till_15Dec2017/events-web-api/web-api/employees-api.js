var mongojs = require('mongojs');
var db = mongojs('syne-db-b2', ['employees']);

class Employee {
    constructor() {

    }
    fetchAllEmployees() {
        return new Promise((resolve, reject) => {
            db.employees.find((err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            });
        });
    }
    fetchSingleEmployee(id) {
        return new Promise((resolve, reject) => {
            db.employees.findOne({ employeeId: Number.parseInt(id) }, (err, doc) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(doc);
                }
            });
        })
    }
    insertEmployee(employee) {
        let promise = new Promise((resolve, reject) => {
            db.employees.insert(employee, (err) => {
                if (err) {
                    reject(err);
                }
                resolve('Insertion Successfully!');
            });

        });
        return promise;
    }
}
module.exports = new Employee();