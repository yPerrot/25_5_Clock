import React from 'react'

import './App.css';

import Controler from './Controler'

class App extends React.Component  {

	constructor(props) {
		super(props)
		this.state = {
			isSession: true,
			isRunning: false,
			didStart: false,

			breakDuration: 5,
			sessionDuration: 25,

			runningMin: 25,
			runningSec: 0
		}
		this.switch = this.switch.bind(this)
		this.reload = this.reload.bind(this)

		this.increaseBreak = this.increaseBreak.bind(this)
		this.decreaseBreak = this.decreaseBreak.bind(this) 
		
		this.increaseSession = this.increaseSession.bind(this) 
		this.decreaseSession = this.decreaseSession.bind(this) 


		this.audio = new Audio("./sound.wav")
	}

	componentDidMount() {
		this.interval = setInterval(() => {
			if (!this.state.isRunning) return

			if (this.state.runningMin === 0 && this.state.runningSec === 0) {
				this.setState(state => ({
					isSession: !state.isSession,
					runningMin: state.isSession ? state.breakDuration : state.sessionDuration
				}))
				this.audio.play()
				return
			}

			if (this.state.runningSec === 0) {
				this.setState(state => ({
					runningMin: state.runningMin - 1,
					runningSec: 59
				}))
				return
			}

			this.setState({
				runningSec: this.state.runningSec - 1
			})
        }, 1000);
	}

    componentWillUnmount() {
        if (this.interval) clearInterval(this.interval);
    }

	switch() {
		this.setState({
			isRunning: !this.state.isRunning,
			didStart: true
		})
	}

	reload() {
		this.setState({
			isSession: true,
			isRunning: false,
			didStart: false,
			runningMin: this.state.sessionDuration,
			runningSec: 0
		})
	}

	increaseBreak() {
		this.setState({
			breakDuration: this.state.breakDuration + 1
		})
	}

	increaseSession() {
		if (this.state.didStart) {
			this.setState({
				sessionDuration: this.state.sessionDuration + 1
			})
		} else {
			this.setState({
				sessionDuration: this.state.sessionDuration + 1,
				runningMin: this.state.sessionDuration + 1,
			})
		}
	}

	decreaseBreak() {
		if (this.state.breakDuration == 1) return
		this.setState({
			breakDuration: this.state.breakDuration - 1
		})
	}

	decreaseSession() {
		if (this.state.sessionDuration == 1) return
		if (this.state.didStart) {
			this.setState({
				sessionDuration: this.state.sessionDuration - 1
			})
		} else {
			this.setState({
				sessionDuration: this.state.sessionDuration - 1,
				runningMin: this.state.sessionDuration - 1,
			})
		}
	}

	render() {
		const {isSession, isRunning, breakDuration, sessionDuration, runningMin, runningSec} = this.state
		const i = isRunning ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>
		
		return (
			<div className="App">
				<h1>25 + 5 Clock</h1>
				<div className="time-controler">
					<Controler name="Session Length" value={sessionDuration} increase={this.increaseSession} decrease={this.decreaseSession}/>
					<Controler name="Break Length" value={breakDuration} increase={this.increaseBreak} decrease={this.decreaseBreak}/>
				</div>
				<div className="timer">
					<p className="session-type">{isSession ? "Session" : "Break"}</p>
					<p className="session-time">{ 
						(runningMin > 9 ? runningMin : '0' + runningMin) + ':' + (runningSec > 9 ? runningSec : '0' + runningSec)
					}</p>
				</div>
				<div className="play-controler">
					<button className="play-pause" onClick={this.switch}>{i}</button>
					<button className="reload" onClick={this.reload}><i className="fa fa-refresh"></i></button>
				</div>
			</div>
		);
	}
}

export default App;
