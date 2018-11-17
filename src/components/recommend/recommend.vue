<template>
	<div class="recommend">
		<!--因为接下来会导包，滑动包，只能对子级的第一个节点有用-->
		<scroll class="recommend-content" :data="dissList">
			<div>
				<div class="slider-wrapper" v-if="recommonds.length">
					<slider :loop="true">  
						<!--loop=true代表无缝隙轮播-->
						<div v-for="item in recommonds">
							<a :href="item.linkUrl">
								<img :src="item.picUrl"/>
							</a>
						</div>
					</slider>
			
				</div>
				<div class="recommend-list">
					<h1 class="list-title">热门歌单推荐</h1>
					<ul>
						<li v-for="item in dissList" class="item">
							<div class="icon">
								<img v-lazy="item.imgurl" width="60" height="60"/>
							</div>
							<div class="text">
								 <h2 class="name" v-html="item.creator.name"></h2>
								 <p class="desc" v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="loading-container" v-show="!dissList.length">
                <loading></loading>
            </div>
		</scroll>
	</div>
</template>

<script>
	import {url,params,ERR_OK,callback} from "../../api/getRecomment"
	 import Slider from "../../base/slider/slider"
	 import axios from "axios";
	 import Scroll from "../../base/scroll/scroll"
	 import {url as dissListUrl} from "../../api/getDissList";
	 import Loading from "../../base/loading/loading"
	//{}对应的是getrecomment里面的对象
	export default{
		components:{
            Slider,
     		Scroll,
     		Loading
        },
		 data(){
            return {
               recommonds:[],
               dissList:[],
            }
        },
		methods:{
			getRecommends:function(){
				//获取轮播图的方法
				this.$http.jsonp(url,{
					params,
					"jsonp":callback,
				}).then((res)=>{
					
					if (res.body.code==ERR_OK) {
						this.recommonds=res.body.data.slider;
	//					console.log(res.body.data.slider);
	 					 this.getDissList();
					}
				});
			},
			getDissList:function(){
				 //获取分类歌单数据
				axios.get(dissListUrl).then((res)=>{
					if(res.data.code==ERR_OK){
	//					console.log(res.data.data.list)
					this.dissList=res.data.data.list
				}
				})
			}
		},
		created:function(){
			this.getRecommends();
			this.getDissList();
		

	}
}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"

    .recommend
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .recommend-content
            height: 100%
            overflow: hidden
            .slider-wrapper
                position: relative
                width: 100%
                overflow: hidden
            .recommend-list
                .list-title
                    height: 65px
                    line-height: 65px
                    text-align: center
                    font-size: $font-size-medium
                    color: $color-theme
                .item
                    display: flex
                    box-sizing: border-box
                    align-items: center
                    padding: 0 20px 20px 20px
                    .icon
                        flex: 0 0 60px
                        width: 60px
                        padding-right: 20px
                    .text
                        display: flex
                        flex-direction: column
                        justify-content: center
                        flex: 1
                        line-height: 20px
                        overflow: hidden
                        font-size: $font-size-medium
                        .name
                            margin-bottom: 10px
                            color: $color-text
                        .desc
                            color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>
