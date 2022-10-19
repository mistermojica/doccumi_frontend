import{r as n,a as m}from"./react.94f0f2be.js";import{C as F,s as u,F as on}from"./styled-components.96658a10.js";var X;function ie(e,t){return e[t]}function We(e,t){return t.split(".").reduce((o,a)=>{const r=a.match(/[^\]\\[.]+/g);if(r&&r.length>1)for(let s=0;s<r.length;s++)return o[r[s]][r[s+1]];return o[a]},e)}function an(e=[],t,o=0){return[...e.slice(0,o),t,...e.slice(o)]}function rn(e=[],t,o="id"){const a=e.slice(),r=ie(t,o);return r?a.splice(a.findIndex(s=>ie(s,o)===r),1):a.splice(a.findIndex(s=>s===t),1),a}function ut(e){return e.map((t,o)=>{const a=Object.assign(Object.assign({},t),{sortable:t.sortable||!!t.sortFunction||void 0});return t.id||(a.id=o+1),a})}function be(e,t){return Math.ceil(e/t)}function Ne(e,t){return Math.min(e,t)}(function(e){e.ASC="asc",e.DESC="desc"})(X||(X={}));const D=()=>null;function Ct(e,t=[],o=[]){let a={},r=[...o];return t.length&&t.forEach(s=>{if(!s.when||typeof s.when!="function")throw new Error('"when" must be defined in the conditional style object and must be function');s.when(e)&&(a=s.style||{},s.classNames&&(r=[...r,...s.classNames]),typeof s.style=="function"&&(a=s.style(e)||{}))}),{style:a,classNames:r.join(" ")}}function ke(e,t=[],o="id"){const a=ie(e,o);return a?t.some(r=>ie(r,o)===a):t.some(r=>r===e)}function Ee(e,t){return t?e.findIndex(o=>xe(o.id,t)):-1}function xe(e,t){return e==t}function ln(e,t){const o=!e.toggleOnSelectedRowsChange;switch(t.type){case"SELECT_ALL_ROWS":{const{keyField:a,rows:r,rowCount:s,mergeSelections:i}=t,g=!e.allSelected,b=!e.toggleOnSelectedRowsChange;if(i){const y=g?[...e.selectedRows,...r.filter(p=>!ke(p,e.selectedRows,a))]:e.selectedRows.filter(p=>!ke(p,r,a));return Object.assign(Object.assign({},e),{allSelected:g,selectedCount:y.length,selectedRows:y,toggleOnSelectedRowsChange:b})}return Object.assign(Object.assign({},e),{allSelected:g,selectedCount:g?s:0,selectedRows:g?r:[],toggleOnSelectedRowsChange:b})}case"SELECT_SINGLE_ROW":{const{keyField:a,row:r,isSelected:s,rowCount:i,singleSelect:g}=t;return g?s?Object.assign(Object.assign({},e),{selectedCount:0,allSelected:!1,selectedRows:[],toggleOnSelectedRowsChange:o}):Object.assign(Object.assign({},e),{selectedCount:1,allSelected:!1,selectedRows:[r],toggleOnSelectedRowsChange:o}):s?Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length>0?e.selectedRows.length-1:0,allSelected:!1,selectedRows:rn(e.selectedRows,r,a),toggleOnSelectedRowsChange:o}):Object.assign(Object.assign({},e),{selectedCount:e.selectedRows.length+1,allSelected:e.selectedRows.length+1===i,selectedRows:an(e.selectedRows,r),toggleOnSelectedRowsChange:o})}case"SELECT_MULTIPLE_ROWS":{const{keyField:a,selectedRows:r,totalRows:s,mergeSelections:i}=t;if(i){const g=[...e.selectedRows,...r.filter(b=>!ke(b,e.selectedRows,a))];return Object.assign(Object.assign({},e),{selectedCount:g.length,allSelected:!1,selectedRows:g,toggleOnSelectedRowsChange:o})}return Object.assign(Object.assign({},e),{selectedCount:r.length,allSelected:r.length===s,selectedRows:r,toggleOnSelectedRowsChange:o})}case"CLEAR_SELECTED_ROWS":{const{selectedRowsFlag:a}=t;return Object.assign(Object.assign({},e),{allSelected:!1,selectedCount:0,selectedRows:[],selectedRowsFlag:a})}case"SORT_CHANGE":{const{sortDirection:a,selectedColumn:r,clearSelectedOnSort:s}=t;return Object.assign(Object.assign(Object.assign({},e),{selectedColumn:r,sortDirection:a,currentPage:1}),s&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:o})}case"CHANGE_PAGE":{const{page:a,paginationServer:r,visibleOnly:s,persistSelectedOnPageChange:i}=t,g=r&&i,b=r&&!i||s;return Object.assign(Object.assign(Object.assign(Object.assign({},e),{currentPage:a}),g&&{allSelected:!1}),b&&{allSelected:!1,selectedCount:0,selectedRows:[],toggleOnSelectedRowsChange:o})}case"CHANGE_ROWS_PER_PAGE":{const{rowsPerPage:a,page:r}=t;return Object.assign(Object.assign({},e),{currentPage:r,rowsPerPage:a})}}}const sn=F`
	pointer-events: none;
	opacity: 0.4;
`,dn=u.div`
	position: relative;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	max-width: 100%;
	${({disabled:e})=>e&&sn};
	${({theme:e})=>e.table.style};
`,cn=F`
	position: sticky;
	position: -webkit-sticky; /* Safari */
	top: 0;
	z-index: 1;
`,gn=u.div`
	display: flex;
	width: 100%;
	${({fixedHeader:e})=>e&&cn};
	${({theme:e})=>e.head.style};
`,pn=u.div`
	display: flex;
	align-items: stretch;
	width: 100%;
	${({theme:e})=>e.headRow.style};
	${({dense:e,theme:t})=>e&&t.headRow.denseStyle};
`,yt=(e,...t)=>F`
		@media screen and (max-width: ${599}px) {
			${F(e,...t)}
		}
	`,un=(e,...t)=>F`
		@media screen and (max-width: ${959}px) {
			${F(e,...t)}
		}
	`,bn=(e,...t)=>F`
		@media screen and (max-width: ${1280}px) {
			${F(e,...t)}
		}
	`,xn=e=>(t,...o)=>F`
				@media screen and (max-width: ${e}px) {
					${F(t,...o)}
				}
			`,ce=u.div`
	position: relative;
	display: flex;
	align-items: center;
	box-sizing: border-box;
	line-height: normal;
	${({theme:e,headCell:t})=>e[t?"headCells":"cells"].style};
	${({noPadding:e})=>e&&"padding: 0"};
`,Rt=u(ce)`
	flex-grow: ${({button:e,grow:t})=>t===0||e?0:t||1};
	flex-shrink: 0;
	flex-basis: 0;
	max-width: ${({maxWidth:e})=>e||"100%"};
	min-width: ${({minWidth:e})=>e||"100px"};
	${({width:e})=>e&&F`
			min-width: ${e};
			max-width: ${e};
		`};
	${({right:e})=>e&&"justify-content: flex-end"};
	${({button:e,center:t})=>(t||e)&&"justify-content: center"};
	${({compact:e,button:t})=>(e||t)&&"padding: 0"};

	/* handle hiding cells */
	${({hide:e})=>e&&e==="sm"&&yt`
    display: none;
  `};
	${({hide:e})=>e&&e==="md"&&un`
    display: none;
  `};
	${({hide:e})=>e&&e==="lg"&&bn`
    display: none;
  `};
	${({hide:e})=>e&&Number.isInteger(e)&&xn(e)`
    display: none;
  `};
`,mn=F`
	div:first-child {
		white-space: ${({wrapCell:e})=>e?"normal":"nowrap"};
		overflow: ${({allowOverflow:e})=>e?"visible":"hidden"};
		text-overflow: ellipsis;
	}
`,hn=u(Rt).attrs(e=>({style:e.style}))`
	${({renderAsCell:e})=>!e&&mn};
	${({theme:e,isDragging:t})=>t&&e.cells.draggingStyle};
	${({cellStyle:e})=>e};
`;var wn=n.exports.memo(function({id:e,column:t,row:o,rowIndex:a,dataTag:r,isDragging:s,onDragStart:i,onDragOver:g,onDragEnd:b,onDragEnter:y,onDragLeave:p}){const{style:h,classNames:j}=Ct(o,t.conditionalCellStyles,["rdt_TableCell"]);return n.exports.createElement(hn,{id:e,"data-column-id":t.id,role:"cell",className:j,"data-tag":r,cellStyle:t.style,renderAsCell:!!t.cell,allowOverflow:t.allowOverflow,button:t.button,center:t.center,compact:t.compact,grow:t.grow,hide:t.hide,maxWidth:t.maxWidth,minWidth:t.minWidth,right:t.right,width:t.width,wrapCell:t.wrap,style:h,isDragging:s,onDragStart:i,onDragOver:g,onDragEnd:b,onDragEnter:y,onDragLeave:p},!t.cell&&n.exports.createElement("div",{"data-tag":r},function(R,w,H,f){if(!w)return null;if(typeof w!="string"&&typeof w!="function")throw new Error("selector must be a . delimited string eg (my.property) or function (e.g. row => row.field");return H&&typeof H=="function"?H(R,f):w&&typeof w=="function"?w(R,f):We(R,w)}(o,t.selector,t.format,a)),t.cell&&t.cell(o,a,t,e))}),vt=n.exports.memo(function({name:e,component:t="input",componentOptions:o={style:{}},indeterminate:a=!1,checked:r=!1,disabled:s=!1,onClick:i=D}){const g=t,b=g!=="input"?o.style:(p=>Object.assign(Object.assign({fontSize:"18px"},!p&&{cursor:"pointer"}),{padding:0,marginTop:"1px",verticalAlign:"middle",position:"relative"}))(s),y=n.exports.useMemo(()=>function(p,...h){let j;return Object.keys(p).map(R=>p[R]).forEach((R,w)=>{typeof R=="function"&&(j=Object.assign(Object.assign({},p),{[Object.keys(p)[w]]:R(...h)}))}),j||p}(o,a),[o,a]);return n.exports.createElement(g,Object.assign({type:"checkbox",ref:p=>{p&&(p.indeterminate=a)},style:b,onClick:s?D:i,name:e,"aria-label":e,checked:r,disabled:s},y,{onChange:D}))});const fn=u(ce)`
	flex: 0 0 48px;
	min-width: 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
`;function Cn({name:e,keyField:t,row:o,rowCount:a,selected:r,selectableRowsComponent:s,selectableRowsComponentProps:i,selectableRowsSingle:g,selectableRowDisabled:b,onSelectedRow:y}){const p=!(!b||!b(o));return n.exports.createElement(fn,{onClick:h=>h.stopPropagation(),className:"rdt_TableCell",noPadding:!0},n.exports.createElement(vt,{name:e,component:s,componentOptions:i,checked:r,"aria-checked":r,onClick:()=>{y({type:"SELECT_SINGLE_ROW",row:o,isSelected:r,keyField:t,rowCount:a,singleSelect:g})},disabled:p}))}const yn=u.button`
	display: inline-flex;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	border: none;
	background-color: transparent;
	${({theme:e})=>e.expanderButton.style};
`;function Rn({disabled:e=!1,expanded:t=!1,expandableIcon:o,id:a,row:r,onToggled:s}){const i=t?o.expanded:o.collapsed;return n.exports.createElement(yn,{"aria-disabled":e,onClick:()=>s&&s(r),"data-testid":`expander-button-${a}`,disabled:e,"aria-label":t?"Collapse Row":"Expand Row",role:"button",type:"button"},i)}const vn=u(ce)`
	white-space: nowrap;
	font-weight: 400;
	min-width: 48px;
	${({theme:e})=>e.expanderCell.style};
`;function Sn({row:e,expanded:t=!1,expandableIcon:o,id:a,onToggled:r,disabled:s=!1}){return n.exports.createElement(vn,{onClick:i=>i.stopPropagation(),noPadding:!0},n.exports.createElement(Rn,{id:a,row:e,expanded:t,expandableIcon:o,disabled:s,onToggled:r}))}const En=u.div`
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.expanderRow.style};
	${({extendedRowStyle:e})=>e};
`;var On=n.exports.memo(function({data:e,ExpanderComponent:t,expanderComponentProps:o,extendedRowStyle:a,extendedClassNames:r}){const s=["rdt_ExpanderRow",...r.split(" ").filter(i=>i!=="rdt_TableRow")].join(" ");return n.exports.createElement(En,{className:s,extendedRowStyle:a},n.exports.createElement(t,Object.assign({data:e},o)))}),Pe,Be,bt;(function(e){e.LTR="ltr",e.RTL="rtl",e.AUTO="auto"})(Pe||(Pe={})),function(e){e.LEFT="left",e.RIGHT="right",e.CENTER="center"}(Be||(Be={})),function(e){e.SM="sm",e.MD="md",e.LG="lg"}(bt||(bt={}));const kn=F`
	&:hover {
		${({highlightOnHover:e,theme:t})=>e&&t.rows.highlightOnHoverStyle};
	}
`,Pn=F`
	&:hover {
		cursor: pointer;
	}
`,Dn=u.div.attrs(e=>({style:e.style}))`
	display: flex;
	align-items: stretch;
	align-content: stretch;
	width: 100%;
	box-sizing: border-box;
	${({theme:e})=>e.rows.style};
	${({dense:e,theme:t})=>e&&t.rows.denseStyle};
	${({striped:e,theme:t})=>e&&t.rows.stripedStyle};
	${({highlightOnHover:e})=>e&&kn};
	${({pointerOnHover:e})=>e&&Pn};
	${({selected:e,theme:t})=>e&&t.rows.selectedHighlightStyle};
`;function Hn({columns:e=[],conditionalRowStyles:t=[],defaultExpanded:o=!1,defaultExpanderDisabled:a=!1,dense:r=!1,expandableIcon:s,expandableRows:i=!1,expandableRowsComponent:g,expandableRowsComponentProps:b,expandableRowsHideExpander:y,expandOnRowClicked:p=!1,expandOnRowDoubleClicked:h=!1,highlightOnHover:j=!1,id:R,expandableInheritConditionalStyles:w,keyField:H,onRowClicked:f=D,onRowDoubleClicked:P=D,onRowMouseEnter:$=D,onRowMouseLeave:S=D,onRowExpandToggled:O=D,onSelectedRow:L=D,pointerOnHover:M=!1,row:C,rowCount:v,rowIndex:U,selectableRowDisabled:A=null,selectableRows:N=!1,selectableRowsComponent:Q,selectableRowsComponentProps:k,selectableRowsHighlight:oe=!1,selectableRowsSingle:ge=!1,selected:ae,striped:re=!1,draggingColumnId:De,onDragStart:He,onDragOver:$e,onDragEnd:Fe,onDragEnter:G,onDragLeave:he}){const[V,we]=n.exports.useState(o);n.exports.useEffect(()=>{we(o)},[o]);const Z=n.exports.useCallback(()=>{we(!V),O(!V,C)},[V,O,C]),je=M||i&&(p||h),Ie=n.exports.useCallback(E=>{E.target&&E.target.getAttribute("data-tag")==="allowRowEvents"&&(f(C,E),!a&&i&&p&&Z())},[a,p,i,Z,f,C]),fe=n.exports.useCallback(E=>{E.target&&E.target.getAttribute("data-tag")==="allowRowEvents"&&(P(C,E),!a&&i&&h&&Z())},[a,h,i,Z,P,C]),Te=n.exports.useCallback(E=>{$(C,E)},[$,C]),Y=n.exports.useCallback(E=>{S(C,E)},[S,C]),ee=ie(C,H),{style:Ce,classNames:ye}=Ct(C,t,["rdt_TableRow"]),Le=oe&&ae,Me=w?Ce:{},Ae=re&&U%2==0;return n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(Dn,{id:`row-${R}`,role:"row",striped:Ae,highlightOnHover:j,pointerOnHover:!a&&je,dense:r,onClick:Ie,onDoubleClick:fe,onMouseEnter:Te,onMouseLeave:Y,className:ye,selected:Le,style:Ce},N&&n.exports.createElement(Cn,{name:`select-row-${ee}`,keyField:H,row:C,rowCount:v,selected:ae,selectableRowsComponent:Q,selectableRowsComponentProps:k,selectableRowDisabled:A,selectableRowsSingle:ge,onSelectedRow:L}),i&&!y&&n.exports.createElement(Sn,{id:ee,expandableIcon:s,expanded:V,row:C,onToggled:Z,disabled:a}),e.map(E=>E.omit?null:n.exports.createElement(wn,{id:`cell-${E.id}-${ee}`,key:`cell-${E.id}-${ee}`,dataTag:E.ignoreRowClick||E.button?null:"allowRowEvents",column:E,row:C,rowIndex:U,isDragging:xe(De,E.id),onDragStart:He,onDragOver:$e,onDragEnd:Fe,onDragEnter:G,onDragLeave:he}))),i&&V&&n.exports.createElement(On,{key:`expander-${ee}`,data:C,extendedRowStyle:Me,extendedClassNames:ye,ExpanderComponent:g,expanderComponentProps:b}))}const $n=u.span`
	padding: 2px;
	color: inherit;
	flex-grow: 0;
	flex-shrink: 0;
	${({sortActive:e})=>e?"opacity: 1":"opacity: 0"};
	${({sortDirection:e})=>e==="desc"&&"transform: rotate(180deg)"};
`,Fn=({sortActive:e,sortDirection:t})=>m.createElement($n,{sortActive:e,sortDirection:t},"\u25B2"),jn=u(Rt)`
	${({button:e})=>e&&"text-align: center"};
	${({theme:e,isDragging:t})=>t&&e.headCells.draggingStyle};
`,In=F`
	cursor: pointer;
	span.__rdt_custom_sort_icon__ {
		i,
		svg {
			transform: 'translate3d(0, 0, 0)';
			${({sortActive:e})=>e?"opacity: 1":"opacity: 0"};
			color: inherit;
			font-size: 18px;
			height: 18px;
			width: 18px;
			backface-visibility: hidden;
			transform-style: preserve-3d;
			transition-duration: 95ms;
			transition-property: transform;
		}

		&.asc i,
		&.asc svg {
			transform: rotate(180deg);
		}
	}

	${({sortActive:e})=>!e&&F`
			&:hover,
			&:focus {
				opacity: 0.7;

				span,
				span.__rdt_custom_sort_icon__ * {
					opacity: 0.7;
				}
			}
		`};
`,Tn=u.div`
	display: inline-flex;
	align-items: center;
	justify-content: inherit;
	height: 100%;
	width: 100%;
	outline: none;
	user-select: none;
	overflow: hidden;
	${({disabled:e})=>!e&&In};
`,Ln=u.div`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
`;var Mn=n.exports.memo(function({column:e,disabled:t,draggingColumnId:o,selectedColumn:a={},sortDirection:r,sortIcon:s,sortServer:i,pagination:g,paginationServer:b,persistSelectedOnSort:y,selectableRowsVisibleOnly:p,onSort:h,onDragStart:j,onDragOver:R,onDragEnd:w,onDragEnter:H,onDragLeave:f}){n.exports.useEffect(()=>{typeof e.selector=="string"&&console.error(`Warning: ${e.selector} is a string based column selector which has been deprecated as of v7 and will be removed in v8. Instead, use a selector function e.g. row => row[field]...`)},[]);const[P,$]=n.exports.useState(!1),S=n.exports.useRef(null);if(n.exports.useEffect(()=>{S.current&&$(S.current.scrollWidth>S.current.clientWidth)},[P]),e.omit)return null;const O=()=>{if(!e.sortable&&!e.selector)return;let k=r;xe(a.id,e.id)&&(k=r===X.ASC?X.DESC:X.ASC),h({type:"SORT_CHANGE",sortDirection:k,selectedColumn:e,clearSelectedOnSort:g&&b&&!y||i||p})},L=k=>n.exports.createElement(Fn,{sortActive:k,sortDirection:r}),M=()=>n.exports.createElement("span",{className:[r,"__rdt_custom_sort_icon__"].join(" ")},s),C=!(!e.sortable||!xe(a.id,e.id)),v=!e.sortable||t,U=e.sortable&&!s&&!e.right,A=e.sortable&&!s&&e.right,N=e.sortable&&s&&!e.right,Q=e.sortable&&s&&e.right;return n.exports.createElement(jn,{"data-column-id":e.id,className:"rdt_TableCol",headCell:!0,allowOverflow:e.allowOverflow,button:e.button,compact:e.compact,grow:e.grow,hide:e.hide,maxWidth:e.maxWidth,minWidth:e.minWidth,right:e.right,center:e.center,width:e.width,draggable:e.reorder,isDragging:xe(e.id,o),onDragStart:j,onDragOver:R,onDragEnd:w,onDragEnter:H,onDragLeave:f},e.name&&n.exports.createElement(Tn,{"data-column-id":e.id,"data-sort-id":e.id,role:"columnheader",tabIndex:0,className:"rdt_TableCol_Sortable",onClick:v?void 0:O,onKeyPress:v?void 0:k=>{k.key==="Enter"&&O()},sortActive:!v&&C,disabled:v},!v&&Q&&M(),!v&&A&&L(C),typeof e.name=="string"?n.exports.createElement(Ln,{title:P?e.name:void 0,ref:S,"data-column-id":e.id},e.name):e.name,!v&&N&&M(),!v&&U&&L(C)))});const An=u(ce)`
	flex: 0 0 48px;
	justify-content: center;
	align-items: center;
	user-select: none;
	white-space: nowrap;
	font-size: unset;
`;function _n({headCell:e=!0,rowData:t,keyField:o,allSelected:a,mergeSelections:r,selectedRows:s,selectableRowsComponent:i,selectableRowsComponentProps:g,selectableRowDisabled:b,onSelectAllRows:y}){const p=s.length>0&&!a,h=b?t.filter(w=>!b(w)):t,j=h.length===0,R=Math.min(t.length,h.length);return n.exports.createElement(An,{className:"rdt_TableCol",headCell:e,noPadding:!0},n.exports.createElement(vt,{name:"select-all-rows",component:i,componentOptions:g,onClick:()=>{y({type:"SELECT_ALL_ROWS",rows:h,rowCount:R,mergeSelections:r,keyField:o})},checked:a,indeterminate:p,disabled:j}))}function St(e=Pe.AUTO){const t=typeof window=="object",[o,a]=n.exports.useState(!1);return n.exports.useEffect(()=>{if(t)if(e!=="auto")a(e==="rtl");else{const r=!(!window.document||!window.document.createElement),s=document.getElementsByTagName("BODY")[0],i=document.getElementsByTagName("HTML")[0],g=s.dir==="rtl"||i.dir==="rtl";a(r&&g)}},[e,t]),o}const zn=u.div`
	display: flex;
	align-items: center;
	flex: 1 0 auto;
	height: 100%;
	color: ${({theme:e})=>e.contextMenu.fontColor};
	font-size: ${({theme:e})=>e.contextMenu.fontSize};
	font-weight: 400;
`,Nn=u.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	flex-wrap: wrap;
`,xt=u.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	box-sizing: inherit;
	z-index: 1;
	align-items: center;
	justify-content: space-between;
	display: flex;
	${({rtl:e})=>e&&"direction: rtl"};
	${({theme:e})=>e.contextMenu.style};
	${({theme:e,visible:t})=>t&&e.contextMenu.activeStyle};
`;function Wn({contextMessage:e,contextActions:t,contextComponent:o,selectedCount:a,direction:r}){const s=St(r),i=a>0;return o?n.exports.createElement(xt,{visible:i},n.exports.cloneElement(o,{selectedCount:a})):n.exports.createElement(xt,{visible:i,rtl:s},n.exports.createElement(zn,null,((g,b,y)=>{if(b===0)return null;const p=b===1?g.singular:g.plural;return y?`${b} ${g.message||""} ${p}`:`${b} ${p} ${g.message||""}`})(e,a,s)),n.exports.createElement(Nn,null,t))}const Bn=u.div`
	position: relative;
	box-sizing: border-box;
	overflow: hidden;
	display: flex;
	flex: 1 1 auto;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-wrap: wrap;
	${({theme:e})=>e.header.style}
`,Gn=u.div`
	flex: 1 0 auto;
	color: ${({theme:e})=>e.header.fontColor};
	font-size: ${({theme:e})=>e.header.fontSize};
	font-weight: 400;
`,Vn=u.div`
	flex: 1 0 auto;
	display: flex;
	align-items: center;
	justify-content: flex-end;

	> * {
		margin-left: 5px;
	}
`,Un=({title:e,actions:t=null,contextMessage:o,contextActions:a,contextComponent:r,selectedCount:s,direction:i,showMenu:g=!0})=>n.exports.createElement(Bn,{className:"rdt_TableHeader",role:"heading","aria-level":1},n.exports.createElement(Gn,null,e),t&&n.exports.createElement(Vn,null,t),g&&n.exports.createElement(Wn,{contextMessage:o,contextActions:a,contextComponent:r,direction:i,selectedCount:s}));function Et(e,t){var o={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(o[a]=e[a]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function"){var r=0;for(a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(e,a[r])&&(o[a[r]]=e[a[r]])}return o}const Qn={left:"flex-start",right:"flex-end",center:"center"},Yn=u.header`
	position: relative;
	display: flex;
	flex: 1 1 auto;
	box-sizing: border-box;
	align-items: center;
	padding: 4px 16px 4px 24px;
	width: 100%;
	justify-content: ${({align:e})=>Qn[e]};
	flex-wrap: ${({wrapContent:e})=>e?"wrap":"nowrap"};
	${({theme:e})=>e.subHeader.style}
`,qn=e=>{var{align:t="right",wrapContent:o=!0}=e,a=Et(e,["align","wrapContent"]);return n.exports.createElement(Yn,Object.assign({align:t,wrapContent:o},a))},Jn=u.div`
	display: flex;
	flex-direction: column;
`,Kn=u.div`
	position: relative;
	width: 100%;
	border-radius: inherit;
	${({responsive:e,fixedHeader:t})=>e&&F`
			overflow-x: auto;

			// hidden prevents vertical scrolling in firefox when fixedHeader is disabled
			overflow-y: ${t?"auto":"hidden"};
			min-height: 0;
		`};

	${({fixedHeader:e=!1,fixedHeaderScrollHeight:t="100vh"})=>e&&F`
			max-height: ${t};
			-webkit-overflow-scrolling: touch;
		`};

	${({theme:e})=>e.responsiveWrapper.style};
`,mt=u.div`
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${e=>e.theme.progress.style};
`,Xn=u.div`
	position: relative;
	width: 100%;
	${({theme:e})=>e.tableWrapper.style};
`,Zn=u(ce)`
	white-space: nowrap;
	${({theme:e})=>e.expanderCell.style};
`,eo=u.div`
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	${({theme:e})=>e.noData.style};
`,to=()=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24"},m.createElement("path",{d:"M7 10l5 5 5-5z"}),m.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),no=u.select`
	cursor: pointer;
	height: 24px;
	max-width: 100%;
	user-select: none;
	padding-left: 8px;
	padding-right: 24px;
	box-sizing: content-box;
	font-size: inherit;
	color: inherit;
	border: none;
	background-color: transparent;
	appearance: none;
	direction: ltr;
	flex-shrink: 0;

	&::-ms-expand {
		display: none;
	}

	&:disabled::-ms-expand {
		background: #f60;
	}

	option {
		color: initial;
	}
`,oo=u.div`
	position: relative;
	flex-shrink: 0;
	font-size: inherit;
	color: inherit;
	margin-top: 1px;

	svg {
		top: 0;
		right: 0;
		color: inherit;
		position: absolute;
		fill: currentColor;
		width: 24px;
		height: 24px;
		display: inline-block;
		user-select: none;
		pointer-events: none;
	}
`,ao=e=>{var{defaultValue:t,onChange:o}=e,a=Et(e,["defaultValue","onChange"]);return n.exports.createElement(oo,null,n.exports.createElement(no,Object.assign({onChange:o,defaultValue:t},a)),n.exports.createElement(to,null))},l={columns:[],data:[],title:"",keyField:"id",selectableRows:!1,selectableRowsHighlight:!1,selectableRowsNoSelectAll:!1,selectableRowSelected:null,selectableRowDisabled:null,selectableRowsComponent:"input",selectableRowsComponentProps:{},selectableRowsVisibleOnly:!1,selectableRowsSingle:!1,clearSelectedRows:!1,expandableRows:!1,expandableRowDisabled:null,expandableRowExpanded:null,expandOnRowClicked:!1,expandableRowsHideExpander:!1,expandOnRowDoubleClicked:!1,expandableInheritConditionalStyles:!1,expandableRowsComponent:function(){return m.createElement("div",null,"To add an expander pass in a component instance via ",m.createElement("strong",null,"expandableRowsComponent"),". You can then access props.data from this component.")},expandableIcon:{collapsed:m.createElement(()=>m.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},m.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),m.createElement("path",{d:"M0-.25h24v24H0z",fill:"none"})),null),expanded:m.createElement(()=>m.createElement("svg",{fill:"currentColor",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},m.createElement("path",{d:"M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"}),m.createElement("path",{d:"M0-.75h24v24H0z",fill:"none"})),null)},expandableRowsComponentProps:{},progressPending:!1,progressComponent:m.createElement("div",{style:{fontSize:"24px",fontWeight:700,padding:"24px"}},"Loading..."),persistTableHead:!1,sortIcon:null,sortFunction:null,sortServer:!1,striped:!1,highlightOnHover:!1,pointerOnHover:!1,noContextMenu:!1,contextMessage:{singular:"item",plural:"items",message:"selected"},actions:null,contextActions:null,contextComponent:null,defaultSortFieldId:null,defaultSortAsc:!0,responsive:!0,noDataComponent:m.createElement("div",{style:{padding:"24px"}},"There are no records to display"),disabled:!1,noTableHead:!1,noHeader:!1,subHeader:!1,subHeaderAlign:Be.RIGHT,subHeaderWrap:!0,subHeaderComponent:null,fixedHeader:!1,fixedHeaderScrollHeight:"100vh",pagination:!1,paginationServer:!1,paginationServerOptions:{persistSelectedOnSort:!1,persistSelectedOnPageChange:!1},paginationDefaultPage:1,paginationResetDefaultPage:!1,paginationTotalRows:0,paginationPerPage:10,paginationRowsPerPageOptions:[10,15,20,25,30],paginationComponent:null,paginationComponentOptions:{},paginationIconFirstPage:m.createElement(()=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},m.createElement("path",{d:"M18.41 16.59L13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"}),m.createElement("path",{fill:"none",d:"M24 24H0V0h24v24z"})),null),paginationIconLastPage:m.createElement(()=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},m.createElement("path",{d:"M5.59 7.41L10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"}),m.createElement("path",{fill:"none",d:"M0 0h24v24H0V0z"})),null),paginationIconNext:m.createElement(()=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},m.createElement("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),m.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),paginationIconPrevious:m.createElement(()=>m.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",role:"presentation"},m.createElement("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),m.createElement("path",{d:"M0 0h24v24H0z",fill:"none"})),null),dense:!1,conditionalRowStyles:[],theme:"default",customStyles:{},direction:Pe.AUTO,onChangePage:D,onChangeRowsPerPage:D,onRowClicked:D,onRowDoubleClicked:D,onRowMouseEnter:D,onRowMouseLeave:D,onRowExpandToggled:D,onSelectedRowsChange:D,onSort:D,onColumnOrderChange:D},ro={rowsPerPageText:"Rows per page:",rangeSeparatorText:"of",noRowsPerPage:!1,selectAllRowsItem:!1,selectAllRowsItemText:"All"},lo=u.nav`
	display: flex;
	flex: 1 1 auto;
	justify-content: flex-end;
	align-items: center;
	box-sizing: border-box;
	padding-right: 8px;
	padding-left: 8px;
	width: 100%;
	${({theme:e})=>e.pagination.style};
`,Oe=u.button`
	position: relative;
	display: block;
	user-select: none;
	border: none;
	${({theme:e})=>e.pagination.pageButtonsStyle};
	${({isRTL:e})=>e&&"transform: scale(-1, -1)"};
`,so=u.div`
	display: flex;
	align-items: center;
	border-radius: 4px;
	white-space: nowrap;
	${yt`
    width: 100%;
    justify-content: space-around;
  `};
`,Ot=u.span`
	flex-shrink: 1;
	user-select: none;
`,io=u(Ot)`
	margin: 0 24px;
`,co=u(Ot)`
	margin: 0 4px;
`;var go=n.exports.memo(function({rowsPerPage:e,rowCount:t,currentPage:o,direction:a=l.direction,paginationRowsPerPageOptions:r=l.paginationRowsPerPageOptions,paginationIconLastPage:s=l.paginationIconLastPage,paginationIconFirstPage:i=l.paginationIconFirstPage,paginationIconNext:g=l.paginationIconNext,paginationIconPrevious:b=l.paginationIconPrevious,paginationComponentOptions:y=l.paginationComponentOptions,onChangeRowsPerPage:p=l.onChangeRowsPerPage,onChangePage:h=l.onChangePage}){const j=(()=>{const k=typeof window=="object";function oe(){return{width:k?window.innerWidth:void 0,height:k?window.innerHeight:void 0}}const[ge,ae]=n.exports.useState(oe);return n.exports.useEffect(()=>{if(!k)return()=>null;function re(){ae(oe())}return window.addEventListener("resize",re),()=>window.removeEventListener("resize",re)},[]),ge})(),R=St(a),w=j.width&&j.width>599,H=be(t,e),f=o*e,P=f-e+1,$=o===1,S=o===H,O=Object.assign(Object.assign({},ro),y),L=o===H?`${P}-${t} ${O.rangeSeparatorText} ${t}`:`${P}-${f} ${O.rangeSeparatorText} ${t}`,M=n.exports.useCallback(()=>h(o-1),[o,h]),C=n.exports.useCallback(()=>h(o+1),[o,h]),v=n.exports.useCallback(()=>h(1),[h]),U=n.exports.useCallback(()=>h(be(t,e)),[h,t,e]),A=n.exports.useCallback(k=>p(Number(k.target.value),o),[o,p]),N=r.map(k=>n.exports.createElement("option",{key:k,value:k},k));O.selectAllRowsItem&&N.push(n.exports.createElement("option",{key:-1,value:t},O.selectAllRowsItemText));const Q=n.exports.createElement(ao,{onChange:A,defaultValue:e,"aria-label":O.rowsPerPageText},N);return n.exports.createElement(lo,{className:"rdt_Pagination"},!O.noRowsPerPage&&w&&n.exports.createElement(n.exports.Fragment,null,n.exports.createElement(co,null,O.rowsPerPageText),Q),w&&n.exports.createElement(io,null,L),n.exports.createElement(so,null,n.exports.createElement(Oe,{id:"pagination-first-page",type:"button","aria-label":"First Page","aria-disabled":$,onClick:v,disabled:$,isRTL:R},i),n.exports.createElement(Oe,{id:"pagination-previous-page",type:"button","aria-label":"Previous Page","aria-disabled":$,onClick:M,disabled:$,isRTL:R},b),!w&&Q,n.exports.createElement(Oe,{id:"pagination-next-page",type:"button","aria-label":"Next Page","aria-disabled":S,onClick:C,disabled:S,isRTL:R},g),n.exports.createElement(Oe,{id:"pagination-last-page",type:"button","aria-label":"Last Page","aria-disabled":S,onClick:U,disabled:S,isRTL:R},s)))});const ne=(e,t)=>{const o=n.exports.useRef(!0);n.exports.useEffect(()=>{o.current?o.current=!1:e()},t)};var po=function(e){return function(t){return!!t&&typeof t=="object"}(e)&&!function(t){var o=Object.prototype.toString.call(t);return o==="[object RegExp]"||o==="[object Date]"||function(a){return a.$$typeof===uo}(t)}(e)},uo=typeof Symbol=="function"&&Symbol.for?Symbol.for("react.element"):60103;function me(e,t){return t.clone!==!1&&t.isMergeableObject(e)?de((o=e,Array.isArray(o)?[]:{}),e,t):e;var o}function bo(e,t,o){return e.concat(t).map(function(a){return me(a,o)})}function ht(e){return Object.keys(e).concat(function(t){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t).filter(function(o){return t.propertyIsEnumerable(o)}):[]}(e))}function wt(e,t){try{return t in e}catch{return!1}}function xo(e,t,o){var a={};return o.isMergeableObject(e)&&ht(e).forEach(function(r){a[r]=me(e[r],o)}),ht(t).forEach(function(r){(function(s,i){return wt(s,i)&&!(Object.hasOwnProperty.call(s,i)&&Object.propertyIsEnumerable.call(s,i))})(e,r)||(wt(e,r)&&o.isMergeableObject(t[r])?a[r]=function(s,i){if(!i.customMerge)return de;var g=i.customMerge(s);return typeof g=="function"?g:de}(r,o)(e[r],t[r],o):a[r]=me(t[r],o))}),a}function de(e,t,o){(o=o||{}).arrayMerge=o.arrayMerge||bo,o.isMergeableObject=o.isMergeableObject||po,o.cloneUnlessOtherwiseSpecified=me;var a=Array.isArray(t);return a===Array.isArray(e)?a?o.arrayMerge(e,t,o):xo(e,t,o):me(t,o)}de.all=function(e,t){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce(function(o,a){return de(o,a,t)},{})};var Ge=de;const ft={text:{primary:"rgba(0, 0, 0, 0.87)",secondary:"rgba(0, 0, 0, 0.54)",disabled:"rgba(0, 0, 0, 0.38)"},background:{default:"#FFFFFF"},context:{background:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},divider:{default:"rgba(0,0,0,.12)"},button:{default:"rgba(0,0,0,.54)",focus:"rgba(0,0,0,.12)",hover:"rgba(0,0,0,.12)",disabled:"rgba(0, 0, 0, .18)"},selected:{default:"#e3f2fd",text:"rgba(0, 0, 0, 0.87)"},highlightOnHover:{default:"#EEEEEE",text:"rgba(0, 0, 0, 0.87)"},striped:{default:"#FAFAFA",text:"rgba(0, 0, 0, 0.87)"}},K={default:ft,light:ft,dark:{text:{primary:"#FFFFFF",secondary:"rgba(255, 255, 255, 0.7)",disabled:"rgba(0,0,0,.12)"},background:{default:"#424242"},context:{background:"#E91E63",text:"#FFFFFF"},divider:{default:"rgba(81, 81, 81, 1)"},button:{default:"#FFFFFF",focus:"rgba(255, 255, 255, .54)",hover:"rgba(255, 255, 255, .12)",disabled:"rgba(255, 255, 255, .18)"},selected:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},highlightOnHover:{default:"rgba(0, 0, 0, .7)",text:"#FFFFFF"},striped:{default:"rgba(0, 0, 0, .87)",text:"#FFFFFF"}}};function fo(e="default",t,o="default"){return K[e]||(K[e]=Ge(K[o],t||{})),K[e]=Ge(K[e],t||{}),K[e]}function mo(e,t,o,a){const[r,s]=n.exports.useState(()=>ut(e)),[i,g]=n.exports.useState(""),b=n.exports.useRef("");ne(()=>{s(ut(e))},[e]);const y=n.exports.useCallback(f=>{var P,$,S;const{attributes:O}=f.target,L=(P=O.getNamedItem("data-column-id"))===null||P===void 0?void 0:P.value;L&&(b.current=((S=($=r[Ee(r,L)])===null||$===void 0?void 0:$.id)===null||S===void 0?void 0:S.toString())||"",g(b.current))},[r]),p=n.exports.useCallback(f=>{var P;const{attributes:$}=f.target,S=(P=$.getNamedItem("data-column-id"))===null||P===void 0?void 0:P.value;if(S&&b.current&&S!==b.current){const O=Ee(r,b.current),L=Ee(r,S),M=[...r];M[O]=r[L],M[L]=r[O],s(M),t(M)}},[t,r]),h=n.exports.useCallback(f=>{f.preventDefault()},[]),j=n.exports.useCallback(f=>{f.preventDefault()},[]),R=n.exports.useCallback(f=>{f.preventDefault(),b.current="",g("")},[]),w=function(f=!1){return f?X.ASC:X.DESC}(a),H=n.exports.useMemo(()=>r[Ee(r,o?.toString())]||{},[o,r]);return{tableColumns:r,draggingColumnId:i,handleDragStart:y,handleDragEnter:p,handleDragOver:h,handleDragLeave:j,handleDragEnd:R,defaultSortDirection:w,defaultSortColumn:H}}var Co=n.exports.memo(function(e){const{data:t=l.data,columns:o=l.columns,title:a=l.title,actions:r=l.actions,keyField:s=l.keyField,striped:i=l.striped,highlightOnHover:g=l.highlightOnHover,pointerOnHover:b=l.pointerOnHover,dense:y=l.dense,selectableRows:p=l.selectableRows,selectableRowsSingle:h=l.selectableRowsSingle,selectableRowsHighlight:j=l.selectableRowsHighlight,selectableRowsNoSelectAll:R=l.selectableRowsNoSelectAll,selectableRowsVisibleOnly:w=l.selectableRowsVisibleOnly,selectableRowSelected:H=l.selectableRowSelected,selectableRowDisabled:f=l.selectableRowDisabled,selectableRowsComponent:P=l.selectableRowsComponent,selectableRowsComponentProps:$=l.selectableRowsComponentProps,onRowExpandToggled:S=l.onRowExpandToggled,onSelectedRowsChange:O=l.onSelectedRowsChange,expandableIcon:L=l.expandableIcon,onChangeRowsPerPage:M=l.onChangeRowsPerPage,onChangePage:C=l.onChangePage,paginationServer:v=l.paginationServer,paginationServerOptions:U=l.paginationServerOptions,paginationTotalRows:A=l.paginationTotalRows,paginationDefaultPage:N=l.paginationDefaultPage,paginationResetDefaultPage:Q=l.paginationResetDefaultPage,paginationPerPage:k=l.paginationPerPage,paginationRowsPerPageOptions:oe=l.paginationRowsPerPageOptions,paginationIconLastPage:ge=l.paginationIconLastPage,paginationIconFirstPage:ae=l.paginationIconFirstPage,paginationIconNext:re=l.paginationIconNext,paginationIconPrevious:De=l.paginationIconPrevious,paginationComponent:He=l.paginationComponent,paginationComponentOptions:$e=l.paginationComponentOptions,responsive:Fe=l.responsive,progressPending:G=l.progressPending,progressComponent:he=l.progressComponent,persistTableHead:V=l.persistTableHead,noDataComponent:we=l.noDataComponent,disabled:Z=l.disabled,noTableHead:je=l.noTableHead,noHeader:Ie=l.noHeader,fixedHeader:fe=l.fixedHeader,fixedHeaderScrollHeight:Te=l.fixedHeaderScrollHeight,pagination:Y=l.pagination,subHeader:ee=l.subHeader,subHeaderAlign:Ce=l.subHeaderAlign,subHeaderWrap:ye=l.subHeaderWrap,subHeaderComponent:Le=l.subHeaderComponent,noContextMenu:Me=l.noContextMenu,contextMessage:Ae=l.contextMessage,contextActions:E=l.contextActions,contextComponent:kt=l.contextComponent,expandableRows:Re=l.expandableRows,onRowClicked:Ve=l.onRowClicked,onRowDoubleClicked:Ue=l.onRowDoubleClicked,onRowMouseEnter:Qe=l.onRowMouseEnter,onRowMouseLeave:Ye=l.onRowMouseLeave,sortIcon:Pt=l.sortIcon,onSort:Dt=l.onSort,sortFunction:qe=l.sortFunction,sortServer:_e=l.sortServer,expandableRowsComponent:Ht=l.expandableRowsComponent,expandableRowsComponentProps:$t=l.expandableRowsComponentProps,expandableRowDisabled:Je=l.expandableRowDisabled,expandableRowsHideExpander:Ke=l.expandableRowsHideExpander,expandOnRowClicked:Ft=l.expandOnRowClicked,expandOnRowDoubleClicked:jt=l.expandOnRowDoubleClicked,expandableRowExpanded:Xe=l.expandableRowExpanded,expandableInheritConditionalStyles:It=l.expandableInheritConditionalStyles,defaultSortFieldId:Tt=l.defaultSortFieldId,defaultSortAsc:Lt=l.defaultSortAsc,clearSelectedRows:Ze=l.clearSelectedRows,conditionalRowStyles:Mt=l.conditionalRowStyles,theme:et=l.theme,customStyles:tt=l.customStyles,direction:pe=l.direction,onColumnOrderChange:At=l.onColumnOrderChange,className:_t}=e,{tableColumns:nt,draggingColumnId:ot,handleDragStart:at,handleDragEnter:rt,handleDragOver:lt,handleDragLeave:st,handleDragEnd:it,defaultSortDirection:zt,defaultSortColumn:Nt}=mo(o,At,Tt,Lt),[{rowsPerPage:q,currentPage:_,selectedRows:ze,allSelected:dt,selectedCount:ct,selectedColumn:W,sortDirection:le,toggleOnSelectedRowsChange:Wt},te]=n.exports.useReducer(ln,{allSelected:!1,selectedCount:0,selectedRows:[],selectedColumn:Nt,toggleOnSelectedRowsChange:!1,sortDirection:zt,currentPage:N,rowsPerPage:k,selectedRowsFlag:!1,contextMessage:l.contextMessage}),{persistSelectedOnSort:gt=!1,persistSelectedOnPageChange:ve=!1}=U,pt=!(!v||!ve&&!gt),Bt=Y&&!G&&t.length>0,Gt=He||go,Vt=n.exports.useMemo(()=>((c={},x="default",T="default")=>{const z=K[x]?x:T;return Ge({table:{style:{color:(d=K[z]).text.primary,backgroundColor:d.background.default}},tableWrapper:{style:{display:"table"}},responsiveWrapper:{style:{}},header:{style:{fontSize:"22px",color:d.text.primary,backgroundColor:d.background.default,minHeight:"56px",paddingLeft:"16px",paddingRight:"8px"}},subHeader:{style:{backgroundColor:d.background.default,minHeight:"52px"}},head:{style:{color:d.text.primary,fontSize:"12px",fontWeight:500}},headRow:{style:{backgroundColor:d.background.default,minHeight:"52px",borderBottomWidth:"1px",borderBottomColor:d.divider.default,borderBottomStyle:"solid"},denseStyle:{minHeight:"32px"}},headCells:{style:{paddingLeft:"16px",paddingRight:"16px"},draggingStyle:{cursor:"move"}},contextMenu:{style:{backgroundColor:d.context.background,fontSize:"18px",fontWeight:400,color:d.context.text,paddingLeft:"16px",paddingRight:"8px",transform:"translate3d(0, -100%, 0)",transitionDuration:"125ms",transitionTimingFunction:"cubic-bezier(0, 0, 0.2, 1)",willChange:"transform"},activeStyle:{transform:"translate3d(0, 0, 0)"}},cells:{style:{paddingLeft:"16px",paddingRight:"16px",wordBreak:"break-word"},draggingStyle:{}},rows:{style:{fontSize:"13px",fontWeight:400,color:d.text.primary,backgroundColor:d.background.default,minHeight:"48px","&:not(:last-of-type)":{borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:d.divider.default}},denseStyle:{minHeight:"32px"},selectedHighlightStyle:{"&:nth-of-type(n)":{color:d.selected.text,backgroundColor:d.selected.default,borderBottomColor:d.background.default}},highlightOnHoverStyle:{color:d.highlightOnHover.text,backgroundColor:d.highlightOnHover.default,transitionDuration:"0.15s",transitionProperty:"background-color",borderBottomColor:d.background.default,outlineStyle:"solid",outlineWidth:"1px",outlineColor:d.background.default},stripedStyle:{color:d.striped.text,backgroundColor:d.striped.default}},expanderRow:{style:{color:d.text.primary,backgroundColor:d.background.default}},expanderCell:{style:{flex:"0 0 48px"}},expanderButton:{style:{color:d.button.default,fill:d.button.default,backgroundColor:"transparent",borderRadius:"2px",transition:"0.25s",height:"100%",width:"100%","&:hover:enabled":{cursor:"pointer"},"&:disabled":{color:d.button.disabled},"&:hover:not(:disabled)":{cursor:"pointer",backgroundColor:d.button.hover},"&:focus":{outline:"none",backgroundColor:d.button.focus},svg:{margin:"auto"}}},pagination:{style:{color:d.text.secondary,fontSize:"13px",minHeight:"56px",backgroundColor:d.background.default,borderTopStyle:"solid",borderTopWidth:"1px",borderTopColor:d.divider.default},pageButtonsStyle:{borderRadius:"50%",height:"40px",width:"40px",padding:"8px",margin:"px",cursor:"pointer",transition:"0.4s",color:d.button.default,fill:d.button.default,backgroundColor:"transparent","&:disabled":{cursor:"unset",color:d.button.disabled,fill:d.button.disabled},"&:hover:not(:disabled)":{backgroundColor:d.button.hover},"&:focus":{outline:"none",backgroundColor:d.button.focus}}},noData:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:d.text.primary,backgroundColor:d.background.default}},progress:{style:{display:"flex",alignItems:"center",justifyContent:"center",color:d.text.primary,backgroundColor:d.background.default}}},c);var d})(tt,et),[tt,et]),Ut=n.exports.useMemo(()=>Object.assign({},pe!=="auto"&&{dir:pe}),[pe]),I=n.exports.useMemo(()=>{if(_e)return t;if(W?.sortFunction&&typeof W.sortFunction=="function"){const c=W.sortFunction,x=le===X.ASC?c:(T,z)=>-1*c(T,z);return[...t].sort(x)}return function(c,x,T,z){return x?z&&typeof z=="function"?z(c.slice(0),x,T):c.slice(0).sort((d,Se)=>{let J,B;if(typeof x=="string"?(J=We(d,x),B=We(Se,x)):(J=x(d),B=x(Se)),T==="asc"){if(J<B)return-1;if(J>B)return 1}if(T==="desc"){if(J>B)return-1;if(J<B)return 1}return 0}):c}(t,W?.selector,le,qe)},[_e,W,le,t,qe]),ue=n.exports.useMemo(()=>{if(Y&&!v){const c=_*q,x=c-q;return I.slice(x,c)}return I},[_,Y,v,q,I]),Qt=n.exports.useCallback(c=>{te(c)},[]),Yt=n.exports.useCallback(c=>{te(c)},[]),qt=n.exports.useCallback(c=>{te(c)},[]),Jt=n.exports.useCallback((c,x)=>Ve(c,x),[Ve]),Kt=n.exports.useCallback((c,x)=>Ue(c,x),[Ue]),Xt=n.exports.useCallback((c,x)=>Qe(c,x),[Qe]),Zt=n.exports.useCallback((c,x)=>Ye(c,x),[Ye]),se=n.exports.useCallback(c=>te({type:"CHANGE_PAGE",page:c,paginationServer:v,visibleOnly:w,persistSelectedOnPageChange:ve}),[v,ve,w]),en=n.exports.useCallback(c=>{const x=be(A||ue.length,c),T=Ne(_,x);v||se(T),te({type:"CHANGE_ROWS_PER_PAGE",page:T,rowsPerPage:c})},[_,se,v,A,ue.length]);if(Y&&!v&&I.length>0&&ue.length===0){const c=be(I.length,q),x=Ne(_,c);se(x)}ne(()=>{O({allSelected:dt,selectedCount:ct,selectedRows:ze.slice(0)})},[Wt]),ne(()=>{Dt(W,le,I.slice(0))},[W,le]),ne(()=>{C(_,A||I.length)},[_]),ne(()=>{M(q,_)},[q]),ne(()=>{se(N)},[N,Q]),ne(()=>{if(Y&&v&&A>0){const c=be(A,q),x=Ne(_,c);_!==x&&se(x)}},[A]),n.exports.useEffect(()=>{te({type:"CLEAR_SELECTED_ROWS",selectedRowsFlag:Ze})},[h,Ze]),n.exports.useEffect(()=>{if(!H)return;const c=I.filter(T=>H(T)),x=h?c.slice(0,1):c;te({type:"SELECT_MULTIPLE_ROWS",keyField:s,selectedRows:x,totalRows:I.length,mergeSelections:pt})},[t,H]);const tn=w?ue:I,nn=ve||h||R;return n.exports.createElement(on,{theme:Vt},!Ie&&(!!a||!!r)&&n.exports.createElement(Un,{title:a,actions:r,showMenu:!Me,selectedCount:ct,direction:pe,contextActions:E,contextComponent:kt,contextMessage:Ae}),ee&&n.exports.createElement(qn,{align:Ce,wrapContent:ye},Le),n.exports.createElement(Kn,Object.assign({responsive:Fe,fixedHeader:fe,fixedHeaderScrollHeight:Te,className:_t},Ut),n.exports.createElement(Xn,null,G&&!V&&n.exports.createElement(mt,null,he),n.exports.createElement(dn,{disabled:Z,className:"rdt_Table",role:"table"},!je&&(!!V||I.length>0&&!G)&&n.exports.createElement(gn,{className:"rdt_TableHead",role:"rowgroup",fixedHeader:fe},n.exports.createElement(pn,{className:"rdt_TableHeadRow",role:"row",dense:y},p&&(nn?n.exports.createElement(ce,{style:{flex:"0 0 48px"}}):n.exports.createElement(_n,{allSelected:dt,selectedRows:ze,selectableRowsComponent:P,selectableRowsComponentProps:$,selectableRowDisabled:f,rowData:tn,keyField:s,mergeSelections:pt,onSelectAllRows:Yt})),Re&&!Ke&&n.exports.createElement(Zn,null),nt.map(c=>n.exports.createElement(Mn,{key:c.id,column:c,selectedColumn:W,disabled:G||I.length===0,pagination:Y,paginationServer:v,persistSelectedOnSort:gt,selectableRowsVisibleOnly:w,sortDirection:le,sortIcon:Pt,sortServer:_e,onSort:Qt,onDragStart:at,onDragOver:lt,onDragEnd:it,onDragEnter:rt,onDragLeave:st,draggingColumnId:ot})))),!I.length&&!G&&n.exports.createElement(eo,null,we),G&&V&&n.exports.createElement(mt,null,he),!G&&I.length>0&&n.exports.createElement(Jn,{className:"rdt_TableBody",role:"rowgroup"},ue.map((c,x)=>{const T=ie(c,s),z=function(B=""){return typeof B!="number"&&(!B||B.length===0)}(T)?x:T,d=ke(c,ze,s),Se=!!(Re&&Xe&&Xe(c)),J=!!(Re&&Je&&Je(c));return n.exports.createElement(Hn,{id:z,key:z,keyField:s,"data-row-id":z,columns:nt,row:c,rowCount:I.length,rowIndex:x,selectableRows:p,expandableRows:Re,expandableIcon:L,highlightOnHover:g,pointerOnHover:b,dense:y,expandOnRowClicked:Ft,expandOnRowDoubleClicked:jt,expandableRowsComponent:Ht,expandableRowsComponentProps:$t,expandableRowsHideExpander:Ke,defaultExpanderDisabled:J,defaultExpanded:Se,expandableInheritConditionalStyles:It,conditionalRowStyles:Mt,selected:d,selectableRowsHighlight:j,selectableRowsComponent:P,selectableRowsComponentProps:$,selectableRowDisabled:f,selectableRowsSingle:h,striped:i,onRowExpandToggled:S,onRowClicked:Jt,onRowDoubleClicked:Kt,onRowMouseEnter:Xt,onRowMouseLeave:Zt,onSelectedRow:qt,draggingColumnId:ot,onDragStart:at,onDragOver:lt,onDragEnd:it,onDragEnter:rt,onDragLeave:st})}))))),Bt&&n.exports.createElement("div",null,n.exports.createElement(Gt,{onChangePage:se,onChangeRowsPerPage:en,rowCount:A||I.length,currentPage:_,rowsPerPage:q,direction:pe,paginationRowsPerPageOptions:oe,paginationIconLastPage:ge,paginationIconFirstPage:ae,paginationIconNext:re,paginationIconPrevious:De,paginationComponentOptions:$e})))});export{Co as Q,fo as q};
