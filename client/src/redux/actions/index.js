import axios from "axios"

export const getListMovies = (action) => async dispatch => {
const response = await axios.get('http://localhost:5000', {params: {
  page: action.payload
}})

  dispatch({
    type: action.type,
    payload: response.data
  })
}

export const updateLikeBtn = (action) => async dispatch => {
  
  const response = await axios.put('http://localhost:5000/updateLike',action)
  dispatch({
    type: 'updateLike',
    payload: action
  })
}

export const getCurrentUser = () => async (dispatch) => {
    
  try {
      const token = localStorage.getItem('token')
      const response = await axios({
          method: 'get',
          url: 'http://localhost:5000/auth',
          headers: {
              Authorization: `Bearer ${token}`
          }
      })
      
      dispatch({
          type: 'getCurrentUser',
          payload: response.data.data.user
      })
      
  } catch (error) {
      console.log(error)
  }
}