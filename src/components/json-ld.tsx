/**
 * Renders a JSON-LD structured-data script tag.
 *
 * Server-component safe: no hooks, no client bundle cost. The payload is
 * serialized with JSON.stringify, which escapes `<` as required to keep
 * user-authored strings from breaking out of the script context.
 */
export default function JsonLd({ id, data }: { id: string; data: object }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
