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

 //Like an add
 export function updateLikes(e){
    e.preventDefault();
    let ref = this.refs
    let data = {
      likes: ref.likes.value
    }
    if (data) {
      data.likes++;
    }
    return data;
  };

