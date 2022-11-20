(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8274],{73303:function(e,t,r){var n=r(67206),i=r(67762);e.exports=function(e,t){return e&&e.length?i(e,n(t,2)):0}},87017:function(e,t,r){"use strict";var n=r(5887),i=r(11163),s=r(67294),a=r(62653),c=r(85893);t.Z=function(){var e=(0,i.useRouter)(),t=(0,s.useState)(!1),r=t[0],l=t[1],o=(0,s.useState)(!1),d=o[0],u=o[1],p=(0,n.J)().isLoggedIn,x=e.query.resetPassword;(0,s.useEffect)((function(){x?(l(!0),u(!0)):u(!1)}),[x]),(0,s.useEffect)((function(){p||l(!0)}),[p]);return(0,c.jsx)("div",{className:"w-full",children:(0,c.jsx)(a.Z,{active:r,toggleLoginModal:function(){l(!r)},openResetPassword:d,onCloseModal:function(){l(!r),p||e.back()},isCheck:!0})})}},43042:function(e,t,r){"use strict";r.d(t,{d:function(){return a}});r(67294);var n=r(25675),i=r(11163),s=r(85893),a=function(e){var t=e.error,r=e.toggleCheckCurrencyModal,a=e.active,c=e.editListing,l=e.from,o=(0,i.useRouter)();return(0,s.jsx)("div",{className:"overflow-x-hidden overflow-y-auto fixed inset-0 z-99999 h-screen outline-none focus:outline-none justify-center c-modal bg-dark bg-opacity-75 ".concat(a?"":"hidden"),children:(0,s.jsx)("div",{className:"relative my-6 mx-auto w-11/12 md:w-420",children:(0,s.jsxs)("div",{className:"border-0  relative flex flex-col w-full bg-white outline-none focus:outline-none",children:[(0,s.jsx)("div",{className:"flex items-start justify-end px-4 py-4",children:(0,s.jsx)("button",{className:"p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none",onClick:r,children:(0,s.jsx)("span",{className:"bg-transparent text-black text-2xl block outline-none focus:outline-none relative w-[20px] h-[20px]",children:(0,s.jsx)(n.default,{src:"/assets/images/close.svg",alt:"",layout:"fill"})})})}),(0,s.jsx)("div",{className:"relative flex-auto pb-16 px-6",children:(0,s.jsxs)("div",{className:"text-center text-sm",children:[(0,s.jsx)("h3",{className:"font-helveticaNeue500 text-2xl uppercase mb-4",children:"Currency mismatch between your listing and your bank details"}),(0,s.jsxs)("p",{children:["You selected the currency ",null===t||void 0===t?void 0:t.currency_1," for your listing. However, you selected the currency ",null===t||void 0===t?void 0:t.currency_2," for your bank details. Please modify the currency of your listing or the currency of your bank details."]}),(0,s.jsxs)("div",{className:"flex flex-wrap -mx-2 mt-[48px] mb-[40px]",children:[(0,s.jsx)("div",{className:"w-2/4 px-2",children:(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:function(){r(),c&&o.push("/sell/step-3")},children:"Edit listing"})})}),(0,s.jsx)("div",{className:"w-2/4 px-2",children:(0,s.jsx)("div",{className:"mb-6",children:(0,s.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:function(){r(),l&&o.push("/my-account/bank-details?from=".concat(l))},children:"Edit bank details"})})})]})]})})]})})})}},55995:function(e,t,r){"use strict";var n=r(67294),i=r(56727),s=r(25675),a=r(85893),c=function(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter(Boolean).join(" ")};t.Z=function(e){var t=e.name,r=e.label,l=e.data,o=e.onChange,d=e.classes,u=void 0===d?"":d,p=e.value,x=e.error,h=e.touched,f=e.require,m=e.classesCustomSelect,b=e.typeChar,v=(0,n.useState)(),g=v[0],y=v[1];return(0,n.useEffect)((function(){if(p&&l){var e=l.find((function(e){var t;return e.name===p||(null===(t=e.value)||void 0===t?void 0:t.toString())===p}));y(e)}}),[l,p]),(0,a.jsx)("div",{children:(0,a.jsx)(i.Ri,{value:g,onChange:function(e){y(e),null===o||void 0===o||o(e)},children:function(e){var o=e.open;return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(i.Ri.Label,{className:"block text-[14px] uppercase",children:[r," ",f?"*":""]}),(0,a.jsxs)("div",{className:"relative ".concat(u),children:[(0,a.jsxs)(i.Ri.Button,{className:"h-[44px] w-full bg-white text-[14px] focus-none text-left border pt-[8px] pb-[6px] px-3 ".concat(g?b||"capitalize":"text-mgrey"," ").concat(x&&h?"!border-[#DA0714]":"border-mgrey"," ").concat(m),children:[(0,a.jsx)("span",{className:"block truncate pl-[1px] leading-1.25 ".concat(x&&h?"text-red":""),children:x&&h?"Required":g?g.name:"Select"}),(0,a.jsx)("span",{className:"absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none",children:(0,a.jsx)("div",{className:"h-5 w-5 transition-transform duration-300",children:o?(0,a.jsx)(s.default,{src:"/assets/images/angle-down.svg",alt:"",width:10,height:10}):(0,a.jsx)(s.default,{src:"/assets/images/angle-up.svg",alt:"",width:10,height:10})})})]}),(0,a.jsx)(i.uT,{show:o,as:n.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,a.jsx)(i.Ri.Options,{className:"w-full max-h-60 font-helveticaNeue400 bg-white text-xs absolute border border-mgrey border-t-0 overflow-auto scrollbar-thin z-10 outline-0 focus:outline-0 z-50",children:l.map((function(e,r){return"Select"!==e.name&&(0,a.jsx)(i.Ri.Option,{className:function(e){var t=e.active;return c(t?"bg-gray-100":"","cursor-pointer select-none relative hover:bg-[#111111] hover:text-white")},value:{id:e.id?e.id:r,name:e.name,value:e.value,field:t},children:function(t){var r=t.selected;return(0,a.jsx)("span",{className:c(r?"font-medium bg-gray-100 py-2 px-3":"font-normal","py-2 px-3 block truncate",b||"capitalize"),children:e.name})}},r)}))})})]})]})}})})}},26260:function(e,t,r){"use strict";var n=r(9008),i=r(25675),s=r(67294),a=r(41664),c=r(78505),l=r(85893);t.Z=function(e){var t=e.children,r=e.title,o=(0,c.h3)().step,d=(0,s.useState)(!1),u=d[0],p=d[1];return(0,l.jsxs)("div",{className:"m-auto z-0",children:[(0,l.jsxs)(n.default,{children:[(0,l.jsx)("title",{children:"Sell the Best of GANNI Pre-loved Fashion on GANNIREPEAT"}),(0,l.jsx)("meta",{name:"description",content:"Extend the life of your wardrobe and Give your Pre-Loved GANNI Iconic Pieces a new Lease of Life by Selling them on GANNIREPEAT."}),(0,l.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,l.jsxs)("div",{className:"w-full mt-3 lg:mt-0 flex flex-wrap lg:bg-lightGrey flex-row-reverse",children:[(0,l.jsx)("div",{className:"".concat(u?"lg:w-[30%]":"lg:w-[100px]"," md:float-right lg:pb-[56px] lg:px-[24px] w-full lg:min-h-screen lg:border-2 lg:border-green"),children:(0,l.jsx)("div",{className:"w-full m-auto flex flex-col",children:(0,l.jsxs)("div",{className:"-mx-[18px] sm:mx-0 lg:mx-0 lg:mb-0",children:[(0,l.jsxs)("div",{className:"bg-green text-white lg:hidden uppercase py-4 px-[18px]",onClick:function(){return p(!u)},children:["how to sell",(0,l.jsx)("div",{className:"".concat(u?"rotate-45":""," inline-block cursor-pointer float-right"),children:(0,l.jsx)(i.default,{src:"/assets/icons/plus-2.svg",alt:"",width:20,height:20})})]}),(0,l.jsx)("div",{className:"".concat(u?"block":"hidden"," lg:block bg-lightGrey px-[18px] lg:px-0 pt-6 lg:pt-0"),children:(0,l.jsxs)("div",{className:"pb-8 lg:pb-0",children:[(0,l.jsx)("div",{className:"text-center ".concat(u?"text-right pr-4":"text-center"," py-6 hidden lg:block"),children:(0,l.jsx)("div",{className:"".concat(u?"rotate-45":""," inline-block cursor-pointer"),onClick:function(){return p(!u)},children:(0,l.jsx)(i.default,{src:"/assets/images/plus2.svg",alt:"",width:20,height:20})})}),(0,l.jsxs)("div",{className:"".concat(u?"":"md:h-[150px]"," mt-[0px] mb-[48px]"),children:[(0,l.jsx)("h3",{className:"".concat(u?"text-xs":"rotate-90 text-[24px] leading-none mr-2"," font-helveticaNeue500 hidden md:block ease-in uppercase text-green whitespace-nowrap"),children:"How to sell"}),(0,l.jsx)("h2",{className:"".concat(u?"block":"hidden"," block pt-2 text-3xl text-green uppercase"),children:"RESELLING YOUR PRE-LOVED GANNI IS AS EASY AS 1,2,3"})]}),(0,l.jsxs)("div",{className:"".concat(u?"hidden":"block mb-[232px]"),children:[(0,l.jsx)("div",{className:"w-[48px] h-[48px] mb-[50px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Label.svg",alt:"",width:48,height:48})}),(0,l.jsx)("div",{className:"w-[48px] h-[48px] mb-[50px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Package.svg",alt:"",width:48,height:48})}),(0,l.jsx)("div",{className:"w-[48px] h-[48px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Payout.svg",alt:"",width:48,height:48})})]}),(0,l.jsxs)("ul",{className:"".concat(u?"block":"hidden"," mb-12"),children:[(0,l.jsxs)("li",{className:"flex mb-6",children:[(0,l.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Label.svg",alt:"",width:50,height:50})}),(0,l.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,l.jsx)("h3",{className:"uppercase",children:"List your item"}),(0,l.jsx)("p",{children:"Tell us about your item including details of its condition and photos, then upload the listing for sale on GANNI REPEAT."})]})]}),(0,l.jsxs)("li",{className:"flex mb-6",children:[(0,l.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Package.svg",alt:"",width:50,height:50})}),(0,l.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,l.jsx)("h3",{className:"uppercase",children:"Ship your item for free"}),(0,l.jsx)("p",{children:"Once sold, ship your item for free using our pre-paid shipping label. Alternatively, entice buyers with free shipping."})]})]}),(0,l.jsxs)("li",{className:"flex mb-6",children:[(0,l.jsx)("div",{className:"w-[50px] h-[50px]",children:(0,l.jsx)(i.default,{className:"w-full",src:"/assets/images/Payout.svg",alt:"",width:50,height:50})}),(0,l.jsxs)("div",{className:"pl-[24px] flex-1 text-sm text-dark hide-on-collapse",children:[(0,l.jsx)("h3",{className:"uppercase",children:"Choose payment"}),(0,l.jsx)("p",{children:"Choose to be paid in either cash or a GANNI gift card with an extra 20% value."})]})]})]}),(0,l.jsx)("div",{className:"".concat(u?"block":"hidden"),children:(0,l.jsx)("div",{className:"border-2 border-pink py-8 bg-white",children:(0,l.jsxs)("div",{className:"container m-auto px-4 xl2:max-w-screen-xl2",children:[(0,l.jsx)("p",{className:"text-pink uppercase text-xs mb-2",children:"Learn more"}),(0,l.jsxs)("h2",{className:"text-pink uppercase text-2xl xl:text-3xl",children:["Got a question? read our"," ",(0,l.jsx)("a",{href:"https://ganni-customerservice.zendesk.com/hc/en-us",className:"text-pink uppercase text-2xl xl:text-3xl underline",target:"_blank",rel:"noopener noreferrer",children:"FAQs"})]})]})})})]})})]})})}),(0,l.jsxs)("div",{className:"".concat(u?"lg:w-[70%]":"lg:w-[90%]"," md:float-left bg-white py-6 lg:py-[48px] px-0 sm:px-6 lg:px-[80px] w-full lg:w-auto lg:flex-1"),children:[r?(0,l.jsxs)("div",{className:"mb-[48px]",children:[(0,l.jsx)("h2",{className:"text-2xl font-helveticaNeue500 uppercase text-center",children:r}),(0,l.jsx)("div",{className:"w-full flex justify-center item-center mt-[18px]",children:(0,l.jsx)("div",{className:"w-[660px] grid grid-cols-4 grid-rows-1",children:["Details","Pictures","Price","Address"].map((function(e,t){return(0,l.jsx)("div",{className:"w-full",children:t<o+1?(0,l.jsx)(a.default,{href:"/sell/step-".concat(t+1),children:(0,l.jsx)("a",{children:(0,l.jsxs)("div",{className:"cursor-pointer",children:[(0,l.jsx)("div",{className:"w-full flex flex-col justify-center item-center",children:(0,l.jsx)(i.default,{src:"/assets/icons/bg-active.svg",alt:"",width:18,height:20})}),(0,l.jsxs)("div",{className:"text-center text-[#2E9A60] mt-[8px]",children:[t+1,". ",e]})]})})}):(0,l.jsxs)("div",{className:"cursor-pointer",children:[(0,l.jsx)("div",{className:"w-full flex flex-col justify-center item-center",children:(0,l.jsx)(i.default,{src:"/assets/icons/bg-default.svg",alt:"",width:18,height:20})}),(0,l.jsxs)("div",{className:"text-center text-[#C4C4C4] mt-[8px]",children:[t+1,". ",e]})]})},e.toString())}))})})]}):null,t]})]})]})}},2966:function(e,t,r){"use strict";r.d(t,{W:function(){return s}});var n=r(46837),i=r(88767),s=function(){return(0,i.useQuery)("getCurrency",(function(){return(0,n.h)("currency",{method:"get"})}))}},78505:function(e,t,r){"use strict";r.d(t,{h3:function(){return c},A4:function(){return l}});var n=r(46837),i=r(88767),s=r(14671),a=r(38597),c=(0,s.Z)((0,a.tJ)((function(e){return{product:{},step:0,resetProduct:function(){return e({product:{},step:0})},setProduct:function(t){return e({product:t})},setStep:function(t){return e({step:t})}}}),{name:"product"})),l=function(){return(0,i.useMutation)((function(e){return(0,n.h)("products/".concat(e,"/light"),{method:"GET"})}),{})}},42103:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return _}});var n=r(4942),i=r(55995),s=r(26260),a=r(94649),c=r(25675),l=r(11163),o=r(67294),d=r(2966),u=r(78505),p=r(5887),x=r(15861),h=r(87757),f=r.n(h),m=r(46837),b=r(88767),v=r(88615),g=r(87517),y=r(43042),N=r(73534),j=r(87017),w=r(85893);function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function _(){var e,t=(0,u.h3)(),r=t.product,n=t.setProduct,h=t.setStep,k=(0,p.J)().isLoggedIn,_=(0,o.useState)("0"),S=_[0],C=_[1],F=(0,o.useState)("0"),P=F[0],O=F[1],R=(0,o.useState)("0"),A=R[0],D=R[1],L=(0,o.useState)(!1),T=L[0],I=L[1],V=(0,o.useState)(!1),G=V[0],M=V[1],z=(0,l.useRouter)(),Z=(0,o.useState)([]),B=Z[0],J=Z[1],K=(0,o.useState)(""),W=K[0],U=K[1],Y=function(e){var t=(0,o.useState)(),r=t[0],n=t[1],i=(0,o.useState)(),s=i[0],a=i[1],c=(0,o.useState)(),l=c[0],d=c[1];return(0,b.useQuery)("rfCategory",(0,x.Z)(f().mark((function t(){var r;return f().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,m.h)("reflaunt/category/search-by-name",{method:"post",body:JSON.stringify({name:"".concat(e.category.name,"/").concat(e.sub_category.name),rf_retailer_public_key:"ck_4b0b2654d6d590a809dba5d777e44e"})});case 2:r=t.sent,n(r);case 4:case"end":return t.stop()}}),t)}))),{refetchOnWindowFocus:!1,retry:0}),(0,b.useQuery)("rfBrand",(0,x.Z)(f().mark((function e(){var t;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,m.h)("reflaunt/designer/search-by-name",{method:"post",body:JSON.stringify({name:"ganni",rf_retailer_public_key:"ck_4b0b2654d6d590a809dba5d777e44e"})});case 2:t=e.sent,d(t);case 4:case"end":return e.stop()}}),e)}))),{refetchOnWindowFocus:!1,retry:0}),(0,b.useQuery)("rfCondition",(0,x.Z)(f().mark((function t(){var r;return f().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,m.h)("reflaunt/condition/search-by-name",{method:"post",body:JSON.stringify({name:e.condition.name,rf_retailer_public_key:"ck_4b0b2654d6d590a809dba5d777e44e"})});case 2:r=t.sent,a(r);case 4:case"end":return t.stop()}}),t)}))),{refetchOnWindowFocus:!1,retry:0}),{rfCategory:r,rfBrand:l,rfCondition:s}}(r),q=Y.rfBrand,Q=Y.rfCategory,H=Y.rfCondition,X=(0,b.useMutation)((function(e){return(0,m.h)("reflaunt/smart-pricer",{method:"post",body:JSON.stringify(e)})}),{}).mutate,$=(0,g.u)().browserCurrency,ee=(0,o.useState)(),te=ee[0],re=ee[1];(0,o.useEffect)((function(){q&&Q&&H&&!r.price&&X({category:Q?Q.name:"".concat(r.category.name,"/").concat(r.sub_category.name),brand:q?q.name:"ganni",price:r.original_price_eur,marketplace:"styletribute",marketplace_group:"all",website:window.location.origin,condition:H?H.name:r.condition.name,product_in_cluster_count_threshold:5,original_price_to_predict:r.original_price_eur,mode:"standard",model_product_in_cluster_count_threshold:2,currency:"EUR"},{onSuccess:function(e){var t=e.recommended_price,r=(0,v.FA)(t,W,$);ae("".concat(r))}})}),[q,Q,H,W]);var ne=(0,d.W)().data,ie=(0,N.e)().data;(0,o.useEffect)((function(){r&&(ae(String(r.price)),r.shipping&&"reflaunt"===r.shipping&&(se.setFieldValue("your-pay",!1),se.setFieldValue("buyer-pay",!0)))}),[r]),(0,o.useEffect)((function(){if(ne){var e=ne.filter((function(e){return!e.base})).map((function(e){return{id:e.id,name:e.code,value:String(e.id)}}));r.currency&&se.setFieldValue("currency",r.currency),J(e)}}),[ne,r]),(0,o.useEffect)((function(){if(!W){var e,t=null===(e=$.currencies)||void 0===e?void 0:e.find((function(e){var t;return e.code===(null===(t=r.original_currency)||void 0===t?void 0:t.name)}));if(r.currency?le(r.currency):(U("".concat(null===t||void 0===t?void 0:t.id)),se.setFieldValue("currency",{id:null===t||void 0===t?void 0:t.id,name:null===t||void 0===t?void 0:t.code,value:String(null===t||void 0===t?void 0:t.id)})),ie){var n,i=(null===(n=ie.customer.data.payment_details.data)||void 0===n?void 0:n.find((function(e){return e.is_primary})))||ie.customer.data.payment_details.data[0];if(i&&i.data){var s=i.data;if(B){var a=B.find((function(e){return e.name===s.currency_code}));a&&U(String(a.id)),B[0]&&U(String(B[0].id))}}}}}),[r]);var se=(0,a.TA)({enableReinitialize:!0,initialValues:{currency:{name:""},"your-pay":!1,"buyer-pay":!0},onSubmit:function(e){if(!S||Number(S)<1)I(!0);else{if(ie){var t,i=null===(t=ie.customer.data.payment_details.data)||void 0===t?void 0:t.find((function(e){return e.is_primary}));if(i){var s=i.data;if("string"===typeof s&&(s=JSON.parse(String(s))),s.currency_code!==e.currency.name)return re({currency_1:e.currency.name,currency_2:"".concat(s.currency_code)}),void M(!0)}}n(E(E({},r),{currency:e.currency,price:Number(S),original_price_eur:(0,v.Mi)(Number(S),W,$),shipping:e["buyer-pay"]?"reflaunt":"free"})),r.id||h(3),e&&z.push("/sell/step-4")}}}),ae=function(e){if(n=e,!isNaN(parseFloat(n))&&isFinite(Number(n))||!e){var t=e;if(e.split("0")[0]||(t=e.split("0")[1]),I(!1),C(t),t){var r=.85*Number(t);O(ce(r)),D(ce(1.2*r))}else O("0"),D("0")}var n},ce=function(e){var t=String(e.toFixed(2)).split(".");return"00"===t[1]?t[0]:String(e.toFixed(2))};var le=function(e){U(String(e.id));var t=(0,v.JT)(Number(S),String(e.id),e.name,$);r||ae("".concat(t)),se.setFieldValue("".concat(e.field),e)};return k?(0,w.jsxs)("div",{children:[(0,w.jsxs)(s.Z,{title:"List your item",children:[(0,w.jsx)("p",{className:"text-[14px]",children:"Please specify the price of your item"}),(0,w.jsxs)("form",{onSubmit:se.handleSubmit,children:[(0,w.jsxs)("div",{className:"w-full md:flex my-[30px]",children:[(0,w.jsxs)("div",{className:"w-full md:w-[33.33%]",children:[(0,w.jsx)("p",{className:"text-[14px] uppercase",children:"Selling price*"}),(0,w.jsxs)("div",{className:"w-full flex",children:[(0,w.jsx)("div",{className:"w-[30%]",children:(0,w.jsx)(i.Z,{label:"",name:"currency",value:W||(null===(e=B[0])||void 0===e?void 0:e.value),data:B,onChange:function(e){return le(e)},classes:"mt-[12px]"})}),(0,w.jsx)("div",{className:"w-[70%] mt-[4px] ml-[8px]",children:(0,w.jsxs)("div",{className:"w-full",children:[(0,w.jsx)("div",{className:"w-full h-min-[44px] mt-[8px] relative p-[9px] border ".concat(!S||T?"border-[#DA0714]":"border-mgrey"),children:(0,w.jsx)("input",{className:"w-[90%] sm:w-[97%] h-[24px] p-[0px] text-[14px] focus:outline-none",type:"string",name:"sell-price",value:S,placeholder:"Enter price",maxLength:10,spellCheck:!1,onChange:function(e){return ae(e.target.value)}})}),(0,w.jsx)("div",{className:"w-full",children:(!S||T)&&(0,w.jsx)("p",{className:"text-[14px] text-red",children:"Required"})})]})})]})]}),(0,w.jsxs)("div",{className:"w-full flex md:w-[66.67%] mt-[20px] md:mt-[0px]",children:[(0,w.jsx)("div",{className:"w-[50%] pt-[1px] pr-[5px] md:pr-[0px] md:pl-[24px]",children:(0,w.jsxs)("div",{className:"w-full",children:[(0,w.jsx)("label",{className:"w-full text-[14px] uppercase",children:"Payment in bank transfer"}),(0,w.jsx)("div",{className:"pointer-events-none text-[14px] bg-[#EFEFEF] w-full h-[44px] mt-[10px] relative p-[12px] border border-gray",children:P})]})}),(0,w.jsx)("div",{className:"w-[50%] pt-[1px] pl-[5px] md:pl-[24px]",children:(0,w.jsxs)("div",{className:"w-full",children:[(0,w.jsx)("label",{className:"w-full text-[14px] uppercase",children:"Payment in Ganni gift card"}),(0,w.jsx)("div",{className:"pointer-events-none text-[14px] bg-[#EFEFEF] w-full h-[44px] mt-[10px] relative p-[12px] border border-gray",children:A})]})})]})]}),(0,w.jsxs)("div",{className:"w-full border border-[#E25B8B] h-[110px] sm:h-[68px] flex",children:[(0,w.jsx)("div",{className:"w-[48px] h-[48px] pt-[30px] sm:pt-[8px] sm:w-[24px] sm:h-[24px] m-[12px]",children:(0,w.jsx)(c.default,{src:"/assets/icons/info.svg",alt:"",width:24,height:24})}),(0,w.jsxs)("span",{className:"text-[14px] pt-[12px]",children:[(0,w.jsx)("p",{children:"*Please note that 15% of your selling price will be deducted as commission."}),(0,w.jsx)("p",{children:"We will issue your payment or gift card in your chosen currency."})]})]}),(0,w.jsx)("div",{className:"w-full my-[48px]",children:(0,w.jsx)("hr",{className:"w-full border border-b-[#111111]"})}),(0,w.jsxs)("div",{className:"text-[14px]",children:[(0,w.jsx)("p",{className:"text-[18px] mb-[24px]",children:"Shipping fees"}),(0,w.jsx)("p",{children:"Would you like to cover the shipping fees or have the buyer cover them?"}),(0,w.jsxs)("div",{className:"w-full flex my-[24px]",children:[(0,w.jsx)("input",{className:"form-check-input appearance-none rounded-full h-[14px] w-[14px] border border-gray-300 bg-white checked:bg-[#111111] checked:border-[#111111] relative checked:before:absolute checked:before:content-[''] checked:before:w-[8px] checked:before:h-[8px] checked:before:top-[2px] checked:before:left-[2px] checked:before:bg-white checked:before:rounded-[50%] focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer",type:"radio",name:"bank",checked:se.values["your-pay"],onChange:function(){se.setFieldValue("your-pay",!0),se.setFieldValue("buyer-pay",!1)}}),(0,w.jsx)("p",{className:"uppercase",children:"I'll pay"})]}),(0,w.jsx)("p",{children:"Increase your chances of a fast sale with the \u201cfree shipping\u201d label. You can include a flat fee for shipping in the price of the item, and arrange for shipping on your own (you will not receive a shipping label from us)."}),(0,w.jsx)("div",{className:"w-full my-[48px]",children:(0,w.jsx)("hr",{className:"w-full h-[1px] border border-b-[#E5E5E5]"})}),(0,w.jsxs)("div",{className:"w-full flex my-[24px]",children:[(0,w.jsx)("input",{className:"form-check-input appearance-none rounded-full h-[14px] w-[14px] border border-gray-300 bg-white checked:bg-[#111111] checked:border-[#111111] relative checked:before:absolute checked:before:content-[''] checked:before:w-[8px] checked:before:h-[8px] checked:before:top-[2px] checked:before:left-[2px] checked:before:bg-white checked:before:rounded-[50%] focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer",type:"radio",name:"bank",checked:se.values["buyer-pay"],onChange:function(){se.setFieldValue("buyer-pay",!0),se.setFieldValue("your-pay",!1)}}),(0,w.jsx)("p",{className:"uppercase",children:"Buyer pays"})]}),(0,w.jsx)("p",{children:"You will receive a free shipping label via email when the item has been sold to use when shipping the item."})]})]}),(0,w.jsxs)("div",{className:"flex flex-wrap -mx-2 mt-[48px] mb-[40px]",children:[(0,w.jsx)("div",{className:"w-2/4 px-2",children:(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)("button",{className:"text-center px-3 transition-all border border-dark inline-block  text-dark hover:border-dark hover:text-white hover:bg-dark w-full uppercase text-xs tracking-widest py-4",onClick:function(){return z.push("/sell/step-2")},children:"Back"})})}),(0,w.jsx)("div",{className:"w-2/4 px-2",children:(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)("button",{type:"submit",className:"text-center px-3 transition-all border border-dark inline-block  text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase text-xs tracking-widest py-4",onClick:function(){return se.handleSubmit()},children:"next step"})})})]})]}),(0,w.jsx)(y.d,{error:te,toggleCheckCurrencyModal:function(){return M(!G)},active:G,editListing:!1,from:z.asPath})]}):(0,w.jsx)(j.Z,{})}},88615:function(e,t,r){"use strict";r.d(t,{pD:function(){return a},NM:function(){return c},RL:function(){return l},SX:function(){return o},dI:function(){return d},Mi:function(){return u},FA:function(){return p},JT:function(){return x},Pg:function(){return h},SK:function(){return f},D0:function(){return m}});r(87757);var n=r(9723),i=(r(46837),r(73303)),s=r.n(i),a=function(e,t){var r=t.find((function(t){return t.alpha2Code===e}));return null===r||void 0===r?void 0:r.name},c=function(e,t){return!t||"DKK"!==t.code&&"SEK"!==t.code&&"NOK"!==t.code?Math.ceil(2*e)/2:Math.round(e)},l=function(e){switch(e){case n.i_.SOLD:return"sold";case n.i_.CANCELLED:return"cancelled";case n.i_.RETURNED:return"returned";default:return"sold confirmed"}},o=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?n.DF.COMPLETED:n.DF.PROCESSING},d=function(e){return e.tracking_number?e.status===n.Tb.TRACKED?n.Tb.TRACKED:e.status===n.Tb.DELIVERED?n.Tb.DELIVERED:n.Tb.SHIPPED:n.Tb.PENDING},u=function(e,t,r){var n,i,s=null===(n=r.currencies)||void 0===n?void 0:n.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),a=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return s&&a?s.code===a.code?Number(e.toFixed(2)):Number((e/(s.rate||1)).toFixed(2)):Number(e.toFixed(2))},p=function(e,t,r){var n,i,s=null===(n=r.currencies)||void 0===n?void 0:n.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),a=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return s&&a?s.code===a.code?Number(e.toFixed(2)):Number((e*(s.rate||1)).toFixed(2)):Number(e.toFixed(2))},x=function(e,t,r,n){var i,s,a=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),c=null===(s=n.currencies)||void 0===s?void 0:s.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)}));return a&&c?a.code===c.code?Number(e.toFixed(2)):Number((e*((c.rate||1)/(a.rate||1))).toFixed(2)):Number(e.toFixed(2))},h=function(e,t,r){for(var n=[],i=0;i<e;i++)n.push(t);return n.join("default"===r?"":r||" / ")},f=function(e){return s()(e,(function(e){return e.tax_fee}))},m=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var t=e.type.split("/"),r=["jpeg","jpg","png"];return t[1]&&r.includes(t[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(r.join(", "))}}},22717:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/sell/step-3",function(){return r(42103)}])}},function(e){e.O(0,[9774,2888,179],(function(){return t=22717,e(e.s=t);var t}));var t=e.O();_N_E=t}]);