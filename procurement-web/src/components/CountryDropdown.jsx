import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCountries = async () => {
  const { data } = await axios.get('https://restcountries.com/v3.1/all');
  return data.map(country => ({
    name: country.name.common,
    code: country.cca2,
  }));
};

const CountryDropdown = ({ selectedCountry, onSelectCountry }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: countries, isLoading, isError } = useQuery({
    queryKey: ['countries'],
    queryFn: fetchCountries,
    enabled: isDropdownOpen, // Fetch only when dropdown is opened
    staleTime: 60 * 60 * 1000, // Cache data for 1 hour
  });

  const handleOpenDropdown = () => {
    setIsDropdownOpen(true);
  };

  return (
    <div className="relative w-full">
      <label className="block text-black font-semibold mb-2">Country</label>
      <select
        value={selectedCountry}
        onClick={handleOpenDropdown}
        onChange={(e) => onSelectCountry(e.target.value)}
        className="w-full p-2 border border-primary rounded focus:outline-none focus:ring-2 focus:ring-secondary"
      >
        <option value="">Select a country</option>
        {isLoading && <option>Loading countries...</option>}
        {isError && <option>Error loading countries</option>}
        {countries &&
          countries.map((country) => (
            <option key={country.code} value={country.name}>
              {country.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default CountryDropdown;
