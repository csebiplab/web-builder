export default function convertSubStr(str: string) {
  return str.length > 20 ? `${str.substring(0, 20)}...` : str;
}
