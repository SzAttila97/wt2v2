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
        formNet: 0,
        formUserId: '',
        tmpOrders: []
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

    /*onUserChange = (event) => {
        CustomerActions.updateLoggedInUser(event.target.value);
    };


    onLoginClick = (event) => {
        CustomerActions.updateLoggedInUser(event.target.value);
    };*/

    onUserChange = (event) => {
        this.setState({
            formUserId: event.target.value
        });
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

    onColorChange = (event) => {
        this.setState({
            formColor: event.target.value
        });
    }

    onMaterialChange = (event) => {
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

        if (!this.state.formWidth || !this.state.formHeight || !this.state.formColor || !this.state.formMaterial) {
            alert('Hiányzó adat!');
            return;
        }

        const order = {
            shutter: {
                width: parseInt(this.state.formWidth),
                height: parseInt(this.state.formHeight),
            },
            shutterNet: this.state.formNet,
            shutterColor: this.state.formColor,
            shutterMaterial: this.state.formMaterial,
            width: parseInt(this.state.formWidth),
            height: parseInt(this.state.formHeight),
            color: this.state.formColor,
            material: this.state.formMaterial,
            isNet: this.state.formNet
        };

        this.setState({
            tmpOrders: this.state.tmpOrders.concat(order)
        });
    };

    onOrder = () => {
        this.state.tmpOrders.forEach(e => {
            CustomerActions.submitOrder(e);
        });

        this.setState({
           tmpOrders: []
        });
    };

    onDeleteOrderItem = (i) => {
        this.setState({
           tmpOrders: this.state.tmpOrders.filter((e, index) => i !== index) //végigmegy az összes elemen, visszaadjuk az összes elemet aminek az indexe nem egyenlő azzal amit én megadtam (i)
        });
    };

    render() {
        return (
            <div className="customer-wrapper">

                {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}

                {this.state.userId === '' ?

                    <div className="row ">
                        <div className="col-md-2"><h5>Please Log in!</h5></div>
                        <div className="col-md-2">
                            {/*<select className="form-control" value={this.state.userId} onChange={this.onUserChange}>
                                <option value="">Logged out</option>
                                <option value="1">Customer 1</option>
                                <option value="2">Customer 2</option>
                            </select>*/}
                            <input onChange={this.onUserChange} value={this.state.formUserId}
                                   type="string"
                                   className="form-control"/>
                        </div>
                        <div className="col-md-2">
                            <button className="btn btn-primary"
                                    onClick={() => CustomerActions.updateLoggedInUser(this.state.formUserId)}>
                                Login
                            </button>
                        </div>
                    </div>
                    :
                    <div>
                        <h2>Welcome {this.state.userId}!</h2>
                    </div>
                }


                {
                    this.state.userId ?
                        <div className="row">

                            <div className="col-md-8">
                                <h2>Shopping Cart</h2>
                                <div className="table-responsive">
                                    <table className="table table-condensed table-striped">
                                        <thead>
                                        <tr>
                                            <th>Size</th>
                                            <th>Net</th>
                                            <th>Color</th>
                                            <th>Material</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.tmpOrders.map((value, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                                    <td>{value.shutterColor}</td>
                                                    <td>{value.shutterMaterial}</td>
                                                    <td>
                                                        <button onClick={() => this.onDeleteOrderItem(i)} className="btn btn-danger">Törlés</button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>

                                    {this.state.tmpOrders.length > 0 ? <button onClick={() => this.onOrder()} className="btn btn-danger">Rendelés</button> : null}
                                </div>
                            </div>

                            <div className="col-md-8">
                                <h2>Orders </h2>
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
                                            if (value.status !== 'declined') return (
                                                <tr key={i}>
                                                    <td>{value._id}</td>
                                                    <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                                    <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                                    <td>{value.shutterColor}</td>
                                                    <td>{value.shutterMaterial}</td>
                                                    <td>{value.price}</td>
                                                    <td>
                                                        {value.status === 'priced' //&& value.price !== null//
                                                            ?
                                                            <div>
                                                                <button type="button"
                                                                        className="btn btn-success btn-block"
                                                                        onClick={() => CustomerActions.acceptOrder(this.state.userId, value._id)}>
                                                                    Accept
                                                                </button>
                                                                <button type="button"
                                                                        className="btn btn-danger btn-block"
                                                                        onClick={() => CustomerActions.declineOrder(this.state.userId, value._id)}>
                                                                    Decline
                                                                </button>
                                                            </div>
                                                            :
                                                            null
                                                        }
                                                    </td>
                                                    <td>
                                                        {value.installationDate ?
                                                            <div>{value.installationDate}</div>
                                                            :
                                                            null}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>


                            <div className="col-md-4">
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
                                        <input onChange={this.onHeightChange} value={this.state.formHeight}
                                               type="number" min="1"
                                               className="form-control"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Width</label>
                                        <input onChange={this.onWidthChange} value={this.state.formWidth} type="number"
                                               min="1"
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
                                        <label>Material</label>
                                        <select onChange={this.onMaterialChange} name="" id=""
                                                value={this.state.formMaterial}
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

                            {this.state.error ? <div className="alert alert-danger">{this.state.error}</div> : null}
                            <h2>Invoices</h2>
                             <div className="table-responsive">
                                <table className="table table-condensed table-striped table-dark">
                                    <thead>
                                    <tr>
                                        <th>OrderID</th>
                                        <th>Size</th>
                                        <th>Net</th>
                                        <th>Color</th>
                                        <th>Material</th>
                                        <th>Price</th>
                                        <th>Installation Date</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {this.state.orders.filter(e => e.status === 'closed').map((value, i) => {
                                        return (
                                            <tr key={i}>
                                                <td>{value._id}</td>
                                                <td>{value.shutter ? value.shutter.width : ''} x {value.shutter ? value.shutter.height : ''}</td>
                                                <td>{value.shutterNet ? 'Yes' : 'No'}</td>
                                                <td>{value.shutterColor}</td>
                                                <td>{value.shutterMaterial}</td>
                                                <td>{value.price}</td>
                                                <td>{value.installationDate}</td>
                                                <td>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                        : null
                }

            </div>
        )
    }
}