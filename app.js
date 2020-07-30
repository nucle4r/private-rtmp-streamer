
const spawn = require('child_process').spawn;

let FilePath = 'https://r1---sn-cnoa-25ue.googlevideo.com/videoplayback?expire=1596115132&ei=XHQiX7KGF6WBlQTM8r6oAQ&ip=59.153.249.237&id=o-AGZnVHGdCpv9YmH7IGWwfpYI46xt65B9-azqzMTr7OIJ&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=1384.582&lmt=1580153129340580&fvip=1&fexp=23883098&beids=9466585&c=WEB&txp=5432432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAMSqjlk7ujnhXm366Vg4lZPNfDpXvtklrMRQ30_PibFwAiB3EwD1CPCbGqKPJFbFlqu8QU6WY7JYTTZpl3q0MGY26g%3D%3D&title=X%2BPlane%2B11%2B2020%2BMAX%2BRealism%2B%7C%2BUnited%2BAirlines%2B737-800%2Bfull%2Bflight%2Bto%2BLAX&cms_redirect=yes&mh=-T&mip=117.197.65.214&mm=31&mn=sn-cnoa-25ue&ms=au&mt=1596094286&mv=m&mvi=1&pl=20&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhANha7bv7Kuzlhz8f6AiYqV6fplGG51-hJVDopGQsDPsnAiApDWhpNGHnW4eItmV68C0MvccHZ9iFsvMOmD594adOXQ%3D%3D';  // Your Video File you want To loop through.

let streamKey = 'icevq1';

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
