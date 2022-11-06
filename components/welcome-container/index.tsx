export default function WelcomeContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-gray-200 xl:inline">
                  Video calls.
                </span>{' '}
                <span className="block text-emerald-500 xl:inline">
                  Now "expensive" for everyone.
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                For secure business and friendly meetings. It is free and for
                all.
              </p>
              <div className="flex gap-4 justify-start mt-4">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
