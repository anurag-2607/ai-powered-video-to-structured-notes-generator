import { useState } from 'react';
import { VideoProvider } from '../context/VideoContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import EditorStudio from '../../ai/pages/EditorStudio';

// Import local sub-page layouts
import UploadVideo from './UploadVideo';
import MyNotes from './MyNotes';
import Profile from './Profile';
import VideoDetails from './VideoDetails';
import NotFound from './NotFound';
import { useVideo } from '../hooks/useVideo';

function DashboardContent({ setPage }) {
  const [subPage, setSubPage] = useState('overview');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [targetDeleteId, setTargetDeleteId] = useState(null);
  
  const { videos, loading, setCurrentVideo, removeVideo } = useVideo();

  const openDeletePrompt = (id) => {
    setTargetDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (targetDeleteId) {
      await removeVideo(targetDeleteId);
      setIsDeleteModalOpen(false);
      setTargetDeleteId(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-950 flex flex-col select-none">
      <Navbar setPage={setPage} currentSubPage={subPage} setSubPage={setSubPage} />
      
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto items-stretch">
        <Sidebar currentSubPage={subPage} setSubPage={setSubPage} />
        
        <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
          {loading ? (
            <Loading message="Fetching dashboard workspace metadata layers..." />
          ) : (
            <>
              {subPage === 'overview' && (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Media Streaming Workspace Base</h2>
                      <p className="text-xs text-zinc-400 mt-0.5">Manage source streams, access summary indexes, and verify operational execution status.</p>
                    </div>
                    <button onClick={() => setSubPage('upload')} className="hidden sm:block text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-md">
                      + Process Stream
                    </button>
                  </div>

                  {videos.length === 0 ? (
                    <div className="h-64 border border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center gap-3 text-zinc-500 text-sm">
                      No video assets currently registered to your operational cloud tables.
                      <button onClick={() => setSubPage('upload')} className="text-xs text-indigo-400 underline font-medium">Upload your first stream</button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {videos.map((video) => (
                        <VideoCard 
                          key={video.id} video={video} 
                          onSelect={(v) => { setCurrentVideo(v); setSubPage('video-details'); }}
                          onDelete={openDeletePrompt}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {subPage === 'upload' && <UploadVideo setSubPage={setSubPage} />}
              {subPage === 'notes' && <MyNotes setSubPage={setSubPage} />}
              {subPage === 'profile' && <Profile />}
              {subPage === 'video-details' && <VideoDetails setSubPage={setSubPage} />}
              {/* Added Interactive AI Workspace Routing */}
              {subPage === 'editor-studio' && <EditorStudio setSubPage={setSubPage} />}
              
              {/* Updated validation array below to include 'editor-studio' */}
              {!['overview', 'upload', 'notes', 'profile', 'video-details', 'editor-studio'].includes(subPage) && <NotFound setSubPage={setSubPage} />}
            </>
          )}
        </main>
      </div>

      {/* Confirmation Window Portals */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Confirm Resource Deletion">
        <p className="text-sm text-zinc-300 leading-relaxed">Are you sure you want to remove this resource file from your active profile databases? This completely flushes all synthesized text token notes. This action is irreversible.</p>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={() => setIsDeleteModalOpen(false)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors">Cancel</button>
          <button onClick={confirmDelete} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-500 text-white transition-colors">Flush File</button>
        </div>
      </Modal>
    </div>
  );
}

export default function Dashboard({ setPage }) {
  return (
    <VideoProvider>
      <DashboardContent setPage={setPage} />
    </VideoProvider>
  );
}