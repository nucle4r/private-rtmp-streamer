
const spawn = require('child_process').spawn;

let FilePath = 'https://r3---sn-h557snsl.googlevideo.com/videoplayback?expire=1596118643&ei=E4IiX_bxIZC1zLUP2cqF6Aw&ip=45.236.171.69&id=o-AIpnleKzhajPHeDvFCxguGJzrbvUYO8fjOcU071V2qns&itag=22&source=youtube&requiressl=yes&vprv=1&mime=video%2Fmp4&ratebypass=yes&dur=38864.886&lmt=1522477979534860&fvip=3&fexp=9466585,23883098&beids=9466585&c=WEB&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAMnMiJTtd1ISg5nH-sHUwjDihQo0MlcEWqaAPeGccuVoAiEA3Sd_64uald1Ml61QoHLFb7jtzKjDYAg1ceCRx6eRVY0%3D&contentlength=7509602135&video_id=WeW7iqwrdTo&title=FAR+CRY+5+%E2%80%93+Full+Game+-+Gameplay+Walkthrough+-+No+Commentary+%E3%80%901080p+HD%E3%80%91&rm=sn-pm2-btxe7s,sn-hp5dz7s&req_id=e5091cf59796a3ee&redirect_counter=3&cm2rm=sn-bvvbax-jj0e7s&cms_redirect=yes&ipbypass=yes&mh=un&mip=117.197.65.214&mm=30&mn=sn-h557snsl&ms=nxu&mt=1596096912&mv=m&mvi=3&pl=20&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgAIQU8Hnv1xhsRtpkqOZEbt-vNNSZ-UoX9ZSOkAcT3tQCIQDhRjt2yNLPvT2mNQ2v6-cueta_3XoaJg5LXqp58BwBzw%3D%3D';  // Your Video File you want To loop through.

let streamKey = 'uxCdHJ';

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
