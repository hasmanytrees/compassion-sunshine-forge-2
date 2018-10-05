import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editApp } from './actions/index';

export class AppList extends Component {
    render() {
        return (
            <div>
                App List
                <ul id="appList" />
                <button id="addApp" onClick={() => this.props.editApp({})}>Add App</button>
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
        "editApp": () => dispatch(editApp())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppList);