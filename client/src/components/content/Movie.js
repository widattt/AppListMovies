import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { updateLikeBtn } from '../../redux/actions';


export default function Movie({props}) {
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const checkExist = (arr, id) => {
    const result = arr.find(e => e === id)
    return result ? true : false
  }
  const handleOnClick = (idUser, idMovie, index) => {
    dispatch(updateLikeBtn({
      idUser,
      idMovie,
      index
    }))
  }


  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.title}
        </Typography>
        <Typography variant="h5" component="div">
          {props.name}
        </Typography>
        <Box
          component="img"
          sx={{
            width: '100%',
          }}
          alt="The house from the offer."
          src={props.image}
        />
      </CardContent>
      <CardActions sx={{mx: 1}} disableSpacing>
        <Typography>{`${props.likes.length} Likes`}</Typography>
        <IconButton aria-label="add to favorites" color={checkExist(props.likes, user.id) ? 'error' : 'primary'} onClick={(e) => handleOnClick(user.id,props._id, props.index)}>
            <ThumbUpOffAltIcon />
          </IconButton>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" sx={{my: 2}}>{card}</Card>
    </Box>
  );
}