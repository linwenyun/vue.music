class Song{
    constructor({id,mid,singer,name,album,duration,image,url}){
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }
}

function filterSinger(singer){
    let ret = [];
    if(!singer){
        return ""
    }
    singer.forEach((s)=>{
        ret.push(s.name)
    });
    return ret.join('-')
}
export default function createSong(musicData){
    return new Song({
        id:musicData.songid,
        mid:musicData.songmid,
        singer:filterSinger(musicData.singer),
        name:musicData.songname,
        album:musicData.albumname,
        duration:musicData.interval,
        image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url:"http://dl.stream.qqmusic.qq.com/C400002E3MtF0IAMMY.m4a?guid=2943806619&vkey=ACD733DEEA4DB52FE07AD3DC97D967CB8645DD3E5AC1839B78E72B4031E9CFDDFD2EAEB8BD3AE06A0AB1D506EE34CC76667B170FC0F485CE&uin=0&fromtag=38"
    })																		
}