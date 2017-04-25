export const SYNC_LEGENCY_CUI_SESSION = 'index/actions/syncSession/SYNC_LEGENCY_CUI_SESSION';

/**
 * Provide this action to manually sync legency cui session.
 * Generally, do this sync session work in syncSessionMiddleware would be more
 * make sense, just apply for this action in some special cases such as:
 *    1. Entry new cui site forwarded from the legency cui site.
 *    2. ...
 */
export function syncLegencyCUISessionAction() {
  return {
    type: SYNC_LEGENCY_CUI_SESSION
  };
}
