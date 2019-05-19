import React from "react";
import WorkerStore from "../../stores/worker/worker.store";
import WorkerActions from "../../stores/worker/worker.actions"

export class Worker extends React.Component {

    state = {
        orders: WorkerStore.getOrders(),
        error: WorkerStore.getError(),
        louverAmount: 0,
        cordLength: 0,
        dye: 0,
        screwAmount: 0,
        material: "",
        color: "",
        net:0,
        netSize: 0,
        orderId: 0

    };

    componentDidMount() {
        if (this.state.orders.length === 0) {
            WorkerActions.fetchOrders();
        }

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

    onClickRow (selectedRow){
        const louverAmount = Math.floor(selectedRow.shutter.height / 5);
        const cordLength = selectedRow.shutter.height * 2;
        const dye = selectedRow.shutter.width / 20;
        const screwAmount = Math.floor(selectedRow.shutter.width /20);
        const netSize = Math.floor((selectedRow.shutter.height + selectedRow.shutter.width)*1.1)
        this.setState({
            selectedRow: selectedRow,
            louverAmount,
            cordLength,
            dye,
            screwAmount,
            material: selectedRow.shutterMaterial,
            color:selectedRow.shutterColor,
            net:selectedRow.shutterNet,
            netSize,
            orderId : selectedRow._id
        });
    };

    onClickDone = (i) =>{
        WorkerActions.doneOrder(i)
        this.setState({
            screwAmount : 0,
        });
        console.log(this.state.screwAmount)
    }

    render() {
        return (
            <div className="worker-wrapper">

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <div className="row">
                    <div className="col-md-4">
                        <h2>Orders</h2>
                        <div className="table-responsive">
                            <table className="table table-condensed table-striped">
                                <thead>
                                <tr>
                                    <th>Order ID</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map((value, i) => {
                                    if (value.status === 'accepted')return (
                                        <tr key={i}>
                                            <td>{value._id}</td>
                                            <td>
                                                {value.status === 'accepted'
                                                    ?
                                                    <div>
                                                        <button className="btn btn-primary" onClick={() => WorkerActions.takeOrder(value._id)}>
                                                           Take Order!
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
                    </div><div className="col-md-8">
                        <h2>My Jobs</h2>
                        <div className="table-responsive">
                            <table className="table table-condensed table-striped">
                                <thead>
                                <tr>
                                    <th>Order Informations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map((value, i) => {
                                    if (value.status === 'taken') return (
                                        <tr key={i} onClick={this.onClickRow.bind(this ,value)}>
                                            <td>{value._id}</td>
                                            <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                            <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                            <td>{value.shutterColor}</td>
                                            <td>{value.shutterMaterial}</td>
                                            <td>{value.status}</td>
                                            <td>
                                                {value.status === 'taken'
                                                    ?
                                                    <div>
                                                        <button className="btn btn-primary" onClick={() => this.onClickDone(value._id)}>
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
                    {this.state.screwAmount === 0 ?
                        null
                        :
                        <div>
                            <div className="card text-white bg-dark col-md-6">
                                <div className="card-header text-dark bg-light">
                                    Required Parts
                                    ({this.state.orderId})
                                </div>
                                <ul className="list-group list-group-flush ">
                                    <li className="list-group-item text-white bg-dark">Screw x {this.state.screwAmount}</li>
                                    <li className="list-group-item text-white bg-dark">{this.state.louverAmount} {this.state.material} louvers</li>
                                    <li className="list-group-item text-white bg-dark">Cord : {this.state.cordLength} cm</li>
                                    <li className="list-group-item text-white bg-dark">{this.state.dye} Deciliter {this.state.color} dye </li>
                                    <li className="list-group-item text-white bg-dark">Mosquito net: {this.state.net ? 'Yes, ' : 'No' } {this.state.net ? this.state.netSize + ' cm ' : null } </li>
                                </ul>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}