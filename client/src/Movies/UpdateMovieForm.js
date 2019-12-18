import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UpdateMovieForm = (props) => {
    console.log('props', props)
    const [movie, setMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: []
    });

    const id = props.match.params.id;

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => setMovie(response.data))
        .catch(error => (error))
        console.log(movie)
    }, []);

    const changeHandler = (e) => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
            id:id
        });
        console.log(movie);
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(response => {
            console.log('movie', response);
            setMovie(response.data);
            props.history.push(`/movies/${movie.id}`);
        })
        .catch(err => {
            console.error(err);
        });
    };
    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                type='text'
                name='title'
                placeholder='Title'
                value={movie.title}
                onChange={changeHandler}
                />
                <input 
                type='text'
                name='director'
                placeholder='Director'
                value={movie.director}
                onChange={changeHandler}
                />
                <input 
                type='text'
                name='metascore'
                placeholder='Metascore'
                value={movie.metascore}
                onChange={changeHandler}
                />
                <input
                type='text'
                name='stars'
                placeholder='Stars'
                value={movie.stars}
                onChange={changeHandler}
                />
                <button type='submit'>Update Movie</button>
                </form>
        </div>
    )
}

export default UpdateMovieForm;