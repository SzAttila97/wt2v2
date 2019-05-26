import {Manager} from "./Manager";
import React from "react";
import * as assert from "assert";
import * as ReactDOM from "react-dom";
require('events').EventEmitter.defaultMaxListeners = 25;

describe('Manager unit test', () => {
    let component;
    let div;
    beforeEach(() => {
        div = document.createElement('div');
        component = ReactDOM.render(<Manager />, div);
    });

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(div);
        component = null;
    });

    it('state orders should default to empty array', () => {
        assert.equal(component.state.orders.length, 0);
    });
    /*it('state shutters should default to empty array', () => {
        assert.equal(component.state.shutters.length, 0);
    });*/
    it('state formDate should default to empty string', () => {
        assert.equal(component.state.formDate, '');
    });
    it('state formPrice should default to empty string', () => {
        assert.equal(component.state.formPrice, '');
    });
    it('state formStatus should default to empty string', () => {
        assert.equal(component.state.formStatus, '');
    });
});