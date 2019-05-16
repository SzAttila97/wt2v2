import {EventEmitter} from "events";
import dispatcher from "../worker/worker.dispatcher";
import {FETCH_SHUTTERS_SUCCESS, FETCH_SHUTTERS_ERROR} from "./shutter.actions";

class ShutterStore extends EventEmitter {
    shutters = [];
    error = '';

    handleActions(action) {
        switch (action.type) {
            case FETCH_SHUTTERS_SUCCESS:
                this.shutters = action.shutters;
                this.emit("shuttersUpdated");
                break;

            case FETCH_SHUTTERS_ERROR:
                this.error = action.error;
                this.emit("errorUpdated");
                break;

            default:
                break;
        }
    }

    getShutters() {
        return this.shutters;
    }

    getError() {
        return this.error;
    }
}

const shutterStore = new ShutterStore();
dispatcher.register(shutterStore.handleActions.bind(shutterStore));
export default shutterStore;