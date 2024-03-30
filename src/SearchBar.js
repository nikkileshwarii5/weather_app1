import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import apiKeys from './apiKeys';

function SearchBar() {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${apiKeys.key}`
      );
      const cities = response.data.list.map((city) => city.name);
      return cities;
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = await getSuggestions(value);
    setSuggestions(suggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
   
    console.log('Selected city:', suggestion);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const inputProps = {
    placeholder: 'Search any city',
    value,
    onChange: (event, { newValue }) => setValue(newValue)
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
}

export default SearchBar;
