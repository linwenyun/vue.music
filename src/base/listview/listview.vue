<template>
<scroll class="listview" :listenScroll="listenScroll" :probeType="probeType"  @scroll="scroll"  ref="listview">
	<ul>
		<li v-for="group in list" class="list-group" ref="listGroup">
			<h2 class="list-group-title">{{group.title}}</h2>
			<ul>
                    <li v-for="item in group.items" class="list-group-item"  @click="selectItem(item)">
                        <img v-lazy="item.avatar" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
            </ul>
		</li>
	</ul>
	<div class="list-shortcut"  @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
		<!--touchmove.stop.prevent是阻止冒泡和默认时间，h5学的触摸事件-->
           <ul>
           		<li v-for="(item,index) in shortcutList"  :class="['item',{'current':index==currentIndex}]" :data-index="index">
           			<!--:data-index="index"表示加一个自定义属性  加：表示变量   ！-->
           			{{item}}
           		</li>
           </ul>
    </div>
    <div class="list-fixed" ref="fixed">
            <h1 class="fixed-title">
                {{fixedTitle}}
            </h1>
    </div>
</scroll>
</template>

<script>
	 import Scroll from "../scroll/scroll"
	  const TITLE_HEIGHT = 30;
  	  const ANCHOR_HEIGHT = 18;//是li块的大小，下面要用
	export default{
		 data(){
            return {
              scrollY:0,
              currentIndex:0,
              diff:0,
            }
        },
		props:{
            list:{
                type:Array,
                default:function(){
                    return []
                }
            }
        },
        components:{
            Scroll
        },
        methods:{
        	scroll(pos){
        		this.scrollY=pos.y;
        	},
        	_calcutateHeight(){//计算每个li的长度，好分组（分为热，a,b,c...）
        		this.listHeight=[];//注意了，这个是数组！代表绑定到this上
        		const list=this.$refs.listGroup;
        		let height=0;//初始高度
        		this.listHeight.push(height);//第一个开始(也就是热组开始)
        		for (var i=0;i<list.length;i++) {
        			var item=list[i];
        			height+=item.clientHeight;
        			this.listHeight.push(height);
        		}
//      		console.log(this.listHeight)
        	},
        	onShortcutTouchStart(e){
        		let anchorIndex = e.target.getAttribute('data-index');
//      		console.log(anchorIndex)
        		this.touch.y1=e.touches[0].pageY;  //touch是在created上绑定在this上的 
        		//y1表示开始点
        		  this.touch.anchorIndex = anchorIndex;//上步的索引
        		this._scrollTo(anchorIndex);
        	},
        	onShortcutTouchMove(e){
        		this.touch.y2=e.touches[0].pageY;  //touch是在created上绑定在this上的 
        		//y1表示结束点
        		let delta=Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT);
        		//向下取整
        		 let anchorIndex = +this.touch.anchorIndex+delta;//下一步的索引
//      		 console.log(anchorIndex)
				this._scrollTo(anchorIndex);
        	},
        	 _scrollTo(index){
                if(!index&&index!=0){
                    return;
                }
                //边界检测
                if(index<0){
                    index = 0;
                }else if(index>this.listHeight.length-2){
                    index = this.listHeight.length-2;
                }
                //传入分组索引，调到响应分组
                this.currentIndex = index;
                this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);//scrollToElement分装在scroll组件上
            },
            selectItem(singer){
            	this.$emit('select',singer)
//          	把参数带给父级
            }
        },
        computed:{
        	shortcutList(){
        		 return  this.list.map((group)=>{//map代表是遍历，（group）表示数组里面每一项
                    return group.title.substr(0,1)
                })
        	},
        	fixedTitle(){
        		 if(this.scrollY>0){
                    return ''
                }
        		 return this.list[this.currentIndex]?this.list[this.currentIndex].title:""
        	}
        },
        created(){
        	this.probeType=3;
        	this.listenScroll=true;
        	this.touch={}
        },
        watch:{//观色、、比如下面的list   list是传过来的值！会变，所以当值变的时候会调用一次，scrlooY也是
        	list(){
        		this.$nextTick(()=>{
        			this._calcutateHeight()
        		})
        	},
        	scrollY(newY){ //（newy）里面的newY就是变化的值
        		//检测当前滑动的距离,根据滑动的距离来计算出index
                const listHeight = this.listHeight;//24(0-+23)
                //当滚动到上部，newY>0
                if(newY>0){
                    this.currentIndex = 0;
                    return;
                }
                //在中间滚动
                for(let i=0;i<listHeight.length-1;i++){
                    let startHeight = listHeight[i];
                    let endHeight = listHeight[i+1];
                    if(-newY>=startHeight&&-newY<endHeight){
                        this.currentIndex = i;
                        //diff：下一个分组距离顶部的距离
                        this.diff = endHeight+newY;
                        return;
                    }
                }
                //当滚动到底部，-newY肯定大于最后一个元素的上限
                this.currentIndex = listHeight.length-2;
        		
        	},
        	  diff(newVal){
                //观测下一个分组距离顶部的距离
                let fixTop = (newVal>0&&newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:0;
                if(fixTop==this.fixTop){
                    return;
                }
                this.fixTop = fixTop;
                this.$refs.fixed.style.transform=`translate3d(0,${fixTop}px,0)`;
                this.$refs.fixed.style.webkitTransform=`translate3d(0,${fixTop}px,0)`;
            }
        },
        mounted(){
        	this._calcutateHeight()
        }
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>
