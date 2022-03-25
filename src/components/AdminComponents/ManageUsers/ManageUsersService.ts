const baseURL = `${process.env.REACT_APP_API_DOMAIN}/api`;

const assignAdminToUserByEmail = (email : string) => fetch(`${baseURL}/user/${email}`, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.text());

const generateInvitationCode = () => fetch(`${baseURL}/inviteCode`, {
  method: 'Post',
  headers: { 'Content-Type': 'application/json' },
}).then((response) => response.json());

const ManageUsersService = {
  assignAdminToUserByEmail,
  generateInvitationCode,
};

export default ManageUsersService;
