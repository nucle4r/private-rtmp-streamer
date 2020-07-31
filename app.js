
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-i3b7kn7d.googlevideo.com/videoplayback?expire=1596222479&ei=rhckX-WbOpu1lQTb97j4Dg&ip=115.88.201.46&id=o-AORg_Ep9VgiYp35zJ2vq63Q9BWdxTsvj6O6d9MbDYb0F&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=979.208&lmt=1542542671095604&fvip=3&fexp=23883098&c=WEB&txp=2201222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgU9j30PpY8LThXikWIfXgYFgssjaLi6Z-vMQFzq4L0aUCIQCq2g18EUC2ygxRWKUFlvfc54Xoqj4FbFJwHiUrNSzvew%3D%3D&contentlength=304503446&video_id=aL5oRsZGI4o&title=Pubg+Mobile+HD+Gameplay++-+No+Copyright+Gamepaly+%2860+FPS%29&rm=sn-ab02a0nfpgxapox-bh2lk7y,sn-ab02a0nfpgxapox-jwwe7z&req_id=f57ac669c511a3ee&ipbypass=yes&redirect_counter=2&cms_redirect=yes&mh=NH&mm=30&mn=sn-i3b7kn7d&ms=nxu&mt=1596211394&mv=m&mvi=3&pl=18&lsparams=ipbypass,mh,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhALmU1m9YlfVmAwFOUuR2xuTt4nhez7XYZHJUwig52oOHAiEA50Nht-tnsJFsySd1EcUQEJ8Wi9qEsDu7wL4BcUCBQas%3D';  // Your Video File you want To loop through.

let streamKey = 'q0CpFv';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://desktop.rheotv.com/live/${ streamKey }`]);
ffmpeg.on('exit', (statusCode) => {
  if (statusCode === 0) {
     console.log('Stream Completed')
  }
})

ffmpeg
  .stderr
  .on('data', (task) => {
    console.log('Task:', new String(task))
  })
