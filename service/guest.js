const guestDAO = require('../dao/guest');

const guestService = () => {{
    // console.log(guestDAO.data);
    const categories = guestDAO()
    .then((result) => {
        return result;
    })
    return categories;
}}


module.exports = guestService;