export function htmlDecode(question) {
  var doc = new DOMParser().parseFromString(question, "text/html");
  return doc.documentElement.textContent;
}

export function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--
      [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]]
  }
  return array;
}