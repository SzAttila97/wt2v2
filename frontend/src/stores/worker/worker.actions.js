import dispatcher from './worker.dispatcher';
import axios from 'axios';
import ManagerAction from '../manager/manager.actions'

export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_ERROR = 'FETCH_ORDERS_ERROR';

export const TAKE_ORDERS_SUCCESS = 'TAKE_ORDERS_SUCCESS';
export const TAKE_ORDERS_ERROR = 'TAKE_ORDERS_ERROR';

export const DONE_ORDERS_SUCCESS = 'DONE_ORDERS_SUCCESS';
export const DONE_ORDERS_ERROR = 'DONE_ORDERS_ERROR';

class WorkerActions {

    fetchOrders() {
        axios.get('http://localhost:8080/api/worker/orders').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: FETCH_ORDERS_SUCCESS, orders: resp.data});
            }
        }).catch(error => {
            dispatcher.dispatch({type: FETCH_ORDERS_ERROR, error: error.message});
        });
    }


    takeOrder(orderId) {
        axios.get('http://localhost:8080/api/worker/orders/' + orderId + '/take').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: TAKE_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: TAKE_ORDERS_SUCCESS, orderId: orderId});
            }
        }).catch(error => {
            dispatcher.dispatch({type: TAKE_ORDERS_ERROR, error: error.message});
        });
    }

    doneOrder(orderId) {
        axios.get('http://localhost:8080/api/worker/orders/' + orderId + '/done').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: DONE_ORDERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: DONE_ORDERS_SUCCESS, orderId: orderId});
                ManagerAction.fetchOrders();
            }
        }).catch(error => {
            dispatcher.dispatch({type: DONE_ORDERS_ERROR, error: error.message});
        });
    }
}

export default new WorkerActions();