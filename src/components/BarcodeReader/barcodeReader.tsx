import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";
import type { IScannerControls } from "@zxing/browser";
import { NotFoundException } from "@zxing/library";

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    const codeReader = new BrowserMultiFormatReader();

    codeReader
      .decodeFromConstraints(
        {
          video: {
            facingMode: "environment",
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
        },
        videoRef.current,
        (result, error) => {
          if (result) {
            onDetected(result.getText());
          }
          if (error && !(error instanceof NotFoundException)) {
            console.error("Scanner error:", error);
          }
        },
      )
      .then((controls) => {
        controlsRef.current = controls;
      })
      .catch((err: unknown) => {
        console.error("Scanner init error:", err);
      });

    return () => {
      controlsRef.current?.stop();
    };
  }, [onDetected]);

  return <video ref={videoRef} className="h-full w-full object-cover" />;
}

export default BarcodeScanner;
