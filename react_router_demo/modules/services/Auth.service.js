
export function AuthConfirm (nextstate, replace) {
  let flag = false;
  const ticket = 'react_route_demo_auth';
  if (window.localStorage.getItem(ticket) === 'logined') {
    flag=true;
    console.log('logined');
  } else {
    flag = false;
    console.log('not logined');
  }
  return flag;
}


