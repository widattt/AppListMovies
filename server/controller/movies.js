import { MovieModel } from "../models/movieModel"

export const getMovies = async (req, res) => {
    
    try {
        // const movie = new MovieModel({
        //     title: 'The film is acttractived',
        //     name: 'King Kong',
        //     image: 'https://static.mservice.io/blogscontents/momo-upload-api-200213111622-637171893826164966.jpg',
        //     likeCount: 1
        // })
        // await movie.save()
        const moviesLength = (await MovieModel.find()).length
        let movies

        const PAGE_SIZE = 8
        let page = req.query.page
        
        if(page) {
            page = parseInt(page)
            const skipPage = (page - 1) * PAGE_SIZE
            movies = await MovieModel.find({})
            .skip(skipPage)
            .limit(PAGE_SIZE)
        } else {
            movies = await MovieModel.find({})
        }
        res.status(200).json(movies)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

// export const createMovie = async (req, res) => {
//     try {
//         const newMovie = req.body

//         const movie = new MovieModel(newMovie)
//         await movie.save()
//         res.status(200).json(movie)
//     } catch (error) {
//         res.status(500).json({err: error})
//     }
// }

export const updateMovieBtnLike = async (req, res) => {

    try {
        const idMovie = req.body.idMovie
        const movie = await MovieModel.findById({_id: idMovie})
        const check = movie.likes.find(dd => dd === req.body.idUser) 

        if(!check) {
            movie.likes.push(req.body.idUser)
            await MovieModel.updateOne({_id: idMovie}, {
                likes: movie.likes
            })
        } 
        else {
            await MovieModel.updateOne({_id: idMovie}, {
                likes: movie.likes.filter(dd => dd !== req.body.idUser)
            })
        }

        const listMovie = await MovieModel.find()
        
        
        
        res.status(200).json({
            message: 'Updated Success',
            data: listMovie
        })

    } catch (error) {
        res.status(500).json({err: error.message})
    }
}