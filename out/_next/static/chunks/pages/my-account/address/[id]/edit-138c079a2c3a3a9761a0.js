(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6689],{44523:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return g}});var s=r(4942),n=r(9008),a=r(47302),c=r(67294),d=r(19262),o=r(5887),i=r(73534),u=r(11163),l=r(61717),f=r(46837),p=r(88767),h=r(61594),x=r(22e3),m=r(85893);function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);t&&(s=s.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,s)}return r}function j(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach((function(t){(0,s.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var g=function(){var e=(0,u.useRouter)(),t=function(e){var t=(0,o.J)().isLoggedIn;return(0,p.useQuery)(["showAddress",e],(function(){return(0,f.h)("addresses/".concat(e))}),{refetchOnWindowFocus:!1,retry:0,enabled:t&&!!e})}(e.query.id),r=t.data,s=t.isError,y=(0,c.useState)(),g=y[0],b=y[1],w=(0,c.useState)(!1),v=w[0],_=w[1],N=(0,i.e)().data,O=(0,d.R)().data,A=(0,o.J)().isLoggedIn,E=(0,c.useState)([]),P=E[0],k=E[1];(0,c.useEffect)((function(){N&&k(N.customer.data.addresses.data)}),[N]);var D=(0,l.F)().mutate;(0,c.useEffect)((function(){v&&e.push("/my-account/address")}),[v]),(0,c.useEffect)((function(){if(r){var e={id:Number(r.id),address_1:r.address_1,first_name:r.first_name,last_name:r.last_name,city:r.city,zipcode:r.zipcode,country:r.country,phone_code:"+".concat(r.phone_code),phone:r.phone,default_address:r.default_address};b(e)}}),[r]);return!A||s?null:(0,m.jsxs)("div",{children:[(0,m.jsxs)(n.default,{children:[(0,m.jsx)("title",{children:"GanniRepeat - My Account - My Address - Add New Address"}),(0,m.jsx)("meta",{name:"description",content:"GanniRepeat - My Account - Add New Addres"}),(0,m.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,m.jsx)("main",{className:"text-dark font-helveticaNeue400 text-sm overflow-x-hidden font-normal",children:(0,m.jsxs)("div",{className:"flex flex-wrap lg:bg-lightGrey",children:[(0,m.jsx)("div",{className:"lg:py-12 px-6 lg:px-12 w-full lg:w-480",children:(0,m.jsx)(a.Z,{tab:2})}),(0,m.jsxs)("div",{className:"bg-white py-6 lg:py-12 px-6 lg:px-20 w-full lg:w-auto lg:flex-1",children:[(0,m.jsx)("h3",{className:"font-helveticaNeue500 uppercase text-2xl mb-2",children:"My Account"}),(0,m.jsx)("h2",{className:"font-helveticaNeue500 uppercase text-green text-4xl lg:text-5xl mb-2",children:"Address book"}),(0,m.jsx)("div",{className:"mt-12",children:(0,m.jsx)("hr",{className:"border-t-grey my-8"})}),(0,m.jsx)(h.Z,{allAddresses:P,countriesData:O,setDefaultAddress:function(e){D(j(j({},e),{},{default_address:!0}))}}),(0,m.jsx)("div",{className:"mt-12",children:(0,m.jsx)("hr",{className:"border-t-grey my-8"})}),(0,m.jsx)(x.Z,{data:g,onChangeStatus:function(e){return _(e)},showButton:!0})]})]})})]})}},96574:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/my-account/address/[id]/edit",function(){return r(44523)}])}},function(e){e.O(0,[2e3,3426,9774,2888,179],(function(){return t=96574,e(e.s=t);var t}));var t=e.O();_N_E=t}]);