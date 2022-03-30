export function getBookmark(url: any) {
  return fetch(`https://noembed.com/embed?dataType=json&url=${url}`).then(
    (res) => res.json()
  );
}
