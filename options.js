// Generated by CoffeeScript 1.9.1
(function() {
  var $, catchError, storage;

  $ = document.querySelector.bind(document);

  storage = chrome.storage.sync;

  catchError = function(f) {
    return function() {
      if (chrome.runtime.lastError) {
        return alert(chrome.runtime.lastError.string);
      } else if (f) {
        return f.apply(this, arguments);
      }
    };
  };

  storage.get('sites', catchError(function(arg) {
    var site, sites;
    sites = arg.sites;
    return $('#sites').value = ((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = sites.length; i < len; i++) {
        site = sites[i];
        results.push(site.hostSuffix);
      }
      return results;
    })()).join('\n');
  }));

  $('#sites').addEventListener('input', function() {
    var site, sites;
    sites = (function() {
      var i, len, ref, results;
      ref = $('#sites').value.split('\n');
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        site = ref[i];
        if (site) {
          results.push({
            hostSuffix: site
          });
        }
      }
      return results;
    })();
    return storage.set({
      sites: sites
    }, catchError());
  });

}).call(this);
