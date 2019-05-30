const express = require('express');
const router = express.Router();

const shutterController = require('./controllers/shutter.controller');
const orderController = require('./controllers/order.controller');
const customerController = require('./controllers/customer.controller');
const workerController = require('./controllers/worker.controller');
const managerController = require('./controllers/manager.controller');

// Shutter routes
router.get('/api/shutters', shutterController.getAll);
router.post('/api/shutters', shutterController.save);

// Order routes
router.get('/api/orders', orderController.getAll);
router.post('/api/orders', orderController.create);
router.get('/api/orders/:status', orderController.getByStatus);

// Customer routes
router.get('/api/customer/:customerId/orders', customerController.getOrders);
router.get('/api/customer/:customerId/orders/:orderId/accept', customerController.acceptOrder);
router.get('/api/customer/:customerId/orders/:orderId/decline', customerController.declineOrder);

// //Worker routes
// router.get('/api/worker/available-orders', workerController.getAvailableOrders);
router.get('/api/worker/orders', workerController.getOrders);
router.get('/api/worker/orders/:orderId/take', workerController.takeOrder);
router.get('/api/worker/orders/:orderId/done', workerController.doneOrder);

// //Manager routes
// router.get('/api/manager/customer/:customerId/orders', managerController.getOrdersByCustomer);
// router.get('/api/manager/worker/:workerId/orders', managerController.getOrdersByWorker);
router.get('/api/manager/orders', managerController.getOrders);
router.get('/api/manager/orders/:orderId/ok', managerController.okOrder);
router.get('/api/manager/orders/:orderId/paid', managerController.paidOrder);
router.get('/api/manager/orders/:orderId/closed/:customerId', managerController.closedOrder);
router.post('/api/manager/orders/:orderId/:price/update-price/:customerId', managerController.priceOrder);
router.post('/api/manager/orders/:orderId/:installationDate/update-installationDate', managerController.dateOrder);


module.exports = router;
