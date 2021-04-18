import React from 'react';

const Dropdown = () => {

  const [options] = React.useState([
    { value: "movies"},
    { value: "tv show" },
    { value: "both" }
  ]);

  return (
    <select>
      {options.map(option=> (
        <option
          key={option.value}
          value={option.value}
        >
          {option.value}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;