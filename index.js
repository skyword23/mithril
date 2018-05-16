import m from "mithril";

//  class encapulating 'data'

class Data  {

    constructor() {
        this.data = [];
        // generate dummy data for displaying
        
        var max = 100;
        for(let k=1; k <= max; k++) {
            this.data.push({ind : k, locn: 1700 + k, ordid: "ORD_" + k, ksn: 1500 + k, sku : 10000});
        }
    }
};

// instantiate object containng data

var data = new Data();

// Button click hadlers for navigation

function nextRow(){
    app.nextRow();
}

function nextPage(){
    app.nextPage();
}

function lastPage(){
    app.lastPage();
}

function prevRow() {
    app.prevRow();
}
function prevPage() {
    app.prevPage();
}
function firstPage() {
    app.firstPage();
}

// handler for 'page size' value changed

function pageSizeChanged () {
    app.pageSize = Math.min(app.max, Number(document.getElementById('pagesize').value));
    app.pageSize = Math.max(1, app.pageSize);
    document.getElementById('pagesize').value = app.pageSize;
}

// handler for 'start' value changed

function startChanged() {
    app.start = Math.min(app.max, Number(document.getElementById('start').value));
    app.start = Math.max(1, app.start);
    document.getElementById('start').value = app.start;
}

//  create a row from a given data point

function tableRow(v) {
    return m('tr', m('td.ba', v.ind), m('td.ba', v.locn), m('td.ba', v.ordid), m('td.ba', v.ksn), m('td.ba', v.sku));
}

var tableHeader = m('thead', m('tr', 
                        m('td.ba', ''), 
                        m('td.ba', 'Locn_Nbr'), 
                        m('td.ba', 'Online_Ord_Id'), 
                        m('td.ba', 'KSN_Id'), 
                        m('td.ba', 'SKU_Prc_Type_Cd')));

var upperControls = m('div.center', 
        m('button.br3.br--left.btn', {onclick: firstPage}, "|<"),
        m('button.br1.btn', {onclick: prevPage}, "<<"),
        m('button.br1.btn', {onclick: prevRow}, "<"),
        m('span.mr', 'Showing'), m('input', {id : 'pagesize', type:"number", value: '10', onchange:pageSizeChanged}, '10'), 
        m('span.mr', 'rows out of'), m('input', {readonly : true, value: data.data.length}, ''),
        m('span.mr', 'starting at row'), 
        m('span', m('input', {id : 'start', type: "number", value: 1, onchange:startChanged}, '')),
        m('button.btn.mrl', {onclick: nextRow}, ">"),
        m('button.btn', {onclick: nextPage}, ">>"),
        m('button.br3.br--right.btn', {onclick: lastPage}, '>|')
    );

var app = {
    
    start : 1,
    pageSize : 10,
    max : data.data.length,

    view: function () {
        return m('main', upperControls , m('table.ba.center', tableHeader, this.getViewData().map(tableRow)));
    },

    // update control value
    setStart: function(){
        document.getElementById('start').value = this.start;
    },

     // return a subset of objects based on current value of 'start' and 'page size' 

     getViewData : function() {
        
        var viewData = [];
        var end = Math.min(this.start -1 + this.pageSize, this.max);

        for(var k=this.start-1; k < end; k++){
            viewData.push(data.data[k]);
        }
        return viewData;
    },

    nextRow : function(){
        this.start = Math.min(this.start + 1, this.max);
        this.setStart();
    },

    prevRow : function(){
        this.start = Math.max(this.start - 1, 1);
        this.setStart();
    },
    
    nextPage: function(){

        this.start += this.pageSize;
        if (this.start > this.max){
            this.start -= this.pageSize;
        }
        this.setStart();
    },

    prevPage: function() {
        this.start -= this.pageSize;
        if (this.start < 1){
            this.start += this.pageSize;
        }
        this.setStart();
    },
    
    lastPage: function() {
        this.start = Math.max(this.max - this.pageSize + 1, 1);
        this.setStart();
    },

    firstPage: function(){
        this.start = 1;
        this.setStart();
    }
};

var root = document.body;
m.mount(root, app);
