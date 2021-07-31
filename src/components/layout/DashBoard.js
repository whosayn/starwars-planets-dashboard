import React, { Component } from 'react';

import { API_PLANETS_ENDPOINT } from '../../common/Variables';
import BarChart from '../visualization/BarChart';
import Table from '../visualization/Table';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      barChartData: [],
    }
  }

  componentDidMount() {
    this.getBarChartDataFromAPI(API_PLANETS_ENDPOINT);
  }

  async getBarChartDataFromAPI(endPoint) {
    const responseData = await fetch(endPoint)
        .then((response) => response.json())
        .then((responseJson) => responseJson)
        .catch((error) => console.error(error));

    this.setState({
      barChartData: [...this.state.barChartData, ...responseData.results.map((planetData) => {
        const data = {
        name: planetData.name,
        population: planetData.population
      }
      return data;
      })]
    });

    if (responseData.next != null) {
      this.getBarChartDataFromAPI(responseData.next);
    }
  }


  render() {
    console.log(this.state.barChartData);
    return (
      <div className="container">
        <div>
          <h1>Starwars Planets Dashboard</h1>
        </div>
        <BarChart />
        <Table />
      </div>
    )
  }
}

export default DashBoard;
