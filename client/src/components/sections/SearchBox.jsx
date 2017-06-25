import React, { Proptypes } from 'react';

const SearchBox = () => (
  <div>
    <div className="row">
      <form className="col s12">
        <div className="row">
          <div className="input-field col s12">
            <input id="textarea1" className="materialize-textarea"></input>
            <label className="active" for="textarea1"> Search<i className="material-icons">search</i></label>

          </div>
        </div>
      </form>
    </div>

  </div>
);
export default SearchBox;
