const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    async index(req, res) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);

    },

    async store(req, res) {
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user: userId }  = req.headers;
        
        req.userId = userId;
        const user = await User.findById( userId );
        if(!user) {
            return res.status(400).json({ error: 'Invalid user' });
        }


        const spot = await Spot.create({
            user: userId,
            thumbnail: filename,
            company,
            price,
            techs: techs.split(',').map(tech => tech.trim())
        });

        return res.json(spot);

    }
}