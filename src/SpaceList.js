import React, { Component } from 'react';
import { connect } from 'react-redux';

export class SpaceList extends Component {
    render() {
        const list = this.props.spaces.map((space, i) => <li key={i}><a href="#">{space.name}</a></li>);

        return (
            <ul id="spaceList">
                {list}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "spaces": state.spaces
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SpaceList);