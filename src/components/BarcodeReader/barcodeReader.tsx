import { useEffect } from "react";
import Quagga from "@ericblade/quagga2";

interface BarcodeScannerProps {
  onDetected: (code: string) => void;
}

export function BarcodeScanner({ onDetected }: BarcodeScannerProps) {
  useEffect(() => {
    const handleDetected = (data: unknown) => {
      const result = data as { codeResult?: { code?: string | null } };
      const code = result?.codeResult?.code;
      if (code) {
        onDetected(code);
      }
    };

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: document.querySelector("#scanner") as HTMLElement,
          constraints: {
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader", "ean_8_reader", "code_128_reader"],
        },
      },
      (err) => {
        if (err) {
          console.error(err);
          return;
        }
        Quagga.start();
      },
    );

    Quagga.onDetected(handleDetected);

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, [onDetected]);

  return (
    <div
      id="scanner"
      className="h-full w-full overflow-hidden [&>canvas]:h-full [&>canvas]:w-full [&>video]:h-full [&>video]:w-full [&>video]:object-cover"
    />
  );
}

export default BarcodeScanner;
