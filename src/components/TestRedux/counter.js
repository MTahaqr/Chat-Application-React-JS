import React, { Component } from 'react';
import { connect } from 'react-redux';
import increment from '../../store/actions/counter-action';
import decrement from '../../store/actions/decrement-action';

class Counter extends Component {
    constructor(props) {
        super(props);
        console.log('Testing Reducers Constructor');
    }


    componentWillMount() {
        console.log('Component Will Mount');
    }

    componentWillReceiveProps(props){
        console.log('Component Will Recieve Props: ', props);
    }

    componentWillUpdate(props, state) {
        console.log('Component Will Update: ', props, state)
    }

    render() {
        console.log('Render');
        return(
            <div>
                <button className="btn btn-primary" onClick={ () => this.props.increment() }>
                    increment
                </button>
                <br /><br />
                <button className="btn btn-primary" onClick={ () => this.props.decrement() }>
                    decrement
                </button>
            </div>
        );
    }
    
}


const mapStateToProps = (state) => {
    const number = state.counter;
    return {
        number: number,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);