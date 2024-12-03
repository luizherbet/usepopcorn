import { useEffect, useState } from 'react';
import StarRate from './Star';

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = arr =>
  //parece uma media aritmética
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const KEY = '53abe222';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState('');

  useEffect(
    // function () {
    //   fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
    //     .then(res => res.json())
    //     .then(data => setMovies(data.Search));
    // }
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=interstellar`
          );
          if (!res.ok) throw new Error('Something went wrong!');
          const data = await res.json();
          console.log(data);
          setMovies(data.Search);
        } catch (err) {
          console.log(err.messages);
          setErro(err.messages);
        } finally {
          setIsLoading(false);
        }
      }
      fetchMovies();
    },
    []
  );

  return (
    <>
      <StarRate
        maxRating={5}
        colorStars={'#fcc419'}
        sizeStar={15}
        messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
        defaultRating={5}
      />

      <Test />

      <NavBar>
        <Logo />
        <Search />
        <Numresults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loading />}
          {!isLoading && !erro && <MovieList movies={movies} />}
          {erro && <ErroMessege messege={erro} />}
          {/* {isLoading ? <Loading /> : <MovieList movies={movies}></MovieList>} */}
        </Box>
        {/* <Box element = {<MovieList movies={movies}></MovieList>}/> */}
        <Box>
          <WatchedSumary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
//////////////////////////////////////////////////
function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Search() {
  const [query, setQuery] = useState('');

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
/////////////////////////////////////////////////
function Main({ children }) {
  return <main className="main">{children}</main>;
}
/////////////////////////////////
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen(open => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <ul className="list">
      {movies?.map(movie => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function ErroMessege({ message }) {
  return (
    <p className="error">
      {message}
      <span>❌</span>
    </p>
  );
}

function Loading() {
  return <p className="loader">Loading...</p>;
}

function Movie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
///////////////////////////////

//////////////
// function WatchedBox() {
//   const [isOpen2, setIsOpen2] = useState(true);
//   const [watched, setWatched] = useState(tempWatchedData);

//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen2(open => !open)}>
//         {isOpen2 ? '–' : '+'}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSumary watched={watched} />

//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }
/////////////
function WatchedSumary({ watched }) {
  const avgImdbRating = average(watched.map(movie => movie.imdbRating));
  const avgUserRating = average(watched.map(movie => movie.userRating));
  const avgRuntime = average(watched.map(movie => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched }) {
  return (
    <ul className="list">
      {watched.map(movie => (
        <WachedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WachedMovie({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
///////////////////////

// function StarRating({ maxRating = 10 }) {
//   const [rating, setRating] = useState(0);

//   function handleOnClick(a) {
//     setRating(a);
//   }

//   return (
//     <div style={containerStyle}>
//       <div style={starContainerStyle}>
//         {Array.from(
//           { length: maxRating },
//           (_, i) =>
//             i >= 0 && (
//               <Star
//                 onRate={() => handleOnClick(i + 1)}
//                 full={rating >= i + 1}
//               />
//             )
//         )}
//         <p style={textStyle}>{rating}</p>
//       </div>
//     </div>
//   );
// }

// function Star({ onRate, full }) {
//   return (
//     <span style={starLine} onClick={onRate}>
//       {full ? <p>★</p> : <p>☆</p>}
//     </span>
//   );
// }

// const containerStyle = {
//   diplay: 'flex',
//   alingItems: 'center',
//   gap: '16px',
// };

// const starContainerStyle = {
//   display: 'flex',
//   gap: '4px',
// };

// const starLine = {
//   fontSize: '50px',
//   cursor: 'pointer',
// };

// const textStyle = {
//   lineHeight: '1',
//   margin: '0',
// };

function Test() {
  const [a, setA] = useState(0);

  return (
    <>
      <StarRate
        maxRating={5}
        colorStars={'#fcc419'}
        sizeStar={48}
        messages={['Terrible', 'Bad', 'Okay', 'Good', 'Amazing']}
        defaultRating={5}
        setA={setA}
      />
      <p>A classificação para este filme foi {a}</p>
    </>
  );
}
