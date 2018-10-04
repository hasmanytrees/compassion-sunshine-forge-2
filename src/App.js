import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { editSpace, fetchSpaces } from './actions/index';
import SpaceEdit from './SpaceEdit';
import SpaceList from './SpaceList';
import SpaceDetail from './SpaceDetail';

export class App extends Component {
    componentDidMount() {
        this.props.fetchSpaces();
    }

    render() {
        const spaceEdit = this.props.view === 'SpaceEdit' ? <SpaceEdit /> : '';
        const spaceDetail = this.props.view === 'SpaceDetail' ? <SpaceDetail /> : '';

        return (
            <div className="App">
                <div className="Sidebar">
                    <SpaceList />
                    <button id="addSpace" onClick={() => this.props.editSpace({})}>Add Space</button>
                </div>
                {spaceEdit}
                {spaceDetail}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        'view': state.view
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        'editSpace': (space) => dispatch(editSpace(space)),
        'fetchSpaces': () => dispatch(fetchSpaces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
