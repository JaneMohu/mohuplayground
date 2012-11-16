(function() {

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

  // TODO: place iframe on a different subdomain and use HTML5 postMessage to communicate with it
  // (HTML5 postMessage works in IE8 and up)

  var prepareSource = function() {
    var html = html_editor.getValue(),
        css = css_editor.getValue(),
        js = js_editor.getValue(),
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

  // CM Options
  var cm_opt = {
    mode: 'text/html',
    gutter: true,
    lineNumbers: true,

    onChange: function (instance, changes) {
      render();
    }
  };

  // HTML EDITOR
  var html_box = document.querySelector('#html textarea');
  var html_editor = CodeMirror.fromTextArea(html_box, cm_opt);

  // CSS EDITOR
  cm_opt.mode = 'css';
  var css_box = document.querySelector('#css textarea'),
      css_editor = CodeMirror.fromTextArea(css_box, cm_opt);

  // JAVASCRIPT EDITOR
  cm_opt.mode = 'javascript';
  var js_box = document.querySelector('#js textarea'),
      js_editor = CodeMirror.fromTextArea(js_box, cm_opt);

  // SETTING CODE EDITORS INITIAL CONTENT
  html_editor.setValue('Hello World');
  css_editor.setValue('body { color: red; }');
  
  // RENDER CALL ON PAGE LOAD
  // NOT NEEDED ANYMORE, SINCE WE RELY
  // ON CODEMIRROR'S onChange OPTION THAT GETS
  // TRIGGERED ON setValue
  // render();
  
  
  // NOT SO IMPORTANT - IF YOU NEED TO DO THIS
  // THEN THIS SHOULD GO TO CSS
  
  /*
    Fixing the Height of CodeMirror.
    You might want to do this in CSS instead
    of JS and override the styles from the main
    codemirror.css
  */
  var cms = document.querySelectorAll('.CodeMirror');
  for (var i = 0; i < cms.length; i++) {
    
    cms[i].style.position = 'absolute';
    cms[i].style.top = '30px';
    cms[i].style.bottom = '0';
    cms[i].style.left = '0';
    cms[i].style.right = '0';
  }
  var cms = document.querySelectorAll('.CodeMirror-scroll');
  for (var i = 0; i < cms.length; i++) {
    cms[i].style.height = '100%';
  }

}());