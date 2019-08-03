import React, { Component } from 'react';
import RangeSlider from './rangeSlider';

class Facets extends Component {
	render() {
		const { search } = this.props.facets;
		return (
			<div>
				{/* ************** Range slider ************** */}
				<RangeSlider slideFilter={this.props.slideListener} />
				<div className="divider" />
				{/* ************** Search ************** */}
				<h4>Search </h4>
				<div className="divider" />
				<input
					type="text"
					defaultValue={search.searchInput}
					className="input"
					onChange={(e) => this.props.searchListener(e, 'search')}
					placeholder="Search..."
				/>

				{/* ************** PRICE ************** */}
				<div className="divider" />
				<h4>Ascendant Descendant</h4>
				<div className="divider" />
				<button
					type="button"
					className="btn btn-primary"
					data-name="lowHigh"
					onClick={(e) => this.props.sortListener(e, 'lowHigh')}
				>
					<span data-name="lowHigh">Descendant</span>
				</button>
				<button
					type="button"
					className="btn btn-dark"
					data-name="highLow"
					onClick={(e) => this.props.sortListener(e, 'highLow')}
				>
					<span data-name="highLow">Ascendant</span>
				</button>
				<div className="divider" />

				<h4>Status</h4>
				<div className="divider" />
				{/* ************** Status ************** */}

				<button
					onClick={(e) => this.props.statusListener(e, 'status')}
					type="button"
					className="btn btn-primary"
					data-name="deposit"
				>
					Deposit
				</button>

				<button
					onClick={(e) => this.props.statusListener(e, 'status')}
					type="button"
					className="btn btn-dark"
					data-name="withdraw"
				>
					Withdraw
				</button>
			</div>
		);
	}
}

export default Facets;
