


var app=new Vue({
	el:".wrap",
	data:{
		query:"",
		musicList:[],
		musicUrl:'',
		pictureId:'./imgs/cover.png',
		localHotComments:[],
		isPlaying:false,
		isShow:false,//遮罩层的显示状态
		mvUrl:'',//mv地址
		bg:'./imgs/bg.jpg'
		    
	},
	methods:{
		searchMusic:function(){//获取搜索到的歌单
			var that=this;
			axios.get("https://autumnfish.cn/search?keywords="+this.query)
			.then(function(response){
				console.log(response);
				that.musicList=response.data.result.songs;
				//console.log(response.data.result.songs);
			},function(err){})
		},
		playMusic:function(musicId){//获取歌曲链接
			//console.log(musicId);
			var that=this;
			axios.get("https://autumnfish.cn/song/url?id="+musicId)
			.then(function(response){
				//console.log(response.data.data[0].url);
				that.musicUrl=response.data.data[0].url;
			},function(err){})
		},
		changePicture:function(musicId){//获取封面
			var that=this;
			axios.get("https://autumnfish.cn/song/detail?ids="+musicId)
			.then(function(response){
				//console.log(response);
				that.pictureId=response.data.songs[0].al.picUrl;
			},function(err){})
		},
		getComment:function(musicId){//获取歌曲评论
			var that=this;
			axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicId)
			.then(function(response){
				// console.log(response.data.hotComments);
				that.localHotComments=response.data.hotComments;
			},function(err){})
		},
		play:function(){
			//console.log('play');//注意这里输出是字符串
			this.isPlaying=true;
		},
		pause:function(){
			//console.log('pause');
			this.isPlaying=false;
		},
		pauseAudio:function(){
			this.isPlaying=false;
			const audio=document.querySelector('audio');
			audio.pause();
		},
		playMv:function(mvId){
			var that=this;
			axios.get("https://autumnfish.cn/mv/url?id="+mvId)
			.then(function(response){
				// console.log(response.data.data.url);
				that.isShow=true;
				that.mvUrl=response.data.data.url;
			},function(err){})
		},
		//隐藏
		hide:function(){
			this.isShow=false;
			this.mvUrl='';
		},
		
	},
	watch:{//侦听器
			pictureId:function(val){
				this.bg=val;
			}
	}
	
})