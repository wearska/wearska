<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $code = $_POST['code'];
    $root = $_SERVER['DOCUMENT_ROOT'];
    $baseDir = $root . DIRECTORY_SEPARATOR . 'uploads/items';
    if (!file_exists($baseDir . DIRECTORY_SEPARATOR . $code)) {
        mkdir($baseDir . DIRECTORY_SEPARATOR . $code, 0777, true);
    }
    $uploadPath = $root . DIRECTORY_SEPARATOR . 'uploads/items'. DIRECTORY_SEPARATOR . $code . DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    echo "Done";

} else {

    echo 'No files';

}

?>
