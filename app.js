
const spawn = require('child_process').spawn;

let FilePath = 'https://doc-0g-04-docs.googleusercontent.com/docs/securesc/8inq19biv4kjd2gdsu8b3emct6qtsgua/k9nmv25f2hohqk4cfjkcdjl5bkd8slfd/1596949800000/04016729170826317503/04016729170826317503/19235ogENZ3cAFPsT0BfwcqD3xXvt-h2M?e=download&authuser=0&nonce=gqk6ghj6cel4o&user=04016729170826317503&hash=uj1tmsd1gobgnm4abfbh8k6frdp2pa3k';  // Your Video File you want To loop through.

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
