import * as http from '../utils/http-utils';

const testDoc = {
  description: 'Dock Anchor Example',
  docDate: new Date().getTime(),
  linkedVideo: 'http://example.com/some-video-that-probably-does-not-exist.mp4',
  text: 'I worried too. My main concern was whether or not the anchor would hold, how much wind and waves could an eight pound Danforth endure?',
  textSrc: 'http://www.boatdejour.com/the-storm-a-true-story/',
};

export const createAnchor = async () => {
  const data = [
    testDoc,
  ];
  return http.sendAndLog(() => http.post('anchors/', data));
}

export const getAnchor = async (anchorId) => {
  return http.sendAndLog(() => http.get(`anchors/${anchorId}`));
}
