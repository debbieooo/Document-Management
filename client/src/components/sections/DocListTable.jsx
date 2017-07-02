import React, { PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';

const DocListTable = ({ document, handleClick, authUser }) =>
    <tr className= "center-align">
      <td>{document.User.name}</td>
      <td>
        <Link to ={`/documents/${document.id}`}>
         {document.title}
        </Link>
      </td>
       <td>{document.access}</td>
       <td>{moment(document.createdAt).format('MMMM Do YYYY')}</td>
       <td>{moment(document.updatedAt).format('MMMM Do YYYY')}</td>
      <td>
      <a className="btn-floating btn-large waves-effect waves-light red"
       onClick={() => { handleClick(document.id); }}>
        <i className="material-icons">delete</i>
       </a>
      </td>
        {document.User.name === authUser.name
          ? <td>
            <a className="btn-floating btn-large waves-effect waves-light red"
          onClick=
          {() => browserHistory.push(`/documents/${document.id}/edit`)}>
          <i className="material-icons">mode_edit</i>
          </a>
          </td> : ''}
</tr>
  ;

DocListTable.propTypes = {
  document: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired
};

export default DocListTable;
