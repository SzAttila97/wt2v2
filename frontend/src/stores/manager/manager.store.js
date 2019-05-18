import dispatcher from './manager.dispatcher';
import {EventEmitter} from 'events';
import {
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
    OK_ORDERS_ERROR,
    DATED_ORDERS_ERROR,
    OK_ORDERS_SUCCESS,
    DATED_ORDERS_SUCCESS,
    PAID_ORDERS_ERROR,
    CLOSED_ORDERS_ERROR,
    PAID_ORDERS_SUCCESS,
    CLOSED_ORDERS_SUCCESS,
    PRICE_ORDERS_ERROR,
    PRICE_ORDERS_SUCCESS
} from "./manager.actions";

class ManagerStore extends EventEmitter {
    orders = [];
    error = '';

    handleActions(action) {
        switch (action.type) {
            case FETCH_ORDERS_SUCCESS:
                this.orders = action.orders;
                this.emit("ordersUpdated");
                break;

            case FETCH_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case OK_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'ok';
                this.emit("ordersUpdated");
                break;

            case OK_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case DATED_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'dated';
                this.emit("ordersUpdated");
                break;

            case DATED_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case PAID_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'paid';
                this.emit("ordersUpdated");
                break;

            case PAID_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case CLOSED_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'closed';
                this.emit("ordersUpdated");
                break;

            case CLOSED_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case PRICE_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).price = action.price;
                this.emit("ordersUpdated");
                break;

            case PRICE_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
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
}

const managerStore = new ManagerStore();
dispatcher.register(managerStore.handleActions.bind(managerStore));
export default managerStore;