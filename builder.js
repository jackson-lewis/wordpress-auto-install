const fs = require( 'fs' )


const testDir = `test`
const wpInstall = `wp-install`
const wpInstallConfig = `.wp-install-config`


// Build the wp-install
fs.readFile( `${testDir}/${wpInstall}`, 'utf8', ( err, data ) => {
    if ( err ) throw err

    // Option to do any regex replacements
    //const parsedContents = data.replace( //g, '\1' )

    fs.writeFile( wpInstall, data, 'utf8', err => {
        if ( err ) throw err

        console.log( `${wpInstall} successfully built.` )
    })   
})


// Build the .wp-install-config
fs.readFile( `${testDir}/${wpInstallConfig}`, 'utf8', ( err, data ) => {
    if ( err ) throw err

    // Remove all variable values
    const parsedContents = data.replace( /\"[^"]*\"/g, '""' )

    fs.writeFile( wpInstallConfig, parsedContents, 'utf8', err => {
        if ( err ) throw err

        console.log( `${wpInstallConfig} successfully built.` )
    })   
})