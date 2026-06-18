// Renders a JSON-LD <script> for structured data (the GEO strategy: clean,
// machine-readable facts that search engines and AI assistants can cite).
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline here; no user input is included.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
