import React from "react";
import PropTypes from "prop-types";

export function Item(props) {
  const { name } = props;
  return (
    <div className="textbox">
      {" "}
      <div> {name} </div>{" "}
    </div>
  );
}
Item.propTypes = {
  name: PropTypes.string.isRequired,
};
export default Item;
