/* eslint-disable *//* eslint-disable */
import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';
import img_small from './ai2html-output/vaccine_infographic-small.png'
import img_medium from './ai2html-output/vaccine_infographic-medium.png'
import img_large from './ai2html-output/vaccine_infographic-large.png'
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

var title = 'The Vaccine Production Process'
var subhead = ''
var psourcetext = 'Sources:'
var sourcetext = "<span class='font-lei'>New York Times</span>; Johns Hopkins University. "


let graphic =`<div class='vallenato relative'>
  <div class='v-header '>
    <div class='v-title'>title</div>
    <div class='v-subhead'>subhead</div>
  </div>
  <!--where the graphic is placed, id should be folder name-->
  <div id='v-vaccine_infographic' class='chartDiv relative pb-25px'><div id="v-vaccine_infographic-box" class="ai2html" data-vheader="true" data-notes="" data-vfooter="true" data-title="The Vaccine Production Process" data-subhead="" data-sources="<span class='font-lei'>New York Times</span>; Johns Hopkins University. " data-type="chart" data-sizes="small,medium,large">

	<!-- Artboard: large -->
	<div id="v-vaccine_infographic-large" class="v-artboard" style="width:680px; height:443.6853351568px;" data-aspect-ratio="1.533" data-min-width="680">
<div style=""></div>
		<img id="v-vaccine_infographic-large-img" class="v-aiImg" alt="An infographic showing the six phases of the vaccine production process, explaining how the normal timeline is 8 to 15 years and the timeline for a COVID-19 vaccine is 12 to 18 months." src="` + img_large + `"/>
		<div id="v-ai1-1" class="v-Layer_1 v-aiAbs" style="top:-7.8885%;left:2.154%;width:48.3824%;">
			<p class="v-pstyle0">The Vaccine Production Process</p>
		</div>
		<div id="v-ai1-2" class="v-Layer_1 v-aiAbs" style="top:0.2254%;left:2.154%;width:42.3529%;">
			<p class="v-pstyle1">Normal vaccine production timeline:  8&ndash;15 years</p>
		</div>
		<div id="v-ai1-3" class="v-Layer_1 v-aiAbs" style="top:4.7331%;left:2.154%;width:46.0294%;">
			<p>COVID-19 vaccine production timeline: 12&ndash;18 months*</p>
		</div>
		<div id="v-ai1-4" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:19.2879%;margin-top:-9.6px;left:63.7331%;width:95px;">
			<p class="v-pstyle2">4. Approval</p>
		</div>
		<div id="v-ai1-5" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:19.2879%;margin-top:-9.6px;left:18.3737%;width:91px;">
			<p class="v-pstyle2">1. Research</p>
		</div>
		<div id="v-ai1-6" class="v-Layer_1 v-aiAbs" style="top:21.637%;left:18.3741%;width:30.4412%;">
			<p class="v-pstyle1">Normal: 2&ndash;4 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai1-7" class="v-Layer_1 v-aiAbs" style="top:22.7639%;left:63.7334%;width:30.4412%;">
			<p class="v-pstyle1">Normal: 1 year</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai1-8" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:46.5595%;margin-top:-9.6px;left:18.621%;width:179px;">
			<p class="v-pstyle2">2. Preclinical preparation</p>
		</div>
		<div id="v-ai1-9" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:47.0103%;margin-top:-9.6px;left:63.8244%;width:128px;">
			<p class="v-pstyle2">5. Manufacturing</p>
		</div>
		<div id="v-ai1-10" class="v-Layer_1 v-aiAbs" style="top:49.1339%;left:18.6213%;width:30.4412%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai1-11" class="v-Layer_1 v-aiAbs" style="top:49.5847%;left:63.8249%;width:30.4412%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 3&ndash;6 months</p>
		</div>
		<div id="v-ai1-12" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:72.9295%;margin-top:-9.6px;left:63.7331%;width:112px;">
			<p class="v-pstyle2">6. Distribution</p>
		</div>
		<div id="v-ai1-13" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:72.9295%;margin-top:-9.6px;left:18.5208%;width:118px;">
			<p class="v-pstyle2">3. Clinical trials</p>
		</div>
		<div id="v-ai1-14" class="v-Layer_1 v-aiAbs" style="top:75.7293%;left:63.7334%;width:30.4412%;">
			<p class="v-pstyle1">Normal: 3&ndash;6 months</p>
			<p>Accelerated: 1 month</p>
		</div>
		<div id="v-ai1-15" class="v-Layer_1 v-aiAbs" style="top:75.9547%;left:18.5212%;width:30.4412%;">
			<p class="v-pstyle1">Normal: Up to 5 years</p>
			<p>Accelerated: 1.5 years</p>
		</div>
		<div id="v-ai1-16" class="v-Layer_1 v-aiAbs" style="top:95.1125%;left:2.154%;width:94.8529%;">
			<p class="v-pstyle3">*Under this accelerated timeline, development stages proceed simultaneously or overlap.</p>
		</div>
	</div>

	<!-- Artboard: medium -->
	<div id="v-vaccine_infographic-medium" class="v-artboard" style="width:550px; height:443.6853351568px;" data-aspect-ratio="1.24" data-min-width="550" data-max-width="679">
<div style=""></div>
		<img id="v-vaccine_infographic-medium-img" class="v-aiImg" alt="An infographic showing the six phases of the vaccine production process, explaining how the normal timeline is 8 to 15 years and the timeline for a COVID-19 vaccine is 12 to 18 months." src="` + img_medium + `"/>
		<div id="v-ai2-1" class="v-Layer_1 v-aiAbs" style="top:-7.8885%;left:2.6632%;width:59.8182%;">
			<p class="v-pstyle0">The Vaccine Production Process</p>
		</div>
		<div id="v-ai2-2" class="v-Layer_1 v-aiAbs" style="top:0.2254%;left:2.6632%;width:52.3636%;">
			<p class="v-pstyle1">Normal vaccine production timeline:  8&ndash;15 years</p>
		</div>
		<div id="v-ai2-3" class="v-Layer_1 v-aiAbs" style="top:4.7331%;left:2.6632%;width:60.3636%;">
			<p>COVID-19 vaccine production timeline: 12&ndash;18 months*</p>
		</div>
		<div id="v-ai2-4" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:19.2879%;margin-top:-9.6px;left:70.6154%;width:95px;">
			<p class="v-pstyle2">4. Approval</p>
		</div>
		<div id="v-ai2-5" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:19.2879%;margin-top:-9.6px;left:19.4439%;width:91px;">
			<p class="v-pstyle2">1. Research</p>
		</div>
		<div id="v-ai2-6" class="v-Layer_1 v-aiAbs" style="top:21.637%;left:19.4444%;width:38.9091%;">
			<p class="v-pstyle1">Normal: 2&ndash;4 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai2-7" class="v-Layer_1 v-aiAbs" style="top:22.7639%;left:70.6159%;width:37.6364%;">
			<p class="v-pstyle1">Normal: 1 year</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai2-8" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:46.5595%;margin-top:-9.6px;left:19.7496%;width:179px;">
			<p class="v-pstyle2">2. Preclinical preparation</p>
		</div>
		<div id="v-ai2-9" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:47.0103%;margin-top:-9.6px;left:70.7283%;width:128px;">
			<p class="v-pstyle2">5. Manufacturing</p>
		</div>
		<div id="v-ai2-10" class="v-Layer_1 v-aiAbs" style="top:49.1339%;left:19.75%;width:38.9091%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai2-11" class="v-Layer_1 v-aiAbs" style="top:49.5847%;left:70.7289%;width:37.6364%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 3&ndash;6 months</p>
		</div>
		<div id="v-ai2-12" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:72.9295%;margin-top:-9.6px;left:70.6154%;width:112px;">
			<p class="v-pstyle2">6. Distribution</p>
		</div>
		<div id="v-ai2-13" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:72.9295%;margin-top:-9.6px;left:19.6257%;width:118px;">
			<p class="v-pstyle2">3. Clinical trials</p>
		</div>
		<div id="v-ai2-14" class="v-Layer_1 v-aiAbs" style="top:75.7293%;left:70.6159%;width:37.6364%;">
			<p class="v-pstyle1">Normal: 3&ndash;6 months</p>
			<p>Accelerated: 1 month</p>
		</div>
		<div id="v-ai2-15" class="v-Layer_1 v-aiAbs" style="top:75.9547%;left:19.6262%;width:38.9091%;">
			<p class="v-pstyle1">Normal: Up to 5 years</p>
			<p>Accelerated: 1.5 years</p>
		</div>
		<div id="v-ai2-16" class="v-Layer_1 v-aiAbs" style="top:95.1125%;left:2.6632%;width:94.5455%;">
			<p class="v-pstyle3">*Under this accelerated timeline, development stages proceed simultaneously or overlap.</p>
		</div>
	</div>

	<!-- Artboard: small -->
	<div id="v-vaccine_infographic-small" class="v-artboard" style="max-width: 360px;max-height: 913px" data-aspect-ratio="0.394" data-min-width="0" data-max-width="549">
<div style="padding: 0 0 253.4887% 0;"></div>
		<img id="v-vaccine_infographic-small-img" class="v-aiImg" alt="An infographic showing the six phases of the vaccine production process, explaining how the normal timeline is 8 to 15 years and the timeline for a COVID-19 vaccine is 12 to 18 months." src="` + img_small + `"/>
		<div id="v-ai3-1" class="v-Layer_1 v-aiAbs" style="top:-4.3148%;left:4.5773%;width:102.8125%;">
			<p class="v-pstyle0">The Vaccine Production Process</p>
		</div>
		<div id="v-ai3-2" class="v-Layer_1 v-aiAbs" style="top:0.1233%;left:4.5773%;width:90%;">
			<p class="v-pstyle1">Normal vaccine production timeline:  8&ndash;15 years</p>
		</div>
		<div id="v-ai3-3" class="v-Layer_1 v-aiAbs" style="top:2.5889%;left:4.5773%;width:103.4375%;">
			<p>COVID-19 vaccine production timeline: 12&ndash;18 months*</p>
		</div>
		<div id="v-ai3-4" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:10.9198%;margin-top:-9.6px;left:40.2016%;width:91px;">
			<p class="v-pstyle2">1. Research</p>
		</div>
		<div id="v-ai3-5" class="v-Layer_1 v-aiAbs" style="top:12.2047%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: 2&ndash;4 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai3-6" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:25.3435%;margin-top:-9.6px;left:40.2016%;width:179px;">
			<p class="v-pstyle2">2. Preclinical preparation</p>
		</div>
		<div id="v-ai3-7" class="v-Layer_1 v-aiAbs" style="top:26.875%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai3-8" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:39.7673%;margin-top:-9.6px;left:40.2016%;width:118px;">
			<p class="v-pstyle2">3. Clinical trials</p>
		</div>
		<div id="v-ai3-9" class="v-Layer_1 v-aiAbs" style="top:41.5452%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: Up to 5 years</p>
			<p>Accelerated: 1.5 years</p>
		</div>
		<div id="v-ai3-10" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:54.191%;margin-top:-9.6px;left:40.2016%;width:95px;">
			<p class="v-pstyle2">4. Approval</p>
		</div>
		<div id="v-ai3-11" class="v-Layer_1 v-aiAbs" style="top:56.2155%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: 1 year</p>
			<p>Accelerated: 6 months</p>
		</div>
		<div id="v-ai3-12" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:69.1078%;margin-top:-9.6px;left:40.2016%;width:128px;">
			<p class="v-pstyle2">5. Manufacturing</p>
		</div>
		<div id="v-ai3-13" class="v-Layer_1 v-aiAbs" style="top:70.3927%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: 2 years</p>
			<p>Accelerated: 3&ndash;6 months</p>
		</div>
		<div id="v-ai3-14" class="v-Layer_1 v-aiAbs v-aiPointText" style="top:83.5315%;margin-top:-9.6px;left:40.2016%;width:112px;">
			<p class="v-pstyle2">6. Distribution</p>
		</div>
		<div id="v-ai3-15" class="v-Layer_1 v-aiAbs" style="top:85.063%;left:40.2023%;width:55%;">
			<p class="v-pstyle1">Normal: 3&ndash;6 months</p>
			<p>Accelerated: 1 month</p>
		</div>
		<div id="v-ai3-16" class="v-Layer_1 v-aiAbs" style="top:94.9253%;left:4.5773%;width:90.3125%;">
			<p class="v-pstyle3">*Under this accelerated timeline, development stages proceed simultaneously or overlap.</p>
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
let container = document.getElementById('vaccine_infographic')
container.insertAdjacentHTML("afterbegin", graphic)

document.querySelector('#vaccine_infographic .v-title').innerHTML = title
document.querySelector('#vaccine_infographic .v-subhead').innerHTML = subhead
document.querySelector('#vaccine_infographic #psource').innerHTML = psourcetext
document.querySelector('#vaccine_infographic #vsource').innerHTML = sourcetext
