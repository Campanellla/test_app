/**
 * Parse cookie
 */

import cookie from "cookie";

import type { IncomingMessage } from "http";

const parseCookie = (
  req?: IncomingMessage | null,
  options: cookie.CookieParseOptions = {}
): { [key: string]: string } =>
  cookie.parse(req ? req.headers?.cookie || "" : document.cookie, options);

export default parseCookie;
