export const singer = (state)=>{
    return state.singer;
};
//下面的都是简写
export const playing = state=>state.playing;
export const fullScreen = state=>state.fullScreen;
export const playList = state=>state.playList;
export const sequenceList = state=>state.sequenceList;
export const currentIndex = state=>state.currentIndex;
export const mode = state=>state.mode;
export const currentSong = state=>state.playList[state.currentIndex];


//export const singer = funtion(state){
//  return state.singer;
//};  最初写发