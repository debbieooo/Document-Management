import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const UserListRow = ({ user, handleClick }) =>
  (<tr className="center-align">
    <td><Link to={`/user/${user.id}`}> {user.name}</Link> </td>
    <td><Link to={`/user/${user.id}`}> {user.userName}</Link> </td>
    <td>
      <a
        id="delete"
        role="link"
        tabIndex={0}
        className="btn-floating btn-large waves-effect waves-light red"
        onClick={() => { handleClick(user.id); }}
      >
        <i className="material-icons" id="btn-delete-user">delete</i>
      </a>
    </td>
  </tr>)
  ;

UserListRow.propTypes = {
  user: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default UserListRow;
