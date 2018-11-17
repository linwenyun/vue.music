<template>
	<transition name="slide">
		
			<music-list :songs="songs" :title="title" :bg-image="bgimage"></music-list>
		
	</transition>
</template>

<script>
	  import MusicList from "../music-list/music-list"
	  import {url,params,ERR_OK,callback} from "../../api/getSingerDetail";
	   import {mapGetters} from "vuex"
	   import createSong from "../../common/js/song"
	  export default {
	  	data(){
	  		 return {
                songs:[]
            }
	  	},
	  	 components:{
            MusicList
        },
        methods:{
        	getDetail(){
        		
        		if(!this.singer.id){
        			this.$router.push('/singer');
        			return;
        		}
//      		console.log(this.$route.params.id)
//				var singermid=this.$route.params.id //拿到歌手的id    
	//			过不打算这种方法，用另一种方法拿到id(就是那种vuex的复杂方法)
				var singermid=this.singer.id
	        	this.$http.jsonp(url,{
	        		params:{...params,singermid},  //es6新语法，拼接
	        		'jsonp':callback
	        	}).then((res)=>{
	        		if(res.body.code==ERR_OK){
//	        			console.log(res.body.data.list)
						this.songs=this._normalizeSongs(res.body.data.list);
					
						
	        		}
	        	})
        	},
        	_normalizeSongs(list){
                let ret = [];
                list.forEach((item)=>{
                    let {musicData} = item;
                    if(musicData.songmid&&musicData.albummid){
                        ret.push(createSong(musicData))
                    }
                })
                return ret;
                
            }
        },
        created(){
        	this.getDetail();
        },
        computed:{
        	title:function(){
        		//歌手的名字
        		return this.singer.name;
        	},
        	bgimage:function(){
        		//歌手的图片
        		return this.singer.avatar;
        	},
        	...mapGetters(['singer'])
        }
	  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>
