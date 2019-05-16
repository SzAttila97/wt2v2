import {Dispatcher} from "flux";

//Ide mi kell??

/*
import axios from "axios";
import CostumerDataConstants from '../constants/CostumerDataConstants'
import CostumerDataStore from '../stores/CostumerDataStore'

class CostumerDataDispatcher extends Dispatcher {

    handleViewAction(action){
        this.dispatch({
            source : 'VIEW_ACTION',
            action : action
        });
    }
}

const dispatcher = new CostumerDataDispatcher();

dispatcher.register((data) => {
    if(data.action.actionType !== CostumerDataConstants.SET_COSTUMER_DATA){
        return;
    }

    axios.post("/order/getAllOrdersByEmail", {
        "email": data.action.payload.email
    })
        .then((response) => {
            CostumerDataStore._costumerData = data.action.payload;
            CostumerDataStore._ownOrders = response.data.orders;
            CostumerDataStore.emitCostumerDataChange();
            CostumerDataStore.emitOwnOrdersChange();
        })
});

dispatcher.register((data) => {
    if(data.action.actionType !== CostumerDataConstants.UNSET_COSTUMER_DATA){
        return;
    }

    CostumerDataStore._costumerData = undefined;
    CostumerDataStore._ownOrders = [];
    CostumerDataStore.emitCostumerDataChange();
    CostumerDataStore.emitOwnOrdersChange();
});

dispatcher.register((data) => {
    if(data.action.actionType !== CostumerDataConstants.REFRESH_COSTUMER_OWN_ORDERS){
        return;
    }

    axios.post("/order/getAllOrdersByEmail", {
        "email": CostumerDataStore._costumerData.email
    })
        .then((response) => {
            CostumerDataStore._ownOrders = response.data.orders;
            CostumerDataStore.emitOwnOrdersChange();
        })
});
*/



export default new Dispatcher();