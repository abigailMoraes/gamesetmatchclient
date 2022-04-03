import { User } from '../../../interfaces/UserInterface';

function setUserDetails(item: User) {
  return {
    userID: item.id,
    firebaseID: item.firebaseId,
    name: item.name,
    email: item.email,
    is_admin: item.role,
  };
}

const getMatchParticipants = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/match/${id}/participants`)
  .then((response) => (response.json())).then((data) => data.map((item:User) => setUserDetails(item)));

const UserService = {
  getMatchParticipants,
};
export default UserService;
