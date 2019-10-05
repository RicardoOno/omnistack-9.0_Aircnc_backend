const Booking = require('../models/Booking');

module.exports = {
    async store(req, res){
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');
        if(!booking){
            return res.status(401).json({error: 'Not a valid spot'});
        }
        booking.approved = false;

        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];
        if(bookingUserSocket) {
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }


        return res.json(booking);
    }
}
