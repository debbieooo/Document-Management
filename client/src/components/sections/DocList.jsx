import React, { PropTypes } from 'react';
import DocListTable from './DocListTable.jsx';

const DocList = ({ documents, onClick, authUser }) =>
  <div>
      <div className="col s4"><h5>Documents</h5></div>
       <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Author</th>
          <th>Title</th>
          <th>Access</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {documents.map(document =>
        <DocListTable key={document.id}
        document={document}
        authUser={authUser}
        handleClick= {onClick}/>
        )}
      </tbody>
    </table>
     </div>
;
export default DocList;
