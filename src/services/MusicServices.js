import { async } from "@firebase/util";
import { collection, getDocs, getDoc, query, where, doc, setDoc, deleteDoc, addDoc, updateDoc, limit } from "firebase/firestore";

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
  resfreshFn(tempMusics)
}
export const getPlayLists = async (resfreshFn, userOunerId) => {
  const songsAlbumRef = collection(
    global.db_Firestore,
    "/playList"
  );
  const songsQuery = query(songsAlbumRef, where("idUserOwn", "==", userOunerId));
  const querySnapshot = await getDocs(songsQuery);
  let tempAlbumes = [];

  querySnapshot.forEach((doc) => {
    tempAlbumes.push(doc.data());
  });
  let tempAlbumesOrder = [];
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

export const getAlbumes = async (resfreshFn, maxNumber) => {
  let tempAlbumes = [];

  const albumRef = collection(
    global.db_Firestore,
    "/albums"
  );
  const playListRef = collection(
    global.db_Firestore,
    "/playList"
  );
  const playListQuery = query(playListRef);
  const querySanpShotPlayList = await getDocs(playListQuery);
  querySanpShotPlayList.forEach((doc) => {
    let item = doc.data();
    if (item.state != undefined) {
      if(item.state == "PUBLIC"){
        tempAlbumes.push(item);
      }
    } 
  });
  maxNumber=maxNumber-tempAlbumes.length;
  const albumsQuery = query(albumRef, limit(maxNumber || 11));
  const querySnapshot = await getDocs(albumsQuery);



  querySnapshot.forEach((doc) => {
    let item = doc.data();
    if (item.state == undefined) {
      tempAlbumes.push(item);
    } else {
      if (item.state == "PUBLIC") {
        tempAlbumes.push(item);

      }
    }
  });
  

  let tempAlbumesOrder = [];
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
export const getSongsByAlbum = async (resfreshFn, itemAlbum) => {
  let idAlbum = itemAlbum.genre_name;
  let listIdsSongs = itemAlbum.songList;
  if (listIdsSongs) {
    getLikedSongById(resfreshFn, listIdsSongs);
  } else {
    const songsAlbumRef = collection(
      global.db_Firestore,
      "/songs"
    );
    const songsQuery = query(songsAlbumRef, where("genre_name", "==", idAlbum));

    const querySnapshot = await getDocs(songsQuery);
    let tempSongsAlbum = [];

    querySnapshot.forEach((doc) => {
      tempSongsAlbum.push(doc.data());
    });

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



      if (NOMBRE.toLowerCase().includes(title.toLowerCase()) ||
        AUTOR.toLowerCase().includes(title.toLowerCase())) {
        tempSongsAlbum.push(doc.data());
      }
    });
    resfreshFn(tempSongsAlbum)
  } else {
    resfreshFn(null)
  }


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
  if (likedSongsOrder.length > 0 && likedSongsOrder.length <= 10) {
    likedSongsAll.push(likedSongsOrder);
  }
  let tempSongsAlbum = [];
  for (let i = 0; i < likedSongsAll.length; i++) {
    const songsLikeds = query(songsAlbumRef, where("id", "in", likedSongsAll[i]));
    const querySnapshot = await getDocs(songsLikeds);
    querySnapshot.forEach((doc) => {
      tempSongsAlbum.push(doc.data());
    });
  }
  resfreshFn(tempSongsAlbum)
}
export const putLikedSong = async (likedSongId, loadLikedMusics) => {
  await setDoc(doc(global.db_Firestore, "favorite", global.user_id, "songs", likedSongId), {
    id: likedSongId
  });
  loadLikedMusics()
}
export const deleteLikedSong = async (likedSongId, loadLikedMusics) => {
  await deleteDoc(doc(global.db_Firestore, "favorite", global.user_id, "songs", likedSongId));
  loadLikedMusics()
}

export const handleSubmitPlayList = async (values, backToPlayList) => {
  const docRef = await addDoc(collection(global.db_Firestore, "playList"), values);
  const washingtonRef = doc(global.db_Firestore, "playList", docRef.id);
  await updateDoc(washingtonRef, {
    id: docRef.id
  });
  return docRef.id;
  //backToPlayList();
}


export const handleUpdatePlayList = async (values, backToPlayList) => {
  const washingtonRef = doc(global.db_Firestore, "playList", values.id);
  await updateDoc(washingtonRef, values);
  backToPlayList();
}
export const handleDeletePlayList = async (values, backToPlayList) => {
  for (let i = 0; i < values.length; i++) {
    await deleteDoc(doc(global.db_Firestore, "playList", values[i]));
  }
  backToPlayList();
}

export const handleUpdateStateAlbum = async (value, idAlbum) => {
  const washingtonRef = doc(global.db_Firestore, "playList", idAlbum);
  await updateDoc(washingtonRef, {
    state: value
  });
  //backToPlayList();
}