import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';

const DocListTable = ({ doc, handleClick, authUser }) => (
    <tr className= "center-align">
      <td>{doc.id}</td>
      <td>{doc['User.userName']}</td>
      <td><Link to ={`/documents/${doc.id}`}> {doc.title}</Link> </td>
       <td>{doc.access}</td>
       <td>{doc.createdAt}</td>
       <td>{doc.updatedAt}</td>
      <td> <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => { handleClick(doc.id); }}><i className="material-icons">-</i></a></td>
{(doc['User.userName'] === authUser.userName) ?
<td><a className="btn-floating btn-large waves-effect waves-light red" onClick= {() => browserHistory.push('/documents/edit')}><i className="material-icons">mode_edit</i></a></td> : ''}</tr>
  );

DocListTable.propTypes = {
  doc: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
};

export default DocListTable;
