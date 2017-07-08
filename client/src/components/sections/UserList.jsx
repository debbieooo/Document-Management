import React, { PropTypes } from 'react';
import UserListTable from './UserListTable.jsx';

const UserList = ({ users, onClick }) =>
  (<div>
    <h5>Users</h5>
    <table className="bordered responsive-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <UserListTable key={user.id} user={user} handleClick={onClick} />
        )}
      </tbody>
    </table>
  </div>);
UserList.propTypes = {
  users: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default UserList;
