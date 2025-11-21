import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';

export default function ChannelsPage() {
  return (
    <div className="flex h-screen bg-surface-light">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto bg-white p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Channels</h1>
          <p className="text-neutral">47 opportunities across 12 channels</p>
          <div className="mt-8 text-center text-neutral">
            <p>Channels screen coming soon...</p>
          </div>
        </main>
      </div>
    </div>
  );
}
