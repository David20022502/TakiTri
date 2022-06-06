import { async } from "@firebase/util";
import { collection, getDocs, getDoc, query, where, doc, setDoc, deleteDoc, addDoc, updateDoc } from "firebase/firestore";

export const getMusics = async (resfreshFn) => {
  const musicsRef = collection(
    global.db_Firestore,
    "/canciones"
  );
  const querySnapshot = await getDocs(musicsRef);
  let tempMusics = [];

  querySnapshot.forEach((doc) => {
    tempMusics.push(doc.data());
  });
  console.log("canciones", tempMusics)
  resfreshFn(tempMusics)
}
export const getAlbumes = async (resfreshFn, userOunerId) => {

  if (userOunerId) {
      const songsAlbumRef = collection(
        global.db_Firestore,
        "/albums"
      );
      const songsQuery = query(songsAlbumRef, where("idUserOwn", "==", userOunerId));
      const querySnapshot = await getDocs(songsQuery);
      let tempAlbumes = [];

      querySnapshot.forEach((doc) => {
        tempAlbumes.push(doc.data());
      });
      let tempAlbumesOrder = [];
      console.log("totl de albumes", tempAlbumes.length - 1);
      for (let i = 0; i < tempAlbumes.length; i++) {
        let itemAlbum = [];
        if (i % 2 == 0) {
          itemAlbum.push(tempAlbumes[i]);
          if (i + 1 < tempAlbumes.length) {
            itemAlbum.push(tempAlbumes[i + 1]);
          }
          tempAlbumesOrder.push(itemAlbum);
        }

      }
      resfreshFn(tempAlbumesOrder)
    } else {
      const albumRef = collection(
        global.db_Firestore,
        "/albums"
      );
      const querySnapshot = await getDocs(albumRef);
      let tempAlbumes = [];

      querySnapshot.forEach((doc) => {
        tempAlbumes.push(doc.data());
      });
      let tempAlbumesOrder = [];
      console.log("totl de albumes", tempAlbumes.length - 1);
      for (let i = 0; i < tempAlbumes.length; i++) {
        let itemAlbum = [];
        if (i % 2 == 0) {
          itemAlbum.push(tempAlbumes[i]);
          if (i + 1 < tempAlbumes.length) {
            itemAlbum.push(tempAlbumes[i + 1]);
          }
          tempAlbumesOrder.push(itemAlbum);
        }

      }
      resfreshFn(tempAlbumesOrder)
    }

  }
  export const getSongsByAlbum = async (resfreshFn, itemAlbum) => {
    let idAlbum = itemAlbum.genre_name;
    let listIdsSongs = itemAlbum.songList;
    console.log("listIdsSongs", listIdsSongs);
    if (listIdsSongs) {
      getLikedSongById(resfreshFn, listIdsSongs);
    } else {
      const songsAlbumRef = collection(
        global.db_Firestore,
        "/songs"
      );
      console.log("nombre", idAlbum)
      const songsQuery = query(songsAlbumRef, where("genre_name", "==", idAlbum));

      const querySnapshot = await getDocs(songsQuery);
      let tempSongsAlbum = [];

      querySnapshot.forEach((doc) => {
        tempSongsAlbum.push(doc.data());
      });
      console.log("songsByAlbum", tempSongsAlbum)
      resfreshFn(tempSongsAlbum)
    }



  }
  export const lokForSongs = async (resfreshFn, title) => {
    const songsAlbumRef = collection(
      global.db_Firestore,
      "/songs"
    );

    const querySnapshot = await getDocs(songsAlbumRef);
    let tempSongsAlbum = [];
    if (title.length > 0) {
      querySnapshot.forEach((doc) => {
        let item = doc.data();
        const NOMBRE = item.song_name;
        const AUTOR = item.author;
        //console.log(NOMBRE,GENERO,AUTOR);
        if (item.id == "7uxRJlaFVdpPUmB63qQ2") {
          console.log("cancion encontrada", item)
        } else {
          console.log("cancion no encontrada")
        }


        if (NOMBRE.toLowerCase().includes(title.toLowerCase()) ||
          AUTOR.toLowerCase().includes(title.toLowerCase())) {
          tempSongsAlbum.push(doc.data());
        }
      });
      resfreshFn(tempSongsAlbum)
    } else {
      resfreshFn(null)
    }

    console.log("songsByAlbum", tempSongsAlbum);
  }
  export const getLikedSongById = async (resfreshFn, listMusicsId) => {
    const songsAlbumRef = collection(
      global.db_Firestore,
      "/songs"
    );
    let likedSongsOrder = [];

    let likedSongsAll = [];
    for (let i = 0; i < listMusicsId.length; i++) {
      likedSongsOrder.push(listMusicsId[i]);
      if (likedSongsOrder.length >= 10) {
        likedSongsAll.push(likedSongsOrder);
        likedSongsOrder = [];
      }
    }
    if (likedSongsOrder.length <= 10) {
      likedSongsAll.push(likedSongsOrder);
    }
    console.log("ordenados", likedSongsAll)
    let tempSongsAlbum = [];
    for (let i = 0; i < likedSongsAll.length; i++) {
      const songsLikeds = query(songsAlbumRef, where("id", "in", likedSongsAll[i]));
      const querySnapshot = await getDocs(songsLikeds);
      querySnapshot.forEach((doc) => {
        tempSongsAlbum.push(doc.data());
      });
    }
    resfreshFn(tempSongsAlbum)
    console.log("songsliked by id", tempSongsAlbum);
  }
  export const putLikedSong = async (likedSongId, loadLikedMusics) => {
    await setDoc(doc(global.db_Firestore, "favorite", " DP3XfsWz0llXfYtU8UUO", "songs", likedSongId), {
      id: likedSongId
    });
    loadLikedMusics()
    console.log("liked song put", likedSongId);
  }
  export const deleteLikedSong = async (likedSongId, loadLikedMusics) => {
    await deleteDoc(doc(global.db_Firestore, "favorite", " DP3XfsWz0llXfYtU8UUO", "songs", likedSongId));
    loadLikedMusics()
    console.log("deleted liked song", likedSongId);
  }

  export const handleSubmitPlayList = async (values) => {
    const docRef = await addDoc(collection(global.db_Firestore, "albums"), values);
    console.log("Document written with ID: ", docRef.id);
    const washingtonRef = doc(global.db_Firestore, "albums", docRef.id);
    await updateDoc(washingtonRef, {
      id: docRef.id
    });
  }
