(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[544],{9206:function(e,t,n){const r=n(67294);e.exports=function(e){return r.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","aria-hidden":"true"},e),r.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"}))}},41609:function(e,t,n){var r=n(280),i=n(64160),s=n(35694),a=n(1469),l=n(98612),o=n(44144),c=n(25726),u=n(36719),d=Object.prototype.hasOwnProperty;e.exports=function(e){if(null==e)return!0;if(l(e)&&(a(e)||"string"==typeof e||"function"==typeof e.splice||o(e)||u(e)||s(e)))return!e.length;var t=i(e);if("[object Map]"==t||"[object Set]"==t)return!e.size;if(c(e))return!r(e).length;for(var n in e)if(d.call(e,n))return!1;return!0}},73303:function(e,t,n){var r=n(67206),i=n(67762);e.exports=function(e,t){return e&&e.length?i(e,r(t,2)):0}},87017:function(e,t,n){"use strict";var r=n(5887),i=n(11163),s=n(67294),a=n(62653),l=n(85893);t.Z=function(){var e=(0,i.useRouter)(),t=(0,s.useState)(!1),n=t[0],o=t[1],c=(0,s.useState)(!1),u=c[0],d=c[1],p=(0,r.J)().isLoggedIn,x=e.query.resetPassword;(0,s.useEffect)((function(){x?(o(!0),d(!0)):d(!1)}),[x]),(0,s.useEffect)((function(){p||o(!0)}),[p]);return(0,l.jsx)("div",{className:"w-full",children:(0,l.jsx)(a.Z,{active:n,toggleLoginModal:function(){o(!n)},openResetPassword:u,onCloseModal:function(){o(!n),p||e.back()},isCheck:!0})})}},29534:function(e,t,n){"use strict";var r=n(67294),i=n(85893);t.Z=function(e){var t=e.title,n=e.name,s=e.valueInput,a=e.placeholder,l=e.onChange,o=e.onError,c=e.numberCheck,u=e.require,d=e.textarea,p=e.disabled,x=e.type,m=e.click,h=(0,r.useState)(s||""),f=h[0],g=h[1];return(0,r.useEffect)((function(){o&&(f.replace(/\s/g,"")||g(""),!f&&u?o(n):o(n,!0))}),[f]),(0,i.jsxs)("div",{className:"w-full",children:[(0,i.jsxs)("label",{className:"w-full text-[14px] uppercase",children:[t,u?"*":""]}),(0,i.jsxs)("div",{className:"".concat(p?"pointer-events-none bg-[#EFEFEF]":""," w-full h-min-[48px] mt-[12px] relative p-[11px] border ").concat(m&&!f&&u?"border-[#DA0714]":"border-mgrey"),children:[d?(0,i.jsx)("textarea",{className:"w-[96%] sm:w-[93%] h-min-[30px] text-[14px] resize-none focus:outline-none ml-[5px] ".concat(m&&!f&&u?"placeholder:text-red":""),name:n,value:f,cols:30,rows:4,placeholder:m&&!f&&u?"Required":"",spellCheck:!1,onChange:function(e){g(c&&e.target.value.length>c?e.target.value.slice(0,c):e.target.value),l(e)}}):(0,i.jsx)("input",{className:"w-[90%] sm:w-[97%] p-[0px] text-[14px] focus:outline-none ".concat(m&&!f&&u?"placeholder:text-red":"placeholder:text-mgrey"),type:x||"text",name:n,value:f,placeholder:m&&!f&&u?"Required":a||"",spellCheck:!1,onChange:function(e){g(c&&e.target.value.length>c?e.target.value.slice(0,c):e.target.value),l(e)},disabled:p}),c?(0,i.jsxs)("div",{className:"float-right text-[12px] ".concat(d?"w-[15%] sm:w-[7%] absolute bottom-[9px] right-[3px]":"w-[10%] sm:w-[3%] mt-[5px]"),children:[f.length,"/",c]}):null]})]})}},37991:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});n(67294);var r=n(25675),i=n(85893),s=function(e){var t=e.toggleConditionModal,n=e.active;return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("div",{className:"overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ".concat(n?"":"hidden"),children:(0,i.jsx)("div",{className:"relative my-6 mx-auto w-11/12 md:w-420",children:(0,i.jsxs)("div",{className:"border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none",children:[(0,i.jsx)("div",{className:"flex items-start justify-end px-4 py-4",children:(0,i.jsx)("button",{className:"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:t,children:(0,i.jsx)("span",{className:"bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]",children:(0,i.jsx)(r.default,{src:"/assets/images/close.svg",alt:"",layout:"fill"})})})}),(0,i.jsx)("div",{className:"relative flex-auto pb-16 px-6",children:(0,i.jsxs)("div",{className:"text-center text-sm",children:[(0,i.jsx)("h3",{className:"font-helveticaNeue500 text-2xl uppercase mb-4",children:"condition guide"}),(0,i.jsx)("h4",{className:"font-helveticaNeue500 text-sm uppercase mb-1 mt-4",children:"Never worn"}),(0,i.jsx)("p",{children:"The item has never been used or worn, much like brand new."}),(0,i.jsx)("h4",{className:"font-helveticaNeue500 text-sm uppercase mb-1 mt-4",children:"EXCELLENT"}),(0,i.jsx)("p",{children:"The item has barely been used or worn and has minimal signs of usage."}),(0,i.jsx)("h4",{className:"font-helveticaNeue500 text-sm uppercase mb-1 mt-4",children:"VERY GOOD"}),(0,i.jsx)("p",{children:"The item has been used or worn and has some visible signs of wear."}),(0,i.jsx)("h4",{className:"font-helveticaNeue500 text-sm uppercase mb-1 mt-4",children:"GOOD"}),(0,i.jsx)("p",{children:"The item has been used or worn and shows signs of wear."}),(0,i.jsx)("h4",{className:"font-helveticaNeue500 text-sm uppercase mb-1 mt-4",children:"Moderate"}),(0,i.jsx)("p",{children:"The item has obvious signs of wear."})]})})]})})})})};t.C=s},55995:function(e,t,n){"use strict";var r=n(67294),i=n(56727),s=n(25675),a=n(85893),l=function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter(Boolean).join(" ")};t.Z=function(e){var t=e.name,n=e.label,o=e.data,c=e.onChange,u=e.classes,d=void 0===u?"":u,p=e.value,x=e.error,m=e.touched,h=e.require,f=e.classesCustomSelect,g=e.typeChar,v=(0,r.useState)(),b=v[0],j=v[1];return(0,r.useEffect)((function(){if(p&&o){var e=o.find((function(e){var t;return e.name===p||(null===(t=e.value)||void 0===t?void 0:t.toString())===p}));j(e)}}),[o,p]),(0,a.jsx)("div",{children:(0,a.jsx)(i.Ri,{value:b,onChange:function(e){j(e),null===c||void 0===c||c(e)},children:function(e){var c=e.open;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i.Ri.Label,{className:"block text-[14px] uppercase",children:[n," ",h?"*":""]}),(0,a.jsxs)("div",{className:"relative ".concat(d),children:[(0,a.jsxs)(i.Ri.Button,{className:"h-[44px] w-full bg-white text-[14px] focus-none text-left border pt-[8px] pb-[6px] px-3 ".concat(b?g||"capitalize":"text-mgrey"," ").concat(x&&m?"!border-[#DA0714]":"border-mgrey"," ").concat(f),children:[(0,a.jsx)("span",{className:"block truncate pl-[1px] leading-1.25 ".concat(x&&m?"text-red":""),children:x&&m?"Required":b?b.name:"Select"}),(0,a.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,a.jsx)("div",{className:"h-5 w-5 transition-transform duration-300",children:c?(0,a.jsx)(s.default,{src:"/assets/images/angle-down.svg",alt:"",width:10,height:10}):(0,a.jsx)(s.default,{src:"/assets/images/angle-up.svg",alt:"",width:10,height:10})})})]}),(0,a.jsx)(i.uT,{show:c,as:r.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)(i.Ri.Options,{className:"w-full max-h-60 font-helveticaNeue400 bg-white text-xs absolute border border-mgrey border-t-0 overflow-auto scrollbar-thin z-10 outline-0 focus:outline-0 z-50",children:o.map((function(e,n){return"Select"!==e.name&&(0,a.jsx)(i.Ri.Option,{className:function(e){var t=e.active;return l(t?"bg-gray-100":"","cursor-pointer select-none relative hover:bg-[#111111] hover:text-white")},value:{id:e.id?e.id:n,name:e.name,value:e.value,field:t},children:function(t){var n=t.selected;return(0,a.jsx)("span",{className:l(n?"font-medium bg-gray-100 py-2 px-3":"font-normal","py-2 px-3 block truncate",g||"capitalize"),children:e.name})}},n)}))})})]})]})}})})}},26260:function(e,t,n){"use strict";var r=n(9008),i=n(25675),s=n(67294),a=n(41664),l=n(78505),o=n(85893);t.Z=function(e){var t=e.children,n=e.title,c=(0,l.h3)().step,u=(0,s.useState)(!1),d=u[0],p=u[1];return(0,o.jsxs)("div",{className:"m-auto z-0",children:[(0,o.jsxs)(r.default,{children:[(0,o.jsx)("title",{children:"Sell the Best of GANNI Pre-loved Fashion on GANNIREPEAT"}),(0,o.jsx)("meta",{name:"description",content:"Extend the life of your wardrobe and Give your Pre-Loved GANNI Iconic Pieces a new Lease of Life by Selling them on GANNIREPEAT."}),(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,o.jsxs)("div",{className:"w-full mt-3 lg:mt-0 flex flex-wrap lg:bg-lightGrey flex-row-reverse",children:[(0,o.jsx)("div",{className:"".concat(d?"lg:w-[30%]":"lg:w-[100px]"," md:float-right lg:pb-[56px] lg:px-[24px] w-full lg:min-h-screen lg:border-2 lg:border-green"),children:(0,o.jsx)("div",{className:"w-full m-auto flex flex-col",children:(0,o.jsxs)("div",{className:"-mx-[18px] sm:mx-0 lg:mx-0 lg:mb-0",children:[(0,o.jsxs)("div",{className:"bg-green text-white lg:hidden uppercase py-4 px-[18px]",onClick:function(){return p(!d)},children:["how to sell",(0,o.jsx)("div",{className:"".concat(d?"rotate-45":""," inline-block cursor-pointer float-right"),children:(0,o.jsx)(i.default,{src:"/assets/icons/plus-2.svg",alt:"",width:20,height:20})})]}),(0,o.jsx)("div",{className:"".concat(d?"block":"hidden"," lg:block bg-lightGrey px-[18px] lg:px-0 pt-6 lg:pt-0"),children:(0,o.jsxs)("div",{className:"pb-8 lg:pb-0",children:[(0,o.jsx)("div",{className:"text-center ".concat(d?"text-right pr-4":"text-center"," py-6 hidden lg:block"),children:(0,o.jsx)("div",{className:"".concat(d?"rotate-45":""," inline-block cursor-pointer"),onClick:function(){return p(!d)},children:(0,o.jsx)(i.default,{src:"/assets/images/plus2.svg",alt:"",width:20,height:20})})}),(0,o.jsxs)("div",{className:"".concat(d?"":"md:h-[150px]"," mt-[0px] mb-[48px]"),children:[(0,o.jsx)("h3",{className:"".concat(d?"text-xs":"rotate-90 text-[24px] leading-none mr-2"," font-helveticaNeue500 hidden md:block ease-in uppercase text-green whitespace-nowrap"),children:"How to sell"}),(0,o.jsx)("h2",{className:"".concat(d?"block":"hidden"," block pt-2 text-3xl text-green uppercase"),children:"RESELLING YOUR PRE-LOVED GANNI IS AS EASY AS 1,2,3"})]}),(0,o.jsxs)("div",{className:"".concat(d?"hidden":"block mb-[232px]"),children:[(0,o.jsx)("div",{className:"w-[48px] h-[48px] mb-[50px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Label.svg",alt:"",width:48,height:48})}),(0,o.jsx)("div",{className:"w-[48px] h-[48px] mb-[50px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Package.svg",alt:"",width:48,height:48})}),(0,o.jsx)("div",{className:"w-[48px] h-[48px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Payout.svg",alt:"",width:48,height:48})})]}),(0,o.jsxs)("ul",{className:"".concat(d?"block":"hidden"," mb-12"),children:[(0,o.jsxs)("li",{className:"flex mb-6",children:[(0,o.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Label.svg",alt:"",width:50,height:50})}),(0,o.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,o.jsx)("h3",{className:"uppercase",children:"List your item"}),(0,o.jsx)("p",{children:"Tell us about your item including details of its condition and photos, then upload the listing for sale on GANNI REPEAT."})]})]}),(0,o.jsxs)("li",{className:"flex mb-6",children:[(0,o.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Package.svg",alt:"",width:50,height:50})}),(0,o.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,o.jsx)("h3",{className:"uppercase",children:"Ship your item for free"}),(0,o.jsx)("p",{children:"Once sold, ship your item for free using our pre-paid shipping label. Alternatively, entice buyers with free shipping."})]})]}),(0,o.jsxs)("li",{className:"flex mb-6",children:[(0,o.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,o.jsx)(i.default,{className:"w-full",src:"/assets/images/Payout.svg",alt:"",width:50,height:50})}),(0,o.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,o.jsx)("h3",{className:"uppercase",children:"Choose payment"}),(0,o.jsx)("p",{children:"Choose to be paid in either cash or a GANNI gift card with an extra 20% value."})]})]})]}),(0,o.jsx)("div",{className:"".concat(d?"block":"hidden"),children:(0,o.jsx)("div",{className:"border-2 border-pink py-8 bg-white",children:(0,o.jsxs)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:[(0,o.jsx)("p",{className:"text-pink uppercase text-xs mb-2",children:"Learn more"}),(0,o.jsxs)("h2",{className:"text-pink uppercase text-2xl xl:text-3xl",children:["Got a question? read our"," ",(0,o.jsx)("a",{href:"https://ganni-customerservice.zendesk.com/hc/en-us",className:"text-pink uppercase text-2xl xl:text-3xl underline",target:"_blank",rel:"noopener noreferrer",children:"FAQs"})]})]})})})]})})]})})}),(0,o.jsxs)("div",{className:"".concat(d?"lg:w-[70%]":"lg:w-[90%]"," md:float-left bg-white py-6 lg:py-[48px] px-0 sm:px-6 lg:px-[80px] w-full lg:w-auto lg:flex-1"),children:[n?(0,o.jsxs)("div",{className:"mb-[48px]",children:[(0,o.jsx)("h2",{className:"text-2xl font-helveticaNeue500 uppercase text-center",children:n}),(0,o.jsx)("div",{className:"w-full flex justify-center item-center mt-[18px]",children:(0,o.jsx)("div",{className:"w-[660px] grid grid-cols-4 grid-rows-1",children:["Details","Pictures","Price","Address"].map((function(e,t){return(0,o.jsx)("div",{className:"w-full",children:t<c+1?(0,o.jsx)(a.default,{href:"/sell/step-".concat(t+1),children:(0,o.jsx)("a",{children:(0,o.jsxs)("div",{className:"cursor-pointer",children:[(0,o.jsx)("div",{className:"w-full flex flex-col justify-center item-center",children:(0,o.jsx)(i.default,{src:"/assets/icons/bg-active.svg",alt:"",width:18,height:20})}),(0,o.jsxs)("div",{className:"text-center text-[#2E9A60] mt-[8px]",children:[t+1,". ",e]})]})})}):(0,o.jsxs)("div",{className:"cursor-pointer",children:[(0,o.jsx)("div",{className:"w-full flex flex-col justify-center item-center",children:(0,o.jsx)(i.default,{src:"/assets/icons/bg-default.svg",alt:"",width:18,height:20})}),(0,o.jsxs)("div",{className:"text-center text-[#C4C4C4] mt-[8px]",children:[t+1,". ",e]})]})},e.toString())}))})})]}):null,t]})]})]})}},2966:function(e,t,n){"use strict";n.d(t,{W:function(){return s}});var r=n(46837),i=n(88767),s=function(){return(0,i.useQuery)("getCurrency",(function(){return(0,r.h)("currency",{method:"get"})}))}},78505:function(e,t,n){"use strict";n.d(t,{h3:function(){return l},A4:function(){return o}});var r=n(46837),i=n(88767),s=n(14671),a=n(38597),l=(0,s.Z)((0,a.tJ)((function(e){return{product:{},step:0,resetProduct:function(){return e({product:{},step:0})},setProduct:function(t){return e({product:t})},setStep:function(t){return e({step:t})}}}),{name:"product"})),o=function(){return(0,i.useMutation)((function(e){return(0,r.h)("products/".concat(e,"/light"),{method:"GET"})}),{})}},64222:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return D}});var r=n(4942),i=n(42982),s=n(29534),a=n(37991),l=n(55995),o=n(26260),c=n(67294),u=n(9206),d=n.n(u),p=n(46837),x=n(88767),m=n(85893),h=function(e){var t=e.label,n=e.options,r=e.onChange,s=e.selectedValues,a=e.isAdd,l=(0,c.useState)(n),o=l[0],u=l[1],h=(0,c.useState)(s),f=h[0],g=h[1],v=(0,c.useState)(!1),b=v[0],j=v[1],N=(0,c.useState)(),w=N[0],y=N[1],_=(0,x.useMutation)((function(e){return(0,p.h)("styles",{method:"post",body:JSON.stringify(e)})})).mutate;return(0,m.jsxs)("div",{className:"w-full h-min-[40px]",children:[(0,m.jsx)("label",{className:"uppercase text-[14px]",children:t}),(0,m.jsxs)("div",{className:"w-full h-auto mt-[10px]",children:[o.map((function(e){return(0,m.jsx)("div",{className:"w-min-[44px] ".concat(f.find((function(t){return t.value===e.value}))?"bg-dark text-white border border-dark":"border border-[#111111]"," inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]"),onClick:function(){return function(e){var t=[];t=f.find((function(t){return t.value===e.value}))?f.filter((function(t){return t.value!==e.value})):[].concat((0,i.Z)(f),[e]),r(t),g(t)}(e)},children:e.name},function(e){var t=e.toLowerCase().split(" ");return t.length>0?t.join("-"):t.join("")}(e.name).toString())})),a&&(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)("div",{className:"w-min-[44px] relative border border-[#111111] inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]",onClick:function(){return b?"":function(){var e;null===(e=document.getElementById("add"))||void 0===e||e.focus(),j(!0)}()},children:b?(0,m.jsxs)("div",{onClick:function(){y(void 0),j(!1)},children:[(0,m.jsx)("input",{type:"text",id:"add",name:"add",value:w,className:"w-[80%] h-[16px] pt-1 focus:outline-none text-black bg-white",placeholder:"New tag",autoComplete:"off",spellCheck:!1,onChange:function(e){e.preventDefault(),y(e.target.value)},autoFocus:!0}),(0,m.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none cursor-pointer",children:(0,m.jsx)(d(),{className:"ml-2 h-5 w-5","aria-hidden":"true"})})]}):(0,m.jsx)("p",{className:"text-[12px] font-helveticaNeue500",children:"+ ADD YOUR OWN"})}),b&&(0,m.jsx)("div",{className:"w-min-[44px] bg-black text-white relative border border-[#111111] inline float-left text-[12px] font-helveticaNeue500 mr-[12px] mb-[20px] uppercase cursor-pointer h-44px p-[12px] m-[20px 20px 20px 0px]",onClick:function(){if(b&&w){var e={name:w,sort_order:o.length+1,style_type:"WEARS"};_(e,{onSuccess:function(e){var t={id:e.id,name:e.name,value:String(e.id)};u([].concat((0,i.Z)(o),[t])),g([].concat((0,i.Z)(f),[t])),y(void 0)}})}j(!b)},children:"Save"})]})]}),(0,m.jsx)("div",{className:"clear-both"})]})},f=n(15861),g=n(87757),v=n.n(g),b=n(94649),j=n(25675),N=n(11163),w=n(78505),y=n(5887),_=n(41609),S=n.n(_),E=n(27335),k=n(22283),C=n(2966),F=n(88615),O=n(87517),P=n(87017);function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function R(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function D(){var e,t,n,r,u,d=(0,c.useState)(),g=d[0],_=d[1],T=(0,c.useState)(),D=T[0],L=T[1],A=(0,c.useState)(),Z=A[0],V=A[1],z=(0,c.useState)(!1),M=z[0],I=z[1],G=(0,c.useState)(["name","description"]),q=G[0],W=G[1],B=(0,c.useState)(!1),K=B[0],U=B[1],Y=(0,c.useState)(),J=Y[0],Q=Y[1],X=function(){var e=(0,c.useState)([]),t=e[0],n=e[1],r=(0,c.useState)(),i=r[0],s=r[1],a=function(){var e=(0,f.Z)(v().mark((function e(){var t,r,i;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.h)("categories/all",{method:"GET"});case 2:(t=e.sent)&&(r=t.filter((function(e){return e.parent_id<1})).map((function(e){return{id:Number(e.id),name:e.name,value:String(e.id)}})),i=t.map((function(e){return{id:e.id,name:e.name,code:String(e.id),parent_id:e.parent_id}})),n(r),s(i));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){0===t.length&&a()}),[t]),{categories:t,subCategories:i}}(),H=X.categories,$=X.subCategories,ee=function(){var e=(0,c.useState)(),t=e[0],n=e[1],r=function(){var e=(0,f.Z)(v().mark((function e(){var t,r;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.h)("colors",{method:"GET"});case 2:(t=e.sent)&&(r=t.map((function(e){return{id:Number(e.id),name:e.name,value:String(e.id)}})),n(r));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){t||r()}),[t]),{colors:t}}().colors,te=function(){var e=(0,c.useState)(),t=e[0],n=e[1],r=function(){var e=(0,f.Z)(v().mark((function e(){var t,r;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.h)("sizes",{method:"GET"});case 2:(t=e.sent)&&(r=t.map((function(e){return{id:Number(e.id),name:e.name,value:String(e.id),field:e.type}})),n(r));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){t||r()}),[t]),{sizes:t}}().sizes,ne=function(){var e=(0,c.useState)(),t=e[0],n=e[1],r=function(){var e=(0,f.Z)(v().mark((function e(){var t,r;return v().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,p.h)("materials",{method:"GET"});case 2:(t=e.sent)&&(r=t.map((function(e){return{id:Number(e.id),name:e.name,value:String(e.id)}})),n(r));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,c.useEffect)((function(){t||r()}),[t]),{materials:t}}().materials,re=function(){var e=(0,c.useState)(),t=e[0],n=e[1],r=(0,x.useQuery)("getCondition",(function(){return(0,p.h)("conditions",{method:"get"})})).data;return(0,c.useEffect)((function(){if(r){var e=r.map((function(e){return{id:Number(e.id),name:e.name.toLowerCase(),value:String(e.id)}}));n([{name:"Select"}].concat((0,i.Z)(e)))}}),[r]),{conditions:t}}().conditions,ie=(0,C.W)().data,se=(0,c.useState)(),ae=se[0],le=se[1],oe=(0,O.u)().browserCurrency,ce=(0,c.useState)([]),ue=ce[0],de=ce[1],pe=(0,c.useState)([]),xe=pe[0],me=pe[1];(0,c.useEffect)((function(){if(ie&&ie.length>0){var e=ie.filter((function(e){return!e.base})).map((function(e){return{value:"".concat(e.id),name:e.code}}));le(e)}}),[ie]);var he=function(){var e=(0,c.useState)([]),t=e[0],n=e[1],r=(0,c.useState)([]),i=r[0],s=r[1],a=(0,x.useQuery)("styles",(function(){return(0,p.h)("styles")}),{refetchOnWindowFocus:!1}).data;return(0,c.useEffect)((function(){if(a){var e=a;if(t.length<1){var r=e.filter((function(e){return"STYLES"===e.style_type})).sort((function(e,t){return e.sort_order-t.sort_order})).map((function(e){return{id:e.id,name:e.name,value:String(e.id)}}));n(r)}if(i.length<1){var l=e.filter((function(e){return"WEARS"===e.style_type})).map((function(e){return{id:e.id,name:e.name,value:String(e.id)}}));s(l)}}}),[a]),{tagStyes:t,tagWears:i}}(),fe=he.tagStyes,ge=he.tagWears,ve=(0,w.h3)(),be=ve.setProduct,je=ve.setStep,Ne=ve.product;(0,c.useEffect)((function(){ue.length<1&&de(fe),xe.length<1&&me(ge)}),[ue,xe,fe,ge]),(0,c.useEffect)((function(){var e;!S()(Ne)&&H.length>0&&$&&$.length>0&&(_(null===(e=Ne.category)||void 0===e?void 0:e.value),Fe(Ne.category),Ee.setFieldValue("category",_e(Ne.category.value)),Ee.setFieldValue("color",_e(Ne.color_id.value)),Ee.setFieldValue("size",_e(Ne.size.value)),Ee.setFieldValue("condition",_e(Ne.condition.value)),Ee.setFieldValue("sub_category",_e(Ne.sub_category.value)),Ee.setFieldValue("material",_e(Ne.material.value)),Ee.setFieldValue("composition",_e(Ne.composition)),Ee.setFieldValue("name",_e(Ne.name)),Ee.setFieldValue("description",_e(Ne.description)),Ee.setFieldValue("styles",Ne.styles),Ee.setFieldValue("tag_signs",Ne.tag_signs),Ee.setFieldValue("original_price_currency_id",_e(Ne.original_price_currency_id)),Ee.setFieldValue("original_price",Ne.original_price))}),[Ne,H,$]);var we=(0,y.J)().isLoggedIn,ye=function(e,t){if(t||q.includes(e)){var n=q.filter((function(t){return t!==e}));W((0,i.Z)(n))}else W([].concat((0,i.Z)(q),[e]))},_e=function(e){return String(e)},Se=(0,N.useRouter)(),Ee=(0,b.TA)({enableReinitialize:!0,initialValues:{category:"",designer:"",condition:"",sub_category:"",color:"",size:"",material:"",styles:[],composition:"",name:"",tag_signs:[],description:"",original_price_currency_id:"",original_price:""},validationSchema:k.CI,onSubmit:function(e){if(q.length<1&&e){var t=ae?ae.find((function(t){return t.value===e.original_price_currency_id})):void 0,n={category:ke(H,String(e.category)),condition:ke(re,String(e.condition)),color_id:ke(ee,String(e.color)),size:ke(te,String(e.size)),material:ke(ne,String(e.material)),sub_category:ke(D,String(e.sub_category)),styles:e.styles,composition:e.composition,name:e.name,tag_signs:e.tag_signs,description:e.description,original_price:e.original_price,original_price_currency_id:e.original_price_currency_id,original_currency:t,original_price_eur:(0,F.Mi)(Number(e.original_price),t?t.name:"EUR",oe)};be(R(R({},Ne),n)),Ne.id||je(1),Se.push("/sell/step-2")}}}),ke=function(e,t){return e&&e.find((function(e){return String(e.value)===t}))},Ce=function(e){Ee.setFieldValue("".concat(e.field),e.value)},Fe=function(e){Ce(e);var t=null===H||void 0===H?void 0:H.find((function(t){return t.name===e.name})),n="";if($){var r=$.filter((function(e){return e.parent_id===(null===t||void 0===t?void 0:t.id)})).map((function(e){return{id:Number(e.id),name:e.name,value:e.code}})),i=r.find((function(e){var t;return String(e.value)===(null===(t=Ne.sub_category)||void 0===t?void 0:t.value)}));n=String(null===i||void 0===i?void 0:i.value),Q(n),L(r)}if(te){var s=te.filter((function(e){return String(e.field)===String(null===t||void 0===t?void 0:t.name)}));V(s)}n&&Ne.sub_category?Ee.setFieldValue("sub_category",n):Ee.setFieldValue("sub_category",""),_(e.value)};return we?(0,m.jsxs)("div",{className:"".concat(!g&&"!pb-[280px]"," md:pb-0"),children:[(0,m.jsxs)(o.Z,{title:"List your item",children:[(0,m.jsxs)("form",{onSubmit:Ee.handleSubmit,children:[(0,m.jsx)(l.Z,{label:"Category",name:"category",onChange:function(e){return Fe(e)},data:H||[],classes:"mt-[12px]",value:null===(e=Ne.category)||void 0===e?void 0:e.name}),g&&(0,m.jsxs)("div",{className:"w-full",children:[(0,m.jsx)("div",{className:"w-full pt-[24px]",children:"We would love to know more about your item and its condition."}),(0,m.jsxs)("div",{className:"w-full grid grid-cols-1 md:grid-cols-3 grid-rows-1 gap-4 mt-[24px]",children:[(0,m.jsx)(l.Z,{label:"Sub-category",name:"sub_category",classes:"mt-[12px]",onChange:Ce,data:D||[],require:!0,value:J,error:Ee.errors.sub_category,touched:Ee.touched.sub_category,errorMessage:Ee.errors.sub_category&&Ee.touched.sub_category?Ee.errors.sub_category:""}),(0,m.jsx)(l.Z,{label:"Colour",name:"color",classes:"mt-[12px]",onChange:Ce,data:ee||[],require:!0,value:null===(t=Ne.color_id)||void 0===t?void 0:t.value,error:Ee.errors.color,touched:Ee.touched.color,errorMessage:Ee.errors.color&&Ee.touched.color?Ee.errors.color:""}),(0,m.jsx)(l.Z,{label:"Size",name:"size",onChange:Ce,classes:"mt-[12px]",data:Z||[],require:!0,value:null===(n=Ne.size)||void 0===n?void 0:n.value,error:Ee.errors.size,touched:Ee.touched.size,errorMessage:Ee.errors.size&&Ee.touched.size?Ee.errors.size:""})]}),(0,m.jsx)("div",{className:"w-full my-[48px]",children:(0,m.jsx)("hr",{className:"w-full border border-b-[#111111]"})}),(0,m.jsxs)("div",{className:"w-full border border-[#E25B8B] h-[60px] sm:h-[48px] flex",children:[(0,m.jsx)("div",{className:"w-[48px] h-[48px] pt-[4px] sm:pt-[0px] sm:w-[24px] sm:h-[24px] m-[12px]",children:(0,m.jsx)(j.default,{src:"/assets/icons/info.svg",alt:"",width:24,height:24})}),(0,m.jsx)("span",{className:"text-[14px] pt-[10px] md:pt-[14px] lg:pt-[16px]",children:"Please provide as accurate information on your item as possible to keep your buyer happy."})]}),(0,m.jsx)("div",{className:"w-full h-auto mt-[24px]",children:(0,m.jsx)(s.Z,{title:"item title",name:"name",numberCheck:28,placeholder:"Eg. Leather mini dress",onChange:Ee.handleChange,onError:function(e,t){e&&ye(e,t)},click:M,require:!0,valueInput:null===Ne||void 0===Ne?void 0:Ne.name})}),(0,m.jsx)("div",{className:"w-full mt-[24px]",children:(0,m.jsx)(h,{label:"Tag any relevant pattern(s)",options:ue,onChange:function(e){return Ee.setFieldValue("styles",e)},selectedValues:Ne.styles||[]})}),(0,m.jsxs)("div",{className:"w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 mt-[24px]",children:[(0,m.jsx)(l.Z,{label:"Condition",name:"condition",classes:"mt-[12px]",onChange:Ce,data:re||[],require:!0,value:null===(r=Ne.condition)||void 0===r?void 0:r.value,error:Ee.errors.condition,touched:Ee.touched.condition,errorMessage:Ee.errors.condition&&Ee.touched.condition?Ee.errors.condition:""}),(0,m.jsx)("div",{className:"w-full",children:(0,m.jsxs)("div",{className:"w-full mt-[28px] border border-[#E25B8B] h-[48px] flex",children:[(0,m.jsx)("div",{className:"pt-[0px] w-[24px] h-[24px] m-[12px]",children:(0,m.jsx)(j.default,{src:"/assets/icons/info.svg",alt:"",width:24,height:24})}),(0,m.jsxs)("span",{className:"text-[14px] pt-[14px]",children:["See our"," ",(0,m.jsx)("span",{className:"underline cursor-pointer",onClick:function(){return U(!0)},children:"Condition guide"})," ","for more information."]})]})})]}),(0,m.jsxs)("div",{className:"w-full mt-[24px]",children:[(0,m.jsx)("label",{htmlFor:"",className:"uppercase text-[14px]",children:"Estimated original price*"}),(0,m.jsxs)("div",{className:"flex space-x-2 items-end",children:[ae&&(0,m.jsx)("div",{className:"w-[30%] sm:w-[15%] md:w-[10%] relative",children:(0,m.jsx)(l.Z,{label:"",name:"original_price_currency_id",classes:"mt-[12px] mb-[3px] absolute top-[3px] left-[0px]",onChange:Ce,data:ae,value:Ee.values.original_price_currency_id,error:Ee.errors.original_price_currency_id,touched:Ee.touched.original_price_currency_id,errorMessage:Ee.errors.original_price_currency_id&&Ee.touched.original_price_currency_id?Ee.errors.original_price_currency_id:""})}),(0,m.jsx)("div",{className:"w-[70%] sm:w-[85%] md:w-[90%]",children:(0,m.jsx)(E.Z,{name:"original_price",label:"",labelClasses:"font-helveticaNeue400 text-sm",value:Ee.values.original_price,classes:"h-[20px]",onChange:Ee.handleChange,errorMessage:Ee.errors.original_price&&Ee.touched.original_price?Ee.errors.original_price:""})})]})]}),(0,m.jsx)("div",{className:"w-full mt-[24px]",children:(0,m.jsx)(h,{label:"Tag any signs of wear",options:xe,onChange:function(e){return Ee.setFieldValue("tag_signs",e)},selectedValues:Ne.tag_signs||[],isAdd:!0})}),(0,m.jsx)("div",{className:"w-full mt-[24px]",children:(0,m.jsx)(s.Z,{title:"item description",name:"description",numberCheck:250,placeholder:"Please describe your item and it's condition",onChange:Ee.handleChange,onError:function(e,t){e&&ye(e,t)},click:M,textarea:!0,require:!0,valueInput:null===Ne||void 0===Ne?void 0:Ne.description})}),(0,m.jsxs)("div",{className:"w-full grid grid-cols-1 md:grid-cols-2 grid-rows-1 gap-4 mt-[24px]",children:[(0,m.jsx)(l.Z,{label:"main material",name:"material",classes:"mt-[12px]",onChange:Ce,data:ne||[],require:!0,value:null===(u=Ne.material)||void 0===u?void 0:u.value,error:Ee.errors.material,touched:Ee.touched.material,errorMessage:Ee.errors.material&&Ee.touched.material?Ee.errors.material:""}),(0,m.jsx)(s.Z,{title:"Material composition",name:"composition",placeholder:"This can be found on your item's label",onChange:Ee.handleChange,onError:function(e,t){e&&ye(e,t)},click:M,valueInput:null===Ne||void 0===Ne?void 0:Ne.composition})]}),(0,m.jsx)("div",{className:"w-full mt-[24px]",children:(0,m.jsx)("p",{children:"*Mandatory fields"})})]})]}),g&&(0,m.jsx)("div",{className:"flex justify-center items-center -mx-2 mt-[48px] mb-[40px]",children:(0,m.jsx)("div",{className:"w-2/4 px-2",children:(0,m.jsx)("div",{className:"mb-6",children:(0,m.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:function(){I(!0),Ee.handleSubmit()},children:"next step"})})})})]}),(0,m.jsx)(a.Z,{active:K,toggleConditionModal:function(){return U(!1)}})]}):(0,m.jsx)(P.Z,{})}},88615:function(e,t,n){"use strict";n.d(t,{pD:function(){return a},NM:function(){return l},RL:function(){return o},SX:function(){return c},dI:function(){return u},Mi:function(){return d},FA:function(){return p},JT:function(){return x},Pg:function(){return m},SK:function(){return h},D0:function(){return f}});n(87757);var r=n(9723),i=(n(46837),n(73303)),s=n.n(i),a=function(e,t){var n=t.find((function(t){return t.alpha2Code===e}));return null===n||void 0===n?void 0:n.name},l=function(e,t){return!t||"DKK"!==t.code&&"SEK"!==t.code&&"NOK"!==t.code?Math.ceil(2*e)/2:Math.round(e)},o=function(e){switch(e){case r.i_.SOLD:return"sold";case r.i_.CANCELLED:return"cancelled";case r.i_.RETURNED:return"returned";default:return"sold confirmed"}},c=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?r.DF.COMPLETED:r.DF.PROCESSING},u=function(e){return e.tracking_number?e.status===r.Tb.TRACKED?r.Tb.TRACKED:e.status===r.Tb.DELIVERED?r.Tb.DELIVERED:r.Tb.SHIPPED:r.Tb.PENDING},d=function(e,t,n){var r,i,s=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),a=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return s&&a?s.code===a.code?Number(e.toFixed(2)):Number((e/(s.rate||1)).toFixed(2)):Number(e.toFixed(2))},p=function(e,t,n){var r,i,s=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),a=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return s&&a?s.code===a.code?Number(e.toFixed(2)):Number((e*(s.rate||1)).toFixed(2)):Number(e.toFixed(2))},x=function(e,t,n,r){var i,s,a=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),l=null===(s=r.currencies)||void 0===s?void 0:s.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)}));return a&&l?a.code===l.code?Number(e.toFixed(2)):Number((e*((l.rate||1)/(a.rate||1))).toFixed(2)):Number(e.toFixed(2))},m=function(e,t,n){for(var r=[],i=0;i<e;i++)r.push(t);return r.join("default"===n?"":n||" / ")},h=function(e){return s()(e,(function(e){return e.tax_fee}))},f=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var t=e.type.split("/"),n=["jpeg","jpg","png"];return t[1]&&n.includes(t[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(n.join(", "))}}},51561:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sell/step-1",function(){return n(64222)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=51561,e(e.s=t);var t}));var t=e.O();_N_E=t}]);