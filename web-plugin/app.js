function init() {}
function initPlugin(response) {
    const data = response['data'];
    const url = response['config']['url'];
    const cmd = response['config']['cmd'];
    const module = response['config']['module'];
    
    const webSocket = $.simpleWebSocket({ url }).send({
        data,
        url,
        cmd,
        module
    });
    webSocket.listen(function(message) {
        $( "pre" ).append(message+"<br>" );
    });
}