/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function openWindowTest() {

    var headOpen = '<html><head><title>Open Window Test</title>';
    var Value = '<body><h1>Open Window Test</h1></body></html>';
    popup = window.open('', 'popup', 'toolbar=no,menubar=no');
    //popup = window.open('../gajiBulanan/Print.xhtml','popup','toolbar=no,menubar=no');
    //isiBody=popup.document.body;
    //isiBody.innerHTML(Value.toString());
    var htmlToPrint = '' +
            '<style type="text/css">' +
            'table th, table td {' +
            'border:1px solid #000;' +
            'padding;0.5em;' +
            '}' +
            'h1 {color : red}'+
            '</style>'+
            '</head>';
    Value = headOpen+ htmlToPrint + Value;
    popup.document.open();
    popup.document.write(Value.toString());
    popup.document.close();
}
function openWindowTest2(value) {
    popup = window.open('', 'popup', 'toolbar=no,menubar=no');
    popup.document.open();
    popup.document.write(value.toString());
    popup.document.close();
}

