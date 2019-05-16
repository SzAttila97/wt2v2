import dispatcher from './manager.dispatcher';
import axios from 'axios';

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const OK_ORDERS_SUCCESS = 'OK_ORDERS_SUCCESS';
export const OK_ORDERS_ERROR = 'OK_ORDERS_ERROR';

export const DATED_ORDERS_SUCCESS = 'DATED_ORDERS_SUCCESS';
export const DATED_ORDERS_ERROR = 'DATED_ORDERS_ERROR';

export const PAID_ORDERS_SUCCESS = 'PAID_ORDERS_SUCCESS';
export const PAID_ORDERS_ERROR = 'PAID_ORDERS_ERROR';

export const PRICED_ORDERS_SUCCESS = 'PRICED_ORDERS_SUCCESS';
export const PRICED_ORDERS_ERROR = 'PRICED_ORDERS_ERROR'

export const CLOSED_ORDERS_SUCCESS = 'CLOSED_ORDERS_SUCCESS';
export const CLOSED_ORDERS_ERROR = 'CLOSED_ORDERS_ERROR';

export const PRICE_ORDERS_SUCCESS = 'PRICE_ORDERS_SUCCESS'
export const PRICE_ORDERS_ERROR = 'PRICE_ORDERS_ERROR'

class ManagerActions {
    fetchOrders() {
        axios.get('http://localhost:8080/api/manager/orders').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: FETCH_ORDERS_SUCCESS, orders: resp.data});
            }
        }).catch(error => {
            dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: error.message});
        });
    }

    okOrder(userId, orderId) {
        axios.get('http://localhost:8080/api/manager/orders/' + orderId + '/ok').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: OK_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: OK_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: OK_ORDERS_ERROR, error: error.message});
        });
    }

    datedOrder(orderId) {
        axios.get('http://localhost:8080/api/manager/orders/' + orderId + '/delete').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: DATED_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: DATED_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: DATED_ORDERS_ERROR, error: error.message});
        });
    }

    paidOrder(orderId) {
        axios.get('http://localhost:8080/api/manager/orders/' + orderId + '/paid').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: PAID_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: PAID_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: PAID_ORDERS_ERROR, error: error.message});
        });
    }

    pricedOrder(orderId) {
        axios.get('http://localhost:8080/api/manager/orders/' + orderId + '/priced').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: PRICED_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: PRICED_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: PAID_ORDERS_ERROR, error: error.message});
        });
    }

    closedOrder(orderId) {
        axios.get('http://localhost:8080/api/manager/orders/' + orderId + '/closed').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: CLOSED_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: CLOSED_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: CLOSED_ORDERS_ERROR, error: error.message});
        });
    }

    priceOrder(orderId) {
        axios.post('http://localhost:8080/api/manager/orders/' + orderId + '/price').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: PRICE_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: PRICE_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: PRICE_ORDERS_ERROR, error: error.message});
        });
    }
}

export default new ManagerActions();