import React, { useState, useEffect } from "react";
import { Mic, StopCircle, Send, Trash } from "lucide-react";
import { Button } from "./ui/button";

const VoiceRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioURL, setAudioURL] = useState<string>("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(60); // 60 seconds countdown
  const [notification, setNotification] = useState<string>(""); // Notification message

  useEffect(() => {
    const initializeMediaRecorder = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event: BlobEvent) => {
          const url = URL.createObjectURL(event.data);
          setAudioURL(url);
          setAudioBlob(event.data);
        };

        setMediaRecorder(recorder);
      } catch (err) {
        console.error("Error accessing audio devices:", err);
        setNotification(
          "Error accessing audio devices. Please check your microphone settings."
        );
      }
    };

    initializeMediaRecorder();
  }, []);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setIsRecording(true);
      setRemainingTime(60);
      setNotification("Recording started...");

      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            stopRecording();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setTimeout(() => {
        stopRecording();
        clearInterval(timer);
      }, 60000);
    } else {
      setNotification(
        "Media recorder is not initialized. Please refresh the page."
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setNotification("Recording stopped.");
    }
  };

  const sendAudio = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.wav");

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          setNotification("Audio sent successfully!");
        } else {
          setNotification("Failed to send audio.");
        }
      } catch (error) {
        console.error("Error sending audio:", error);
        setNotification("Error sending audio.");
      }
    } else {
      setNotification("No audio to send.");
    }
  };

  const removeRecording = () => {
    setAudioURL("");
    setAudioBlob(null);
    setNotification("Recording removed. You can record a new audio.");
  };

  return (
    <div className="p-4 max-w-md mx-auto rounded-lg shadow-md flex flex-col gap-2 items-center justify-center">
      <h2 className="text-xl font-bold mb-4">Voice Recorder</h2>
      <div className="flex items-center border border-border rounded-md gap-2 p-1">
        <Button
          onClick={startRecording}
          disabled={isRecording}
          size="sm"
          className="flex items-center px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
          type="button"
        >
          <Mic className="mr-2" /> Start
        </Button>
        <Button
          size="sm"
          onClick={stopRecording}
          disabled={!isRecording}
          className="flex items-center px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:opacity-50"
          type="button"
        >
          <StopCircle className="mr-2" /> Stop
        </Button>
        <Button
          size="sm"
          onClick={sendAudio}
          disabled={!audioBlob}
          className="flex items-center px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 disabled:opacity-50"
          type="button"
        >
          <Send className="mr-2" /> Send
        </Button>
        <Button
          onClick={removeRecording}
          disabled={!audioBlob}
          size="sm"
          className="flex items-center px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600 disabled:opacity-50"
          type="button"
        >
          <Trash className="mr-2" /> Remove
        </Button>
      </div>
      {isRecording && (
        <div>
          <h3 className="text-lg">Remaining Time: {remainingTime} seconds</h3>
        </div>
      )}
      {audioURL && (
        <div className="mt-4">
          <h3 className="text-lg">Recorded Audio:</h3>
          <audio controls src={audioURL}></audio>
        </div>
      )}
      {notification && (
        <div className="mt-4 text-green-600">
          <strong>{notification}</strong>
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
