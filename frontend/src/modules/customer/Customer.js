import React from 'react';
import CustomerActions from '../../stores/customer/customer.actions';
import CustomerStore from '../../stores/customer/customer.store';
import ShutterStore from '../../stores/shutter/shutter.store';
import ShutterActions from '../../stores/shutter/shutter.actions';

export class Customer extends React.Component {
    state = {
        userId: CustomerStore.getUser(),
        orders: CustomerStore.getOrders(),
        error: CustomerStore.getError() || ShutterStore.getError(),
        shutters: ShutterStore.getShutters(),
        formWidth: '',
        formHeight: '',
        formColor: 'White',
        formMaterial: 'Plastic',
        formSelectedPreset: '',
        formNet: 0
    };

    componentDidMount() {
        if (this.state.orders.length === 0 && this.state.userId) {
            CustomerActions.fetchOrders(this.state.userId);
        }
        if (this.state.shutters.length === 0) {
            ShutterActions.fetchShutters();
        }

        CustomerStore.on('userUpdated', () => {
            this.setState({
                userId: CustomerStore.getUser()
            }, () => {
                if (this.state.userId) {
                    CustomerActions.fetchOrders(this.state.userId);
                }
            });
        });

        CustomerStore.on('ordersUpdated', () => {
            this.setState({
                orders: CustomerStore.getOrders()
            });
        });

        CustomerStore.on('errorUpdated', () => {
            this.setState({
                error: CustomerStore.getError()
            });
        });

        ShutterStore.on('shuttersUpdated', () => {
            this.setState({
                shutters: ShutterStore.getShutters()
            });
        });

        ShutterStore.on('errorUpdated', () => {
            this.setState({
                error: ShutterStore.getError()
            });
        });
    }

    onUserChange = (event) => {
        CustomerActions.updateLoggedInUser(event.target.value);
    };

    onSizeChange = (event) => {
        const val = event.target.value;
        this.setState({
            formSelectedPreset: event.target.value,
        });
        if (val) {
            const [width, height] = val.split('x');
            this.setState({
                formWidth: width,
                formHeight: height
            });
        }
    };

    onHeightChange = (event) => {
        this.setState({
            formSelectedPreset: '',
            formHeight: event.target.value
        });
    };

    onWidthChange = (event) => {
        this.setState({
            formSelectedPreset: '',
            formWidth: event.target.value
        });
    };

    onColorChange =(event) => {
        this.setState({
            formColor: event.target.value
        });
    }

    onMaterialChange =(event) => {
        this.setState({
            formMaterial: event.target.value
        });
    }

    onNetChange = (event) => {
        this.setState({
            formNet: event.target.value
        });
    };

    onSubmit = (event) => {
        event.preventDefault();

        if (!this.state.formWidth || !this.state.formHeight || !this.state.formColor) {
            alert('Hiányzó adat!');
            return;
        }

        const order = {
            width: parseInt(this.state.formWidth),
            height: parseInt(this.state.formHeight),
            color: this.state.formColor,
            material: this.state.formMaterial,
            isNet: this.state.formNet
        };

        CustomerActions.submitOrder(order);
    };

    render() {
        return (
            <div className="customer-wrapper">

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                <div className="row">
                    <div className="col-md-4">
                        <div className="from-group">
                            <select className="form-control" value={this.state.userId} onChange={this.onUserChange}>
                                <option value="">Logged out</option>
                                <option value="1">Customer 1</option>
                                <option value="2">Customer 2</option>
                            </select>
                        </div>
                    </div>
                </div>


                {
                    this.state.userId ?
                        <div className="row">
                            <div className="col-md-6">
                                <h2>Shopping Cart</h2>
                                <div className="table-responsive">
                                    <table className="table table-condensed table-striped">
                                        <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Size</th>
                                            <th>Net</th>
                                            <th>Color</th>
                                            <th>Material</th>
                                            <th>Price Offer</th>
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
                                                    <td>{value.shutterMaterial}</td>
                                                    <td>{value.price}</td>
                                                    <td>
                                                        {value.status === 'pending' //&& value.price !== null//
                                                            ?
                                                            <div>
                                                                <button type="button" class="btn btn-success btn-block"
                                                                    onClick={() => CustomerActions.acceptOrder(this.state.userId, value._id)}>
                                                                    Accept
                                                                </button>
                                                                <button type="button" class="btn btn-danger btn-block"
                                                                    onClick={() => CustomerActions.declineOrder(this.state.userId, value._id)}>
                                                                    Decline
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
                            <div className="col-md-6">
                                <h2>New Item</h2>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label>Shutter types</label>
                                        <select onChange={this.onSizeChange} value={this.state.formSelectedPreset}
                                                className="form-control" name="" id="">
                                            <option value="">Sizes</option>
                                            {this.state.shutters.map((val, i) => {
                                                return <option key={i}
                                                               value={val.width + 'x' + val.height}>{val.width} x {val.height}</option>
                                            })};
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Height</label>
                                        <input onChange={this.onHeightChange} value={this.state.formHeight} type="number"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Width</label>
                                        <input onChange={this.onWidthChange} value={this.state.formWidth} type="number"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Color</label>
                                        <select onChange={this.onColorChange} name="" id="" value={this.state.formColor}
                                                className="form-control">
                                            <option value="White">White</option>
                                            <option value="Black">Black</option>
                                            <option value="Brown">Brown</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Color</label>
                                        <select onChange={this.onMaterialChange} name="" id="" value={this.state.formMaterial}
                                                className="form-control">
                                            <option value="Plastic">Plastic</option>
                                            <option value="Aluminium">Aluminium</option>
                                            <option value="Wood">Wood</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Net</label>
                                        <select onChange={this.onNetChange} name="" id="" value={this.state.formNet}
                                                className="form-control">
                                            <option value="1">Yes</option>
                                            <option value="0">No</option>
                                        </select>
                                    </div>

                                    <button className="btn btn-primary">Add to cart</button>
                                </form>
                            </div>
                        </div>
                    : null
                }
            </div>
        )
    }
}