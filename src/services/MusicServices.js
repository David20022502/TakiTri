import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getMusics=async(resfreshFn)=>{
    const musicsRef = collection(
      global.db_Firestore,
        "/canciones"
      );
      const querySnapshot = await getDocs(musicsRef);
      let tempMusics=[];
      
      querySnapshot.forEach((doc) => {
        tempMusics.push(doc.data());
      });
    console.log("canciones",tempMusics)
    resfreshFn(tempMusics)
}
export const getAlbumes=async(resfreshFn)=>{
  const albumRef = collection(
    global.db_Firestore,
      "/albums"
    );
    const querySnapshot = await getDocs(albumRef);
    let tempAlbumes=[];
    
    querySnapshot.forEach((doc) => {
      tempAlbumes.push(doc.data());
    });
    let tempAlbumesOrder=[];
    console.log("totl de albumes",tempAlbumes.length-1);
    for(let i=0;i<tempAlbumes.length;i++){
      let itemAlbum=[];
      if(i%2==0){
        itemAlbum.push(tempAlbumes[i]);
        if(i+1<tempAlbumes.length){
          itemAlbum.push(tempAlbumes[i+1]);
        }
        tempAlbumesOrder.push(itemAlbum);
      }

    }
  resfreshFn(tempAlbumesOrder)
}
export const getSongsByAlbum=async(resfreshFn,idAlbum)=>{
  const songsAlbumRef = collection(
    global.db_Firestore,
      "/songs"
    );
    console.log("nombre",idAlbum)
    const songsQuery = query(songsAlbumRef, where("genre_name", "==", idAlbum));
  
    const querySnapshot = await getDocs(songsQuery);
    let tempSongsAlbum=[];
    
    querySnapshot.forEach((doc) => {
      tempSongsAlbum.push(doc.data());
    });
  console.log("songsByAlbum",tempSongsAlbum)
  resfreshFn(tempSongsAlbum)
}
export const lokForSongs=async(resfreshFn,title)=>{
  const songsAlbumRef = collection(
    global.db_Firestore,
      "/songs"
    );

    const querySnapshot = await getDocs(songsAlbumRef);
    let tempSongsAlbum=[];
    if(title.length>0){
      querySnapshot.forEach((doc) => {
        let item=doc.data();
        const NOMBRE = item.song_name;
        const AUTOR = item.author;
        //console.log(NOMBRE,GENERO,AUTOR);
        if (NOMBRE.toLowerCase().includes(title.toLowerCase()) ||
            AUTOR.toLowerCase().includes(title.toLowerCase()) ) {
              tempSongsAlbum.push(doc.data());
        }
      });
      resfreshFn(tempSongsAlbum)
    }else{
      resfreshFn(null)

    }
    
  console.log("songsByAlbum",tempSongsAlbum);
}

export const getAccoutsNumber = async (setTamanio,cedula) => {
  const accountRef = collection(
    global.dbCon,
    "Personas/" + cedula + "/Cuentas"
  );
  const accounts = query(accountRef, where("state", "==", "VIGENTE"));
  const querySnapshot = await getDocs(accounts);
  //console.log("-----------------------", accounts);
  let tmpArrayAccount = [];
  querySnapshot.forEach((doc) => {
    //    console.log(doc.id, " => ", doc.data());
    tmpArrayAccount.push(doc.id);
  });
  console.log(tmpArrayAccount.length);
  setTamanio(tmpArrayAccount.length);
  await aniadirNumCuentas(tmpArrayAccount.length,cedula);
};