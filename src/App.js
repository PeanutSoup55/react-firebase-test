import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { db, auth, storage } from './config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { reload } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [movieList, setMovies] = useState([]);
  const movieCollection = collection(db, "movies");
  const [newMovieTitle, setMovieTitle] = useState("");
  const [newReleaseDate, setReleaseDate] = useState("");
  const [isOscar, newOscar] = useState("");
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [fileUpload, setFileUpload] = useState(null);

  const getMovieList = async () => {
    try{
      const data = await getDocs(movieCollection)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      console.log(filteredData);
      setMovies(filteredData);
    }catch(err){
      console.log(err)
    } 
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const onSubmitMovie = async () => {

    try {
      await addDoc(movieCollection, {
        title: newMovieTitle,
        date: newReleaseDate, 
        oscar: isOscar,
        userID: auth?.currentUser.uid,
      });
      getMovieList();
    } catch (error) {
      console.log(error)
    }
    
  };


  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
      getMovieList()
    } catch (error) {
      console.log(error)
    }
  }

  const updateMovietitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, {title: updatedTitle})
      getMovieList()
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFile = async () => {
    if (!fileUpload){
      return;
    }
    const storageRef = ref(storage, `movies/${fileUpload.name}`);
    try {
      await uploadBytes(storageRef, fileUpload);

    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
      <Auth></Auth>    
      <div>
        <input placeholder='movie title' onChange={(e) => setMovieTitle(e.target.value)}></input>
        <input placeholder='release date' type='date' onChange={(e) => setReleaseDate(e.target.value)}></input>
        <input type='checkbox' checked={isOscar} onChange={(e) => newOscar(e.target.checked)}/>
        <label>recieved oscar</label>
        <button onClick={onSubmitMovie}>submit movie</button>

      </div>
      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.oscar ? "green" : "false"}}>{movie.title}</h1>
            <p>{movie.date}</p>
            <p>{movie.oscar}</p>

            <button onClick={() => deleteMovie(movie.id)}>delete</button>

            <input placeholder='new title' onChange={(e) => setUpdatedTitle(e.target.value)}/>
            <button onClick={() => updateMovietitle(movie.id)}>update title</button>


          </div>
        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>upload file</button>
      </div>
    </div>
  );
}

export default App;
