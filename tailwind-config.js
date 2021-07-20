/*

   Tailwind - The Utility-First CSS Framework

   A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
   David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

   Welcome to the Tailwind config file. This is where you can customize
   Tailwind specifically for your project. Don't be intimidated by the
   length of this file. It's really just a big JavaScript object and
   we've done our very best to explain each section.

   View the full documentation at https://tailwindcss.com.


   |-------------------------------------------------------------------------------
   | The default config
   |-------------------------------------------------------------------------------
   |
   | This variable contains the default Tailwind config. You don't have
   | to use it, but it can sometimes be helpful to have available. For
   | example, you may choose to merge your custom configuration
   | values with some of the Tailwind defaults.
   |
 */

let defaultConfig = require('tailwindcss/defaultConfig')()


/*
   |-------------------------------------------------------------------------------
   | Colors                                    https://tailwindcss.com/docs/colors
   |-------------------------------------------------------------------------------
   |
   | Here you can specify the colors used in your project. To get you started,
   | we've provided a generous palette of great looking colors that are perfect
   | for prototyping, but don't hesitate to change them for your project. You
   | own these colors, nothing will break if you change everything about them.
   |
   | We've used literal color names ('red', 'blue', etc.) for the default
   | palette, but if you'd rather use functional names like 'primary' and
   | 'secondary', or even a numeric scale like '100' and '200', go for it.
   |
 */

let colors = {
  'transparent': 'transparent',

/*corporate*/
  'brown': '#412c26',
  'orange': '#F25D27',
  'blue': '#04284A',
  'gray': '#48535D',
  'white': '#ffffff',

/*highlights*/
  'blue-hl': '#4391DB',
  'red-hl': '#EA2636',
  'orange-hl': '#F25D27',
  'yellow-hl': '#FFCC00',

/*secondary*/
  'gray-50': '#7f7f7f',
  'gray-30': '#afacab',
  'babyblue': '#e0e9e8',
  'bone': '#faf9f4',
  'gray-02': '#f9f9f9',

/*neutral*/
  /*neutral cool (blue)*/
  'gray4-cool': '#668296',
  'gray3-cool': '#9baaaa',
  'gray2-cool': '#C9cec6',
  'gray1-cool': '#f2f2f2',
  /*neutral (grays)*/
  'gray4': '#4B535D',
  'gray3': '#60666b',
  'gray2': '#9ea3a5',
  'gray1': '#dddddd',
  /*neutral warm (brown)*/
  'gray4-warm': '#514c44',
  'gray3-warm': '#8e7f75',
  'gray2-warm': '#cec1b5',
  'gray1-warm': '#ede8e2',

/*primary*/
  /*orange*/
  'orange5': '#720c26',
  'orange4': '#aa2800',
  'orange3': '#d16b00',
  'orange2': '#e2b260',
  'orange1': '#f2e5aa',
  /*green*/
  'green4': '#303b1f',
  'green3': '#5c6b40',
  'green2': '#99b782',
  'green1': '#dbe5c4',
  /*blue*/
  'blue4': '#04284A',
  'blue3': '#215e99',
  'blue2': '#7ab2e5',
  'blue1': '#c6ddf4',
  /*teal*/
  'teal4': '#0c3f42',
  'teal3': '#3f6d6b',
  'teal2': '#66afad',
  'teal1': '#c1e5e8',
  /*purple*/
  'purple4': '#510238',
  'purple3': '#773863',
  /*brown*/
  'brown4': '#594f35',
  'brown2': '#b5a06d',

/*map*/
  'map-green': '#9ab882',
  'map-orange': '#e2b260',
  'map-brown': '#cec1b5',
  'map-gray': '#9baaaa',

  'map-ocean': '#f2f2f2',
  'map-country': '#fffff9',
  'map-border': '#dedede',

  /*green*/
  'map-green1': '#303b1f',
  'map-green2': '#5c6b40',
  'map-green3': '#99b782',
  'map-green4': '#dbe5c4',
  /*orange*/
  'map-orange1': '#aa2800',
  'map-orange2': '#d16b00',
  'map-orange3': '#e2b260',
  'map-orange4': '#f2e5aa',
  /*teal*/
  'map-teal1': '#0c3f42',
  'map-teal2': '#3f6d6b',
  'map-teal3': '#66afad',
  'map-teal4': '#c1e5e8',
  /*purple*/
  'map-purple1': '#510238',
  'map-purple2': '#773863',
  'map-purple3': '#cc93ad',
  'map-purple4': '#f2dde5',

  //v2 all start with v-
  'v-brown': '#412c26',
  'v-coral': '#F25D27',
  'v-marine': '#04284A',
  'v-gunmetal': '#4B535D',
  'v-tan': '#B5A06D',
  'v-red': '#BD3823',
  'v-purple': '#A65583',
  'v-teal': '#3B8991',
  'v-green': '#5C8C42',
  'v-orange': '#E68A17',
  'v-blue': '#2E75B8',
  'v-tan-l': '#D9CAA7',
  'v-red-l': '#FF9382',
  'v-purple-l': '#DE9EBC',
  'v-teal-l': '#80C7CF',
  'v-green-l': '#9BD47F',
  'v-orange-l': '#FFC259',
  'v-blue-l': '#7AB2E5',
  'v-gray-1': '#F2F2F2',
  'v-gray-2': '#DDDDDD',
  'v-gray-3': '#7F7F7F',
  'v-warmgray-1': '#C9CEC6',
  'v-warmgray-2': '#9BAAAA',
  'v-coolgray-1': '#9EA3A5',
  'v-coolgray-2': '#60666B',
  'v-blue-b': '#4391DB',
  'v-orange-b': '#F25D27',
  'v-red-b': '#EA2636',
  'v-yellow-b': '#FFCC00',
  'v-orange3-1': '#FFC259',
  'v-orange3-2': '#E68A17',
  'v-orange3-3': '#7F2704',
  'v-blue3-1': '#7AB2E5',
  'v-blue3-2': '#2E75B8',
  'v-blue3-3': '#04284A',
  'v-purple3-1': '#DE9EBC',
  'v-purple3-2': '#A65583',
  'v-purple3-3': '#510238',
  'v-teal3-1': '#80C7CF',
  'v-teal3-2': '#3B8991',
  'v-teal3-3': '#0C4240',
  'v-red3-1': '#FF9382',
  'v-red3-2': '#BD3823',
  'v-red3-3': '#6F130C',
  'v-green3-1': '#9BD47F',
  'v-green3-2': '#5C8C42',
  'v-green3-3': '#283B1F',
  'v-tan3-1': '#D9CAA7',
  'v-tan3-2': '#B5A06D',
  'v-tan3-3': '#594F35',
  'v-orange4-1': '#FDBD54',
  'v-orange4-2': '#DF7B19',
  'v-orange4-3': '#B73521',
  'v-orange4-4': '#6F130C',
  'v-teal4-1': '#9CD3DA',
  'v-teal4-2': '#57A2AA',
  'v-teal4-3': '#2B7175',
  'v-teal4-4': '#0C4240',
  'v-purple4-1': '#E6B6CD',
  'v-purple4-2': '#BE749B',
  'v-purple4-3': '#8A3A6B',
  'v-purple4-4': '#510238',
  'v-green4-1': '#A1D787',
  'v-green4-2': '#799F56',
  'v-green4-3': '#506B37',
  'v-green4-4': '#283B1F',
  'v-orange5-1': '#FFCB72',
  'v-orange5-2': '#EB9625',
  'v-orange5-3': '#D1601D',
  'v-orange5-4': '#A82E1D',
  'v-orange5-5': '#6F130C',
  'v-teal5-1': '#B0DCE1',
  'v-teal5-2': '#6DB6BE',
  'v-teal5-3': '#418E96',
  'v-teal5-4': '#25676A',
  'v-teal5-5': '#0C4240',
  'v-purple5-1': '#EBC5D7',
  'v-purple5-2': '#D18DAF',
  'v-purple5-3': '#AB5C88',
  'v-purple5-4': '#7F2F61',
  'v-purple5-5': '#510238',
  'v-green5-1': '#B5DFA0',
  'v-green5-2': '#87B567',
  'v-green5-3': '#6A8A46',
  'v-green5-4': '#486132',
  'v-green5-5': '#283B1F',
  'v-map-primary-purple': '#B27495',
  'v-map-primary-teal': '#73B2B2',
  'v-map-primary-green': '#8CB574',
  'v-map-primary-tan': '#C7B68D',
  'v-map-primary-orange': '#F0B061',
  'v-map-primary-red': '#EF7564',
  'v-map-secondary-purple': '#CA9FB3',
  'v-map-secondary-teal': '#9FC7C9',
  'v-map-secondary-green': '#AECB9E',
  'v-map-secondary-tan': '#D8CCAF',
  'v-map-secondary-orange': '#F4C891',
  'v-map-secondary-red': '#F29D91',
  'v-map-tertiary-purple': '#EECCDA',
  'v-map-tertiary-teal': '#BBE3E4',
  'v-map-tertiary-green': '#CAE4BA',
  'v-map-tertiary-tan': '#EBE4D0',
  'v-map-tertiary-orange': '#FFE0AC',
  'v-map-tertiary-red': '#FBC8C1',
  'v-teal4-d8': '#0C4240',
  'v-teal3-d8': '#2A6F74',
  'v-teal2-d8': '#549FA7',
  'v-teal1-d8': '#95D0D0',
  'v-middle-d8': '#FFFAD6',
  'v-orange1-d8': '#F6BF61',
  'v-orange2-d8': '#E08416',
  'v-orange3-d8': '#AF550D',
  'v-orange4-d8': '#6F130C',
  'v-teal3-d6': '#2A6F74',
  'v-teal2-d6': '#549FA7',
  'v-teal1-d6': '#95D0D0',
  'v-middle-d6': '#FFFAD6',
  'v-orange1-d6': '#F6BF61',
  'v-orange2-d6': '#E08416',
  'v-orange3-d6': '#AF550D',
  'v-grayscale-1': '#d9d9d9',
  'v-grayscale-2': '#bdbdbd',
  'v-grayscale-3': '#969696',
  'v-grayscale-4': '#636363',
  'v-grayscale-5': '#252525'
}

module.exports = {
  corePlugins: {
    container: false
  },

  /*
     |-----------------------------------------------------------------------------
     | Colors                                  https://tailwindcss.com/docs/colors
     |-----------------------------------------------------------------------------
     |
     | The color palette defined above is also assigned to the 'colors' key of
     | your Tailwind config. This makes it easy to access them in your CSS
     | using Tailwind's config helper. For example:
     |
     | .error { color: config('colors.red') }
     |
   */

  colors: colors,


  /*
     |-----------------------------------------------------------------------------
     | Screens                      https://tailwindcss.com/docs/responsive-design
     |-----------------------------------------------------------------------------
     |
     | Screens in Tailwind are translated to CSS media queries. They define the
     | responsive breakpoints for your project. By default Tailwind takes a
     | 'mobile first' approach, where each screen size represents a minimum
     | viewport width. Feel free to have as few or as many screens as you
     | want, naming them in whatever way you'd prefer for your project.
     |
     | Tailwind also allows for more complex screen definitions, which can be
     | useful in certain situations. Be sure to see the full responsive
     | documentation for a complete list of options.
     |
     | Class name: .{screen}:{utility}
     |
   */

  screens: {
    'sm': '576px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
  },


  /*
     |-----------------------------------------------------------------------------
     | Fonts                                    https://tailwindcss.com/docs/fonts
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your project's font stack, or font families.
     | Keep in mind that Tailwind doesn't actually load any fonts for you.
     | If you're using custom fonts you'll need to import them prior to
     | defining them here.
     |
     | By default we provide a native font stack that works remarkably well on
     | any device or OS you're using, since it just uses the default fonts
     | provided by the platform.
     |
     | Class name: .font-{name}
     | CSS property: font-family
     |
   */

  fonts: {
    // 'hbi': ['haarlemmer_bold_italic'],
    // 'hb': ['haarlemmer_bold'],
    // 'hi': ['haarlemmer_italic'],
    // 'hm': ['haarlemmer_medium'],
    'h': ['Georgia'],
    // 'lbi': ['larsseit_bold_italic'],
    'lb': ['Arial'],
    // 'lxbi': ['larsseit_xbold_italic'],
    // 'lxb': ['larsseit_xbold'],
    'li': ['Arial'],
    // 'lli': ['larsseit_light_italic'],
    // 'll': ['larsseit_light'],
    // 'lmi': ['larsseit_medium_italic'],
    'lm': ['Arial'],
    // 'lti': ['larsseit_thin_italic'],
    // 'lt': ['larsseit_thin'],
    'l': ['Arial'],
    // 'leb': ['lemonde_bold'],
    // 'lebi': ['lemonde_bold_italic'],
    // 'lebo': ['lemonde_book'],
    // 'leboi': ['lemonde_book_italic'],
    // 'led': ['lemonde_demi'],
    // 'ledi': ['lemonde_demi_italic'],
    // 'lexd': ['lemonde_xdemi'],
    'lei': ['Arial'],
    // 'ledi': ['lemonde_demi_italic'],
    'le': ['Arial']
  },


  /*
     |-----------------------------------------------------------------------------
     | Text sizes                         https://tailwindcss.com/docs/text-sizing
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your text sizes. Name these in whatever way
     | makes the most sense to you. We use size names by default, but
     | you're welcome to use a numeric scale or even something else
     | entirely.
     |
     | By default Tailwind uses the 'rem' unit type for most measurements.
     | This allows you to set a root font size which all other sizes are
     | then based on. That said, you are free to use whatever units you
     | prefer, be it rems, ems, pixels or other.
     |
     | Class name: .text-{size}
     | CSS property: font-size
     |
   */

  textSizes: {
    '9': '9px',
    '10': '10px',
    '11': '11px',
    '12': '12px',
    '13': '13px',
    '14': '14px',
    '16': '16px',
    '18': '18px',
    '20': '20px',
    '24': '24px',
    '30': '30px',
    '32': '32px',
    '36': '36px',
    '48': '48px',
  },


  /*
     |-----------------------------------------------------------------------------
     | Font weights                       https://tailwindcss.com/docs/font-weight
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your font weights. We've provided a list of
     | common font weight names with their respective numeric scale values
     | to get you started. It's unlikely that your project will require
     | all of these, so we recommend removing those you don't need.
     |
     | Class name: .font-{weight}
     | CSS property: font-weight
     |
   */

  fontWeights: {
    'hairline': 100,
    'thin': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900,
  },


  /*
     |-----------------------------------------------------------------------------
     | Leading (line height)              https://tailwindcss.com/docs/line-height
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your line height values, or as we call
     | them in Tailwind, leadings.
     |
     | Class name: .leading-{size}
     | CSS property: line-height
     |
   */

  leading: {
    'none': 1,
    'tight': 1.25,
    'normal': 1.5,
    'loose': 2,
    '11': '11px',
    '12': '12px',
    '13': '13px',
    '14': '14px',
    '15': '15px',
    '16': '16px',
    '20': '20px',
    '22': '22px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your letter spacing values, or as we call
     | them in Tailwind, tracking.
     |
     | Class name: .tracking-{size}
     | CSS property: letter-spacing
     |
   */

  tracking: {
    'tight': '-0.05em',
    'normal': '0',
    'wide': '0.05em',
  },


  /*
     |-----------------------------------------------------------------------------
     | Text colors                         https://tailwindcss.com/docs/text-color
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your text colors. By default these use the
     | color palette we defined above, however you're welcome to set these
     | independently if that makes sense for your project.
     |
     | Class name: .text-{color}
     | CSS property: color
     |
   */


  textColors: {
    'blue': colors['blue'],
    'bone': colors['bone'],
    'orange-hl': colors['orange-hl'],
    'gray-50': colors['gray-50'],
    'gray': colors['gray3'],
    'brown': colors['brown'],
    'gray1-cool': colors['gray1-cool'],
    'v-gray-3': colors['v-gray-3'],
    'v-coolgray-2': colors['v-coolgray-2'],
    'gray-map': '#c6c4c4'
  },


  /*
     |-----------------------------------------------------------------------------
     | Background colors             https://tailwindcss.com/docs/background-color
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your background colors. By default these use
     | the color palette we defined above, however you're welcome to set
     | these independently if that makes sense for your project.
     |
     | Class name: .bg-{color}
     | CSS property: background-color
     |
   */

  backgroundColors: colors,


  /*
     |-----------------------------------------------------------------------------
     | Background sizes               https://tailwindcss.com/docs/background-size
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your background sizes. We provide some common
     | values that are useful in most projects, but feel free to add other sizes
     | that are specific to your project here as well.
     |
     | Class name: .bg-{size}
     | CSS property: background-size
     |
   */

  backgroundSize: {
    'auto': 'auto',
    'cover': 'cover',
    'contain': 'contain',
  },


  /*
     |-----------------------------------------------------------------------------
     | Border widths                     https://tailwindcss.com/docs/border-width
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your border widths. Take note that border
     | widths require a special 'default' value set as well. This is the
     | width that will be used when you do not specify a border width.
     |
     | Class name: .border{-side?}{-width?}
     | CSS property: border-width
     |
   */

  borderWidths: {
    default: '1px',
    '0': '0',
    '2': '2px',
    '4': '4px',
    '8': '8px',
  },


  /*
     |-----------------------------------------------------------------------------
     | Border colors                     https://tailwindcss.com/docs/border-color
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your border colors. By default these use the
     | color palette we defined above, however you're welcome to set these
     | independently if that makes sense for your project.
     |
     | Take note that border colors require a special 'default' value set
     | as well. This is the color that will be used when you do not
     | specify a border color.
     |
     | Class name: .border-{color}
     | CSS property: border-color
     |
   */

  borderColors: global.Object.assign({ default: colors['blue'] }, colors),


  /*
     |-----------------------------------------------------------------------------
     | Border radius                    https://tailwindcss.com/docs/border-radius
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your border radius values. If a `default` radius
     | is provided, it will be made available as the non-suffixed `.rounded`
     | utility.
     |
     | If your scale includes a `0` value to reset already rounded corners, it's
     | a good idea to put it first so other values are able to override it.
     |
     | Class name: .rounded{-side?}{-size?}
     | CSS property: border-radius
     |
   */

  borderRadius: {
    'none': '0',
    'sm': '.125rem',
    default: '.25rem',
    'lg': '.5rem',
    'full': '9999px',
  },


  /*
     |-----------------------------------------------------------------------------
     | Width                                    https://tailwindcss.com/docs/width
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your width utility sizes. These can be
     | percentage based, pixels, rems, or any other units. By default
     | we provide a sensible rem based numeric scale, a percentage
     | based fraction scale, plus some other common use-cases. You
     | can, of course, modify these values as needed.
     |
     |
     | It's also worth mentioning that Tailwind automatically escapes
     | invalid CSS class name characters, which allows you to have
     | awesome classes like .w-2/3.
     |
     | Class name: .w-{size}
     | CSS property: width
     |
   */

  width: {
    'auto': 'auto',
    'px': '1px',
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '7/20': '35%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.66667%',
    '1/7': '14.285714285%',
    '1/8': '12.5%',
    '1/9': '11.111111111%',
    '1/10': '10%',
    '5/6': '83.33333%',
    'full': '100%',
    'screen': '100vw',
    '792': '792px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Height                                  https://tailwindcss.com/docs/height
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your height utility sizes. These can be
     | percentage based, pixels, rems, or any other units. By default
     | we provide a sensible rem based numeric scale plus some other
     | common use-cases. You can, of course, modify these values as
     | needed.
     |
     | Class name: .h-{size}
     | CSS property: height
     |
   */

  height: {
    'auto': 'auto',
    'px': '1px',
    'full': '100%',
    '1/2': '50%',
    '1/3': '33.33333%',
    '2/3': '66.66667%',
    '1/4': '25%',
    '3/4': '75%',
    '1/5': '20%',
    '2/5': '40%',
    '3/5': '60%',
    '4/5': '80%',
    '1/6': '16.66667%',
    '5/6': '83.33333%',
    'screen': '100vh',
    '612': '612px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Minimum width                        https://tailwindcss.com/docs/min-width
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your minimum width utility sizes. These can
     | be percentage based, pixels, rems, or any other units. We provide a
     | couple common use-cases by default. You can, of course, modify
     | these values as needed.
     |
     | Class name: .min-w-{size}
     | CSS property: min-width
     |
   */

  minWidth: {
    '0': '0',
    'full': '100%',
  },


  /*
     |-----------------------------------------------------------------------------
     | Minimum height                      https://tailwindcss.com/docs/min-height
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your minimum height utility sizes. These can
     | be percentage based, pixels, rems, or any other units. We provide a
     | few common use-cases by default. You can, of course, modify these
     | values as needed.
     |
     | Class name: .min-h-{size}
     | CSS property: min-height
     |
   */

  minHeight: {
    '0': '0',
    'full': '100%',
    'screen': '100vh',
  },


  /*
     |-----------------------------------------------------------------------------
     | Maximum width                        https://tailwindcss.com/docs/max-width
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your maximum width utility sizes. These can
     | be percentage based, pixels, rems, or any other units. By default
     | we provide a sensible rem based scale and a 'full width' size,
     | which is basically a reset utility. You can, of course,
     | modify these values as needed.
     |
     | Class name: .max-w-{size}
     | CSS property: max-width
     |
   */

  maxWidth: {
    '320': '320px',
    '360': '360px',
    '576': '576px',
    '680': '680px',
    '768': '768px',
    '1024': '1024px',
    '1280': '1280px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Maximum height                      https://tailwindcss.com/docs/max-height
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your maximum height utility sizes. These can
     | be percentage based, pixels, rems, or any other units. We provide a
     | couple common use-cases by default. You can, of course, modify
     | these values as needed.
     |
     | Class name: .max-h-{size}
     | CSS property: max-height
     |
   */

  maxHeight: {
    'full': '100%',
    'screen': '100vh',
  },


  /*
     |-----------------------------------------------------------------------------
     | Padding                                https://tailwindcss.com/docs/padding
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your padding utility sizes. These can be
     | percentage based, pixels, rems, or any other units. By default we
     | provide a sensible rem based numeric scale plus a couple other
     | common use-cases like '1px'. You can, of course, modify these
     | values as needed.
     |
     | Class name: .p{side?}-{size}
     | CSS property: padding
     |
   */

  padding: {
    'px': '1px',
    '2px': '2px',
    '4px': '4px',
    '5px': '5px',
    '6px': '6px',
    '8px': '8px',
    '10px': '10px',
    '15px': '15px',
    '16px': '16px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Margin                                  https://tailwindcss.com/docs/margin
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your margin utility sizes. These can be
     | percentage based, pixels, rems, or any other units. By default we
     | provide a sensible rem based numeric scale plus a couple other
     | common use-cases like '1px'. You can, of course, modify these
     | values as needed.
     |
     | Class name: .m{side?}-{size}
     | CSS property: margin
     |
   */

  margin: {
    'auto': 'auto',
    'px': '1px',
    '0': '0',
    '2px': '2px',
    '4px': '4px',
    '5px': '5px',
    '10px': '10px',
    '15px': '15px',
    '20px': '20px',
    '25px': '25px',
    '30px': '30px',
    '32px': '32px',
    '35px': '35px',
    '42px': '42px',
    '45px': '45px',
    '64px': '64px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Negative margin                https://tailwindcss.com/docs/negative-margin
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your negative margin utility sizes. These can
     | be percentage based, pixels, rems, or any other units. By default we
     | provide matching values to the padding scale since these utilities
     | generally get used together. You can, of course, modify these
     | values as needed.
     |
     | Class name: .-m{side?}-{size}
     | CSS property: margin
     |
   */

  negativeMargin: {
    'px': '1px',
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
    '32': '8rem',
    '2px': '2px',
    '4px': '4px',
    '5px': '5px',
    '6px': '6px',
    '8px': '8px',
    '10px': '10px',
    '15px': '15px',
    '16px': '16px'
  },


  /*
     |-----------------------------------------------------------------------------
     | Shadows                                https://tailwindcss.com/docs/shadows
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your shadow utilities. As you can see from
     | the defaults we provide, it's possible to apply multiple shadows
     | per utility using comma separation.
     |
     | If a `default` shadow is provided, it will be made available as the non-
     | suffixed `.shadow` utility.
     |
     | Class name: .shadow-{size?}
     | CSS property: box-shadow
     |
   */

  shadows: {
    default: '0 2px 4px 0 rgba(0,0,0,0.10)',
    'md': '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
    'lg': '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
    'inner': 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    'outline': '0 0 0 3px rgba(52,144,220,0.5)',
    'none': 'none',
  },


  /*
     |-----------------------------------------------------------------------------
     | Z-index                                https://tailwindcss.com/docs/z-index
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your z-index utility values. By default we
     | provide a sensible numeric scale. You can, of course, modify these
     | values as needed.
     |
     | Class name: .z-{index}
     | CSS property: z-index
     |
   */

  zIndex: {
    'auto': 'auto',
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
  },


  /*
     |-----------------------------------------------------------------------------
     | Opacity                                https://tailwindcss.com/docs/opacity
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your opacity utility values. By default we
     | provide a sensible numeric scale. You can, of course, modify these
     | values as needed.
     |
     | Class name: .opacity-{name}
     | CSS property: opacity
     |
   */

  opacity: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '100': '1',
  },


  /*
     |-----------------------------------------------------------------------------
     | SVG fill                                   https://tailwindcss.com/docs/svg
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your SVG fill colors. By default we just provide
     | `fill-current` which sets the fill to the current text color. This lets you
     | specify a fill color using existing text color utilities and helps keep the
     | generated CSS file size down.
     |
     | Class name: .fill-{name}
     | CSS property: fill
     |
   */

  svgFill: colors,


  /*
     |-----------------------------------------------------------------------------
     | SVG stroke                                 https://tailwindcss.com/docs/svg
     |-----------------------------------------------------------------------------
     |
     | Here is where you define your SVG stroke colors. By default we just provide
     | `stroke-current` which sets the stroke to the current text color. This lets
     | you specify a stroke color using existing text color utilities and helps
     | keep the generated CSS file size down.
     |
     | Class name: .stroke-{name}
     | CSS property: stroke
     |
   */

  svgStroke: colors,


  /*
     |-----------------------------------------------------------------------------
     | Modules                  https://tailwindcss.com/docs/configuration#modules
     |-----------------------------------------------------------------------------
     |
     | Here is where you control which modules are generated and what variants are
     | generated for each of those modules.
     |
     | Currently supported variants:
     |   - responsive
     |   - hover
     |   - focus
     |   - focus-within
     |   - active
     |   - group-hover
     |
     | To disable a module completely, use `false` instead of an array.
     |
   */

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: false,
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'focus'],
    svgFill: [],
    svgStroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive']
  },


  /*
     |-----------------------------------------------------------------------------
     | Plugins                                https://tailwindcss.com/docs/plugins
     |-----------------------------------------------------------------------------
     |
     | Here is where you can register any plugins you'd like to use in your
     | project. Tailwind's built-in `container` plugin is enabled by default to
     | give you a Bootstrap-style responsive container component out of the box.
     |
     | Be sure to view the complete plugin documentation to learn more about how
     | the plugin system works.
     |
   */

  // plugins: [
  //   require('tailwindcss/plugins/container')({
  //     // center: true,
  //     // padding: '1rem',
  //   }),
  // ],


  /*
     |-----------------------------------------------------------------------------
     | Advanced Options         https://tailwindcss.com/docs/configuration#options
     |-----------------------------------------------------------------------------
     |
     | Here is where you can tweak advanced configuration options. We recommend
     | leaving these options alone unless you absolutely need to change them.
     |
   */

  options: {
    prefix: '',
    important: true,
    separator: ':',
  },

}
