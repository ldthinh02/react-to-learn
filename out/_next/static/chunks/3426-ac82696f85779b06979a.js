(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3426],{73303:function(e,t,n){var r=n(67206),i=n(67762);e.exports=function(e,t){return e&&e.length?i(e,r(t,2)):0}},61594:function(e,t,n){"use strict";var r=n(41664),i=n(88615),a=n(85893);t.Z=function(e){var t=e.allAddresses,n=e.countriesData,s=e.setDefaultAddress;return(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"flex flex-wrap",children:t.length>0&&t.map((function(e){return(0,a.jsxs)("div",{className:"w-full md:w-2/4 md:mb-8",children:[(0,a.jsx)("div",{className:"mb-6",children:(0,a.jsxs)("label",{className:"custom-radio cursor-pointer block",children:[(0,a.jsx)("input",{type:"radio",className:"hidden",name:"address",onClick:function(){return s(e)},defaultChecked:e.default_address}),(0,a.jsx)("span",{className:"relative block pl-8 before:absolute before:top-px before:left-0 before:bg-white before:border before:border-dark before:block before:w-[14px] before:h-[14px] before:rounded-full after:absolute after:top-[4px] after:left-[3px] after:hidden after:w-[8px] after:h-[8px] after:rounded-full after:bg-white",children:"Default address"})]})}),(0,a.jsxs)("address",{className:"font-helveticaNeue400 text-sm not-italic mb-4",children:["".concat(e.first_name," ").concat(e.last_name)," ",(0,a.jsx)("br",{}),e.address_1,(0,a.jsx)("br",{}),e.city,(0,a.jsx)("br",{}),e.zipcode,(0,a.jsx)("br",{}),n&&e.country?(0,i.pD)(e.country,n):"",(0,a.jsx)("br",{}),"+".concat(e.phone_code+e.phone),(0,a.jsx)("br",{})]}),(0,a.jsx)("div",{className:"mb-8 md:mb-0",children:(0,a.jsx)(r.default,{href:"/my-account/address/".concat(e.id,"/edit"),children:(0,a.jsx)("a",{className:"font-helveticaNeue500 uppercase text-sm underline",children:"Edit"})})})]},e.id)}))})})}},47302:function(e,t,n){"use strict";var r=n(73534),i=n(56581),a=n(97e3),s=n(25675),o=n(67294),c=n(82069),u=n(9113),l=n(9723),d=n(11163),f=n(80868),p=n(85893);function x(e,t){var n="undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"===typeof e)return m(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return m(e,t)}(e))||t&&e&&"number"===typeof e.length){n&&(e=n);var r=0,i=function(){};return{s:i,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){o=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw a}}}}function m(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}t.Z=function(e){var t,n=e.tab,m=e.profile_picture,b=(0,o.useState)(!1),v=b[0],h=b[1],g=(0,u.f)().data,N=(0,o.useState)(null),j=N[0],k=N[1],E=(0,o.useState)(0),y=E[0],w=E[1],D=(0,o.useState)([]),_=D[0],S=D[1],C=(0,f.r)().data,T=(0,r.e)().data,F=(0,i.T)(null===T||void 0===T?void 0:T.customer.data.id.toString()).data;(0,o.useEffect)((function(){C&&S(C.data)}),[C]),(0,o.useMemo)((function(){T&&k(T.customer.data)}),[T]);(0,o.useEffect)((function(){g&&w(g.unread-function(e){var t,n=0,r=x(_);try{for(r.s();!(t=r.n()).done;){var i=t.value;e.includes(i.inbox_conversation.data.id)&&l.E2.includes(i.inbox_message.data.type)&&(n+=1)}}catch(a){r.e(a)}finally{r.f()}return n}(g.reduce_conversation_unread_ids))}),[g]);var A=[{line:9,total:y}],R=function(e){var t=A.find((function(t){return t.line===e}));return t&&t.total>0?t:void 0};return(0,p.jsxs)("div",{className:"w-full m-auto flex flex-col",children:[(0,p.jsxs)("div",{className:"user-profile-block flex order-2 lg:order-1",children:[(0,p.jsx)("div",{className:"thumb mb-8 w-24",children:(0,p.jsx)(s.default,{className:"w-full",loader:a.k,src:m||(null===j||void 0===j?void 0:j.profile_picture)||"/assets/images/Default_Profile.svg",alt:"",width:96,height:96,objectFit:"cover"})}),(0,p.jsxs)("div",{className:"info mb-8 lg:mb-12 flex-1 pl-4",children:[(0,p.jsx)("div",{className:"font-helveticaNeue500 ratings flex items-center text-pink text-sm",children:F&&F.rate?(0,p.jsx)(c.Z,{rate:F.rate}):""}),(0,p.jsx)("h3",{className:"font-helveticaNeue500 text-dark uppercase text-2xl mb-1",children:(null===j||void 0===j?void 0:j.first_name)||"FirstName"}),(0,p.jsxs)("p",{className:"font-helveticaNeue500 text-dark uppercase text-xl mb-1",children:["@",(null===j||void 0===j?void 0:j.nickname)||"Username"]})]})]}),(0,p.jsxs)("div",{className:"aside-nav-wrap order-1 -mx-6 lg:mx-0 mb-8 lg:mb-0 lg:order-2",children:[(0,p.jsx)("div",{className:"account-nav-toggle-mobile bg-pink text-white lg:hidden",children:(0,p.jsxs)("div",{className:"relative bg-pink text-[14px] font-medium leading-none text-white lg:hidden uppercase pt-[25px] pb-[14px] px-[18px] cursor-pointer",onClick:function(){h(!v)},children:[null===(t=l.NP.find((function(e,t){return t+1===n&&e})))||void 0===t?void 0:t.label,(0,p.jsx)("div",{className:"".concat(v?"-rotate-45":""," absolute top-6 right-[10px] inline-block cursor-pointer transition-all float-right"),children:(0,p.jsx)(s.default,{src:"/assets/icons/plus-2.svg",alt:"",width:14,height:14})})]})}),(0,p.jsx)("div",{id:"account-nav",className:"inner bg-lightGrey lg:block px-6 lg:px-0 ".concat(v?"":"hidden"),children:l.NP.map((function(e,t){var r;return(0,p.jsxs)("div",{className:"pr-4 flex block cursor-pointer border-b text-dark border-b-dark bg-account-nav bg-no-repeat bg-right-center ".concat(n===t+1&&"text-pink border-b-pink bg-none"),onClick:function(){return d.default.push("/my-account".concat(e.path))},children:[(0,p.jsx)("div",{className:"font-helveticaNeue500 pt-7 pb-6 leading-none tracking-0 uppercase text-[18px]",children:e.label}),R(t)&&(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{className:"text-pink pl-1 pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:"("}),(0,p.jsx)("div",{className:"text-pink pt-[33px] pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:null===(r=R(t))||void 0===r?void 0:r.total}),(0,p.jsx)("div",{className:"text-pink pt-9 pb-6 font-helveticaNeue500 text-[16px] leading-[0px] tracking-0",children:")"})]})]},e.label.toString())}))})]})]})}},82069:function(e,t,n){"use strict";var r=n(67294),i=n(25675),a=n(85893);t.Z=function(e){var t=e.rate,n=e.values,s=e.size||12,o=(0,r.useState)(0),c=o[0],u=o[1],l=(0,r.useState)(!1),d=l[0],f=l[1];return(0,r.useEffect)((function(){!function(){var e=parseInt(t.toString()),n=t-e;e>0&&u(e),n>0&&f(!0)}()}),[t]),(0,a.jsxs)("div",{className:"flex",children:[function(){for(var e=[],t=0;t<5;t++)e.push("rating-".concat(t+1));return e}().map((function(e,t){return(0,a.jsx)("div",{className:"mr-[4px]",children:t<c?(0,a.jsx)(i.default,{className:"cursor-pointer",src:"/assets/icons/rating-1.svg",alt:"icon rating",width:s,height:s}):d&&t===c?(0,a.jsx)(i.default,{className:"cursor-pointer",src:"/assets/icons/rating-2.svg",alt:"icon rating",width:s,height:s}):(0,a.jsx)(i.default,{className:"cursor-pointer",src:"/assets/icons/rating-3.svg",alt:"icon rating",width:s,height:s})},e.toString())})),(0,a.jsxs)("span",{className:"text-pink ".concat(s>12?"text-[14px] pt-[1px]":"text-[12px] -mt-[2px]"),children:["(",n,")"]})]})}},56581:function(e,t,n){"use strict";n.d(t,{T:function(){return a}});var r=n(46837),i=n(88767),a=function(e){return(0,i.useQuery)("seller_info",(function(){return(0,r.h)("users/".concat(e,"/info"))}),{enabled:!!e})}},88615:function(e,t,n){"use strict";n.d(t,{pD:function(){return s},NM:function(){return o},RL:function(){return c},SX:function(){return u},dI:function(){return l},Mi:function(){return d},FA:function(){return f},JT:function(){return p},Pg:function(){return x},SK:function(){return m},D0:function(){return b}});n(87757);var r=n(9723),i=(n(46837),n(73303)),a=n.n(i),s=function(e,t){var n=t.find((function(t){return t.alpha2Code===e}));return null===n||void 0===n?void 0:n.name},o=function(e,t){return!t||"DKK"!==t.code&&"SEK"!==t.code&&"NOK"!==t.code?Math.ceil(2*e)/2:Math.round(e)},c=function(e){switch(e){case r.i_.SOLD:return"sold";case r.i_.CANCELLED:return"cancelled";case r.i_.RETURNED:return"returned";default:return"sold confirmed"}},u=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?r.DF.COMPLETED:r.DF.PROCESSING},l=function(e){return e.tracking_number?e.status===r.Tb.TRACKED?r.Tb.TRACKED:e.status===r.Tb.DELIVERED?r.Tb.DELIVERED:r.Tb.SHIPPED:r.Tb.PENDING},d=function(e,t,n){var r,i,a=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),s=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e/(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},f=function(e,t,n){var r,i,a=null===(r=n.currencies)||void 0===r?void 0:r.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),s=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return a&&s?a.code===s.code?Number(e.toFixed(2)):Number((e*(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},p=function(e,t,n,r){var i,a,s=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)})),o=null===(a=r.currencies)||void 0===a?void 0:a.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)}));return s&&o?s.code===o.code?Number(e.toFixed(2)):Number((e*((o.rate||1)/(s.rate||1))).toFixed(2)):Number(e.toFixed(2))},x=function(e,t,n){for(var r=[],i=0;i<e;i++)r.push(t);return r.join("default"===n?"":n||" / ")},m=function(e){return a()(e,(function(e){return e.tax_fee}))},b=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var t=e.type.split("/"),n=["jpeg","jpg","png"];return t[1]&&n.includes(t[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(n.join(", "))}}}}]);