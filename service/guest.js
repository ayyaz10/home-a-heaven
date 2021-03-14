const guestDAO = require('../dao/guest');

const guestService = () => {{
    // console.log(guestDAO.data);
    const categories = guestDAO()
    .then(data => {
        return data;
    })
    return categories;
}}


module.exports = guestService;