export const t = {
  LOAD_USER_DATA: 'LOAD_USER_DATA',
  LOAD_MORE_DATA: 'LOAD_MORE_DATA',
  LOAD_USER_DATA_SUCCESS: 'LOAD_USER_DATA_SUCCESS',
  LOAD_USER_DATA_FAIL: 'LOAD_USER_DATA_FAIL',
};

export const userSearchActions = ({

  loadUserData: query => ({
    type: t.LOAD_USER_DATA,
    query
  }),
  loadMoreData: query => ({
    type: t.LOAD_MORE_DATA,
    query
  }),
  loadUserDataSuccess: (data, page) => ({
    type: t.LOAD_USER_DATA_SUCCESS,
    data: {data, page}
  }),

  loadUserDataFailure: error => ({
    type: t.LOAD_USER_DATA_FAIL,
    error
  })
});