(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5362],{77256:function(e,r,n){"use strict";var t=n(87517),i=n(88615),c=n(67294),u=n(85893);r.Z=function(e){var r=e.price,n=e.onChangePrice,o=(0,c.useState)("".concat(r)),s=o[0],a=o[1],l=(0,t.u)((function(e){return e.browserCurrency}));return(0,c.useEffect)((function(){var e,t,c="";if(Array.isArray(r)?t=r:(r||(c="FREE"),t=[r]),0===(null===(e=l.currencies)||void 0===e?void 0:e.length)&&(c=String(t.reduce((function(e,r){return e+r}),0))),l.currency&&l.currencies&&l.currencies.length>0){var u=l.currencies.find((function(e){return e.code===l.currency}));if(u){var o=t.reduce((function(e,r){return e+(0,i.NM)(r*(u.rate||1),u)}),0);c=function(e,r){return"\xa3"===e?"".concat(e).concat(r):"".concat(r," ").concat(e)}(null===u||void 0===u?void 0:u.symbol,(0,i.NM)(o,u))}}n&&n(c),a(c)}),[l.currency,l.currencies,r]),(0,u.jsx)("span",{className:"text-[14px] uppercase text-dark font-helveticaNeue400",children:s})}},20202:function(e,r,n){"use strict";n.d(r,{h:function(){return f}});var t=n(4942),i=n(15861),c=n(87757),u=n.n(c),o=n(46837),s=n(88767),a=n(17563);function l(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function d(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?l(Object(n),!0).forEach((function(r){(0,t.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var f=function(){return(0,s.useMutation)(function(){var e=(0,i.Z)(u().mark((function e(r){var n,t,i,c,s,l;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.constraints,t=r.seller_id,i=r.page,c=r.per_page,s=r.process_status,l=d({per_page:c||20,page:i||"1",constraints:JSON.stringify(n)},s?{process_status:s}:{}),e.abrupt("return",(0,o.h)("products/".concat(t,"/get-product-by-seller?").concat(a.stringify(l)),{method:"POST"},"raw"));case 3:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}())}},84879:function(e,r,n){"use strict";n.r(r),n.d(r,{default:function(){return g}});var t=n(4942),i=n(67294),c=n(11163),u=n(20202),o=n(25675),s=n(97e3),a=n(77256),l=n(85893),d=function(e){var r=(0,c.useRouter)();return(0,l.jsxs)("div",{onClick:function(){r.push("/product/".concat(e.id))},className:"w-full h-[250px] md:h-[310px] mb-[48px] z-40 cursor-pointer relative select-none love",children:[(0,l.jsx)("div",{className:"w-full h-[192px] md:h-[268px]",children:(0,l.jsx)(o.default,{className:"w-full h-auto lg:h-full object-cover",loader:s.k,src:e.media.data[0].original_image||"/assets/images/product.png",alt:"No images",width:240,height:268})}),(0,l.jsxs)("div",{className:"w-full flex mt-[5px]",children:[(0,l.jsx)("div",{className:"w-[24px] h-[22px] lg:w-[32px] lg:h-[30px]",children:(0,l.jsx)(o.default,{className:"w-full h-auto object-cover",src:"/assets/icons/heart.png",alt:"Heart icon",width:32,height:30})}),(0,l.jsxs)("div",{className:"lg:w-[207px] pl-[12px]",children:[(0,l.jsx)("p",{className:"uppercase text-[14px]",children:e.name}),(0,l.jsx)("p",{className:"text-[14px]",children:(0,l.jsx)(a.Z,{price:e.base_currency_price})})]})]})]})},f=n(147),p=n(9723),m=n(66800);function b(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function v(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?b(Object(n),!0).forEach((function(r){(0,t.Z)(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}var g=function(){var e,r=(0,c.useRouter)(),n=null===(e=r.query)||void 0===e?void 0:e.id,t=(0,i.useState)([]),o=t[0],s=t[1],a=(0,i.useState)(),b=a[0],g=a[1],h=(0,u.h)().mutate;return(0,i.useEffect)((function(){n&&h({seller_id:n,page:r.query.page,process_status:p.xh.SOLD},{onSuccess:function(e){s(e.data),g(e.meta.pagination)}})}),[r.query]),(0,l.jsx)(m.Z,{id:n,title:"Sold",children:(0,l.jsx)("div",{className:"w-full",children:o.length>0&&(0,l.jsxs)("div",{className:"w-full",children:[(0,l.jsx)("div",{className:"w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4",children:o.map((function(e){return(0,l.jsx)(l.Fragment,{children:(0,l.jsx)(d,v({},e))})}))}),b&&(0,l.jsx)("div",{className:"pagination w-full flex justify-end",children:(0,l.jsx)(f.Z,{pageNumber:b.total_pages})})]})})})}},88615:function(e,r,n){"use strict";n.d(r,{pD:function(){return u},NM:function(){return o},RL:function(){return s},SX:function(){return a},dI:function(){return l},Mi:function(){return d},FA:function(){return f},JT:function(){return p},Pg:function(){return m},SK:function(){return b},D0:function(){return v}});n(87757);var t=n(9723),i=(n(46837),n(73303)),c=n.n(i),u=function(e,r){var n=r.find((function(r){return r.alpha2Code===e}));return null===n||void 0===n?void 0:n.name},o=function(e,r){return!r||"DKK"!==r.code&&"SEK"!==r.code&&"NOK"!==r.code?Math.ceil(2*e)/2:Math.round(e)},s=function(e){switch(e){case t.i_.SOLD:return"sold";case t.i_.CANCELLED:return"cancelled";case t.i_.RETURNED:return"returned";default:return"sold confirmed"}},a=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?t.DF.COMPLETED:t.DF.PROCESSING},l=function(e){return e.tracking_number?e.status===t.Tb.TRACKED?t.Tb.TRACKED:e.status===t.Tb.DELIVERED?t.Tb.DELIVERED:t.Tb.SHIPPED:t.Tb.PENDING},d=function(e,r,n){var t,i,c=null===(t=n.currencies)||void 0===t?void 0:t.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),u=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return c&&u?c.code===u.code?Number(e.toFixed(2)):Number((e/(c.rate||1)).toFixed(2)):Number(e.toFixed(2))},f=function(e,r,n){var t,i,c=null===(t=n.currencies)||void 0===t?void 0:t.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),u=null===(i=n.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return c&&u?c.code===u.code?Number(e.toFixed(2)):Number((e*(c.rate||1)).toFixed(2)):Number(e.toFixed(2))},p=function(e,r,n,t){var i,c,u=null===(i=t.currencies)||void 0===i?void 0:i.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),o=null===(c=t.currencies)||void 0===c?void 0:c.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)}));return u&&o?u.code===o.code?Number(e.toFixed(2)):Number((e*((o.rate||1)/(u.rate||1))).toFixed(2)):Number(e.toFixed(2))},m=function(e,r,n){for(var t=[],i=0;i<e;i++)t.push(r);return t.join("default"===n?"":n||" / ")},b=function(e){return c()(e,(function(e){return e.tax_fee}))},v=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var r=e.type.split("/"),n=["jpeg","jpg","png"];return r[1]&&n.includes(r[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(n.join(", "))}}},48569:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/seller/[id]/sold",function(){return n(84879)}])}},function(e){e.O(0,[8252,9774,2888,179],(function(){return r=48569,e(e.s=r);var r}));var r=e.O();_N_E=r}]);