const init = {
  posts: {}
}

function posts(state = init, action) {
  let ret = state;
  switch (action.type) {
    case 'all_events':
      ret = {...ret, posts: action.payload}
      break;
     default:
    }
    return ret;
}

export default posts;
