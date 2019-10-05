const express = require('express');
const multer = require('multer');

const uplodConfig = require('./config/upload');

const SessionController = require('./app/controllers/SessionController');
const SpotController = require('./app/controllers/SpotController');
const DashbaordController = require('./app/controllers/DashboardController');
const BookingController = require('./app/controllers/BookingController');
const RejectionController = require('./app/controllers/RejectionController');
const ApprovalController = require('./app/controllers/ApprovalController');

const routes = express.Router();
const upload = multer(uplodConfig);

routes.post('/sessions', SessionController.store);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboards', DashbaordController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);
routes.post('/bookings/:booking_id/approval', ApprovalController.store);
routes.post('/bookings/:booking_id/rejection', RejectionController.store);

module.exports = routes;