
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-cnoa-25ue.googlevideo.com/videoplayback?expire=1596229055&ei=XzEkX7XZKvOAjATtpbaACQ&ip=196.18.248.150&id=o-AK20iKmrKOOxb6Ao5qee6thxo5CisbDmyOaDQcRl3NGZ&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=7707.074&lmt=1567517500571737&fvip=3&fexp=23883098&c=WEB&txp=2216222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgUFmWkgEFcjQPTqUKlx8tq87setFIevIl06s0rEar3WQCIQCJthpgAAr_eaFGT8_FLSjF62mVUDHFlS4MCKjIwmmhUA%3D%3D&title=Live+ASMR+Amouranth+Stream+%E2%99%A5+use+headphones+%E2%99%A5+RELAXING&cms_redirect=yes&mh=pE&mip=117.197.70.81&mm=31&mn=sn-cnoa-25ue&ms=au&mt=1596207329&mv=m&mvi=3&pcm2cms=yes&pl=20&lsparams=mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRAIgB_Bx6bbWUxlcfAYHem7ir4NE_ui48aZ28ULjNnwcz58CIA2QzfHLI1zldZWoj_uJZJMRq1mRymg7FtBWo-MXyW5M';  // Your Video File you want To loop through.

let streamKey = 'KXiRdH';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://mobile.rheotv.com/live/${ streamKey }`]);
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
