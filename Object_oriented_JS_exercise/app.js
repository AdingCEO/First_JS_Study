
// Object literal 하나씩 객체 만들기
// const user = {
//     email: 'gogogo_1@naver.com',
//     birthdate: '1999-11-05',
//     buy(item) {
//          console.log(`${this.email} buys ${item.name}`)
//     },
// };


// Factory function으로 만들기
// function createUser(email, birthdate) {
//     const user = {
//         email,
//         birthdate,
//         buy(item) {
//             console.log(`${this.email} buys ${item.name}`);
//         },
//     };
//     return user;
// }

// const user1 = createUser('gogogo_1@naver.com', '1999-11-05') // Factory function
// const user2 = createUser('kjykjy1037@naver.com', '1999-11-20')


// Constructor function으로 객체 만들기
// function User(email, birthdate) {
//     this.email = email; // this는 생성자로 생성된 객체를 가리킴
//     this.birthdate = birthdate;

//     this.buy = function (item) {
//         console.log(`${this.email} buys ${item.name}`);
//     };
// }

// const user1 = new User('gogogo_1@naver.com', '1999-11-05');


// Class로 객체 만들기. property는 constructor 안에, method는 밖에 적음
// 캡슐화 : 객체 외부에서 함부로 접근하면 안되는 프로퍼티나 메소드에 직접 접근할 수 없도록 하고,
// 필요한 경우 공개된 다른 메소드를 통해서만 접근할 수 있도록 하는 것을 의미
// User class는 완벽한 캡슐화는 되어있지 않지만(user1._email 로 접근 가능) Closure를 사용하면 완벽한 캡슐화 구현 가능
class User {
    constructor(email, birthdate) { // 객체가 생성될 때 실행됨
        this.email = email;
        this.birthdate = birthdate;
    }
    
    buy(item) {
        console.log(`${this.email} buys ${item.name}`);
    }
    
    get email() { // getter method. email 속성을 읽으려고 하면 이 함수가 실행됨
        return `Email address is ${this._email}`;
    }
    
    set email(address) { // setter method. email 속성을 수정하려고 하면 이 함수가 실행됨
        if (address.includes('@')){
            this._email = address;
        } else {
            throw new Error('invalid email address');
        }
    }
}

const user1 = new User('gogogo_1@naver.com', '1999-11-05');



const item = {
    name:'스웨터',
    price : 20000,
};

console.log(user1.email);
console.log(user1.birthdate);
user1.buy(item);



//상속
class PremiumUser extends User {
    constructor(email, birthdate, level) {
        super(email, birthdate); // 부모의 생성자 호출해야함
        this.level = level;
    }
    
    //overriding
    buy(item) {
        console.log(`${this.email} buys ${item.name} with a 5% discount`);
    }
    
    streamMusicForFree() {
        console.log(`Free music streaming for ${this.email}`)
    }
}

const pUser1 = new PremiumUser('kjykjy1037@gmail.com', '1999-11-06');
console.log(pUser1.email);
pUser1.buy(item);
pUser1.streamMusicForFree();


const user2 = new User('haha@gmail.com', '1850-06-15');
const pUser2 = new PremiumUser('yoyo@gmail.com', '1555-05-26');

const users = [user1, pUser1, user2, pUser2];

// 다형성 : 하나의 변수(user)가 다양한 종류의 객체(user1,user2는 User class의 객체, pUser1, pUser2는 PremiumUser class의 객체)를 가리킬 수 있음
users.forEach((user) => {user.buy(item);});



class UpdatedPremiumUser extends User {
    constructor(email, birthdate, level, point) {
        super(email, birthdate); // 부모의 생성자 호출해야함
        this.level = level;
        this.point = point;
    }
    
    //overriding
    buy(item) {
        super.buy(item); // console.log(`${this.email} buys ${item.name}`);
        this.point += item.price * 0.05;
    }
    
    streamMusicForFree() {
        console.log(`Free music streaming for ${this.email}`)
    }
}


// instanceof -> 현재 객체가 어떤 class로 만들어진건지 확인가능
users.forEach((user) => {
    console.log(user instanceof PremiumUser); // PremiumUser 클래스로 만들어진 객체만 true return함
    console.log(user instanceof User); // 자식 클래스로 만든 객체는 부모 클래스로 만든 객체로도 인정됨.
});


// static method, static property -> class 자체에 딸려있는 method, property
class Math {
    static PI = 3.14;
    
    static getCircleArea(radius){
        return Math.PI * radius * radius;
    }
}

Math.PI = 3.141592; // 수정 가능

console.log(Math.PI);
console.log(Math.getCircleArea(5));