import { AssemblyAI } from 'assemblyai';



document.addEventListener('DOMContentLoaded', function() {
  const audioFileInput = document.getElementById('audioFile');
  const audioControl = document.getElementById('audioControl');

  audioFileInput.addEventListener('change', function() {
    const file = this.files[0];
    const fileURL = URL.createObjectURL(file);
    audioControl.src = fileURL;
    audioControl.play();

    transcribeAudio(file); // Call function to transcribe audio
  });
});

const client = new AssemblyAI({
 apiKey: 'efb13838f2c647a8b1bfeda80b2baea2',
});

async function transcribeAudio(audioFile) {
 try {
   const transcript = await client.transcripts.create(audioFile);
   document.getElementById("generator").innerHTML = transcript.text;
   console.log('Error transcribing audio:');

 } catch (error) {
   console.error('Error transcribing audio:', error);
 }
}

document.addEventListener('DOMContentLoaded', function() {
  const audioFileInput = document.getElementById('audioFile');
  const audioControl = document.getElementById('audioControl');

  audioFileInput.addEventListener('change', function() {
    const file = this.files[0];
    const fileURL = URL.createObjectURL(file);
    audioControl.src = fileURL;
    audioControl.play();

    transcribeAudio(file); // Call function to transcribe audio
  });
});

async function transcribeAudio(audioFile) {
  try {
    const response = await fetch('https://api.assemblyai.com/v2/upload', {
      method: 'POST',
      headers: {
        'Authorization': 'efb13838f2c647a8b1bfeda80b2baea2'
      },
      body: audioFile
    });
    const data = await response.json();

    // Polling for the transcription result
    const jobId = data.id;
    let transcription = '';
    let status = '';

    while (status !== 'completed') {
      const jobResponse = await fetch(`https://api.assemblyai.com/v2/transcript/${jobId}`, {
        method: 'GET',
        headers: {
          'Authorization': 'efb13838f2c647a8b1bfeda80b2baea2'
        }
      });
      const jobData = await jobResponse.json();
      status = jobData.status;

      if (status === 'completed') {
        transcription = jobData.text;
        document.getElementById("generator").innerHTML = transcription;
      } else {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      }
    }
  } catch (error) {
    console.error('Error transcribing audio:', error);
  }
}
