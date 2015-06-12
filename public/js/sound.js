window.SOUND = {};

window.SOUND.Sound = function(source,volume,loop)
	{
	    this.source=source;
	    this.volume=volume;
	    this.loop=loop;
	    var son;
	    this.son=son;
	    this.finish=false;
	    this.stop=function()
	    {
	        document.body.removeChild(this.son);
	    }
	    this.start=function()
	    {
	        if(this.finish)return false;
	        this.son=document.createElement("embed");
	        this.son.setAttribute("src",this.source);
	        this.son.setAttribute("hidden","true");
	        this.son.setAttribute("volume",this.volume);
	        this.son.setAttribute("autostart","true");
	        this.son.setAttribute("loop",this.loop);
	        this.son.setAttribute("id",'sound');
	        document.body.appendChild(this.son);
	    }
	    this.remove=function()
	    {
	        document.body.removeChild(this.son);
	        this.finish=true;
	    }
	    this.init=function(volume,loop)
	    {
	        this.finish=false;
	        this.volume=volume;
	        this.loop=loop;
	    }
	}

window.SOUND.play =	function(text){
	$('#sound').remove();
	var foo = new window.SOUND.Sound('https://translate.google.ru/translate_tts?ie=UTF-8&q='+text+'&tl=en&total=1&idx=0&client=t&prev=input',100,false);
	foo.start();
	//foo.stop();
	//foo.remove();
}