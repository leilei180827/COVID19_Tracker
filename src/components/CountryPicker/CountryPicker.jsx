import React, { useState, useEffect } from "react";
import { fetchCountries } from "../../api";
import styles from "./CountryPicker.module.css";
import { NativeSelect, FormControl } from "@material-ui/core";
const CountryPicker = (props) => {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };
    fetchAPI();
  }, []);
  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(event) => props.handleSelectCountry(event.target.value)}
      >
        <option value="">Global</option>
        {countries.map((country, index) => (
          <option key={index} value={country.name}>
            {country.name}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
export default CountryPicker;
