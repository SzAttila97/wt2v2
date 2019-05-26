import dispatcher from './customer.dispatcher';
import axios from 'axios';
import ShutterActions from '../shutter/shutter.actions';
import CustomerStore from '../customer/customer.store';

export const UPDATE_USER = 'UPDATE_USER';

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const ACCEPT_ORDERS_SUCCESS = 'ACCEPT_ORDERS_SUCCESS';
export const ACCEPT_ORDERS_ERROR = 'ACCEPT_ORDERS_ERROR';

export const DECLINE_ORDERS_SUCCESS = 'DECLINE_ORDERS_SUCCESS';
export const DECLINE_ORDERS_ERROR = 'DECLINE_ORDERS_ERROR';

export const SAVE_ORDER_ERROR = 'SAVE_ORDER_ERROR';

class CustomerActions {
    updateLoggedInUser(userId) {
        dispatcher.dispatch({type: UPDATE_USER, userId: userId});
    }

    fetchOrders(userId) {
        axios.get('http://localhost:8080/api/customer/' + userId + '/orders').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: FETCH_ORDERS_SUCCESS, orders: resp.data});
            }
        }).catch(error => {
            dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: error.message});
        });
    }

    submitOrder(order) {
        axios.post('http://localhost:8080/api/orders', {...order, customerId: CustomerStore.getUser()}).then(resp => {
            if (resp.data.error) {
                dispatcher.dispatch({type: SAVE_ORDER_ERROR, error: resp.data.error});
            } else {
                this.fetchOrders(CustomerStore.getUser());
                ShutterActions.fetchShutters();
            }
        }).catch(error => {
            dispatcher.dispatch({type: SAVE_ORDER_ERROR, error: error.message});
        });
    }

    acceptOrder(userId, orderId) {
        axios.get('http://localhost:8080/api/customer/' + userId + '/orders/' + orderId + '/accept').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: ACCEPT_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: ACCEPT_ORDERS_SUCCESS, orderId: orderId});
                this.fetchOrders(userId)
            }
        }).catch(error => {
            dispatcher.dispatch({type: ACCEPT_ORDERS_ERROR, error: error.message});
        });
    }

    declineOrder(userId, orderId) {
        axios.get('http://localhost:8080/api/customer/' + userId + '/orders/' + orderId + '/decline').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: DECLINE_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: DECLINE_ORDERS_SUCCESS, orderId: orderId});
                this.fetchOrders(userId)
            }
        }).catch(error => {
            dispatcher.dispatch({type: DECLINE_ORDERS_ERROR, error: error.message});
        });
    }
}

export default new CustomerActions();