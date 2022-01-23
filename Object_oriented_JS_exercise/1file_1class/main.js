import User from './User';
import PremiumUser from './PremiumUser';

const item = { 
  name: '스웨터', 
  price: 30000, 
};

const user1 = new User('chris123@google.com', '19920321');
const user2 = new User('rachel@google.com', '19880516');
const user3 = new User('brian@google.com', '20051125');
const pUser1 = new PremiumUser('niceguy@google.com', '19891207', 3);
const pUser2 = new PremiumUser('helloMike@google.com', '19900915', 2);
const pUser3 = new PremiumUser('aliceKim@google.com', '20010722', 5);

const users = [user1, pUser1, user2, pUser2, user3, pUser3];

users.forEach((user) => {
  user.buy(item);
});