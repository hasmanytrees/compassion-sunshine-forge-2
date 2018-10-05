import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveSpace, viewSpace } from './actions/index';

export class SpaceEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSpace: props.currentSpace
        }
    }
    handleNameChange = (event) => {
        const newState = JSON.parse(JSON.stringify(this.state));

        newState.currentSpace.name = event.target.value;

        this.setState(newState);
    }

    handleMemoryChange = (event) => {
        const newState = JSON.parse(JSON.stringify(this.state));

        newState.currentSpace.memory_quotamb = Number(event.target.value);

        this.setState(newState);
    }

    handleDiskChange = (event) => {
        const newState = JSON.parse(JSON.stringify(this.state));

        newState.currentSpace.disk_quotamb = Number(event.target.value);

        this.setState(newState);
    }

    render() {
        return (
            <div id="spaceEdit">
                <b>Name</b><br />
                <input id="name" value={this.state.currentSpace.name || ''} onChange={(event) => this.handleNameChange(event)} /><br />
                <b>Memory</b><br />
                <input id="memory" value={this.state.currentSpace.memory_quotamb || ''} onChange={(event) => this.handleMemoryChange(event)} /><br />
                <b>Disk</b><br />
                <input id="disk" value={this.state.currentSpace.disk_quotamb || ''} onChange={(event) => this.handleDiskChange(event)} /><br />
                <button id="save" onClick={() => this.props.saveSpace(this.state.currentSpace)}>Save</button>
                <button id="cancel" onClick={() => this.props.cancelEdit(this.props.currentSpace)}>Cancel</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        "currentSpace": state.currentSpace
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        "saveSpace": (space) => dispatch(saveSpace(space)),
        "cancelEdit": (space) => dispatch(viewSpace(space))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceEdit);
