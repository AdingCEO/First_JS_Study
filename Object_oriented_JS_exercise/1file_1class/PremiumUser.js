import User from './User';

class PremiumUser extends User {
  constructor(email, birthdate, level, point) {
    super(email, birthdate);
    this.level = level;
    this.point = point;
  }

  buy(item) {
    console.log(`${this.email} buys ${item.name}`);  
    this.point += item.price * 0.05;
  }

  streamMusicForFree() {
    console.log(`Free music streaming for ${this.email}`);
  }
}

export default PremiumUser