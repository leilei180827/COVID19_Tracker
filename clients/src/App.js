import React, { Component } from "react";
import { Cards, Chart, CountryPicker, AuChart } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
// import {} from ".././public/images"
class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      ...this.state,
      data: fetchedData,
    });
  }
  handleSelectCountry = async (selectedCountry) => {
    const fetchedData = await fetchData(selectedCountry);
    this.setState({
      data: fetchedData,
      country: selectedCountry,
    });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img
          src={process.env.PUBLIC_URL + "/images/logo.png"}
          alt="covid-19"
          className={styles.image}
        />
        <Cards data={data} />
        <CountryPicker handleSelectCountry={this.handleSelectCountry} />
        {country === "Australia" ? (
          <AuChart />
        ) : (
          <Chart data={data} country={country} />
        )}
      </div>
    );
  }
}
export default App;
