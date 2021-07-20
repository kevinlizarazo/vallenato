const fs = require('fs');
const cheerio = require('cheerio')
// get project name via the name of the parent folder,
// which Vallenato gathers at initialization
let path = process.cwd().toString();
let projectName = path.substring((path.lastIndexOf('/') + 1));

// copy SCSS from ai2html-output to project root
fs.copyFile('./ai2html-output/styles.scss', './styles.scss', (err) => {
  if (err) throw err;
  console.log('styles copied');
});

// read HTML
let html = fs.readFileSync('./ai2html-output/output.html', 'utf8')

const $ = cheerio.load(html)

let htmlAssets = `/* eslint-disable */
import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';`

let graphicHeaderHide = $('.ai2html').attr('data-vheader')
let graphicFooterHide = $('.ai2html').attr('data-vfooter')
let graphicNotes = $('.ai2html').attr('data-notes')
let graphicSizes = $('.ai2html').attr('data-sizes').split(',')
// let graphicFixedSizes = $('.ai2html').attr('data-fsizes').split(',')
let sourceSize = $('.ai2html').attr('data-sources').trim()

for (const x in graphicSizes) {
  switch (graphicSizes[x].trim()) {
    /* case 'mobile':
      html = html.replace(`${projectName}-mobile.png`, '` + img_mobile + `');
      htmlAssets += `\nimport img_mobile from './ai2html-output/${projectName}-mobile.png'`
      break; */
    case 'small':
      html = html.replace(`${projectName}-small.png`, '` + img_small + `');
      htmlAssets += `\nimport img_small from './ai2html-output/${projectName}-small.png'`
      break;
    case 'medium':
      html = html.replace(`${projectName}-medium.png`, '` + img_medium + `');
      htmlAssets += `\nimport img_medium from './ai2html-output/${projectName}-medium.png'`
      break;
    case 'large':
      html = html.replace(`${projectName}-large.png`, '` + img_large + `');
      htmlAssets += `\nimport img_large from './ai2html-output/${projectName}-large.png'`
      break;
  }
}

let graphicHeader = ''
let graphicFooter = ''

if (graphicHeaderHide === 'false') {
  graphicHeader = 'hidden'
} else { graphicHeader = '' }

if (graphicFooterHide === 'false') {
  graphicFooter = 'hidden'
} else { graphicFooter = '' }

let graphicType = $('.ai2html').attr('data-type')
let modifyFooter = ''
let modifyNotes = ''
let modifySource = ''

if (graphicType === 'map') {
  modifyFooter = 'v-map-footer'
}

if (graphicNotes.length === 0) {
  modifyNotes = 'hidden'
}

let sourcePlural = ''

if (sourceSize.length === 0) {
  modifySource = 'hidden'
} else {
  if (sourceSize.split(';').length > 1) {
    sourcePlural = 'Sources:'
  } else { sourcePlural = 'Source:' }
}

html = `<div class='vallenato relative flex flex-col mb-25px mt-25px'>
  <div class='v-header ${graphicHeader}'>
    <div class='v-title'>title</div>
    <div class='v-subhead'>subhead</div>
  </div>
  <!--where the graphic is placed, id should be folder name-->
  <div id='v-${projectName}' class='chartDiv relative pb-25px'>` + html + `</div>
  <div class='relative float-left pl-15px pb-15px ` + modifyNotes + ` '>
    <div id="note" class="v-annotation" style="bottom:15px;">${graphicNotes}
  </div>
  </div>
  <div class='${graphicFooter} v-footer ` + modifyFooter + ` '>
    <div class='v-logo-brown'></div>
    <div class='src ` + modifySource + `' style='top: -6px;position: absolute;margin-right: 80px;'>
      <span class='v-source'><span id='psource' class='v-source italic'></span>&nbsp;
      <span id='vsource' class='v-source'></span></span>
    </div>
  </div>
</div>`

// prepare HTML for injection
let htmlInjection = '\n\nlet graphic =`' + html + '\n`'

let htmlParameters = `
var title = '` + $('.ai2html').attr('data-title') + `'
var subhead = '` + $('.ai2html').attr('data-subhead') + `'
var psourcetext = '${sourcePlural}'
var sourcetext = "` + $('.ai2html').attr('data-sources') + `"
`
// prepare JS for injection
let resizer = `
  (function () {
    function item_wrap() {
      var width = $(window).width();
      if (width < 1024) {
        $('.v-wrap').each(function(){
          if ($(this).parent().is('p.ai2html_p')){
            $(this).unwrap();
          }
        })
      }
      if (width > 1023) {
        $('.v-wrap').each(function(){
          if (!$(this).parent().is('p.ai2html_p')){
            $(this).wrap("<p class='ai2html_p'></p>");
          }
        })
      }
    }
    // only want one resizer on the page
    if (document.documentElement.className.indexOf("v-resizer-v3-init") > -1) return;
    document.documentElement.className += "v-resizer-v3-init";
    // require IE9+
    if (!("querySelector" in document)) return;
    function resizer() {
        var elements = Array.prototype.slice.call(document.querySelectorAll(".v-artboard[data-min-width]")),
            widthById = {};
        elements.forEach(function(el) {
            var parent = el.parentNode,
                width = widthById[parent.id] || parent.getBoundingClientRect().width,
                minwidth = el.getAttribute("data-min-width"),
                maxwidth = el.getAttribute("data-max-width");
            widthById[parent.id] = width;
            if (+minwidth <= width && (+maxwidth >= width || maxwidth === null)) {
                el.style.display = "block";
            } else {
                el.style.display = "none";
            }
        });
        try {
            if (window.parent && window.parent.$) {
                window.parent.$("body").trigger("resizedcontent", [window]);
                item_wrap()
            }
            /*if (window.require) {
                require(['foundation/main'], function() {
                    require(['shared/interactive/instances/app-communicator'], function(AppCommunicator) {
                        AppCommunicator.triggerResize();
                    });
                });
            }*/
        } catch(e) { console.log(e); }
    }
    document.addEventListener('DOMContentLoaded', resizer);
    // feel free to replace throttle with _.throttle, if available
    window.addEventListener('resize', throttle(resizer, 200));
    function throttle(func, wait) {
        // from underscore.js
        var _now = Date.now || function() { return new Date().getTime(); },
            context, args, result, timeout = null, previous = 0;
        var later = function() {
            previous = _now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = _now(), remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } /*else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }*/
            return result;
        };
    }

})();
`
let appendToContainer = `
let container = document.getElementById('${projectName}')
container.insertAdjacentHTML("afterbegin", graphic)

document.querySelector('#${projectName} .v-title').innerHTML = title
document.querySelector('#${projectName} .v-subhead').innerHTML = subhead
document.querySelector('#${projectName} #psource').innerHTML = psourcetext
document.querySelector('#${projectName} #vsource').innerHTML = sourcetext
`
// inject JS and HTML
// the order matters, but unsure why this works...
fs.appendFile('index.js', htmlAssets + resizer + htmlParameters + htmlInjection + appendToContainer, function (err) {
  if (err) console.log(err)
})
