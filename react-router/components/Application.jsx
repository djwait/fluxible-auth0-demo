/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var Timestamp = require('./Timestamp.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var FluxibleMixin = require('fluxible/addons/FluxibleMixin');
var RouteHandler = require('react-router').RouteHandler;

var Auth0Lock = null;
if (typeof window !== 'undefined') {
  Auth0Lock = require('auth0-lock');
}

var Application = React.createClass({
    mixins: [FluxibleMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },

    componentWillMount: function() {
      if (typeof window !== 'undefined') {
        this.loggedIn = false;
        this.lock = new Auth0Lock('', '');
      }
    },

    showLock: function() {
      this.lock.show(function onLogin(err, profile, id_token) {
        if (err) {
          console.log('login error: '+err);
        } else {
          this.loggedIn = true;
        }
      });
    },

    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {

        var loggedInApplication = (
            <div>
                <Nav />
                    <RouteHandler />
                <Timestamp />
            </div>
        );

      var initialApplication = (
        <div className="login-box">
          <a onClick={this.showLock}>Sign In</a>
        </div>
      );

      if (this.loggedIn == true) {
        return loggedInApplication;
      } else {
        return initialApplication;
      }
    }
});

module.exports = Application;
