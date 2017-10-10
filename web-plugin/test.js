function doublepulsar(url) {
    initPlugin({
        data: [{ip:"8.8.8.8"},{ip:"4.4.4.4"}],
        config:{
            url: url,
            cmd: '--ip #{ip}',
            module:'nsa-doublepulsar'
        }
    });
}
function ping(url) {
    initPlugin({
        data: [{ip:"8.8.8.8"},{ip:"4.4.4.4"}],
        config:{
            url: url,
            cmd: '#{ip}',
            module:'ping'
        }
    });
}
function nmap(url) {
    initPlugin({
        data: [{ip:"8.8.8.8"},{ip:"4.4.4.4"}],
        config:{
            url: url,
            cmd: '#{ip}',
            module:'nmap'
        }
    });
}