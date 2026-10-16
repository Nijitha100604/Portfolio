export default function Section({ id, title, intro, children }) {
  return (
    <section id={id} className="border-t border-line px-6 py-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="font-display text-3xl font-medium sm:text-4xl">{title}</h2>
        {intro && <p className="mt-3 max-w-3xl text-muted">{intro}</p>}
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
