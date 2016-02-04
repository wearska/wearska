<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $code = $_POST['code'];
    $root = $_SERVER['DOCUMENT_ROOT'];
    $baseDir = $root . DIRECTORY_SEPARATOR . 'uploads/temp';
    if (!file_exists($baseDir . DIRECTORY_SEPARATOR . $code)) {
        mkdir($baseDir . DIRECTORY_SEPARATOR . $code, 0777, true);
    }
    $uploadPath = $root . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . 'temp' . DIRECTORY_SEPARATOR . $code . DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( $uploadPath );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}

?>
