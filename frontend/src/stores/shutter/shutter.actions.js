import axios from "axios";
import dispatcher from "../worker/worker.dispatcher";
import {FETCH_ORDERS_ERROR, FETCH_ORDERS_SUCCESS} from "../customer/customer.actions";

export const FETCH_SHUTTERS_SUCCESS = 'FETCH_SHUTTERS_SUCCESS';
export const FETCH_SHUTTERS_ERROR = 'FETCH_SHUTTERS_ERROR';

class ShutterActions {
    fetchShutters() {
        axios.get('http://localhost:8080/api/shutters').then(resp => {
            if (resp.error) {
                dispatcher.dispatch({type: FETCH_SHUTTERS_ERROR, error: resp.data.error});
            } else {
                dispatcher.dispatch({type: FETCH_SHUTTERS_SUCCESS, shutters: resp.data});
            }
        }).catch(error => {
            dispatcher.dispatch({type: FETCH_SHUTTERS_ERROR, error: error.message});
        });
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
}

export default new ShutterActions();