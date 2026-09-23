import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Shuffle, Repeat,
  Search, Radio, Shield, Terminal, Download, FileText, CheckCircle2,
  ExternalLink, Sparkles, Music2, Mic2, Layers, Cpu, Smartphone,
  Info, Heart, ListMusic, Globe, Zap, Disc3
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  coverUrl: string;
  audioUrl: string;
  lyrics: { time: number; text: string }[];
}

const SAMPLE_TRACKS: Track[] = [
  {
    id: 'echo-1',
    title: 'Midnight Resonance',
    artist: 'Akash & The Echo Project',
    album: 'Echoes of Tomorrow (Vol. 1)',
    duration: 184,
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    lyrics: [
      { time: 0, text: '♪ (Acoustic Echo Prelude) ♪' },
      { time: 10, text: 'Fading echoes in the evening sky' },
      { time: 24, text: 'Chasing frequencies passing by' },
      { time: 38, text: 'Soundwaves ripple through the neon light' },
      { time: 52, text: 'Lost in the rhythm of the endless night' },
      { time: 70, text: 'Every vibration tells a brand new tale' },
      { time: 88, text: 'Under the starlight, we prevail' },
      { time: 110, text: '♪ (Harmonic Synth Breakdown) ♪' },
      { time: 140, text: 'ECHO carries our melody home' },
      { time: 165, text: 'Never again will we walk alone' }
    ]
  },
  {
    id: 'echo-2',
    title: 'Solar Wave Drift',
    artist: 'YouTube Music Session',
    album: 'Algorithmic Smart Radio',
    duration: 162,
    coverUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=watr-fluid-10149.mp3',
    lyrics: [
      { time: 0, text: '♪ (Ambient Stream Begins) ♪' },
      { time: 15, text: 'Drifting beyond the solar flare' },
      { time: 30, text: 'Electric pulses fill the air' },
      { time: 48, text: 'Streaming infinite without a bound' },
      { time: 65, text: 'In the pure clarity of open sound' },
      { time: 90, text: '♪ (Deep Bassline Horizon) ♪' },
      { time: 120, text: 'ECHO resonance reaches peak' }
    ]
  },
  {
    id: 'echo-3',
    title: 'Cybernetic Horizon',
    artist: 'Echoes & Synthetics',
    album: 'Native Lossless Suite',
    duration: 210,
    coverUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&auto=format&fit=crop&q=80',
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f77395.mp3?filename=lofi-chill-medium-version-159456.mp3',
    lyrics: [
      { time: 0, text: '♪ (Sub-bass Initialization) ♪' },
      { time: 20, text: 'Binary thoughts in an analog mind' },
      { time: 40, text: 'Leaving encrypted tracks behind' },
      { time: 60, text: 'Last.fm scrobble locked in time' },
      { time: 85, text: 'Harmonious code, bit-perfect rhyme' },
      { time: 130, text: 'ECHO - The sound of liberty' }
    ]
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'player' | 'scrobbler' | 'android' | 'docs'>('player');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showLyrics, setShowLyrics] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrobbleCount, setScrobbleCount] = useState(1420);
  const [scrobbleStatus, setScrobbleStatus] = useState<'Active' | 'Synced'>('Active');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showApkModal, setShowApkModal] = useState(false);
  const [showGithubModal, setShowGithubModal] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = SAMPLE_TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % SAMPLE_TRACKS.length);
    setScrobbleCount((c) => c + 1);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + SAMPLE_TRACKS.length) % SAMPLE_TRACKS.length);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || track.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentLyricIndex = track.lyrics.findIndex((l, i) => {
    const next = track.lyrics[i + 1];
    return currentTime >= l.time && (!next || currentTime < next.time);
  });

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />

      {/* Top Navbar */}
      <header className="border-b border-blue-950/60 bg-[#0a1020]/90 backdrop-blur sticky top-0 z-50 px-4 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 p-[2px] shadow-lg shadow-blue-500/20">
            <img src="/echo_logo.svg" alt="ECHO Logo" className="w-full h-full rounded-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                ECHO
              </span>
              <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                v4.2.0 Open Source
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium flex items-center gap-1">
              <span>Made by Akash</span>
              <span className="text-blue-500">•</span>
              <span className="text-slate-500">Android Music & Scrobbler</span>
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-[#11182c] p-1 rounded-xl border border-blue-900/40">
          <button
            onClick={() => setActiveTab('player')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'player'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Music2 className="w-4 h-4" />
            <span>Player & Stream</span>
          </button>
          <button
            onClick={() => setActiveTab('scrobbler')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'scrobbler'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Radio className="w-4 h-4 text-rose-400" />
            <span>Last.fm Scrobbler</span>
          </button>
          <button
            onClick={() => setActiveTab('android')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'android'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <Smartphone className="w-4 h-4 text-emerald-400" />
            <span>Android Project</span>
          </button>
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'docs'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            <span>Docs & Install</span>
          </button>
        </nav>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowApkModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/30 transition-all active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download APK / Project</span>
          </button>
          <button
            onClick={() => setShowAboutModal(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-950/60 border border-blue-800/50 text-blue-300 hover:bg-blue-900/50 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>About</span>
          </button>
          <button
            onClick={() => setShowGithubModal(true)}
            className="hidden md:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
            <span>GitHub</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="md:hidden flex border-b border-blue-950/80 bg-[#0e1528] px-2 py-1.5 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('player')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'player' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Player
        </button>
        <button
          onClick={() => setActiveTab('scrobbler')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'scrobbler' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Last.fm Scrobbler
        </button>
        <button
          onClick={() => setActiveTab('android')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'android' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Android Source
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${
            activeTab === 'docs' ? 'bg-blue-600 text-white' : 'text-slate-400'
          }`}
        >
          Docs
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-6 pb-28">
        {/* TAB 1: PLAYER & STREAM */}
        {activeTab === 'player' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Player & Search */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search YouTube Music (tracks, artists, playlists, albums)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-[#11192e] border border-blue-900/50 rounded-2xl text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white shadow-inner"
                />
                <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-md">
                  YouTube Music
                </span>
              </div>

              {/* Now Playing Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-[#131c38] to-[#0c1326] border border-blue-900/50 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-col sm:flex-row gap-6 items-center">
                  <div className="relative group w-44 h-44 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border border-blue-500/20">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600/90 text-white backdrop-blur">
                      Lossless Audio
                    </span>
                  </div>

                  <div className="flex-1 w-full text-center sm:text-left flex flex-col justify-center">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="text-xs font-semibold tracking-wider uppercase text-blue-400">
                        {track.album}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug line-clamp-1">
                      {track.title}
                    </h2>
                    <p className="text-base text-slate-300 font-medium mt-1">
                      {track.artist}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300">
                        <Radio className="w-3 h-3" />
                        Scrobbling to Last.fm
                      </span>
                      <span className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
                        <Disc3 className="w-3 h-3 animate-spin" />
                        YouTube Music Opus
                      </span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar & Timestamps */}
                <div className="mt-6 space-y-1.5">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400"
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration || track.duration)}</span>
                  </div>
                </div>

                {/* Main Player Controls */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 text-slate-400 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-5 h-5 text-rose-400" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        setVolume(parseFloat(e.target.value));
                        setIsMuted(false);
                      }}
                      className="w-20 sm:w-24 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-blue-900/30 transition-all"
                      title="Previous Track"
                    >
                      <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 fill-current" />
                      ) : (
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={handleNext}
                      className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-blue-900/30 transition-all"
                      title="Next Track"
                    >
                      <SkipForward className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowLyrics(!showLyrics)}
                      className={`p-2 rounded-lg transition-colors ${
                        showLyrics
                          ? 'bg-blue-600/30 text-blue-400 border border-blue-500/40'
                          : 'text-slate-400 hover:text-white'
                      }`}
                      title="Toggle Synced Lyrics"
                    >
                      <Mic2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Up Next Queue */}
              <div className="p-5 rounded-2xl bg-[#0f172a]/90 border border-blue-900/40">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-slate-200 flex items-center gap-2">
                    <ListMusic className="w-4 h-4 text-blue-400" />
                    Playback Queue
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {SAMPLE_TRACKS.length} Tracks Ready
                  </span>
                </div>
                <div className="divide-y divide-slate-800/60">
                  {SAMPLE_TRACKS.map((t, idx) => {
                    const isSelected = idx === currentTrackIndex;
                    return (
                      <div
                        key={t.id}
                        onClick={() => {
                          setCurrentTrackIndex(idx);
                          setIsPlaying(true);
                        }}
                        className={`py-2.5 px-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-blue-600/20 border border-blue-500/30'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={t.coverUrl}
                            alt={t.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className={`text-sm font-semibold ${isSelected ? 'text-blue-300' : 'text-slate-200'}`}>
                              {t.title}
                            </p>
                            <p className="text-xs text-slate-400">{t.artist}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-slate-400">
                          {formatTime(t.duration)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Real-time Lyrics & Sound Engine Info */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Synchronized Lyrics Card */}
              <div className="p-6 rounded-3xl bg-[#10182e] border border-blue-900/50 flex flex-col h-[380px] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-blue-950">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <h3 className="font-bold text-sm text-white">Live Synced Karaoke Lyrics</h3>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                    LRCLIB Engine
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto py-6 space-y-5 text-center flex flex-col justify-center">
                  {track.lyrics.map((l, index) => {
                    const isCurrent = index === currentLyricIndex;
                    return (
                      <p
                        key={index}
                        className={`transition-all duration-300 cursor-pointer ${
                          isCurrent
                            ? 'text-xl font-bold text-white scale-105 py-1 text-blue-300 drop-shadow-[0_2px_12px_rgba(59,130,246,0.6)]'
                            : 'text-sm font-medium text-slate-500 hover:text-slate-400'
                        }`}
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime = l.time;
                            setCurrentTime(l.time);
                          }
                        }}
                      >
                        {l.text}
                      </p>
                    );
                  })}
                </div>
                <div className="pt-2 border-t border-blue-950/60 text-center text-xs text-slate-400">
                  Tap any lyric line to jump playback
                </div>
              </div>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-[#0f172a] border border-blue-900/30 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center font-bold">
                    YT
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">YouTube Music Client</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero ads, uninterrupted background streaming, high-efficiency Opus audio.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0f172a] border border-blue-900/30 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                    FM
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">Last.fm Scrobbler</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Automatic background tracking across all media sessions with zero battery drain.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0f172a] border border-blue-900/30 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">C++ Native Secrets</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    XOR fragmented encryption keys via JNI bridge to protect API credentials.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0f172a] border border-blue-900/30 flex flex-col gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-200">Made by Akash</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Clean open-source architecture ready to publish directly to GitHub.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LAST.FM SCROBBLER */}
        {activeTab === 'scrobbler' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#171526] via-[#111a36] to-[#0c142c] border border-blue-900/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-500 shadow-lg">
                  <Radio className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-black text-white">Universal Last.fm Scrobbler</h2>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      {scrobbleStatus}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mt-1">
                    Continuous listening history, smart taste radios & scrobble synchronization
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setScrobbleCount((c) => c + 1);
                    setScrobbleStatus('Synced');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
                >
                  Force Scrobble Sync
                </button>
              </div>
            </div>

            {/* Scrobbler Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-[#0f172a] border border-blue-950 flex flex-col">
                <span className="text-xs uppercase font-bold text-slate-400">Total Scrobbles</span>
                <span className="text-3xl font-extrabold text-blue-400 mt-2 font-mono">
                  {scrobbleCount.toLocaleString()}
                </span>
                <span className="text-xs text-slate-500 mt-1">+12 scrobbled today</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0f172a] border border-blue-950 flex flex-col">
                <span className="text-xs uppercase font-bold text-slate-400">Audio Client</span>
                <span className="text-xl font-bold text-white mt-2 flex items-center gap-1.5">
                  <Disc3 className="w-5 h-5 text-red-500" /> YouTube Music
                </span>
                <span className="text-xs text-slate-500 mt-1">Opus high bitrate stream</span>
              </div>
              <div className="p-5 rounded-2xl bg-[#0f172a] border border-blue-950 flex flex-col">
                <span className="text-xs uppercase font-bold text-slate-400">Taste Mix Accuracy</span>
                <span className="text-3xl font-extrabold text-emerald-400 mt-2 font-mono">
                  98.4%
                </span>
                <span className="text-xs text-slate-500 mt-1">Based on listening frequency</span>
              </div>
            </div>

            {/* Scrobbler Live Activity List */}
            <div className="p-6 rounded-3xl bg-[#0e162b] border border-blue-900/40">
              <h3 className="font-bold text-base text-white mb-4 flex items-center gap-2">
                <Radio className="w-4 h-4 text-rose-500" />
                Recent Scrobble Activity Log
              </h3>
              <div className="space-y-3">
                {[
                  { title: track.title, artist: track.artist, time: 'Now Playing', status: 'Scrobbling...' },
                  { title: 'Synthwave Skyline', artist: 'Retro City', time: '4 minutes ago', status: 'Scrobbled' },
                  { title: 'Electric Sunrise', artist: 'Lunar Beats', time: '18 minutes ago', status: 'Scrobbled' },
                  { title: 'Lost in Bangalore', artist: 'Acoustic Soul', time: '1 hour ago', status: 'Scrobbled' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-blue-950">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-slate-400">{item.artist}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold text-blue-400 block">{item.status}</span>
                      <span className="text-[11px] text-slate-500">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANDROID PROJECT EXPLORER */}
        {activeTab === 'android' && (
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#0d1527] border border-blue-900/50">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-blue-950">
                <div>
                  <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
                    <Smartphone className="w-6 h-6 text-emerald-400" />
                    Android Native Codebase
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">
                    100% Kotlin + Jetpack Compose, Material 3, C++ Native Secrets & Decent USB Audio Driver
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600/20 text-blue-300 border border-blue-500/30">
                    Gradle Kotlin DSL
                  </span>
                </div>
              </div>

              {/* Codebase Anatomy Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-[#090e1a] border border-blue-950">
                  <h4 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4" /> App Module (`/app`)
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <li>• <span className="text-sky-300">src/main/AndroidManifest.xml</span>: Permissions & Services</li>
                    <li>• <span className="text-sky-300">ui/settings/SettingsScreen.kt</span>: ECHO & Made by Akash</li>
                    <li>• <span className="text-sky-300">data/music/InnerTubeMusicApi.kt</span>: YouTube Music API</li>
                    <li>• <span className="text-sky-300">playback/MusicPlayer.kt</span>: AndroidX Media3 ExoPlayer</li>
                    <li>• <span className="text-sky-300">data/lossless/NativeSecrets.kt</span>: C++ JNI bridge</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-[#090e1a] border border-blue-950">
                  <h4 className="text-sm font-bold text-emerald-400 mb-2 flex items-center gap-2">
                    <Cpu className="w-4 h-4" /> Native Audio & Tools
                  </h4>
                  <ul className="text-xs text-slate-300 space-y-1.5 font-mono">
                    <li>• <span className="text-emerald-300">audio/decent-usb-audio-driver/</span>: Bit-perfect USB DAC</li>
                    <li>• <span className="text-emerald-300">tools/generate_native_secrets.py</span>: XOR crypto keys</li>
                    <li>• <span className="text-emerald-300">res/values/strings.xml</span>: "ECHO" across 13 locales</li>
                    <li>• <span className="text-emerald-300">res/values/colors.xml</span>: Vibrant Blue app icon theme</li>
                    <li>• <span className="text-emerald-300">echo_logo.png</span> & <span className="text-emerald-300">echo_logo.svg</span>: Brand assets</li>
                  </ul>
                </div>
              </div>

              {/* Security & Verification Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-800/40 flex items-center gap-3">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
                <div className="text-xs text-slate-300">
                  <span className="font-bold text-white">Security & Encryption Guaranteed:</span> Native XOR key splitting and JNI function bridges have been maintained with zero alteration to cryptographic logic or network verification.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENTATION */}
        {activeTab === 'docs' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="p-6 rounded-3xl bg-[#0f172a] border border-blue-900/50">
              <div className="flex items-center justify-between pb-4 border-b border-blue-950">
                <h2 className="text-2xl font-black text-white flex items-center gap-2">
                  <FileText className="w-6 h-6 text-blue-400" />
                  Documentation & Accessibility
                </h2>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Markdown Files Ready
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div className="p-5 rounded-2xl bg-[#0a1020] border border-blue-950">
                  <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    README.md (Complete Open-Source Guide)
                  </h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                    Includes project hero banner, badges, 6 high-res app screenshots, feature breakdown, tech stack, quick start, build instructions, and developer credit: <strong>Made by Akash</strong>.
                  </p>
                  <pre className="p-3 rounded-xl bg-black/40 text-[11px] font-mono text-slate-300 overflow-x-auto border border-blue-950">
                    git clone https://github.com/1227akash/Echo.git{'\n'}
                    cd ECHO{'\n'}
                    ./gradlew assembleRelease
                  </pre>
                </div>

                <div className="p-5 rounded-2xl bg-[#0a1020] border border-blue-950">
                  <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-blue-400" />
                    INSTALLATION.md (Installation Guide)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Provides comprehensive instructions for users and developers:
                    <br />• <strong>Method 1:</strong> Direct APK download and installation on any Android 7.0+ phone.
                    <br />• <strong>Method 2:</strong> ADB sideloading command for developers.
                    <br />• <strong>Method 3:</strong> Compiling with Gradle in Android Studio Koala / Ladybug.
                    <br />• Troubleshooting common issues (battery optimization, signature conflicts, DAC drivers).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-[#0a1020] border border-blue-950">
                  <h3 className="font-bold text-base text-white mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-sky-400" />
                    ACCESSIBILITY.md (Accessibility Guide)
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Details full compliance with Android Accessibility Standards:
                    <br />• TalkBack screen reader content descriptions on all interactive components.
                    <br />• Scalable typography using `sp` units up to 200% font zoom.
                    <br />• Minimum 48dp × 48dp touch targets for effortless thumb use.
                    <br />• High-contrast and AMOLED pure black dark themes.
                    <br />• Dynamic synchronized lyrics display with customizable sizing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Persistent Bottom Bar with About & Made by Akash */}
      <footer className="fixed bottom-0 left-0 right-0 border-t border-blue-950/80 bg-[#070b16]/95 backdrop-blur-md px-4 py-2.5 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center p-1 shadow-md shadow-blue-600/30">
              <img src="/echo_logo.svg" alt="ECHO" className="w-full h-full rounded-full" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center gap-1.5">
                ECHO <span className="text-[10px] font-normal text-slate-400">by Akash</span>
              </p>
              <p className="text-[11px] text-slate-500">
                YouTube Music Streaming • Last.fm Scrobbler
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="hidden sm:inline">Open-Source GPL-3.0</span>
            <button
              onClick={() => setShowAboutModal(true)}
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Credits & Info
            </button>
          </div>
        </div>
      </footer>

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e162c] border border-blue-900/60 rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-600 p-1 shadow-xl shadow-blue-600/40">
                <img src="/echo_logo.svg" alt="ECHO Logo" className="w-full h-full rounded-full" />
              </div>
              <h3 className="text-2xl font-black text-white mt-4 tracking-tight">ECHO</h3>
              <p className="text-sm font-semibold text-blue-400 mt-1">Made by Akash</p>
              <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-950 border border-blue-800 text-xs font-mono text-slate-300">
                Version 4.2.0 Open Source
              </div>

              <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                ECHO is a next-generation open-source music streaming application powered by YouTube Music and Last.fm scrobbler integration. Engineered for high performance, synchronized lyrics, and bit-perfect playback.
              </p>

              <div className="mt-6 pt-4 border-t border-blue-950 flex flex-col gap-2">
                <a
                  href="https://github.com/1227akash/Echo"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  View GitHub Repository
                </a>
                <button
                  onClick={() => setShowAboutModal(false)}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* APK & Project Source Download Modal */}
      {showApkModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e162c] border border-blue-900/60 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Get ECHO Android App</h3>
                  <p className="text-xs text-slate-400">Version 4.2.0 • Made by Akash</p>
                </div>
              </div>
              <button
                onClick={() => setShowApkModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Option 1: Direct Download Source Package */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-emerald-950/40 border border-emerald-500/30">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                      Instant Download
                    </span>
                    <h4 className="font-bold text-sm text-white mt-1.5">
                      Full Android Project Package (.ZIP)
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      Complete ready-to-build Android source code with Kotlin, Jetpack Compose, C++ JNI bridge, resources, and Gradle build files (10.5 MB).
                    </p>
                  </div>
                </div>
                <div className="mt-3.5">
                  <a
                    href="/ECHO-v4.2.0-project.zip"
                    download="ECHO-v4.2.0-project.zip"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download ECHO-v4.2.0-project.zip (10.5 MB)
                  </a>
                </div>
              </div>

              {/* Option 2: AI Studio Cloud Build */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-900/40">
                <h4 className="font-bold text-xs text-slate-200 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-blue-400" />
                  Generate APK via AI Studio
                </h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  In the top-right header menu of AI Studio, click on <strong>Project Settings / Export</strong> to directly download the signed APK or export to GitHub repository.
                </p>
              </div>

              {/* Option 3: Terminal Build Command */}
              <div className="p-4 rounded-2xl bg-[#080d1a] border border-blue-950">
                <h4 className="font-bold text-xs text-slate-300 flex items-center gap-2 mb-1.5">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  Compile with Gradle (1 Command)
                </h4>
                <div className="p-2.5 rounded-lg bg-black/60 font-mono text-[11px] text-emerald-400 border border-blue-950 select-all">
                  ./gradlew assembleRelease
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Output: <code className="text-slate-300">app/build/outputs/apk/release/app-release.apk</code>
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-blue-950 flex justify-end">
              <button
                onClick={() => setShowApkModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub 404 Fix & Repository Setup Modal */}
      {showGithubModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0e162c] border border-blue-800/60 rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">GitHub Repository Setup</h3>
                  <p className="text-xs text-slate-400">Why does https://github.com/1227akash/Echo show 404?</p>
                </div>
              </div>
              <button
                onClick={() => setShowGithubModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 space-y-4">
              {/* Alert explaining 404 */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                  !
                </div>
                <div className="text-xs text-amber-200/90 leading-relaxed">
                  <strong>404 Error Ka Reason:</strong> GitHub par jab tak koi repository create nahi ki jati ya publish nahi hoti, tab tak wo link 404 Not Found dikhata hai.
                </div>
              </div>

              {/* Step 1: 1-Click Push from AI Studio */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/70 to-indigo-950/50 border border-blue-700/40">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-2 py-0.5 rounded-full">
                  Step 1 (Sabse Aasan)
                </span>
                <h4 className="font-bold text-sm text-white mt-1.5">
                  AI Studio se Direct GitHub me Push karein
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Is screen ke top-right bar me <strong>"Export / Push to GitHub"</strong> button par click karein. Apna GitHub login karein aur repository name <code>ECHO</code> dekar <strong>Push</strong> dabayein.
                </p>
              </div>

              {/* Step 2: Or create on GitHub manually */}
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-blue-950">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
                  Step 2 (Manual Setup)
                </span>
                <h4 className="font-bold text-xs text-slate-200 mt-1.5">
                  GitHub.com par new repository banayein:
                </h4>
                <ol className="text-xs text-slate-400 mt-2 space-y-1.5 list-decimal list-inside leading-relaxed">
                  <li><strong>github.com/new</strong> par jayein.</li>
                  <li>Repository Name me <code>ECHO</code> likhein.</li>
                  <li><strong>Public</strong> select karein.</li>
                  <li>"Add README" tick <strong>mat</strong> karein.</li>
                  <li><strong>Create repository</strong> button click karein!</li>
                </ol>
                <div className="mt-3">
                  <a
                    href="https://github.com/new"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                  >
                    Open github.com/new ↗
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-blue-950 flex items-center justify-between">
              <a
                href="https://github.com/1227akash/Echo"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1"
              >
                Open Repo Link Anyway ↗
              </a>
              <button
                onClick={() => setShowGithubModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
