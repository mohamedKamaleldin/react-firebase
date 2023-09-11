import { useEffect, useState } from 'react';
import { Auth } from './components/auth'
import { db,auth,storage } from './config/firebase';
import { getDocs, collection ,addDoc,deleteDoc,doc,updateDoc  } from 'firebase/firestore';
import { ref,uploadBytes } from 'firebase/storage';


export default function Home() {
  const [movieList, setMovieList] = useState([]);

  //new Movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleseDate, setNewReleseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  
  //update title state
  const [updatedTitle, setUpdatedTitle] = useState("")

  // file Upload state
    const [fileUpload,setFileUpload] = useState(null);

  const moviesCollectionRef = collection(db, 'movies');

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
     getMovieList();
  }, []);

 
  const onSubmitMovie = async (event) => {
    event.preventDefault();
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleseDate,
        receivedAnOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteMovie = async(id) => {
    const movieDoc = doc(db,"movies", id);
    await deleteDoc(movieDoc);
  };

  const updateMovietitle = async(id) => {
    const movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc, { title: updatedTitle });
  };

  const uploadFile = async () => {
    if(!fileUpload) return;
    const filesFolderRef = ref(storage,`projectFiles/${fileUpload.name}`);
    try{
      await uploadBytes(filesFolderRef, fileUpload);
    }catch(err){
      console.error(err);
    }
  }

  return (
    <div>
      <div className='text-7xl p-3 flex justify-center font-serif'>Firebase</div>
      <div className='text-5xl p-3 flex justify-center font-serif'>login</div>
      <Auth />


      <div className='pt-10'>
        <div className='text-5xl p-3 flex justify-center font-serif'>Make a Post</div>
        <form onSubmit={onSubmitMovie} className=''>
         <input type='text' className='p-2 border border-black' placeholder='Movie title.......' onChange={(e) =>setNewMovieTitle(e.target.value) } />
         <input type='number' className='p-2 border border-black' placeholder='Release Date.......' onChange={(e) =>setNewReleseDate(e.target.value) } />
         <input checked={isNewMovieOscar} type='checkbox' onChange={(e) =>setIsNewMovieOscar(e.target.checked) } />
         <label>Received an Oscar</label>
         <button type="submit"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">submit movie</button>
        </form>
      </div>
      <div className='pt-3'>
        {movieList.map((movie) => (
          <div className='flex justify-center font-serif p-5' key={movie.id}>
            <h1 className='text-l'> {movie.title} : </h1>
            <p> Date:  {movie.releaseDate}</p>

            <button 
              className=" bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => deleteMovie(movie.id)}>
              Delete movie
          </button>

          <input className='p-2 border border-black' placeholder='New title....'  onChange={(e) => setUpdatedTitle(e.target.value)}/>
          <button onClick={() => updateMovietitle(movie.id) }>Update Tilte</button>
          </div>
        ))}
      </div>
      <div>
        <input type='file' onChange={(e) => setFileUpload(e.target.files[0]) } />
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  )
}
