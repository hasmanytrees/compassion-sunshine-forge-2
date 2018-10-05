import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { editSpace, deleteSpace } from './actions/index';

export class SpaceDetail extends Component {
    render() {
        return (
            <div id="spaceDetail">
                <span id="name">{this.props.currentSpace.name}</span>&nbsp;
                <FontAwesomeIcon id="editButton" icon="pen-square" onClick={() => this.props.editSpace(this.props.currentSpace)} />&nbsp;
                <FontAwesomeIcon id="editButton" icon="trash" onClick={() => this.props.deleteSpace(this.props.currentSpace)} />
                <br />
                <b>Memory</b>
                <br />
                <span id="memory">{this.props.currentSpace.memory_quotamb}</span>
                <br />
                <b>Disk</b>
                <br />
                <span id="disk">{this.props.currentSpace.disk_quotamb}</span>
                <br />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "currentSpace": state.currentSpace
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        "editSpace": (space) => dispatch(editSpace(space)),
        "deleteSpace": (space) => { if (window.confirm('Delete?')) dispatch(deleteSpace(space)) }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceDetail);