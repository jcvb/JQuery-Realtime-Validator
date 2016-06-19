(function ( $ ) {
 
    $.fn.realtimeValidate = function( options ) {

        // Default options 
        var settings = $.extend({
            // Values of default options
            errorColor: "#f00",
            fontSizeError: "12px"
            
        }, options );

        $(this).on('input change', function () {        
            
            var obj = $(this);
            var length   = obj[0].length;

            for ( var i = 0; i < length; i++ ) {
                
                var node = obj[0][i];
                
                if ( node.type == 'text' ) {
                    
                    var valueNode = node.value;
                    var nameNode = node.name;
                    var selectNode = 'input[name="'+nameNode+'"]';

                    if ( $(selectNode).is(':focus') ) {
                        for ( var option in options ) {
                            var node = options[option];
                            var type = typeof node;
                            if ( type == 'object' ) {
                                if ( option == nameNode ) {
                                    for ( var subOption in node ) {                               
                                        if ( subOption == 'required' && node[subOption] == true ) {
                                            if ( valueNode == '' ) {
                                               $(selectNode).css ( {'border-color': 'red'} ); 
                                            } else {
                                                $(selectNode).css ( {'border-color': 'inherit'} );
                                            }
                                        }
                                        if ( subOption == 'email' && node[subOption] == true ) {
                                            var patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                                            var r = patt.test( valueNode );
                                            if ( r != true ) {
                                               $(selectNode).css ( {'border-color': 'red'} ); 
                                            } else {
                                                $(selectNode).css ( {'border-color': 'inherit'} );
                                            }
                                        }
                                        if ( subOption == 'alphanumeric' && node[subOption] == true ) {
                                            var ruleLength;

                                            if ( node['maxHeight'] == undefined && node['minHeight'] == undefined && node['required'] == true ) 
                                                ruleLength = '{1,}'; 
                                            if ( node['maxHeight'] > 0 && node['minHeight'] == undefined ) 
                                                ruleLength = '{1,'+node['maxHeight']+'}';
                                            if ( node['minHeight'] > 0 && node['maxHeight'] == undefined ) 
                                                ruleLength = '{'+node['minHeight']+',}';
                                            if ( node['minHeight'] > 0 && node['maxHeight'] > 0 ) 
                                                ruleLength = '{'+node['minHeight']+','+node['maxHeight']+'}';
                                        
                                            var exp = '^[A-Za-z]'+ruleLength+'$';
                                            console.log(exp);
                                            console.log(node['minHeight']+':'+node['maxHeight']);
                                            var patt = new RegExp( exp, 'i' );
                                            var r = patt.test( valueNode );
                                            if ( r != true ) {
                                               $(selectNode).css ( {'border-color': 'red'} ); 
                                            } else {
                                                $(selectNode).css ( {'border-color': 'inherit'} );
                                            }
                                        }
                                        //console.log( subOption +':'+ node[subOption] );
                                    }
                                    //console.log(nameNode+':'+valueNode+':'+ $(selectNode).is(':focus'));
                                    console.log(nameNode);
                                }
                            }
                        }
                        
                    } 
                }
            }
        } );

        // Return validate options
        //return this.css({
        //    'color': settings.errorColor,
        //    'font-size': settings.fontSizeError
        //});

    };
 
}( jQuery ));