import React, {Component} from 'react';
import './Timer.css';

// const ms = require('pretty-ms')

export class Timer extends Component {
    constructor(props){
        super(props)
        this.resetTimer = this.resetTimer.bind(this)

        this.state = {
            time: 0,
        }

        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1000);
    }

    resetTimer() {
        this.setState({
            time: 0
        })
        clearInterval(this.timer)
        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1000);
    }

    render() {
        return <div className="container">
            <div className="timer">
                <p>{this.state.time}</p>
            </div>
            <button onClick={this.resetTimer} >Reset Timer</button>
        </div>;
    }
    componentWillUnmount(){
        clearInterval(this.resetTimer)
    }
}
