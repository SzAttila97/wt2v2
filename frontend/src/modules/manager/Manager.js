import React from "react";
import ManagerStore from "../../stores/manager/manager.store";
import ManagerActions from "../../stores/manager/manager.actions";

export class Manager extends React.Component {

    state = {
        orders: ManagerStore.getOrders(),
        error: ManagerStore.getError(),
        formDate: '',
        formPrice: '',
        formStatus: ''
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

    onStatusChange = (event) => {
        this.setState({
            formStatus: event.target.value
        });
    };


    render() {
        return (
            <div className="manager-wrapper">

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
                            <th><input  onChange={this.onPriceChange} value={this.state.formPrice}
                                            type="Number" min='1'
                                            className="form-control bg-success text-white"/>
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
                                        <button className="btn btn-success" onClick={() => ManagerActions.priceOrder(value._id, this.state.formPrice, value.customerId)}>
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
                                       className="form-control bg-success text-white"/>
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



                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <h2>Statistics</h2>

                <div className="row">
                    <div className="col-md-2">
                        <select onChange={this.onStatusChange} value={this.state.formStatus}
                                className="form-control" name="" id="">
                            <option value="">Status</option>
                            {this.state.orders.reduce((prev, val) => {
                                if(!prev.find(e => e === val.status)) {
                                    prev.push(val.status);
                                }

                                return prev;
                            }, []).map((val, i) => {
                                return <option key={i} value={val}>{val}</option>
                            })};
                        </select>
                    </div>

                    <div className="col-md-4">
                        {this.state.orders.filter(e => e.status === this.state.formStatus).length}
                    </div>
                </div>

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
            </div>
        )
    }
}