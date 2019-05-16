import React from "react";
import ManagerStore from "../../stores/manager/manager.store";
import ManagerActions from "../../stores/manager/manager.actions";

export class Manager extends React.Component {

    state = {
        orders: ManagerStore.getOrders(),
        error: ManagerStore.getError()
    };

    componentDidMount() {
        if (this.state.orders.length === 0) {
            ManagerActions.fetchOrders();
        }

        ManagerStore.on('ordersUpdated', () => {
            this.setState({
                orders: ManagerStore.getOrders()
            });
        });

        ManagerStore.on('errorUpdated', () => {
            this.setState({
                error: ManagerStore.getError()
            });
        });
    }

    onPriceChange = (event) => {
        this.setState({
            formPrice: event.target.value
        });
    };

    onColorChange =(event) => {
        this.setState({
            formColor: event.target.value
        });
    }

    render() {
        return (
            <div className="manager-wrapper">

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <h2>Statistics</h2>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>CustomerID</th>
                            <th>WorkerID</th>
                            <th>Size</th>
                            <th>Net</th>
                            <th>Color</th>
                            <th>Material</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.filter(e => e.status === 'pending' || e.status === 'priced').map((value, i) => {
                            return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.customerId}</td>
                                    <td>{value.workerId}</td>
                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                    <td>{value.shutterColor}</td>
                                    <td>{value.shutterMaterial}</td>
                                    <td>{value.installationDate}</td>
                                    <td>{value.price}</td>
                                    <td>{value.status}</td>
                                    <td>
                                            <div>
                                                <button onClick={() => ManagerActions.okOrder(value._id)}>
                                                    Accept the work!
                                                </button>
                                                <button onClick={() => ManagerActions.datedOrder(value._id)}>
                                                   Set Date!
                                                </button>
                                                <button onClick={() => ManagerActions.paidOrder(value._id)}>
                                                    Paid!
                                                </button>
                                                <button onClick={() => ManagerActions.closedOrder(value._id)}>
                                                    Close!
                                                </button>
                                            </div>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <h2>Set Prices</h2>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>CustomerID</th>
                            <th>Size</th>
                            <th>Net</th>
                            <th>Color</th>
                            <th>Material</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.filter(e => e.status === 'pending').map((value, i) => {
                            return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.customerId}</td>
                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                    <td>{value.shutterColor}</td>
                                    <td>{value.shutterMaterial}</td>
                                    <td>{value.price}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        <input onChange={this.onPriceChange} value={this.state.formPrice}
                                               type="number"
                                               className="form-control"/>
                                    </td>
                                    <td>
                                        <button onClick={() => ManagerActions.priceOrder(value._id)}>
                                            Paid!
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}