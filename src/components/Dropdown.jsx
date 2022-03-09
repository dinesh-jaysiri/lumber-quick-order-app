import React, { useEffect, useRef } from "react";



function Dropdown({
  placeholder = "placeholder",
  options = [],
  onDropdwnChange,
}) {

  const dropdownRef = useRef(null);


  useEffect(() => {
    console.log(placeholder)
  })


  return (
    <div className="dropdown-base">
      <div className="select">
        <select
          ref={dropdownRef}
          name="Select Categries"
          id="select_categories"
          onChange={onDropdwnChange}
        >
          <option key={"placeholder"} selected value={{ id: 3 }} hidden>
            {placeholder}
          </option>
          {options.map((item) => (
            <option
              selected={item.selected}
              key={item.title}
              value={JSON.stringify(item)}
            >
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Dropdown;
