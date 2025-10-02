// YouTube API service for fetching playlist videos with ordering and titles
// Setup: create a .env file in project root and add:
// VITE_YT_API_KEY=YOUR_API_KEY_HERE
const API_KEY = import.meta.env.VITE_YT_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Fetch playlist's public title (if not provided in config)
async function fetchPlaylistTitle(playlistId) {
  try {
    const url = `${BASE_URL}/playlists?part=snippet&id=${playlistId}&key=${API_KEY}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`YouTube API error: ${resp.status}`);
    const data = await resp.json();
    return data?.items?.[0]?.snippet?.title || '';
  } catch (e) {
    console.error('Error fetching playlist title:', e);
    return '';
  }
}

// Fetch up to maxResults videos from a playlist, ordered so the first shown is the last in the playlist
export async function fetchPlaylistVideos(playlistId, maxResults = 10) {
  try {
    const videos = [];
    let pageToken = '';
    while (videos.length < maxResults) {
      const batchSize = Math.min(50, maxResults - videos.length);
      const url =
        `${BASE_URL}/playlistItems?part=snippet,contentDetails` +
        `&playlistId=${playlistId}` +
        `&maxResults=${batchSize}` +
        (pageToken ? `&pageToken=${pageToken}` : '') +
        `&key=${API_KEY}`;

      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`YouTube API error: ${resp.status}`);
      const data = await resp.json();

      for (const item of data.items || []) {
        const vid = {
          id: item?.snippet?.resourceId?.videoId,
          title: item?.snippet?.title || '',
          thumbnail: item?.snippet?.thumbnails?.medium?.url || '',
          publishedAt: item?.contentDetails?.videoPublishedAt || '',
          position: typeof item?.snippet?.position === 'number' ? item.snippet.position : null,
        };
        if (vid.id) {
          videos.push(vid);
        }
      }
      if (!data.nextPageToken) break;
      pageToken = data.nextPageToken;
    }

    // Order so the first displayed item corresponds to the last in the playlist:
    // YouTube position starts at 0, so sort by position descending
    const withPosition = videos.filter(v => v.position !== null);
    const withoutPosition = videos.filter(v => v.position === null);
    withPosition.sort((a, b) => b.position - a.position);

    return [...withPosition, ...withoutPosition].slice(0, maxResults);
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return [];
  }
}

// Accepts array of { id: string, title?: string }, returns array of { id, title, videos[] }
export async function fetchPlaylists(playlistsConfig, maxPerPlaylist = 10) {
  try {
    const out = [];
    for (const cfg of playlistsConfig) {
      const videos = await fetchPlaylistVideos(cfg.id, maxPerPlaylist);
      let title = cfg.title;
      if (!title) {
        title = (await fetchPlaylistTitle(cfg.id)) || `Playlist ${cfg.id.substring(0, 6)}`;
      }
      out.push({ id: cfg.id, title, videos });
    }
    return out;
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
}