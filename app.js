
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-npoe7n7y.googlevideo.com/videoplayback?expire=1596112517&ei=JWoiX7zXDs2mwgPu6aH4Cw&ip=183.89.150.134&id=o-ADH99k_1H4dEfF6iruSHxXu5qW7-L7QhD7b_LoJHi-eK&itag=248&aitags=133%2C134%2C135%2C136%2C137%2C160%2C242%2C243%2C244%2C247%2C248%2C278%2C298%2C299%2C302%2C303&source=youtube&requiressl=yes&vprv=1&mime=video%2Fwebm&gir=yes&clen=2938934093&dur=12996.733&lmt=1541808734656929&fvip=3&keepalive=yes&fexp=23883098&c=WEB&txp=5532432&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgKlc-8UNgFcP15UULnNOZCW7toL0n15th6D_k3RNRu7sCIQDjnHRGhoqKHdEYPfISvFIOmvm0gR897YzHEXL8g3Pflw%3D%3D&video_id=vpGxdRFmCmY&title=%E2%9C%88%EF%B8%8F+%5BX-Plane+11%5D+DUBAI+%28OMDB%29+-+LONDON+%28EGLL%29+-+EMIRATES+A330+FULL+FLIGHT&rm=sn-w5nuxa-c33ey7s&req_id=2080c178690ea3ee&redirect_counter=2&cm2rm=sn-30al67s&cms_redirect=yes&mh=zX&mip=117.197.71.149&mm=34&mn=sn-npoe7n7y&ms=ltu&mt=1596090799&mv=m&mvi=3&pl=20&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAOsvwq4QR3Sb2V5J6FtKRA7lWdfFX8QSNEOUUANLpBBgAiEAvbmdJbIgd6-1gi5-3USaYC2TJgwucRIpNaGYkQewjJw%3D';  // Your Video File you want To loop through.

let streamKey = 'lc9bFQ';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://desktop.rheotv.com/live/${ streamKey }`]);
ffmpeg.on('exit', (statusCode) => {
  if (statusCode === 0) {
     console.log('Stream Completed')
  }
})

ffmpeg
  .stderr
  .on('data', (err) => {
    console.log('err:', new String(err))
  })
