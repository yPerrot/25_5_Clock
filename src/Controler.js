import React from 'react'

import "./Controler.css"

class Controler extends React.Component {

    render() {
        return (
            <div className="controler">
                <p className="controler-title">{this.props.name}</p>
                <div>
                    <button  className="controler-btn" onClick={this.props.increase}><i class="fa fa-arrow-up fa-2x"></i></button>
                    <span  className="controler-value">{this.props.value}</span>
                    <button  className="controler-btn" onClick={this.props.decrease}><i class="fa fa-arrow-down fa-2x"></i></button>
                </div>
            </div>
        )
    }
}

export default Controler

