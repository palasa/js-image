/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-12-20 10:54:22
 * @version $Id$
 */


// 移除单种颜色的越界操作
function clamp(orginal, floor, ceil){
	if (orginal<floor) {
		orginal = floor
	}else if(orginal>ceil){
		orginal = ceil;
	}
	return orginal;
}





