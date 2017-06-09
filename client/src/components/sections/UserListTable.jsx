import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const UserListRow = ({ user }) => (
    <tr className= "center-align">
      <td>{user.roleId}</td>
      <td><Link to ={`/user/${user.id}`}> {user.name}</Link> </td>
     <td><Link to ={`/user/${user.id}`}> {user.userName}</Link> </td>
    </tr>
  );

UserListRow.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserListRow;
