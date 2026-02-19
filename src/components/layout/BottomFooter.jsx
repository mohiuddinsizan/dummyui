export default function BottomFooter() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30">
      <div className="mx-auto w-full max-w-[430px]">
        <div className="border-t border-white/10 bg-black/45 backdrop-blur-xl">
          <div className="px-4 py-3 text-center text-[11px] text-white/55">
            © {new Date().getFullYear()} The Royal Scientific Publications
          </div>
          <div className="h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
        </div>
      </div>
    </footer>
  );
}
