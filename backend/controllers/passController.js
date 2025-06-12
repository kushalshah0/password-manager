const Pass = require('../models/passModel');
module.exports = {
    getPass: async (req, res) => {
        try {
            const userId = req.user._id;
            await Pass.find({ author: userId })
                .then(passes => {
                    res.status(200).json({ success: true, data: passes });
                })
                .catch(err => {
                    res.status(500).json({ success: false, message: 'Error fetching passwords', error: err });
                });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    postPass: async (req, res) => {
        try {
            const { title, email, password } = req.body;
            if (!title || !email || !password) {
                return res.status(400).json({ success: false, message: 'Please fill all the fields!' });
            }
            const userId = req.user._id;
            const newPass = new Pass({ author: userId, title, email, password });
            if (!newPass) {
                return res.status(400).json({ success: false, message: 'Password creation failed' });
            }
            await newPass.save()
                .then(pass => {
                    res.status(201).json({ success: true, message: 'Saved successfully!', data: pass });
                })
                .catch(err => {
                    res.status(500).json({ success: false, message: 'Error saving password', error: err });
                });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    deletePass: async (req, res) => {
        try {
            const passId = req.params.id;
            await Pass.findByIdAndDelete(passId)
                .then(result => {
                    if (!result) {
                        return res.status(404).json({ success: false, message: 'Password not found' });
                    }
                    res.status(200).json({ success: true, message: 'Deleted successfully' });
                })
                .catch(err => {
                    res.status(500).json({ success: false, message: 'Error deleting password', error: err });
                });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    updatePass: async (req, res) => {
        try {
            const passId = req.params.id;
            const { title, email, password } = req.body;
            if (!title || !email || !passId) {
                return res.status(400).json({ success: false, message: 'Please fill all the fields!' });
            }
            await Pass.findByIdAndUpdate(passId, { title, email, password }, { new: true })
                .then(updatedPass => {
                    if (!updatedPass) {
                        return res.status(404).json({ success: false, message: 'Password not found' });
                    }
                    res.status(200).json({ success: true, data: updatedPass });
                })
                .catch(err => {
                    res.status(500).json({ success: false, message: 'Error updating password', error: err });
                });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
}