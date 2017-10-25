import firebase from './firebase';

export function incrementCounter(){
    return {
        type: "INCREMENT"
    }
}

export function handleSubmit(e) {
    e.preventDefault();
    const addsRef = firebase.database().ref('adds');
    const add = {
      name: this.state.user.displayName || this.state.user.email,
      title: this.state.title,
      date: this.state.date,
      time: this.state.time,
      where: this.state.where,
      what: this.state.what
    }
    addsRef.push(add);
    this.setState({
      currentItem: '',
      username: ''
    });
  }