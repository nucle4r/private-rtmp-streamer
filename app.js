
const spawn = require('child_process').spawn;

let FilePath = 'https://r2---sn-h557snsl.googlevideo.com/videoplayback?expire=1596209333&ei=VeQjX56pMorHhwarzZyAAQ&ip=216.151.180.220&id=o-AHjD6wusN-UyrKuGEOYelxTwxHG2CSoP4IUKwHvZkNsY&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=18430.839&lmt=1586251205646738&fvip=2&fexp=23883098&c=WEB&txp=5535432&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhALN9WnRQD36jVZTiEiXXudJL5zmaK5nOT0urOhYxmzt9AiAvL21OJIMOtpentF7zLk1wsI1Ye-4kor9tDVvQQnKEfw%3D%3D&title=RESIDENT+EVIL+3+REMAKE+Gameplay+Walkthrough+Part+1+FULL+GAME+%5B1080p+HD+60FPS+PC%5D+-+No+Commentary&cm2rm=sn-cnoa-25ue7l,sn-bvvbax-jj0e7k&req_id=76b4cf089dd5a3ee&redirect_counter=2&cms_redirect=yes&ipbypass=yes&mh=CE&mip=117.197.65.168&mm=30&mn=sn-h557snsl&ms=nxu&mt=1596187632&mv=m&mvi=2&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgbh-XS6-QxrrAtXf2Fq__WgODesSUAGpFZL1sLpu3hI8CIQCGdf16fSjcm4MoWwTgKai2qefaAOPKksGKDi39-H-n9w%3D%3D';  // Your Video File you want To loop through.

let streamKey = 'D8k3dR';

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
