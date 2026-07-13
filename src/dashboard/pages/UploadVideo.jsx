import { useVideo } from '../hooks/useVideo';
import UploadBox from '../components/UploadBox';

export default function UploadVideo({ setSubPage }) {
  const { addVideo } = useVideo();

  const handleUploadProcess = async (payload) => {
    await addVideo(payload);
    setSubPage('overview'); // Return user to feed to watch background indexing activity status
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold text-white">Ingest Stream Resource</h2>
        <p className="text-xs text-zinc-400 mt-1">Connect multi-platform source locations directly into the semantic processing network engines.</p>
      </div>
      <UploadBox onUploadSuccess={handleUploadProcess} />
    </div>
  );
}