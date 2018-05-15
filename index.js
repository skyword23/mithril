import m from "mithril";

class Data  {

    constructor(max) {
        this.max= max;
        this.data = [];
        this.start = 1;
        this.pageSize = 10;

        for(let k=1; k <= max; k++) {
            this.data.push({locn: k, ordid: "ORD_" + k, ksn: 1500 + k, sku : 10000});
        }
    }

    getViewData(){
    
        var viewData = [];
        var end = Math.min(data.start -1 + data.pageSize, data.max);
    
        for(var k=data.start-1; k < end; k++){
            viewData.push(data.data[k]);
        }
        return viewData;
    }

    nextRow(){
        
        
    }
    
    nextPage(){

    }
    
    lastPage(){
    }

};

var data = new Data(100);

function nextRow(){

    data.nextRow();
    m.mount(root, table);
}

function nextPage(){
    
    data.nextPage();
    m.mount(root, table);
}

function lastPage(){
    
    data.lastPage();
    m.mount(root, table);
}

function tableRow(v) {
    return m('tr', m('td', v.locn), m('td', v.ordid), m('td', v.ksn), m('td', v.sku));
}

var tableHeader = m('thead', m('tr', m('td', 'Locn_Nbr'), 
                        m('td', 'Online_Ord_Id'), 
                        m('td', 'KSN_Id'), 
                        m('td', 'SKU_Pre_Type_Cd')));

var upperControls = m('ww', 
        m('button', "<"),m('button', "<<"),m('button', "<<<"),
        m('strong', 'Showing'), m('input', {value: '10'}, '10'), m('strong', 'rows out of'), m('input', {value: data.max}, ''),
        m('button', {onclick:nextRow}, ">"),
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