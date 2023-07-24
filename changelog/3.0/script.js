const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 60;
const currentFrame = index => (
  `https://raw.githubusercontent.com/STForScratch/data/main/gif/themes-section/${index.toString().padStart(4, '0')}.png`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=770;
img.onload=function(){
    const canvasAspectRatio = canvas.width / canvas.height;
    const imageAspectRatio = img.width / img.height;
    let drawWidth, drawHeight, drawX, drawY;
  
    if (imageAspectRatio > canvasAspectRatio) {
      drawHeight = canvas.height;
      drawWidth = drawHeight * imageAspectRatio;
      drawX = (canvas.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = canvas.width;
      drawHeight = drawWidth / imageAspectRatio;
      drawX = 0;
      drawY = (canvas.height - drawHeight) / 2;
    }
  
    context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

const updateImage = index => {
  img.src = currentFrame(index);
  const canvasAspectRatio = canvas.width / canvas.height;
  const imageAspectRatio = img.width / img.height;
  let drawWidth, drawHeight, drawX, drawY;

  if (imageAspectRatio > canvasAspectRatio) {
    drawHeight = canvas.height;
    drawWidth = drawHeight * imageAspectRatio;
    drawX = (canvas.width - drawWidth) / 2;
    drawY = 0;
  } else {
    drawWidth = canvas.width;
    drawHeight = drawWidth / imageAspectRatio;
    drawX = 0;
    drawY = (canvas.height - drawHeight) / 2;
  }

  context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  // canvas.style.filter = `blur(${(1-(0.01075268817*frameIndex)).toString()}rem)`
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()