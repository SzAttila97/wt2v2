import dispatcher from './customer.dispatcher';
import {EventEmitter} from 'events';
import {
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
    ACCEPT_ORDERS_ERROR,
    DECLINE_ORDERS_ERROR,
    ACCEPT_ORDERS_SUCCESS,
    DECLINE_ORDERS_SUCCESS,
    SAVE_ORDER_ERROR, UPDATE_USER
} from "./customer.actions";

class CustomerStore extends EventEmitter {
    orders = [];
    error = '';
    userId = '';

    handleActions(action) {
        switch (action.type) {
            case UPDATE_USER:
                this.userId = action.userId;
                this.emit('userUpdated');
                break;

            case FETCH_ORDERS_SUCCESS:
                this.orders = action.orders;
                this.emit("ordersUpdated");
                break;

            case FETCH_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case SAVE_ORDER_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case ACCEPT_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case DECLINE_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case ACCEPT_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'accepted';
                this.emit("ordersUpdated");
                break;

            case DECLINE_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'deleted';
                this.emit("ordersUpdated");
                break;

            default:
                break;
        }
    }

    getOrders() {
        return this.orders;
    }

    getError() {
        return this.error;
    }

    getUser() {
        return this.userId;
    }
}

const customerStore = new CustomerStore();
dispatcher.register(customerStore.handleActions.bind(customerStore));
export default customerStore;