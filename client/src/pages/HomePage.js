import React from 'react'
import { Container } from '@mui/material'
import ListMovies from '../components/content/ListMovies'
import Header from '../components/Header/Header'

function HomePage() {
  return (
    <Container maxWidth='lg'>
        <Header />
        <ListMovies />
    </Container>
  )
}

export default HomePage