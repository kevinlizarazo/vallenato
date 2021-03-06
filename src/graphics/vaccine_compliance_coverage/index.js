/* eslint-disable *//* eslint-disable */
import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';
import img_small from './ai2html-output/vaccine_compliance_coverage-small.png'
import img_medium from './ai2html-output/vaccine_compliance_coverage-medium.png'
import img_large from './ai2html-output/vaccine_compliance_coverage-large.png'
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

var title = 'Global Vaccine Coverage Has Stalled in Recent Years'
var subhead = 'Percentage of one-year-olds with immunizations, selected vaccines'
var psourcetext = 'Source'
var sourcetext = 'World Health Organization, compiled by Our World in Data. '


let graphic =`<div class='vallenato relative'>
  <div class='v-header '>
    <div class='v-title'>title</div>
    <div class='v-subhead'>subhead</div>
  </div>
  <!--where the graphic is placed, id should be folder name-->
  <div id='v-vaccine_compliance_coverage' class='chartDiv relative pb-25px'><div id="v-vaccine_compliance_coverage-box" class="ai2html" data-vheader="true" data-notes="*Data represents immunization coverage by the nationally recommended age." data-vfooter="true" data-title="Global Vaccine Coverage Has Stalled in Recent Years" data-subhead="Percentage of one-year-olds with immunizations, selected vaccines" data-sources="World Health Organization, compiled by Our World in Data. " data-type="chart" data-sizes="small,medium,large">

	<!-- Artboard: large -->
	<div id="v-vaccine_compliance_coverage-large" class="v-artboard" style="width:680px; height:443.634085755897px;" data-aspect-ratio="1.533" data-min-width="680">
<div style=""></div>
		<img id="v-vaccine_compliance_coverage-large-img" class="v-aiImg" alt="" src="` + img_large + `"/>
		<div id="v-ai0-1" class="v-chart v-aiAbs v-aiPointText" style="top:4.0136%;margin-top:-8.8px;right:93.1419%;width:52px;">
			<p class="v-pstyle0">100%</p>
		</div>
		<div id="v-ai0-2" class="v-chart v-aiAbs v-aiPointText" style="top:10.0998%;margin-top:-8.8px;left:77.3505%;width:131px;">
			<p class="v-pstyle1">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai0-3" class="v-chart v-aiAbs v-aiPointText" style="top:10.0998%;margin-top:-8.8px;left:77.3505%;width:131px;">
			<p class="v-pstyle2">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai0-4" class="v-chart v-aiAbs v-aiPointText" style="top:13.03%;margin-top:-8.8px;right:93.2023%;width:47px;">
			<p class="v-pstyle0">90%</p>
		</div>
		<div id="v-ai0-5" class="v-chart v-aiAbs v-aiPointText" style="top:21.8212%;margin-top:-8.8px;right:93.2023%;width:47px;">
			<p class="v-pstyle0">80%</p>
		</div>
		<div id="v-ai0-6" class="v-chart v-aiAbs v-aiPointText" style="top:24.977%;margin-top:-8.8px;left:49.0487%;width:85px;">
			<p class="v-pstyle1">Polio (Pol3)</p>
		</div>
		<div id="v-ai0-7" class="v-chart v-aiAbs v-aiPointText" style="top:24.977%;margin-top:-8.8px;left:49.0487%;width:85px;">
			<p class="v-pstyle3">Polio (Pol3)</p>
		</div>
		<div id="v-ai0-8" class="v-chart v-aiAbs v-aiPointText" style="top:31.9195%;margin-top:-16.6px;left:77.2034%;width:90px;">
			<p class="v-pstyle1">Hepatitus B </p>
			<p class="v-pstyle1">(HepB3)</p>
		</div>
		<div id="v-ai0-9" class="v-chart v-aiAbs v-aiPointText" style="top:31.9195%;margin-top:-16.6px;left:77.2034%;width:87px;">
			<p class="v-pstyle4">Hepatitis B </p>
			<p class="v-pstyle4">(HepB3)</p>
		</div>
		<div id="v-ai0-10" class="v-chart v-aiAbs v-aiPointText" style="top:30.8376%;margin-top:-8.8px;right:93.0896%;width:47px;">
			<p class="v-pstyle0">70%</p>
		</div>
		<div id="v-ai0-11" class="v-chart v-aiAbs v-aiPointText" style="top:34.3991%;margin-top:-16.6px;left:48.9827%;width:159px;">
			<p class="v-pstyle1">Diphtheria, tetanus, and </p>
			<p class="v-pstyle1">pertussis (DTP3)</p>
		</div>
		<div id="v-ai0-12" class="v-chart v-aiAbs v-aiPointText" style="top:34.3991%;margin-top:-16.6px;left:48.9827%;width:159px;">
			<p class="v-pstyle5">Diphtheria, tetanus, and </p>
			<p class="v-pstyle5">pertussis (DTP3)</p>
		</div>
		<div id="v-ai0-13" class="v-chart v-aiAbs v-aiPointText" style="top:39.8539%;margin-top:-8.8px;right:93.2023%;width:47px;">
			<p class="v-pstyle0">60%</p>
		</div>
		<div id="v-ai0-14" class="v-chart v-aiAbs v-aiPointText" style="top:48.8704%;margin-top:-8.8px;right:93.1775%;width:47px;">
			<p class="v-pstyle0">50%</p>
		</div>
		<div id="v-ai0-15" class="v-chart v-aiAbs v-aiPointText" style="top:59.4197%;margin-top:-16.6px;left:77.2034%;width:71px;">
			<p class="v-pstyle1">Measles </p>
			<p class="v-pstyle1">(MCV2)*</p>
		</div>
		<div id="v-ai0-16" class="v-chart v-aiAbs v-aiPointText" style="top:59.4197%;margin-top:-16.6px;left:77.2034%;width:71px;">
			<p class="v-pstyle6">Measles </p>
			<p class="v-pstyle6">(MCV2)*</p>
		</div>
		<div id="v-ai0-17" class="v-chart v-aiAbs v-aiPointText" style="top:57.8868%;margin-top:-8.8px;right:93.1928%;width:47px;">
			<p class="v-pstyle0">40%</p>
		</div>
		<div id="v-ai0-18" class="v-chart v-aiAbs v-aiPointText" style="top:66.678%;margin-top:-8.8px;right:93.1756%;width:47px;">
			<p class="v-pstyle0">30%</p>
		</div>
		<div id="v-ai0-19" class="v-chart v-aiAbs v-aiPointText" style="top:74.973%;margin-top:-16.6px;left:77.2034%;width:77px;">
			<p class="v-pstyle1">Rotavirus </p>
			<p class="v-pstyle1">(RotaC)</p>
		</div>
		<div id="v-ai0-20" class="v-chart v-aiAbs v-aiPointText" style="top:74.973%;margin-top:-16.6px;left:77.2034%;width:77px;">
			<p class="v-pstyle7">Rotavirus </p>
			<p class="v-pstyle7">(RotaC)</p>
		</div>
		<div id="v-ai0-21" class="v-chart v-aiAbs v-aiPointText" style="top:75.6944%;margin-top:-8.8px;right:93.0896%;width:47px;">
			<p class="v-pstyle0">20%</p>
		</div>
		<div id="v-ai0-22" class="v-chart v-aiAbs v-aiPointText" style="top:84.7107%;margin-top:-8.8px;right:93.1065%;width:45px;">
			<p class="v-pstyle0">10%</p>
		</div>
		<div id="v-ai0-23" class="v-chart v-aiAbs v-aiPointText" style="top:93.7272%;margin-top:-8.8px;right:93.188%;width:40px;">
			<p class="v-pstyle0">0%</p>
		</div>
		<div id="v-ai0-24" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:9.7565%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1980</p>
		</div>
		<div id="v-ai0-25" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:20.9791%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1985</p>
		</div>
		<div id="v-ai0-26" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:32.1558%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1990</p>
		</div>
		<div id="v-ai0-27" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:43.3783%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1995</p>
		</div>
		<div id="v-ai0-28" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:54.5423%;margin-left:-25px;width:50px;">
			<p class="v-pstyle8">2000</p>
		</div>
		<div id="v-ai0-29" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:65.7649%;margin-left:-25px;width:50px;">
			<p class="v-pstyle8">2005</p>
		</div>
		<div id="v-ai0-30" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:76.9266%;margin-left:-23.5px;width:47px;">
			<p class="v-pstyle8">2010</p>
		</div>
		<div id="v-ai0-31" class="v-chart v-aiAbs v-aiPointText" style="top:96.6575%;margin-top:-8.8px;left:88.1491%;margin-left:-23.5px;width:47px;">
			<p class="v-pstyle8">2015</p>
		</div>
	</div>

	<!-- Artboard: medium -->
	<div id="v-vaccine_compliance_coverage-medium" class="v-artboard" style="width:550px; height:442.378066844321px;" data-aspect-ratio="1.243" data-min-width="550" data-max-width="679">
<div style=""></div>
		<img id="v-vaccine_compliance_coverage-medium-img" class="v-aiImg" alt="" src="` + img_medium + `"/>
		<div id="v-ai1-1" class="v-chart v-aiAbs v-aiPointText" style="top:3.799%;margin-top:-8.8px;right:91.8517%;width:52px;">
			<p class="v-pstyle0">100%</p>
		</div>
		<div id="v-ai1-2" class="v-chart v-aiAbs v-aiPointText" style="top:9.9024%;margin-top:-8.8px;left:75.6506%;width:131px;">
			<p class="v-pstyle1">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai1-3" class="v-chart v-aiAbs v-aiPointText" style="top:9.9024%;margin-top:-8.8px;left:72.7617%;width:131px;">
			<p class="v-pstyle2">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai1-4" class="v-chart v-aiAbs v-aiPointText" style="top:12.8411%;margin-top:-8.8px;right:91.9265%;width:47px;">
			<p class="v-pstyle0">90%</p>
		</div>
		<div id="v-ai1-5" class="v-chart v-aiAbs v-aiPointText" style="top:21.8831%;margin-top:-8.8px;right:91.9265%;width:47px;">
			<p class="v-pstyle0">80%</p>
		</div>
		<div id="v-ai1-6" class="v-chart v-aiAbs v-aiPointText" style="top:24.5957%;margin-top:-8.8px;left:47.6385%;width:85px;">
			<p class="v-pstyle1">Polio (Pol3)</p>
		</div>
		<div id="v-ai1-7" class="v-chart v-aiAbs v-aiPointText" style="top:24.8218%;margin-top:-8.8px;left:47.6385%;width:85px;">
			<p class="v-pstyle3">Polio (Pol3)</p>
		</div>
		<div id="v-ai1-8" class="v-chart v-aiAbs v-aiPointText" style="top:32.0102%;margin-top:-16.6px;left:75.5098%;width:90px;">
			<p class="v-pstyle1">Hepatitus B </p>
			<p class="v-pstyle1">(HepB3)</p>
		</div>
		<div id="v-ai1-9" class="v-chart v-aiAbs v-aiPointText" style="top:32.0102%;margin-top:-16.6px;left:75.5098%;width:87px;">
			<p class="v-pstyle4">Hepatitis B </p>
			<p class="v-pstyle4">(HepB3)</p>
		</div>
		<div id="v-ai1-10" class="v-chart v-aiAbs v-aiPointText" style="top:30.6991%;margin-top:-8.8px;right:91.7868%;width:47px;">
			<p class="v-pstyle0">70%</p>
		</div>
		<div id="v-ai1-11" class="v-chart v-aiAbs v-aiPointText" style="top:34.2707%;margin-top:-16.6px;left:43.0297%;width:159px;">
			<p class="v-pstyle1">Diphtheria, tetanus, and </p>
			<p class="v-pstyle1">pertussis (DTP3)</p>
		</div>
		<div id="v-ai1-12" class="v-chart v-aiAbs v-aiPointText" style="top:34.2707%;margin-top:-16.6px;left:42.8475%;width:159px;">
			<p class="v-pstyle5">Diphtheria, tetanus, and </p>
			<p class="v-pstyle5">pertussis (DTP3)</p>
		</div>
		<div id="v-ai1-13" class="v-chart v-aiAbs v-aiPointText" style="top:39.7412%;margin-top:-8.8px;right:91.9265%;width:47px;">
			<p class="v-pstyle0">60%</p>
		</div>
		<div id="v-ai1-14" class="v-chart v-aiAbs v-aiPointText" style="top:48.7832%;margin-top:-8.8px;right:91.8956%;width:47px;">
			<p class="v-pstyle0">50%</p>
		</div>
		<div id="v-ai1-15" class="v-chart v-aiAbs v-aiPointText" style="top:59.3623%;margin-top:-16.6px;left:75.5098%;width:71px;">
			<p class="v-pstyle1">Measles </p>
			<p class="v-pstyle1">(MCV2)*</p>
		</div>
		<div id="v-ai1-16" class="v-chart v-aiAbs v-aiPointText" style="top:59.3623%;margin-top:-16.6px;left:75.5098%;width:71px;">
			<p class="v-pstyle6">Measles </p>
			<p class="v-pstyle6">(MCV2)*</p>
		</div>
		<div id="v-ai1-17" class="v-chart v-aiAbs v-aiPointText" style="top:57.8252%;margin-top:-8.8px;right:91.9146%;width:47px;">
			<p class="v-pstyle0">40%</p>
		</div>
		<div id="v-ai1-18" class="v-chart v-aiAbs v-aiPointText" style="top:66.8673%;margin-top:-8.8px;right:91.8933%;width:47px;">
			<p class="v-pstyle0">30%</p>
		</div>
		<div id="v-ai1-19" class="v-chart v-aiAbs v-aiPointText" style="top:74.9599%;margin-top:-16.6px;left:74.0552%;width:77px;">
			<p class="v-pstyle1">Rotavirus </p>
			<p class="v-pstyle1">(RotaC)</p>
		</div>
		<div id="v-ai1-20" class="v-chart v-aiAbs v-aiPointText" style="top:74.9599%;margin-top:-16.6px;left:73.8311%;width:77px;">
			<p class="v-pstyle7">Rotavirus </p>
			<p class="v-pstyle7">(RotaC)</p>
		</div>
		<div id="v-ai1-21" class="v-chart v-aiAbs v-aiPointText" style="top:75.6833%;margin-top:-8.8px;right:91.7868%;width:47px;">
			<p class="v-pstyle0">20%</p>
		</div>
		<div id="v-ai1-22" class="v-chart v-aiAbs v-aiPointText" style="top:84.7253%;margin-top:-8.8px;right:91.8079%;width:45px;">
			<p class="v-pstyle0">10%</p>
		</div>
		<div id="v-ai1-23" class="v-chart v-aiAbs v-aiPointText" style="top:93.7673%;margin-top:-8.8px;right:91.9087%;width:40px;">
			<p class="v-pstyle0">0%</p>
		</div>
		<div id="v-ai1-24" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:10.9219%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1980</p>
		</div>
		<div id="v-ai1-25" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:21.6754%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1985</p>
		</div>
		<div id="v-ai1-26" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:32.3723%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1990</p>
		</div>
		<div id="v-ai1-27" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:43.1261%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1995</p>
		</div>
		<div id="v-ai1-28" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:53.8074%;margin-left:-25px;width:50px;">
			<p class="v-pstyle8">2000</p>
		</div>
		<div id="v-ai1-29" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:64.5609%;margin-left:-25px;width:50px;">
			<p class="v-pstyle8">2005</p>
		</div>
		<div id="v-ai1-30" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:75.2393%;margin-left:-23.5px;width:47px;">
			<p class="v-pstyle8">2010</p>
		</div>
		<div id="v-ai1-31" class="v-chart v-aiAbs v-aiPointText" style="top:96.706%;margin-top:-8.8px;left:85.9927%;margin-left:-23.5px;width:47px;">
			<p class="v-pstyle8">2015</p>
		</div>
	</div>

	<!-- Artboard: small -->
	<div id="v-vaccine_compliance_coverage-small" class="v-artboard" style="max-width: 360px;max-height: 500px" data-aspect-ratio="0.721" data-min-width="0" data-max-width="549">
<div style="padding: 0 0 138.7683% 0;"></div>
		<img id="v-vaccine_compliance_coverage-small-img" class="v-aiImg" alt="" src="` + img_small + `"/>
		<div id="v-ai2-1" class="v-chart v-aiAbs v-aiPointText" style="top:4.0099%;margin-top:-8.8px;right:86.9028%;width:52px;">
			<p class="v-pstyle0">100%</p>
		</div>
		<div id="v-ai2-2" class="v-chart v-aiAbs v-aiPointText" style="top:10.0901%;margin-top:-8.8px;left:54.7482%;width:131px;">
			<p class="v-pstyle1">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai2-3" class="v-chart v-aiAbs v-aiPointText" style="top:10.0901%;margin-top:-8.8px;left:54.7482%;width:131px;">
			<p class="v-pstyle2">Tuberculosis (BCG)</p>
		</div>
		<div id="v-ai2-4" class="v-chart v-aiAbs v-aiPointText" style="top:22.0255%;margin-top:-8.8px;right:87.0312%;width:47px;">
			<p class="v-pstyle0">80%</p>
		</div>
		<div id="v-ai2-5" class="v-chart v-aiAbs v-aiPointText" style="top:26.4843%;margin-top:-16.6px;left:79.6106%;width:90px;">
			<p class="v-pstyle1">Hepatitus B </p>
			<p class="v-pstyle1">(HepB3)</p>
		</div>
		<div id="v-ai2-6" class="v-chart v-aiAbs v-aiPointText" style="top:24.9531%;margin-top:-8.8px;left:39.3173%;width:85px;">
			<p class="v-pstyle1">Polio (Pol3)</p>
		</div>
		<div id="v-ai2-7" class="v-chart v-aiAbs v-aiPointText" style="top:24.9531%;margin-top:-8.8px;left:39.3314%;width:85px;">
			<p class="v-pstyle3">Polio (Pol3)</p>
		</div>
		<div id="v-ai2-8" class="v-chart v-aiAbs v-aiPointText" style="top:26.9347%;margin-top:-16.6px;left:79.4153%;width:87px;">
			<p class="v-pstyle4">Hepatitis B </p>
			<p class="v-pstyle4">(HepB3)</p>
		</div>
		<div id="v-ai2-9" class="v-chart v-aiAbs v-aiPointText" style="top:36.348%;margin-top:-24.4px;left:34.4303%;width:132px;">
			<p class="v-pstyle1">Diphtheria, tetanus,</p>
			<p class="v-pstyle1"> and pertusis </p>
			<p class="v-pstyle1">(DTP3)</p>
		</div>
		<div id="v-ai2-10" class="v-chart v-aiAbs v-aiPointText" style="top:36.1228%;margin-top:-24.4px;left:34.556%;width:132px;">
			<p class="v-pstyle5">Diphtheria, tetanus,</p>
			<p class="v-pstyle5">and pertussis </p>
			<p class="v-pstyle5">(DTP3)</p>
		</div>
		<div id="v-ai2-11" class="v-chart v-aiAbs v-aiPointText" style="top:39.816%;margin-top:-8.8px;right:87.0312%;width:47px;">
			<p class="v-pstyle0">60%</p>
		</div>
		<div id="v-ai2-12" class="v-chart v-aiAbs v-aiPointText" style="top:53.2826%;margin-top:-16.6px;left:77.7081%;width:71px;">
			<p class="v-pstyle1">Measles </p>
			<p class="v-pstyle1">(MCV2)*</p>
		</div>
		<div id="v-ai2-13" class="v-chart v-aiAbs v-aiPointText" style="top:53.2826%;margin-top:-16.6px;left:77.9932%;width:71px;">
			<p class="v-pstyle6">Measles </p>
			<p class="v-pstyle6">(MCV2)*</p>
		</div>
		<div id="v-ai2-14" class="v-chart v-aiAbs v-aiPointText" style="top:57.8316%;margin-top:-8.8px;right:87.0108%;width:47px;">
			<p class="v-pstyle0">40%</p>
		</div>
		<div id="v-ai2-15" class="v-chart v-aiAbs v-aiPointText" style="top:75.8473%;margin-top:-8.8px;right:86.7914%;width:47px;">
			<p class="v-pstyle0">20%</p>
		</div>
		<div id="v-ai2-16" class="v-chart v-aiAbs v-aiPointText" style="top:80.5313%;margin-top:-16.6px;left:63.2144%;width:77px;">
			<p class="v-pstyle1">Rotavirus </p>
			<p class="v-pstyle1">(RotaC)</p>
		</div>
		<div id="v-ai2-17" class="v-chart v-aiAbs v-aiPointText" style="top:80.5313%;margin-top:-16.6px;left:63.0194%;width:77px;">
			<p class="v-pstyle7">Rotavirus </p>
			<p class="v-pstyle7">(RotaC)</p>
		</div>
		<div id="v-ai2-18" class="v-chart v-aiAbs v-aiPointText" style="top:93.6377%;margin-top:-8.8px;right:87.0007%;width:40px;">
			<p class="v-pstyle0">0%</p>
		</div>
		<div id="v-ai2-19" class="v-chart v-aiAbs v-aiPointText" style="top:96.5652%;margin-top:-8.8px;left:15.6595%;margin-left:-24px;width:48px;">
			<p class="v-pstyle8">1980</p>
		</div>
		<div id="v-ai2-20" class="v-chart v-aiAbs v-aiPointText" style="top:96.5652%;margin-top:-8.8px;left:85.2258%;margin-left:-23.5px;width:47px;">
			<p class="v-pstyle8">2015</p>
		</div>
	</div>

</div>
</div>
  <div class='relative float-left pl-15px pb-15px  '>
    <div id="note" class="v-annotation" style="bottom:15px;">*Data represents immunization coverage by the nationally recommended age.
  </div>
  </div>
  <div class=' v-footer  '>
    <div class='v-logo-brown'></div>
    <div class='src ' style='top: -6px;position: absolute;margin-right: 80px;'>
      <span class='v-source'><span id='psource' class='v-source italic'></span> : <span id='vsource' class='v-source'></span></span>
    </div>
  </div>
</div>
`
let container = document.getElementById('vaccine_compliance_coverage')
container.insertAdjacentHTML("afterbegin", graphic)

document.querySelector('#vaccine_compliance_coverage .v-title').innerHTML = title
document.querySelector('#vaccine_compliance_coverage .v-subhead').innerHTML = subhead
document.querySelector('#vaccine_compliance_coverage #psource').innerHTML = psourcetext
document.querySelector('#vaccine_compliance_coverage #vsource').innerHTML = sourcetext
