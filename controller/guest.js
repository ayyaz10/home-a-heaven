const guestService = require('../service/guest')

const guestController = (req, res) => {
    guestService()
    .then(categories => {
        res.render('guest', {
        category: categories,
      });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json('something went wrong');
    });

}

module.exports = guestController;
