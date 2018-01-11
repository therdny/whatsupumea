import firebase from './firebase';

//Post an add
export function addNewEvent(data){
  return (dispatch) => {
    const addsRef = firebase.database().ref('adds');
    addsRef.push(data);
  }
}

//Remove an add
export function removeAdd(addId) {
  return (dispatch) => {
    const removePost = firebase.database().ref(`/adds/${addId}`);
     removePost.remove();
  }
}

//Like an event

export function updateLikes(addId) {
  return (dispatch) => {
    let ref = firebase.database().ref(`/adds/${addId}`);
    ref.transaction(function(add) {
   		if (add) {
			add.likes++;
      }
      return add;
	})
  }
}

//Read the events
export function posts(){
  return (dispatch, state) => {
    firebase.database().ref('adds').on('value', (snapshot) => {
      dispatch({
        type: 'all_events',
        payload: snapshot.val()
      });
    })
}
}