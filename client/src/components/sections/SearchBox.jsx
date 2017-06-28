import React, { Proptypes } from 'react';//eslint-disable-line

const SearchBox = ({ onChange }) =>
  <div>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input
            id="search"
            className="materialize-textarea"
            onChange = {onChange} />
            <label className="active"
            htmlFor="search">
            Search
            <i className="material-icons">
              search
            </i>
          </label>
          </div>
        </div>
      </form>
    </div>
  </div>
;
export default SearchBox;
