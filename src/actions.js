import firebase from './firebase';

export let updateLikes = function(e) {
  let addId = e.target.attributes['data-id'].value;
  let ref = firebase.database().ref(`adds/${addId}`);
  function toggleLikes(addRef, uid) {
    addRef.transaction(function(add) {
      if (add) {
        console.log(add)
          add.likes++;
      }
      return add;
    });
  }
  toggleLikes(ref, addId);
}


