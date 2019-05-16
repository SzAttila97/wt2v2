import dispatcher from './worker.dispatcher';
import {EventEmitter} from 'events';
import {
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
    TAKE_ORDERS_ERROR,
    DONE_ORDERS_ERROR,
    TAKE_ORDERS_SUCCESS,
    DONE_ORDERS_SUCCESS, UPDATE_WORKER
} from "./worker.actions";

class WorkerStore extends EventEmitter {
    orders = [];
    error = '';
    workerId = '';

    handleActions(action) {
        switch (action.type) {
            case UPDATE_WORKER:
                this.workerId = action.workerId;
                this.emit('workerUpdated');
                break;

            case FETCH_ORDERS_SUCCESS:
                this.orders = action.orders;
                this.emit("ordersUpdated");
                break;

            case FETCH_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case TAKE_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case DONE_ORDERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            case TAKE_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'taken';
                this.emit("ordersUpdated");
                break;

            case DONE_ORDERS_SUCCESS:
                this.orders.find(e => e._id === action.orderId).status = 'done';
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

    getWorker() {
        return this.workerId;
    }
}

const workerStore = new WorkerStore();
dispatcher.register(workerStore.handleActions.bind(workerStore));
export default workerStore;