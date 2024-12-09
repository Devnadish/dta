import React, { useCallback, useEffect, useState } from "react";
import { Button } from "./ui/button";
import VoiceRecorder from "./VoiceRecorder";
import { Mic } from "lucide-react";

const MicrophonePermission: React.FC = () => {
  const [micPermission, setMicPermission] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(true); // Track if the component is mounted

  // Function to check current microphone permission status
  const checkCurrentPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop the stream
      if (isMounted) {
        setMicPermission("granted");
        setErrorMessage(null);
      }
    } catch (error) {
      if (isMounted) {
        setMicPermission("denied");
        setErrorMessage(
          "Microphone access denied. Please enable it in your browser settings."
        );
      }
    }
  }, [isMounted]);

  const handleRequestPermission = useCallback(async () => {
    console.log("Requesting microphone permission..."); // Debug log
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      if (isMounted) {
        console.log("Microphone permission granted."); // Debug log
        setMicPermission("granted");
        setErrorMessage(null); // Clear any previous error messages
      }
    } catch (error) {
      if (isMounted) {
        console.error("Error requesting microphone permission:", error);
        setMicPermission("denied");
        setErrorMessage(
          "Enable microphone access in your browser settings."
        );
      }
    }
  }, [isMounted]);

  useEffect(() => {
    checkCurrentPermission(); // Check permission status on mount
    return () => {
      setIsMounted(false); // Cleanup on unmount
    };
  }, [checkCurrentPermission]);

  return (
    <div>
      {micPermission === "denied" ? (
        <Button onClick={handleRequestPermission} type="button" className="rounded-full bg-yellowColor text-black hover:bg-green-600 hover:text-white">
          <Mic className="  h-4 w-4" />
        </Button>
      ) : (
        <VoiceRecorder />
      )}


      {errorMessage && <p className="text-red-500 text-xs">{errorMessage}</p>}
    </div>
  );
};

export default MicrophonePermission;
