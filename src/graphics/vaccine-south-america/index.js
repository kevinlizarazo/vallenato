/* eslint-disable *//* eslint-disable */
import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';
import img_small from './ai2html-output/vaccine-south-america-small.png'
import img_medium from './ai2html-output/vaccine-south-america-medium.png'
import img_large from './ai2html-output/vaccine-south-america-large.png'
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

var title = 'Where Are Latin American Countries Getting Their Vaccines?'
var subhead = ''
var psourcetext = 'Source:'
var sourcetext = "Atlantic Council. "


let graphic =`<div class='vallenato relative'>
  <div class='v-header '>
    <div class='v-title'>title</div>
    <div class='v-subhead'>subhead</div>
  </div>
  <!--where the graphic is placed, id should be folder name-->
  <div id='v-vaccine-south-america' class='chartDiv relative pb-25px'><div id="v-vaccine-south-america-box" class="ai2html" data-vheader="true" data-notes="" data-vfooter="true" data-title="Where Are Latin American Countries Getting Their Vaccines?" data-subhead="" data-sources="Atlantic Council. " data-type="chart" data-sizes="small,medium,large">

	<!-- Artboard: large -->
	<div id="v-vaccine-south-america-large" class="v-artboard" style="width:680px; height:689.0128075586px;" data-aspect-ratio="0.987" data-min-width="680">
<div style=""></div>
		<img id="v-vaccine-south-america-large-img" class="v-aiImg" alt="" src="` + img_large + `"/>
		<div id="v-ai0-1" class="v-large v-aiAbs v-aiPointText" style="top:15.2055%;margin-top:-17.8px;left:17.4384%;width:68px;">
			<p class="v-pstyle0">Mexico</p>
		</div>
		<div id="v-ai0-2" class="v-large v-aiAbs v-aiPointText" style="top:17.5276%;margin-top:-17.8px;left:38.5207%;width:81px;">
			<p class="v-pstyle0">Honduras</p>
		</div>
		<div id="v-ai0-3" class="v-large v-aiAbs v-aiPointText" style="top:22.172%;margin-top:-17.8px;right:69.0973%;width:88px;">
			<p class="v-pstyle1">Guatemala</p>
		</div>
		<div id="v-ai0-4" class="v-large v-aiAbs v-aiPointText" style="top:22.1139%;margin-top:-9.4px;left:41.6007%;width:69px;">
			<p class="v-pstyle0">Panama</p>
		</div>
		<div id="v-ai0-5" class="v-large v-aiAbs v-aiPointText" style="top:22.259%;margin-top:-9.4px;left:56.3497%;width:86px;">
			<p class="v-pstyle0">Venezuela</p>
		</div>
		<div id="v-ai0-6" class="v-large v-aiAbs v-aiPointText" style="top:25.0747%;margin-top:-17.8px;left:67.1156%;width:68px;">
			<p class="v-pstyle0">Guyana</p>
		</div>
		<div id="v-ai0-7" class="v-large v-aiAbs v-aiPointText" style="top:25.2198%;margin-top:-17.8px;right:67.0271%;width:88px;">
			<p class="v-pstyle1">El Salvador</p>
		</div>
		<div id="v-ai0-8" class="v-large v-aiAbs v-aiPointText" style="top:29.2836%;margin-top:-17.8px;right:62.4325%;width:87px;">
			<p class="v-pstyle1">Costa Rica</p>
		</div>
		<div id="v-ai0-9" class="v-large v-aiAbs v-aiPointText" style="top:33.6376%;margin-top:-17.8px;left:48.0772%;width:82px;">
			<p class="v-pstyle0">Colombia</p>
		</div>
		<div id="v-ai0-10" class="v-large v-aiAbs v-aiPointText" style="top:36.192%;margin-top:-9.4px;left:36.0701%;width:72px;">
			<p class="v-pstyle0">Ecuador</p>
		</div>
		<div id="v-ai0-11" class="v-large v-aiAbs v-aiPointText" style="top:49.4574%;margin-top:-17.8px;left:48.9918%;width:49px;">
			<p class="v-pstyle0">Peru</p>
		</div>
		<div id="v-ai0-12" class="v-large v-aiAbs v-aiPointText" style="top:49.8928%;margin-top:-17.8px;left:76.7004%;width:55px;">
			<p class="v-pstyle0">Brazil</p>
		</div>
		<div id="v-ai0-13" class="v-large v-aiAbs v-aiPointText" style="top:55.2628%;margin-top:-17.8px;left:60.6691%;width:62px;">
			<p class="v-pstyle0">Bolivia</p>
		</div>
		<div id="v-ai0-14" class="v-large v-aiAbs v-aiPointText" style="top:63.9129%;margin-top:-9.4px;right:43.8398%;width:54px;">
			<p class="v-pstyle1">Chile</p>
		</div>
		<div id="v-ai0-15" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:69.4422%;margin-top:-9.5px;left:5.9967%;width:221px;">
			<p class="v-pstyle2">Vaccines in use as of March 2021</p>
		</div>
		<div id="v-ai0-16" class="v-large v-aiAbs v-aiPointText" style="top:70.4439%;margin-top:-9.4px;left:59.7478%;width:81px;">
			<p class="v-pstyle0">Argentina</p>
		</div>
		<div id="v-ai0-17" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:76.5687%;margin-top:-34.6px;left:10.6455%;width:283px;">
			<p class="v-pstyle3">U.S.- and European-developed vaccines</p>
			<p class="v-pstyle3">(Johnson & Johnson, Moderna, </p>
			<p class="v-pstyle3">Oxford-AstraZeneca, and Pfizer-BioNTech)</p>
		</div>
		<div id="v-ai0-18" class="v-large v-aiAbs v-aiPointText" style="top:74.2174%;margin-top:-9.4px;left:69.0756%;width:72px;">
			<p class="v-pstyle0">Uruguay</p>
		</div>
		<div id="v-ai0-19" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:82.5482%;margin-top:-17.8px;left:10.1616%;width:231px;">
			<p class="v-pstyle3">Chinese-developed vaccines</p>
			<p class="v-pstyle3">(CanSino, Sinopharm, and Sinovac)</p>
		</div>
		<div id="v-ai0-20" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:88.6439%;margin-top:-17.8px;left:10.1804%;width:196px;">
			<p class="v-pstyle3">Russian-developed vaccines</p>
			<p class="v-pstyle3">(Sputnik)</p>
		</div>
	</div>

	<!-- Artboard: medium -->
	<div id="v-vaccine-south-america-medium" class="v-artboard" style="width:550px; height:574.43730162821px;" data-aspect-ratio="0.957" data-min-width="550" data-max-width="679">
<div style=""></div>
		<img id="v-vaccine-south-america-medium-img" class="v-aiImg" alt="" src="` + img_medium + `"/>
		<div id="v-ai1-1" class="v-medium v-aiAbs v-aiPointText" style="top:15.2272%;margin-top:-14.5px;left:15.8031%;width:60px;">
			<p class="v-pstyle0">Mexico</p>
		</div>
		<div id="v-ai1-2" class="v-medium v-aiAbs v-aiPointText" style="top:16.968%;margin-top:-14.5px;left:38.1765%;width:71px;">
			<p class="v-pstyle0">Honduras</p>
		</div>
		<div id="v-ai1-3" class="v-medium v-aiAbs v-aiPointText" style="top:21.146%;margin-top:-14.5px;right:70.2056%;width:77px;">
			<p class="v-pstyle1">Guatemala</p>
		</div>
		<div id="v-ai1-4" class="v-medium v-aiAbs v-aiPointText" style="top:22.0242%;margin-top:-7.5px;left:40.6174%;width:61px;">
			<p class="v-pstyle0">Panama</p>
		</div>
		<div id="v-ai1-5" class="v-medium v-aiAbs v-aiPointText" style="top:22.7205%;margin-top:-7.5px;left:56.3917%;width:75px;">
			<p class="v-pstyle0">Venezuela</p>
		</div>
		<div id="v-ai1-6" class="v-medium v-aiAbs v-aiPointText" style="top:24.9759%;margin-top:-14.5px;right:68.5504%;width:77px;">
			<p class="v-pstyle1">El Salvador</p>
		</div>
		<div id="v-ai1-7" class="v-medium v-aiAbs v-aiPointText" style="top:26.5426%;margin-top:-14.5px;left:71.4609%;width:60px;">
			<p class="v-pstyle0">Guyana</p>
		</div>
		<div id="v-ai1-8" class="v-medium v-aiAbs v-aiPointText" style="top:28.1094%;margin-top:-14.5px;right:62.4066%;width:76px;">
			<p class="v-pstyle1">Costa Rica</p>
		</div>
		<div id="v-ai1-9" class="v-medium v-aiAbs v-aiPointText" style="top:33.3319%;margin-top:-14.5px;right:43.1215%;width:72px;">
			<p class="v-pstyle1">Colombia</p>
		</div>
		<div id="v-ai1-10" class="v-medium v-aiAbs v-aiPointText" style="top:35.6027%;margin-top:-7.5px;right:57.4389%;width:64px;">
			<p class="v-pstyle1">Ecuador</p>
		</div>
		<div id="v-ai1-11" class="v-medium v-aiAbs v-aiPointText" style="top:48.8253%;margin-top:-14.5px;right:47.7475%;width:45px;">
			<p class="v-pstyle1">Peru</p>
		</div>
		<div id="v-ai1-12" class="v-medium v-aiAbs v-aiPointText" style="top:49.6957%;margin-top:-14.5px;left:75.0085%;width:49px;">
			<p class="v-pstyle0">Brazil</p>
		</div>
		<div id="v-ai1-13" class="v-medium v-aiAbs v-aiPointText" style="top:56.1368%;margin-top:-14.5px;left:59.7296%;width:55px;">
			<p class="v-pstyle0">Bolivia</p>
		</div>
		<div id="v-ai1-14" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:60.8362%;margin-top:-9.5px;left:7.6699%;width:221px;">
			<p class="v-pstyle2">Vaccines in use as of March 2021</p>
		</div>
		<div id="v-ai1-15" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:70.6723%;margin-top:-43px;left:12.5062%;width:219px;">
			<p class="v-pstyle3">U.S.- and European-developed</p>
			<p class="v-pstyle3"> vaccines (Johnson & Johnson,</p>
			<p class="v-pstyle3"> Moderna, Oxford-AstraZeneca, </p>
			<p class="v-pstyle3">and Pfizer-BioNTech)</p>
		</div>
		<div id="v-ai1-16" class="v-medium v-aiAbs v-aiPointText" style="top:65.545%;margin-top:-7.5px;right:40.6376%;width:49px;">
			<p class="v-pstyle1">Chile</p>
		</div>
		<div id="v-ai1-17" class="v-medium v-aiAbs v-aiPointText" style="top:71.9784%;margin-top:-14.5px;left:58.0684%;width:71px;">
			<p class="v-pstyle0">Argentina</p>
		</div>
		<div id="v-ai1-18" class="v-medium v-aiAbs v-aiPointText" style="top:75.4678%;margin-top:-7.5px;left:69.28%;width:64px;">
			<p class="v-pstyle0">Uruguay</p>
		</div>
		<div id="v-ai1-19" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:79.5157%;margin-top:-17.8px;left:12.5062%;width:231px;">
			<p class="v-pstyle3">Chinese vaccines</p>
			<p class="v-pstyle3">(CanSino, Sinopharm, and Sinovac)</p>
		</div>
		<div id="v-ai1-20" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:88.1154%;margin-top:-26.2px;left:12.5062%;width:118px;">
			<p class="v-pstyle3">Russian vaccine</p>
			<p class="v-pstyle3">(Sputnik)</p>
		</div>
	</div>

	<!-- Artboard: small -->
	<div id="v-vaccine-south-america-small" class="v-artboard" style="max-width: 360px;max-height: 670px" data-aspect-ratio="0.537" data-min-width="0" data-max-width="549">
<div style="padding: 0 0 186.0652% 0;"></div>
		<img id="v-vaccine-south-america-small-img" class="v-aiImg" alt="" src="` + img_small + `"/>
		<div id="v-ai5-1" class="v-small v-aiAbs v-aiPointText" style="top:16.7063%;margin-top:-14.5px;left:42.1251%;width:71px;">
			<p class="v-pstyle0">Honduras</p>
		</div>
		<div id="v-ai5-2" class="v-small v-aiAbs v-aiPointText" style="top:17.2101%;margin-top:-14.5px;left:11.7418%;width:60px;">
			<p class="v-pstyle0">Mexico</p>
		</div>
		<div id="v-ai5-3" class="v-small v-aiAbs v-aiPointText" style="top:19.0651%;margin-top:-7.5px;left:58.8042%;width:75px;">
			<p class="v-pstyle0">Venezuela</p>
		</div>
		<div id="v-ai5-4" class="v-small v-aiAbs v-aiPointText" style="top:21.073%;margin-top:-14.5px;right:73.1398%;width:77px;">
			<p class="v-pstyle1">Guatemala</p>
		</div>
		<div id="v-ai5-5" class="v-small v-aiAbs v-aiPointText" style="top:20.4087%;margin-top:-7.5px;left:46.0762%;width:61px;">
			<p class="v-pstyle0">Panama</p>
		</div>
		<div id="v-ai5-6" class="v-small v-aiAbs v-aiPointText" style="top:23.4244%;margin-top:-14.5px;left:75.2193%;width:60px;">
			<p class="v-pstyle0">Guyana</p>
		</div>
		<div id="v-ai5-7" class="v-small v-aiAbs v-aiPointText" style="top:23.7603%;margin-top:-14.5px;right:68.6314%;width:77px;">
			<p class="v-pstyle1">El Salvador</p>
		</div>
		<div id="v-ai5-8" class="v-small v-aiAbs v-aiPointText" style="top:26.2795%;margin-top:-14.5px;right:63.7242%;width:76px;">
			<p class="v-pstyle1">Costa Rica</p>
		</div>
		<div id="v-ai5-9" class="v-small v-aiAbs v-aiPointText" style="top:28.9668%;margin-top:-14.5px;left:23.1359%;width:72px;">
			<p class="v-pstyle0">Colombia</p>
		</div>
		<div id="v-ai5-10" class="v-small v-aiAbs v-aiPointText" style="top:30.6538%;margin-top:-7.5px;left:25.2062%;width:64px;">
			<p class="v-pstyle0">Ecuador</p>
		</div>
		<div id="v-ai5-11" class="v-small v-aiAbs v-aiPointText" style="top:34.8451%;margin-top:-14.5px;left:38.4853%;width:45px;">
			<p class="v-pstyle0">Peru</p>
		</div>
		<div id="v-ai5-12" class="v-small v-aiAbs v-aiPointText" style="top:39.5477%;margin-top:-14.5px;left:79.1048%;width:49px;">
			<p class="v-pstyle0">Brazil</p>
		</div>
		<div id="v-ai5-13" class="v-small v-aiAbs v-aiPointText" style="top:39.8836%;margin-top:-14.5px;left:41.6176%;width:55px;">
			<p class="v-pstyle0">Bolivia</p>
		</div>
		<div id="v-ai5-14" class="v-small v-aiAbs v-aiPointText" style="top:45.0976%;margin-top:-7.5px;left:44.2385%;width:49px;">
			<p class="v-pstyle0">Chile</p>
		</div>
		<div id="v-ai5-15" class="v-small v-aiAbs v-aiPointText" style="top:51.3118%;margin-top:-7.5px;left:82.7269%;width:64px;">
			<p class="v-pstyle0">Uruguay</p>
		</div>
		<div id="v-ai5-16" class="v-small v-aiAbs v-aiPointText" style="top:54.4955%;margin-top:-14.5px;left:55.9664%;width:71px;">
			<p class="v-pstyle0">Argentina</p>
		</div>
		<div id="v-ai5-17" class="v-small v-aiAbs v-aiPointText" style="top:67.9308%;margin-top:-9.5px;left:11.3747%;width:221px;">
			<p class="v-pstyle2">Vaccines in use as of March 2021</p>
		</div>
		<div id="v-ai5-18" class="v-small v-aiAbs v-aiPointText" style="top:77.4204%;margin-top:-43px;left:19.6611%;width:219px;">
			<p class="v-pstyle3">U.S.- and European-developed</p>
			<p class="v-pstyle3"> vaccines (Johnson & Johnson,</p>
			<p class="v-pstyle3"> Moderna, Oxford-AstraZeneca, </p>
			<p class="v-pstyle3">and Pfizer-BioNTech)</p>
		</div>
		<div id="v-ai5-19" class="v-small v-aiAbs v-aiPointText" style="top:85.7844%;margin-top:-17.8px;left:19.6611%;width:231px;">
			<p class="v-pstyle3">Chinese vaccines</p>
			<p class="v-pstyle3">(CanSino, Sinopharm, and Sinovac)</p>
		</div>
		<div id="v-ai5-20" class="v-small v-aiAbs v-aiPointText" style="top:94.0812%;margin-top:-26.2px;left:19.6611%;width:118px;">
			<p class="v-pstyle3">Russian vaccine</p>
			<p class="v-pstyle3">(Sputnik)</p>
		</div>
	</div>

</div>
</div>
  <div class='relative float-left pl-15px pb-15px hidden '>
    <div id="note" class="v-annotation" style="bottom:15px;">
  </div>
  </div>
  <div class=' v-footer  '>
    <div class='v-logo-brown'></div>
    <div class='src ' style='top: -6px;position: absolute;margin-right: 80px;'>
      <span class='v-source'><span id='psource' class='v-source italic'></span>&nbsp;
      <span id='vsource' class='v-source'></span></span>
    </div>
  </div>
</div>
`
let container = document.getElementById('vaccine-south-america')
container.insertAdjacentHTML("afterbegin", graphic)

document.querySelector('#vaccine-south-america .v-title').innerHTML = title
document.querySelector('#vaccine-south-america .v-subhead').innerHTML = subhead
document.querySelector('#vaccine-south-america #psource').innerHTML = psourcetext
document.querySelector('#vaccine-south-america #vsource').innerHTML = sourcetext
