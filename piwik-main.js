/* Piwik seems use global window object */
require(['config'], function(config) {
  window._paq = window._paq || [];
  window._paq.push(['trackPageView']);
  window._paq.push(['enableLinkTracking']);
  (function() {
    var u="//"+config.piwikServer;
    window._paq.push(['setTrackerUrl', u+'piwik.php']);
    window._paq.push(['setSiteId', 1]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
});