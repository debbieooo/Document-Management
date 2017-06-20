import React, { PropTypes } from 'react';
import { Link } from 'react-router';


const UserListRow = ({ user, handleClick }) => (
    <tr className= "center-align">
      <td>{user.roleId}</td>
      <td><Link to ={`/user/${user.id}`}> {user.name}</Link> </td>
     <td><Link to ={`/user/${user.id}`}> {user.userName}</Link> </td>
     <td> <a className="btn-floating btn-large waves-effect waves-light red" onClick={() => { handleClick(user.id)}}><i className="material-icons">-</i></a></td>
    </tr>
  );

UserListRow.propTypes = {
  user: PropTypes.array.isRequired
};

export default UserListRow;
