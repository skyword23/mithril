import m from "mithril";

//  class encapulating 'data'

class Data  {

    constructor() {
        this.data = [];
        // generate dummy data for displaying
        
        var max = 1000000;
        for(let k=1; k <= max; k++) {
            var locn = Math.floor((Math.random() * 1000) + 1);
            this.data.push({ind : k, locn: locn, ordid: "ORD_" + k, ksn: 1500 + k, sku : 0});
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

// main app code

function tableRow(v) {
var app = {
    start : 1,
    pageSize : 10,
    max : data.data.length,

    tableHeader: m('thead.bg-moon-gray', m('tr', 
                        m('td', ''), 
                        m('td.ba', 'Locn_Nbr'), 
                        m('td.ba', 'Online_Ord_Id'), 
                        m('td.ba', 'KSN_Id'), 
                        m('td.ba', 'SKU_Prc_Type_Cd'))
                    ),

    upperControls:  m('div.tc.pt2.pb4', 
        m('button.br3.br--left.bg-blue.white', {onclick: firstPage}, "|<"),
        m('button.br1.bg-blue.white', {onclick: prevPage}, "<<"),
        m('button.br1.bg-blue.white', {onclick: prevRow}, "<"),
        m('span.pl4.pr2', 'Showing'), m('input.w3', {id : 'pagesize', type:"number", value: '10', onchange:pageSizeChanged}), 
        m('span.pl4.pr2', 'rows out of'), m('input.w3', {readonly : true, value: data.data.length}),
        m('span.pl4.pr2', 'starting at row'), 
        m('span.pr4', m('input.w3', {id : 'start', type: "number", value: 1, onchange:startChanged})),
        m('button.br1.bg-blue.white', {onclick: nextRow}, ">"),
        m('button.br1.bg-blue.white', {onclick: nextPage}, ">>"),
        m('button.br3.br--right.bg-blue.white', {onclick: lastPage}, '>|')
    ),

    tableRow : function(v) {
        return m('tr', 
                    m('td.ba', v.ind), m('td.ba', v.locn), m('td.ba', v.ordid), 
                    m('td.ba', v.ksn), m('td.ba', v.sku)
                );
    },

    // return the app view

    view: function () {
        return m('div', 
                    this.upperControls , 
                    m('table.ba.collapse.center', {width:"98%"}, 
                        this.tableHeader, 
                        this.getViewData().map(this.tableRow)
                    )
                );
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
        this.start = Math.max(this.start - this.pageSize, 1);
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
