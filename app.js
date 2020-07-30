
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-npoeenee.googlevideo.com/videoplayback?expire=1596117344&ei=AH0iX8D6MMiY3LUP2desmA4&ip=110.78.147.76&id=o-AHaD45ippqt47lKL7AMeeZ2J2CvoXSa-LNSQ629P1Rn7&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=1578.306&lmt=1522616963814680&fvip=3&fexp=23883098&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgZ9r8ja9Wz6qER4toREs0tXdcEwXKv-l7WSzdhXhJQQECIQCxt5tsq-u1cDfWA6ibLhIzc-5AiVJ3rd1ZLDp_rm_qMQ%3D%3D&contentlength=480881488&video_id=_6Krn7OeRn8&title=Far+Cry+5+-+Open+World+Free+Roam+Gameplay+%28PC+HD%29+%5B1080p60FPS%5D&rm=sn-j5u-iqtl7e,sn-npolk7s&req_id=6e8e3bcca0dba3ee&cm2rm=sn-bvvbax-jj0e7s,sn-h55ek7s&ipbypass=yes&redirect_counter=4&cms_redirect=yes&mh=-n&mip=117.197.65.214&mm=34&mn=sn-npoeenee&ms=ltu&mt=1596095717&mv=m&mvi=3&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgeeGFVJWULAE3S3g3Ndy4ldvnES9KjuKD8nm5srE6P94CIDH9acezOYNifCfGCmeYeJqkg4vNFFKRwXuX1sW0ncLj';  // Your Video File you want To loop through.

let streamKey = 'qHsxQl';

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
