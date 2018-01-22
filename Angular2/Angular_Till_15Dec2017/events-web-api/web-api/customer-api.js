var mongojs = require('mongojs');
var db = mongojs('Northwind', ['customers']);

class Customer {
    constructor() {

    }
    fetchAllCustomers() {
        return new Promise((resolve, reject) => {
            db.customers.find((err, docs) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(docs);
                }
            });
        });
    }
    fetchSingleCustomer(id) {
        return new Promise((resolve, reject) => {
            db.customers.findOne({ _id: mongojs.ObjectId(id) }, (err, doc) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(doc);
                }
            });
        })
    }
    insertCustomer(customer) {
        return new Promise((resolve, reject) => {
            db.customers.insert(customer, (err, doc) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(doc);
                }
            });
        })
    }
    updateCustomer(customer) {
        return new Promise((resolve, reject) => {
            db.customers.findAndModify({
                query: { _id: mongojs.ObjectId(customer._id) },
                update: { $set: { contactName: customer.contactName, city: customer.city } },
                new: false
            }, (err, doc) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(doc);
                }
            });
        });
    }
}

module.exports = new Customer();