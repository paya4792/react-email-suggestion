export const isZenkaku = ( str: string ) => {
  return str.match( /[^\x01-\x7E\xA1-\xDF]+/ )? true : false;
}

export const zenkakuToHankaku = ( str: string ) => {
  return str
    .replace( /[\u2010-\u2015\u2212\u30fc\uff70]/g, '-' )
    .replace( /[！-～]/g, function ( s ) {
      return String.fromCharCode( s.charCodeAt( 0 ) - 0xFEE0 );
    } );
}