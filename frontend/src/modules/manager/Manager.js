import React from "react";
import ManagerStore from "../../stores/manager/manager.store";
import ManagerActions from "../../stores/manager/manager.actions";

export class Manager extends React.Component {

    state = {
        orders: ManagerStore.getOrders(),
        error: ManagerStore.getError(),
        formDate: '',
        formPrice: ''
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
    onDateChange = (event) => {
        this.setState({
            formDate: event.target.value
        });
    };


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
                            <th>Size</th>
                            <th>Net</th>
                            <th>Color</th>
                            <th>Material</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((value, i) => {
                            return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.customerId}</td>
                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                    <td>{value.shutterColor}</td>
                                    <td>{value.shutterMaterial}</td>
                                    <td>{value.installationDate}</td>
                                    <td>{value.price}</td>
                                    <td>{value.status}</td>
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
                            <th><input onChange={this.onPriceChange} value={this.state.formPrice}
                                            type="number"
                                            className="form-control"/>
                            </th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.orders.map((value, i) => {
                            if (value.status === 'pending' && value.price !== 0)return(

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

                                    </td>
                                    <td>
                                        <button className="btn btn-success" onClick={() => ManagerActions.priceOrder(value._id, this.state.formPrice)}>
                                            Offer!
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}
                <div className="row">
                    <div className="col-md-4">
                <h2>Accept jobs</h2>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>OrderID</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((value, i) => {
                            if (value.status === 'done') return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>
                                        <button  className="btn btn-light" onClick={() => ManagerActions.okOrder(value._id)}>
                                            Accept Job!
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                    </div>
                    <div className="col-md-8">
                <h2>Organize Installation</h2>
                <div className="table-responsive">
                    <table className="table table-condensed table-striped">
                        <thead>
                        <tr>
                            <th>OrderID</th>
                            <th>CustomerId</th>
                            <th>Date</th>
                            <th></th>
                            <th><input onChange={this.onDateChange} value={this.state.formDate}
                                       type="date"
                                       className="form-control"/>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((value, i) => {
                            if (value.status === 'ok' || value.status === 'dated') return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.customerId}</td>
                                    <td>{value.installationDate}</td>
                                    <td></td>
                                    <td>

                                        {value.status === 'dated' ?
                                            <button className="btn btn-outline-success btn-block" onClick={() => ManagerActions.paidOrder(value._id)}>
                                                Paid!
                                            </button>
                                        :
                                            <button className="btn btn-outline-warning btn-block" onClick={() => ManagerActions.dateOrder(value._id, this.state.formDate)}>
                                                Set Date!
                                            </button>
                                       }

                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
                    </div>
                </div>
                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <h2>Close Order / Create Invoice</h2>
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
                            <th>Date</th>
                            <th>Status</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.orders.map((value, i) => {
                            if (value.status === 'paid')return (
                                <tr key={i}>
                                    <td>{value._id}</td>
                                    <td>{value.customerId}</td>
                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                    <td>{value.shutterColor}</td>
                                    <td>{value.shutterMaterial}</td>
                                    <td>{value.price}</td>
                                    <td>{value.installationDate}</td>
                                    <td>{value.status}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => ManagerActions.closedOrder(value._id)}>
                                           Create Invoice!
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