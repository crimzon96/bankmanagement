import Nouislider from 'nouislider-react';
import 'nouislider/distribute/nouislider.css';
import React, { Component } from 'react';

class RangeSlider extends Component {
	constructor(props) {
		super(props);
		this.state = {
			min: 0,
			max: 2500,
			value: 0,
			start: 0,
			end: 2500
		};
	}

	onSlide = (event) => {
		this.setState({
			start: event[0],
			end: event[1]
		});
		this.props.slideFilter([ this.state.start, this.state.end ]);
	};

	render() {
		return (
			<div>
				<h4>Amount</h4>
				<div className="divider" />
				<div className="slider-container">
					<Nouislider
						onSlide={this.onSlide}
						range={{ min: this.state.min, max: this.state.max }}
						start={[ this.state.start, this.state.max ]}
						connect
					/>
					<div className="row">
						<div className="col-md-6 col-sm-12 mx-auto p-0">
							<div className="value">{this.state.start}</div>
						</div>
						<div className="col-md-6 col-sm-12 mx-auto p-0">
							<div className="value">{this.state.end}</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RangeSlider;
