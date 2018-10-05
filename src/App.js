import React, { Component } from 'react';
import { connect } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import './App.css';
import { editSpace, getSpaces } from './actions/index';
import SpaceEdit from './SpaceEdit';
import SpaceList from './SpaceList';
import SpaceDetail from './SpaceDetail';

library.add(faPenSquare);
library.add(faTrash);

export class App extends Component {
    componentDidMount() {
        this.props.getSpaces();
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
        'getSpaces': () => dispatch(getSpaces())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
