import { useAuth } from '../../authentication/hooks/useAuth';
import ProgressBar from '../components/ProgressBar';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-white flex flex-col gap-6">
      <div className="border-b border-zinc-800 pb-4">
        <h3 className="text-lg font-bold">Account Platform Profile Matrix</h3>
        <p className="text-xs text-zinc-400 mt-0.5">Control token processing parameters and check API resource usage limits.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-lg">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Identity Hook</span>
          <p className="text-sm font-medium mt-1 text-zinc-200">{user?.name || "Developer Sandbox"}</p>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">{user?.email || "sandbox@node.io"}</p>
        </div>
        <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-lg">
          <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Deployment Status</span>
          <p className="text-sm font-medium mt-1 text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Verified Sandbox Active
          </p>
        </div>
      </div>

      <div className="bg-zinc-950 p-5 border border-zinc-800 rounded-lg flex flex-col gap-4">
        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Free Tier Resource Token Tracking metrics</span>
        <ProgressBar progress={35} label="Compute Model Runtime Minutes (35/100 mins)" />
        <p className="text-[11px] text-zinc-400 leading-relaxed">Limits reset on standard 30-day computational batch windows. Upgrading keys will unlock infinite note synthesis routines.</p>
      </div>
    </div>
  );
}