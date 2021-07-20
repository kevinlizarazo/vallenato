/* eslint-disable *//* eslint-disable */
import '../../common/styles/styles.scss';
import '../../common/styles/fonts.scss';
import './styles.scss';
import img_small from './ai2html-output/vaccine_all_candidates_chart-small.png'
import img_medium from './ai2html-output/vaccine_all_candidates_chart-medium.png'
import img_large from './ai2html-output/vaccine_all_candidates_chart-large.png'
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

var title = 'COVID-19 Vaccine Candidates'
var subhead = 'Vaccines in clinical trials as of December 18, 2020'
var psourcetext = 'Sources'
var sourcetext = '<span class="font-lei">New York Times</span>; Policy Cures Research; U.S. National Institutes of Health. '


let graphic =`<div class='vallenato relative'>
  <div class='v-header '>
    <div class='v-title'>title</div>
    <div class='v-subhead'>subhead</div>
  </div>
  <!--where the graphic is placed, id should be folder name-->
  <div id='v-vaccine_all_candidates_chart' class='chartDiv relative pb-25px'><div id="v-vaccine_all_candidates_chart-box" class="ai2html" data-vheader="true" data-notes="" data-vfooter="true" data-title="COVID-19 Vaccine Candidates" data-subhead="Vaccines in clinical trials as of December 18, 2020" data-sources="<span class='font-lei'>New York Times</span>; Policy Cures Research; U.S. National Institutes of Health. " data-type="chart" data-sizes="small,medium,large">

	<!-- Artboard: medium -->
	<div id="v-vaccine_all_candidates_chart-medium" class="v-artboard" style="width:550px; height:1834.5743950073px;" data-aspect-ratio="0.3" data-min-width="550" data-max-width="679">
<div style=""></div>
		<img id="v-vaccine_all_candidates_chart-medium-img" class="v-aiImg" alt="A list of the COVID-19 vaccine candidates, showing China with the most candidates approved and the most in phase 3 trials." src="` + img_medium + `"/>
		<div id="v-ai0-1" class="v-map v-aiAbs" style="top:-0.0545%;left:46.5693%;width:49.2727%;">
			<p class="v-pstyle0">Approved for general or limited use in at least one country</p>
		</div>
		<div id="v-ai0-2" class="v-map v-aiAbs v-aiPointText" style="top:0.6163%;margin-top:-8.3px;left:6.3778%;width:80px;">
			<p class="v-pstyle1">Complete</p>
		</div>
		<div id="v-ai0-3" class="v-map v-aiAbs v-aiPointText" style="top:0.6163%;margin-top:-8.3px;left:23.5563%;width:84px;">
			<p class="v-pstyle1">In progress</p>
		</div>
		<div id="v-ai0-4" class="v-map v-aiAbs v-aiPointText" style="top:3.0798%;margin-top:-8.5px;left:63.0714%;margin-left:-42.5px;width:85px;">
			<p class="v-pstyle2">Trial phase</p>
		</div>
		<div id="v-ai0-5" class="v-map v-aiAbs v-aiPointText" style="top:4.1154%;margin-top:-8.5px;left:2.9711%;width:84px;">
			<p class="v-pstyle3">Developer</p>
		</div>
		<div id="v-ai0-6" class="v-map v-aiAbs v-aiPointText" style="top:4.1048%;margin-top:-8.3px;left:52.6815%;width:26px;">
			<p class="v-pstyle4">1</p>
		</div>
		<div id="v-ai0-7" class="v-map v-aiAbs v-aiPointText" style="top:4.1048%;margin-top:-8.3px;left:62.475%;width:28px;">
			<p class="v-pstyle4">2</p>
		</div>
		<div id="v-ai0-8" class="v-map v-aiAbs v-aiPointText" style="top:4.1048%;margin-top:-8.3px;left:71.8146%;width:29px;">
			<p class="v-pstyle4">3</p>
		</div>
		<div id="v-ai0-9" class="v-map v-aiAbs v-aiPointText" style="top:4.1154%;margin-top:-8.5px;left:78.3848%;width:77px;">
			<p class="v-pstyle3">Approval</p>
		</div>
		<div id="v-ai0-10" class="v-map v-aiAbs v-aiPointText" style="top:5.6856%;margin-top:-17.3px;right:52.8423%;width:69px;">
			<p class="v-pstyle5">CanSino</p>
		</div>
		<div id="v-ai0-11" class="v-map v-aiAbs" style="top:5.2328%;left:2.9594%;width:17.0909%;">
			<p class="v-pstyle6">China</p>
		</div>
		<div id="v-ai0-12" class="v-map v-aiAbs v-aiPointText" style="top:6.7212%;margin-top:-17.3px;right:52.8416%;width:130px;">
			<p class="v-pstyle5">Sinopharm (Beijing)</p>
		</div>
		<div id="v-ai0-13" class="v-map v-aiAbs v-aiPointText" style="top:7.8114%;margin-top:-17.3px;right:52.8111%;width:132px;">
			<p class="v-pstyle5">Sinopharm (Wuhan)</p>
		</div>
		<div id="v-ai0-14" class="v-map v-aiAbs v-aiPointText" style="top:8.8471%;margin-top:-17.3px;right:52.8583%;width:66px;">
			<p class="v-pstyle5">Sinovac</p>
		</div>
		<div id="v-ai0-15" class="v-map v-aiAbs v-aiPointText" style="top:9.9372%;margin-top:-17.3px;right:52.7166%;width:146px;">
			<p class="v-pstyle5">Anhui Zhifei Longcom</p>
		</div>
		<div id="v-ai0-16" class="v-map v-aiAbs v-aiPointText" style="top:11.0274%;margin-top:-17.3px;right:52.767%;width:97px;">
			<p class="v-pstyle5">IMB at CAMS</p>
		</div>
		<div id="v-ai0-17" class="v-map v-aiAbs v-aiPointText" style="top:12.0631%;margin-top:-17.3px;right:52.7983%;width:60px;">
			<p class="v-pstyle5">Clover</p>
		</div>
		<div id="v-ai0-18" class="v-map v-aiAbs v-aiPointText" style="top:13.1532%;margin-top:-17.3px;right:52.7724%;width:126px;">
			<p class="v-pstyle5">Sichuan University</p>
		</div>
		<div id="v-ai0-19" class="v-map v-aiAbs v-aiPointText" style="top:14.1889%;margin-top:-17.3px;right:52.8519%;width:122px;">
			<p class="v-pstyle5">Shenzhen Kangtai</p>
		</div>
		<div id="v-ai0-20" class="v-map v-aiAbs v-aiPointText" style="top:15.2791%;margin-top:-17.3px;right:52.87%;width:157px;">
			<p class="v-pstyle5">Suzhou Abogen, Walvax</p>
		</div>
		<div id="v-ai0-21" class="v-map v-aiAbs v-aiPointText" style="top:16.3693%;margin-top:-17.3px;right:52.7781%;width:118px;">
			<p class="v-pstyle5">Wantai BioPharm</p>
		</div>
		<div id="v-ai0-22" class="v-map v-aiAbs v-aiPointText" style="top:18.4406%;margin-top:-17.3px;right:52.7191%;width:79px;">
			<p class="v-pstyle5">Gamaleya</p>
		</div>
		<div id="v-ai0-23" class="v-map v-aiAbs" style="top:18.0423%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Russia</p>
		</div>
		<div id="v-ai0-24" class="v-map v-aiAbs v-aiPointText" style="top:19.4762%;margin-top:-17.3px;right:52.859%;width:110px;">
			<p class="v-pstyle5">Vector Institute</p>
		</div>
		<div id="v-ai0-25" class="v-map v-aiAbs v-aiPointText" style="top:20.6209%;margin-top:-17.3px;right:52.8054%;width:125px;">
			<p class="v-pstyle5">Chumakov Center</p>
		</div>
		<div id="v-ai0-26" class="v-map v-aiAbs" style="top:22.3485%;left:2.9594%;width:17.0909%;">
			<p class="v-pstyle6">United States</p>
		</div>
		<div id="v-ai0-27" class="v-map v-aiAbs v-aiPointText" style="top:22.8013%;margin-top:-17.3px;right:52.7582%;width:74px;">
			<p class="v-pstyle5">Moderna</p>
		</div>
		<div id="v-ai0-28" class="v-map v-aiAbs v-aiPointText" style="top:23.8914%;margin-top:-17.3px;right:52.7567%;width:132px;">
			<p class="v-pstyle5">Johnson & Johnson</p>
		</div>
		<div id="v-ai0-29" class="v-map v-aiAbs v-aiPointText" style="top:24.9271%;margin-top:-17.3px;right:52.8239%;width:71px;">
			<p class="v-pstyle5">Novavax</p>
		</div>
		<div id="v-ai0-30" class="v-map v-aiAbs v-aiPointText" style="top:25.9628%;margin-top:-17.3px;right:52.7528%;width:57px;">
			<p class="v-pstyle5">Inovio</p>
		</div>
		<div id="v-ai0-31" class="v-map v-aiAbs v-aiPointText" style="top:27.0529%;margin-top:-17.3px;right:52.7457%;width:71px;">
			<p class="v-pstyle5">Arcturus</p>
		</div>
		<div id="v-ai0-32" class="v-map v-aiAbs v-aiPointText" style="top:28.0886%;margin-top:-17.3px;right:52.8459%;width:154px;">
			<p class="v-pstyle5">Baylor, Texas Children&rsquo;s</p>
		</div>
		<div id="v-ai0-33" class="v-map v-aiAbs v-aiPointText" style="top:29.1243%;margin-top:-17.3px;right:52.7855%;width:95px;">
			<p class="v-pstyle5">City of Hope</p>
		</div>
		<div id="v-ai0-34" class="v-map v-aiAbs v-aiPointText" style="top:30.2144%;margin-top:-17.3px;right:52.7646%;width:84px;">
			<p class="v-pstyle5">Codagenix</p>
		</div>
		<div id="v-ai0-35" class="v-map v-aiAbs v-aiPointText" style="top:31.2501%;margin-top:-17.3px;right:52.8086%;width:65px;">
			<p class="v-pstyle5">Covaxx</p>
		</div>
		<div id="v-ai0-36" class="v-map v-aiAbs v-aiPointText" style="top:32.4493%;margin-top:-17.3px;right:52.7759%;width:93px;">
			<p class="v-pstyle5">ImmunityBio</p>
		</div>
		<div id="v-ai0-37" class="v-map v-aiAbs v-aiPointText" style="top:33.4849%;margin-top:-17.3px;right:52.8253%;width:158px;">
			<p class="v-pstyle5">Kentucky BioProcessing</p>
		</div>
		<div id="v-ai0-38" class="v-map v-aiAbs v-aiPointText" style="top:34.6296%;margin-top:-17.3px;right:52.8619%;width:58px;">
			<p class="v-pstyle5">Merck</p>
		</div>
		<div id="v-ai0-39" class="v-map v-aiAbs v-aiPointText" style="top:35.6653%;margin-top:-17.3px;right:52.6946%;width:87px;">
			<p class="v-pstyle5">Merck, IAVI</p>
		</div>
		<div id="v-ai0-40" class="v-map v-aiAbs v-aiPointText" style="top:36.7555%;margin-top:-17.3px;right:52.8058%;width:75px;">
			<p class="v-pstyle5">OncoSec</p>
		</div>
		<div id="v-ai0-41" class="v-map v-aiAbs v-aiPointText" style="top:37.7911%;margin-top:-17.3px;right:52.7223%;width:59px;">
			<p class="v-pstyle5">Vaxart</p>
		</div>
		<div id="v-ai0-42" class="v-map v-aiAbs" style="top:39.0826%;left:2.9594%;width:18%;">
			<p class="v-pstyle7">Germany, United States</p>
		</div>
		<div id="v-ai0-43" class="v-map v-aiAbs" style="top:38.9191%;right:52.8587%;width:25.2727%;">
			<p class="v-pstyle8">BioNTech, Pfizer</p>
		</div>
		<div id="v-ai0-44" class="v-map v-aiAbs v-aiPointText" style="top:42.3153%;margin-top:-17.3px;right:52.7813%;width:58px;">
			<p class="v-pstyle5">Bharat</p>
		</div>
		<div id="v-ai0-45" class="v-map v-aiAbs" style="top:41.8626%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">India</p>
		</div>
		<div id="v-ai0-46" class="v-map v-aiAbs v-aiPointText" style="top:43.351%;margin-top:-17.3px;right:52.7198%;width:96px;">
			<p class="v-pstyle5">Zydus Cadila</p>
		</div>
		<div id="v-ai0-47" class="v-map v-aiAbs" style="top:45.0786%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Germany</p>
		</div>
		<div id="v-ai0-48" class="v-map v-aiAbs v-aiPointText" style="top:45.5313%;margin-top:-17.3px;right:52.8619%;width:71px;">
			<p class="v-pstyle5">CureVac</p>
		</div>
		<div id="v-ai0-49" class="v-map v-aiAbs v-aiPointText" style="top:46.6215%;margin-top:-17.3px;right:52.7134%;width:49px;">
			<p class="v-pstyle5">DZIF</p>
		</div>
		<div id="v-ai0-50" class="v-map v-aiAbs v-aiPointText" style="top:47.7117%;margin-top:-17.3px;right:52.821%;width:148px;">
			<p class="v-pstyle5">University of Tubingen</p>
		</div>
		<div id="v-ai0-51" class="v-map v-aiAbs v-aiPointText" style="top:50.0555%;margin-top:-17.3px;right:52.6957%;width:95px;">
			<p class="v-pstyle5">AstraZeneca</p>
		</div>
		<div id="v-ai0-52" class="v-map v-aiAbs" style="top:49.7118%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">United Kingdom</p>
		</div>
		<div id="v-ai0-53" class="v-map v-aiAbs v-aiPointText" style="top:51.1457%;margin-top:-17.3px;right:52.8196%;width:87px;">
			<p class="v-pstyle5">SpyBiotech</p>
		</div>
		<div id="v-ai0-54" class="v-map v-aiAbs v-aiPointText" style="top:52.2359%;margin-top:-17.3px;right:52.8395%;width:79px;">
			<p class="v-pstyle5">VacEquity</p>
		</div>
		<div id="v-ai0-55" class="v-map v-aiAbs" style="top:54.0725%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Canada</p>
		</div>
		<div id="v-ai0-56" class="v-map v-aiAbs v-aiPointText" style="top:54.5252%;margin-top:-17.3px;right:52.8324%;width:79px;">
			<p class="v-pstyle5">Medicago</p>
		</div>
		<div id="v-ai0-57" class="v-map v-aiAbs v-aiPointText" style="top:55.6154%;margin-top:-17.3px;right:52.8562%;width:53px;">
			<p class="v-pstyle5">Entos</p>
		</div>
		<div id="v-ai0-58" class="v-map v-aiAbs v-aiPointText" style="top:56.7056%;margin-top:-17.3px;right:52.7553%;width:70px;">
			<p class="v-pstyle5">Symvivo</p>
		</div>
		<div id="v-ai0-59" class="v-map v-aiAbs" style="top:58.4877%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Japan</p>
		</div>
		<div id="v-ai0-60" class="v-map v-aiAbs v-aiPointText" style="top:58.9404%;margin-top:-17.3px;right:52.7156%;width:61px;">
			<p class="v-pstyle5">AnGes</p>
		</div>
		<div id="v-ai0-61" class="v-map v-aiAbs v-aiPointText" style="top:60.0306%;margin-top:-17.3px;right:52.7269%;width:71px;">
			<p class="v-pstyle5">Shionogi</p>
		</div>
		<div id="v-ai0-62" class="v-map v-aiAbs" style="top:61.7582%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Cuba</p>
		</div>
		<div id="v-ai0-63" class="v-map v-aiAbs v-aiPointText" style="top:62.2109%;margin-top:-17.3px;right:52.712%;width:107px;">
			<p class="v-pstyle5">Finlay (second)</p>
		</div>
		<div id="v-ai0-64" class="v-map v-aiAbs v-aiPointText" style="top:63.3011%;margin-top:-17.3px;right:52.8384%;width:86px;">
			<p class="v-pstyle5">Finlay (first)</p>
		</div>
		<div id="v-ai0-65" class="v-map v-aiAbs v-aiPointText" style="top:64.3913%;margin-top:-17.3px;right:52.7436%;width:84px;">
			<p class="v-pstyle5">CIGB (first)</p>
		</div>
		<div id="v-ai0-66" class="v-map v-aiAbs v-aiPointText" style="top:65.427%;margin-top:-17.3px;right:52.799%;width:104px;">
			<p class="v-pstyle5">CIGB (second)</p>
		</div>
		<div id="v-ai0-67" class="v-map v-aiAbs" style="top:67.1545%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">France</p>
		</div>
		<div id="v-ai0-68" class="v-map v-aiAbs v-aiPointText" style="top:67.6073%;margin-top:-17.3px;right:52.8118%;width:57px;">
			<p class="v-pstyle5">Sanofi</p>
		</div>
		<div id="v-ai0-69" class="v-map v-aiAbs v-aiPointText" style="top:68.643%;margin-top:-17.3px;right:52.7333%;width:67px;">
			<p class="v-pstyle5">Valneva</p>
		</div>
		<div id="v-ai0-70" class="v-map v-aiAbs" style="top:70.5886%;left:2.9594%;width:27.0909%;">
			<p class="v-pstyle6">India, United States</p>
		</div>
		<div id="v-ai0-71" class="v-map v-aiAbs v-aiPointText" style="top:71.0413%;margin-top:-17.3px;right:52.8406%;width:125px;">
			<p class="v-pstyle5">Gennova, HDT Bio</p>
		</div>
		<div id="v-ai0-72" class="v-map v-aiAbs" style="top:73.0415%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">South Korea</p>
		</div>
		<div id="v-ai0-73" class="v-map v-aiAbs v-aiPointText" style="top:73.4942%;margin-top:-17.3px;right:52.6974%;width:78px;">
			<p class="v-pstyle5">GeneOne</p>
		</div>
		<div id="v-ai0-74" class="v-map v-aiAbs v-aiPointText" style="top:74.5844%;margin-top:-17.3px;right:52.7809%;width:56px;">
			<p class="v-pstyle5">Cellid</p>
		</div>
		<div id="v-ai0-75" class="v-map v-aiAbs v-aiPointText" style="top:75.6746%;margin-top:-17.3px;right:52.7848%;width:77px;">
			<p class="v-pstyle5">Genexine</p>
		</div>
		<div id="v-ai0-76" class="v-map v-aiAbs v-aiPointText" style="top:76.8192%;margin-top:-17.3px;right:52.7397%;width:103px;">
			<p class="v-pstyle5">SK Bioscience</p>
		</div>
		<div id="v-ai0-77" class="v-map v-aiAbs v-aiPointText" style="top:78.9451%;margin-top:-17.3px;right:52.8711%;width:84px;">
			<p class="v-pstyle5">Adimmune</p>
		</div>
		<div id="v-ai0-78" class="v-map v-aiAbs" style="top:78.5468%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Taiwan</p>
		</div>
		<div id="v-ai0-79" class="v-map v-aiAbs v-aiPointText" style="top:79.9807%;margin-top:-17.3px;right:52.8406%;width:72px;">
			<p class="v-pstyle5">Medigen</p>
		</div>
		<div id="v-ai0-80" class="v-map v-aiAbs v-aiPointText" style="top:82.3791%;margin-top:-17.3px;right:52.8693%;width:60px;">
			<p class="v-pstyle5">Vaxine</p>
		</div>
		<div id="v-ai0-81" class="v-map v-aiAbs" style="top:81.9809%;left:2.9594%;width:17.0909%;">
			<p class="v-pstyle6">Australia</p>
		</div>
		<div id="v-ai0-82" class="v-map v-aiAbs" style="top:84.2157%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Israel</p>
		</div>
		<div id="v-ai0-83" class="v-map v-aiAbs v-aiPointText" style="top:84.614%;margin-top:-17.3px;right:52.7788%;width:43px;">
			<p class="v-pstyle5">IIBR</p>
		</div>
		<div id="v-ai0-84" class="v-map v-aiAbs" style="top:86.3416%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Italy</p>
		</div>
		<div id="v-ai0-85" class="v-map v-aiAbs v-aiPointText" style="top:86.7943%;margin-top:-17.3px;right:52.8121%;width:72px;">
			<p class="v-pstyle5">ReiThera</p>
		</div>
		<div id="v-ai0-86" class="v-map v-aiAbs" style="top:88.4674%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Kazakhstan</p>
		</div>
		<div id="v-ai0-87" class="v-map v-aiAbs v-aiPointText" style="top:88.9201%;margin-top:-17.3px;right:52.7145%;width:54px;">
			<p class="v-pstyle5">RIBSP</p>
		</div>
		<div id="v-ai0-88" class="v-map v-aiAbs" style="top:90.7567%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Thailand</p>
		</div>
		<div id="v-ai0-89" class="v-map v-aiAbs v-aiPointText" style="top:91.2095%;margin-top:-17.3px;right:52.755%;width:55px;">
			<p class="v-pstyle5">Chula</p>
		</div>
		<div id="v-ai0-90" class="v-map v-aiAbs" style="top:92.9371%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Turkey</p>
		</div>
		<div id="v-ai0-91" class="v-map v-aiAbs v-aiPointText" style="top:93.3898%;margin-top:-17.3px;right:52.8235%;width:122px;">
			<p class="v-pstyle5">Erciyes University</p>
		</div>
		<div id="v-ai0-92" class="v-map v-aiAbs" style="top:95.1719%;left:2.9594%;width:20.5455%;">
			<p class="v-pstyle6">Vietnam</p>
		</div>
		<div id="v-ai0-93" class="v-map v-aiAbs v-aiPointText" style="top:95.5702%;margin-top:-17.3px;right:52.7486%;width:73px;">
			<p class="v-pstyle5">Nanogen</p>
		</div>
		<div id="v-ai0-94" class="v-map v-aiAbs" style="top:98.0064%;left:2.9318%;width:93.6364%;">
			<p class="v-pstyle0">Note: Vaccine candidates repurposed from existing vaccines for other diseases are not included. There are a dozen such candidates in clinical trials.</p>
		</div>
	</div>

	<!-- Artboard: small -->
	<div id="v-vaccine_all_candidates_chart-small" class="v-artboard" style="max-width: 360px;max-height: 2654px" data-aspect-ratio="0.136" data-min-width="0" data-max-width="549">
<div style="padding: 0 0 737.114% 0;"></div>
		<img id="v-vaccine_all_candidates_chart-small-img" class="v-aiImg" alt="A list of the COVID-19 vaccine candidates, showing China with the most candidates approved and the most in phase 3 trials." src="` + img_small + `"/>
		<div id="v-ai1-1" class="v-map v-aiAbs v-aiPointText" style="top:0.4369%;margin-top:-8.3px;left:10.5826%;width:80px;">
			<p class="v-pstyle0">Complete</p>
		</div>
		<div id="v-ai1-2" class="v-map v-aiAbs v-aiPointText" style="top:0.4369%;margin-top:-8.3px;left:40.0504%;width:84px;">
			<p class="v-pstyle0">In progress</p>
		</div>
		<div id="v-ai1-3" class="v-map v-aiAbs" style="top:1.0175%;left:15.0375%;width:82.5%;">
			<p class="v-pstyle1">Approved for general or limited use in at least one country</p>
		</div>
		<div id="v-ai1-4" class="v-map v-aiAbs v-aiPointText" style="top:3.2857%;margin-top:-8.5px;left:63.2324%;margin-left:-42.5px;width:85px;">
			<p class="v-pstyle2">Trial phase</p>
		</div>
		<div id="v-ai1-5" class="v-map v-aiAbs v-aiPointText" style="top:4.1336%;margin-top:-8.5px;left:4.7272%;width:84px;">
			<p class="v-pstyle3">Developer</p>
		</div>
		<div id="v-ai1-6" class="v-map v-aiAbs v-aiPointText" style="top:4.1253%;margin-top:-8.3px;left:53.8126%;width:26px;">
			<p class="v-pstyle4">1</p>
		</div>
		<div id="v-ai1-7" class="v-map v-aiAbs v-aiPointText" style="top:4.1253%;margin-top:-8.3px;left:62.5201%;width:28px;">
			<p class="v-pstyle4">2</p>
		</div>
		<div id="v-ai1-8" class="v-map v-aiAbs v-aiPointText" style="top:4.1253%;margin-top:-8.3px;left:71.3849%;width:29px;">
			<p class="v-pstyle4">3</p>
		</div>
		<div id="v-ai1-9" class="v-map v-aiAbs v-aiPointText" style="top:4.1336%;margin-top:-8.5px;left:78.0942%;width:77px;">
			<p class="v-pstyle3">Approval</p>
		</div>
		<div id="v-ai1-10" class="v-map v-aiAbs" style="top:5.1298%;left:5.0959%;width:29.375%;">
			<p class="v-pstyle5">China</p>
		</div>
		<div id="v-ai1-11" class="v-map v-aiAbs v-aiPointText" style="top:6.457%;margin-top:-17.3px;right:52.4237%;width:69px;">
			<p class="v-pstyle6">CanSino</p>
		</div>
		<div id="v-ai1-12" class="v-map v-aiAbs v-aiPointText" style="top:7.3049%;margin-top:-17.3px;right:52.4222%;width:130px;">
			<p class="v-pstyle6">Sinopharm (Beijing)</p>
		</div>
		<div id="v-ai1-13" class="v-map v-aiAbs v-aiPointText" style="top:8.1528%;margin-top:-17.3px;right:52.37%;width:132px;">
			<p class="v-pstyle6">Sinopharm (Wuhan)</p>
		</div>
		<div id="v-ai1-14" class="v-map v-aiAbs v-aiPointText" style="top:8.9583%;margin-top:-17.3px;right:52.4512%;width:66px;">
			<p class="v-pstyle6">Sinovac</p>
		</div>
		<div id="v-ai1-15" class="v-map v-aiAbs v-aiPointText" style="top:9.8062%;margin-top:-17.3px;right:52.2076%;width:146px;">
			<p class="v-pstyle6">Anhui Zhifei Longcom</p>
		</div>
		<div id="v-ai1-16" class="v-map v-aiAbs v-aiPointText" style="top:10.6117%;margin-top:-17.3px;right:52.2943%;width:97px;">
			<p class="v-pstyle6">IMB at CAMS</p>
		</div>
		<div id="v-ai1-17" class="v-map v-aiAbs v-aiPointText" style="top:11.4596%;margin-top:-17.3px;right:52.3477%;width:60px;">
			<p class="v-pstyle6">Clover</p>
		</div>
		<div id="v-ai1-18" class="v-map v-aiAbs v-aiPointText" style="top:12.3076%;margin-top:-17.3px;right:52.3032%;width:126px;">
			<p class="v-pstyle6">Sichuan University</p>
		</div>
		<div id="v-ai1-19" class="v-map v-aiAbs v-aiPointText" style="top:13.1555%;margin-top:-17.3px;right:52.4402%;width:122px;">
			<p class="v-pstyle6">Shenzhen Kangtai</p>
		</div>
		<div id="v-ai1-20" class="v-map v-aiAbs v-aiPointText" style="top:13.961%;margin-top:-17.3px;right:52.471%;width:157px;">
			<p class="v-pstyle6">Suzhou Abogen, Walvax</p>
		</div>
		<div id="v-ai1-21" class="v-map v-aiAbs v-aiPointText" style="top:14.8089%;margin-top:-17.3px;right:52.3129%;width:118px;">
			<p class="v-pstyle6">Wantai BioPharm</p>
		</div>
		<div id="v-ai1-22" class="v-map v-aiAbs" style="top:16.1101%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Russia</p>
		</div>
		<div id="v-ai1-23" class="v-map v-aiAbs v-aiPointText" style="top:17.4374%;margin-top:-17.3px;right:52.2116%;width:79px;">
			<p class="v-pstyle6">Gamaleya</p>
		</div>
		<div id="v-ai1-24" class="v-map v-aiAbs v-aiPointText" style="top:18.2429%;margin-top:-17.3px;right:52.4524%;width:110px;">
			<p class="v-pstyle6">Vector Institute</p>
		</div>
		<div id="v-ai1-25" class="v-map v-aiAbs v-aiPointText" style="top:19.1332%;margin-top:-17.3px;right:52.3599%;width:125px;">
			<p class="v-pstyle6">Chumakov Center</p>
		</div>
		<div id="v-ai1-26" class="v-map v-aiAbs" style="top:20.3496%;left:5.0959%;width:29.375%;">
			<p class="v-pstyle5">United States</p>
		</div>
		<div id="v-ai1-27" class="v-map v-aiAbs v-aiPointText" style="top:21.7193%;margin-top:-17.3px;right:52.2791%;width:74px;">
			<p class="v-pstyle6">Moderna</p>
		</div>
		<div id="v-ai1-28" class="v-map v-aiAbs v-aiPointText" style="top:22.5672%;margin-top:-17.3px;right:52.2766%;width:132px;">
			<p class="v-pstyle6">Johnson & Johnson</p>
		</div>
		<div id="v-ai1-29" class="v-map v-aiAbs v-aiPointText" style="top:23.3727%;margin-top:-17.3px;right:52.392%;width:71px;">
			<p class="v-pstyle6">Novavax</p>
		</div>
		<div id="v-ai1-30" class="v-map v-aiAbs v-aiPointText" style="top:24.1782%;margin-top:-17.3px;right:52.2696%;width:57px;">
			<p class="v-pstyle6">Inovio</p>
		</div>
		<div id="v-ai1-31" class="v-map v-aiAbs v-aiPointText" style="top:25.0261%;margin-top:-17.3px;right:52.2577%;width:71px;">
			<p class="v-pstyle6">Arcturus</p>
		</div>
		<div id="v-ai1-32" class="v-map v-aiAbs v-aiPointText" style="top:25.874%;margin-top:-17.3px;right:52.4295%;width:154px;">
			<p class="v-pstyle6">Baylor, Texas Children&rsquo;s</p>
		</div>
		<div id="v-ai1-33" class="v-map v-aiAbs v-aiPointText" style="top:26.7219%;margin-top:-17.3px;right:52.326%;width:95px;">
			<p class="v-pstyle6">City of Hope</p>
		</div>
		<div id="v-ai1-34" class="v-map v-aiAbs v-aiPointText" style="top:27.5698%;margin-top:-17.3px;right:52.29%;width:84px;">
			<p class="v-pstyle6">Codagenix</p>
		</div>
		<div id="v-ai1-35" class="v-map v-aiAbs v-aiPointText" style="top:28.3753%;margin-top:-17.3px;right:52.3657%;width:65px;">
			<p class="v-pstyle6">Covaxx</p>
		</div>
		<div id="v-ai1-36" class="v-map v-aiAbs v-aiPointText" style="top:29.2232%;margin-top:-17.3px;right:52.3093%;width:93px;">
			<p class="v-pstyle6">ImmunityBio</p>
		</div>
		<div id="v-ai1-37" class="v-map v-aiAbs v-aiPointText" style="top:30.0711%;margin-top:-17.3px;right:52.3944%;width:158px;">
			<p class="v-pstyle6">Kentucky BioProcessing</p>
		</div>
		<div id="v-ai1-38" class="v-map v-aiAbs v-aiPointText" style="top:30.9614%;margin-top:-17.3px;right:52.457%;width:58px;">
			<p class="v-pstyle6">Merck</p>
		</div>
		<div id="v-ai1-39" class="v-map v-aiAbs v-aiPointText" style="top:31.7669%;margin-top:-17.3px;right:52.1695%;width:87px;">
			<p class="v-pstyle6">Merck, IAVI</p>
		</div>
		<div id="v-ai1-40" class="v-map v-aiAbs v-aiPointText" style="top:32.6148%;margin-top:-17.3px;right:52.3605%;width:75px;">
			<p class="v-pstyle6">OncoSec</p>
		</div>
		<div id="v-ai1-41" class="v-map v-aiAbs v-aiPointText" style="top:33.4627%;margin-top:-17.3px;right:52.2174%;width:59px;">
			<p class="v-pstyle6">Vaxart</p>
		</div>
		<div id="v-ai1-42" class="v-map v-aiAbs" style="top:34.6368%;left:5.0959%;width:81.5625%;">
			<p class="v-pstyle7">Germany, United States</p>
		</div>
		<div id="v-ai1-43" class="v-map v-aiAbs" style="top:35.2303%;right:52.4516%;width:43.4375%;">
			<p class="v-pstyle8">BioNTech, Pfizer</p>
		</div>
		<div id="v-ai1-44" class="v-map v-aiAbs" style="top:37.5196%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">India</p>
		</div>
		<div id="v-ai1-45" class="v-map v-aiAbs v-aiPointText" style="top:38.8469%;margin-top:-17.3px;right:52.3187%;width:58px;">
			<p class="v-pstyle6">Bharat</p>
		</div>
		<div id="v-ai1-46" class="v-map v-aiAbs v-aiPointText" style="top:39.6948%;margin-top:-17.3px;right:52.2128%;width:96px;">
			<p class="v-pstyle6">Zydus Cadila</p>
		</div>
		<div id="v-ai1-47" class="v-map v-aiAbs" style="top:40.9112%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Germany</p>
		</div>
		<div id="v-ai1-48" class="v-map v-aiAbs v-aiPointText" style="top:42.2809%;margin-top:-17.3px;right:52.457%;width:71px;">
			<p class="v-pstyle6">CureVac</p>
		</div>
		<div id="v-ai1-49" class="v-map v-aiAbs v-aiPointText" style="top:43.1288%;margin-top:-17.3px;right:52.2021%;width:49px;">
			<p class="v-pstyle6">DZIF</p>
		</div>
		<div id="v-ai1-50" class="v-map v-aiAbs v-aiPointText" style="top:43.9767%;margin-top:-17.3px;right:52.3871%;width:148px;">
			<p class="v-pstyle6">University of Tubingen</p>
		</div>
		<div id="v-ai1-51" class="v-map v-aiAbs" style="top:45.4051%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">United Kingdom</p>
		</div>
		<div id="v-ai1-52" class="v-map v-aiAbs v-aiPointText" style="top:46.6899%;margin-top:-17.3px;right:52.1716%;width:95px;">
			<p class="v-pstyle6">AstraZeneca</p>
		</div>
		<div id="v-ai1-53" class="v-map v-aiAbs v-aiPointText" style="top:47.4955%;margin-top:-17.3px;right:52.3846%;width:87px;">
			<p class="v-pstyle6">SpyBiotech</p>
		</div>
		<div id="v-ai1-54" class="v-map v-aiAbs v-aiPointText" style="top:48.3434%;margin-top:-17.3px;right:52.4188%;width:79px;">
			<p class="v-pstyle6">VacEquity</p>
		</div>
		<div id="v-ai1-55" class="v-map v-aiAbs" style="top:49.8142%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Canada</p>
		</div>
		<div id="v-ai1-56" class="v-map v-aiAbs v-aiPointText" style="top:51.1838%;margin-top:-17.3px;right:52.4063%;width:79px;">
			<p class="v-pstyle6">Medicago</p>
		</div>
		<div id="v-ai1-57" class="v-map v-aiAbs v-aiPointText" style="top:52.0317%;margin-top:-17.3px;right:52.4472%;width:53px;">
			<p class="v-pstyle6">Entos</p>
		</div>
		<div id="v-ai1-58" class="v-map v-aiAbs v-aiPointText" style="top:52.8796%;margin-top:-17.3px;right:52.2739%;width:70px;">
			<p class="v-pstyle6">Symvivo</p>
		</div>
		<div id="v-ai1-59" class="v-map v-aiAbs" style="top:54.2233%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Japan</p>
		</div>
		<div id="v-ai1-60" class="v-map v-aiAbs v-aiPointText" style="top:55.5929%;margin-top:-17.3px;right:52.2058%;width:61px;">
			<p class="v-pstyle6">AnGes</p>
		</div>
		<div id="v-ai1-61" class="v-map v-aiAbs v-aiPointText" style="top:56.4408%;margin-top:-17.3px;right:52.4146%;width:66px;">
			<p class="v-pstyle6">Shiniogi</p>
		</div>
		<div id="v-ai1-62" class="v-map v-aiAbs" style="top:57.7845%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Cuba</p>
		</div>
		<div id="v-ai1-63" class="v-map v-aiAbs v-aiPointText" style="top:59.1541%;margin-top:-17.3px;right:52.1997%;width:107px;">
			<p class="v-pstyle6">Finlay (second)</p>
		</div>
		<div id="v-ai1-64" class="v-map v-aiAbs v-aiPointText" style="top:60.002%;margin-top:-17.3px;right:52.4167%;width:86px;">
			<p class="v-pstyle6">Finlay (first)</p>
		</div>
		<div id="v-ai1-65" class="v-map v-aiAbs v-aiPointText" style="top:60.8499%;margin-top:-17.3px;right:52.2537%;width:84px;">
			<p class="v-pstyle6">CIGB (first)</p>
		</div>
		<div id="v-ai1-66" class="v-map v-aiAbs v-aiPointText" style="top:61.7402%;margin-top:-17.3px;right:52.3492%;width:104px;">
			<p class="v-pstyle6">CIGB (second)</p>
		</div>
		<div id="v-ai1-67" class="v-map v-aiAbs" style="top:63.0839%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">France</p>
		</div>
		<div id="v-ai1-68" class="v-map v-aiAbs v-aiPointText" style="top:64.4535%;margin-top:-17.3px;right:52.3712%;width:57px;">
			<p class="v-pstyle6">Sanofi</p>
		</div>
		<div id="v-ai1-69" class="v-map v-aiAbs v-aiPointText" style="top:65.259%;margin-top:-17.3px;right:52.2363%;width:67px;">
			<p class="v-pstyle6">Valneva</p>
		</div>
		<div id="v-ai1-70" class="v-map v-aiAbs" style="top:66.6874%;left:5.0959%;width:47.1875%;">
			<p class="v-pstyle5">India, United States</p>
		</div>
		<div id="v-ai1-71" class="v-map v-aiAbs v-aiPointText" style="top:68.0571%;margin-top:-17.3px;right:52.4207%;width:125px;">
			<p class="v-pstyle6">Gennova, HDT Bio</p>
		</div>
		<div id="v-ai1-72" class="v-map v-aiAbs" style="top:69.4855%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">South Korea</p>
		</div>
		<div id="v-ai1-73" class="v-map v-aiAbs v-aiPointText" style="top:70.8551%;margin-top:-17.3px;right:52.1747%;width:78px;">
			<p class="v-pstyle6">GeneOne</p>
		</div>
		<div id="v-ai1-74" class="v-map v-aiAbs v-aiPointText" style="top:71.7454%;margin-top:-17.3px;right:52.3181%;width:56px;">
			<p class="v-pstyle6">Cellid</p>
		</div>
		<div id="v-ai1-75" class="v-map v-aiAbs v-aiPointText" style="top:72.5933%;margin-top:-17.3px;right:52.3245%;width:77px;">
			<p class="v-pstyle6">Genexine</p>
		</div>
		<div id="v-ai1-76" class="v-map v-aiAbs v-aiPointText" style="top:73.4412%;margin-top:-17.3px;right:52.2473%;width:103px;">
			<p class="v-pstyle6">SK Bioscience</p>
		</div>
		<div id="v-ai1-77" class="v-map v-aiAbs" style="top:74.9121%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Taiwan</p>
		</div>
		<div id="v-ai1-78" class="v-map v-aiAbs v-aiPointText" style="top:76.2393%;margin-top:-17.3px;right:52.4731%;width:84px;">
			<p class="v-pstyle6">Adimmune</p>
		</div>
		<div id="v-ai1-79" class="v-map v-aiAbs v-aiPointText" style="top:77.0448%;margin-top:-17.3px;right:52.4207%;width:72px;">
			<p class="v-pstyle6">Medigen</p>
		</div>
		<div id="v-ai1-80" class="v-map v-aiAbs" style="top:78.4309%;left:5.0959%;width:29.375%;">
			<p class="v-pstyle5">Australia</p>
		</div>
		<div id="v-ai1-81" class="v-map v-aiAbs v-aiPointText" style="top:79.7157%;margin-top:-17.3px;right:52.4698%;width:60px;">
			<p class="v-pstyle6">Vaxine</p>
		</div>
		<div id="v-ai1-82" class="v-map v-aiAbs" style="top:81.017%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Israel</p>
		</div>
		<div id="v-ai1-83" class="v-map v-aiAbs v-aiPointText" style="top:82.3866%;margin-top:-17.3px;right:52.3141%;width:43px;">
			<p class="v-pstyle6">IIBR</p>
		</div>
		<div id="v-ai1-84" class="v-map v-aiAbs" style="top:83.6031%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Italy</p>
		</div>
		<div id="v-ai1-85" class="v-map v-aiAbs v-aiPointText" style="top:84.9727%;margin-top:-17.3px;right:52.3718%;width:72px;">
			<p class="v-pstyle6">ReiThera</p>
		</div>
		<div id="v-ai1-86" class="v-map v-aiAbs" style="top:86.1892%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Kazakhstan</p>
		</div>
		<div id="v-ai1-87" class="v-map v-aiAbs v-aiPointText" style="top:87.5588%;margin-top:-17.3px;right:52.2037%;width:54px;">
			<p class="v-pstyle6">RIBSP</p>
		</div>
		<div id="v-ai1-88" class="v-map v-aiAbs" style="top:88.8601%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Thailand</p>
		</div>
		<div id="v-ai1-89" class="v-map v-aiAbs v-aiPointText" style="top:90.2297%;margin-top:-17.3px;right:52.2733%;width:55px;">
			<p class="v-pstyle6">Chula</p>
		</div>
		<div id="v-ai1-90" class="v-map v-aiAbs" style="top:91.531%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Turkey</p>
		</div>
		<div id="v-ai1-91" class="v-map v-aiAbs v-aiPointText" style="top:92.9006%;margin-top:-17.3px;right:52.3914%;width:122px;">
			<p class="v-pstyle6">Erciyes University</p>
		</div>
		<div id="v-ai1-92" class="v-map v-aiAbs" style="top:94.2019%;left:5.0959%;width:35.3125%;">
			<p class="v-pstyle5">Vietnam</p>
		</div>
		<div id="v-ai1-93" class="v-map v-aiAbs v-aiPointText" style="top:95.5291%;margin-top:-17.3px;right:52.2626%;width:73px;">
			<p class="v-pstyle6">Nanogen</p>
		</div>
		<div id="v-ai1-94" class="v-map v-aiAbs" style="top:97.2119%;left:5.0473%;width:88.75%;">
			<p class="v-pstyle1">Note: Vaccine candidates repurposed from existing vaccines for other diseases are not included. There are a dozen such candidates in clinical trials.</p>
		</div>
	</div>

	<!-- Artboard: large -->
	<div id="v-vaccine_all_candidates_chart-large" class="v-artboard" style="width:680px; height:1804.2725072713px;" data-aspect-ratio="0.377" data-min-width="680">
<div style=""></div>
		<img id="v-vaccine_all_candidates_chart-large-img" class="v-aiImg" alt="A list of the COVID-19 vaccine candidates, showing China with the most candidates approved and the most in phase 3 trials." src="` + img_large + `"/>
		<div id="v-ai2-1" class="v-map v-aiAbs" style="top:0.1663%;left:37.2252%;width:54.5588%;">
			<p class="v-pstyle0">Approved for general or limited use in at least one country</p>
		</div>
		<div id="v-ai2-2" class="v-map v-aiAbs v-aiPointText" style="top:0.6266%;margin-top:-8.3px;left:4.9838%;width:80px;">
			<p class="v-pstyle1">Complete</p>
		</div>
		<div id="v-ai2-3" class="v-map v-aiAbs v-aiPointText" style="top:0.6266%;margin-top:-8.3px;left:18.8781%;width:84px;">
			<p class="v-pstyle1">In progress</p>
		</div>
		<div id="v-ai2-4" class="v-map v-aiAbs v-aiPointText" style="top:3.2466%;margin-top:-8.6px;left:2.2283%;width:89px;">
			<p class="v-pstyle2">Developer</p>
		</div>
		<div id="v-ai2-5" class="v-map v-aiAbs v-aiPointText" style="top:3.2466%;margin-top:-8.6px;left:44.4083%;width:67px;">
			<p class="v-pstyle2">Phase 1</p>
		</div>
		<div id="v-ai2-6" class="v-map v-aiAbs v-aiPointText" style="top:3.2466%;margin-top:-8.6px;left:66.2346%;width:70px;">
			<p class="v-pstyle2">Phase 3</p>
		</div>
		<div id="v-ai2-7" class="v-map v-aiAbs v-aiPointText" style="top:3.2466%;margin-top:-8.6px;left:77.9305%;width:81px;">
			<p class="v-pstyle2">Approval</p>
		</div>
		<div id="v-ai2-8" class="v-map v-aiAbs v-aiPointText" style="top:3.2466%;margin-top:-8.6px;left:55.2539%;width:69px;">
			<p class="v-pstyle2">Phase 2</p>
		</div>
		<div id="v-ai2-9" class="v-map v-aiAbs v-aiPointText" style="top:5.116%;margin-top:-17.3px;right:57.1703%;width:69px;">
			<p class="v-pstyle3">CanSino</p>
		</div>
		<div id="v-ai2-10" class="v-map v-aiAbs" style="top:4.6556%;left:2.2282%;width:13.8235%;">
			<p class="v-pstyle4">China</p>
		</div>
		<div id="v-ai2-11" class="v-map v-aiAbs v-aiPointText" style="top:6.169%;margin-top:-17.3px;right:57.1697%;width:130px;">
			<p class="v-pstyle3">Sinopharm (Beijing)</p>
		</div>
		<div id="v-ai2-12" class="v-map v-aiAbs v-aiPointText" style="top:7.2775%;margin-top:-17.3px;right:57.145%;width:132px;">
			<p class="v-pstyle3">Sinopharm (Wuhan)</p>
		</div>
		<div id="v-ai2-13" class="v-map v-aiAbs v-aiPointText" style="top:8.3306%;margin-top:-17.3px;right:57.1832%;width:66px;">
			<p class="v-pstyle3">Sinovac</p>
		</div>
		<div id="v-ai2-14" class="v-map v-aiAbs v-aiPointText" style="top:9.439%;margin-top:-17.3px;right:57.0686%;width:146px;">
			<p class="v-pstyle3">Anhui Zhifei Longcom</p>
		</div>
		<div id="v-ai2-15" class="v-map v-aiAbs v-aiPointText" style="top:10.5475%;margin-top:-17.3px;right:57.1094%;width:97px;">
			<p class="v-pstyle3">IMB at CAMS</p>
		</div>
		<div id="v-ai2-16" class="v-map v-aiAbs v-aiPointText" style="top:11.6006%;margin-top:-17.3px;right:57.1347%;width:60px;">
			<p class="v-pstyle3">Clover</p>
		</div>
		<div id="v-ai2-17" class="v-map v-aiAbs v-aiPointText" style="top:12.7091%;margin-top:-17.3px;right:57.1137%;width:126px;">
			<p class="v-pstyle3">Sichuan University</p>
		</div>
		<div id="v-ai2-18" class="v-map v-aiAbs v-aiPointText" style="top:13.7621%;margin-top:-17.3px;right:57.178%;width:122px;">
			<p class="v-pstyle3">Shenzhen Kangtai</p>
		</div>
		<div id="v-ai2-19" class="v-map v-aiAbs v-aiPointText" style="top:14.8706%;margin-top:-17.3px;right:57.1927%;width:157px;">
			<p class="v-pstyle3">Suzhou Abogen, Walvax</p>
		</div>
		<div id="v-ai2-20" class="v-map v-aiAbs v-aiPointText" style="top:15.9791%;margin-top:-17.3px;right:57.1183%;width:118px;">
			<p class="v-pstyle3">Wantai BioPharm</p>
		</div>
		<div id="v-ai2-21" class="v-map v-aiAbs v-aiPointText" style="top:18.0852%;margin-top:-17.3px;right:57.0706%;width:79px;">
			<p class="v-pstyle3">Gamaleya</p>
		</div>
		<div id="v-ai2-22" class="v-map v-aiAbs" style="top:17.6803%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Russia</p>
		</div>
		<div id="v-ai2-23" class="v-map v-aiAbs v-aiPointText" style="top:19.1382%;margin-top:-17.3px;right:57.1838%;width:110px;">
			<p class="v-pstyle3">Vector Institute</p>
		</div>
		<div id="v-ai2-24" class="v-map v-aiAbs v-aiPointText" style="top:20.3022%;margin-top:-17.3px;right:57.1404%;width:125px;">
			<p class="v-pstyle3">Chumakov Center</p>
		</div>
		<div id="v-ai2-25" class="v-map v-aiAbs" style="top:22.0588%;left:2.2282%;width:13.8235%;">
			<p class="v-pstyle4">United States</p>
		</div>
		<div id="v-ai2-26" class="v-map v-aiAbs v-aiPointText" style="top:22.5191%;margin-top:-17.3px;right:57.1022%;width:74px;">
			<p class="v-pstyle3">Moderna</p>
		</div>
		<div id="v-ai2-27" class="v-map v-aiAbs v-aiPointText" style="top:23.5722%;margin-top:-17.3px;right:57.101%;width:132px;">
			<p class="v-pstyle3">Johnson & Johnson</p>
		</div>
		<div id="v-ai2-28" class="v-map v-aiAbs v-aiPointText" style="top:24.6806%;margin-top:-17.3px;right:57.1553%;width:71px;">
			<p class="v-pstyle3">Novavax</p>
		</div>
		<div id="v-ai2-29" class="v-map v-aiAbs v-aiPointText" style="top:25.7337%;margin-top:-17.3px;right:57.0979%;width:57px;">
			<p class="v-pstyle3">Inovio</p>
		</div>
		<div id="v-ai2-30" class="v-map v-aiAbs v-aiPointText" style="top:26.7868%;margin-top:-17.3px;right:57.0921%;width:71px;">
			<p class="v-pstyle3">Arcturus</p>
		</div>
		<div id="v-ai2-31" class="v-map v-aiAbs v-aiPointText" style="top:27.8398%;margin-top:-17.3px;right:57.1731%;width:154px;">
			<p class="v-pstyle3">Baylor, Texas Children&rsquo;s</p>
		</div>
		<div id="v-ai2-32" class="v-map v-aiAbs v-aiPointText" style="top:28.9483%;margin-top:-17.3px;right:57.1243%;width:95px;">
			<p class="v-pstyle3">City of Hope</p>
		</div>
		<div id="v-ai2-33" class="v-map v-aiAbs v-aiPointText" style="top:30.0568%;margin-top:-17.3px;right:57.1074%;width:84px;">
			<p class="v-pstyle3">Codagenix</p>
		</div>
		<div id="v-ai2-34" class="v-map v-aiAbs v-aiPointText" style="top:31.1098%;margin-top:-17.3px;right:57.143%;width:65px;">
			<p class="v-pstyle3">Covaxx</p>
		</div>
		<div id="v-ai2-35" class="v-map v-aiAbs v-aiPointText" style="top:32.2737%;margin-top:-17.3px;right:57.1166%;width:93px;">
			<p class="v-pstyle3">ImmunityBio</p>
		</div>
		<div id="v-ai2-36" class="v-map v-aiAbs v-aiPointText" style="top:33.3822%;margin-top:-17.3px;right:57.1565%;width:158px;">
			<p class="v-pstyle3">Kentucky BioProcessing</p>
		</div>
		<div id="v-ai2-37" class="v-map v-aiAbs v-aiPointText" style="top:34.5461%;margin-top:-17.3px;right:57.1861%;width:58px;">
			<p class="v-pstyle3">Merck</p>
		</div>
		<div id="v-ai2-38" class="v-map v-aiAbs v-aiPointText" style="top:35.5992%;margin-top:-17.3px;right:57.0508%;width:87px;">
			<p class="v-pstyle3">Merck, IAVI</p>
		</div>
		<div id="v-ai2-39" class="v-map v-aiAbs v-aiPointText" style="top:36.6522%;margin-top:-17.3px;right:57.1407%;width:75px;">
			<p class="v-pstyle3">OncoSec</p>
		</div>
		<div id="v-ai2-40" class="v-map v-aiAbs v-aiPointText" style="top:37.7607%;margin-top:-17.3px;right:57.0732%;width:59px;">
			<p class="v-pstyle3">Vaxart</p>
		</div>
		<div id="v-ai2-41" class="v-map v-aiAbs" style="top:38.9631%;left:2.2282%;width:14.5588%;">
			<p class="v-pstyle5">Germany, United States</p>
		</div>
		<div id="v-ai2-42" class="v-map v-aiAbs" style="top:38.7968%;right:57.1835%;width:20.4412%;">
			<p class="v-pstyle6">BioNTech, Pfizer</p>
		</div>
		<div id="v-ai2-43" class="v-map v-aiAbs v-aiPointText" style="top:42.3609%;margin-top:-17.3px;right:57.1209%;width:58px;">
			<p class="v-pstyle3">Bharat</p>
		</div>
		<div id="v-ai2-44" class="v-map v-aiAbs" style="top:41.9005%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">India</p>
		</div>
		<div id="v-ai2-45" class="v-map v-aiAbs v-aiPointText" style="top:43.414%;margin-top:-17.3px;right:57.0712%;width:96px;">
			<p class="v-pstyle3">Zydus Cadila</p>
		</div>
		<div id="v-ai2-46" class="v-map v-aiAbs" style="top:45.1706%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Germany</p>
		</div>
		<div id="v-ai2-47" class="v-map v-aiAbs v-aiPointText" style="top:45.6309%;margin-top:-17.3px;right:57.1861%;width:71px;">
			<p class="v-pstyle3">CureVac</p>
		</div>
		<div id="v-ai2-48" class="v-map v-aiAbs v-aiPointText" style="top:46.7394%;margin-top:-17.3px;right:57.066%;width:49px;">
			<p class="v-pstyle3">DZIF</p>
		</div>
		<div id="v-ai2-49" class="v-map v-aiAbs v-aiPointText" style="top:47.8479%;margin-top:-17.3px;right:57.153%;width:148px;">
			<p class="v-pstyle3">University of Tubingen</p>
		</div>
		<div id="v-ai2-50" class="v-map v-aiAbs v-aiPointText" style="top:50.2311%;margin-top:-17.3px;right:57.0516%;width:95px;">
			<p class="v-pstyle3">AstraZeneca</p>
		</div>
		<div id="v-ai2-51" class="v-map v-aiAbs" style="top:49.8816%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">United Kingdom</p>
		</div>
		<div id="v-ai2-52" class="v-map v-aiAbs v-aiPointText" style="top:51.3396%;margin-top:-17.3px;right:57.1519%;width:87px;">
			<p class="v-pstyle3">SpyBiotech</p>
		</div>
		<div id="v-ai2-53" class="v-map v-aiAbs v-aiPointText" style="top:52.4481%;margin-top:-17.3px;right:57.168%;width:79px;">
			<p class="v-pstyle3">VacEquity</p>
		</div>
		<div id="v-ai2-54" class="v-map v-aiAbs" style="top:54.3155%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Canada</p>
		</div>
		<div id="v-ai2-55" class="v-map v-aiAbs v-aiPointText" style="top:54.7759%;margin-top:-17.3px;right:57.1622%;width:79px;">
			<p class="v-pstyle3">Medicago</p>
		</div>
		<div id="v-ai2-56" class="v-map v-aiAbs v-aiPointText" style="top:55.8844%;margin-top:-17.3px;right:57.1815%;width:53px;">
			<p class="v-pstyle3">Entos</p>
		</div>
		<div id="v-ai2-57" class="v-map v-aiAbs v-aiPointText" style="top:56.9928%;margin-top:-17.3px;right:57.0999%;width:70px;">
			<p class="v-pstyle3">Symvivo</p>
		</div>
		<div id="v-ai2-58" class="v-map v-aiAbs" style="top:58.8049%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Japan</p>
		</div>
		<div id="v-ai2-59" class="v-map v-aiAbs v-aiPointText" style="top:59.2652%;margin-top:-17.3px;right:57.0677%;width:61px;">
			<p class="v-pstyle3">AnGes</p>
		</div>
		<div id="v-ai2-60" class="v-map v-aiAbs v-aiPointText" style="top:60.3737%;margin-top:-17.3px;right:57.0769%;width:71px;">
			<p class="v-pstyle3">Shionogi</p>
		</div>
		<div id="v-ai2-61" class="v-map v-aiAbs" style="top:62.1303%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Cuba</p>
		</div>
		<div id="v-ai2-62" class="v-map v-aiAbs v-aiPointText" style="top:62.5907%;margin-top:-17.3px;right:57.0649%;width:107px;">
			<p class="v-pstyle3">Finlay (second)</p>
		</div>
		<div id="v-ai2-63" class="v-map v-aiAbs v-aiPointText" style="top:63.6991%;margin-top:-17.3px;right:57.1671%;width:86px;">
			<p class="v-pstyle3">Finlay (first)</p>
		</div>
		<div id="v-ai2-64" class="v-map v-aiAbs v-aiPointText" style="top:64.8076%;margin-top:-17.3px;right:57.0904%;width:84px;">
			<p class="v-pstyle3">CIGB (first)</p>
		</div>
		<div id="v-ai2-65" class="v-map v-aiAbs v-aiPointText" style="top:65.8607%;margin-top:-17.3px;right:57.1352%;width:104px;">
			<p class="v-pstyle3">CIGB (second)</p>
		</div>
		<div id="v-ai2-66" class="v-map v-aiAbs" style="top:67.6173%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">France</p>
		</div>
		<div id="v-ai2-67" class="v-map v-aiAbs v-aiPointText" style="top:68.0776%;margin-top:-17.3px;right:57.1456%;width:57px;">
			<p class="v-pstyle3">Sanofi</p>
		</div>
		<div id="v-ai2-68" class="v-map v-aiAbs v-aiPointText" style="top:69.1307%;margin-top:-17.3px;right:57.0821%;width:67px;">
			<p class="v-pstyle3">Valneva</p>
		</div>
		<div id="v-ai2-69" class="v-map v-aiAbs" style="top:71.0536%;left:2.2282%;width:21.9118%;">
			<p class="v-pstyle4">India, United States</p>
		</div>
		<div id="v-ai2-70" class="v-map v-aiAbs v-aiPointText" style="top:71.4585%;margin-top:-17.3px;right:57.1688%;width:125px;">
			<p class="v-pstyle3">Gennova, HDT Bio</p>
		</div>
		<div id="v-ai2-71" class="v-map v-aiAbs v-aiPointText" style="top:73.7309%;margin-top:-17.3px;right:57.0531%;width:78px;">
			<p class="v-pstyle3">GeneOne</p>
		</div>
		<div id="v-ai2-72" class="v-map v-aiAbs" style="top:73.2705%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">South Korea</p>
		</div>
		<div id="v-ai2-73" class="v-map v-aiAbs v-aiPointText" style="top:74.8394%;margin-top:-17.3px;right:57.1206%;width:56px;">
			<p class="v-pstyle3">Cellid</p>
		</div>
		<div id="v-ai2-74" class="v-map v-aiAbs v-aiPointText" style="top:76.0033%;margin-top:-17.3px;right:57.1237%;width:77px;">
			<p class="v-pstyle3">Genexine</p>
		</div>
		<div id="v-ai2-75" class="v-map v-aiAbs v-aiPointText" style="top:77.1118%;margin-top:-17.3px;right:57.0873%;width:103px;">
			<p class="v-pstyle3">SK Bioscience</p>
		</div>
		<div id="v-ai2-76" class="v-map v-aiAbs v-aiPointText" style="top:79.2733%;margin-top:-17.3px;right:57.1935%;width:84px;">
			<p class="v-pstyle3">Adimmune</p>
		</div>
		<div id="v-ai2-77" class="v-map v-aiAbs" style="top:78.8684%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Taiwan</p>
		</div>
		<div id="v-ai2-78" class="v-map v-aiAbs v-aiPointText" style="top:80.3817%;margin-top:-17.3px;right:57.1688%;width:72px;">
			<p class="v-pstyle3">Medigen</p>
		</div>
		<div id="v-ai2-79" class="v-map v-aiAbs v-aiPointText" style="top:82.3216%;margin-top:-17.3px;right:57.1921%;width:60px;">
			<p class="v-pstyle3">Vaxine</p>
		</div>
		<div id="v-ai2-80" class="v-map v-aiAbs" style="top:81.9167%;left:2.2282%;width:13.8235%;">
			<p class="v-pstyle4">Australia</p>
		</div>
		<div id="v-ai2-81" class="v-map v-aiAbs" style="top:84.0782%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Israel</p>
		</div>
		<div id="v-ai2-82" class="v-map v-aiAbs v-aiPointText" style="top:84.5386%;margin-top:-17.3px;right:57.1189%;width:43px;">
			<p class="v-pstyle3">IIBR</p>
		</div>
		<div id="v-ai2-83" class="v-map v-aiAbs" style="top:86.2952%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Italy</p>
		</div>
		<div id="v-ai2-84" class="v-map v-aiAbs v-aiPointText" style="top:86.7001%;margin-top:-17.3px;right:57.1459%;width:72px;">
			<p class="v-pstyle3">ReiThera</p>
		</div>
		<div id="v-ai2-85" class="v-map v-aiAbs" style="top:88.4567%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Kazakhstan</p>
		</div>
		<div id="v-ai2-86" class="v-map v-aiAbs v-aiPointText" style="top:88.8616%;margin-top:-17.3px;right:57.0669%;width:54px;">
			<p class="v-pstyle3">RIBSP</p>
		</div>
		<div id="v-ai2-87" class="v-map v-aiAbs" style="top:90.7291%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Thailand</p>
		</div>
		<div id="v-ai2-88" class="v-map v-aiAbs v-aiPointText" style="top:91.1894%;margin-top:-17.3px;right:57.0996%;width:55px;">
			<p class="v-pstyle3">Chula</p>
		</div>
		<div id="v-ai2-89" class="v-map v-aiAbs" style="top:92.946%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Turkey</p>
		</div>
		<div id="v-ai2-90" class="v-map v-aiAbs v-aiPointText" style="top:93.4064%;margin-top:-17.3px;right:57.155%;width:122px;">
			<p class="v-pstyle3">Erciyes University</p>
		</div>
		<div id="v-ai2-91" class="v-map v-aiAbs" style="top:95.163%;left:2.2282%;width:16.6176%;">
			<p class="v-pstyle4">Vietnam</p>
		</div>
		<div id="v-ai2-92" class="v-map v-aiAbs v-aiPointText" style="top:95.6234%;margin-top:-17.3px;right:57.0944%;width:73px;">
			<p class="v-pstyle3">Nanogen</p>
		</div>
		<div id="v-ai2-93" class="v-map v-aiAbs" style="top:98.1005%;left:2.2059%;width:95.5882%;">
			<p class="v-pstyle0">Note: Vaccine candidates repurposed from existing vaccines for other diseases are not included. There are a dozen such candidates in clinical trials.</p>
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
      <span class='v-source'><span id='psource' class='v-source italic'></span> : <span id='vsource' class='v-source'></span></span>
    </div>
  </div>
</div>
`
let container = document.getElementById('vaccine_all_candidates_chart')
container.insertAdjacentHTML("afterbegin", graphic)

document.querySelector('#vaccine_all_candidates_chart .v-title').innerHTML = title
document.querySelector('#vaccine_all_candidates_chart .v-subhead').innerHTML = subhead
document.querySelector('#vaccine_all_candidates_chart #psource').innerHTML = psourcetext
document.querySelector('#vaccine_all_candidates_chart #vsource').innerHTML = sourcetext
