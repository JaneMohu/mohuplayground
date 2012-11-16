(function() {
  var html_editor = document.querySelector('#html textarea'),
    css_editor = document.querySelector('#css textarea'),
    js_editor = document.querySelector('#js textarea');

  var editors = [html_editor, css_editor, js_editor],
      code = '';

  // Attaching the onkeyup event
  editors.forEach(function(editor, i, arr) {
    editor.addEventListener('keyup', function() {
      if(code !== this.value) {
        render();
        code = this.value;
      }
    }, false);
  });

  var base_tpl =
    "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";

  var prepareSource = function() {
    var html = html_editor.value,
        css = css_editor.value,
        js = js_editor.value,
        src = '';

    // HTML
    // Replace closing body tag with html plus /body
    src = base_tpl.replace('</body>', html + '</body');

    // CSS
    css = '<style>' + css + '</style>';
    // Replace closing head tag with css plus /head
    src = src.replace('</head>', css + '</head>');

    // Javascript
    js = '<script>' + js + '</script>';
    src = src.replace('</body>', js + '</body>');

    return src;
  };

  var render = function() {
    var source = prepareSource();
    var iframe = document.querySelector('#output iframe'),
        iframe_doc = iframe.contentDocument;

    iframe_doc.open();
    iframe_doc.write(source);
    iframe_doc.close();
  }

}());