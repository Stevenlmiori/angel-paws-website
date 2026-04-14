export function HomeQuote() {
  return (
    <section className="bg-surface-container-low py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-10 lg:px-12">
        <blockquote className="font-serif text-2xl leading-snug text-on-surface md:text-3xl md:leading-relaxed">
          <p className="not-italic">
            &ldquo;The King will reply, &lsquo;Truly I tell you, whatever you did
            for one of the least of these brothers and sisters of mine, you did
            for me.&rsquo;&rdquo;
          </p>
          <cite className="mt-5 block text-lg italic text-on-surface-variant md:text-xl">
            Matthew 25:40
          </cite>
        </blockquote>
      </div>
    </section>
  );
}
