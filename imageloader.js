/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-20 11:49:45
 * @version $Id$
 */

// 从服务器端读取图片并获取数据
var ImageLoader = function(mw){
	this.maxEdge = mw || 640;
	this.result		= undefined;
	this.loadImage 	= function(imgsrc, cvs){
		var that = this;
		img  = new Image();
		img.onload = function(){
			that.result = RGBAImage.fromImage(img, cvs);
			that.result.render(cvs);
			$(document).trigger('imageloaded');
		}
		img.crossOrigin = 'anonymous';
		img.src = imgsrc;
	}
}