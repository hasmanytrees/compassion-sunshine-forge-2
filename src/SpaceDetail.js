import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SpaceDetail extends Component {
    render() {
        return (
            <div id="spaceDetail">
                <h2 id="name">{this.props.currentSpace.name}</h2>
                <b>Memory</b><br />
                <span id="memory">{this.props.currentSpace.memory}</span><br />
                <b>Disk</b><br />
                <span id="disk">{this.props.currentSpace.disk}</span><br />
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceDetail);