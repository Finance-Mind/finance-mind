/**
 * Detects if the current device is a mobile device
 * @returns True if the device is mobile, false otherwise
 */
export function detectMobileDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const userAgent =
    navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || '';
  const mobileRegex =
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;

  return mobileRegex.test(userAgent);
}
