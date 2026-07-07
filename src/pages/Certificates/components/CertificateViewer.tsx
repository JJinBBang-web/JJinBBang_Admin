import { useState } from 'react';

type CertificateViewerProps = {
  imageUrl: string | null;
};

const ZOOM_STEP = 0.25;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;

const CertificateViewer = ({ imageUrl }: CertificateViewerProps) => {
  const [zoom, setZoom] = useState(1);

  const isPdf = imageUrl?.toLowerCase().endsWith('.pdf') ?? false;

  return (
    <div className="relative flex h-full flex-1 items-center justify-center overflow-hidden rounded-sm bg-[#1f2226]">
      {imageUrl ? (
        isPdf ? (
          <embed
            src={imageUrl}
            type="application/pdf"
            className="h-full w-full"
            style={{ transform: `scale(${zoom})` }}
          />
        ) : (
          <img
            src={imageUrl}
            alt="합격증"
            className="max-h-full max-w-full object-contain"
            style={{ transform: `scale(${zoom})` }}
          />
        )
      ) : (
        <div className="flex aspect-[497/663] h-full items-center justify-center rounded border border-dashed border-text-disabled bg-bg-muted text-[13px] text-text-muted">
          합격증 이미지 (플레이스홀더)
        </div>
      )}

      <div className="absolute bottom-4 flex gap-1.5 rounded-lg bg-white/95 p-1.5">
        <button
          type="button"
          onClick={() => setZoom((z) => Math.min(z + ZOOM_STEP, MAX_ZOOM))}
          aria-label="확대"
          className="flex size-8 items-center justify-center rounded-sm border border-border bg-white text-[15px] text-text-secondary hover:bg-bg-light"
        >
          ＋
        </button>
        <button
          type="button"
          onClick={() => setZoom((z) => Math.max(z - ZOOM_STEP, MIN_ZOOM))}
          aria-label="축소"
          className="flex size-8 items-center justify-center rounded-sm border border-border bg-white text-[15px] text-text-secondary hover:bg-bg-light"
        >
          －
        </button>
        <button
          type="button"
          onClick={() => setZoom(1)}
          aria-label="원래 크기로"
          className="flex size-8 items-center justify-center rounded-sm border border-border bg-white text-[15px] text-text-secondary hover:bg-bg-light"
        >
          ↻
        </button>
      </div>
    </div>
  );
};

export default CertificateViewer;
