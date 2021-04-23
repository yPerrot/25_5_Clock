import React from 'react'

import "./Controler.css"

class Controler extends React.Component {

    render() {
        return (
            <div className="controler">
                <p className="controler-title">{this.props.name}</p>
                <div>
                    <button  className="controler-btn-up" onClick={this.props.increase}><i className="fa fa-arrow-up fa-2x"></i></button>
                    <span  className="controler-value">{this.props.value}</span>
                    <button  className="controler-btn-down" onClick={this.props.decrease}><i className="fa fa-arrow-down fa-2x"></i></button>
                </div>
            </div>
        )
    }
}

export default Controler

