const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;
        console.log(`[approved | booking id] ${booking_id}`);
        const booking = await Booking.findById(booking_id).populate('spot');
        console.log(`[approved | booking] ${booking}`);
        if(!booking){
            return res.status(401).json({error: 'Not a valid spot'});
        }
        booking.approved = true;
        
        console.log(`[approved | booking user] ${booking.user}`);

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];
        console.log(req.connectedUsers);
        if(bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    }
}