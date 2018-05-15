import m from "mithril";

class Data  {

    constructor() {
        this.data = [];
        this.start = 1;
        this.pageSize = 10;
        this.max = 1000000;

        // generate dummy data for displaying

        for(let k=1; k <= this.max; k++) {
            this.data.push({ind : k, locn: 1700 + k, ordid: "ORD_" + k, ksn: 1500 + k, sku : 10000});
        }
    }

    // return a subset of objects based on current value of 'start' and 'page size' 

    getViewData(){
    
        var viewData = [];
        var end = Math.min(data.start -1 + data.pageSize, data.max);

        for(var k=data.start-1; k < end; k++){
            viewData.push(data.data[k]);
        }
        return viewData;
    }

    nextRow(){
        this.start = Math.min(this.start + 1, this.max);
    }

    prevRow(){
        this.start = Math.max(this.start - 1, 1);
    }
    
    nextPage(){

        this.start += this.pageSize;
        if (this.start > this.max){
            this.start -= this.pageSize;
        }
    }
    prevPage() {
        this.start -= this.pageSize;
        if (this.start < 1){
            this.start += this.pageSize;
        }
    }
    
    lastPage() {
        this.start = Math.max(this.max - this.pageSize + 1, 1);
    }

    firstPage(){
        this.start = 1;
    }
};

var data = new Data();

function nextRow(){

    data.nextRow();
    m.mount(root, view);
}

function nextPage(){
    
    data.nextPage();
    m.mount(root, view);
}

function lastPage(){
    
    data.lastPage();
    m.mount(root, view);
}

function prevRow() {
    data.prevRow();
    m.mount(root, view);
}
function prevPage() {
    data.prevPage();
    m.mount(root, view);
}
function firstPage() {
    data.firstPage();
    m.mount(root, view);
}

function getNumVal(id){
    return Number(document.getElementById(id).value)
}

function pageSizeChanged () {
    data.pageSize = getNumVal('pagesize');
    m.mount(root, view);
}

function startChanged() {
    data.start = getNumVal('start');
    m.mount(root, view);
}

function tableRow(v) {
    return m('tr', m('td', v.ind), m('td', v.locn), m('td', v.ordid), m('td', v.ksn), m('td', v.sku));
}

var tableHeader = m('thead', m('tr', 
                        m('td', ''), 
                        m('td', 'Locn_Nbr'), 
                        m('td', 'Online_Ord_Id'), 
                        m('td', 'KSN_Id'), 
                        m('td', 'SKU_Pre_Type_Cd')));

var upperControls = m('ww', 
        m('button', {onclick: prevRow}, "<"),
        m('button', {onclick: prevPage}, "<<"),
        m('button', {onclick: firstPage}, "<<<"),
        m('strong', 'Showing'), m('input', {id : 'pagesize', value: '10', onchange:pageSizeChanged}, '10'), 
        m('strong', 'rows out of'), m('input', {value: data.max}, ''),
        m('strong', 'starting at row'), m('input', {id : 'start', value: 1, onchange:startChanged}, ''),
        m('button', {onclick: nextRow}, ">"),
        m('button', {onclick: nextPage}, ">>"),
        m('button', {onclick: lastPage}, '>>>')
    );

var view = {
    
    view: function () {
        return m('main', upperControls , m('table',  tableHeader, data.getViewData().map(tableRow)));
    }
};

var root = document.body;

m.mount(root, view);