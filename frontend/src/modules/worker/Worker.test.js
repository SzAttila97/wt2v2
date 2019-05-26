import {Worker} from "./Worker";
import React from "react";
import * as assert from "assert";
import * as ReactDOM from "react-dom";
require('events').EventEmitter.defaultMaxListeners = 25;

describe('Worker unit test', () => {
    let component;
    let div;
    beforeEach(() => {
        div = document.createElement('div');
        component = ReactDOM.render(<Worker />, div);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(div);
        component = null;
    });

    it('state orders should default to empty array', () => {
        assert.equal(component.state.orders.length, 0);
    });
    it('state louverAmount should be 0 by default ', () => {
        assert.equal(component.state.louverAmount, 0);
    });
    it('state cordLength should be 0 by default ', () => {
        assert.equal(component.state.cordLength, 0);
    });
    it('state dye should be 0 by default ', () => {
        assert.equal(component.state.dye, 0);
    });
    it('state screwAmount should be 0 by default ', () => {
        assert.equal(component.state.screwAmount, 0);
    });
    it('state net should be 0 by default ', () => {
        assert.equal(component.state.net, 0);
    });
    it('state netSize should be 0 by default ', () => {
        assert.equal(component.state.netSize, 0);
    });
    it('state orderId should be 0 by default ', () => {
        assert.equal(component.state.orderId, 0);
    });
    it('state material should default to empty string', () => {
        assert.equal(component.state.material, '');
    });
    it('state color should default to empty string', () => {
        assert.equal(component.state.color, '');
    });

});