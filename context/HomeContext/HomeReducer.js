import { DELETE_SELECTED_ITEM_LIST, HOME_PAGE_USER, IS_LOADING_PAGE, IS_MODAL_ERROR_VISIBLE_PAGE, IS_ON_LONG_PRESS, IS_PLAYING_SOUND, IS_TO_UPDATE_PLAYLIST, LOAD_AUDIO_PLAYER, LOAD_CURRENT_ALBUM, LOAD_CURRENT_MUSIC, LOAD_CURRENT_PLAYLIST, LOAD_ISLIKE_SONG, MESSAGE_ERROR_MODAL, PLAY_MUSIC_HOME, PUSH_MUSIC_PLAYLIST_ADDED, PUSH_SELECTED_ITEM_LIST, UPDATE_ALBUM_STATE, UPDATE_MAX_NUMBER_DATABASE, UPDATE_PLAYED_MUSIC } from "./HomeTypes";


export const HomeReducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
        case HOME_PAGE_USER: {
            return {
                ...state,
                pageStatus: payload
            }
        }
        case PLAY_MUSIC_HOME: {
            return {
                ...state,
                pageStatus: payload
            }
        }
        case LOAD_CURRENT_MUSIC: {
            return {
                ...state,
                currentMusic: payload
            }
        }
        case LOAD_AUDIO_PLAYER: {
            return {
                ...state,
                audioPlayer: payload
            }
        }
        case IS_PLAYING_SOUND: {
            return {
                ...state,
                isPlayingSound: payload
            }
        }
        case LOAD_CURRENT_PLAYLIST: {
            return {
                ...state,
                currentPlayList: payload
            }
        }

        case LOAD_ISLIKE_SONG: {
            return {
                ...state,
                likedSongsList: payload
            }
        }
        case IS_ON_LONG_PRESS: {
            return {
                ...state,
                isOnLongPress: payload
            }
        }
        case PUSH_SELECTED_ITEM_LIST: {
            return {
                ...state,
                selectedList: payload
            }
        }
        case DELETE_SELECTED_ITEM_LIST: {
            return {
                ...state,
                selectedList: payload
            }
        }
        case IS_LOADING_PAGE: {
            return {
                ...state,
                isLoading: payload
            }
        }
        case IS_MODAL_ERROR_VISIBLE_PAGE: {
            return {
                ...state,
                isModalErrorVisible: payload
            }
        }
        case MESSAGE_ERROR_MODAL: {
            return {
                ...state,
                messageError: payload
            }
        }
        case PUSH_MUSIC_PLAYLIST_ADDED: {
            return {
                ...state,
                musicListPlayList: payload
            }
        }
        case IS_TO_UPDATE_PLAYLIST: {
            return {
                ...state,
                isToUpdatePlayList: payload
            }
        }
        case UPDATE_PLAYED_MUSIC: {
            return {
                ...state,
                musicListenedNow: payload
            }
        }
        case UPDATE_MAX_NUMBER_DATABASE: {
            return {
                ...state,
                maxNumberDataBase: payload
            }
        }
        case UPDATE_ALBUM_STATE: {
            return {
                ...state,
                isUpdatingStateAlbum: payload
            }
        }
        case LOAD_CURRENT_ALBUM: {
            return {
                ...state,
                albumAll: payload
            }
        }
            
    }
}