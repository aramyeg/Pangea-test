export const getUser = (id) => {
  try {
    const serializedID = JSON.stringify(id);
    const serializedUser = localStorage.getItem(serializedID);
    if(serializedUser === null){
      return undefined;
    }
    return JSON.parse(serializedUser);
  } catch (err) {
    return undefined;
  }
}

export const removeUser = (id) => {
  try {
    const serializedUser = localStorage.getItem(id);
    if(serializedUser === null){
      return undefined;
    }
    localStorage.removeItem(id);
  } catch (err) {
    return undefined;
  }
}

export const saveUser = (user) => {
  try {
    const userParams = {
      avatar_url: user.avatar_url,
      id: user.id,
      login: user.login,
      }
    const serializedUser = JSON.stringify(userParams);
    const serializedID = JSON.stringify(user.id);
    console.log(serializedUser, serializedID)
    localStorage.setItem(serializedID, serializedUser);
  } catch (err) {
    
  }
}
