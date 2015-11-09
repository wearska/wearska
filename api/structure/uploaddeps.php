<?php

if ( !empty( $_FILES ) ) {

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $tempPath = preg_replace('/\s+/', '_', $tempPath);
    $filename = $_FILES[ 'file' ][ 'name' ];
    $filename = preg_replace('/\s+/', '_', $filename);
    $root = $_SERVER['DOCUMENT_ROOT'];
    $baseDir = $root . DIRECTORY_SEPARATOR . 'uploads/structure/departments';
    if (!file_exists($baseDir)) {
        mkdir($baseDir, 0777, true);
    }
    $uploadPath = $root . DIRECTORY_SEPARATOR . 'uploads/structure/departments'. DIRECTORY_SEPARATOR . $filename;

    move_uploaded_file( $tempPath, $uploadPath );

    echo "Done";

} else {

    echo 'No files';

}

?>
