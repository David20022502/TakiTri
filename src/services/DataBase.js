export const insertHistoryMusicDataBase = (id, user_id, id_history, currentDate) => {
  console.log("inicioando insertar database")
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "insert into history(id_history,user_id,music_id,date_created) values (?,?,?,?);",
      [id, user_id, id_history, currentDate],
      (e) => {
        console.log(
          "se ejecuta sentencia insert history OK : "
        );
      },
      (e) => {
        console.log("error al insertar tabla history");
      }
    );
  });
};
export const insertDataBaseChecker = (id, checker) => {
  console.log("inicioando insertar database checker")
  if (global.dbStatusChecker) {
    global.dbStatusChecker.transaction((tx) => {
      tx.executeSql(
        "insert into checker(id_checker,isFirstTime) values (?,?);",
        [id, checker],
        (e) => {
          console.log(
            "se ejecuta sentencia insert checker OK : "
          );
        },
        (e) => {
          console.log("error al insertar tabla checker");
        }
      );
    });
  }

};

export const createTableDatabase = () => {
  console.log("filling history");
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "create table if not exists history (id_history int not null,user_id text not null,music_id text not null,date_created text not null, PRIMARY KEY(id_history));",
      [],
      (e) => {
        console.log("Se ejecuta sentencia create table information OK");
      },
      (e) => {
        console.log("error al crear tabla information");
      }
    );
  });
};
export const createTableDatabaseChecker = async() => {
  console.log("filling checker");
  if (global.dbStatusChecker) {
    global.dbStatusChecker.transaction((tx) => {
      tx.executeSql(
        "create table if not exists checker (id_checker int not null,isFirstTime text not null,PRIMARY KEY(id_checker));",
        [],
        (e) => {
          console.log("Se ejecuta sentencia create table checker OK");
        },
        (e) => {
          console.log("error al crear tabla checker");
        }
      );
    });
  }

};

export const deleteFromDatabeMusic = (music_id, user_id) => {
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM history WHERE music_id=? and user_id=?",
      [music_id, user_id],
      (e) => {
        console.log("se elimino la cancción anterior para insertar nuevo");
      },
      (e) => {
        console.log("error al eliminar la cancción anterior para insertar nuevo ");
      }
    );
  });
};


export const getRecentPlayed = (userId, setData) => {
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "select * from history where user_id=?",
      [userId],
      (_, { rows: { _array } }) => {
        console.log("\n---------- ENTRA AL LLENAR DATOS----------",);

        if (_array != null && _array.length > 0) {
          setData(_array);
        } else {
          console.log("---------- ARREGLO VACIO -----------------")
        }
      },
      () => console.log("error error al consultar information")
    );
  });
}

export const getChecker = async(setData) => {
  console.log("entra a traer datos")
    global.dbStatusChecker.transaction((tx) => {
      tx.executeSql(
        "select * from checker ",
        [],
        (_, { rows: { _array } }) => {
          console.log("\n---------- ENTRA AL LLENAR DATOS----------",);

          if (_array != null && _array.length > 0) {
            setData(true);
          } else {
            setData(false);
            console.log("---------- ARREGLO VACIO -----------------")
          }
        },
        () => setData(false)
      );
    });
  

}

export const getMaxNumberDataBase = (setData, isPlayMusicPage) => {
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "SELECT MAX(id_history) as maxNumber FROM history",
      [],
      (_, { rows: { _array } }) => {
        console.log("\n---------- ENTRA AL LLENAR DATOS----------",);

        if (_array != null && _array.length > 0) {
          if (isPlayMusicPage) {
            setData(_array[0].maxNumber);
          } else {
            setData(_array);
          }

        } else {
          console.log("---------- ARREGLO VACIO -----------------")
        }
      },
      () => console.log("error error al consultar history")
    );
  });
}

export const deleteDataBase = () => {
  global.dbStatus.transaction((tx) => {
    tx.executeSql(
      "drop table history",
      [],
      () => {
        console.log("borra tabla history");
      },
      () => {
        console.log("error al borrar tabla");
      }
    );
  });
}