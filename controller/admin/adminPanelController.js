const adminPanelController = () => {
    return {
        index (req, res) {
            res.render('admin-panel');
        }
    }
}

module.exports = adminPanelController;