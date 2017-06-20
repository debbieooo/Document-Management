import React, { PropTypes } from 'react';
import DocListTable from './DocListTable.jsx';

const DocList = ({ docs, onClick, authUser }) =>
 (
  <div>
      <div className="col s4"><h5>Documents</h5></div>
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
        {docs.map(doc => <DocListTable key={doc.id} doc={doc} authUser={authUser} handleClick= {onClick}/>)}
      </tbody>
    </table>
     </div>
);
DocList.propTypes = {
  docs: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired
};
export default DocList;
