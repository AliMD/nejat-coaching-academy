import {logger} from '../../lib/config.js';

export function getReferralCodeFromUrl(url: string): string | null {
  let code: string | null = null;

  try {
    const parsedUrl = new URL(url);
    const searchParams = new URLSearchParams(parsedUrl.search);

    code = searchParams.get('code');
    logger?.logMethodArgs?.('getReferralCode', {code});
  }
  catch (error) {
    logger.error('getReferralCodeFromUrl', 'get_referral_code_failed', error);
  }

  return code;
}
