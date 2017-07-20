import React from 'react';
import PropTypes from 'prop-types';
import DocumentListTable from './DocumentListTable.jsx';

const DocumentList = ({ documents, onClick, authUser }) =>
  (<div>
    <div className="col s4"><h5>Documents</h5></div>
    <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Access</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {documents.map(document =>
          (<DocumentListTable
            key={document.id}
            document={document}
            authUser={authUser}
            handleClick={onClick}
          />)
        )}
      </tbody>
    </table>
  </div>);
DocumentList.propTypes = {
  authUser: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  documents: PropTypes.array.isRequired,
};

export default DocumentList;
