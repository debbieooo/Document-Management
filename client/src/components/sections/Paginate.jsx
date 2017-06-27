import React from 'react';

const Paginate = ({ pageCount, currentPage, handleChange }) => 
  <div className="input-field inline">
    <select id="paginate" onChange={(e) => handleChange(e)}>
      {pageNumber(pageCount, handleChange)}
    </select>
  </div>
;

function pageNumber(pageCount, handleChange) {
  const pageNum = [];
  for (let page = 1; page < pageCount; page += 1) {
    pageNum.push(
      <option value={page} > Page {page} </option>);
  }
  return pageNum;
}
export default Paginate;
