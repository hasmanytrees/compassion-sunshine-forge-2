import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editApp } from './actions/index';

export class AppEdit extends Component {
    render() {
        return (
            <div id="appEdit">
                App Edit
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppEdit);