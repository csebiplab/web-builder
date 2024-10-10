export default function convertToLink(text: string) {
  return text.trim().replace(/\s+/g, "-");
}
