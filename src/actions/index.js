import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  //1st way using lodash
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // console.log(userIds);
  // userIds.forEach((id) => {
  //   dispatch(fetchUser(id));
  // });

  //2nd way using lodash
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach((id) => {
  //     dispatch(fetchUser(id));
  //   })
  //   .value();

  // My way without lodash
  const userIds = [...new Set(getState().posts.map((item) => item.userId))];
  userIds.forEach((id) => {
    dispatch(fetchUser(id));
  });

  // const data = getState().posts;
  // const userIds = [
  //   ...getState()
  //     .posts.reduce((a, c) => {
  //       a.set(c.userId, c);
  //       return a;
  //     }, new Map())
  //     .values(),
  // ];
  // console.log(userIds);
  // userIds.forEach((id) => {
  //   dispatch(fetchUser(id));
  // });
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};
//Commented as of implementing loadash memoize
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

//Lodash _.memoize
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });

// it will work fine, just improving syntax,code with es 2015 type of code
// export const fetchPosts = () => {
//   return async function (dispatch, getState) {
//     const response = await jsonPlaceholder.get("/posts");

//     dispatch({ type: "FETCH_POSTS", payload: response });
//   };
// };

//It's fine returning plain js object with redux-thunk too.
// export const fetchPosts = () => {
//   return {
//     type: "FETCH_POSTS",
//   };
// };
