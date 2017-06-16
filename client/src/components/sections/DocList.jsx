import React, { PropTypes } from 'react';
import DocListTable from './DocListTable.jsx';

const DocList = ({ docs, onClick }) =>
 (
  <div>
       <h5>Documents</h5>
       <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Author</th>
          <th>Title</th>
          <th>Access</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {docs.map(doc => <DocListTable key={doc.id} doc={doc} handleClick= {onClick}/>)}
      </tbody>
    </table>
     </div>
);
DocList.PropTypes = {
  docs: PropTypes.array.isRequired
};
export default DocList;
