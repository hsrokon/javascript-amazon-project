const xhr = new XMLHttpRequest();//Creates a new http msg/request to send to backend

xhr.addEventListener('load', () => {
  console.log(xhr.response);
})
// this method waits or listens for an event(since we need time for response to come) then it can run a function | first param is the event we listen/wait for ('load' means response has loaded)
//--first we need to setup the event listener

xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
//"GET" means we're gonna get some info from backend
//"second parameter" = where to send this http msg
//--then trigger the event/send request

//--xhr.open('GET', 'https://supersimplebackend.dev/products/first');
//--xhr.send();
//A backend only support a set of URL paths
//Backend API(application programming interface)(interface=how we interact with something)

//--xhr.open('GET', 'https://supersimplebackend.dev/documentation');
//--xhr.send();

//--xhr.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
//--xhr.send();
//backend can respond with diffrent type of data not just text e.g. doc/img/html
//Using the browser = making a GET request