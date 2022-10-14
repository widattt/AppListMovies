import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Grid from '@mui/material/Grid';
import Movie from './Movie';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getListMovies } from '../../redux/actions';



function ListMovies() {
    const { movies, hasMore } = useSelector(state => state.movies)
    const [page, setPage] = useState(1)
  
    
    const dispatch = useDispatch()

    const fetchData = () => {
      dispatch(getListMovies({type: 'getListMovies', payload: page}))
    }

  useEffect(() => {
    dispatch(getListMovies({type: 'getListMovies', payload: page}))
    setPage(prev => prev + 1)
  }, []) 

  const fetchMoreData = () => {
    setPage(prev => prev + 1)
    setTimeout(() => {
      if(hasMore) {
        fetchData()
      }
    }, 1000)
    fetchData()
  }

  return (
    <InfiniteScroll
    dataLength={movies.length} //This is important field to render the next data
    next={fetchMoreData}
    hasMore={hasMore}
    loader={<h4>Loading...</h4>}
    endMessage={
      <p style={{ textAlign: 'center' }}>
        <b>Yay! You have seen it all</b>
      </p>
    }
  >
    <Grid container spacing={1} alignItems="strech">
            {
                movies.map((movie, index) => (
                    <Grid item key={index} xs={12} sm={6} lg={3}>
                        <Movie props={{...movie, index}} />
                    </Grid>
                ))
            }
      </Grid>
</InfiniteScroll>
    
  )
}

export default ListMovies