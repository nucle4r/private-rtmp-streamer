
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-cnoa-25ue.googlevideo.com/videoplayback?expire=1596229950&ei=3jQkX5v9LZbxigSh1LvgBg&ip=206.198.131.172&id=o-AEfDBT80nIfsD6HPcXEbOqXE-lR2ea5wNKd41jB_B-9h&itag=22&source=youtube&requiressl=yes&pcm2=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=7707.074&lmt=1567517500571737&fvip=3&fexp=23883098&c=WEB&txp=2216222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJGBqQXohyjFS5HKM1S6p9Oucsob5T253KoST_7KrkJwAiEAgpFdQH7OUcaRTXXQ1JWMskPb0vKuUJ4AhH-b8MmDwQ4%3D&contentlength=1406944529&video_id=iBL5zGp5ynU&title=Live+ASMR+Amouranth+Stream+%E2%99%A5+use+headphones+%E2%99%A5+RELAXING&redirect_counter=1&rm=sn-5uakd7s&req_id=411132f973f2a3ee&cms_redirect=yes&ipbypass=yes&mh=pE&mip=117.197.70.81&mm=31&mn=sn-cnoa-25ue&ms=au&mt=1596208236&mv=m&mvi=3&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAO8WVVUGbNEw3_t5rFFJNC3Wj6JXpJq7MtuiY9fwsP7qAiEA-hmdAS4sqVE7RJM8bkJXCMsO2byE_-4OQu1Z9ehEzx0%3D';  // Your Video File you want To loop through.

let streamKey = 'Zf7XjO';

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
