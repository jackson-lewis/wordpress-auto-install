const fs = require( 'fs' )
const os = require( 'os' )


// Build test directory if doesn't exist
if ( ! fs.existsSync( 'test' ) ) {
    console.log( '🛠 Building test directory...' )

    fs.mkdirSync( 'test' )

    fs.copyFile( 'wp-install', 'test/wp-install', err => {
        if ( err ) throw err 
    
        console.log( `wp-install successfully added.` )
    })
    
    fs.copyFile( '.wp-install-config', 'test/.wp-install-config', err => {
        if ( err ) throw err 
    
        console.log( `.wp-install-config successfully added.` )
    })
}


fs.watch( 'test', {}, ( eventType, filename ) => {

    if ( filename ) {
        const today = new Date()
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()

        if ( filename == 'wp-install' ) {
            fs.copyFileSync( 'test/wp-install', '/usr/local/bin/wp-install' );
            
        } else if ( filename == '.wp-install-config' ) {
            fs.copyFileSync( 'test/.wp-install-config', os.homedir() + '/.wp-install-config' );
        }

        console.log( `${time} - ${filename} updated` )
    }
});



