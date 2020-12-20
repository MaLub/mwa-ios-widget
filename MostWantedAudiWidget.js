// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: black; icon-glyph: user-md;

// just replace the url below with the url if the channel you want to use
// image channels only, doesnt supoort text or anything else
const channel = 'https://www.are.na/una/color-tx32pz_qsu0'

const url = 'https://api.are.na/v2/channels/'+channel.substring(channel.lastIndexOf('/') + 1)+'/contents';
const req = new Request(url)
const res = await req.loadJSON()
const randomBlock = await res.contents[Math.floor(Math.random() * res.contents.length)];
const id = randomBlock.id
const i = await new Request(randomBlock.image.square.url);
const img = await i.loadImage();

if (config.runsInWidget) {
  // create and show widget
  let widget = createWidget("Are.na random image", img)
  Script.setWidget(widget)
  Script.complete()
} else {
  Safari.open("https://are.na/block/"+id)
}


function createWidget(title, img) {
  let w = new ListWidget()
  w.backgroundColor = new Color("#1A1A1A")
  w.centerAlignContent()
  let image = w.addImage(img);
  image.centerAlignImage();
  image.imageSize = new Size(150,150)
  return w
}