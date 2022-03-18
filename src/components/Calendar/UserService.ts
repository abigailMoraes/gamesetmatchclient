import { User } from './MatchHistoryCard';

function setUserDetails(item: User) {
  return {
    userID: item.userID,
    firebaseID: item.firebaseID,
    name: item.name,
    email: item.email,
    is_admin: item.is_admin,

  };
}

const getMatchParticipants = (id: number) => fetch(`${process.env.REACT_APP_API_DOMAIN}/api/participants/match/${id}`)
  .then((response) => (response.json())).then((data) => data.map((item:User) => setUserDetails(item)));

const UserService = {
   getMatchParticipants,
};
export default UserService;
