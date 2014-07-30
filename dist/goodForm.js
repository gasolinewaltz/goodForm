(function(root, undefined) {

  "use strict";


/* goodForm main */

var doc = root.document;

// Base function.
var goodForm = function(formId, options) {
    options = options || {};
    //The form to edit
    var form = doc.getElementById(formId);

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }
    var defaultOptions = {
        honeypot : true
    };


    var _init = function(){

        extend(options, defaultOptions);
        if(defaultOptions.honeypot){
            _honeyPot();
        }
    };

    _init();

    function _honeyPot(){
        var input1 = doc.createElement('input'),
            input2 = doc.createElement('input'),
            median = Math.floor(form.childNodes.length / 2);

        input1.placeholder ="Do Not Fill";
        input2.placeholder="Do Not Fill";

        input1.style.display = "none";
        input2.style.display = "none";

        input1.id = "_honey1";
        input2.id = "_honey2";

        form.appendChild(input2);
        form.insertBefore(input1, form.childNodes[median]);
    }

    // http://stackoverflow.com/a/12518737/559997
    function _setCaretPosition(elemId, caretPos) {
        var el = doc.getElementById(elemId);

        el.value = el.value;
        // ^ this is used to not only get "focus", but
        // to make sure we don't have it everything -selected-
        // (it causes an issue in chrome, and having it doesn't hurt any other browser)

        if (el !== null) {

            if (el.createTextRange) {
                var range = el.createTextRange();
                range.move('character', caretPos);
                range.select();
                return true;
            }

            else {
                // (el.selectionStart === 0 added for Firefox bug)
                if (el.selectionStart || el.selectionStart === 0) {
                    console.log("hello");
                    el.focus();
                    setTimeout(function(){
                        el.setSelectionRange(caretPos, caretPos);
                    },0);
                    return true;
                }

                else  { // fail city, fortunately this never happens (as far as I've tested) :)
                    el.focus();
                    return false;
                }
            }
        }
    }

    return {
        /*
        add mask

        add placeholder text to a form that becomes replaced as the user types

        ex:
            |(555) 555 5555  | -- user inputs '503' -->| (503) 555 5555) |
         */
        addMask : function(id, mask){
            var el = doc.getElementById(id),
                hasInput = false;
            //when the user clicks the input field, add the mask and move the cursor
            el.onclick = function(e){
                e.preventDefault();
                //set the mask
                this.value = mask;
                //setTimeout for chromium problems
                _setCaretPosition(id, 0);
                this.onkeydown = function(e){
                    e.preventDefault();
                };
            };
            el.onblur = function(){
                if(hasInput){
                    //
                }else{
                    this.value = "";
                }
            };

        }

    };

};

root.goodForm = goodForm;


}(this));
