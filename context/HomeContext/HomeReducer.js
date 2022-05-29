import { HOME_PAGE_USER, IS_PLAYING_SOUND, LOAD_AUDIO_PLAYER, LOAD_CURRENT_MUSIC, LOAD_CURRENT_PLAYLIST, LOAD_ISLIKE_SONG, PLAY_MUSIC_HOME } from "./HomeTypes";


export const HomeReducer=(state, action)=>{
    const {payload, type} = action;
    switch(type){
        case HOME_PAGE_USER:{
            return{
                ...state,
                pageStatus:payload
            }
        }
        case PLAY_MUSIC_HOME:{
            return{
                ...state,
                pageStatus:payload
            }
        }
        case LOAD_CURRENT_MUSIC:{
            return{
                ...state,
                currentMusic:payload
            }
        }
        case LOAD_AUDIO_PLAYER:{
            return{
                ...state,
                audioPlayer:payload
            }
        }
        case IS_PLAYING_SOUND:{
            return{
                ...state,
                isPlayingSound:payload
            }
        }
        case LOAD_CURRENT_PLAYLIST:{
            return{
                ...state,
                currentPlayList:payload
            }
        }
        case LOAD_ISLIKE_SONG:{
            return{
                ...state,
                likedSongsList:payload
            }
        }
    }
}