document.body.innerHTML += `<div id='element-bounds-screenshoter'>
</div>`

const screenshoter = document.getElementById('element-bounds-screenshoter');

function getCoordinates (el) {
    var
        found,
        left = 0,
        top = 0,
        width = 0,
        height = 0,
        offsetBase = getCoordinates.offsetBase;
    if (!offsetBase && document.body) {
        offsetBase = getCoordinates.offsetBase = document.createElement('div');
        offsetBase.style.cssText = 'position:absolute;left:0;top:0';
        document.body.appendChild(offsetBase);
    }
    if (el && el.ownerDocument === document && 'getBoundingClientRect' in el && offsetBase) {
        var boundingRect = el.getBoundingClientRect();
        var baseRect = offsetBase.getBoundingClientRect();
        found = true;
        left = boundingRect.left - baseRect.left;
        top = boundingRect.top - baseRect.top;
        width = boundingRect.right - boundingRect.left;
        height = boundingRect.bottom - boundingRect.top;
    }
    return {
        found: found,
        left: left,
        top: top,
        width: width,
        height: height,
        right: left + width,
        bottom: top + height
    };
}

function highlightBorder(e) {
 const el = e.target;

 const coordinates = getCoordinates(el);


 screenshoter.style.right = coordinates.right + "px";





 screenshoter.style.left = coordinates.left + "px";



 screenshoter.style.bottom = coordinates.bottom + "px";

 screenshoter.style.top = coordinates.top + "px";
 screenshoter.style.width = coordinates.width + "px";
 screenshoter.style.height = coordinates.height + "px";
}

document.addEventListener('mouseover', highlightBorder);

let canvas = null;

document.body.addEventListener('click', async function handleDownload (e) {
  const el = e.target;

  const dimensions = el.getBoundingClientRect();


  chrome.runtime.connect("nohakcbnnblokoibfhemaodnajcgefbm");
  chrome.runtime.sendMessage("nohakcbnnblokoibfhemaodnajcgefbm", "A random message", ({imgSrc}) => {
    if (!imgSrc) {
      return;
    }

    if (!canvas) {
        canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
    }
    var image = new Image();
    image.onload = function() {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        var context = canvas.getContext("2d");
        console.log(document, dimensions);
        context.drawImage(image,
            dimensions.left, dimensions.top,
            dimensions.width, dimensions.height,
            0, 0,
            dimensions.width,
            dimensions.height
        );
        var croppedDataUrl = canvas.toDataURL("image/png");
        var link = document.createElement("a");
        link.download = 'Screenshot';
        link.href = imgSrc;
        link.click();
    }
    image.src = imgSrc;
  });

  console.log(el);

});
