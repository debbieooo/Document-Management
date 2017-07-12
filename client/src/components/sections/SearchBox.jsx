import React from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onChange }) =>
  (<div>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
              id="search"
              type="search"
              onChange={onChange}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </div>
      </form>
    </div>
  </div>);
SearchBox.propTypes = {
  onChange: PropTypes.func.isRequired,
};
export default SearchBox;
