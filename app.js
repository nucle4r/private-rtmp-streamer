
const spawn = require('child_process').spawn;

let FilePath = 'https://r2---sn-npoe7nek.googlevideo.com/videoplayback?expire=1596973416&ei=CI0vX6WSM4eBsfIPjLmesA4&ip=67.227.123.249&id=o-AIfihQXrWNXq69J65IjkvMVa0IOKefb48yl5xJyOET0v&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=596.265&lmt=1596951751206704&fvip=6&fexp=23883098&c=WEB&txp=6216222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAO0-Wb5Js2PGmly6k7x-Qo99uYKhUd2fLESguRhNmvUkAiEAgh5BsrVAl7SLaqSGHsVesF5-uEn34AEfmnnnyPeeYhw%3D&title=Live+NoComp+%7C+TestVideo+%7C+UNLISTED&cm2rm=sn-cnoa-25ue7l,sn-bvvbax-jj0e7d,sn-h55ek7l&req_id=f0260d243f4aa3ee&ipbypass=yes&redirect_counter=3&cms_redirect=yes&mh=Xx&mip=117.197.70.229&mm=34&mn=sn-npoe7nek&ms=ltu&mt=1596956119&mv=m&mvi=2&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIhALcfyE_yxPNTotUBWPo9zpLzvRfVtUEzn1zm4Tgp5sfwAiBhiMutPwZr_PCfMtQH-IOGdhxPf9n2O6SbefW5siCsDA%3D%3D';  // Your Video File you want To loop through.

let streamKey = 'rcmk-ww63-ve82-5v4r-5ehx';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://a.rtmp.youtube.com/live2/${ streamKey }`]);
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
