export function extractYouTubeId(url: string): string | null {
  try {
    const parsedUrl = new URL(url);

    // youtu.be/ID
    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.slice(1);
    }

    // youtube.com/watch?v=ID
    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    // youtube.com/embed/ID
    if (parsedUrl.pathname.includes("/embed/")) {
      return parsedUrl.pathname.split("/embed/")[1];
    }

    // youtube.com/shorts/ID
    if (parsedUrl.pathname.includes("/shorts/")) {
      return parsedUrl.pathname.split("/shorts/")[1];
    }

    return null;
  } catch {
    return null;
  }
}
