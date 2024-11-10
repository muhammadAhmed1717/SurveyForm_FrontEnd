export default function BackgroundSection({ children }) {
  return (
    <div className="w-screen sm:bg-gradient-to-r from-zinc-900 to-black bg-gradient-to-b flex flex-col sm:flex-row justify-between minw-screen min-h-screen sm:p-11">
      <div className="w-screen h-1/6 sm:w-1/2 relative">
        <img
          src="assets/mainShoe.png"
          alt="Shoe Image"
          className="w-[70%] left-28 sm:left-0 sm:w-10/12 absolute max-w-xs sm:max-w-none sm:top-28 z-10"
        />
        <img
          src="assets/Union.png"
          alt="Arrow Image"
          className="w-1/2 absolute top-0 left-0 opacity-55"
        />
      </div>
      <div className="w-screen sm:w-1/2 p-4 z-10 items-right">
        {children}
      </div>
    </div>
  );
}
