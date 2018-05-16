import m from "mithril";

//  class encapulating 'data'

class Data  {

    constructor() {
        this.data = [];
        // generate dummy data for displaying
        
        var max = 1000;
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
    app.pageSize = Number(document.getElementById('pagesize').value);
}

// handler for 'start' value changed

function startChanged() {
    app.start = Number(document.getElementById('start').value);
}

//  create a row from a given data point

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
        m('strong', 'rows out of'), m('input', {value: data.data.length}, ''),
        m('strong', 'starting at row'), m('input', {id : 'start', value: 1, onchange:startChanged}, ''),
        m('button', {onclick: nextRow}, ">"),
        m('button', {onclick: nextPage}, ">>"),
        m('button', {onclick: lastPage}, '>>>')
    );

var app = {
    
    start : 1,
    pageSize : 10,
    max : data.data.length,

    view: function () {
        return m('main', upperControls , m('table', tableHeader, this.getViewData().map(tableRow)));
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
