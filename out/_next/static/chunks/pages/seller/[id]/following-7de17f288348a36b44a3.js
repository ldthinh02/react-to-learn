(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1],{49199:function(e,n,t){"use strict";t(67294);var r=t(25675),i=t(82069),u=t(97e3),o=t(85893);n.Z=function(e){var n=e.name,t=e.tag,a=e.rate,c=e.totalRate,s=e.image;return(0,o.jsxs)("div",{className:"w-full h-[250px] md:w-[208px] md:h-[264px] mb-[100px] z-40 cursor-pointer relative select-none",children:[(0,o.jsx)("div",{className:"w-full h-[192px] md:h-[220px]",children:(0,o.jsx)(r.default,{className:"w-full h-auto lg:h-full object-cover",src:s,alt:"follower image",width:208,height:210,loader:u.k})}),(0,o.jsxs)("div",{className:"w-full",children:[(0,o.jsx)("h3",{className:"font-helveticaNeue500 text-dark bold uppercase text-lg mb-0",children:n}),(0,o.jsxs)("p",{className:"font-helveticaNeue500 text-dark uppercase text-sm mb-4",children:["@",t]}),a&&c?(0,o.jsx)(i.Z,{rate:a,values:c}):null]})]})}},11352:function(e,n,t){"use strict";t.d(n,{R:function(){return s}});var r=t(15861),i=t(87757),u=t.n(i),o=t(17563),a=t(46837),c=t(88767),s=function(){return(0,c.useMutation)(function(){var e=(0,r.Z)(u().mark((function e(n){var t,r,i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.constraints,r=n.page,i={per_page:20,page:r||"1",constraints:JSON.stringify(t)},e.abrupt("return",(0,a.h)("follows?".concat(o.stringify(i)),void 0,"raw"));case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}},54541:function(e,n,t){"use strict";t.r(n);var r=t(67294),i=t(49199),u=t(11352),o=t(11163),a=t(147),c=t(66800),s=t(85893);n.default=function(){var e,n=(0,o.useRouter)(),t=(0,u.R)().mutate,l=(0,r.useState)(),d=l[0],f=l[1],m=null===(e=n.query)||void 0===e?void 0:e.id,p=(0,r.useState)([]),v=p[0],N=p[1];return(0,r.useEffect)((function(){m&&t({constraints:{user_id:Number(m)}},{onSuccess:function(e){N(e.data),f(e.meta.pagination)}})}),[m]),(0,s.jsx)(c.Z,{id:m,title:"Following",children:(0,s.jsx)("div",{className:"w-full",children:v&&v.find((function(e){return e.follower}))&&(0,s.jsxs)("div",{className:"w-full",children:[(0,s.jsx)("div",{className:"w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4",children:v.filter((function(e){return e.follower})).map((function(e){return(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(i.Z,{name:"".concat(e.follower.data.customer.data.first_name," ").concat(e.follower.data.customer.data.last_name),tag:"".concat(e.follower.data.customer.data.nickname),image:"".concat(e.follower.data.customer.data.profile_picture||"/assets/images/Default_Profile.svg"),rate:4.5,totalRate:20})})}))}),d&&(0,s.jsx)("div",{className:"pagination w-full flex justify-end",children:(0,s.jsx)(a.Z,{pageNumber:d.total_pages})})]})})})}},88615:function(e,n,t){"use strict";t.d(n,{pD:function(){return o},NM:function(){return a},RL:function(){return c},SX:function(){return s},dI:function(){return l},Mi:function(){return d},FA:function(){return f},JT:function(){return m},Pg:function(){return p},SK:function(){return v},D0:function(){return N}});t(87757);var r=t(9723),i=(t(46837),t(73303)),u=t.n(i),o=function(e,n){var t=n.find((function(n){return n.alpha2Code===e}));return null===t||void 0===t?void 0:t.name},a=function(e,n){return!n||"DKK"!==n.code&&"SEK"!==n.code&&"NOK"!==n.code?Math.ceil(2*e)/2:Math.round(e)},c=function(e){switch(e){case r.i_.SOLD:return"sold";case r.i_.CANCELLED:return"cancelled";case r.i_.RETURNED:return"returned";default:return"sold confirmed"}},s=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?r.DF.COMPLETED:r.DF.PROCESSING},l=function(e){return e.tracking_number?e.status===r.Tb.TRACKED?r.Tb.TRACKED:e.status===r.Tb.DELIVERED?r.Tb.DELIVERED:r.Tb.SHIPPED:r.Tb.PENDING},d=function(e,n,t){var r,i,u=null===(r=t.currencies)||void 0===r?void 0:r.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)})),o=null===(i=t.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return u&&o?u.code===o.code?Number(e.toFixed(2)):Number((e/(u.rate||1)).toFixed(2)):Number(e.toFixed(2))},f=function(e,n,t){var r,i,u=null===(r=t.currencies)||void 0===r?void 0:r.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)})),o=null===(i=t.currencies)||void 0===i?void 0:i.find((function(e){return"EUR"===e.code}));return u&&o?u.code===o.code?Number(e.toFixed(2)):Number((e*(u.rate||1)).toFixed(2)):Number(e.toFixed(2))},m=function(e,n,t,r){var i,u,o=null===(i=r.currencies)||void 0===i?void 0:i.find((function(e){return e.code===n||e.symbol===n||e.id===Number(n)})),a=null===(u=r.currencies)||void 0===u?void 0:u.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)}));return o&&a?o.code===a.code?Number(e.toFixed(2)):Number((e*((a.rate||1)/(o.rate||1))).toFixed(2)):Number(e.toFixed(2))},p=function(e,n,t){for(var r=[],i=0;i<e;i++)r.push(n);return r.join("default"===t?"":t||" / ")},v=function(e){return u()(e,(function(e){return e.tax_fee}))},N=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var n=e.type.split("/"),t=["jpeg","jpg","png"];return n[1]&&t.includes(n[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(t.join(", "))}}},57017:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/seller/[id]/following",function(){return t(54541)}])}},function(e){e.O(0,[8252,9774,2888,179],(function(){return n=57017,e(e.s=n);var n}));var n=e.O();_N_E=n}]);