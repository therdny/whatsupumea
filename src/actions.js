import firebase from './firebase';

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

//Remove add

export function removePost() {
  firebase.database().ref(`/adds/${addId}`)
      removePost.remove()
}

 

//So we can like an event
export function updateLikes(e) {
  let addId = e.target.attributes['data-id'].value;
  let ref = firebase.database().ref(`adds/${addId}`);
  function toggleLikes(addRef, uid) {
    addRef.transaction(function(add) {
      if (add) {
        add.likes++;
      }
      return add;
    });
  }
  toggleLikes(ref, addId);
}

//Our handleSubmit
export function handleSubmit(e) {
  e.preventDefault();
  const addsRef = firebase.database().ref('adds');
  const add = {
    name: this.state.user.displayName || this.state.user.email,
    title: this.state.title,
    date: this.state.date,
    time: this.state.time,
    likes: this.state.likes,
    where: this.state.where,
    what: this.state.what
  }
//Resets the form after submit
  this.setState({
    time: '',
    title: '',
    date: '',
    where: '',
    what: '',
  })

  addsRef.push(add);
  this.setState({
    username: '',
    });
    
}

//handleChange
export function handleChange(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
}