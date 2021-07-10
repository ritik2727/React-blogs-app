import jsonplaceholder from '../apis/jsonPlaceholder';
import _ from 'lodash';

export const fetchPostAndUsers = () =>async (dispatch,getState)=>{
    await dispatch(fetchPost());

    //const userIds =_.uniq(_.map(getState().posts,'userId'));
   // userIds.forEach(id=>dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id=>dispatch(fetchUser(id)))
        .value();
}

export const fetchPost = () => async (dispatch) => {
    const response = await jsonplaceholder.get('/posts');

    dispatch({type:'FETCH_POST', payload:response.data});
};

 export const fetchUser = (id) => async (dispatch)=>{
    const response = await  jsonplaceholder.get(`/users/${id}`);
    
    dispatch({type:'FETCH_USER', payload:response.data});
};




//export const fetchUser = (id) => async (dispatch)=>{
  //  const response = await  jsonplaceholder.get(`/users/${id}`);
  //  dispatch({type:'FETCH_USER', payload:response.data});
//}



//memoize fun

//export const fetchUser =(id)=> (dispatch)=>_fetchuser(id,dispatch);
//const _fetchuser = _.memoize(async (id,dispatch)=>{
   // const response = await  jsonplaceholder.get(`/users/${id}`);
   // dispatch({type:'FETCH_USER', payload:response.data});
//})