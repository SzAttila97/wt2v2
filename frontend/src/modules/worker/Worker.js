import React from "react";
import WorkerStore from "../../stores/worker/worker.store";
import WorkerActions from "../../stores/worker/worker.actions"

export class Worker extends React.Component {

    state = {
        workerId: WorkerStore.getWorker(),
        orders: WorkerStore.getOrders(1),
        error: WorkerStore.getError()
    };

    componentDidMount() {
        if (this.state.orders.length === 0) {
            WorkerActions.fetchOrders();
        }

        WorkerStore.on('workerUpdated', () => {
            this.setState({
                workerId: WorkerStore.getWorker()
            }, () => {
                if (this.state.workerId) {
                    WorkerActions.fetchOrders(this.state.workerId);
                }
            });
        });

        WorkerStore.on('ordersUpdated', () => {
            this.setState({
                orders: WorkerStore.getOrders()
            });
        });


        WorkerStore.on('errorUpdated', () => {
            this.setState({
                error: WorkerStore.getError()
            });
        });


    }

    onWorkerChange = (event) => {
        WorkerActions.updateLoggedInWorker(event.target.value);
    };

    render() {
        return (
            <div className="worker-wrapper">

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <div className="row">
                    <div className="col-md-4">
                        <div className="from-group">
                            <select className="form-control" value={this.state.workerId} onChange={this.onWorkerChange}>
                                <option value="">Logged out</option>
                                <option value="1">Worker 1</option>
                                <option value="2">Worker 2</option>
                            </select>
                        </div>
                    </div>
                </div>

                <h2>Rendelések</h2>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>Azonosító</th>
                            <th>Méretek</th>
                            <th>Net</th>
                            <th>Szín</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((value, i) => {
                            return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                    <td>{value.shutterColor}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        {value.status === 'accepted'
                                            ?
                                            <div>
                                                <button onClick={() => WorkerActions.takeOrder(value._id)}>
                                                   Take Order!
                                                </button>
                                                <button onClick={() => WorkerActions.doneOrder(value._id)}>
                                                    Done!
                                                </button>
                                            </div>
                                            :
                                            null
                                        }
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