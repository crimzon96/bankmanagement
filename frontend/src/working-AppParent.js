import React, { Component } from 'react';



const data = {
  facets: [
    {
      _id: 1,
      facet: {
        name: "show",
        value: "blue"
      }
    },
    {
      _id: 2,
      facet: {
        name: "price_options",
        value: "green"
      }
    },
    {
      _id: 3,
      facet: {
        name: "price_options",
        value: "black"
      }
    },
    {
      _id: 4,
      facet: {
        name: "price_options",
        value: "red"
      }
    },
  ]
};

const category = ['innerwear', 'dress', 'robe', 'pajamas', 'sweater', 'pants'];
const color = ['white', 'black', 'brown', 'navy', 'blue', 'yellow', 'pink', 'purple', 'beige', 'red', 'green'];
const gender = ['unisex', 'girl', 'boy'];
const material = ['modal', 'cotton', 'spandex', 'tencel', 'rayon'];

class AppParent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: data,
      list: data.facets,
      color: null,
      color_choice: false,
      count: 0,
    }
    this.fullList = this.fullList.bind(this);
  }

  toggleColorFilter = (value) => {
    if (value === this.state.color) {
      if (this.state.count === 0) {
        this.setState(
          {color: value, color_choice: true, count: +1}
        )
      } else {
      this.setState(
        {color: value, color_choice: false, count: 0}
      )
      }
    } else {
      this.setState(
        {color: value, color_choice: true, count: -1}
      )
    }
  }


  fullList = () => {
    if (this.state.color_choice) {
      return this.state.list.filter(item => item.facet.value === this.state.color)
    } else {
      return this.state.list
    }
  }


  render() {
    return (
      <div>
        {this.fullList().map((item) => (
          <li
          key={item._id}
          className="list-group-item scroller d-flex justify-content-between align-items-center"
        >
          <span className="todo-title mr-2">{item._id}</span>
          <span>{item.facet.name}</span>
          <span>{item.facet.value}</span>
          <span>
            <button className="btn btn-secondary mr-2"> View </button>
          </span>
        </li>
        ))}
        {color.map((item, i) => (
          <ColorButton toggleColorFilter={this.toggleColorFilter} key={i} value={item}></ColorButton>

        ))}
      </div>
    );
  }
}

class ColorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value
    }
  }
  onClick(event) {
    const value = event.target.value;
    this.props.toggleColorFilter(value);
  }
  render () {
    return (
      <div>
        <button type="button" value={this.props.value} onClick={e => this.onClick(e)}>
        {this.state.value}
        </button>

      </div>
    )
  }
}


export default AppParent;
