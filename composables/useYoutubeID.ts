export const useYoutubeID = (youtubeurl) => {
  let youtubeID = youtubeurl.split('/embed/')[1];
  const questionMarkPosition = youtubeID.indexOf('?');
  if (questionMarkPosition !== -1) {
    youtubeID = youtubeID.substring(0, questionMarkPosition);
  }
  return youtubeID;
}