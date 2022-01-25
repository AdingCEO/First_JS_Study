fetch('https://www.google.com') // request를 보내고 reponse를 받음
    .then((response) => response.text()) // reponse는 객체로 옴. response가 와야 실행되는 callback 함수임
    // then 메소드가 콜백을 '등록'시켜줌. fetch함수가 return하는 promise 객체의 메소드임
    .then((result) => {console.log(result);});
    // 이전 콜백의 return 값을 다음 콜백이 가져올수 있음. 여기선 result로 가져옴. 번외로 text()도 비동기 메소드임
    // 이렇게 받아온 result의 type은 String이므로 데이터 다루려면 파싱해서 object로 바꿔줘야함


fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.text()) 
    .then((result) => {
    const users = JSON.parse(result);
    console.log(users.length);
    users.forEach( (user) => {
        console.log(user.name)
    })
});

// GET
fetch('https://learn.codeit.kr/api/members/3')
    .then((response) => response.text())
    .then((result) => {console.log(result);});


//POST
const newMember = {
    name : 'Jerry',
    email : 'jerry@codeit.kr',
    department : 'engineering',
};

fetch('https://learn.codeit.kr/api/members', { // option 객체를 두번째 파라미터의 인자값으로 넘겨줌
    method: 'POST',
    headers: {
        'Content-Type':'application/json', // Content-Type 헤더 설정, request의 body에 담을 데이터가 JSON 데이터라는 뜻. 설정 안해줬을땐 text/plain; charset=UTF-8 으로 찍힘.
    },
    body: JSON.stringify(newMember),
})
    .then((response) => response.text())
    .then((result) => {console.log(result);});


//PUT
const member = {
    name : 'Alice',
    email : 'alice@codeitmail.kr',
    department : 'marketing',
};

fetch('https://learn.codeit.kr/api/members/2', {
    method: 'PUT',
    body: JSON.stringify(member),
})
    .then((response) => response.text())
    .then((result) => {console.log(result);});


//DELETE
fetch('https://learn.codeit.kr/api/members/2', { // option 객체를 두번째 파라미터의 인자값으로 넘겨줌
    method: 'DELETE',
})
    .then((response) => response.text())
    .then((result) => {console.log(result);});


//response.json()
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.text())
    .then((result) => {console.log(result);});
// response의 내용이 JSON 데이터라면 json() 는 해당 데이터를 Deserialization까지 해준 후 JS 객체를 return해줌
fetch('https://jsonplaceholder.typicode.com/users')
  .then((response) => response.json())
  .then((result) => { const users = result; });



// JS로 application/x-www-form-urlencoded 타입으로 리퀘스트 바디에 넣기
const urlencoded = new URLSearchParams(); // 자동으로 값에 URL encoding을 적용해주는 객체
urlencoded.append('email', 'tommy@codeit.kr');
urlencoded.append('password', 'codeit123!');
urlencoded.append('nickname', 'Nice Guy!');

fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: urlencoded,
})
  .then((response) => response.text())
  .then((result) => {
    console.log(result);
  });



// multipart/form-data 은 여러 종류의 데이터를 하나로 합친 데이터를 의미하는 타입. 이미지, 영상, 글 여러 데이터를 한번에 보낼때 사용
// JS로 multipart/form-data 타입으로 보내기
const formData = new FormData(); // FormData를 사용하면 리퀘스트의 헤더에 Content-Type의 값을 multipart/form-data로 직접 설정하지 않아도 자동으로 설정해줌
formData.append('email', email.value);
formData.append('password', password.value);
formData.append('nickname', nickname.value);
formData.append('profile', image.files[0], "me.png");

fetch('https://learn.codeit.kr/api/members', {
  method: 'POST',
  body: formData,
})
  .then((response) => response.text())
  .then((result) => { console.log(result); });



// JS로 Ajax 통신하기
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://learn.codeit.kr/api/members');
xhr.onload = function () {
  console.log(xhr.response);
};
xhr.onerror = function () {
  alert('Error!');
};
xhr.send();
// 예전엔 XMLHttpRequest를 이렇게 직접 사용할 일이 많았지만 요즘에는 굳이 그렇게 하지 않아도 됩니다.
// 1. fetch 함수로 Ajax 통신 할 수 있기 때문
// 2. XMLHttpRequest을 기반으로 더 쓰기 편하게 만들어진 axios라는 패키지가 존재하기 때문



//fetch 함수는 promise 객체를 return하고, promise 객체는 어떤 작업에 대한 상태정보를 갖고있는 객체임
//promise 객체는 3가지 상태를 가짐. 1. pending(작업 진행중) 2. fulfilled (성공) 3. rejected (실패)

fetch('https://www.google.com')
// pending상태에서 response 받으면 fulfilled 상태되면서 promise객체는 그 작업의 성공 결과도 함께 가짐. 작업성공결과는 첫번째 콜백의 파라미터로 넘겨줌
// 네트워크 끊겨서 request 못보내거나 response를 못받으면 rejected 상태되며, 작업 실패의 이유에 관한 정보, 즉 작업실패정보를 갖게됨
    .then((response) => response.text()) // then 메소드는 promise 객체가 pending에서 fulfilled 상태 될 때 실행할 콜백 등록하는 메소드. 새로운 Promise 객체 return함
    .then((result) => {console.log(result);}); // Promise Chaining - then 메소드 뒤에는 then 메소드를 또 붙일수 있음.
    //1. 콜백에서 promise 객체를 리턴하는 경우, then 메소드가 return한 promise 객체는 콜백이 return한 promise 객체와 동일한 상태와 결과를 가짐
    // 즉 콜백이 리턴한 promise가 fulfilled해지고 작업성공결과 갖게된다면 then이 리턴한 객체도 fulfilled되고 같은 작업성공결과 갖음
    //2. 콜백에서 단순 숫자, 문자열, 일반 객체를 return하는 경우, then 메소드가 return한 promise 객체는 fulfilled되고 작업성공결과 return함

// fetch 함수로 리스폰스를 잘 받으면, response 객체의 text 메소드는, fulfilled 상태이면서, 리스폰스의 바디에 있는 내용을 string 타입으로 변환한 값을 '작업 성공 결과'로 가진 Promise 객체를 리턴
// 이때 그 작업 성공 결과는 string 타입인데요. 이때 그 값이 만약 JSON 데이터라면 이전에 배운 것처럼 JSON 객체의 parse 메소드로 Deserialize를 해줘야합니다.(JSON.parse(result);)

// fetch 함수로 리스폰스를 잘 받으면, response 객체의 json 메소드는, fulfilled 상태이면서, 리스폰스의 바디에 있는 JSON 데이터를 자바스크립트 객체로 Deserialize해서 생겨난 객체를 '작업 성공 결과'로 가진 Promise 객체를 리턴
// 만약 리스폰스의 바디에 있는 내용이 JSON 타입이 아니라면 에러가 발생하고 Promise 객체는 rejected 상태가 되면서 그 '작업 실패 정보'를 갖게 됩니다.

// promise chaining을 사용한다면 promise 객체를 return한 경우 콜백함수 밖으로 then 메도스를 뺄 수 있음


// promise가 rejected 될 때 실행할 콜백 등록하고 싶으면 then 메소드의 두번째 파라미터로 주면 됨
fetch ('https://www.google.com')
    .then((response) => response.text(), (error) => {console.log(error);}) // error는 작업실패 정보를 가짐
    .then((result) => {console.log(result);});

fetch ('https://www.google.com')
    .then((response) => response.text())
    .then((result) => {console.log(result);})
    .catch((error) => {console.log(error);}) // promise가 rejected 될 때 실행할 콜백 등록하는 메소드
  //.then(undefined, (error) => {console.log(error);}) 와 동일함
    .finally(() => {console.log('exit')}); // catch 보다도 뒤에 쓰임. fulfilled던 rejected던지 항상 콜백이 실행됨


//catch 메소드는 보통 가장 마지막에 사용. 만약 중간에 에러가 발생해도 catch 메소드가 그 대안을 뒤로 넘겨줄 수 있으면 catch 메소드를 중간에 써도 됨.
fetch('https://friendbook.com/my/newsfeeds')
  .then((response) => response.json()) // -- A
  .then((result) => { // -- B
    const feeds = result;
    // 피드 데이터 가공...
    return processedFeeds; 
  })
  .catch((error) => { // -- C
    // 미리 저장해둔 일반 뉴스를 보여주기  
    const storedGeneralNews = getStoredGeneralNews();
    return storedGeneralNews;
  })
  .then((result) => { /* 화면에 표시 */ }) // -- D
  .catch((error) => { /* 에러 로깅 */ }); // -- E


// 2. 실행된 콜백이 아무 값도 리턴하지 않는 경우
// then 메소드가 리턴했던 Promise 객체는 fulfilled 상태가 되고, 그 작업 성공 결과로 undefined를 갖게 됩니다.

// 3. 실행된 콜백 내부에서 에러가 발생했을 때
// Promise 객체가 rejected 상태가 되고, 작업 실패 정보로 해당 에러 객체를 갖게 됩니다. 

// 4. 아무런 콜백도 실행되지 않을 때
// then 메소드가 리턴하는 객체는, 이전 Promise 객체와 동일한 상태와 결과를 갖게 됩니다.



//Promise 객체 직접 생성하기
const p = new Promise((resolve, reject) => { // executor 함수에는 resolve, reject라는 두 파라미터 있음
    //resolve에는 생성된 Promise 객체를 fulfilled 상태로 만들 수 있는 함수가 연결됨
    //reject에는 성성된 Promise 객체를 rejected 상태로 만들 수 있는 함수가 연결됨
    setTimeout(()=> {resolve('success');}, 2000); // 2후에 p 객체는 fulfilled 상태가 되고, 작업성공결과로 'success'를 가짐
});
p.then((result) => {console.log(result);});


const p = new Promise((resolve, reject) => { 
    setTimeout(()=> {reject(new Error('fail'));}, 2000); // 2후에 p 객체는 rejected 상태가 되고, 작업실패정보로 에러객체를 가짐
});
p.catch((error) => {console.log(error);});

const p = Promise.resolve('success'); // fulfilled 상태의 Promise 객체 만들기
const p = Promise.reject(new Error('fail'));// rejected 상태의 Promise 객체 만들기



// 여러 Promise 객체 다루기

// 1. all 메소드 - then 메소드처럼 새로운 Promise 객체를 리턴하는데요,
// all 메소드는 이렇게 아규먼트로 들어온 배열 안에 있는 모든 Promise 객체가 pending 상태에서 fulfilled 상태가 될 때까지 기다립니다. 
// 그리고 모든 Promise 객체들이 fulfilled 상태가 되면, all 메소드가 리턴했던 Promise 객체는 fulfilled 상태가 되고, 
// 각 Promise 객체의 작업 성공 결과들로 이루어진 배열을, 그 작업 성공 결과로 갖게 됩니다.
// 하나라도 rejected 되면 all 메소드가 리턴한 객체는 rejected 되므로 하나의 Promise 객체라도 rejected 상태가 되면, 전체 작업이 실패한 것으로 간주해야 할 때 사용

// 1번 직원 정보
const p1 = fetch('https://learn.codeit.kr/api/members/1').then((res) => res.json());
// 2번 직원 정보
const p2 = fetch('https://learn.codeit.kr/api/members/2').then((res) => res.json());
// 3번 직원 정보
const p3 = fetch('https://learn.codeit.kr/api/members/3').then((res) => res.json());

Promise
  .all([p1, p2, p3])
  .then((results) => {
    console.log(results); // Array : [1번 직원 정보, 2번 직원 정보, 3번 직원 정보]
  })
.catch((error) => {
    console.log(error);
  });


// 2. race 메소드 - all 메소드처럼 여러 Promise 객체가 있는 배열을 인자값으로 받고, Promise 객체를 리턴함
// 그러나 race 메소드가 리턴한 Promise 객체는 아규먼트로 들어온 배열의 여러 Promise 객체들 중에서 
// 가장 먼저 fulfilled 상태 또는 rejected 상태가 된 Promise 객체와 동일한 상태와 결과를 갖게 됩니다.

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Success'), 1000);
});
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail')), 2000);
});
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error('fail2')), 4000);
});

Promise
  .race([p1, p2, p3])
  .then((result) => {
    console.log(result); // hello 출력
  })
  .catch((value) => {
    console.log(value);
  }); // 콘솔에 Success 찍힘


// axios 패키지. fetch처럼 Promise객체 리턴함
axios
  .get('https://jsonplaceholder.typicode.com/users')
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.log(error);
  });
// 모든 리퀘스트, 리스폰스에 대한 공통 설정 및 공통된 전처리 함수 삽입 가능
// serialization, deserialization을 자동으로 수행
// 특정 리퀘스트에 대해 얼마나 오랫동안 리스폰스가 오지 않으면 리퀘스트를 취소할지 설정 가능(request timeout)
// 업로드 시 진행 상태 정보를 얻을 수 있음
// 리퀘스트 취소 기능 지원





// async/await
// fetch('https://jsonplaceholder.typicode.com/users')
//     .then((response) => response.text())
//     .then((result) => {console.log(result);});

async function fetchAndPrint() { // 함수 앞에 async를 붙여서 함수 내에 비동기처리될 부분이 있음을 알려줌
    console.log(2);
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    // await이 있으면 fetch함수가 리턴한 promise객체가 fulfilled 상태가 될 때 까지 기다림
    // fulfilled 상태 되면 그 작업성공결과를 추출해서 return함
    console.log(7);
    const result = await response.text();
    console.log(result);
}

console.log(1);
fetchAndPrint();
// 함수 내에서 첫번째 await 만나면 함수 밖으로 코드실행흐름 바뀜
// 첫번째 await이 return하면 함수 내 코드 실행하다가 두번째 await 만나면 다시 함수 밖으로 실행흐름 나감
console.log(3);
console.log(4);
console.log(5);
console.log(6);



// try 블록 안에서 await이 붙어있는 Promise 객체들 중 rejected 상태가 되는것이 생기면, 그 순간 코드의 흐름이 catch문으로 넘어감
async function fetchAndPrint() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.commm/users');
        const result = await response.text();
        console.log(result);
    } catch (error) { // error 파라미터로 작업실패정보 넘어감
        console.log(error);
    } finally {
        console.log('exit');
    }
}
fetchAndPrint();



// async 함수는 항상 Promise 객체를 return함
async function afunc () {
    return 3;
}
afunc();
// afunc 함수는 숫자 3을 작업성공결과로 가지는 fulfilled상태의 Promise 객체를 return함

// 1. 어떤 값을 리턴하는 경우
// (1) Promise 객체를 리턴하는 경우
// async 함수 안에서 Promise 객체를 리턴하는 경우에는
// 해당 Promise 객체와 동일한 상태와 작업 성공 결과(또는 작업 실패 정보)를 가진 Promise 객체를 리턴합니다.

// (2) Promise 객체 이외의 값을 리턴하는 경우
// async 함수 내부에서 Promise 객체 이외에 숫자나 문자열, 일반 객체 등을 리턴하는 경우에는,
// fulfilled 상태이면서, 리턴된 값을 작업 성공 결과로 가진 Promise 객체를 리턴합니다.

// 2. 아무 값도 리턴하지 않는 경우
// 이 경우에는 fulfilled 상태이면서, undefined를 작업 성공 결과로 가진 Promise 객체가 리턴됩니다.

// 3. async 함수 내부에서 에러가 발생했을 때
// async 함수 안에서 에러가 발생하면, rejected 상태이면서, 해당 에러 객체를 작업 실패 정보로 가진 Promise 객체가 리턴됩니다.