const db = require('../db/db');

const guestDAO = () => {
    const categories = db.select().table('product_category')
    .then(data => {
       return data;
    });
    return categories;
}

module.exports = guestDAO;