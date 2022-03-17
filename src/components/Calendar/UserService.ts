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
const getAll = () => fetch('http://localhost:8080/user/all')
  .then((response) => (response.json())).then((data) => data.map((item: User) => setUserDetails(item)));

const getMatchParticipants = (id: number) => fetch(`http://localhost:8080/api/participants/match/${id}`)
  .then((response) => (response.json())).then((data) => data.map((item:User) => setUserDetails(item)));

const UserService = {
  getAll, getMatchParticipants,
};
export default UserService;
