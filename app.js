
const spawn = require('child_process').spawn;

let FilePath = 'https://r4---sn-npoeened.googlevideo.com/videoplayback?expire=1596230244&ei=BDYkX5PBMoaBwgTIv47ABQ&ip=45.235.100.30&id=o-AKqjbLTln30ggnciNlGk8xgXuUI53d6mLIc2VSxNzt5W&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=5861.227&lmt=1566896041396528&fvip=4&fexp=23883098&c=WEB&txp=2216222&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIgI2VkDMoTmrUcoMZxPfFrACSsYY19odl4zmdsIemhxsgCIQC_leQtPgtfXc-M0ahaH3dc3XTsU8VNV4IdWRa4t4Z16Q%3D%3D&contentlength=1310984199&video_id=f5SOWctSAO0&title=Live+ASMR+%E2%99%A5+use+Headphones+%E2%99%A5+NEW+Triggers+-+Amouranth+Full+Stream+8-26&rm=sn-jucj-0qps7s,sn-bg0kl7z&req_id=5236f5c62b75a3ee&cm2rm=sn-bvvbax-jj0e7z,sn-h55e67z&ipbypass=yes&redirect_counter=4&cms_redirect=yes&mh=ug&mip=117.197.70.81&mm=34&mn=sn-npoeened&ms=ltu&mt=1596208581&mv=m&mvi=4&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgS1nBUKWk3PQoVvEitsY0O3kqprVUT6ZpUdB2hCUce5kCIQCqRdxsG6bDQJd9EyIB2HgqKx3gUoV770ambdWu1eFHqw%3D%3D';  // Your Video File you want To loop through.

let streamKey = 'live_204874987_XdNlfcODGaVczBE3QMfQdzFsANBcFW';

//You Can Change the RTMP url as per your need. For Ex: YouTube, Twitch etc.
 
let ffmpeg = spawn('ffmpeg', ['-re', '-stream_loop', '-1', '-i', `${ FilePath }`, '-c:v', 'libx264', '-preset', 'veryfast',
                   '-framerate', '60', '-maxrate', '3000k', '-bufsize', '6000k', '-pix_fmt', 'yuv420p', '-g', '50', '-c:a', 'aac', '-b:a', '128k',
                   '-ac', '2', '-ar', '44100', '-f', 'flv', `rtmp://live-sin.twitch.tv/app/${ streamKey }`]);
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
