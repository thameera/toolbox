export function ParserNoneResult(): JSX.Element {
  return (
    <div className="flex items-center justify-center w-full min-h-[30vh]">
      <div className="italic text-gray-500">
        <div className="text-xl">Supports these formats:</div>
        <ul className="list-disc pl-4">
          <li>URLs</li>
          <li>JWTs</li>
          <li>JSON objects and arrays</li>
          <li>Base64-encoded JSON</li>
          <li>XML</li>
          <li>User agents</li>
          <li>X509 certificates</li>
          <li>Math expressions</li>
        </ul>
        <div className="text-sm mt-4">
          Click &quot;Random Example&quot; to see them in action!
        </div>
      </div>
    </div>
  );
}
