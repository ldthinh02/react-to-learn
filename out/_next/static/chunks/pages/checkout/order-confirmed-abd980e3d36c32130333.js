(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8350],{73303:function(e,r,t){var n=t(67206),s=t(67762);e.exports=function(e,r){return e&&e.length?s(e,n(r,2)):0}},77256:function(e,r,t){"use strict";var n=t(87517),s=t(88615),a=t(67294),c=t(85893);r.Z=function(e){var r=e.price,t=e.onChangePrice,i=(0,a.useState)("".concat(r)),o=i[0],l=i[1],u=(0,n.u)((function(e){return e.browserCurrency}));return(0,a.useEffect)((function(){var e,n,a="";if(Array.isArray(r)?n=r:(r||(a="FREE"),n=[r]),0===(null===(e=u.currencies)||void 0===e?void 0:e.length)&&(a=String(n.reduce((function(e,r){return e+r}),0))),u.currency&&u.currencies&&u.currencies.length>0){var c=u.currencies.find((function(e){return e.code===u.currency}));if(c){var i=n.reduce((function(e,r){return e+(0,s.NM)(r*(c.rate||1),c)}),0);a=function(e,r){return"\xa3"===e?"".concat(e).concat(r):"".concat(r," ").concat(e)}(null===c||void 0===c?void 0:c.symbol,(0,s.NM)(i,c))}}t&&t(a),l(a)}),[u.currency,u.currencies,r]),(0,c.jsx)("span",{className:"text-[14px] uppercase text-dark font-helveticaNeue400",children:o})}},88275:function(e,r,t){"use strict";t.d(r,{e:function(){return o}});var n=t(4942),s=t(14671),a=t(38597);function c(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function i(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?c(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):c(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}var o=(0,s.Z)((0,a.tJ)((function(e){return{cartConfirmed:null,setCartConfirmed:function(r){e(r?function(){return{cartConfirmed:i({},r)}}:function(){return{cartConfirmed:null}})}}}),{name:"cartConfirmed"}))},23768:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return S}});var n=t(4942),s=t(94649),a=t(22887),c=t(9008),i=t(25675),o=t(67294),l=t(5887),u=t(27335),d=t(22283),m=t(68020),h=t(15859),p=t(42237),f=t(43753),x=t(31955),b=t(11163),g=t(3732),v=t(41664),N=t(77256),j=t(97e3),_=t(88275),w=t(85893),y=function(e){var r=e.showMobileViewOrder,t=e.toggleMobileViewOrder,n=(0,_.e)().cartConfirmed;return(0,w.jsx)("div",{className:"lg:py-12 px-6 lg:px-12 w-full lg:w-480",children:(0,w.jsx)("div",{className:"w-full m-auto flex flex-col",children:n?(0,w.jsxs)("div",{className:"aside-nav-wrap -mx-6 lg:mx-0 mb-8 lg:mb-0",children:[(0,w.jsx)("div",{className:"account-nav-toggle-mobile bg-green text-white lg:hidden",children:(0,w.jsxs)("a",{className:"font-helveticaNeue500 uppercase text-white py-4 px-6 block relative before:absolute before:top-2/4 before:right-4 before:-translate-y-2/4 before:w-4 before:h-4 before:bg-100% cursor-pointer ".concat(r?"before:bg-close":"before:bg-plus"),onClick:t,children:["View order (",(0,w.jsx)(N.Z,{price:Number(n.total)}),")"]})}),(0,w.jsxs)("div",{id:"checkout-cart",className:"inner bg-lightGrey lg:block px-6 lg:px-0 pt-6 lg:pt-0 ".concat(r?"":"hidden"),children:[(0,w.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6 md:mb-8",children:"Order summary"}),(0,w.jsxs)("table",{className:"table w-full summary-table mb-8",children:[(0,w.jsxs)("tbody",{children:[(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"text-sm p-1 pl-0",children:"Order value"}),(0,w.jsx)("td",{className:"text-sm p-1 pr-0 text-right",children:(0,w.jsx)(N.Z,{price:Number(n.sub_total)})})]}),(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"text-sm p-1 pl-0",children:"Shipping"}),(0,w.jsx)("td",{className:"text-sm p-1 pr-0 text-right",children:(0,w.jsx)(N.Z,{price:Number(n.shipping_rate)})})]}),(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"text-sm p-1 pl-0 ".concat(n.coupon&&n.coupon.data.code&&(n.products_discount||n.shipping_discount)?"":"pb-8"),children:"Tax"}),(0,w.jsx)("td",{className:"text-sm p-1 pr-0 text-right ".concat(n.coupon&&n.coupon.data.code&&(n.products_discount||n.shipping_discount)?"":"pb-8"),children:(0,w.jsx)(N.Z,{price:Number(n.tax_total)})})]}),n.coupon&&n.coupon.data.code&&(n.products_discount||n.shipping_discount)?(0,w.jsxs)("tr",{className:"text-shocking_pink",children:[(0,w.jsxs)("td",{className:"text-sm p-1 pl-0 pb-8",children:["Promocode ",n.coupon.data.code]}),(0,w.jsxs)("td",{className:"text-sm p-1 pr-0 pb-8 text-right",children:["-\xa3",n.products_discount||0+(n.shipping_discount||0)]})]}):""]}),(0,w.jsx)("tfoot",{className:"border-t border-t-grey",children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{className:"font-helveticaNeue500 text-sm p-1 pl-0 pt-8",children:"TOTAL"}),(0,w.jsx)("td",{className:"font-helveticaNeue500 text-sm p-1 pr-0 text-right pt-8",children:(0,w.jsx)(N.Z,{price:Number(n.total)})})]})})]}),(0,w.jsxs)("div",{className:"border border-pink p-4 flex items-center mb-6 lg:mb-8",children:[(0,w.jsx)("div",{className:"w-6",children:(0,w.jsx)(i.default,{src:"/assets/images/Info.svg",alt:"",width:"100%",height:"100%"})}),(0,w.jsx)("div",{className:"pl-4 text-sm flex-1",children:(0,w.jsx)("p",{children:"The final shipping costs are calculated based on your delivery location and local sales taxes. However, the shipping costs exclude all relevant import duties and customs fees. As the recipient, you will need to pay for these duties and fees upon request by your Local Customs."})})]}),(0,w.jsx)("h3",{className:"font-helveticaNeue400 text-lg mb-6 md:mb-8 mt-8",children:"Your shopping bag"}),(0,w.jsx)("div",{className:"mt-8",children:(0,w.jsx)("hr",{className:"border-t-grey my-8"})}),n&&n.checkout_packages&&n.checkout_packages.data&&n.checkout_packages.data.length>0?n.checkout_packages.data.map((function(e,r){var t,s;return(0,w.jsxs)("span",{children:[(0,w.jsxs)("div",{className:"flex flex-wrap mb-4",children:[(0,w.jsx)("div",{className:"w-full",children:(0,w.jsxs)("span",{className:"font-helveticaNeue400 text-sm",children:["Package ",r+1," of"," ",null===(t=n.checkout_packages)||void 0===t?void 0:t.data.length]})}),(0,w.jsx)("div",{className:"w-full",children:(0,w.jsxs)("span",{className:"font-helveticaNeue500 text-sm",children:["Shipping from:"," ",null===(s=e.products[0].seller_info)||void 0===s?void 0:s.city]})})]}),e.products.map((function(e,r){return(0,w.jsx)("div",{className:"bg-white mb-4",children:(0,w.jsxs)("div",{className:"product-popup flex w-full text-left py-4 px-2",children:[(0,w.jsx)("div",{className:"thumb w-100 relative",children:(0,w.jsx)(i.default,{loader:j.k,objectFit:"contain",className:"w-full",src:e.medium_image_path,alt:"",layout:"fill"})}),(0,w.jsx)("div",{className:"info flex-1 text-sm pl-4",children:(0,w.jsx)("div",{className:"flex flex-wrap justify-between px-2",children:(0,w.jsxs)("div",{className:"w-full md:w-auto",children:[(0,w.jsx)("h3",{className:"font-helveticaNeue500 uppercase mb-1",children:e.name}),(0,w.jsx)("p",{className:"mb-2",children:(0,w.jsx)(N.Z,{price:e.base_currency_price})}),(0,w.jsxs)("p",{className:"mb-2",children:["SIZE: ",e.size_name]})]})})})]})},r)}))]},r)})):""]})]}):""})})},k=t(46837),C=t(88767);function E(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function O(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?E(Object(t),!0).forEach((function(r){(0,n.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):E(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function S(){var e=(0,o.useState)(!1),r=e[0],t=e[1],n=(0,l.J)().isLoggedIn,N=(0,g.jD)((function(e){return e.setCart})),j=(0,_.e)().setCartConfirmed,E=(0,b.useRouter)(),S=E.query,P=(0,p.m)(),T=P.mutate,D=P.isLoading,R=P.isError,M=P.error,A=(0,C.useMutation)((function(e){return(0,k.h)("checkout/force-order",{method:"POST",body:JSON.stringify(e)})})),Z=A.mutate,F=A.error,V=A.isError;(0,o.useEffect)((function(){S.checkout&&S.payment_intent&&Z({checkout_id:S.checkout.toString(),payment_intent:S.payment_intent.toString()},{onSuccess:function(e){n||x.Z.remove("token");var r=[],t=e.products.data.map((function(e){return r.push(e.id),{product_id:e.id,product_name:e.name,product_category:e.categories[0].name,product_brand:e.designer_name,product_price:e.base_currency_price,product_condition:e.condition_name,product_size:e.size_name,product_color:e.color_name,product_quantity:1,list_position:1}}));N(null);var s=e;s&&s.checkout_packages&&s.checkout_packages.data&&s.checkout_packages.data.length>0&&s.products&&s.products.data&&s.products.data.length>0&&(s.checkout_packages.data=s.checkout_packages.data.map((function(e){var r=s.products.data.filter((function(r){return r.seller_id===e.seller_id}));return O(O({},e),{},{products:r})})),j(s)),e.order&&(0,f.Vl)("purchase",{purchase:{transaction_id:e.order.data.order_id,value:e.order.data.total,currency:e.order.data.currency.data.code,shipping:e.order.data.shipping_fee,content_type:"product",product_ids:r,items:t}})}})}),[S]);var I=(0,p.$)().mutate,L=(0,g._3)((function(e){return e.listing_data})),H=(0,s.TA)({enableReinitialize:!0,initialValues:{first_name:"",last_name:"",re_password:"",user_name:"",email:"",password:"",checkbox_1:!1,checkbox_2:!1},validationSchema:d.Ql,onSubmit:function(e){T(e,{onSuccess:function(e){x.Z.set("token",e.access_token),(0,f.Vl)("complete_registration",{}),I(L.id,{onSuccess:function(){E.push("/my-account")}})}})}});return(0,o.useEffect)((function(){H.setFieldValue("email",L.email)}),[L]),(0,w.jsxs)("div",{children:[(0,w.jsxs)(c.default,{children:[(0,w.jsx)("title",{children:"Buy and Sell GANNI Pre-loved Fashion on GANNIREPEAT | Confirmation"}),(0,w.jsx)("meta",{name:"description",content:"Thank you for joining the GANNIREPEATCommunity : A space to Buy and Sell Pre-loved GANNI Clothes, Shoes and Accessories."}),(0,w.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,w.jsxs)("div",{className:"flex flex-wrap lg:bg-lightGrey flex-row-reverse",children:[(0,w.jsx)(y,{showMobileViewOrder:r,toggleMobileViewOrder:function(){t(!r)}}),(0,w.jsxs)("div",{className:"bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1",children:[(0,w.jsxs)("div",{className:"text-center lg:pt-6",children:[(0,w.jsx)(i.default,{className:"w-100 inline-block mb-4",src:"/assets/images/Repeat.svg",alt:"",width:"100%",height:"100%"}),(0,w.jsxs)("h2",{className:"font-helveticaNeue500 text-4xl text-pink uppercase mb-6",children:["YOUR ORDER HAS BEEN CONFIRMED!"," "]}),(0,w.jsx)("p",{className:"mb-6",children:"You will receive an email confirmation with your order details shortly."}),(0,w.jsx)("p",{className:"mb-6",children:"Thank you for repeating. "}),V&&""!==F.message?(0,w.jsx)(a.Z,{message:F.message}):null]}),n?(0,w.jsx)("div",{className:"text-center lg:pt-6",children:(0,w.jsxs)("div",{className:"w-full lg:w-420 m-auto",children:[(0,w.jsx)(v.default,{href:"/buy/new-in",children:(0,w.jsxs)("a",{className:"font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center mb-4 uppercase",children:[(0,w.jsx)("svg",{className:"mr-2",width:"24",height:"15",viewBox:"0 0 24 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{className:"group-hover:fill-white",fillRule:"evenodd",clipRule:"evenodd",d:"M11.1219 0.299988V3.77563H4.17069C4.24381 8.20245 6.80482 11.0196 11.4878 10.9463C17.0853 10.9463 19.4268 6.00725 19.4268 0.995038C19.4268 0.762986 19.42 0.53129 19.4099 0.299988H23.9864C23.9955 0.530382 24 0.762118 24 0.995077C24 8.45861 19.3171 14.6781 11.4878 14.6781C8.30481 14.6781 6.07304 13.7634 3.62188 10.983L2.92683 14.0561H0V0.299988H11.1219Z",fill:"#111111"})}),"Shop new in"]})}),(0,w.jsx)(v.default,{href:"/sell/step-1",children:(0,w.jsxs)("a",{className:"font-helveticaNeue500 text-2xl group text-center px-3 py-4 transition-all border border-dark  text-dark hover:border-dark hover:text-white hover:bg-dark flex items-center justify-center uppercase",children:[(0,w.jsx)("svg",{className:"mr-2",width:"25",height:"25",viewBox:"0 0 25 25",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:(0,w.jsx)("path",{className:"group-hover:fill-white",fillRule:"evenodd",clipRule:"evenodd",d:"M13.3781 19.678V16.2024H20.3293C20.2562 11.7756 17.6952 8.95847 13.0123 9.03178C7.41472 9.03178 5.07327 13.9708 5.07327 18.983C5.07327 19.2151 5.08003 19.4468 5.09012 19.678H0.513632C0.504544 19.4476 0.5 19.2159 0.5 18.983C0.5 11.5195 5.18293 5.3 13.0123 5.3C16.1952 5.3 18.427 6.21461 20.8781 8.99502L21.5732 5.92194H24.5V19.678H13.3781Z",fill:"#111111"})}),"Sell an item"]})})]})}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{className:"mt-12",children:(0,w.jsx)("hr",{className:"my-7 border-t-dark"})}),(0,w.jsx)("h3",{className:"font-helveticaNeue500 text-2xl uppercase mb-4",children:"COMPLETE YOUR ACCOUNT AND CHECKOUT FASTER NEXT TIME"}),(0,w.jsxs)("form",{action:"#",onSubmit:H.handleSubmit,children:[(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(u.Z,{name:"first_name",label:"First Name",onChange:H.handleChange,value:H.values.first_name,errorMessage:H.errors.first_name&&H.touched.first_name?H.errors.first_name:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(u.Z,{name:"last_name",label:"Last Name",onChange:H.handleChange,value:H.values.last_name,errorMessage:H.errors.last_name&&H.touched.last_name?H.errors.last_name:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(u.Z,{name:"email",label:"Email",onChange:H.handleChange,value:H.values.email,errorMessage:H.errors.email&&H.touched.email?H.errors.email:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(u.Z,{name:"user_name",label:"Username",onChange:H.handleChange,value:H.values.user_name,errorMessage:H.errors.user_name&&H.touched.user_name?H.errors.user_name:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(h.Z,{name:"password",label:"Password",onChange:H.handleChange,value:H.values.password,errorMessage:H.errors.password&&H.touched.password?H.errors.password:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(h.Z,{name:"re_password",label:"Confirm password",onChange:H.handleChange,value:H.values.re_password,errorMessage:H.errors.re_password&&H.touched.re_password?H.errors.re_password:""})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(m.Z,{name:"checkbox_1",onChange:H.handleChange,checked:H.values.checkbox_1,content:"Sign up to receive emails from GANNI REPEAT."})}),(0,w.jsx)("div",{className:"mb-6",children:(0,w.jsx)(m.Z,{name:"checkbox_2",errorMessage:H.errors.checkbox_2&&H.touched.checkbox_2?H.errors.checkbox_2:"",onChange:H.handleChange,checked:H.values.checkbox_2,content:(0,w.jsxs)(w.Fragment,{children:["I hereby agree to the"," ",(0,w.jsx)("a",{href:"#",className:"underline",children:"terms and conditions"})," ","set out by GANNI REPEAT."]})})}),R&&(0,w.jsx)(a.Z,{message:M.message}),(0,w.jsx)("div",{className:"mb-6 pb-6",children:(0,w.jsx)("button",{type:"submit",disabled:D,className:"font-helveticaNeue500 text-2xl text-center px-3 py-4 transition-all border border-dark text-white bg-dark hover:border-dark hover:text-dark hover:bg-white w-full uppercase block",children:D?"Loading...":"Create account"})})]})]})]})]})]})}},88615:function(e,r,t){"use strict";t.d(r,{pD:function(){return c},NM:function(){return i},RL:function(){return o},SX:function(){return l},dI:function(){return u},Mi:function(){return d},FA:function(){return m},JT:function(){return h},Pg:function(){return p},SK:function(){return f},D0:function(){return x}});t(87757);var n=t(9723),s=(t(46837),t(73303)),a=t.n(s),c=function(e,r){var t=r.find((function(r){return r.alpha2Code===e}));return null===t||void 0===t?void 0:t.name},i=function(e,r){return!r||"DKK"!==r.code&&"SEK"!==r.code&&"NOK"!==r.code?Math.ceil(2*e)/2:Math.round(e)},o=function(e){switch(e){case n.i_.SOLD:return"sold";case n.i_.CANCELLED:return"cancelled";case n.i_.RETURNED:return"returned";default:return"sold confirmed"}},l=function(e){return e.filter((function(e){return["SOLD_CONFIRMED","CANCELLED","RETURNED","PAYMENT_SENT"].includes(e.status)})).length===e.length?n.DF.COMPLETED:n.DF.PROCESSING},u=function(e){return e.tracking_number?e.status===n.Tb.TRACKED?n.Tb.TRACKED:e.status===n.Tb.DELIVERED?n.Tb.DELIVERED:n.Tb.SHIPPED:n.Tb.PENDING},d=function(e,r,t){var n,s,a=null===(n=t.currencies)||void 0===n?void 0:n.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),c=null===(s=t.currencies)||void 0===s?void 0:s.find((function(e){return"EUR"===e.code}));return a&&c?a.code===c.code?Number(e.toFixed(2)):Number((e/(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},m=function(e,r,t){var n,s,a=null===(n=t.currencies)||void 0===n?void 0:n.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),c=null===(s=t.currencies)||void 0===s?void 0:s.find((function(e){return"EUR"===e.code}));return a&&c?a.code===c.code?Number(e.toFixed(2)):Number((e*(a.rate||1)).toFixed(2)):Number(e.toFixed(2))},h=function(e,r,t,n){var s,a,c=null===(s=n.currencies)||void 0===s?void 0:s.find((function(e){return e.code===r||e.symbol===r||e.id===Number(r)})),i=null===(a=n.currencies)||void 0===a?void 0:a.find((function(e){return e.code===t||e.symbol===t||e.id===Number(t)}));return c&&i?c.code===i.code?Number(e.toFixed(2)):Number((e*((i.rate||1)/(c.rate||1))).toFixed(2)):Number(e.toFixed(2))},p=function(e,r,t){for(var n=[],s=0;s<e;s++)n.push(r);return n.join("default"===t?"":t||" / ")},f=function(e){return a()(e,(function(e){return e.tax_fee}))},x=function(e){if(!e)return{isValid:!1,message:""};if(e.size<1024)return{isValid:!1,message:"Minimum supported file size is 1kb"};if(e.size>1e7)return{isValid:!1,message:"Maximum supported file size is 10mb"};var r=e.type.split("/"),t=["jpeg","jpg","png"];return r[1]&&t.includes(r[1])?{isValid:!0,message:""}:{isValid:!1,message:"Supported file types are ".concat(t.join(", "))}}},64400:function(e,r,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/checkout/order-confirmed",function(){return t(23768)}])}},function(e){e.O(0,[9774,2888,179],(function(){return r=64400,e(e.s=r);var r}));var r=e.O();_N_E=r}]);