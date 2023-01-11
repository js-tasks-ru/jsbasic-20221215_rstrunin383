function makeFriendsList(friends) {
  let ul = document.createElement('ul');

  for (let friend of friends) {
    let li = document.createElement('li');
    ul.appendChild(li);

    li.innerHTML += friend.firstName + ' ' + friend.lastName;
  }

  return ul;
}
