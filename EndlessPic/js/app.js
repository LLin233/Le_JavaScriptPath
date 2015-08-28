
window.onload = function() {

	imgLocation("container", "box");
	window.onscroll = function() {
		var fakeData = {
			"imgs": [{
				"src": "2.jpg"
			}, {
				"src": "3.jpg"
			}, {
				"src": "24.jpg"
			}, {
				"src": "4.jpg"
			}, {
				"src": "5.jpg"
			}, {
				"src": "6.jpg"
			}, {
				"src": "7.jpg"
			}]
		};
		if (checkFlag()) {
			for (var i = 0; i < fakeData.imgs.length; i++) {
				var iDiv = document.createElement('div');
				iDiv.className = "box";
				var subDiv = document.createElement('div');
				subDiv.className = "box_img";
				var elem = document.createElement("img");
				elem.src = "images/" + fakeData.imgs[i].src;
				subDiv.appendChild(elem);
				iDiv.appendChild(subDiv);
				container.appendChild(iDiv);
			}
			imgLocation("container", "box");
		}
	}
}

function checkFlag() {
	var oParent = document.getElementById('container');
	var cContent = getObjects(oParent, "box");
	var lastContentHight = cContent[cContent.length - 1].offsetTop;
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
	console.log(lastContentHight + ":" + scrollTop + ":" + pageHeight);
	if (lastContentHight < scrollTop + pageHeight) {
		return true;
	}



}

function imgLocation(parent, content) {
	var cParent = document.getElementById(parent); //parent : container
	var cContent = getObjects(cParent, content);
	var imgWidth = cContent[0].offsetWidth; //image width
	var imageNumLimit = Math.floor(document.documentElement.clientWidth / imgWidth);
	cParent.style.cssText = "width:" + imgWidth * imageNumLimit + "px; margin:0 auto";  //css style

	//TODO: fill the blank space
	//get height of all imgs in the first row
	var BoxHeightArray = [];
	for (var i = 0; i < cContent.length; i++) {
		var currentBoxHeight = cContent[i].offsetHeight;
		if (i < imageNumLimit) {
			BoxHeightArray[i] = currentBoxHeight;
		} else {
			var minHeight = Math.min.apply(null, BoxHeightArray);
			var minLocation = getMinHeightLocation(BoxHeightArray, minHeight);
			cContent[i].style.position = "absolute";
			cContent[i].style.top = minHeight + "px";
			cContent[i].style.left = cContent[minLocation].offsetLeft + "px";
			//fulfill the blank, add update the smallest height into height + next item's height
			BoxHeightArray[minLocation] += cContent[i].offsetHeight;
		}
	}
}

function getObjects(parent, className) {
	var allContent = parent.getElementsByTagName("*");
	var contentArray = [];
	for (var item in allContent) {
		if (allContent[item].className == className) {
			contentArray.push(allContent[item]);
		}
	}
	return contentArray;
}

function getMinHeightLocation(BoxHeightArray, minHeight) {
	for (var i in BoxHeightArray) {
		if (BoxHeightArray[i] == minHeight) {
			return i;
		}
	}
}