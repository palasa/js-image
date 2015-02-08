/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-20 10:54:22
 * @version $Id$
 */

function RGBAImage(w,h,data){
	this.type = 'RGBAImage';
	this.w = w;
	this.h = h;
	this.data = new Uint8Array(w*h*4);
	data && this.data.set(data);
}


RGBAImage.prototype.getPixel = function(x,y) {
	var idx= (y*this.w+x)*4;
	return new Color(
		this.data[idx+0],
		this.data[idx+1],
		this.data[idx+2],
		this.data[idx+3]
	);
};

// bilinear sample of image
RGBAImage.prototype.sample = function(x,y) {
	var w 	= this.w ,
		h 	= this.h,
		ty 	= Math.floor(y),
		dy	= Math.ceil(y),
		lx	= Math.floor(x),
		rx	= Math.ceil(x),
		fx 	= x-lx,
		fy	= y-ty;

	var c = this.getPixel(lx,ty).mul((1-fy)*(1-fx))
			.add(this.getPixel(lx,dy)).mul(fy*(1-fx))
			.add(this.getPixel(rx,ty)).mul((1-fy)*fx)
			.add(this.getPixel(rx,dy)).nul(fy*fx);
		c.clamp();
		return c;

}

RGBAImage.prototype.setPixel = function(x,y,c){
	var idx 		 = (y*this.w+x)*4;
	this.data[idx] 	 = c.r;
	this.data[idx+1] = c.g;
	this.data[idx+2] = c.b;
	this.data[idx+3] = c.a;
}


// 从传参的图像对象获得RGBA图像数据
// img 为一个 图像对象
// cvs 为一个 HTML canvas对象
RGBAImage.fromImage = function(img, cvs){
	var w			= img.width,
		h			= img.height;
	
	// 调整canvas的大小
	cvs.width		= w;
	cvs.height		= h;

	// 把图像渲染到canvas中去，通过这样的方式获得图片的数据
	var ctx			= cvs.getContext('2d');
	ctx.drawImage(img, 0, 0);
	var imgData		= ctx.getImageData(0,0,w,h),
		newImage	= new RGBAImage(w, h, imgData.data);
	imgData = null;

	// 清除canvas
	ctx.clearRect(0,0,w,h);
	return newImage;
}

// 从传入的canvas中读取 图像数据
RGBAImage.prototype.toImageData = function(ctx){
	var imgData = ctx.createImageData(this.w, this.h);
	imgData.data.set(this.data);
	return imgData;
}

// 把图片渲染到传入的canvas中去
RGBAImage.prototype.render = function(cvs){
	cvs.width = this.w;
	cvs.height =this.h;
	context.putImageData(this.toImageData(context), 0, 0);
}


// 映射
RGBAImage.prototype.map = function(f){
	// for (var y = 0; y < this.h; y++) {
	// 	for (var x = 0; x < this.w; x++) {
	// 		this.setPixel(x, y, f(this.getPixel(x,y)));
	// 	};
	// 	return this;
	// };
	var w = this.w, 
		h = this.h,
    	dst = new RGBAImage(w, h, this.data);
    	data = dst.data;
	for(var y = 0,idx= 0;y<this.h;++y) {
		for(var x=0;x<this.w;++x,idx+=4) {
            f( data, idx, w, h );
		}
	}
	return dst;
}
