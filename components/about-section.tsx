export function AboutSection() {
  return (
    <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Secondary heading */}
        <div className="mb-6 md:mb-8">
          <p className="text-xs sm:text-sm font-light tracking-widest text-gray-600 uppercase text-center sm:text-left">
            HERE ARE SOME REASONS YOU'LL LOVE WORKING WITH US!
          </p>
        </div>

        {/* Subtle graphic element */}
        <div className="mb-8 md:mb-12 flex justify-center">
          <div className="w-12 sm:w-16 h-0.5" style={{ backgroundColor: "#aab8f7" }}></div>
        </div>

        {/* Main heading - oversized typography */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold tracking-tight leading-none text-gray-900">
            ABOUT US
          </h2>
        </div>

        {/* Content description */}
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-light px-4 sm:px-0">
            This minimalist blog is designed for readers who value clarity and simplicity. With a focus on typography,
            seamless navigation, and distraction-free reading, it delivers an elegant and enjoyable experience across
            all devices.
          </p>
        </div>

        {/* Feature list with eye image reference */}
        <div className="mb-12 md:mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Clean Design</h3>
              <p className="text-sm text-gray-600">uncluttered and readable</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Fast Performance</h3>
              <p className="text-sm text-gray-600">optimized for speed</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Navigation</h3>
              <p className="text-sm text-gray-600">intuitive structure</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto text-center mt-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Responsive Layout</h3>
              <p className="text-sm text-gray-600">works on all devices</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Engaging Content</h3>
              <p className="text-sm text-gray-600">focus on storytelling</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
