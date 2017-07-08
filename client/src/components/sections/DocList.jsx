import React from 'react';
import PropTypes from 'prop-types';
import DocListTable from './DocListTable.jsx';

const DocList = ({ documents, onClick, authUser }) =>
  (<div>
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
          (<DocListTable
            key={document.id}
            document={document}
            authUser={authUser}
            handleClick={onClick}
          />)
        )}
      </tbody>
    </table>
  </div>);
DocList.propTypes = {
  authUser: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
};

export default DocList;
